import { useNavigate } from 'react-router-dom';
import Avatar from '../shared/Avatar';
import IconNavigaion from '../shared/IconNavigaion';

const Sidebar = () => {
    const navigation = useNavigate();
    const handleLogout = () => {
        if (window.confirm("Are you sure you want to logout?")) { // Thêm xác nhận
            localStorage.removeItem('token');
            console.log("User logged out successfully");
            navigation('/signin');
        }
    };
    return (
        <div className="flex flex-col w-16 h-screen bg-red-100 gap-4 justify-items-center items-center pt-5">
            <Avatar gender='female' />
            <IconNavigaion src="/sidebar/icons8-chat-100.png" />
            <IconNavigaion src="/public/sidebar/icons8-contact-96.png" />
            <IconNavigaion src="/sidebar/icons8-setting-100.png" />
            <div onClick={handleLogout}>
                <IconNavigaion src="/public/sidebar/logout.png"  />
            </div>
        </div>
    );
};

export default Sidebar;