// src>app>todos>page.tsx
'use client';

import { Todo } from '@/types/todo';
import { useQuery } from '@tanstack/react-query';
import React from 'react';

const TodosPage = () => {
  const {
    data: todos,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['todos'],
    queryFn: async () => {
      const response = await fetch(`http://localhost:4000/todos`);
      const todos = await response.json();
      return todos;
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error</div>;
  }

  return (
    <div>
      <h1>투두리스트입니다.</h1>
      <p>Here you can see all your todos</p>

      {todos.map((todo: Todo) => {
        return (
          <div
            key={todo.id}
            className="bg-blue-100 border border-blue-400 text-blue-700 p-8 m-2 rounded"
          >
            <h2>{todo.title}</h2>
            <p>{todo.content}</p>
            {todo.isDone ? <p>Done</p> : <p>Not done</p>}
          </div>
        );
      })}
    </div>
  );
};

export default TodosPage;
