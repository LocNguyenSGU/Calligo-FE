/* eslint-disable react/prop-types */
const InfoPanel = ({isGroup = false}) => {
    return (
        <div className='w-[23%] h-screen bg-red-100'>
            <div className="header-info-panel flex justify-center items-center h-[73px] bg-white border border-gray-200 border-t-0">
                {isGroup ? <span className="font-medium text-lg">Thông tin nhóm</span> : <span className="font-medium text-lg">Thông tin hội thoại</span>}
            </div>
        </div>
    );
};

export default InfoPanel;