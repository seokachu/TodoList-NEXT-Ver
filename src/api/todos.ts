import axios from 'axios';
import { IInputForm } from '../hooks/interface';

// const SERVER_URL = import.meta.env.NEXT_APP_SERVER_URL;

const SERVER_URL = 'http://localhost:4000';
export const todoClient = axios.create({
  baseURL: SERVER_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 목록 가져오기
export const getTodos = async () => {
  const { data } = await todoClient.get('/todos');
  return data;
};

//추가하기
export const createTodos = async (item: Partial<IInputForm>) => {
  const { data } = await todoClient.post('/todos', item);
  return data;
};

//삭제하기
export const deleteTodos = async (id: string) => {
  await todoClient.delete(`/todos/${id}`);
  return id;
};

//수정하기
export const updateTodos = async (
  id: string,
  todos: Partial<IInputForm>
): Promise<string> => {
  await todoClient.patch(`/todos/${id}`, todos);
  return id;
};
