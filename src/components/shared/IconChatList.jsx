/* eslint-disable react/prop-types */
const IconChatList = ({ src, alt, size = "20px", isRounded=false, isSmaller=false}) => {
    const defaultIconImage = "";
    return (
      <div className={`p-1  cursor-pointer ${isSmaller ? "w-6 h-6" : "w-8 h-8"} flex justify-center items-center ${isRounded ? "rounded-full bg-gray-200 hover:bg-gray-400" : "rounded-md hover:bg-gray-200"}`}>
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