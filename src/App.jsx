import './output.css';
import './output.css?v=1.0';
import HomeScreen from './pages/logged_in/user/HomeScreen';
import LoginScreen from './pages/LoginScreen';
import SignUpScreen from './pages/SignUpScreen';
import AppRouter from './routers/AppRouter';
const App = () => {
  return (
    <div>
        {/* <HomeScreen></HomeScreen> */}
        {/* <SignUpScreen></SignUpScreen> */}
        {/* <LoginScreen></LoginScreen> */}
        <AppRouter></AppRouter>
    </div>
  );
};

export default App;