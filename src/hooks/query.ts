import { Todo } from '../types/todo';

//가져오기
export async function getTodo(): Promise<Todo[]> {
  const response = await fetch(`http://localhost:4000/todos`);
  const { todos } = await response.json();
  return todos;
}

//todo 생성
export async function createTodo(newTodo: Todo) {
  const response = await fetch(`http://localhost:4000/todos`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newTodo),
  });
}

//todo 삭제
export async function deleteTodo(id: string) {
  const response = await fetch(`http://localhost:4000/todos`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(id),
  });
}

//todo 수정
export const patchTodo = async (editTodo: Todo) => {
  const response = await fetch('http://localhost:4000/todos', {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(editTodo),
  });
};
