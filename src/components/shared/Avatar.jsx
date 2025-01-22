/* eslint-disable react/prop-types */
const Avatar = ({src, alt, size = "48px", gender="male"}) => {

    const defaultAvatarImage = gender && gender == "female" ?  "/public/sidebar/woman.png" : "/public/sidebar/boy.png";
    return (
        <div className="rounded-full overflow-hidden cursor-pointer">
            <img src= {src || defaultAvatarImage}
                alt= {alt || "avatar"}
                width={size}
                height={size} />
        </div>
    );
};

export default Avatar;