
import { TodoUI, TodoUIProps } from "@/components/component/todo-ui";

export async function GetTodos() {
  const res = await fetch(`http://127.0.0.1:8000/api/todos?skip=0&limit=100`, {
    method: 'GET',
    credentials: 'include',
});
  const data = await res.json();
  return data;
}

export default async function Home() {
   const GetTodo = async () => {
    try {
      const res = await fetch(`http://127.0.0.1:8000/api/todos`, {
        method: 'GET',
        credentials: 'include',
        cache: 'no-store'
      });
      if (!res.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await res.json();
      return data;
    } catch (error) {
      console.error('Error fetching data:', error);
      return null; // Return null or handle the error appropriately
    }
  };
  const datatodos: TodoUIProps[] = await GetTodo();
  return <TodoUI props={datatodos} />;
}
