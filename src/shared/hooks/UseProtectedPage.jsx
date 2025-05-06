import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const useProtectedPage = () => {  
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const user = storedUser ? JSON.parse(storedUser) : null;
    const isAuthenticated = user && user.token;

    if (!isAuthenticated) {
      navigate("/unauthorized");
    }
  }, [navigate]);
};
