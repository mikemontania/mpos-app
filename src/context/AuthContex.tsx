import React, { createContext, useEffect, useReducer } from "react";
import { LoginResponse, Usuario } from "../interfaces/User.interfaces";
import { AuthState, authReducer } from "./AuthReducer";
import apiAxios from "../api/axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
type AuthContextProps = {
  errorMessage: string;
  token: string | null;
  user: Usuario | null;
  status: "checking" | "authenticated" | "not-authenticated";
  login: (loginData: LoginData) => void;
  logOut: () => void;
  removeError: () => void;
};
export interface LoginData {
  username: string;
  password: string;
}

const authInicialState: AuthState = {
  status: "checking",
  token: null,
  user: null,
  errorMessage: ""
};

export const AuthContext = createContext({} as AuthContextProps);

export const AuthProvider = ({ children }: any) => {
  const [state, dispatch] = useReducer(authReducer, authInicialState);

  useEffect(() => {
    checkToken();
  }, []);

  const checkToken = async () => {
    const token = await AsyncStorage.getItem("token");

    // No token, no autenticado
    if (!token) return dispatch({ type: "notAuthenticated" });

    // Hay token
    const resp = await apiAxios.get("/auth/token");
    if (resp.status !== 200) {
      return dispatch({ type: "notAuthenticated" });
    }

    await AsyncStorage.setItem("token", resp.data.token);
    dispatch({
      type: "login",
      payload: {
        token: resp.data.token
      }
    });
  };

  const login = async ({ username, password }: LoginData) => {
    try {
      const { data } = await apiAxios.post<LoginResponse>("/auth/login", {
        username,
        password
      });
      dispatch({
        type: "login",
        payload: {
          token: data.token
        }
      });

      await AsyncStorage.setItem("token", data.token);
    } catch (error: any) {
      dispatch({
        type: "addError",
        payload: error.response.data.msg || "Información incorrecta"
      });
    }
  };
  const logOut = async () => {
    await AsyncStorage.removeItem("token");
    dispatch({ type: "logout" });
  };

  const removeError = () => {
    dispatch({ type: "removeError" });
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        login,
        logOut,
        removeError
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
