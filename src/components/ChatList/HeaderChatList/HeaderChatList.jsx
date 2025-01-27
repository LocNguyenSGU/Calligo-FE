import { Input } from "antd";
import { SearchOutlined } from '@ant-design/icons'
import IconChatList from "../../shared/IconChatList";
const HeaderChatList = () => {
    return (
        <div>
            <div className="header-chatlist flex gap-1 pb-5 p-2 pt-5">
                <Input placeholder="Tìm kiếm" prefix={<SearchOutlined />} />
                <div className="add-friends-groups flex gap-1">
                    <IconChatList src="/public/chatlist/add-user.png" size="16px"></IconChatList>
                    <IconChatList src="/public/chatlist/add-group.png" size="16px"></IconChatList>
                </div>
            </div>
        </div>
    );
};

export default HeaderChatList;