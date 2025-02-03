"use client";
import {
  completeTask,
  deleteCompletedTasks,
  deleteTask,
  editTask,
  getAllTasks,
  undoTask,
} from "@/services/task.services";
import { Task } from "@/types/types";
import { formatDate } from "@/utils/date.util";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { notifyError, notifySuccess } from "@/utils/notify";
import { ToastContainer } from "react-toastify";

const Page = () => {
  const router = useRouter();
  const [allTasks, setAllTasks] = useState<Task[]>([]);
  const [x, setX] = useState(false);

  const [modalopen, setModalOpen] = useState(false);
  const [action, setAction] = useState("edit");

  const [currTask, setCurrTask] = useState<Task | null>();

  const [user_id, setUser_id] = useState<string | null>(null); // Initialize as null

  useEffect(() => {
    const storedUser_id = localStorage.getItem("user_id");

    if (storedUser_id) {
      setUser_id(storedUser_id);
    } else {
      setUser_id(""); // Set to empty string explicitly if no user_id is found
    }
  }, []);

  useEffect(() => {
    if (user_id === null) {
      return; // Don't run until user_id is initialized
    }

    if (!user_id) {
      console.log("User not logged in. Redirecting...");
      router.push("/auth");
    } else {
      console.log("User logged in");
    }
  }, [user_id, router]);

  const toggle = () => {
    setX(!x);
  };
  const handleTaskCompletion = async (task_id: string) => {
    try {
      await completeTask(task_id)
        .then(() => {
          notifySuccess("Task completed successfully.");
          toggle();
        })
        .catch((error) => {
          console.error("Error completing task:", error);
          notifyError("Error completing task.");
        });
    } catch (error) {
      console.error("Error completing task:", error);
    }
  };

  const handleUndoTask = async (task_id: string) => {
    try {
      await undoTask(task_id)
        .then(() => {
          notifySuccess("completeion undone successfully.");
          toggle();
        })
        .catch((error) => {
          console.error("Error completing task:", error);
          notifyError("Error completing task.");
        });
    } catch (error) {
      console.error("Error completing task:", error);
    }
  };

  const handleDeleteCompletedTasks = async () => {
    try {
      await deleteCompletedTasks(user_id as string)
        .then(() => {
          notifySuccess("Completed tasks deleted successfully.");
          toggle();
        })
        .catch((error) => {
          console.error("Error deleting completed tasks:", error);
          notifyError("Error deleting completed tasks.");
        });
    } catch (error) {
      console.error("Error deleting completed tasks:", error);
    }
  };

  const handledeleteModalOpen = (task_id: string) => {
    setModalOpen(true);
    setAction("delete");
    setCurrTask(allTasks.find((task) => task.task_id === task_id));
  };

  const handleEditModalOpen = (task_id: string) => {
    setModalOpen(true);
    setAction("edit");
    setCurrTask(allTasks.find((task) => task.task_id === task_id));
  };

  const handleDeleteTask = async () => {
    try {
      if (!currTask) {
        return;
      }
      await deleteTask(currTask.task_id)
        .then(() => {
          notifySuccess("Task deleted successfully.");
          setModalOpen(false);
          setCurrTask(null);
          toggle();
        })
        .catch((error) => {
          console.error("Error deleting task:", error);
          notifyError("Error deleting task.");
        });
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const handleEditTask = async () => {
    try {
      if (!currTask) {
        return;
      }
      await editTask(
        currTask.task_id,
        currTask.title,
        currTask.description,
        currTask.due_at
      )
        .then(() => {
          notifySuccess("Task edited successfully.");
          setModalOpen(false);
          setCurrTask(null);
          toggle();
        })
        .catch((error) => {
          console.error("Error editing task:", error);
          notifyError("Error editing task.");
        });
    } catch (error) {
      console.error("Error editing task: ", error);
    }
  };

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await getAllTasks(user_id as string);
        setAllTasks(res);
      } catch (error) {
        console.error(error);
      }
    };
    fetchTasks();
  }, [user_id, x]);
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white p-4">
      <div className="flex flex-col items-center justify-center bg-gray-600/40 p-8 rounded-2xl shadow-xl w-full max-w-lg">
        <div className="w-full max-w-2xl space-y-4">
          {allTasks.map((task) => (
            <div
              key={task.task_id}
              className="flex flex-col sm:flex-col items-start sm:items-center justify-between p-4 bg-gray-700 rounded-lg shadow-md hover:bg-gray-600 transition-all"
            >
              <div className="flex flex-col  w-full min-w-0">
                <h3 className="text-xl font-semibold text-white break-words">
                  {task.title}
                </h3>
                <p className="text-sm text-gray-400 break-words overflow-hidden overflow-ellipsis">
                  {task.description}
                </p>
                <div className="items-start sm:text-right sm:ml-4  my-2">
                  <p
                    className={`text-sm font-normal break-words ${
                      task.status === "completed"
                        ? "text-green-400"
                        : "text-red-400"
                    }`}
                  >
                    Due: {formatDate(task.due_at)}
                  </p>
                </div>
              </div>

              <div className="my-2 sm:mt-0 sm:ml-4 flex-shrink-0">
                {task.status === "pending" ? (
                  <button
                    onClick={() => handleTaskCompletion(task.task_id)}
                    className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-600 transition-transform transform hover:scale-105"
                  >
                    Done
                  </button>
                ) : (
                  <button
                    onClick={() => handleUndoTask(task.task_id)}
                    className="px-4 py-2 bg-red-500 text-white font-semibold rounded-lg shadow-lg hover:bg-red-600 transition-transform transform hover:scale-105"
                  >
                    Undo
                  </button>
                )}
              </div>
              <div className="my-2 sm:mt-0 sm:ml-4 flex-shrink-0">
                <button
                  onClick={() => handleEditModalOpen(task.task_id)}
                  className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-600 transition-transform transform hover:scale-105"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
                    />
                  </svg>
                </button>
              </div>
              <div className="mt-2 sm:mt-0 sm:ml-4 flex-shrink-0">
                <button
                  onClick={() => handledeleteModalOpen(task.task_id)}
                  className="px-4 py-2 bg-red-500 text-white font-semibold rounded-lg shadow-lg hover:bg-red-600 transition-transform transform hover:scale-105"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                    />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
        <button
          onClick={handleDeleteCompletedTasks}
          className="my-4 px-4 py-2 bg-red-500 text-white font-semibold rounded-lg shadow-lg hover:bg-red-600 transition-all"
        >
          Delete Completed Tasks
        </button>
        <Link href="/home">
          <button className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-600 transition-transform transform hover:scale-105">
            Home
          </button>
        </Link>
      </div>

      {modalopen && (
        <div>
          <div className="w-full h-full bg-black/90 fixed top-0 left-0 flex items-center justify-center z-10">
            {action === "edit" && (
              <div className="bg-gray-900 text-white p-6 rounded-xl shadow-2xl w-full max-w-md">
                <h2 className="text-2xl font-semibold mb-4 text-center">
                  Edit Task
                </h2>
                <div className="space-y-4">
                  <input
                    type="text"
                    className="w-full px-4 py-2 bg-gray-800 text-white font-semibold rounded-lg shadow-md"
                    placeholder="Title"
                    value={currTask?.title}
                    onChange={(e) => {
                      if (currTask) {
                        setCurrTask({ ...currTask, title: e.target.value });
                      }
                    }}
                  />
                  <textarea
                    className="w-full px-4 py-2 bg-gray-800 text-white font-semibold rounded-lg shadow-md"
                    placeholder="Description"
                    value={currTask?.description}
                    onChange={(e) => {
                      if (currTask) {
                        setCurrTask({
                          ...currTask,
                          description: e.target.value,
                        } as Task);
                      }
                    }}
                  />
                  <input
                    type="datetime-local"
                    className="w-full px-4 py-2 bg-gray-800 text-white font-semibold rounded-lg shadow-md"
                    value={currTask?.due_at}
                    onChange={(e) => {
                      if (currTask) {
                        setCurrTask({
                          ...currTask,
                          due_at: e.target.value,
                        } as Task);
                      }
                    }}
                  />
                  <div className="space-x-4">
                    <button
                      onClick={() => {
                        setModalOpen(false);
                        setCurrTask(null);
                      }}
                      className="px-4 py-2 bg-red-500 text-white font-semibold rounded-lg shadow-lg hover:bg-red-600 transition-all"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => {
                        handleEditTask();
                      }}
                      className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-600 transition-all"
                    >
                      Save
                    </button>
                  </div>
                </div>
              </div>
            )}
            {action === "delete" && (
              <div className="bg-gray-900 text-white p-6 rounded-xl shadow-2xl w-full max-w-md">
                <h2 className="text-2xl font-semibold mb-4 text-center">
                  Delete Task:{" "}
                  <span className="text-blue-500">{currTask?.title}</span>
                </h2>
                <p className="text-center text-lg">
                  Are you sure you want to delete this task?
                </p>
                <div className="flex justify-center space-x-4 mt-4">
                  <button
                    onClick={() => {
                      setModalOpen(false);
                      setCurrTask(null);
                    }}
                    className="px-4 py-2 bg-red-500 text-white font-semibold rounded-lg shadow-lg hover:bg-red-600 transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      handleDeleteTask();
                    }}
                    className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-600 transition-all"
                  >
                    Delete
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default Page;
