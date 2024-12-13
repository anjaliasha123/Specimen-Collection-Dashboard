import { useContext } from "react";
import { AuthContext } from "./KeycloakProvider";
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const { isAuthenticated, isLoading, isAdmin } = useContext(AuthContext);
  
    // console.log('children:', children.type.name)
  if (isLoading) {
    return <div>Navigating.....</div>; // Or a spinner/loading component
  }
  // prevent user to go to requests page
  if(isAuthenticated && !isAdmin && children.type.name.toString() === 'RequestsPage') return <Navigate to="/" replace />

  // If not authenticated, redirect to the home page
  return isAuthenticated ? children : <Navigate to="/" replace />;
  };
  
  export default ProtectedRoute;