/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import Seperate from "../shared/Seperate";
import InfoQuickChat from "./InfoQuickChat/InfoQuickChat";
import chatService from "../../services/chatService";
import { useChat } from "../../context/ChatContext";

const ChatList = ({ onSelectConversation }) => {
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(true);
  const { message, subscribeToConversation } = useChat();
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

  // Chuẩn hóa dữ liệu trả về từ API để dễ dùng hơn
  const normalizeConversations = (rawData, userId) => {
    return rawData.map((conv) => {
      const isGroup = conv.type === "GROUP";
      const otherParticipants = conv.participantInfos.filter(
        (p) => p.idAccount !== userId
      );

      const displayName = isGroup
        ? conv.name
        : otherParticipants[0]?.nickname || "No Name";

      const avatar = isGroup
        ? conv.avatar || "/public/sidebar/group.png"
        : otherParticipants[0]?.avatar || "/public/sidebar/boy.png";

      return {
        id: conv.idConversation,
        isGroup,
        avatar,
        title: displayName,
        lastMessage: conv.lastMessageContent || "",
        updatedAt: conv.dateCreate,
        participants: conv.participantInfos,
      };
    });
  };

  // 🔄 Chuẩn bị cho cập nhật realtime (giả sử socket push về newConv)
  useEffect(() => {
    const unsubscribe = subscribeToConversation((newConvRaw) => {
      const newConv = normalizeConversations([newConvRaw], infoUser?.idAccount)[0];

      setConversations((prev) => {
        const updated = [...prev.filter(c => c.id !== newConv.id), newConv];
        return updated.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
      });
    });

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, [infoUser?.idAccount]);

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