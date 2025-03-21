import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomeScreen from '../pages/logged_in/user/HomeScreen';
import LoginScreen from '../pages/LoginScreen';
import SignUpScreen from '../pages/SignUpScreen';
import PageChat from '../components/Pages/PageChat';
import PageContact from '../components/Pages/PageContact';
import WindowFriendRequest from '../components/Contact/WindowFriendRequest/WindowFriendRequest';
import WindowGroupList from '../components/Contact/WindowGroupList/WindowGroupList';
import WindowFriendList from '../components/Contact/WindowFriendList/WindowFriendList';
import WindowChat from '../components/WindowChat/WindowChat';
import { StrictMode } from 'react';

const AppRouter = () => {
    return (

        <BrowserRouter>
            

            <Routes>
                {/* Protected Route để đảm bảo user đã đăng nhập */}
                <Route
                    path="/home"
                    element={
                        // <ProtectedRoute> 

                        <HomeScreen /> 
                        // </ProtectedRoute>
                    }
                    >
                    {/* Mặc định vào PageChat */}
                    <Route index element={<PageChat />} />


                    {/* Group các route liên quan đến Chats */}
                    <Route path="chats" element={<PageChat />}>
                        <Route path="chats/:idConversation" element={<WindowChat />} />
                    </Route>

                    {/* Group các route liên quan đến Contacts */}
                    <Route path="contacts" element={<PageContact />}>
                        <Route index element={<WindowFriendList />} />
                        <Route path="friend-requestes" element={<WindowFriendRequest />} />
                        <Route path="group-list" element={<WindowGroupList />} />
                        <Route path="friend-list" element={<WindowFriendList />} />
                    </Route>
                </Route>

                {/* Các route ngoài Home */}
                <Route path="/" element={<LoginScreen />} />
                <Route path="/signin" element={<LoginScreen />} />
                <Route path="/signup" element={<SignUpScreen />} />
                {/* <Route path="*" element={<div>404 - Page Not Found</div>} /> */}
            </Routes>
                
        </BrowserRouter>
    );
};

export default AppRouter;