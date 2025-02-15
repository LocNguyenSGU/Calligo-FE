import { Button, Input, message, Modal } from "antd";
import { PhoneOutlined, SearchOutlined } from '@ant-design/icons'
import IconChatList from "../../shared/IconChatList";
import { useEffect, useState } from "react";
import Avatar from "../../shared/Avatar";
import LoadingSkeleton from "../../shared/LoadingSkeleton";
import TextArea from "antd/es/input/TextArea";
import userService from "../../../services/userService";
import ConditionRender from "../../../utils/ConditionRender";
import friendService from "../../../services/friendService";

const HeaderChatList = () => {
    const [open, setOpen] = useState(false);
    const [phone, setPhone] = useState("");
    const [infoUser, setInfoUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [note, setNote] = useState("");
    const [currentUser, setCurrentUser] = useState({});
    const [showAddFriend, setShowAddFriend] = useState(false);
    const [showCancelRequest, setShowCancelRequest] = useState(false);
    const [showNote, setShowNote] = useState(false);
    const [showMessage, setShowMessage] = useState("")
    const [loadingFetchFriendRequest, setLoadingFetchFriendRequest] = useState(false)
    const [idFriendRequest, setIdFriendRequest] = useState("");

    const showModal = () => {
        setOpen(true);
        setError("");
        setInfoUser(null);
        setPhone("");
        setNote("")
    };

    const handleCancel = () => {
        setPhone("");
        setInfoUser(null);
        setError("");
        setNote("")
        setOpen(false);
    };
    useEffect(() => {
        let storedUser = localStorage.getItem("infoUser");
        if (!storedUser) {
            message.error("Đã xảy ra lỗi, vui lòng thử lại!!!");
            return;
        }
        const parsedUser = JSON.parse(storedUser);
        setCurrentUser(parsedUser);
    }, []);

    const handleSearch = async () => {
        if (!phone) {
            message.warning("Vui lòng nhập số điện thoại!");
            return;
        }
        setLoading(true);
        setError("");
        try {
            const response = await userService.getBasicAccountWithRelation(phone, 1);
            setInfoUser(response.data);
            setNote(response.data.friendshipResponse.note)
            setError("");
            setShowAddFriend(!(response.data?.friendshipResponse?.areFriends || response.data?.friendshipResponse?.yourself));
            setShowMessage((response.data?.friendshipResponse?.areFriends || response.data?.friendshipResponse?.yourself));
            if (showMessage) {
                setShowNote(false)
            } else {
                setShowNote(true)
            }
        } catch (e) {
            if (e?.status === 404) {
                setError("Không tìm thấy tài khoản");
            } else {
                console.error(e)
                setError("Đã xảy ra lỗi khi tìm kiếm");
            }
            setInfoUser(null);
        } finally {
            setLoading(false);
        }
    };
   
    
    useEffect(() => {
        if (!currentUser?.idAccount || !infoUser?.accountBasicResponse?.idAccount) {
            return;
        }
        const fetchStatus = async () => {
            try {
                const responseStatus = await friendService.getFriendRequestStatusBetweenTwoIdAccount(
                    currentUser.idAccount,
                    infoUser.accountBasicResponse.idAccount
                );
                console.log("get status two account: ", responseStatus);
                if (responseStatus.data.status == "SENT") {
                    setShowNote(true)
                    setShowCancelRequest(true)
                    setShowAddFriend(false)
                } else {
                    setShowCancelRequest(false)
                    // setShowAddFriend(true)
                }
            } catch (error) {
                if (error.status == 404) {
                    console.log("OK GOOG")
                } else {
                    console.error("Lỗi khi lấy trạng thái lời mời kết bạn", error);
                }
            }
        };
        fetchStatus();
    }, [infoUser, currentUser]);

    const handleCreateFriendRequest = async () => {
        let currentUser = localStorage.getItem("infoUser")

        if (!currentUser) {
            message.error("Đã xảy ra lỗi, vui lòng thử lại!");
            return;
        }
        JSON.parse
        const data = {
            "idAccountSent": JSON.parse(currentUser)?.idAccount,
            "idAccountReceive": infoUser.accountBasicResponse?.idAccount,
            "pathAvartar": infoUser.accountBasicResponse?.imgAvatar,
            "firstName": infoUser.accountBasicResponse?.firstName,
            "lastName": infoUser.accountBasicResponse?.lastName,
            "content": note
        }

        try {
            setLoadingFetchFriendRequest(true)
            const response = await friendService.createFriendRequest(data)
            if (response.code === 200) {
                setLoadingFetchFriendRequest(false)
                message.success("Gửi lời mời kết bạn thành công!");
                setShowNote(true)
                setShowCancelRequest(true)
                setShowAddFriend(false)
                setShowMessage(false)
                setIdFriendRequest(response.data)
            } else {
                setLoadingFetchFriendRequest(false)
                setShowNote(true)
                setShowCancelRequest(false)
                setShowAddFriend(true)
                setIdFriendRequest(0)
                message.error("Gửi lời mời kết bạn không thành công!");
            }
        } catch (error) {
            setLoadingFetchFriendRequest(false)
            console.error("Lỗi khi gửi lời mời kết bạn", error);
            message.error("Đã xảy ra lỗi, vui lòng thử lại!");
        }
    }

    useEffect(() => {
        if (showMessage) {
            setShowNote(false)
        }
    }, [showMessage])

    const handleUpdateCancelFriendRequest = async (idFriendRequest) => {
        try {
            const resp = await friendService.updateStatusFriendRequest(idFriendRequest, "CANCELED");
            console.log(resp);

            if (resp.code === 200) {
                setShowAddFriend(true)
                setShowMessage(false)
                setShowNote(true)
                setShowCancelRequest(false)
                message.success("Huỷ lời mời kết bạn thành công");
            } else {
                setNote("")
                message.error("Huỷ lời mời kết bạn thất bại!");
            }
        } catch (error) {
            console.error("Lỗi khi cập nhật trạng thái:", error);
            message.error("Đã xảy ra lỗi, vui lòng thử lại!");
        }
    };
    console.log("NOte se hien: ", note);

    return (
        <div>
            <div className="header-chatlist flex gap-1 pb-5 p-2 pt-5">
                <Input placeholder="Tìm kiếm" prefix={<SearchOutlined />} />
                <div className="add-friends-groups flex gap-1">
                    <div onClick={showModal}>
                        <IconChatList src="/public/chatlist/add-user.png" size="16px"></IconChatList>
                    </div>
                    <Modal
                        title="Thêm bạn"
                        open={open}
                        onOk={handleSearch}
                        onCancel={handleCancel}
                        okText="Tìm kiếm"
                        cancelText="Huỷ"
                    >
                        <div>
                            <Input
                                placeholder="Số điện thoại"
                                prefix={<PhoneOutlined />}
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                            />
                            {loading && (
                                <div className="my-7 bg-gray-100 rounded-md p-3">
                                    <div className="flex content-between items-center justify-between">
                                        <div className="flex gap-3 items-center">
                                            <LoadingSkeleton width="68px" height="68px" radius="50%" />
                                            <LoadingSkeleton width="80px" height="14px" radius="4px" />
                                        </div>
                                        <div className="flex gap-3 mt-3 w-[180px] h-8">
                                            <LoadingSkeleton width="100%" height="100%" radius="4px" />
                                        </div>
                                    </div>
                                    <div className="mt-3 w-[100%] h-10">
                                        <LoadingSkeleton width="100%" height="100%" radius="4px" />
                                    </div>
                                </div>
                            )}
                            {infoUser !== null && (
                                <div className="my-7 bg-gray-100 rounded-md p-3">
                                    <div className="flex content-between items-center justify-between">
                                        <div className="flex gap-3 items-center">
                                            <Avatar src="/public/sidebar/woman.png" size="68px" />
                                            <span className="font-semibold text-base mt-2">
                                                {infoUser?.accountBasicResponse?.firstName + ' ' + infoUser?.accountBasicResponse?.lastName}
                                            </span>
                                        </div>
                                        <div className="flex gap-3 mt-3">
                                            <ConditionRender isVisible={showMessage}>
                                                <Button>Nhắn tin</Button>
                                            </ConditionRender>
                                            {loadingFetchFriendRequest ? <>
                                                <LoadingSkeleton width="100%" height="100%" radius="4px" />
                                            </> : <>
                                                <ConditionRender isVisible={showAddFriend}>
                                                    <div onClick={handleCreateFriendRequest}>
                                                        <Button type="primary">Kết bạn</Button>
                                                    </div>
                                                </ConditionRender>
                                            </>}

                                            <ConditionRender isVisible={showCancelRequest}>
                                                <div onClick={() => handleUpdateCancelFriendRequest(idFriendRequest)}>
                                                    <Button type="dashed">Huỷ lời mời + {idFriendRequest}</Button>
                                                </div>
                                            </ConditionRender>
                                        </div>
                                    </div>
                                    <ConditionRender isVisible={showNote}>
                                        <div className="mt-3">
                                            <TextArea
                                                placeholder="Nhập tin nhắn lời mời kết bạn"
                                                autoSize={{ minRows: 2, maxRows: 3 }}
                                                value={note}
                                                onChange={(e) => setNote(e.target.value)}
                                            />
                                        </div>
                                    </ConditionRender>
                                </div>
                            )}
                            {error && <span className="text-red-500 mt-3 block ml-3">{error}</span>}
                        </div>
                    </Modal>
                    <div onClick={showModal}>
                        <IconChatList src="/public/chatlist/add-group.png" size="16px"></IconChatList>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HeaderChatList;