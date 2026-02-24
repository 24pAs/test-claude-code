import { Metadata } from "next";
import { TodoPage } from "@/components/todos/TodoPage";

export const metadata: Metadata = {
  title: "Todo List",
  description: "할 일 목록 관리",
};

export default function Page() {
  return <TodoPage />;
}
