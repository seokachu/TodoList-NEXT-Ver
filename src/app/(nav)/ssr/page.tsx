import React from 'react';
import { Todo } from '@/types/todo';

const ssr = async () => {
  const response = await fetch(`http://localhost:4000/todos`, {
    cache: 'no-cache',
  });
  const todos = await response.json();

  return (
    <>
      {todos.map((item: Todo) => (
        <div key={item.id}>
          <h1>{item.title}</h1>
          <p>{item.contents}</p>
        </div>
      ))}
    </>
  );
};

export default ssr;
