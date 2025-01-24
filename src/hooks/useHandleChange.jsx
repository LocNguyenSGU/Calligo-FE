import { useState } from 'react';

const useHandleChange = (initialValues) => {
    const [values, setValues] = useState(initialValues);

    const handleChange = (event) => {
        const { name, type, value, checked } = event.target;
        setValues({
            ...values,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    return [values, handleChange];
};

export default useHandleChange;