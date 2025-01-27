/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import authService from '../services/authService';

const ProtectedRoute = ({ children }) => {
    const [isVerified, setIsVerified] = useState(null);

    useEffect(() => {
        const verifyToken = async () => {
            try {
                await authService.verify();
                setIsVerified(true);
            } catch (error) {
                console.error('Verification failed:', error);
                setIsVerified(false);
            }
        };

        verifyToken();
    }, []);

    if (isVerified === null) return <div>Loading...</div>;
    return isVerified ? children : <Navigate to="/signin" />;
};

export default ProtectedRoute;