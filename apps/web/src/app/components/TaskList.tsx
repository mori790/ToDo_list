"use client";

import { useState } from "react";
import type { Task } from "../lib/api";
import styles from "./TaskList.module.css";

export default function TaskList({
    tasks,
    onUpdate,
    onDelete,
}: {
    tasks: Task[];
    onUpdate: (id: string, content: string) => Promise<void>;
    onDelete: (id: string) => Promise<void>;
}) {
    const [editing, setEditing] = useState<string | null>(null);
    const [editValue, setEditValue] = useState("");
    const [loadingId, setLoadingId] = useState<string | null>(null);

    if (!tasks.length)
        return (
            <div className={styles.empty}>
                <p aria-label="empty">📝 No tasks yet. Start by adding one above!</p>
            </div>
        );

    return (
        <ul aria-label="tasks" className={styles.list}>
            {tasks.map((t) => (
                <li key={t.id} className={styles.taskItem}>
                    {editing === t.id ? (
                        <div className={styles.editMode}>
                            <input
                                className={styles.editInput}
                                value={editValue}
                                onChange={(e) => setEditValue(e.target.value)}
                                autoFocus
                            />
                            <div className={styles.editActions}>
                                <button
                                    className={`${styles.button} ${styles.saveButton}`}
                                    onClick={async () => {
                                        if (!editValue.trim()) return;
                                        setLoadingId(t.id);
                                        try {
                                            await onUpdate(t.id, editValue.trim());
                                            setEditing(null);
                                        } finally {
                                            setLoadingId(null);
                                        }
                                    }}
                                    disabled={loadingId === t.id}
                                >
                                    ✓ Save
                                </button>
                                <button
                                    className={`${styles.button} ${styles.cancelButton}`}
                                    onClick={() => setEditing(null)}
                                    disabled={loadingId === t.id}
                                >
                                    ✕ Cancel
                                </button>
                            </div>
                        </div>
                    ) : (
                        <>
                            <div className={styles.taskContent}>
                                <span className={styles.taskText}>{t.content}</span>
                                <span className={styles.taskDate}>
                                    {new Date(t.updatedAt).toLocaleString("ja-JP", {
                                        month: "short",
                                        day: "numeric",
                                        hour: "2-digit",
                                        minute: "2-digit",
                                    })}
                                </span>
                            </div>
                            <div className={styles.taskActions}>
                                <button
                                    className={`${styles.button} ${styles.editButton}`}
                                    onClick={() => {
                                        setEditing(t.id);
                                        setEditValue(t.content);
                                    }}
                                    disabled={loadingId === t.id}
                                >
                                    ✏️ Edit
                                </button>
                                <button
                                    className={`${styles.button} ${styles.deleteButton}`}
                                    onClick={async () => {
                                        setLoadingId(t.id);
                                        try {
                                            await onDelete(t.id);
                                        } finally {
                                            setLoadingId(null);
                                        }
                                    }}
                                    disabled={loadingId === t.id}
                                >
                                    🗑️ Delete
                                </button>
                            </div>
                        </>
                    )}
                </li>
            ))}
        </ul>
    );
}