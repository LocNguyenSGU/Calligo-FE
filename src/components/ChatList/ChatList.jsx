import { Input } from "antd";
import { SearchOutlined } from '@ant-design/icons'
import IconChatList from "../shared/IconChatList";
import Seperate from "../shared/Seperate";
import InfoQuickChat from "./InfoQuickChat/InfoQuickChat";

const ChatList = () => {
    return (
        <div className="w-[23%] h-screen bg-white">
            <div className="header-chatlist flex gap-1 pb-5 p-2 pt-5">
                <Input placeholder="Tìm kiếm" prefix={<SearchOutlined />} />
                <div className="add-friends-groups flex gap-1">
                    <IconChatList src="/public/chatlist/add-user.png" size="16px"></IconChatList>
                    <IconChatList src="/public/chatlist/add-group.png" size="16px"></IconChatList>
                </div>
            </div>
            <Seperate></Seperate>
            <div className="body-chatlist overflow-auto h-[calc(100%-68px)]">
                <InfoQuickChat 
                    img="/public/sidebar/boy.png" isActive = {true}
                    title="An Long" nameSenderLast="you"
                    contentLast="Chưa biết nữa" timeUpdateLast="2 ngày">
                </InfoQuickChat>
                <InfoQuickChat 
                    img="/public/sidebar/boy.png" 
                    title="An LongLongLongLongLongLongLong" nameSenderLast="youYouYouyouYouYouyouYouYou" isGroup={true}
                    contentLast="Chưa biết nữaChưa biết nữaChưa biết nữaChưa biết nữa" timeUpdateLast="2 ngày">
                </InfoQuickChat>
                <InfoQuickChat 
                    img="/public/sidebar/boy.png" isActive = {true}
                    title="An Long" nameSenderLast="you"
                    contentLast="Chưa biết nữa" timeUpdateLast="2 ngày">
                </InfoQuickChat>
                <InfoQuickChat 
                    img="/public/sidebar/boy.png" 
                    title="An LongLongLongLongLongLongLong" nameSenderLast="youYouYouyouYouYouyouYouYou" isGroup={true}
                    contentLast="Chưa biết nữaChưa biết nữaChưa biết nữaChưa biết nữa" timeUpdateLast="2 ngày">
                </InfoQuickChat>
                <InfoQuickChat 
                    img="/public/sidebar/boy.png" isActive = {true}
                    title="An Long" nameSenderLast="you"
                    contentLast="Chưa biết nữa" timeUpdateLast="2 ngày">
                </InfoQuickChat>
                <InfoQuickChat 
                    img="/public/sidebar/boy.png" 
                    title="An LongLongLongLongLongLongLong" nameSenderLast="youYouYouyouYouYouyouYouYou" isGroup={true}
                    contentLast="Chưa biết nữaChưa biết nữaChưa biết nữaChưa biết nữa" timeUpdateLast="2 ngày">
                </InfoQuickChat>
                <InfoQuickChat 
                    img="/public/sidebar/boy.png" isActive = {true}
                    title="An Long" nameSenderLast="you"
                    contentLast="Chưa biết nữa" timeUpdateLast="2 ngày">
                </InfoQuickChat>
                <InfoQuickChat 
                    img="/public/sidebar/boy.png" 
                    title="An LongLongLongLongLongLongLong" nameSenderLast="youYouYouyouYouYouyouYouYou" isGroup={true}
                    contentLast="Chưa biết nữaChưa biết nữaChưa biết nữaChưa biết nữa" timeUpdateLast="2 ngày">
                </InfoQuickChat>
                <InfoQuickChat 
                    img="/public/sidebar/boy.png" isActive = {true}
                    title="An Long" nameSenderLast="you"
                    contentLast="Chưa biết nữa" timeUpdateLast="2 ngày">
                </InfoQuickChat>
                <InfoQuickChat 
                    img="/public/sidebar/boy.png" 
                    title="An LongLongLongLongLongLongLong" nameSenderLast="youYouYouyouYouYouyouYouYou" isGroup={true}
                    contentLast="Chưa biết nữaChưa biết nữaChưa biết nữaChưa biết nữa" timeUpdateLast="2 ngày">
                </InfoQuickChat>
                <InfoQuickChat 
                    img="/public/sidebar/boy.png" isActive = {true}
                    title="An Long" nameSenderLast="you"
                    contentLast="Chưa biết nữa" timeUpdateLast="2 ngày">
                </InfoQuickChat>
                <InfoQuickChat 
                    img="/public/sidebar/boy.png" 
                    title="An LongLongLongLongLongLongLong" nameSenderLast="youYouYouyouYouYouyouYouYou" isGroup={true}
                    contentLast="Chưa biết nữaChưa biết nữaChưa biết nữaChưa biết nữa" timeUpdateLast="2 ngày">
                </InfoQuickChat>
                <InfoQuickChat 
                    img="/public/sidebar/boy.png" 
                    title="An LongLongLongLongLongLongLong" nameSenderLast="youYouYouyouYouYouyouYouYou" isGroup={true}
                    contentLast="Chưa biết nữaChưa biết nữaChưa biết nữaChưa biết nữa" timeUpdateLast="2 ngày">
                </InfoQuickChat>
                <InfoQuickChat 
                    img="/public/sidebar/boy.png" isActive = {true}
                    title="An Long" nameSenderLast="you"
                    contentLast="Chưa biết nữa" timeUpdateLast="2 ngày">
                </InfoQuickChat>
                <InfoQuickChat 
                    img="/public/sidebar/boy.png" 
                    title="An LongLongLongLongLongLongLong" nameSenderLast="youYouYouyouYouYouyouYouYou" isGroup={true}
                    contentLast="Chưa biết nữaChưa biết nữaChưa biết nữaChưa biết nữa" timeUpdateLast="2 ngày">
                </InfoQuickChat>
            </div>
        </div>
    );
};

export default ChatList;