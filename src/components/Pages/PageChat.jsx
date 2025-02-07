import ChatList from "../ChatList/ChatList";
import HeaderChatList from "../ChatList/HeaderChatList/HeaderChatList";
import InfoPanel from "../InfoPanel/InfoPanel";
import WindowChat from "../WindowChat/WindowChat";

const PageChat = () => {
    return (
        <>
            <div className='flex flex-col w-[23%] ml-16 fixed top-0'>
                <HeaderChatList></HeaderChatList>
                <ChatList></ChatList>
                {/* <FriendList></FriendList> */}
            </div>
            <div className='w-[73%] bg-blue-200 flex fixed ml-[395px]'>
                <WindowChat isGroup={true}></WindowChat>
                <InfoPanel isGroup={true}></InfoPanel>
            </div>
        </>
    );
};

export default PageChat;