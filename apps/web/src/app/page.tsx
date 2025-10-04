"use client";

import { useEffect, useState } from "react";
import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";
import { listTasks, createTask, updateTask, deleteTask, type Task } from "./lib/api";
import styles from "./page.module.css";

export default function Page() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        setTasks(await listTasks());
      } catch {
        setError("Failed to fetch tasks");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const handleUpdate = async (id: string, content: string) => {
    const updated = await updateTask(id, content);
    setTasks((prev) => prev.map((t) => (t.id === id ? updated : t)));
  };

  const handleDelete = async (id: string) => {
    await deleteTask(id);
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <header className={styles.header}>
          <h1 className={styles.title}>📋 My Memo App</h1>
          <p className={styles.subtitle}>Keep track of your thoughts and tasks</p>
        </header>

        <section className={styles.formSection}>
          <TaskForm create={createTask} onCreated={(t) => setTasks((prev) => [t, ...prev])} />
        </section>

        <section className={styles.listSection}>
          {loading ? (
            <div className={styles.loading}>
              <div className={styles.spinner}></div>
              <p>Loading tasks...</p>
            </div>
          ) : error ? (
            <div className={styles.error}>
              <p role="alert">⚠️ {error}</p>
            </div>
          ) : (
            <>
              <div className={styles.statsBar}>
                <span className={styles.taskCount}>
                  {tasks.length} {tasks.length === 1 ? "task" : "tasks"}
                </span>
              </div>
              <TaskList tasks={tasks} onUpdate={handleUpdate} onDelete={handleDelete} />
            </>
          )}
        </section>
      </div>
    </main>
  );
}