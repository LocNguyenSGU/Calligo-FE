import './output.css';
import './output.css?v=1.0';
import HomeScreen from './pages/logged_in/user/HomeScreen';
import LoginScreen from './pages/LoginScreen';
import SignUpScreen from './pages/SignUpScreen';
import AppRouter from './routers/AppRouter';
import websocketService from './services/websocketService'; // Import dịch vụ WebSocket
import { useEffect } from 'react'; // Thêm useEffect để quản lý lifecycle
const App = () => {
  useEffect(() => {
    // Khởi tạo kết nối WebSocket khi ứng dụng bắt đầu
    websocketService.connect(() => {
      console.log('WebSocket connected successfully');
      // Nếu cần subscribe kênh mặc định ngay từ đầu, có thể thêm ở đây
      // Ví dụ: websocketService.subscribe('/topic/messages', (message) => { ... });
    });

    // Ngắt kết nối khi component App unmount
    return () => {
      websocketService.disconnect();
    };
  }, []); // Dependency array rỗng để chỉ chạy 1 lần khi mount

  return (
    <div>
        <AppRouter></AppRouter>
    </div>
  );
};

export default App;