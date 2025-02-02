const WindowGroupList = () => {
    return (
        <div className='bg-gray-200'>
            <div className="header">
                <div className="flex items-center gap-3 p-5 bg-white border border-solid border-gray-200 border-t-0">
                    <img src="/public/chatlist/icons8-group-80.png" className="w-8 h-8 p-1" alt="Group" />
                    <span className="block text-base font-medium">Danh sách nhóm</span>
                </div>
            </div>
            <span className="font-normal text-sm p-4 block">Nhóm (2)</span>
            <div className="body bg-green-100 h-screen w-100% rounded-md ml-4">

            </div>
        </div>
    );
};

export default WindowGroupList;