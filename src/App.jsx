import './output.css';
import './output.css?v=1.0';
import HomeScreen from './pages/logged_in/user/HomeScreen';
import SignUpScreen from './pages/SignUpScreen';
const App = () => {
  return (
    <div>
        {/* <HomeScreen></HomeScreen> */}
        <SignUpScreen></SignUpScreen>
    </div>
  );
};

export default App;