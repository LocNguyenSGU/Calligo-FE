import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomeScreen from '../pages/logged_in/user/HomeScreen';
import LoginScreen from '../pages/LoginScreen';
import SignUpScreen from '../pages/SignUpScreen';

const AppRouter = () => {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path="/home" element={<HomeScreen />} />
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