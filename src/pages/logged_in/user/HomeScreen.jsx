import Sidebar from '../../../components/Sidebar/Sidebar';
import ChatList from '../../../components/ChatList/ChatList';
import WindowChat from '../../../components/WindowChat/WindowChat';
import InfoPanel from '../../../components/InfoPanel/InfoPanel';

const HomeScreen = () => {
    return (
        <div className='flex'>
            <Sidebar></Sidebar>
            <ChatList></ChatList>
            <WindowChat isGroup={true}></WindowChat>
            <InfoPanel isGroup={true}></InfoPanel>
        </div>
    );
};

export default HomeScreen;