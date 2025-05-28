/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import Seperate from "../shared/Seperate";
import InfoQuickChat from "./InfoQuickChat/InfoQuickChat";
import chatService from "../../services/chatService";
import { useChat } from "../../context/ChatContext";

const ChatList = ({ onSelectConversation }) => {
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(true);
  const { messages, subscribeToConversation } = useChat();
  const infoUser = JSON.parse(localStorage.getItem("infoUser"));

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const response = await chatService.getConversationWithIdAccount();
        const raw = response.data.data;

        if (!Array.isArray(raw)) {
          console.warn("API không trả về danh sách.");
          return;
        }

        const normalized = normalizeConversations(raw, infoUser?.idAccount);
        normalized.forEach(element => {
          subscribeToConversation(element.id);
        });
        // Sắp xếp theo thời gian cập nhật gần nhất
        normalized.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
        setConversations(normalized);
      } catch (error) {
        console.error("❌ Lỗi khi lấy danh sách trò chuyện:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchConversations();
  }, [infoUser?.idAccount]);

  console.log("MESSAGE IN CHATLIST: ", messages)

  // Chuẩn hóa dữ liệu trả về từ API để dễ dùng hơn
  const normalizeConversations = (rawData, userId) => {
    return rawData.map((conv) => {
      const isGroup = conv.type === "GROUP";
      const otherParticipants = conv.participantInfos.filter(
        (p) => p.idAccount != userId
      );

      const displayName = isGroup
        ? conv.name
        : otherParticipants[0]?.nickname || "No Name";

      const avatar = isGroup
        ? conv.avatar || "/public/sidebar/group.png"
        : otherParticipants[0]?.imgAvatar || "/public/sidebar/boy.png";

      return {
        id: conv.idConversation,
        isGroup,
        avatar,
        title: displayName,
        lastMessage: conv.lastMessageContent || "",
        updatedAt: conv.dateUpdateMessage,
        participants: conv.participantInfos,
        numberMember: conv.numberMember || "3"
      };
    });
  };


  useEffect(() => {
  if (!messages || Object.keys(messages).length === 0) return;

  setConversations((prevConversations) => {
    const updatedConversations = [...prevConversations];

    Object.entries(messages).forEach(([convId, messageList]) => {
      if (Array.isArray(messageList) && messageList.length > 0) {
        const latestMessage = messageList[messageList.length - 1];

        const index = updatedConversations.findIndex((conv) => conv.id === convId);
        if (index !== -1) {
          updatedConversations[index] = {
            ...updatedConversations[index],
            lastMessage: latestMessage.content,
            updatedAt: latestMessage.timeSent,
          };
        }
      }
    });

    return updatedConversations.sort(
      (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
    );
  });
}, [messages]);

  return (
    <div className="h-screen bg-white">
      <Seperate />
      <div className="body-chatlist overflow-auto h-[calc(100%-68px)]">
        {loading ? (
          <div className="text-center py-4">Đang tải...</div>
        ) : (
          conversations.map((conv) => (
            <div
              key={conv.id}
              className="cursor-pointer"
              onClick={() => onSelectConversation?.(conv)}
            >
              <InfoQuickChat
                img={conv.avatar}
                isActive={conv.isActive}
                title={conv.title}
                nameSenderLast={""} // Có thể cập nhật nếu backend trả về sender name
                contentLast={conv.lastMessage}
                timeUpdateLast={conv.updatedAt}
                isGroup={conv.isGroup}
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ChatList;