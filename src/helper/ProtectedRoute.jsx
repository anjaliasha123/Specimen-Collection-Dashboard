import { useContext } from "react";
import { AuthContext } from "./KeycloakProvider";
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const { isAuthenticated, isLoading } = useContext(AuthContext);
  
    console.log('user:', isAuthenticated)
  if (isLoading) {
    return <div>Navigating.....</div>; // Or a spinner/loading component
  }

  // If not authenticated, redirect to the home page
  return isAuthenticated ? children : <Navigate to="/" replace />;
  };
  
  export default ProtectedRoute;