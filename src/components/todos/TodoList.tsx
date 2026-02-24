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
      <div className="text-center py-12">
        <p className="text-gray-500 dark:text-gray-400 font-medium mb-2">
          할 일이 없습니다.
        </p>
        <p className="text-sm text-gray-400 dark:text-gray-500 leading-relaxed mb-4">
          새로운 작업을 추가하여 보람찬 하루를 시작해보세요!
          <br />
          작은 실천이 큰 변화를 만듭니다.
        </p>
        <a
          href="#"
          className="text-sm text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
        >
          사용 팁 알아보기
        </a>
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
