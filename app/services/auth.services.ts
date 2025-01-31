import axiosInstance from "@/config/axios.config";

export const signIn = async (username: string, password: string) => {
  try {
    const res = await axiosInstance.post("/auth/signin", {
      username,
      password,
    });
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const logIn = async (username: string, password: string) => {
  try {
    const res = await axiosInstance.post("/auth/login", {
      username,
      password,
    });
    localStorage.setItem("token", res.data.token);
    localStorage.setItem("user_id", res.data.user_id);
    localStorage.setItem("username", res.data.username);

    return res.data;
  } catch (error) {
    throw error;
  }
};
