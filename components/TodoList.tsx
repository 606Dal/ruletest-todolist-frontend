"use client";

import { FormEvent, useState } from "react";

type Todo = {
    id: number;
    text: string;
    completed: boolean;
};

export default function TodoList() {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [input, setInput] = useState("");

    const createTodo = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const text = input.trim();
        if (!text) {
            return;
        }

        setTodos((prev) => [
            ...prev,
            {
                id: Date.now(),
                text,
                completed: false,
            },
        ]);
        setInput("");
    };

    const toggleTodo = (id: number) => {
        setTodos((prev) =>
            prev.map((todo) =>
                todo.id === id
                    ? { ...todo, completed: !todo.completed }
                    : todo,
            ),
        );
    };

    const deleteTodo = (id: number) => {
        setTodos((prev) => prev.filter((todo) => todo.id !== id));
    };

    return (
        <section className="flex w-full max-w-lg flex-col gap-8">
            <header className="flex flex-col gap-2">
                <h1 className="text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
                    Todo List
                </h1>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                    할 일을 등록하고 완료 상태를 관리하세요.
                </p>
            </header>

            <form
                onSubmit={createTodo}
                className="flex flex-col gap-3 sm:flex-row"
            >
                <label htmlFor="todo-input" className="sr-only">
                    할 일 입력
                </label>
                <input
                    id="todo-input"
                    type="text"
                    value={input}
                    onChange={(event) => setInput(event.target.value)}
                    placeholder="할 일을 입력하세요"
                    className="min-w-0 flex-1 rounded-lg border border-zinc-300 bg-white px-4 py-3 text-zinc-900 outline-none ring-zinc-400 placeholder:text-zinc-400 focus:ring-2 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-50 dark:placeholder:text-zinc-500"
                />
                <button
                    type="submit"
                    className="rounded-lg bg-zinc-900 px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-zinc-700 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-300"
                >
                    추가
                </button>
            </form>

            {todos.length === 0 ? (
                <p className="text-sm text-zinc-500 dark:text-zinc-400">
                    등록된 할 일이 없습니다.
                </p>
            ) : (
                <ul className="flex flex-col gap-2" aria-label="할 일 목록">
                    {todos.map((todo) => (
                        <li
                            key={todo.id}
                            className={`flex items-center gap-3 rounded-lg border px-4 py-3 ${
                                todo.completed
                                    ? "border-zinc-200 bg-zinc-100/80 dark:border-zinc-800 dark:bg-zinc-900/60"
                                    : "border-zinc-300 bg-white dark:border-zinc-700 dark:bg-zinc-950"
                            }`}
                        >
                            <input
                                id={`todo-${todo.id}`}
                                type="checkbox"
                                checked={todo.completed}
                                onChange={() => toggleTodo(todo.id)}
                                className="size-4 shrink-0 accent-zinc-900 dark:accent-zinc-100"
                            />
                            <label
                                htmlFor={`todo-${todo.id}`}
                                className={`min-w-0 flex-1 break-words text-sm ${
                                    todo.completed
                                        ? "text-zinc-400 line-through dark:text-zinc-500"
                                        : "text-zinc-900 dark:text-zinc-50"
                                }`}
                            >
                                {todo.text}
                            </label>
                            <button
                                type="button"
                                onClick={() => deleteTodo(todo.id)}
                                className="shrink-0 text-sm text-zinc-500 transition-colors hover:text-red-600 dark:text-zinc-400 dark:hover:text-red-400"
                            >
                                삭제
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </section>
    );
}
