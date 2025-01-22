import Avatar from '../shared/Avatar';
import IconNavigaion from '../shared/IconNavigaion';

const Sidebar = () => {
    return (
        <div className="flex flex-col w-16 h-screen bg-red-100 gap-4 justify-items-center items-center pt-5">
            <Avatar gender='female' />
            <IconNavigaion src="/sidebar/icons8-chat-100.png" />
            <IconNavigaion src="/public/sidebar/icons8-contact-96.png" />
            <IconNavigaion src="/sidebar/icons8-setting-100.png" />
        </div>
    );
};

export default Sidebar;