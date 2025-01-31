export interface Task {
  task_id: string;
  user_id: string;
  title: string;
  description: string;
  created_at: string;
  updated_at: string;
  due_at: string;
  status: string;
}

export interface User {
  user_id: string;
  username: string;
  password: string;
}
