import { SearchOutlined } from "@ant-design/icons";
import { Button, Input, message, Select } from "antd";
import friendService from "../../../services/friendService";
import { useEffect, useState } from "react";
import LoadingSkeleton from "../../shared/LoadingSkeleton";
import useDebounce from "../../../hooks/useDebounce";
import { use } from "react";

const WindowFriendList = () => {
    const [friends, setFriends] = useState([]); // Lưu danh sách bạn bè
    const [grouped, setGrouped] = useState({});
    const [loading, setLoading] = useState(true); // Trạng thái tải dữ liệu
    const [error, setError] = useState(null); // Lưu lỗi nếu có
    const [name, setName] = useState("");
    const nameDebounce = useDebounce(name, 500);
    const [sort, setSort] = useState("Increase");
    const [page, setPage] = useState(0)
    const [countTotalFriend, setCountTotalFriend] = useState(0)

    useEffect(() => {
        const fetchFriends = async () => {
            try {
                setLoading(true);
                const response = await friendService.getFriendshipByIdAccountAndName(1, nameDebounce, page, 40);

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
                setCountTotalFriend(sortedFriends.length)
            } catch (error) {
                console.error("Error fetching friends:", error);
                setError("Không thể tải danh sách bạn bè");
            } finally {
                setLoading(false);
            }
        };

        fetchFriends();
    }, [nameDebounce, page, sort, countTotalFriend]); // Gọi lại khi `nameDebounce` hoặc `sort` thay đổi

    const handleDeleteFriend = async (idFriend) => {
        try {
            const response = await friendService.deleteFriend(idFriend);
            if (response?.code === 200) {
                message.success("Xoá bạn bè thành công");
                // Cập nhật danh sách bạn bè nếu có
                setFriends(prevFriends => prevFriends.filter(friend => friend.id !== idFriend));
                setCountTotalFriend(countTotalFriend - 1)
            } else {
                message.error("Xoá bạn bè thất bại");
            }
        } catch (error) {
            message.error("Đã xảy ra lỗi, vui lòng thử lại!");
            console.error("Lỗi khi xoá bạn:", error);
        }
    };
    

    return (
        <div className='bg-gray-200'>
            <div className="header">
                <div className="flex items-center gap-3 p-5 bg-white border border-solid border-gray-200 border-t-0">
                    <img src="/contact/friend_list.png" className="w-8 h-8 p-1" alt="Friend List" />
                    <span className="block text-base font-medium">Danh sách bạn bè</span>
                </div>
            </div>
            <span className="font-normal text-sm p-4 block">Bạn bè ({friends.length})</span>
            <div className="body bg-white h-screen w-100% rounded-md ml-4">
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
                <div className="body-list mt-2 overflow-auto h-[75%]">
                    {loading ? (
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
                    ) : (
                        Object.keys(grouped).length === 0 ? (
                            <span>Không có bạn bè</span>
                        ) : (
                            Object.keys(grouped).map(letter => (
                                <div key={letter} className="block">
                                    <h2 className="font-semibold text-base pl-3">{letter}</h2>
                                    {grouped[letter].map(friend => (
                                        <>
                                            <div key={friend.idFriend} className="item flex justify-between items-center py-3 hover:bg-gray-100 pl-3 cursor-pointer pr-10">
                                                <div className="flex gap-3 items-center">
                                                    <div className="w-[50px] h-[50px] rounded-full border border-gray-400">
                                                        <img src="/public/sidebar/boy.png" alt="" className="w-12 h-12 rounded-full" />
                                                    </div>
                                                    <span className="font-semibold text-base">{friend.firstName} {friend.lastName}</span>
                                                </div>
                                                <div>
                                                    <Button type="text" onClick={() => handleDeleteFriend(friend.idFriend)}>Xoá bạn</Button>
                                                </div>
                                            </div>
                                            <div className="h-[1px] bg-gray-300 w-[90%] my-0 mx-auto"></div>
                                        </>
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