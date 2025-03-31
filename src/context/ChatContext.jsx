/* eslint-disable react/prop-types */
// src/context/chatContext.js
import { createContext, useContext, useState, useEffect, useCallback } from 'react';
// import WebsocketService from '../services/websocketService';
import websocketServiceInstance from '../services/websocketService';

// 1. Tạo Context
const ChatContext = createContext();

// 2. Custom hook để dùng
export const useChat = () => useContext(ChatContext);

// 3. Provider
export const ChatProvider = ({ children }) => {
  const [messages, setMessages] = useState({}); // idConversation => [msg1, msg2,...]

  // Connect WebSocket khi app chạy lần đầu
  useEffect(() => {
    websocketServiceInstance.connect();
    return () => websocketServiceInstance.disconnect(); // cleanup khi app đóng
  }, []);

  // Nhận message và cập nhật vào state
  const handleIncomingMessage = useCallback((idConversation, message) => {
    console.log("message nhan thong qua handleIncomingMessage: ", message)
    setMessages(prev => ({
      ...prev,
      [String(idConversation)]: [...(prev[String(idConversation)] || []), message]
    }));
  }, []);

  // Subscribe vào 1 cuộc hội thoại
  const subscribeToConversation = useCallback((idConversation) => {
    const topic = `/topic/conversation/${idConversation}`;
    websocketServiceInstance.subscribe(topic, (message) => {
      console.log(`📥 Received message for conversation ${idConversation}:`, message);
      handleIncomingMessage(idConversation, message);
    });
  }, [handleIncomingMessage]);

  // Unsubscribe
  const unsubscribeFromConversation = useCallback((idConversation) => {
    const topic = `/topic/conversation/${idConversation}`;
    websocketServiceInstance.unsubscribe(topic);
  }, []);

  // Gửi message
  const sendMessage = useCallback((idConversation, messageObj) => {
    const destination = `/app/send/${idConversation}`;
    if (websocketServiceInstance.connected) {
      console.log("connected -> gui")
      websocketServiceInstance.send(destination, messageObj);
    } else {
      websocketServiceInstance.connect(() => {
        console.log("chua connect -> khong gui -> gui")
        websocketServiceInstance.send(destination, messageObj);
      });
    }
  }, []);

  const value = {
    messages, // {idConversation: [msg1, msg2]}
    subscribeToConversation,
    unsubscribeFromConversation,
    sendMessage
  };

  return (
    <ChatContext.Provider value={value}>
      {children}
    </ChatContext.Provider>
  );
};