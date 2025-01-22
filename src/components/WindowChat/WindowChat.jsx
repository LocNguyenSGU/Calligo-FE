/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import Avatar from "../shared/Avatar";
import IconChatList from "../shared/IconChatList";

const WindowChat = ({ src, title, isGroup = false, lastTime }) => {
    return (
        <div className="w-[54%] h-screen bg-gray-200">
            <div className="header-window-chat flex justify-between items-center p-3 bg-white border border-gray-200 border-t-0">
                <div className="header-info flex gap-2">
                    <Avatar src="/public/sidebar/woman.png"></Avatar>
                    <div className="flex flex-col gap-[2px]">
                        <span className="title font-medium">Nhóm báo</span>
                        {!isGroup ? <p className="info-user font-light text-sm">Đang hoạt động || Truy cập hôm qua</p>
                            :
                            <div className="flex gap-1 items-center">
                                <img src="/public/chatlist/icons8-person-64.png" className="w-4 h-4"></img>
                                <p className="info-group font-light text-sm"><span className="number-people">30</span> thành viên</p>
                            </div>
                        }
                    </div>
                </div>
                <div className="header-action flex gap-1">
                    {isGroup && <IconChatList src="/public/chatlist/add-group.png" size="16px"></IconChatList>}
                    <IconChatList src="/public/windowchat/cam-recorder.png"></IconChatList>
                    <IconChatList src="/public/windowchat/search-interface-symbol.png" size="16px"></IconChatList>
                    <IconChatList src="/public/windowchat/separate.png"></IconChatList>
                </div>
                
            </div>
        </div>
    );
};

export default WindowChat;