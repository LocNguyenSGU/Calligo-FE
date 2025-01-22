
import ChatList from './components/ChatList/ChatList';
import Sidebar from './components/Sidebar/Sidebar';
import './output.css';
import './output.css?v=1.0';
const App = () => {
  return (
    <div className='flex'>
        <Sidebar></Sidebar>
        <ChatList></ChatList>
    </div>
  );
};

export default App;