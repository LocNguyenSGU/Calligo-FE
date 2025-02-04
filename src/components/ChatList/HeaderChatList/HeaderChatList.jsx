import { Button, Input, message, Modal } from "antd";
import { PhoneOutlined, SearchOutlined } from '@ant-design/icons'
import IconChatList from "../../shared/IconChatList";
import { useState } from "react";
import authService from "../../../services/authService";
import Avatar from "../../shared/Avatar";
import LoadingSkeleton from "../../shared/LoadingSkeleton";
import TextArea from "antd/es/input/TextArea";
const HeaderChatList = () => {
    const [open, setOpen] = useState(false);
    const [phone, setPhone] = useState("");
    const [infoUser, setInfoUser] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("");

    const showModal = () => {
        setOpen(true);
        setError("");
        setInfoUser(null);
        setPhone("");
    };
    const handleCancel = () => {
        setPhone("");
        setInfoUser(null);
        setError("");
        setOpen(false);
    };
    const handleSearch = async () => {
        if (!phone) {
            message.warning("Vui lòng nhập số điện thoại!");
            return;
        }
        setLoading(true);
        setError("");
        try {
            const response = await authService.getAccountByPhone(phone);
            setInfoUser(response.data);
            setError("")
        } catch (e) {
            if (e?.status === 404) {
                setError("Không tìm thấy tài khoản");
            } else {
                setError("Đã xảy ra lỗi khi tìm kiếm");
            }
            setInfoUser(null);
        } finally {
            setLoading(true);
        }
    };
    return (
        <div>
            <div className="header-chatlist flex gap-1 pb-5 p-2 pt-5">
                <Input placeholder="Tìm kiếm" prefix={<SearchOutlined />} />
                <div className="add-friends-groups flex gap-1">
                    <div onClick={showModal}>
                        <IconChatList src="/public/chatlist/add-user.png" size="16px"></IconChatList>
                    </div>
                    <Modal
                        title="Thêm bạn"
                        open={open}
                        onOk={handleSearch}
                        onCancel={handleCancel}
                        okText="Tìm kiếm"
                        cancelText="Huỷ"
                    >

                        <div>
                            <Input placeholder="Số điện thoại" prefix={<PhoneOutlined />} value={phone} onChange={(e) => { setPhone(e.target.value) }} />
                            {loading && (
                                <div className="my-7 bg-gray-100 rounded-md p-3">
                                    <div className="flex content-between items-center justify-between">
                                        <div className="flex gap-3 items-center">
                                            <LoadingSkeleton width="68px" height="68px" radius="50%"></LoadingSkeleton>
                                            <LoadingSkeleton width="80px" height="14px" radius="4px"></LoadingSkeleton>
                                        </div>
                                        <div className="flex gap-3 mt-3 w-[180px] h-8">
                                            <LoadingSkeleton width="100%" height="100%" radius="4px"></LoadingSkeleton>
                                        </div>
                                    </div>
                                    <div className="mt-3 w-[100%] h-10">
                                        <LoadingSkeleton width="100%" height="100%" radius="4px"></LoadingSkeleton>
                                    </div>
                                </div>
                            )}
                            {infoUser !== null && (
                                <div className=" my-7 bg-gray-100 rounded-md p-3">
                                    <div className="flex content-between items-center justify-between">
                                        <div className="flex gap-3 items-center">
                                            <Avatar src="/public/sidebar/woman.png" size="68px" />
                                            <span className="font-semibold text-base mt-2">{infoUser?.firstName + ' ' + infoUser?.lastName}</span>
                                        </div>
                                        <div className="flex gap-3 mt-3">
                                            <Button>Nhắn tin</Button>
                                            <Button type="primary">Kết bạn</Button>
                                        </div>
                                    </div>
                                    <div className="mt-3">
                                        <TextArea
                                            placeholder="Nhập tin nhắn lời mời kết bạn"
                                            autoSize={{ minRows: 2, maxRows: 3 }}
                                        />
                                    </div>

                                </div>
                            )}
                            {error != "" && (<span className="text-red-500 mt-3 block ml-3">{error}</span>)}
                        </div>
                    </Modal>
                    <div onClick={showModal}>
                        <IconChatList src="/public/chatlist/add-group.png" size="16px"></IconChatList>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HeaderChatList;