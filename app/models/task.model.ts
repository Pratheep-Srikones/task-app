import { supabase } from "@/utils/supabase";

// Get all tasks by user ID
export const getTasksByUserIDModel = async (user_id: string) => {
  const { data, error } = await supabase
    .from("tasks")
    .select("*")
    .eq("user_id", user_id);

  if (error) {
    throw error;
  }

  return data;
};

export const getAllPendingTasksModal = async (user_id: string) => {
  const { data, error } = await supabase
    .from("tasks")
    .select("*")
    .eq("user_id", user_id)
    .eq("status", "pending");

  if (error) {
    throw error;
  }

  return data;
};

// Add a new task
export const addTaskModel = async (
  user_id: string,
  title: string,
  description: string,
  due_at: string
) => {
  const { data, error } = await supabase.from("tasks").insert([
    {
      user_id: user_id,
      title: title,
      description: description,
      due_at: due_at,
      status: "pending",
    },
  ]);

  if (error) {
    throw error;
  }

  return data;
};

// Delete completed tasks for a user
export const deleteCompletedTasksModel = async (user_id: string) => {
  const { data, error } = await supabase
    .from("tasks")
    .delete()
    .eq("user_id", user_id)
    .eq("status", "completed");

  if (error) {
    throw error;
  }

  return data;
};

// Update task status
export const updateTaskStatusModel = async (
  task_id: string,
  status: string
) => {
  const { data, error } = await supabase
    .from("tasks")
    .update({ status: status, updated_at: new Date() }) // Update timestamp
    .eq("task_id", task_id);

  if (error) {
    throw error;
  }

  return data;
};

export const updateTaskModel = async (
  task_id: string,
  title: string,
  description: string,
  due_at: string
) => {
  const { data, error } = await supabase
    .from("tasks")
    .update({
      title: title,
      description: description,
      due_at: due_at,
      updated_at: new Date(),
    })
    .eq("task_id", task_id);

  if (error) {
    throw error;
  }

  return data;
};

export const deleteTaskModel = async (task_id: string) => {
  const { data, error } = await supabase
    .from("tasks")
    .delete()
    .eq("task_id", task_id);
  if (error) {
    throw error;
  }

  return data;
};
