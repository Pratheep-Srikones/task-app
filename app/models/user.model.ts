import { supabase } from "@/utils/supabase";

export const addUserModel = async (username: string, password: string) => {
  const { data, error } = await supabase
    .from("users")
    .insert({ username, password });
  if (error) {
    throw error;
  }
  return data;
};

export const getUserModel = async (username: string) => {
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("username", username);
  if (error) {
    throw error;
  }
  return data;
};
