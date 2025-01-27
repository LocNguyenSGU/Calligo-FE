import Sidebar from '../../../components/Sidebar/Sidebar';
import { Outlet } from 'react-router-dom';

const HomeScreen = () => {
    return (
        <div className='flex'>
            <Sidebar></Sidebar>
            <Outlet></Outlet>
               
        </div>
    );
};

export default HomeScreen;