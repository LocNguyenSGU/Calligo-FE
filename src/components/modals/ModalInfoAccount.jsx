/* eslint-disable react/prop-types */
import { useRef, useState } from "react";
import { message, Spin } from "antd"; // Import Ant Design
import fileService from "../../services/fileService";
import Avatar from "../shared/Avatar";
import userService from "../../services/userService";
import { CameraOutlined } from "@ant-design/icons";

const ModalInfoAccount = ({ infoUser }) => {
    const fileInputRef = useRef(null);
    const [loading, setLoading] = useState(false);
    const [avatar, setAvatar] = useState(infoUser.imgAvatar || "/public/sidebar/woman.png"); // State quản lý avatar

    // Mở hộp thoại chọn ảnh
    const handleChooseFile = () => {
        fileInputRef.current.click();
    };

    // Xử lý upload avatar
    const handleUpdateAvatar = async (event) => {
        console.log("infoUser: ", infoUser);
        const files = event.target.files;
        if (files.length === 0) return;

        setLoading(true); // Bắt đầu loading
        try {
            // Upload ảnh lên server
            const response = await fileService.uploadAvatar(Array.from(files));
            console.log("Update avatar modal: ", response.data[0].url);

            // Cập nhật dữ liệu user với avatar mới
            const dataRequest = {
                firstName: infoUser.firstName,
                lastName: infoUser.lastName,
                phoneNumber: infoUser.phoneNumber,
                address: infoUser.address,
                dateOfBirth: infoUser.dateOfBirth,
                imgAvatar: response.data[0].url,
            };
            console.log("Dữ liệu sẽ gủi đi: ", dataRequest);

            const responseUpdate = await userService.updateAccount(infoUser.idAccount, dataRequest);
            console.log("Cập nhật avatar thành công: ", responseUpdate);
            localStorage.setItem("infoUser", JSON.stringify(responseUpdate.data));

            // Cập nhật state avatar để UI thay đổi ngay
            setAvatar(response.data[0].url);

            // Hiển thị thông báo thành công
            message.success("Cập nhật avatar thành công!");
        } catch (error) {
            console.error("Lỗi khi cập nhật avatar:", error);
            message.error("Cập nhật avatar thất bại!");
        } finally {
            setLoading(false); // Kết thúc loading
        }
    };

    return (
        <div>
            <div className="relative">
                <img
                    className="img-backgound w-full h-44 rounded-sm"
                    src="https://cdn2.fptshop.com.vn/unsafe/1920x0/filters:quality(100)/mung_1_tet_2025_la_ngay_may_duong_lich_4e5c2a0326.jpg"
                />
                <div className="absolute -bottom-12 left-2 flex gap-3 items-center">
                    {/* Avatar có thể click */}
                    <div className="relative cursor-pointer" onClick={handleChooseFile}>
                        <Spin spinning={loading}>
                            <Avatar src={avatar} size="68px" />
                        </Spin>
                        {/* Icon camera nhỏ, đặt đè lên avatar */}
                        <div className="absolute bottom-0 right-[5px] bg-gray-300 p-1 rounded-full shadow-md w-6 h-6 flex items-center justify-center hover:bg-gray-400">
                            <CameraOutlined className="text-gray-600 text-xs" />
                        </div>
                    </div>
                    <span className="font-semibold text-base mt-2">
                        {infoUser.firstName + " " + infoUser.lastName}
                    </span>
                </div>
            </div>

            {/* Input file ẩn */}
            <input
                type="file"
                ref={fileInputRef}
                style={{ display: "none" }}
                onChange={handleUpdateAvatar}
                accept="image/*"
            />

            <div className="pt-12">
                <h2 className="font-semibold text-base mt-2">Thông tin cá nhân</h2>
                <div className="flex flex-col gap-3 mt-3">
                    <div className="flex gap-5">
                        <span className="font-semibold text-sm">Email:</span>
                        <span className="text-sm">{infoUser.email}</span>
                    </div>
                    <div className="flex gap-5">
                        <span className="font-semibold text-sm">Giới tính:</span>
                        <span className="text-sm">{infoUser?.gender || "Nam"}</span>
                    </div>
                    <div className="flex gap-5">
                        <span className="font-semibold text-sm">Ngày sinh:</span>
                        <span className="text-sm">{infoUser.dateOfBirth}</span>
                    </div>
                    <div className="flex gap-5">
                        <span className="font-semibold text-sm">Số điện thoại:</span>
                        <span className="text-sm">{infoUser.phoneNumber}</span>
                    </div>
                    <div className="flex gap-5">
                        <span className="font-semibold text-sm">Địa chỉ:</span>
                        <span className="text-sm">{infoUser.address}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModalInfoAccount;