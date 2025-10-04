"use client";

import { useState } from "react";
import type { Task } from "../lib/api";
import styles from "./TaskForm.module.css";

export default function TaskForm({
    onCreated,
    create,
}: {
    onCreated: (t: Task) => void;
    create: (content: string) => Promise<Task>;
}) {
    const [value, setValue] = useState("");
    const [err, setErr] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    return (
        <form
            className={styles.form}
            onSubmit={async (e) => {
                e.preventDefault();
                setErr(null);
                if (!value.trim()) return;
                setLoading(true);
                try {
                    const t = await create(value.trim());
                    onCreated(t);
                    setValue("");
                } catch {
                    setErr("Failed to create task");
                } finally {
                    setLoading(false);
                }
            }}
        >
            <div className={styles.inputWrapper}>
                <input
                    className={styles.input}
                    placeholder="✍️ Write a new memo..."
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    disabled={loading}
                />
                <button
                    className={styles.submitButton}
                    type="submit"
                    disabled={loading || !value.trim()}
                >
                    {loading ? "Adding..." : "Add Task"}
                </button>
            </div>
            {err && <p className={styles.error} role="alert">{err}</p>}
        </form>
    );
}
