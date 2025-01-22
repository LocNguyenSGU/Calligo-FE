/* eslint-disable react/prop-types */
const IconChatList = ({ src, alt, size = "20px" }) => {
    const defaultIconImage = "";
    return (
      <div className="p-1 rounded-md hover:bg-gray-200 cursor-pointer w-8 h-8 flex justify-center items-center">
        <img
          src={src || defaultIconImage}
          alt={alt || "icon"}
          style={{
            width: size,
            height: size,
          }}
        />

      </div>
    );
  };
  
  export default IconChatList;