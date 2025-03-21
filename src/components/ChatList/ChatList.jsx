import React, { useState, useEffect } from 'react';
import Seperate from '../shared/Seperate';
import InfoQuickChat from './InfoQuickChat/InfoQuickChat';
import chatService from '../../services/chatService';
import websocketService from '../../services/websocketService';
import { useParams } from 'react-router-dom';

const ChatList = ({ onSelectConversation }) => {
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filteredNames, setFilteredNames] = useState([]);

  useEffect(() => {
  const fetchConversations = async () => {
    try {
      const response = await chatService.getConversationWithIdAccount();
      console.log("API Response:", response.data); // Kiểm tra dữ liệu trả về
      const data = response.data;

      for (let i = 0; i < data.length; i++) {
        const idConversation = data[i].idConversation;
        websocketService.send(`/app/topic/conversation/${idConversation}`,{}); 
        console.log("Trung- idConversation: ", idConversation);
      }

      /////////////////////////////////
      // Get username
      const username = await chatService.nameConversation();
      console.log("Name storage:", username);
      /////////////////////////////////
      
      // loc name conversation
      const namesList = data.map(chat => {

        const users = chat.name.split(","); // Tách chuỗi name thành mảng
        if(chat.type === "GROUP") {
          return {
            idConversation: chat.idConversation,
            name: chat.name,
            type: chat.type,
            avatar: chat.avatar,
            numberMember: chat.numberMember,
            dateCreate: chat.dateCreate,
            idLastMessage: chat.idLastMessage
          };
        }
        const otherUsers = users.filter(user => user !== username);
        return {
          idConversation: chat.idConversation,
          name: otherUsers.join(", "), // Ghép lại thành chuỗi nếu còn nhiều tên
          type: chat.type,
          avatar: chat.avatar,
          numberMember: chat.numberMember,
          dateCreate: chat.dateCreate,
          idLastMessage: chat.idLast
        };
      });
  
      setFilteredNames(namesList);
      //////////////////////////////////////
      
      if (!Array.isArray(data)) {
        throw new Error("API không trả về danh sách cuộc trò chuyện!");
      }

      setConversations(data);
    } catch (error) {
      console.error("Lỗi khi lấy danh sách cuộc trò chuyện:", error);
    } finally {
      setLoading(false);
    }
  };

  fetchConversations();
}, []);

  // Hàm xử lý khi click vào conversation
  const handleConversationClick = (conv) => {
    onSelectConversation({

        idConversation: conv.idConversation,  // ID cuộc trò chuyện
        title: conv.name || "Unnamed",        // Tên cuộc trò chuyện
        isGroup: conv.type === "GROUP",       // Kiểm tra nhóm chat
        avatar: conv.avatar || "/public/sidebar/boy.png", // Ảnh đại diện
        dateCreate: conv.dateCreate || "Unknown",  // Ngày tạo
        idLastMessage: conv.idLastMessage || "No messages", // Tin nhắn cuối
        numberMember: conv.numberMember || 0,   // Số thành viên
        myAccountId:2,

    });
  };

  return (
    <div className="h-screen bg-white">
      {/* <HeaderChatList></HeaderChatList> */}
      <Seperate />
      <div className="body-chatlist overflow-auto h-[calc(100%-68px)]">
        {filteredNames.map((conv) => (
          <div
            key={conv.idConversation}
            onClick={() => handleConversationClick(conv)}
            className="cursor-pointer"
          >
            <InfoQuickChat
              img={conv.imgAvatar || '/public/sidebar/boy.png'}
              isActive={conv.isActive || false} // Giả định trường isActive từ backend
              title={conv.name || 'Unnamed'}
              nameSenderLast={conv.lastSender || 'Unknown'} // Giả định trường lastSender
              contentLast={conv.lastMessage || 'No messages yet'}
              timeUpdateLast={conv.lastTime || 'N/A'}
              isGroup={conv.type === 'GROUP'}
            />
          </div>
        ))};
      </div>
    </div>
  );
};

export default ChatList;