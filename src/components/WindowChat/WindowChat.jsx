/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import TextArea from 'antd/es/input/TextArea';
import Avatar from '../shared/Avatar';
import IconChatList from '../shared/IconChatList';
import Seperate from '../shared/Seperate';
import websocketService from '../../services/websocketService';
import chatService from '../../services/chatService';

const WindowChat = ({ src, title, isGroup, lastTime, idConversation }) => {
  const [messages, setMessages] = useState([]); // Danh sách tin nhắn động
  const [input, setInput] = useState(''); // Nội dung tin nhắn người dùng nhập
  console.log('idConversation:', idConversation);
  const myAccountId = 2; 

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await chatService.getMessages(idConversation);
        console.log("API Response Messages:", response); // Kiểm tra dữ liệu trả về
        setMessages(response);
        
        if (!Array.isArray(response)) {
          throw new Error("API không trả về danh sách tin nhan!");
        }
  
      } catch (error) {
        console.error("Lỗi khi lấy danh sách tin nhan:", error);
      } 
    };
  
    fetchMessages();
    // Kết nối WebSocket và subscribe vào conversation
    websocketService.connect(() => {
      websocketService.subscribe(`/topic/conversation/${idConversation}`, (message) => {
        const receivedMessage = JSON.parse(message); // Backend gửi JSON
        setMessages((prev) => [...prev, receivedMessage]);
      });
    });

    // Cleanup khi component unmount (tùy chọn, nếu cần ngắt kết nối riêng cho conversation)
    return () => {
      // Nếu cần, gửi disconnect tới backend
      // websocketService.send(`/app/disconnect/${idConversation}`, {});
    };
  }, [idConversation]);

  const sendMessage = () => {
    if (input) {
      const message = {
        content: input,
        sender: "Me", // Thay bằng ID hoặc tên người dùng thực tế từ auth
        timestamp: new Date().toISOString(), // Thêm timestamp nếu backend yêu cầu
      };
      websocketService.send(`/app/send/${idConversation}`, JSON.stringify(message));
      setInput('');
      console.log('idConversation:', idConversation);
    }
  };

  return (
    <div className="w-[66%] h-screen bg-gray-200">
      <div className="header-window-chat flex justify-between items-center p-3 bg-white border border-gray-200 border-t-0">
        <div className="header-info flex gap-2">
          <Avatar src="/public/sidebar/woman.png"></Avatar>
          <div className="flex flex-col gap-[2px]">
            <span className="title font-medium">{title}</span>
            {!isGroup ? (
              <p className="info-user font-light text-sm">Đang hoạt động || Truy cập hôm qua</p>
            ) : (
              <div className="flex gap-1 items-center">
                <img src="/public/chatlist/icons8-person-64.png" className="w-4 h-4" alt="group" />
                <p className="info-group font-light text-sm">
                  <span className="number-people">30</span> thành viên
                </p>
              </div>
            )}
          </div>
        </div>
        <div className="header-action flex gap-1">
          {isGroup && <IconChatList src="/public/chatlist/add-group.png" size="16px" />}
          <IconChatList src="/public/windowchat/cam-recorder.png" />
          <IconChatList src="/public/windowchat/search-interface-symbol.png" size="16px" />
          <IconChatList src="/public/windowchat/separate.png" />
        </div>
      </div>
      <div className="body-window-chat bg-gray-200 max-h-[calc(100vh-165px)] overflow-auto scrollbar-thin scrollbar-thumb-gray-400">
        <div className="pl-3 content-message overflow-auto h-[calc(100vh-170px)] bg-gray-200 scrollbar-thin scrollbar-thumb-gray-400">
          {messages.map((msg, index) => (
            <div key={index} className={`flex mb-2 ${msg.idAccountSent === myAccountId ? "justify-end" : "justify-start"}`}>
              <div className={`flex items-start gap-2 ${msg.idAccountSent === myAccountId  ? "flex-row-reverse" : "flex-row"}`}>
                {msg.idAccountSent === myAccountId  && (
                  <div className="w-9 h-9 bg-gray-400 rounded-full flex items-center justify-center text-white font-bold">
                    {msg.sender[0]}
                  </div>
                )}
                <div
                  className={`block-message-recived mr-5 px-4 py-3 rounded-md max-w-[75%] text-gray-600 box-shadow-message ${
                    msg.idAccountSent === myAccountId  ? 'bg-blue-100' : 'bg-white'
                  }`}
                >
                  {msg.idAccountSent === myAccountId  && (
                    <span className="name-person-sent text-gray-700 font-light text-sm inline-block mb-1">
                      {msg.idAccountSent}
                    </span>
                  )}
                  <div className="content-message font-normal text-black text-base">
                    {msg.content}
                  </div>
                  <span className="name-person-sent text-gray-700 font-light text-xs inline-block mb-1">
                    {new Date(msg.timestamp).toLocaleTimeString()}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="block-input-message bg-white sticky bottom-0">
        <div className="action-image-file flex items-center gap-4 px-2 py-1">
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
              onPressEnter={sendMessage} // Gửi khi nhấn Enter
            />
          </div>
          <div className="input-quick-emoji w-[10%] flex items-center justify-center gap-2">
            <IconChatList size="23px" src="/public/windowchat/happy.png" />
            <IconChatList size="25px" src="/public/windowchat/paper-plane.png" onClick={sendMessage} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WindowChat;