import { getTimeAgo } from "../../../utils/getTimeAgo";
import Avatar from "../../shared/Avatar";

// Hàm cắt chuỗi nếu dài hơn giới hạn
const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
        return text.substring(0, maxLength) + "...";
    }
    return text;
};

// eslint-disable-next-line react/prop-types
const InfoQuickChat = ({ img, title, nameSenderLast, contentLast, timeUpdateLast, isGroup = false, isActive = false}) => {
    const MAX_NAME_LENGTH = 15; // Giới hạn cố định cho nameSenderLast
    const TOTAL_CONTENT_LENGTH = 36; 

    // Tính toán độ dài tối đa cho contentLast
    // eslint-disable-next-line react/prop-types
    const remainingLength = TOTAL_CONTENT_LENGTH - Math.min(nameSenderLast?.length || 0, MAX_NAME_LENGTH);
    const truncatedName = truncateText(nameSenderLast, MAX_NAME_LENGTH);
    const truncatedContent = truncateText(contentLast, remainingLength);

    return (
        <div 
        className={`flex items-center py-2 px-3 hover:bg-gray-100 cursor-pointer ${
            isActive ? "bg-blue-200 hover:bg-blue-200" : ""
        }`}
        >
            <Avatar src={img}/>
            <div className="flex flex-col ml-3 w-full">
                <div className="flex justify-between">
                    <p className="text-sm font-medium flex items-center">
                        {isGroup && (
                            <img
                                src="/public/chatlist/icons8-group-80.png"
                                alt="group"
                                className="w-4 h-4 mr-1"
                            />
                        )}
                        {truncateText(title, 20)} {/* Title vẫn cố định 20 ký tự */}
                    </p>
                    <p className="text-xs text-gray-500">{getTimeAgo(timeUpdateLast)}</p>
                </div>
                <div className="flex text-xs text-gray-500 truncate">
                    {truncatedName && <p className="mr-1">{truncatedName}:</p>}
                    <p className="truncate">{truncatedContent}</p>
                </div>
            </div>
        </div>
    );
};

export default InfoQuickChat;