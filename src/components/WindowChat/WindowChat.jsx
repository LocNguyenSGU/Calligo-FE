/* eslint-disable react/prop-types */
import { useEffect, useMemo, useRef, useState } from "react";
import TextArea from "antd/es/input/TextArea";
import Avatar from "../shared/Avatar";
import IconChatList from "../shared/IconChatList";
import chatService from "../../services/chatService";
import { useChat } from "../../context/ChatContext";
import { Upload, Button, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { SendOutlined } from '@ant-design/icons';
import { Image, Card, Typography, Spin } from "antd";
const { Link, Text } = Typography;
import { ArrowDownOutlined } from "@ant-design/icons";



const WindowChat = ({
  src,
  title,
  isGroup,
  lastTime,
  idConversation,
  myAccountId,
  numberMember,
  participants
}) => {
  const [initialMessages, setInitialMessages] = useState([]);
  const [input, setInput] = useState("");
  const [fileList, setFileList] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState(20);
  const [totalPage, setTotalPage] = useState(0);
  const chatContainerRef = useRef(null);
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const [loadingOldMessages, setLoadingOldMessages] = useState(false);
  const [showScrollToBottom, setShowScrollToBottom] = useState(false);
  const [isFullMessage, setIsFullMessage] = useState(false);


  const getLinkAvatarByIdAccount = (idAccountSent) => {
    const participant = participants.find(p => p.idAccount == idAccountSent);
    return participant?.imgAvatar || null; // Nếu không có thì trả về null
  };
  const messagesEndRef = useRef(null);
  const { messages, sendMessage } = useChat();

  const allMessages = useMemo(() => {
    const incomingMessages = messages[String(idConversation)] || [];
    const combined = [...initialMessages];

    incomingMessages.forEach((msg) => {
      if (!combined.some((m) => m.idMessage === msg.idMessage)) {
        combined.push(msg);
      }
    });

    return combined;
  }, [initialMessages, messages, idConversation]);

  const scrollToBottom = () => {
    setIsFullMessage(false)
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isFirstLoad && initialMessages.length > 0) {
      scrollToBottom();
      setIsFirstLoad(false); // ❌ không scroll tự động nữa sau lần đầu
      setIsFullMessage(false);
    }
  }, [initialMessages, isFirstLoad]);

  useEffect(() => {
    if (messages) {
      scrollToBottom()
    }
  }, [messages])

  useEffect(() => {
    const container = chatContainerRef.current;
    const handleScrollVisibility = () => {
      const nearBottom = container.scrollHeight - container.scrollTop - container.clientHeight < 300;
      setShowScrollToBottom(!nearBottom);
    };

    container.addEventListener("scroll", handleScrollVisibility);
    return () => container.removeEventListener("scroll", handleScrollVisibility);
  }, []);


  useEffect(() => {
    const fetchLastPageMessages = async () => {
      try {
        const preview = await chatService.getMessagesByIdConversation(idConversation, 0, pageSize);
        const totalPage = preview.data.totalPage;
        const lastPage = Math.max(totalPage - 1, 0);
        setTotalPage(totalPage);

        let allMessages = [];
        let page = lastPage;

        while (page >= 0 && allMessages.length < pageSize) { // muốn hiển thị ít nhất 20 tin nhắn
          const res = await chatService.getMessagesByIdConversation(idConversation, page, pageSize);
          console.log("Tin nhắn mới load thêm", res.data)
          setIsFullMessage(false)
          allMessages = [...res.data.data, ...allMessages]; // prepend
          page--;
        }

        setInitialMessages(allMessages);
        setCurrentPage(Math.max(page + 1, 0)); // trang hiện tại đã load xong
        setIsFirstLoad(true);
      } catch (err) {
        console.error("Không tải được tin nhắn:", err);
      }
    };

    fetchLastPageMessages();
  }, [idConversation]);



  const handleScroll = async () => {
    if (chatContainerRef.current.scrollTop === 0) {
      // ✅ Ngăn tải nếu đã ở trang đầu
      if (currentPage === 0) {
        setIsFullMessage(true)
        console.log("Đã ở trang đầu, không còn tin nhắn để tải.");
        return;
      }
      setLoadingOldMessages(true);
      try {
        const newPage = currentPage - 1;

        const response = await chatService.getMessagesByIdConversation(idConversation, newPage, pageSize);
        const oldMessages = response.data.data;

        const oldHeight = chatContainerRef.current.scrollHeight;

        setInitialMessages((prev) => [...oldMessages, ...prev]);
        setCurrentPage(newPage);
        setIsFirstLoad(false)

        setTimeout(() => {
          const newHeight = chatContainerRef.current.scrollHeight;
          chatContainerRef.current.scrollTop = newHeight - oldHeight;
        }, 0);
        setLoadingOldMessages(false)
      } catch (err) {
        setIsFullMessage(false);
        console.error("Lỗi khi tải thêm tin nhắn:", err);
        setLoadingOldMessages(false);
      }
    }
  };

  const handleSendMessage = async () => {
    if (!input.trim() && fileList.length === 0) return;

    if (fileList.length > 0) {
      await handleUploadImages();
      return;
    }

    sendMessage(idConversation, {
      idConversation,
      idAccountSent: myAccountId,
      content: input.trim(),
      type: "TEXT",
    });

    setInput("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // const handleFileChange = ({ fileList }) => {
  //   console.log("File list mới:", fileList);
  //   setFileList(fileList);
  // };

  const handleFileChange = ({ fileList }) => {
    const files = fileList.map(f => f.originFileObj);
    const newPreviews = files.map(file => ({
      file,
      url: URL.createObjectURL(file),
      progress: 0,
      type: file.type,
    }));
    setPreviews(newPreviews);
    setFileList(fileList);
  };

  const getAttachmentType = (fileType) => {
    if (fileType.startsWith("image/")) {
      if (fileType === "image/gif") return "GIF";
      return "IMAGE";
    } else if (fileType.startsWith("video/")) {
      return "VIDEO";
    } else if (fileType.startsWith("audio/")) {
      return "AUDIO";
    } else {
      return "FILE";
    }
  };

  const handleUploadImages = async () => {
    try {
      console.log("Bắt đầu upload...");
      setUploading(true);

      const uploadPromises = fileList.map((file, index) => {
        const fileObj = file.originFileObj;
        const fileType = fileObj.type;
        const attachmentType = getAttachmentType(fileType);

        console.log(`File ${index + 1}:`, {
          name: fileObj.name,
          type: fileType,
          attachmentType,
        });

        return new Promise((resolve, reject) => {
          const xhr = new XMLHttpRequest();
          const formData = new FormData();
          formData.append("file", fileObj);
          formData.append("upload_preset", "calligo_preset");

          // ⚠ Cloudinary upload endpoint mặc định là image. Dùng video thì phải đổi URL:
          let uploadUrl = "https://api.cloudinary.com/v1_1/doycy5gbl/image/upload";
          if (attachmentType === "VIDEO") {
            uploadUrl = "https://api.cloudinary.com/v1_1/doycy5gbl/video/upload";
          } else if (attachmentType === "AUDIO") {
            uploadUrl = "https://api.cloudinary.com/v1_1/doycy5gbl/raw/upload";
          }

          xhr.open("POST", uploadUrl, true);

          xhr.upload.onprogress = (event) => {
            if (event.lengthComputable) {
              const progress = Math.round((event.loaded / event.total) * 100);
              // setPreviews(prev => {
              //   const updated = [...prev];
              //   updated[index].progress = progress;
              //   return updated;
              // });
              setPreviews(prev =>
                prev.map((item, i) => {
                  if (i === index) {
                    const updatedItem = { ...item, progress };
                    console.log("Updated item:", updatedItem); // ✅ chính xác
                    return updatedItem;
                  }
                  return item;
                })
              );

              // console.log(`Tệp ${index + 1} đang upload: ${progress}%`);
              // setUploadProgress((prev) => {
              //   const newProgress = [...prev];
              //   newProgress[index] = progress;
              //   return newProgress;
              // });
            }
          };

          xhr.onload = () => {
            const res = JSON.parse(xhr.responseText);
            console.log(`Upload thành công file ${index + 1}:`, res);
            resolve({
              url: res.secure_url,
              order: index,
              type: attachmentType,
              timeUpload: new Date().toISOString(),
            });
          };

          xhr.onerror = () => {
            console.error(`Upload thất bại cho file ${index + 1}`);
            reject(new Error(`Upload failed for file ${fileObj.name}`));
          };

          xhr.send(formData);
        });
      });

      const uploadedAttachments = await Promise.all(uploadPromises);
      console.log("Toàn bộ tệp đã upload thành công:", uploadedAttachments);

      const messageData = {
        idConversation,
        idAccountSent: myAccountId,
        content: "",
        type: "NONTEXT",
        attachments: uploadedAttachments,
        timeSent: new Date().toISOString(),
      };

      console.log("Tin nhắn chuẩn bị gửi:", messageData);

      // 👉 TẠM TẮT gửi xuống server
      sendMessage(idConversation, messageData);

      message.success("Upload file thành công!");
      setInput("");
      setFileList([]);
      setUploadProgress([]);
      setPreviews([])
    } catch (error) {
      console.error("Upload thất bại:", error);
      message.error("Tải file thất bại");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="w-[66%] h-screen bg-gray-200 flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-center p-3 bg-white border border-gray-200 border-t-0 border-r-0" style={{ borderRight: "none" }}>
        <div className="flex gap-2">
          <Avatar src={src || "/public/sidebar/woman.png"} />
          <div className="flex flex-col gap-[2px]">
            <span className="font-medium">{title}</span>
            {!isGroup ? (
              <p className="font-light text-sm">
                Đang hoạt động || Truy cập hôm qua
              </p>
            ) : (
              <div className="flex gap-1 items-center">
                <img
                  src="/public/chatlist/icons8-person-64.png"
                  className="w-4 h-4"
                  alt="group"
                />
                <p className="font-light text-sm">
                  <span className="number-people">{numberMember}</span> thành viên
                </p>
              </div>
            )}
          </div>
        </div>
        <div className="flex gap-1">
          {isGroup && (
            <IconChatList src="/public/chatlist/add-group.png" size="16px" />
          )}
          <IconChatList
            src="/public/windowchat/cam-recorder.png"
            onClick={() => alert("Chức năng đang phát triển")}
          />
          <IconChatList
            src="/public/windowchat/search-interface-symbol.png"
            size="16px"
            onClick={() => alert("Chức năng đang phát triển")}
          />
          <IconChatList
            src="/public/windowchat/separate.png"
            onClick={() => alert("Chức năng đang phát triển")}
          />
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-auto scrollbar-thin scrollbar-thumb-gray-400 p-3 pr-4 bg-gray-200 border border-gray-300"
        style={{ marginBottom: "100px" }}
        ref={chatContainerRef}
        onScroll={handleScroll}
      >
        {isFullMessage && (
          <div style={{ textAlign: "center", padding: "10px" }}>
            <div className="px-4 py-1 bg-gray-200 text-gray-600 text-xs rounded-full shadow-sm">
              Bạn đã xem hết tin nhắn
            </div>
          </div>
        )}
        {loadingOldMessages && (
          <div style={{ textAlign: "center", padding: "10px" }}>
            <Spin size="small" style={{ display: 'block', margin: '10px auto' }} />
          </div>
        )}
        {allMessages.map((msg, index) => {
          const isMine = msg.idAccountSent == myAccountId;
          const prevMsg = allMessages[index - 1];
          const isFirstOfGroup =
            !prevMsg || prevMsg.idAccountSent !== msg.idAccountSent;
          const showDateDivider =
            !prevMsg || new Date(prevMsg.timeSent).toDateString() !== new Date(msg.timeSent).toDateString();
          return (
            <>
              {showDateDivider && (
                <div className="flex justify-center my-4">
                  <div className="px-4 py-1 bg-gray-200 text-gray-600 text-xs rounded-full shadow-sm">
                    {new Date(msg.timeSent).toLocaleDateString("vi-VN", {
                      weekday: "short",
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </div>
                </div>
              )}
              <div
                key={`${msg.idMessage || "temp"}-${index}-${Date.now()}`}
                className={`flex mb-2 ${isMine ? "justify-end" : "justify-start"
                  }`}
              >
                <div className={`flex ${isMine ? "flex-row-reverse" : "flex-row"} items-start gap-2 w-full`}>
                  {isFirstOfGroup && !isMine && (
                    <div className="w-8 h-8 bg-gray-400 rounded-full flex items-center justify-center text-white text-sm font-bold">
                      <Avatar src={getLinkAvatarByIdAccount(msg.idAccountSent)} size="30px"></Avatar>
                    </div>
                  )}
                  {!isFirstOfGroup && !isMine && <div className="w-8" />} {/* Spacer */}

                  <div
                    className={`px-4 py-2 rounded-xl max-w-[75%] text-gray-700 text-sm break-words box-shadow-message whitespace-pre-wrap ${isMine ? "bg-blue-100" : "bg-white"
                      }`}
                    style={{
                      marginTop: isFirstOfGroup ? "12px" : "2px",
                      borderRadius: isFirstOfGroup
                        ? "18px 18px 18px 4px"
                        : "6px 18px 18px 6px",
                    }}
                  >
                    {msg.type == "NONTEXT" ? (
                      <div className="space-y-3">
                        {msg.attachments
                          .sort((a, b) => a.order - b.order)
                          .map((attachment, index) => {
                            switch (attachment.type) {
                              case "IMAGE":
                              case "GIF":
                              case "STICKER":
                                return (
                                  <Card key={attachment.url} bordered={false} bodyStyle={{ padding: 8 }}>
                                    <Image
                                      src={attachment.url}
                                      alt="Ảnh đính kèm"
                                      width={200}
                                      style={{ borderRadius: 8 }}
                                    />
                                  </Card>
                                );

                              case "VIDEO":
                                return (
                                  <Card key={attachment.url} bordered={false} bodyStyle={{ padding: 8 }}>
                                    <video
                                      controls
                                      style={{ width: "100%", borderRadius: 8 }}
                                      src={attachment.url}
                                    >
                                      Trình duyệt không hỗ trợ video.
                                    </video>
                                  </Card>
                                );

                              case "AUDIO":
                                return (
                                  <Card key={attachment.url} bordered={false} bodyStyle={{ padding: 8 }}>
                                    <audio controls style={{ width: "100%" }}>
                                      <source src={attachment.url} type="audio/mpeg" />
                                      Trình duyệt không hỗ trợ audio.
                                    </audio>
                                  </Card>
                                );

                              case "FILE":
                                return (
                                  <Card key={attachment.url} bordered={false} bodyStyle={{ padding: 8 }}>
                                    <Link
                                      href={attachment.url}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                    >
                                      📎 Mở file đính kèm
                                    </Link>
                                  </Card>
                                );

                              default:
                                return (
                                  <Text type="danger" key={index}>
                                    ❌ Không hỗ trợ loại tệp: {attachment.type}
                                  </Text>
                                );
                            }
                          })}
                        {msg.content && (
                          <Text className="block mt-1 text-base text-gray-800">
                            {msg.content}
                          </Text>
                        )}
                      </div>
                    ) : (
                      msg.content
                    )}
                    <div className="text-xs text-right text-gray-500 mt-1">
                      {msg.timeSent
                        ? new Date(msg.timeSent).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })
                        : ""}
                    </div>
                  </div>
                </div>
              </div>
            </>

          );
        })}
        <div ref={messagesEndRef} />
        {showScrollToBottom && (
          <Button
            shape="circle"
            icon={<ArrowDownOutlined />}
            onClick={scrollToBottom}
            style={{
              position: "absolute",
              bottom: 110,
              left: 570,
              zIndex: 10,
              boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
            }}
          />
        )}
      </div>

      {/* Input */}
      <div
        className="bg-white p-2 border-t fixed bottom-0 border border-gray-300"
        style={{ width: '48.18%' }}
      >
        {/* Upload ảnh */}
        <div className="mb-2">
          <Upload
            multiple
            beforeUpload={() => false}
            fileList={fileList}
            onChange={handleFileChange}
            showUploadList={{ showRemoveIcon: true }}
          >
            <Button icon={<UploadOutlined />}>Tải ảnh</Button>
          </Upload>
        </div>

        <div className="thumbnail">
          {previews.length > 0 && (
            <div className="flex flex-wrap gap-2 p-2">
              {previews.map((preview, index) => (
                <div key={index} className="relative w-[120px] h-[120px] rounded overflow-hidden shadow-md">
                  {preview.type.startsWith("video/") ? (
                    <video
                      src={preview.url}
                      className="w-full h-full object-cover"
                      controls={preview.progress >= 100}
                      muted
                    />
                  ) : (
                    <img
                      src={preview.url}
                      className="w-full h-full object-cover"
                      alt={`preview-${index}`}
                    />
                  )}

                  {preview.progress > 1 && preview.progress < 100 && (
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10"
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        zIndex: 10,
                      }}
                    >
                      <div className="w-[80%] h-2 bg-gray-300 rounded overflow-hidden">
                        <div
                          className="h-2 bg-blue-500 rounded transition-all duration-300"
                          style={{ width: `${preview.progress}%` }}
                        />
                      </div>
                      <div className="absolute bottom-2 right-2 text-white text-xs font-medium">
                        {preview.progress}%
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Input và nút gửi nằm cùng hàng */}
        <div className="flex items-center gap-2">
          <TextArea
            className="flex-1"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Nhập tin nhắn..."
            autoSize={{ minRows: 1, maxRows: 5 }}
          />

          <Button
            type="primary"
            onClick={handleSendMessage}
            loading={uploading}
            icon={<SendOutlined />}
            size="large"
          // Chỉ hiển thị icon không text
          />
        </div>
      </div>
    </div>
  );
};

export default WindowChat;