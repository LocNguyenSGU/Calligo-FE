/* eslint-disable react/prop-types */

const LoadingSkeleton = ({ width = "100%", height = "20px", radius = "4px" }) => {
    return (
        <div
            className="skeleton"
            style={{
                width: width,
                height: height,
                borderRadius: radius,
            }}
        ></div>
    );
};

export default LoadingSkeleton;