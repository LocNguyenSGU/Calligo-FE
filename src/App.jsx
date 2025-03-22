import { useEffect } from 'react';
import { ChatProvider } from './context/ChatContext';
import './output.css';
import './output.css?v=1.0';
import AppRouter from './routers/AppRouter';
const App = () => {
  return (
    <div>
      <ChatProvider>
        <AppRouter></AppRouter>
      </ChatProvider>
    </div>
  );
};

export default App;