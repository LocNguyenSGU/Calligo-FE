/* eslint-disable react/prop-types */
import React, { useEffect, useMemo, useRef, useState } from "react";
import TextArea from "antd/es/input/TextArea";
import Avatar from "../shared/Avatar";
import IconChatList from "../shared/IconChatList";
import chatService from "../../services/chatService";
import { useChat } from "../../context/ChatContext";
import { Upload, Button, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { SendOutlined } from '@ant-design/icons';
import { Image, Card, Typography } from "antd";
const { Link, Text } = Typography;


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

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [allMessages]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await chatService.getMessages(idConversation);
        if (!Array.isArray(response)) throw new Error("API không hợp lệ!");
        setInitialMessages(response);
      } catch (error) {
        console.error("Lỗi khi tải tin nhắn:", error);
      }
    };

    fetchMessages();
  }, [idConversation]);

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

  const handleFileChange = ({ fileList }) => setFileList(fileList);

  const handleUploadImages = async () => {
    try {
      setUploading(true);

      const uploadPromises = fileList.map((file, index) => {
        return new Promise((resolve, reject) => {
          const xhr = new XMLHttpRequest();
          const formData = new FormData();
          formData.append("file", file.originFileObj);
          formData.append("upload_preset", "calligo_preset");

          xhr.open("POST", "https://api.cloudinary.com/v1_1/doycy5gbl/image/upload", true);

          xhr.upload.onprogress = (event) => {
            if (event.lengthComputable) {
              const progress = Math.round((event.loaded / event.total) * 100);
              console.log(`Ảnh ${index + 1} đang upload: ${progress}%`);
              setUploadProgress((prev) => {
                const newProgress = [...prev];
                newProgress[index] = progress;
                return newProgress;
              });
            }
          };

          xhr.onload = () =>
            resolve({
              url: JSON.parse(xhr.responseText).secure_url,
              order: index,
              type: "IMAGE",
              timeUpload: new Date().toISOString(),
            });
          xhr.onerror = reject;

          xhr.send(formData);
        });
      });

      const uploadedAttachments = await Promise.all(uploadPromises);

      const messageData = {
        idConversation,
        idAccountSent: myAccountId,
        content: "", // không có văn bản
        type: "NONTEXT",
        attachments: uploadedAttachments,
        timeSent: new Date().toISOString(),
      };

      sendMessage(idConversation, messageData);

      message.success("Gửi hình ảnh thành công!");
      setInput("");
      setFileList([]);
      setUploadProgress([]);
    } catch (error) {
      console.error("Upload thất bại:", error);
      message.error("Tải ảnh thất bại");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="w-[66%] h-screen bg-gray-200 flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-center p-3 bg-white border border-gray-200 border-t-0">
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
      <div className="flex-1 overflow-auto scrollbar-thin scrollbar-thumb-gray-400 p-3 pr-4 bg-gray-200 " style={{ marginBottom: "100px" }}>
        {allMessages.map((msg, index) => {
          const isMine = msg.idAccountSent == myAccountId;
          const prevMsg = allMessages[index - 1];
          const isFirstOfGroup =
            !prevMsg || prevMsg.idAccountSent !== msg.idAccountSent;

          return (
            <div
              key={msg.idMessage}
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
                    // <img
                    //   src={msg.attachments[0].url}
                    //   alt="img"
                    //   className="rounded-md max-w-full"
                    // />
                    <div className="space-y-3">
                      {msg.attachments
                        .sort((a, b) => a.order - b.order)
                        .map((attachment, index) => {
                          switch (attachment.type) {
                            case "IMAGE":
                            case "GIF":
                            case "STICKER":
                              return (
                                <Card key={index} bordered={false} bodyStyle={{ padding: 8 }}>
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
                                <Card key={index} bordered={false} bodyStyle={{ padding: 8 }}>
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
                                <Card key={index} bordered={false} bodyStyle={{ padding: 8 }}>
                                  <audio controls style={{ width: "100%" }}>
                                    <source src={attachment.url} type="audio/mpeg" />
                                    Trình duyệt không hỗ trợ audio.
                                  </audio>
                                </Card>
                              );

                            case "FILE":
                              return (
                                <Card key={index} bordered={false} bodyStyle={{ padding: 8 }}>
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
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div
        className="bg-white p-2 border-t fixed bottom-0"
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