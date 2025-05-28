import { Link, useLocation, useNavigate } from 'react-router-dom';
import Avatar from '../shared/Avatar';
import IconNavigaion from '../shared/IconNavigaion';
import { useState } from 'react';
import { Modal } from 'antd';
import ModalInfoAccount from '../modals/ModalInfoAccount';

const Sidebar = () => {
    const navigation = useNavigate();
    const location = useLocation();
    // Kiểm tra đường dẫn hiện tại có phải là "/home" hoặc chứa từ khóa cụ thể
    const isPathActive = (keyword) => {
        if (location.pathname === "/home") {
            return keyword === "chats"; // Nếu đang ở /home, chỉ "chats" được active
        }
        return location.pathname.includes(keyword);
    };

    const infoUser = JSON.parse(localStorage.getItem("infoUser"));
    const handleLogout = () => {
        if (window.confirm("Are you sure you want to logout?")) { // Thêm xác nhận
            localStorage.removeItem('token');
            console.log("User logged out successfully");
            navigation('/signin');
        }
    };

    const [open, setOpen] = useState(false);
    const showModal = () => {
        setOpen(true);
    };

    const hideModal = () => {
        setOpen(false);
    };

    return (
        <div className="flex flex-col w-16 h-screen bg-blue-100 gap-4 justify-items-center items-center pt-5 fixed top-0 left-0">
            <div onClick={showModal}>
                <Avatar src={infoUser.imgAvatar} gender='female' />
            </div>
            <Modal
                title="Thông tin tài khoản"
                open={open}
                onOk={hideModal}
                onCancel={hideModal}
                okText="OK"
                cancelText="Cancel"
            >
                <ModalInfoAccount infoUser={infoUser}></ModalInfoAccount>

            </Modal>
            <Link to="/home/chats"><IconNavigaion src="/sidebar/icons8-chat-100.png" isActive={isPathActive('chats')} /></Link>
            <Link to="/home/contacts"><IconNavigaion src="/sidebar/icons8-contact-96.png" isActive={isPathActive('contacts')} /></Link>
            <IconNavigaion src="/sidebar/icons8-setting-100.png" />
            <div onClick={handleLogout}>
                <IconNavigaion src="/public/sidebar/logout.png" />
            </div>
        </div>
    );
};

export default Sidebar;