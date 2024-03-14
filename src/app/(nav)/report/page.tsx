import { Todo } from '@/types/todo';
import React from 'react';

const report = async () => {
  const response = await fetch(`http://localhost:4000/todos`, {
    next: {
      revalidate: 10,
    },
  });

  const data = await response.json();
  const workingTodo = data.filter((item: Todo) => item.isDone === false).length;
  const doneTodo = data.filter((item: Todo) => item.isDone === true).length;

  return (
    <div>
      <p>
        현재까지 <span>{data.length}</span>개의 투두리스트가 등록되었습니다.
      </p>
      <p>
        현재까지 <span>{workingTodo}</span>개의 할일 리스트,
        <span>{doneTodo}</span>개의 완료 리스트가 존재합니다.
      </p>
    </div>
  );
};

export default report;
