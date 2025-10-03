import type { Task } from "../lib/api";

export default function TaskList({ tasks }: { tasks: Task[] }) {
    if(!tasks.length) return <p aria-label="empty">No tasks yet</p>;
    return (
        <ul aria-label="tasks">
            {tasks.map((t) => (
                <li key={t.id}>{t.content}</li>
            ))}
        </ul>
    );
}