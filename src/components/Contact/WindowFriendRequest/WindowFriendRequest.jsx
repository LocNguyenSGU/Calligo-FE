import { SearchOutlined } from "@ant-design/icons";
import { Button, Input, Select } from "antd";
import { useState } from "react";
import LoadingSkeleton from "../../shared/LoadingSkeleton";

const WindowFriendRequest = () => {
    const [sort, setSort] = useState("Increase");
    const [name, setName] = useState("");
    const [loading, setLoading] = useState(true)
    const [friendRequest, setFriendRequest] = useState([])
    return (
        <div className='bg-gray-200'>
            <div className="header">
                <div className="flex items-center gap-3 p-5 bg-white border border-solid border-gray-200 border-t-0">
                    <img src="/public/contact/friend_request.png" className="w-8 h-8 p-1" alt="Friend Request" />
                    <span className="block text-base font-medium">Lời mời kết bạn</span>
                </div>
            </div>
            <span className="font-normal text-sm p-4 block">Lời mời kết bạn nhân được (64)</span>

            <div className="body bg-green-100 h-screen w-100% rounded-md ml-4">
                <div className="header-action flex gap-3 p-3">
                    <div className="w-[80%]">
                        <Input
                            placeholder="Tìm kiếm"
                            prefix={<SearchOutlined />}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className="w-[20%]">
                        <Select
                            value={sort}
                            style={{ width: 200 }}
                            onChange={setSort}
                            options={[
                                { value: 'Increase', label: 'Tăng dần (A-Z)' },
                                { value: 'Descrease', label: 'Giảm dần (Z-A)' }
                            ]}
                        />
                    </div>
                </div>
                {loading && (<>
                    <div className="item flex justify-between items-center py-3 hover:bg-gray-100 pl-3 cursor-pointer">
                        <div className="flex items-center gap-3">
                            <div className="w-[50px] h-[50px] rounded-full border border-gray-400">
                                <LoadingSkeleton width="100%" height="100%" radius="50%"></LoadingSkeleton>
                            </div>
                            <span className="font-semibold text-base">
                                <LoadingSkeleton width="300px" height="15px" radius="4px"></LoadingSkeleton>
                            </span>
                        </div>
                        <div className="flex gap-3 mt-3 pr-16 h-[32px] w-[256px]">
                            <LoadingSkeleton width="100%" height="100%" radius="8px"></LoadingSkeleton>
                            <LoadingSkeleton width="100%" height="100%" radius="8px"></LoadingSkeleton>
                        </div>
                    </div>
                    <div className="h-[1px] bg-gray-300 w-[90%] my-0 mx-auto"></div>
                    <div className="item flex justify-between items-center py-3 hover:bg-gray-100 pl-3 cursor-pointer">
                        <div className="flex items-center gap-3">
                            <div className="w-[50px] h-[50px] rounded-full border border-gray-400">
                                <LoadingSkeleton width="100%" height="100%" radius="50%"></LoadingSkeleton>
                            </div>
                            <span className="font-semibold text-base">
                                <LoadingSkeleton width="300px" height="15px" radius="4px"></LoadingSkeleton>
                            </span>
                        </div>
                        <div className="flex gap-3 mt-3 pr-16 h-[32px] w-[256px]">
                            <LoadingSkeleton width="100%" height="100%" radius="8px"></LoadingSkeleton>
                            <LoadingSkeleton width="100%" height="100%" radius="8px"></LoadingSkeleton>
                        </div>
                    </div>
                    <div className="h-[1px] bg-gray-300 w-[90%] my-0 mx-auto"></div>
                    <div className="item flex justify-between items-center py-3 hover:bg-gray-100 pl-3 cursor-pointer">
                        <div className="flex items-center gap-3">
                            <div className="w-[50px] h-[50px] rounded-full border border-gray-400">
                                <LoadingSkeleton width="100%" height="100%" radius="50%"></LoadingSkeleton>
                            </div>
                            <span className="font-semibold text-base">
                                <LoadingSkeleton width="300px" height="15px" radius="4px"></LoadingSkeleton>
                            </span>
                        </div>
                        <div className="flex gap-3 mt-3 pr-16 h-[32px] w-[256px]">
                            <LoadingSkeleton width="100%" height="100%" radius="8px"></LoadingSkeleton>
                            <LoadingSkeleton width="100%" height="100%" radius="8px"></LoadingSkeleton>
                        </div>
                    </div>
                </>)}
                <div className="item flex justify-between items-center py-3 hover:bg-gray-100 pl-3 cursor-pointer">
                    <div className="flex items-center gap-3">
                        <div className="w-[50px] h-[50px] rounded-full border border-gray-400">
                            <img src="/public/sidebar/boy.png" alt="" className="w-12 h-12 rounded-full" />
                        </div>
                        <span className="font-semibold text-base">Tran ban a</span>
                    </div>
                    <div className="flex gap-3 mt-3 pr-16">
                        <Button>Từ chối</Button>
                        <Button type="primary">Chấp nhận</Button>
                    </div>
                </div>
                <div className="h-[1px] bg-gray-300 w-[90%] my-0 mx-auto"></div>
                <div className="item flex justify-between items-center py-3 hover:bg-gray-100 pl-3 cursor-pointer">
                    <div className="flex items-center gap-3">
                        <div className="w-[50px] h-[50px] rounded-full border border-gray-400">
                            <img src="/public/sidebar/boy.png" alt="" className="w-12 h-12 rounded-full" />
                        </div>
                        <span className="font-semibold text-base">Tran ban a</span>
                    </div>
                    <div className="flex gap-3 mt-3 pr-16">
                        <Button>Từ chối</Button>
                        <Button type="primary">Chấp nhận</Button>
                    </div>
                </div>
                <div className="h-[1px] bg-gray-300 w-[90%] my-0 mx-auto"></div>
                <div className="item flex justify-between items-center py-3 hover:bg-gray-100 pl-3 cursor-pointer">
                    <div className="flex items-center gap-3">
                        <div className="w-[50px] h-[50px] rounded-full border border-gray-400">
                            <img src="/public/sidebar/boy.png" alt="" className="w-12 h-12 rounded-full" />
                        </div>
                        <span className="font-semibold text-base">Tran ban a</span>
                    </div>
                    <div className="flex gap-3 mt-3 pr-16">
                        <Button>Từ chối</Button>
                        <Button type="primary">Chấp nhận</Button>
                    </div>
                </div>
                <div className="h-[1px] bg-gray-300 w-[90%] my-0 mx-auto"></div>
            </div>
        </div>
    );
};

export default WindowFriendRequest;