/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useEffect, useRef, useState } from 'react';
import TextArea from 'antd/es/input/TextArea';
import Avatar from '../shared/Avatar';
import IconChatList from '../shared/IconChatList';
import Seperate from '../shared/Seperate';
import websocketService from '../../services/websocketService';
import chatService from '../../services/chatService';

const WindowChat = ({ src, title, isGroup, lastTime, idConversation, myAccountId }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  console.log("Loc- idConversation: ", idConversation);
  console.log("Loc- myAccountId: ", myAccountId);

  useEffect(() => {
    const fetchMessages = async () => {
      console.log("Loc- dang fetch api get danh sach tn");
      try {
        const response = await chatService.getMessages(idConversation);
        if (!Array.isArray(response)) throw new Error("API không trả về danh sách tin nhắn!");
        setMessages(response);
      } catch (error) {
        console.error("Lỗi khi lấy danh sách tin nhắn:", error);
      }
    };
    fetchMessages();


    // Kết nối WebSocket và subscribe
    if (websocketService.connected) {
      websocketService.subscribe(`/topic/conversation/${idConversation}`, handleReceiveMessage);
    } else {
      websocketService.connect(() => {
        console.log('Connected to WebSocket');
        websocketService.subscribe(`/topic/conversation/${idConversation}`, handleReceiveMessage);
      });
    }
    // Cleanup khi component unmount
    return () => {
      // Nếu cần ngắt subscribe:
      // websocketService.unsubscribe(`/topic/conversation/${idConversation}`);
      // console.log('LOC Unsubscribed from', `/topic/conversation/${idConversation}`);
    };

  }, [idConversation]);
  console.log("LOc: ", messages);

  // const handleMessageChange = (e) => {
  //   setMessages(e.target.value);
  // };

  const sendMessage = () => {

    if (!input.trim()) return;
  
    const message = {
      idConversation,
      idAccountSent: myAccountId,
      content: input,
      sender: "Me",
      timestamp: new Date().toISOString(),
    };
  
    if (websocketService.connected) {
      websocketService.send(`/app/send/${idConversation}`, JSON.stringify(message));
      setInput('');
    } else {
      console.warn('WebSocket chưa kết nối, không thể gửi tin nhắn.');
      // Option: hiện thông báo trên UI hoặc thử kết nối lại

    }
  };


  // Hàm xử lý tin nhắn mới nhận từ WebSocket
  const handleReceiveMessage = (message) => {
    const receivedMessage = JSON.parse(message);
    console.log('Loc Received message 1111:', receivedMessage);
    setMessages((prev) => [...prev, receivedMessage]);
  };

  return (
    <div className="w-[66%] h-screen bg-gray-200">
      {/* Header */}
      <div className="header-window-chat flex justify-between items-center p-3 bg-white border border-gray-200 border-t-0">
        <div className="header-info flex gap-2">
          <Avatar src={src || "/public/sidebar/woman.png"} />
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

      {/* Body */}
      <div className="body-window-chat bg-gray-200 max-h-[calc(100vh-165px)] overflow-auto scrollbar-thin scrollbar-thumb-gray-400">
        <div className="pl-3 pr-4 content-message overflow-auto h-[calc(100vh-170px)] bg-gray-200 scrollbar-thin scrollbar-thumb-gray-400 " style={{"padding-right": "20px"}}>
          {messages.map((msg, index) => (
            <div key={index} className={`flex mb-2 ${msg.idAccountSent == myAccountId ? "justify-end" : "justify-start"}`}>

              <div className={`flex items-start gap-2 ${msg.idAccountSent == myAccountId ? "flex-row-reverse" : "flex-row"}`}>
                <div className="w-9 h-9 bg-gray-400 rounded-full flex items-center justify-center text-white font-bold">
                  {msg.name || "U"}
                </div>
                <div className={`mr-5 px-4 py-3 rounded-md max-w-[75%] text-gray-600 box-shadow-message ${msg.idAccountSent == myAccountId ? 'bg-blue-100' : 'bg-white'
                  }`}>
                  {msg.idAccountSent == myAccountId && (
                    <span className="text-gray-700 font-light text-sm inline-block mb-1">

                      {msg.idAccountSent}
                    </span>
                  )}
                  <div className="text-black text-base">{msg.content}</div>
                  <span className="text-gray-700 font-light text-xs inline-block mb-1">
                    {new Date(msg.timestamp).toLocaleTimeString()}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
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
              onPressEnter={sendMessage}
            />
          </div>
          <div className="input-quick-emoji w-[10%] flex items-center justify-center gap-2">
            <div>
            <IconChatList size="23px" src="/public/windowchat/happy.png" />
            </div>
            <div onClick={sendMessage}>
              <IconChatList size="25px" src="/public/windowchat/paper-plane.png" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WindowChat;