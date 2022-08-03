import React from "react";
import axios from "axios";
import { createContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContextType, SignInData } from "./utils";

export const AuthContext = createContext({} as AuthContextType);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  let navigate = useNavigate();

  const SignIn = async (body: SignInData) => {
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_URL}/sessions`,
        body
      );
      if (data) {
        localStorage.setItem("user_token", data?.token);
        localStorage.setItem("medic", JSON.stringify(data?.medic));
        navigate("/home");
      }
    } catch (error) {
      return error;
    }
  };


  const SignOut = () => {
    localStorage.removeItem("user_token");
  };

  return (
    <AuthContext.Provider value={{ SignIn, SignOut }}>
      {children}
    </AuthContext.Provider>
  )
}
