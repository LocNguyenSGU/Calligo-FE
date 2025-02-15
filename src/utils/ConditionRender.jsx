/* eslint-disable react/prop-types */
const ConditionRender = ({isVisible, children}) => {
    return isVisible ? <>{children}</> : null;
};

export default ConditionRender;