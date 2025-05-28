/* eslint-disable react/prop-types */
const IconNavigaion = ({ src, alt, size = "28px", isActive = false }) => {
    const defaultIconImage = "";
    return (
      <div
      className={`${
        isActive ? "bg-red-400 hover:bg-red-400" : "bg-blue-100 hover:bg-red-200"
      } p-2 rounded-md  cursor-pointer w-12 h-12 flex items-center justify-center`}
      >
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
  
  export default IconNavigaion;