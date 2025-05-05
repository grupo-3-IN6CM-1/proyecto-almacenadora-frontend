// src/shared/hooks/useLogin.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login as loginRequest } from "../../services/api.jsx";
import toast from "react-hot-toast";

export const useLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const login = async (email, password) => {
    setIsLoading(true);
    const response = await loginRequest({ email, password });
    setIsLoading(false);

    if (response.error) {
      toast.error(response.error.response?.data || "Error al iniciar sesión");
      throw new Error("Login failed");
    }

    // Tu backend envía en response.data.userDetails { username, token }
    const { userDetails } = response.data;
    const { username, token } = userDetails;

    if (!token) {
      toast.error("No se recibió token de autenticación");
      return;
    }

    // ¡Aquí guardamos AMBOS en localStorage!
    localStorage.setItem("user", JSON.stringify({ username, token }));

    toast.success("Sesión iniciada correctamente");
    navigate("/dashboard");
  };

  return { login, isLoading };
};
