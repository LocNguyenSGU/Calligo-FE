/* eslint-disable react/prop-types */
const Avatar = ({ src, alt, size = "48px", gender = "male" }) => {
  const defaultAvatarImage =
    gender === "female" ? "/sidebar/woman.png" : "/sidebar/boy.png";

  return (
    <div
      className="rounded-full overflow-hidden"
      style={{ width: size, height: size, minWidth: size }}
    >
      <img
        src={src || defaultAvatarImage}
        alt={alt || "avatar"}
        className="w-full h-full object-cover"
      />
    </div>
  );
};

export default Avatar;