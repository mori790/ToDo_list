"use client";

import { useEffect, useState } from "react";
import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";
import { listTasks, createTask, type Task } from "./lib/api";

export default function Page() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        setTasks(await listTasks());
      } catch {
        setError("failed to fetch");
      } finally {
        setLoading(false);
      }
    })();
  },[]);

  return (
    <main style={{ maxWidth: 640, margin: "2rem auto", padding: "0 1rem" }}>
      <h1>Memo</h1>

      <TaskForm
        create={createTask}
        onCreated={(t) => setTasks((prev) => [t, ...prev])}
      />

      {loading ? <p>Loading...</p> : error ? <p role="alert">{error}</p> : <TaskList tasks={tasks} />}
    </main>
  );
}