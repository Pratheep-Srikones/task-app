import axiosInstance from "@/config/axios.config";

export const addTask = async (
  title: string,
  description: string,
  due_at: string,
  user_id: string
) => {
  try {
    const res = await axiosInstance.post("/tasks/add", {
      title,
      description,
      due_at,
      user_id,
    });
    return res.data;
  } catch (error) {
    console.error("Error adding task:", error);
    throw error;
  }
};

export const getPendingTasks = async (user_id: string) => {
  try {
    const res = await axiosInstance.get(`/tasks/pending`, {
      params: { user_id },
    });
    return res.data;
  } catch (error) {
    console.error("Error getting pending tasks:", error);
    throw error;
  }
};

export const getAllTasks = async (user_id: string) => {
  try {
    const res = await axiosInstance.get(`/tasks/all`, {
      params: { user_id },
    });
    return res.data;
  } catch (error) {
    console.error("Error getting all tasks:", error);
    throw error;
  }
};

export const completeTask = async (task_id: string) => {
  try {
    const res = await axiosInstance.put(`/tasks/complete`, { task_id });
    return res.data;
  } catch (error) {
    console.error("Error completing task:", error);
    throw error;
  }
};

export const undoTask = async (task_id: string) => {
  try {
    const res = await axiosInstance.put(`/tasks/undo`, { task_id });
    return res.data;
  } catch (error) {
    console.error("Error undoing task:", error);
    throw error;
  }
};

export const deleteCompletedTasks = async (user_id: string) => {
  try {
    const res = await axiosInstance.delete("tasks/complete", {
      params: { user_id },
    });
    return res.data;
  } catch (error) {
    console.error("Error deleting completed tasks:", error);
    throw error;
  }
};

export const deleteTask = async (task_id: string) => {
  try {
    const res = await axiosInstance.delete("tasks/handle", {
      params: { task_id },
    });
    return res.data;
  } catch (error) {
    console.error("Error deleting task:", error);
    throw error;
  }
};

export const editTask = async (
  task_id: string,
  title: string,
  description: string,
  due_at: string
) => {
  try {
    const res = await axiosInstance.put("tasks/handle", {
      task_id,
      title,
      description,
      due_at,
    });
    return res.data;
  } catch (error) {
    console.error("Error editing task:", error);
    throw error;
  }
};
