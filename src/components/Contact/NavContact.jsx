import { Link, useLocation } from "react-router-dom";

const NavContact = () => {
    const location = useLocation();

    return (
        <div>
            <Link to={'/home/contacts/friend-list'}>
                <div className={`flex items-center gap-3 p-4 cursor-pointer 
                    ${location.pathname === '/home/contacts/friend-list' || location.pathname === '/home/contacts' ? "bg-blue-200 hover:bg-blue-200" : " hover:bg-gray-100"}`}>
                    <img src="/public/contact/friend_list.png" className="w-6 h-6" alt="Friend List" />
                    <span className="block text-base font-medium">Danh sách bạn bè</span>
                </div>
            </Link>

            <Link to={'/home/contacts/friend-requestes'}>
                <div className={`flex items-center gap-3 p-4 cursor-pointer 
                    ${location.pathname === '/home/contacts/friend-requestes' ? "bg-blue-200 hover:bg-blue-200" : "hover:bg-gray-100"}`}>
                    <img src="/public/contact/friend_request.png" className="w-6 h-6" alt="Friend Request" />
                    <span className="block text-base font-medium">Lời mời kết bạn</span>
                </div>
            </Link>

            <Link to={'/home/contacts/group-list'}>
                <div className={`flex items-center gap-3 p-4 cursor-pointer 
                    ${location.pathname === '/home/contacts/group-list' ? "bg-blue-200 hover:bg-blue-200" : " hover:bg-gray-100"}`}>
                    <img src="/public/chatlist/icons8-group-80.png" className="w-6 h-6" alt="Group List" />
                    <span className="block text-base font-medium">Danh sách nhóm</span>
                </div>
            </Link>
        </div>
    );
};

export default NavContact;