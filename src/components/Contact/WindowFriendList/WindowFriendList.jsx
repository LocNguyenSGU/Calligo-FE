import { SearchOutlined } from "@ant-design/icons";
import { Input, Select } from "antd";
import friendService from "../../../services/friendService";
import { useEffect, useState } from "react";
import LoadingSkeleton from "../../shared/LoadingSkeleton";


const WindowFriendList = () => {
    const [friends, setFriends] = useState([]); // Lưu danh sách bạn bè
    const [grouped, setGrouped] = useState([]);
    const [loading, setLoading] = useState(true); // Trạng thái tải dữ liệu
    const [error, setError] = useState(null); // Lưu lỗi nếu có
    useEffect(() => {
        const fetchFriends = async () => {
            try {
                setLoading(true);
                const response = await friendService.getFriendshipByIdAccount(1);
                console.log(response);
                const sortedFriends = response.data.content.sort((a, b) => a.lastName.localeCompare(b.lastName));

                const grouped = sortedFriends.reduce((acc, friend) => {
                    const firstLetter = friend.lastName.charAt(0).toUpperCase();
                    if (!acc[firstLetter]) acc[firstLetter] = [];
                    acc[firstLetter].push(friend);
                    return acc;
                }, {});
                setGrouped(grouped);
                setFriends(response);
                console.log("GROUPED: ", grouped)
                console.log("FRIENDS: ", response)

            } catch (error) {
                console.error("Error fetching friends:", error);
                setError("Khong the tai danh sach ban be")
            } finally {
                setLoading(false);
            }
        };

        fetchFriends();
    }, []);

    return (
        <div className='bg-gray-200'>
            <div className="header">
                <div className="flex items-center gap-3 p-5 bg-white border border-solid border-gray-200 border-t-0">
                    <img src="/contact/friend_list.png" className="w-8 h-8 p-1" alt="Friend List" />
                    <span className="block text-base font-medium">Danh sách bạn bè</span>
                </div>
            </div>
            <span className="font-normal text-sm p-4 block">Bạn bè ({friends?.data?.totalElements}) </span>
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
                    {loading &&
                        <>
                            <div className="item flex gap-3 items-center py-3 hover:bg-gray-100 pl-3 cursor-pointer">
                                <div className="w-[50px] h-[50px] rounded-full border border-gray-400">
                                    <LoadingSkeleton width="100%" height="100%" radius="50%"></LoadingSkeleton>
                                </div>
                                <span className="font-semibold text-base">
                                    <LoadingSkeleton width="300px" height="15px" radius="4px"></LoadingSkeleton>
                                </span>
                            </div>
                            <div className="h-[1px] bg-gray-300 w-[90%] my-0 mx-auto"></div>
                            <div className="item flex gap-3 items-center py-3 hover:bg-gray-100 pl-3 cursor-pointer">
                                <div className="w-[50px] h-[50px] rounded-full border border-gray-400">
                                    <LoadingSkeleton width="100%" height="100%" radius="50%"></LoadingSkeleton>
                                </div>
                                <span className="font-semibold text-base">
                                    <LoadingSkeleton width="300px" height="15px" radius="4px"></LoadingSkeleton>
                                </span>
                            </div>
                            <div className="h-[1px] bg-gray-300 w-[90%] my-0 mx-auto"></div>
                            <div className="item flex gap-3 items-center py-3 hover:bg-gray-100 pl-3 cursor-pointer">
                                <div className="w-[50px] h-[50px] rounded-full border border-gray-400">
                                    <LoadingSkeleton width="100%" height="100%" radius="50%"></LoadingSkeleton>
                                </div>
                                <span className="font-semibold text-base">
                                    <LoadingSkeleton width="300px" height="15px" radius="4px"></LoadingSkeleton>
                                </span>
                            </div>
                            <div className="h-[1px] bg-gray-300 w-[90%] my-0 mx-auto"></div>
                        </>

                    }
                    {Object.keys(grouped).sort().map(letter => {
                        return <>
                            <div className="block">
                                <h2 className="font-semibold text-base pl-3">{letter}</h2>
                                {grouped[letter].map(friend => {
                                    return <>
                                        <div className="item flex gap-3 items-center py-3 hover:bg-gray-100 pl-3 cursor-pointer">
                                            <div className="w-[50px] h-[50px] rounded-full border border-gray-400">
                                                <img src="/public/sidebar/boy.png" alt="" className="w-12 h-12 rounded-full" />
                                            </div>
                                            <span className="font-semibold text-base">{friend.firstName} {friend.lastName}</span>
                                        </div>
                                        <div className="h-[1px] bg-gray-300 w-[90%] my-0 mx-auto"></div>
                                    </>
                                })}
                            </div>
                        </>
                    })}
                </div>
            </div>
        </div>
    );
};

export default WindowFriendList;