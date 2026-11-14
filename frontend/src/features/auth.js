import { api } from "../../api";

export const login = async (token) => {
  const { data } = await api.post("/api/auth/login", { token });
  return data;
};

export const logout = async (token) => {
  try {
    const { data } = await api.get("/api/auth/logout", { token });
    // console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const me = async () => {
  try {
    const { data } = await api.get("/api/auth/me");
    // console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
};
