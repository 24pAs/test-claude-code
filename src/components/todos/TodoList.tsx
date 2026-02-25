import { Todo } from "@/types/todo";
import { TodoItem } from "./TodoItem";

interface TodoListProps {
  todos: Todo[];
  onToggle: (id: string) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
}

export function TodoList({ todos, onToggle, onDelete }: TodoListProps) {
  if (todos.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
        {/* 일러스트레이션 */}
        <div className="relative w-48 h-48 mb-8 group">
          <div
            className="absolute inset-0 rounded-full blur-3xl animate-pulse"
            style={{ backgroundColor: "rgba(79, 70, 229, 0.05)" }}
          />
          <div className="relative flex flex-col items-center justify-center h-full">
            {/* 문서 카드 */}
            <div className="w-24 h-32 bg-white dark:bg-slate-800 rounded-lg shadow-xl border border-slate-100 dark:border-slate-700 transform -rotate-6 transition-transform group-hover:rotate-0 duration-500 overflow-hidden">
              <div className="h-4 bg-slate-50 dark:bg-slate-700 border-b border-slate-100 dark:border-slate-600" />
              <div className="p-3 space-y-2">
                <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-700 rounded" />
                <div className="h-1.5 w-4/5 bg-slate-100 dark:bg-slate-700 rounded" />
                <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-700 rounded" />
              </div>
            </div>
            {/* 체크 뱃지 */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 translate-x-8 -translate-y-4">
              <div
                className="w-16 h-16 rounded-2xl shadow-2xl flex items-center justify-center transform rotate-12 group-hover:scale-110 transition-transform duration-500 border-4 border-white dark:border-slate-900"
                style={{ backgroundColor: "#4F46E5" }}
              >
                <span
                  className="material-symbols-rounded text-white"
                  style={{ fontSize: 30, fontVariationSettings: "'FILL' 1, 'wght' 700, 'GRAD' 0, 'opsz' 24" }}
                >
                  check
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 텍스트 */}
        <div className="space-y-4 max-w-sm">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">
            할 일이 없습니다.
          </h3>
          <p className="text-slate-500 dark:text-slate-400 leading-relaxed">
            새로운 작업을 추가하여 보람찬 하루를 시작해보세요!
            <br />
            작은 실천이 큰 변화를 만듭니다.
          </p>
          <button
            className="mt-4 font-semibold flex items-center gap-1 mx-auto hover:underline group"
            style={{ color: "#4F46E5" }}
          >
            사용 팁 알아보기
            <span
              className="material-symbols-rounded group-hover:translate-x-1 transition-transform"
              style={{ fontSize: 16 }}
            >
              arrow_forward
            </span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <ul className="flex flex-col gap-2">
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} onToggle={onToggle} onDelete={onDelete} />
      ))}
    </ul>
  );
}
