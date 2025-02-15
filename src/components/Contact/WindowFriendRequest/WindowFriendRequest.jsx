import { SearchOutlined } from "@ant-design/icons";
import { Button, Input, message, Select } from "antd";
import { useEffect, useState } from "react";
import LoadingSkeleton from "../../shared/LoadingSkeleton";
import friendService from "../../../services/friendService";
import useDebounce from "../../../hooks/useDebounce";

const WindowFriendRequest = () => {
    const [sort, setSort] = useState("asc");
    const [name, setName] = useState("");
    const nameDebounce = useDebounce(name, 500);
    const sortDebounce = useDebounce(sort, 500);
    const [loading, setLoading] = useState(true)
    const [friendRequest, setFriendRequest] = useState([])
    const [totalFriendRequestes, setTotalFriendRequestes] = useState(0)
    const [handledRequests, setHandledRequests] = useState([]);
    useEffect(() => {
        const fetchFriends = async () => {
            try {
                setLoading(true);
                const response = await friendService.getFriendRequestesByIdAccountReceiveAndName(3, nameDebounce, sortDebounce);

                if (!response || !response.data?.content) {
                    setFriendRequest([]);
                    setTotalFriendRequestes(0)
                    return;
                }
                setTotalFriendRequestes(response.data.totalElements)
                setFriendRequest(response);
            } catch (error) {
                console.error("Error fetching friends:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchFriends();
    }, [nameDebounce, sortDebounce]);
    console.log("friendRequest: ~", friendRequest)

    const handleUpdateStatusFriendRequest = async (idFriendRequest, status) => {
        try {
            const resp = await friendService.updateStatusFriendRequest(idFriendRequest, status);
            console.log(resp);

            if (resp.code === 200) {
                message.success("Cập nhật trạng thái thành công!");
                setTotalFriendRequestes(totalFriendRequestes - 1);
                setHandledRequests((prev) => [...prev, idFriendRequest])
            } else {
                message.error("Cập nhật trạng thái thất bại!");
            }
        } catch (error) {
            console.error("Lỗi khi cập nhật trạng thái:", error);
            message.error("Đã xảy ra lỗi, vui lòng thử lại!");
        }
    };
    return (
        <div className='bg-gray-200'>
            <div className="header">
                <div className="flex items-center gap-3 p-5 bg-white border border-solid border-gray-200 border-t-0">
                    <img src="/public/contact/friend_request.png" className="w-8 h-8 p-1" alt="Friend Request" />
                    <span className="block text-base font-medium">Lời mời kết bạn</span>
                </div>
            </div>
            <span className="font-normal text-sm p-4 block">Lời mời kết bạn nhân được ({totalFriendRequestes})</span>

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
                                { value: 'asc', label: 'Tăng dần thời gian' },
                                { value: 'desc', label: 'Giảm dần thời gian' }
                            ]}
                        />
                    </div>
                </div>
                {loading ? (<>
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
                </>) : (
                    <div className="body-list mt-2 overflow-auto h-[75%]">
                        {friendRequest?.data?.content.map((e) => (
                        <>
                            <div key={e.idFriendRequest} style={{ display: handledRequests.includes(e.idFriendRequest) ? 'none' : 'block' }}>
                                <div className="item flex justify-between items-center py-3 hover:bg-gray-100 pl-3 cursor-pointer">
                                    <div className="flex items-center gap-3">
                                        <div className="w-[50px] h-[50px] rounded-full border border-gray-400">
                                            <img src="/sidebar/boy.png" alt="" className="w-12 h-12 rounded-full" />
                                        </div>
                                        <span className="font-semibold text-base">{e.firstName} {e.lastName}</span>
                                    </div>
                                    <div className="flex gap-3 mt-3 pr-16">
                                        <Button onClick={() => handleUpdateStatusFriendRequest(e.idFriendRequest, { status: "REJECTED" })}>
                                            Từ chối
                                        </Button>
                                        <Button type="primary" onClick={() => handleUpdateStatusFriendRequest(e.idFriendRequest, { status: "ACCEPTED" })}>
                                            Chấp nhận
                                        </Button>
                                    </div>
                                </div>
                                <div className="h-[1px] bg-gray-300 w-[90%] my-0 mx-auto"></div>
                            </div>
                        </>
                        ))}
                    </div>
                )}
                {friendRequest.length == 0 && loading == false && <span className="text-red-500 mt-3 block ml-3">Không có lời mời kết bạn</span>}
            </div>
        </div >
    );
};

export default WindowFriendRequest;