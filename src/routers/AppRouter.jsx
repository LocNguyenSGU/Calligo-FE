import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomeScreen from '../pages/logged_in/user/HomeScreen';
import LoginScreen from '../pages/LoginScreen';
import SignUpScreen from '../pages/SignUpScreen';
import ProtectedRoute from './ProtectedRoute';
import PageChat from '../components/Pages/PageChat';
import Test from '../components/ChatList/Test';

const AppRouter = () => {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route 
                        path="/home" 
                        element={<ProtectedRoute> <HomeScreen></HomeScreen> </ProtectedRoute>}>
                        <Route path="chats" element={<PageChat />} />
                        <Route path="contacts" element={<Test />} />
                    </Route>

                    <Route path="/" element={<LoginScreen />} />
                    <Route path="/signin" element={<LoginScreen />} />
                    <Route path="/signup" element={<SignUpScreen />} />
                    <Route path="*" element={<div>404 - Page Not Found</div>} />
                </Routes>
            </BrowserRouter>
        </div>
    );
};

export default AppRouter;