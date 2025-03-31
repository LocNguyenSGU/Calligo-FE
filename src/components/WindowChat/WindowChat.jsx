/* eslint-disable react/prop-types */
import React, { useEffect, useRef, useState } from 'react';
import TextArea from 'antd/es/input/TextArea';
import Avatar from '../shared/Avatar';
import IconChatList from '../shared/IconChatList';
import Seperate from '../shared/Seperate';
import chatService from '../../services/chatService';
import { useChat } from '../../context/ChatContext';
import VideoCall from '../Call/VideoCall';

const WindowChat = ({ src, title, isGroup, lastTime, idConversation, myAccountId }) => {
  const [initialMessages, setInitialMessages] = useState([]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

  const { messages, sendMessage } = useChat();

  const allMessages = React.useMemo(() => {
    const idKey = String(idConversation);
    const incomingMessages = messages[idKey] || [];

    if (!incomingMessages || incomingMessages.length == 0) {
      return [...initialMessages];
    }

    const combined = [...initialMessages];

    incomingMessages.forEach(msg => {
      if (!combined.some(m => m.idMessage == msg.idMessage)) {
        combined.push(msg);
      }
    });

    return combined;
  }, [initialMessages, messages, idConversation]);

  // Scroll to bottom khi allMessages thay đổi
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [allMessages]);

  // Fetch tin nhắn ban đầu từ API
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await chatService.getMessages(idConversation);
        if (!Array.isArray(response)) throw new Error("API không trả về danh sách tin nhắn!");
        setInitialMessages(response);
      } catch (error) {
        console.error("Lỗi khi lấy danh sách tin nhắn:", error);
      }
    };
    fetchMessages();
  }, [idConversation]);

  const handleSendMessage = () => {
    if (!input.trim()) return;
    const message = {
      idConversation,
      idAccountSent: myAccountId,
      content: input.trim(),
    };
    sendMessage(idConversation, message);
    setInput('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };


  const [stream, setStream] = useState(null);
  const [isCalling, setIsCalling] = useState(false);

  const handleCallVideo = () => {
      navigator.mediaDevices
          .getUserMedia({ video: true, audio: true })
          .then((mediaStream) => {
              setStream(mediaStream);
              setIsCalling(true); // Hiển thị giao diện call
          })
          .catch((error) => console.error("🚫 Lỗi truy cập camera:", error));
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
              <p className="font-light text-sm">Đang hoạt động || Truy cập hôm qua</p>
            ) : (
              <div className="flex gap-1 items-center">
                <img src="/public/chatlist/icons8-person-64.png" className="w-4 h-4" alt="group" />
                <p className="font-light text-sm">
                  <span className="number-people">30</span> thành viên
                </p>
              </div>
            )}
          </div>
        </div>
        <div className="flex gap-1">
          {isGroup && <IconChatList src="/public/chatlist/add-group.png" size="16px" />}
          <div onClick={() => handleCallVideo()} className="cursor-pointer">
            <IconChatList src="/public/windowchat/cam-recorder.png" />
          </div>
          {isCalling && <VideoCall stream={stream} userId={6} partnerId={7} onEndCall={() => setIsCalling(false)} />}
          <div onClick={() => alert("Chức năng đang phát triển")} className="cursor-pointer">
            <IconChatList src="/public/windowchat/search-interface-symbol.png" size="16px" />
          </div>
          <div onClick={() => alert("Chức năng đang phát triển")} className="cursor-pointer">
            <IconChatList src="/public/windowchat/separate.png" />
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="flex-1 overflow-auto scrollbar-thin scrollbar-thumb-gray-400 p-3 pr-4 bg-gray-200">
        {allMessages.map((msg) => (
          <div
            key={msg.idMessage}
            className={`flex mb-2 ${msg.idAccountSent == myAccountId ? "justify-end" : "justify-start"}`}
          >
            <div className={`flex items-start gap-2 ${msg.idAccountSent == myAccountId ? "flex-row-reverse" : "flex-row"}`}>
              <div className="w-9 h-9 bg-gray-400 rounded-full flex items-center justify-center text-white font-bold">
                {msg.name?.[0] || "U"}
              </div>
              <div className={`mr-5 px-4 py-3 rounded-md max-w-[75%] text-gray-600 box-shadow-message ${msg.idAccountSent == myAccountId ? 'bg-blue-100' : 'bg-white'}`}>
                {msg.idAccountSent == myAccountId && (
                  <span className="text-gray-700 font-light text-sm inline-block mb-1">
                    {msg.idAccountSent}
                  </span>
                )}
                <div className="text-black text-base">{msg.content}</div>
                <span className="text-gray-700 font-light text-xs inline-block mt-1">
                  {msg.timestamp ? new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''}
                </span>
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="bg-white sticky bottom-0">
        <div className="flex items-center gap-4 px-2 py-1">
          <IconChatList size="23px" src="/public/windowchat/image-gallery.png" />
          <IconChatList size="23px" src="/public/windowchat/paper.png" />
        </div>
        <Seperate />
        <div className="p-2 flex items-center justify-between gap-2">
          <div className="w-[90%]">
            <TextArea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Nhập nội dung ..."
              autoSize={{ minRows: 1, maxRows: 5 }}
              style={{ fontSize: '16px' }}
              onKeyDown={handleKeyPress}
            />
          </div>
          <div className="w-[10%] flex items-center justify-center gap-2">
            <IconChatList size="23px" src="/public/windowchat/happy.png" />
            <div onClick={handleSendMessage} className="cursor-pointer">
              <IconChatList size="25px" src="/public/windowchat/paper-plane.png" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WindowChat;