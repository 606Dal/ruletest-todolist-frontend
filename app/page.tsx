import TodoList from "@/components/TodoList";

export default function Home() {
    return (
        <div className="flex flex-1 flex-col items-center bg-zinc-50 px-6 py-16 font-sans dark:bg-black">
            <main className="flex w-full max-w-3xl flex-1 flex-col items-center">
                <TodoList />
            </main>
        </div>
    );
}
