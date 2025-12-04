import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../apis/userapi";

export const useLogin = () => {
  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const requestBody = {
        username: credentials.username,
        password: credentials.password,
      };

      const response = await api.post("auth/login", requestBody, {
        headers: { "Content-Type": "application/json" },
      });

      const { accessToken, refreshToken, user } = response.data;

       localStorage.setItem("token", accessToken);
      localStorage.setItem("refreshToken", refreshToken);

      localStorage.setItem("user", JSON.stringify(user));

      navigate("/dashboard");
    } catch (error) {
      console.log(error);
      toast.error("Please verify your username or password");
    }
  };

  return {
    credentials,
    handleChange,
    handleSubmit,
  };
};
