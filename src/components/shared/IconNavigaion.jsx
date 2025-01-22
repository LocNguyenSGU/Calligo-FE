/* eslint-disable react/prop-types */
const IconNavigaion = ({ src, alt, size = "28px" }) => {
    const defaultIconImage = "";
    return (
      <div className="p-2 rounded-md bg-gray-200 hover:bg-gray-400 cursor-pointer w-12 h-12 block">
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