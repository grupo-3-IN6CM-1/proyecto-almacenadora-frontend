import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login as loginRequest } from "../../services";
import toast from "react-hot-toast";

export const useLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const login = async (email, password) => {
    setIsLoading(true);
    const response = await loginRequest({ email, password });
    setIsLoading(false);

    if (response.error) {
      toast.error(response.error.response?.data || "Ocurrió un error al iniciar sesión");
      throw new Error("Login failed");
    }

    const { userDetails } = response.data;
    localStorage.setItem("user", JSON.stringify(userDetails));
    toast.success("Sesión iniciada correctamente");
    navigate("/dashboard");
  };

  return { login, isLoading };
};
