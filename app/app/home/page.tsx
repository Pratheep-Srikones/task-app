"use client";
import { user_id } from "@/data/data";
import {
  addTask,
  completeTask,
  deleteCompletedTasks,
  getPendingTasks,
} from "@/services/task.services";
import { Task } from "@/types/types";
import { formatDate } from "@/utils/date.util";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";

const HomePage = () => {
  const router = useRouter();
  const [pendingTasks, setPendingTasks] = React.useState<Task[]>([]);
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [dueDate, setDueDate] = React.useState("");
  const [modalopen, setModalOpen] = React.useState(false);

  const [x, setX] = React.useState(false);
  const toggle = () => {
    setX(!x);
  };

  useEffect(() => {
    if (!user_id || user_id === "") {
      router.push("/auth");
    }
  });

  useEffect(() => {
    const fetchPendingTasks = async () => {
      try {
        const data = await getPendingTasks(user_id as string);
        setPendingTasks(data);
      } catch (error) {
        console.error("Error fetching pending tasks:", error);
      }
    };
    fetchPendingTasks();
  }, [x]);

  const handleAddTask = async () => {
    try {
      if (!title || !description || !dueDate) {
        alert("All fields are required.");
        return;
      }
      await addTask(title, description, dueDate, user_id as string)
        .then(() => {
          alert("Task added successfully.");
          setModalOpen(false);
          setTitle("");
          setDescription("");
          setDueDate("");
        })
        .catch((error) => {
          console.error("Error adding task:", error);
          alert("Error adding task.");
        });
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const handleTaskCompletion = async (task_id: string) => {
    try {
      await completeTask(task_id)
        .then(() => {
          alert("Task completed successfully.");
          toggle();
        })
        .catch((error) => {
          console.error("Error completing task:", error);
          alert("Error completing task.");
        });
    } catch (error) {
      console.error("Error completing task:", error);
    }
  };

  const handleDeleteCompletedTasks = async () => {
    try {
      await deleteCompletedTasks(user_id as string)
        .then(() => {
          alert("Completed tasks deleted successfully.");
          toggle();
        })
        .catch((error) => {
          console.error("Error deleting completed tasks:", error);
          alert("Error deleting completed tasks.");
        });
    } catch (error) {
      console.error("Error deleting completed tasks:", error);
    }
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white p-4">
      <div>
        <button
          onClick={() => {
            localStorage.clear();
            router.push("/auth");
          }}
          className="fixed top-8 right-8 md:right-10 bg-red-600/60 text-white text-lg font-bold py-3 px-6 rounded-full shadow-lg hover:bg-red-950 transition duration-300 hover:after:content-['Log_out'] after:content-['<<'] hover:rounded-lg"
        />
      </div>
      <div className="flex flex-col items-center justify-center bg-gray-800 p-8 rounded-2xl shadow-xl w-full max-w-lg">
        <h1 className="text-3xl font-bold text-center mb-6">
          Welcome, Pratheep
        </h1>
        <div className="w-full flex flex-col items-center justify-center">
          <h2 className="text-2xl font-semibold text-center mb-4 text-blue-500">
            Pending Tasks
          </h2>
          <div className="space-y-4 w-full">
            {pendingTasks.map((task) => (
              <div
                key={task.task_id}
                className="flex flex-col sm:flex-row items-center justify-between p-4 bg-gray-700 rounded-lg shadow-md hover:bg-gray-600 transition-all"
              >
                <div className="flex-1 mb-2 sm:mb-0">
                  <h3 className="text-xl font-semibold">{task.title}</h3>
                  <p className="text-sm text-gray-300">{task.description}</p>
                </div>
                <div className="text-center sm:text-right sm:ml-4">
                  <p className="text-sm font-medium text-red-400">
                    Due: {formatDate(task.due_at)}
                  </p>
                </div>
                <div className="mt-2 sm:mt-0 sm:ml-4">
                  <button
                    onClick={() => handleTaskCompletion(task.task_id)}
                    className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-600 transition-all"
                  >
                    Done
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div>
            <button
              onClick={handleDeleteCompletedTasks}
              className="my-4 px-4 py-2 bg-red-500 text-white font-semibold rounded-lg shadow-lg hover:bg-red-600 transition-all"
            >
              Delete Completed Tasks
            </button>
            <Link href="/tasks">
              <button className="my-4 mx-2 px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-600 transition-all">
                View All Tasks
              </button>
            </Link>
          </div>
        </div>
      </div>
      <div>
        <button
          onClick={() => setModalOpen(true)}
          className="fixed bottom-8 right-8 md:right-10 bg-blue-600/60 text-white text-lg font-bold py-3 px-6 rounded-full shadow-lg hover:bg-blue-950 transition duration-300 hover:after:content-['+_Add_Task'] after:content-['+'] hover:rounded-lg"
        />
      </div>

      {modalopen && (
        <div>
          <div className="w-full h-full bg-black/50 fixed top-0 left-0 flex items-center justify-center z-10">
            <div className="bg-gray-900 text-white p-6 rounded-xl shadow-2xl w-full max-w-md">
              <h2 className="text-2xl font-semibold mb-4 text-center">
                Add Task
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Task Title
                  </label>
                  <input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    type="text"
                    className="w-full p-2 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Task Description
                  </label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full p-2 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  ></textarea>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Due Date & Time
                  </label>
                  <input
                    value={dueDate}
                    onChange={(e) => {
                      setDueDate(e.target.value);
                      console.log(e.target.value);
                    }}
                    type="datetime-local"
                    className="w-full p-2 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="flex justify-end space-x-4 mt-4">
                  <button
                    onClick={() => {
                      setModalOpen(false);
                      setTitle("");
                      setDescription("");
                      setDueDate("");
                    }}
                    className="px-4 py-2 bg-red-500 text-white rounded-lg shadow-lg hover:bg-red-600 transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleAddTask}
                    className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-600 transition-all"
                  >
                    Save Task
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
