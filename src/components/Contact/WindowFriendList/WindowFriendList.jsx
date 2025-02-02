import { SearchOutlined } from "@ant-design/icons";
import { Input, Select } from "antd";

const WindowFriendList = () => {
    return (
        <div className='bg-gray-200'>
            <div className="header">
                <div className="flex items-center gap-3 p-5 bg-white border border-solid border-gray-200 border-t-0">
                    <img src="/contact/friend_list.png" className="w-8 h-8 p-1" alt="Friend List" />
                    <span className="block text-base font-medium">Danh sách bạn bè</span>
                </div>
            </div>
            <span className="font-normal text-sm p-4 block">Bạn bè (64)</span>
            <div className="body bg-green-100 h-screen w-100% rounded-md ml-4">
                <div className="header-action flex gap-3 p-3">
                    <div className="w-[80%]">
                        <Input placeholder="Tìm kiếm" prefix={<SearchOutlined />} />
                    </div>
                    <div className="w-[20%]">
                        <Select
                            defaultValue="Increase"
                            style={{ width: 120 }}
                            options={[{ value: 'Increase', label: 'Increase' }, { value: 'Descrease', label: 'Descrease' }]}
                        />
                    </div>
                </div>
                <div className="body-list mt-2">
                    <div className="block">
                        <h2 className="font-semibold text-base pl-3">A</h2>
                        <div className="item flex gap-3 items-center py-3 hover:bg-gray-100 pl-3 cursor-pointer">
                            <div className="w-[50px] h-[50px] rounded-full border border-gray-400">
                                <img src="/public/sidebar/boy.png" alt="" className="w-12 h-12 rounded-full" />
                            </div>
                            <span className="font-semibold text-base">A2</span>
                        </div>
                        <div className="h-[1px] bg-gray-300 w-[90%] my-0 mx-auto"></div>
                        <div className="item flex gap-3 items-center py-3 hover:bg-gray-100 pl-3 cursor-pointer">
                            <div className="w-[50px] h-[50px] rounded-full border border-gray-400">
                                <img src="/public/sidebar/boy.png" alt="" className="w-12 h-12 rounded-full" />
                            </div>
                            <span className="font-semibold text-base">A2</span>
                        </div>
                        <div className="h-[1px] bg-gray-300 w-[90%] my-0 mx-auto"></div>
                        <div className="item flex gap-3 items-center py-3 hover:bg-gray-100 pl-3 cursor-pointer">
                            <div className="w-[50px] h-[50px] rounded-full border border-gray-400">
                                <img src="/public/sidebar/boy.png" alt="" className="w-12 h-12 rounded-full" />
                            </div>
                            <span className="font-semibold text-base">A2</span>
                        </div>
                    </div>
                    <div className="block">
                        <h2 className="font-semibold text-base pl-3">B</h2>
                        <div className="item flex gap-3 items-center py-3 hover:bg-gray-100 pl-3 cursor-pointer">
                            <div className="w-[50px] h-[50px] rounded-full border border-gray-400">
                                <img src="/public/sidebar/boy.png" alt="" className="w-12 h-12 rounded-full" />
                            </div>
                            <span className="font-semibold text-base">B2</span>
                        </div>
                        <div className="h-[1px] bg-gray-300 w-[90%] my-0 mx-auto"></div>
                        <div className="item flex gap-3 items-center py-3 hover:bg-gray-100 pl-3 cursor-pointer">
                            <div className="w-[50px] h-[50px] rounded-full border border-gray-400">
                                <img src="/public/sidebar/boy.png" alt="" className="w-12 h-12 rounded-full" />
                            </div>
                            <span className="font-semibold text-base">B2</span>
                        </div>
                        <div className="h-[1px] bg-gray-300 w-[90%] my-0 mx-auto"></div>
                        <div className="item flex gap-3 items-center py-3 hover:bg-gray-100 pl-3 cursor-pointer">
                            <div className="w-[50px] h-[50px] rounded-full border border-gray-400">
                                <img src="/public/sidebar/boy.png" alt="" className="w-12 h-12 rounded-full" />
                            </div>
                            <span className="font-semibold text-base">B2</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WindowFriendList;