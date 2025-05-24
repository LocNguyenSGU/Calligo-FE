import ChatList from "../ChatList/ChatList";
import HeaderChatList from "../ChatList/HeaderChatList/HeaderChatList";
import InfoPanel from "../InfoPanel/InfoPanel";
import WindowChat from "../WindowChat/WindowChat";
import { useState } from "react";

const PageChat = () => {
  const [selectConversation , setSelectConversation] = useState(null);
  const infoUser = JSON.parse(localStorage.getItem("infoUser"));
  console.log("Loc- infoUser: ", infoUser);
  

  const handleSelectConversation = (conversation) => {
    setSelectConversation(conversation);
  };

  console.log("Loc- selectConversation: ", selectConversation);


    return (
        <>
            <div className='flex flex-col w-[23%] ml-16 fixed top-0'>
                <HeaderChatList ></HeaderChatList>
                <ChatList onSelectConversation={handleSelectConversation}></ChatList>
            </div>
            <div className='w-[73%] bg-blue-200 flex fixed ml-[395px] h-screen'>
              {selectConversation && 
              <>
                 <WindowChat src={selectConversation?.avartar} idConversation={selectConversation?.id} title={selectConversation?.title} isGroup={selectConversation?.isGroup} myAccountId={infoUser.idAccount} numberMember={selectConversation?.numberMember} />
                 <InfoPanel isGroup={selectConversation?.isGroup}/>
              </>
              }

            </div>
        </>
    );
};

export default PageChat;