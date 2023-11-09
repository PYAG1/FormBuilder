
import { Navigate } from "react-router-dom";
const ProtectedRoute = ({  children }:any) => {
    const token = localStorage.getItem("UserToken")
    if (!token) {
      return <Navigate to="/" replace />;
    }
  
    return children;
  };
  

  export default ProtectedRoute