/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import Seperate from '../shared/Seperate';
import InfoQuickChat from './InfoQuickChat/InfoQuickChat';
import chatService from '../../services/chatService';
import { useChat } from '../../context/ChatContext';

const ChatList = ({ onSelectConversation }) => {
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(true);
  const { messages, subscribeToConversation } = useChat();
  let infoUser = JSON.parse(localStorage.getItem("infoUser"));
  console.log("LOC-----infoUser: ", infoUser)

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const response = await chatService.getConversationWithIdAccount();
        const data = response.data;

        if (!Array.isArray(data)) {
          console.error('⚠️ API không trả về danh sách!');
          return;
        }

        const username = await chatService.nameConversation();

        const processedConversations = data.map(chat => {
          // Subscribes từng cuộc trò chuyện
          subscribeToConversation(chat.idConversation);

          let name = chat.name;
          if (chat.type !== 'GROUP') {
            const users = name.split(',');
            const otherUsers = users.filter(user => user !== username);
            name = otherUsers.join(', ');
          }
          return {
            idConversation: chat.idConversation,
            name,
            type: chat.type,
            avatar: chat.avatar,
            numberMember: chat.numberMember,
            dateCreate: chat.dateCreate,
            idLastMessage: chat.idLastMessage,
            lastSender: chat.lastSender || 'Unknown',
            lastMessage: chat.lastMessage || 'No messages',
            lastTime: chat.lastTime || 'N/A',
            isActive: chat.isActive || false,
          };
        });

        setConversations(processedConversations);
      } catch (error) {
        console.error('❌ Lỗi khi lấy danh sách trò chuyện:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchConversations();
  }, [subscribeToConversation]);

  const handleConversationClick = (conv) => {
    onSelectConversation({
      idConversation: conv.idConversation,
      title: conv.name,
      isGroup: conv.type === 'GROUP',
      avatar: conv.avatar || '/public/sidebar/boy.png',
      dateCreate: conv.dateCreate,
      idLastMessage: conv.idLastMessage,
      numberMember: conv.numberMember,
      myAccountId: infoUser?.idAccount, // 👉 Chỗ này có thể truyền từ props thay vì hardcode?
    });
  };

  console.log("LOC----Message from chat list: ", messages)

  return (
    <div className="h-screen bg-white">
      <Seperate />
      <div className="body-chatlist overflow-auto h-[calc(100%-68px)]">
        {loading ? (
          <div className="text-center py-4">Đang tải...</div>
        ) : (
          conversations.map((conv) => (
            <div
              key={conv.idConversation}
              onClick={() => handleConversationClick(conv)}
              className="cursor-pointer"
            >
              <InfoQuickChat
                img={conv.avatar || '/public/sidebar/boy.png'}
                isActive={conv.isActive}
                title={conv.name}
                nameSenderLast={conv.lastSender}
                contentLast={conv.lastMessage}
                timeUpdateLast={conv.lastTime}
                isGroup={conv.type === 'GROUP'}
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ChatList;