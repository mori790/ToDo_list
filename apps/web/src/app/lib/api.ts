export type Task = {
    id: string;
    content: string;
    createdAt: string;
    updatedAt: string;
};

const BASE = process.env.NEXTPUBLIC_API_BASE ?? "http://localhost:8000";

export async function listTasks(): Promise<Task[]> {
    const r = await fetch(`${BASE}/tasks`, { cache: "no-store" });
    if (!r.ok) throw new Error("failed to fetch");
    return r.json();
}

export async function createTask(content: string): Promise<Task> {
    const r = await fetch(`${BASE}/tasks`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({ content }),
    });
    if (!r.ok) throw new Error("failed to create");
    return r.json();
}