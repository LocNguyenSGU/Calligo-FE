import Avatar from "../shared/Avatar";
import IconChatList from "../shared/IconChatList";

/* eslint-disable react/prop-types */
const InfoPanel = ({ isGroup = false }) => {
    return (
        <div className='w-[34%] h-screen bg-gray-200'>
            <div className="header-info-panel flex justify-center items-center h-[73px] bg-white border border-gray-200 border-t-0">
                {isGroup ? <span className="font-medium text-lg">Thông tin nhóm</span> : <span className="font-medium text-lg">Thông tin hội thoại</span>}
            </div>
            <div className="info-action-block bg-white pb-3">
                <div className="info-chat flex items-center justify-center flex-col gap-2 pt-5">
                    <Avatar src="/public/sidebar/woman.png" size="56px"></Avatar>
                    <div className="flex items-center gap-2">
                        <div className="title font-medium">Nhóm báo</div>
                        <IconChatList src="/public/infopanel/pencil.png" isRounded={true} size="16px" isSmaller={true}></IconChatList>
                    </div>
                </div>
                <div className={`action-chat flex ${isGroup ? "justify-between" : "justify-center gap-6"}  mt-6`}>
                    <div className="flex flex-col items-center justify-center text-center">
                        <IconChatList src="/public/infopanel/notification.png" isRounded={true} size="16px"></IconChatList>
                        <span className="desc text-sm font-light mt-1">Tắt thông báo</span>
                    </div>
                    <div className="flex flex-col items-center justify-center text-center">
                        <IconChatList src="/public/infopanel/push-pin.png" isRounded={true} size="16px"></IconChatList>
                        <span className="desc text-sm font-light mt-1">Ghim hội thoại</span>
                    </div>
                    {isGroup && <>
                        <div className="flex flex-col items-center justify-center text-center">
                            <IconChatList src="/public/infopanel/add_people.png" isRounded={true} size="18px"></IconChatList>
                            <span className="desc text-sm font-light mt-1">Thêm thành viên</span>
                        </div>
                        <div className="flex flex-col items-center justify-center text-center">
                            <IconChatList src="/public/infopanel/settings.png" isRounded={true} size="16px"></IconChatList>
                            <span className="desc text-sm font-light mt-1">Quản lí nhóm</span>
                        </div>
                    </>}
                </div>
            </div>
        </div>
    );
};

export default InfoPanel;