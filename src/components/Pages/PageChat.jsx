import ChatList from "../ChatList/ChatList";
import HeaderChatList from "../ChatList/HeaderChatList/HeaderChatList";
import InfoPanel from "../InfoPanel/InfoPanel";
import WindowChat from "../WindowChat/WindowChat";
import { useState } from "react";

const PageChat = () => {
  const [selectConversation , setSelectConversation] = useState(null);

  const handleSelectConversation = (conversation) => {
    setSelectConversation(conversation);
  };


    return (
        <>
            <div className='flex flex-col w-[23%] ml-16 fixed top-0'>
                <HeaderChatList></HeaderChatList>
                <ChatList onSelectConversation={handleSelectConversation}></ChatList>
                {/* <FriendList></FriendList> */}
            </div>
            <div className='w-[73%] bg-blue-200 flex fixed ml-[395px]'>
              {selectConversation && 
                <WindowChat {...selectConversation}/>
              }
                <InfoPanel isGroup={selectConversation?.isGroup}/>

            </div>
        </>
    );
};

export default PageChat;