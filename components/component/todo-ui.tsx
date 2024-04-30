"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Edit2, TrashIcon } from "lucide-react";
import { useState } from "react";


export interface TodoUIProps {
  id: number;
  title: string;
  description: string;
}



export function TodoUI({ props }: { props: TodoUIProps[] }) {
  const [todo_title, setTodo_title] = useState("")
  const [todo_description, setTodo_description] = useState("")
  const postData={title:todo_title,description:todo_description}
  
  const createTodo = async () => {
    const res = await fetch("http://127.0.0.1:8000/api/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(postData)
    })
    if (res.ok) {
      console.log('Task Created successfully!');
      alert('Task Created successfully');
      window.location.reload();
    } else {
      console.error('Failed to edit task:', res.status, res.statusText);
    }
  }

  const handleEditTask = async (taskId: number, newTitle: string | null, newdescription: string | null ) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/todos/${taskId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title: newTitle, description: newdescription }),
      });

      if (response.ok) {
        console.log('Task edited successfully!');
        alert('Task edited successfully');
        window.location.reload();
      } else {
        console.error('Failed to edit task:', response.status, response.statusText);
      }
    } catch (error) {
      console.error('Error editing task:', error);
    }
  };

  const handleDeleteTodo = async (todoId:number) => {
    try {
        const response = await fetch(`http://localhost:8000/api/todos/${todoId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
        });
        if (response.ok) {
            alert('Task deleted successfully');
            console.log('Task deleted successfully');
            // Refresh todo list or update state after successful deletion
            window.location.reload();
        } else {
            console.error('Failed to delete todo');
        }
    } catch (error) {
        console.error('Error deleting todo:', error);
    }
  };
  return (
    <div className="flex flex-col h-screen bg-white dark:bg-gray-950">
      <header className="bg-gray-100 dark:bg-gray-800 py-4 px-6 shadow">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-50">
          Todo App
        </h1>
      </header>
      <main className="flex-1 overflow-auto p-6">
        <div className="grid gap-4">
          
            {props.map((todo) => {
              return (
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
                <div  className="flex items-center gap-4">
                  <h1>{todo.id}</h1>
                  <div className="flex-1">
                    <h3 className="text-gray-900 dark:text-gray-50 font-medium">
                      {todo.title}
                    </h3>
                    <p className="text-gray-500 dark:text-gray-400 text-sm ">
                      {todo.description}
                    </p>
                  </div>
                  <Button
                    className=""
                    size="icon"
                    variant="outline"
                    onClick={() => handleDeleteTodo(todo.id)}
                  >
                    <TrashIcon className="h-6 w-6  hover:text-blue-700 " />
                  </Button>
                  <Button
                    className=""
                    size="icon"
                    variant="outline"
                    onClick={() => handleEditTask(todo.id, prompt("Enter new title", todo.title), prompt("Enter new description", todo.description))}
                  >
                    <Edit2 className="h-5 w-5 hover:text-red-700 " />
                  </Button>
                </div>  
              </div>
              );
            })}
          
        </div>
      </main>
      <footer className="bg-gray-100 dark:bg-gray-800 py-4 px-6 shadow">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-4">
            <Input
              className="flex-1 bg-white dark:bg-gray-950 border-none shadow-none"
              placeholder="Title"
              type="text"
              onChange={(e) => setTodo_title(e.target.value)}
              value={todo_title}
            />
            <Input
              className="flex-1 bg-white dark:bg-gray-950 border-none shadow-none"
              placeholder="Description"
              type="text"
              onChange={(e) => setTodo_description(e.target.value)}
              value={todo_description}
            />
          </div>
          <Button className="w-full" variant="default" onClick={() => createTodo()}>Add</Button>
        </div>
        </footer>
    </div>
  );
}
