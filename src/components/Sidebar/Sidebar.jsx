import { Link, useLocation, useNavigate } from 'react-router-dom';
import Avatar from '../shared/Avatar';
import IconNavigaion from '../shared/IconNavigaion';
import { useState } from 'react';
import { Modal } from 'antd';
import ModalInfoAccount from '../modals/ModalInfoAccount';

const Sidebar = () => {
    const navigation = useNavigate();
    const location = useLocation();
     // Kiểm tra đường dẫn hiện tại có chứa từ khóa không
     const isPathActive = (keyword) => location.pathname.includes(keyword);

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
        <div className="flex flex-col w-16 h-screen bg-red-100 gap-4 justify-items-center items-center pt-5">
            <div onClick={showModal}>
                <Avatar gender='female' />
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
            <Link to="/home/chats"><IconNavigaion src="/sidebar/icons8-chat-100.png" isActive={isPathActive('chats')}/></Link>
            <Link to="/home/contacts"><IconNavigaion src="/sidebar/icons8-contact-96.png" isActive={isPathActive('contacts')}/></Link>
            <IconNavigaion src="/sidebar/icons8-setting-100.png" />
            <div onClick={handleLogout}>
                <IconNavigaion src="/public/sidebar/logout.png" />
            </div>
        </div>
    );
};

export default Sidebar;