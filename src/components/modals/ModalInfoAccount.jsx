import Avatar from "../shared/Avatar";

const ModalInfoAccount = ({infoUser}) => {
    return (
        <div>
            <div className="relative">
                <img className='img-backgound w-full h-44 rounded-sm'
                    src="https://cdn2.fptshop.com.vn/unsafe/1920x0/filters:quality(100)/mung_1_tet_2025_la_ngay_may_duong_lich_4e5c2a0326.jpg"
                />
                <div className="absolute -bottom-12 left-2 flex gap-3 items-center">
                    <Avatar src="/public/sidebar/woman.png" size="68px"></Avatar>
                    <span className="font-semibold text-base mt-2">{infoUser.firstName + ' ' +  infoUser.lastName}</span>
                </div>
            </div>
            <div className="pt-12">
                <h2 className="font-semibold text-base mt-2">Thông tin cá nhân</h2>
                <div className="flex flex-col gap-3 mt-3">
                <div className="flex gap-5">
                    <span className="font-semibold text-sm">Email:</span>
                    <span className="text-sm">{infoUser.email}</span>
                </div>
                <div className="flex gap-5">
                    <span className="font-semibold text-sm">Giới tính: </span>
                    <span className="text-sm">{infoUser?.gender || "Nam"}</span>
                </div>
                <div className="flex gap-5">
                    <span className="font-semibold text-sm">Ngày sinh: </span>
                    <span className="text-sm">{infoUser.dateOfBirth}</span>
                </div>
                <div className="flex gap-5">
                    <span className="font-semibold text-sm">Số điện thoại: </span>
                    <span className="text-sm">{infoUser.phoneNumber}</span>
                </div>
                <div className="flex gap-5">
                    <span className="font-semibold text-sm">Địa chỉ: </span>
                    <span className="text-sm">{infoUser.address}</span>
                </div>
                </div>
            </div>
        </div>


    );
};

export default ModalInfoAccount;