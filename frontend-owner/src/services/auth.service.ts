import axios from "axios";
import { LoginDto } from "../models/dtos/auth/login.dto";
import { IUser } from "../models/entities/user.entity";

const API_URL = process.env.REACT_APP_REST_ENDPOINT;

export const login = async (data: LoginDto) => {
  const response = await axios.post<{ user: IUser; token: string }>(
    API_URL + "/auth/login",
    data
  );
  if (response.data.token) {
    localStorage.setItem("user", JSON.stringify(response.data.user));
    localStorage.setItem("token", response.data.token);
  }
};

export const logout = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("token");
};

export const getCurrentUser = (): IUser | null => {
  const userStr = localStorage.getItem("user");
  if (userStr) return JSON.parse(userStr) as IUser;

  return null;
};
