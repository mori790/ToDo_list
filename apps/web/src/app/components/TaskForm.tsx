"use client";

import { useState } from "react";
import type { Task } from "../lib/api";

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
                    setErr("failed to create");
                } finally {
                    setLoading(false);
                }
            }}
        >
            <input 
                placeholder="Write a memo"
                value={value}
                onChange={(e) => setValue(e.target.value)}
            />
            <button type="submit" disabled={loading}>
                {loading ? "Adding..." : "Add"}
            </button>
            {err && <p role="alert">{err}</p>}
        </form>
    );
}
