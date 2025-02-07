import { Outlet } from 'react-router-dom';
import HeaderChatList from '../ChatList/HeaderChatList/HeaderChatList';
import NavContact from '../Contact/NavContact';
import WindowFriendList from '../Contact/WindowFriendList/WindowFriendList';
import WindowFriendRequest from '../Contact/WindowFriendRequest/WindowFriendRequest';
import WindowGroupList from '../Contact/WindowGroupList/WindowGroupList';

const PageContact = () => {
    return (
        <>
        <div className='flex flex-col w-[23%] ml-16 fixed'>
            <HeaderChatList></HeaderChatList>
            <NavContact></NavContact>
        </div>
        <div className='w-[73%] bg-gray-200 ml-[395px] fixed'>
            <Outlet></Outlet>
        </div>
    </>
    );
};

export default PageContact;