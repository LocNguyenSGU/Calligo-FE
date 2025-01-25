/* eslint-disable react/prop-types */
import authService from '../services/authService';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    return authService.isAuthenticated() ? children : <Navigate to="/signin" />;
};

export default ProtectedRoute;
