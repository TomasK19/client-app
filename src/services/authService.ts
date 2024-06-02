import { ErrorResponse } from "../types/error";
import api from "./api"; // Adjust the import path as needed

export const loginUser = async (username: string, password: string) => {
  try {
    const response = await api.post("/users/login", { username, password });
    return response.data;
  } catch (error) {
    const err = error as ErrorResponse;
    throw err;
  }
};

export const registerUser = async (
  email: string,
  username: string,
  password: string
) => {
  try {
    const response = await api.post("/users/register", {
      email,
      username,
      password,
    });
    return response.data;
  } catch (error) {
    const err = error as ErrorResponse;
    throw err;
  }
};

export const verifyEmail = async (email: string, verificationCode: string) => {
  try {
    const response = await api.post("/users/verify-email", {
      email,
      verificationCode,
    });
    return response.data;
  } catch (error) {
    const err = error as ErrorResponse;
    throw err;
  }
};
