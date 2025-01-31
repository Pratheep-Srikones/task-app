export const user_id =
  typeof window !== "undefined" ? localStorage.getItem("user_id") : null;
export const username =
  typeof window !== "undefined" ? localStorage.getItem("username") : null;
export const token =
  typeof window !== "undefined" ? localStorage.getItem("token") : null;

export const today = new Date();
