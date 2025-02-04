import { SearchOutlined } from "@ant-design/icons";
import { Input, Select } from "antd";
import friendService from "../../../services/friendService";
import { useEffect, useState } from "react";
import LoadingSkeleton from "../../shared/LoadingSkeleton";
import useDebounce from "../../../hooks/useDebounce";

const WindowFriendList = () => {
    const [friends, setFriends] = useState([]); // Lưu danh sách bạn bè
    const [grouped, setGrouped] = useState({});
    const [loading, setLoading] = useState(true); // Trạng thái tải dữ liệu
    const [error, setError] = useState(null); // Lưu lỗi nếu có
    const [name, setName] = useState("");
    const nameDebounce = useDebounce(name, 500);
    const [sort, setSort] = useState("Increase"); // Mặc định là tăng dần

    useEffect(() => {
        const fetchFriends = async () => {
            try {
                setLoading(true);
                const response = await friendService.getFriendshipByIdAccountAndName(1, nameDebounce);

                if (!response || !response.data?.content) {
                    setFriends([]);
                    setGrouped({});
                    return;
                }

                // Sắp xếp danh sách theo thứ tự lastName
                let sortedFriends = response.data.content.sort((a, b) => 
                    sort === "Increase" 
                        ? a.lastName.localeCompare(b.lastName) 
                        : b.lastName.localeCompare(a.lastName)
                );

                // Nhóm danh sách theo chữ cái đầu của lastName
                const grouped = sortedFriends.reduce((acc, friend) => {
                    const firstLetter = friend.lastName.charAt(0).toUpperCase();
                    if (!acc[firstLetter]) acc[firstLetter] = [];
                    acc[firstLetter].push(friend);
                    return acc;
                }, {});

                setGrouped(grouped);
                setFriends(sortedFriends);
            } catch (error) {
                console.error("Error fetching friends:", error);
                setError("Không thể tải danh sách bạn bè");
            } finally {
                setLoading(false);
            }
        };

        fetchFriends();
    }, [nameDebounce, sort]); // Gọi lại khi `nameDebounce` hoặc `sort` thay đổi

    return (
        <div className='bg-gray-200'>
            <div className="header">
                <div className="flex items-center gap-3 p-5 bg-white border border-solid border-gray-200 border-t-0">
                    <img src="/contact/friend_list.png" className="w-8 h-8 p-1" alt="Friend List" />
                    <span className="block text-base font-medium">Danh sách bạn bè</span>
                </div>
            </div>
            <span className="font-normal text-sm p-4 block">Bạn bè ({friends.length})</span>
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
                            style={{ width: 120 }}
                            onChange={setSort}
                            options={[
                                { value: 'Increase', label: 'Tăng dần (A-Z)' },
                                { value: 'Descrease', label: 'Giảm dần (Z-A)' }
                            ]}
                        />
                    </div>
                </div>
                <div className="body-list mt-2">
                    {loading ? (
                        <>
                            <LoadingSkeleton width="100%" height="15px" radius="4px" />
                            <LoadingSkeleton width="100%" height="15px" radius="4px" />
                            <LoadingSkeleton width="100%" height="15px" radius="4px" />
                        </>
                    ) : (
                        Object.keys(grouped).length === 0 ? (
                            <span>Không có bạn bè</span>
                        ) : (
                            Object.keys(grouped).map(letter => (
                                <div key={letter} className="block">
                                    <h2 className="font-semibold text-base pl-3">{letter}</h2>
                                    {grouped[letter].map(friend => (
                                        <div key={friend.id} className="item flex gap-3 items-center py-3 hover:bg-gray-100 pl-3 cursor-pointer">
                                            <div className="w-[50px] h-[50px] rounded-full border border-gray-400">
                                                <img src="/public/sidebar/boy.png" alt="" className="w-12 h-12 rounded-full" />
                                            </div>
                                            <span className="font-semibold text-base">{friend.firstName} {friend.lastName}</span>
                                        </div>
                                    ))}
                                </div>
                            ))
                        )
                    )}
                </div>
            </div>
        </div>
    );
};

export default WindowFriendList;