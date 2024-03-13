'use client';

import InputForm from '@/hooks/inputForm';
import { Todo } from '@/types/todo';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import React, { FormEvent } from 'react';

const TodoCsrPage = () => {
  const queryClient = useQueryClient();
  const route = useRouter();

  const { formState, onChangeHandler, resetForm } = InputForm({
    id: '',
    title: '',
    contents: '',
    isDone: false,
    createdAt: new Date(),
  });

  const { title, contents } = formState;

  //react-query 데이터 불러오기
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

  //추가하기
  const addTodoMutation = useMutation({
    mutationFn: async (newTodo: Todo) => {
      const response = await fetch(`http://localhost:4000/todos`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTodo),
      });
      const todo = await response.json();
      return todo;
    },
  });

  //삭제하기
  const deleteTodoMutation = useMutation({
    mutationFn: async (id: string) => {
      await fetch(`http://localhost:4000/todos?id=${id}`, {
        method: 'DELETE',
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [`http://localhost:4000/todos`],
      });
    },
  });

  //수정하기
  const patchTodoMutation = useMutation({
    mutationFn: async ({ id, isDone }: Todo) => {
      const response = await fetch(`http://localhost:4000/todos?id=${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ isDone: !isDone }),
      });

      const todo = await response.json();
      return todo;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [`http://localhost:4000/todos`],
      });
    },
  });

  if (isLoading) {
    return <div>로딩중입니다!</div>;
  }

  if (isError) {
    return <div>에러입니다!</div>;
  }

  //벨리데이션
  const validation = () => {
    if (!title.trim()) {
      alert('제목을 입력해 주세요.');
      return;
    }
    if (!contents.trim()) {
      alert('내용을 입력해 주세요.');
      return;
    }
    return false;
  };

  //게시글 작성 form
  const onSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validation()) {
      addTodoMutation.mutate(
        {
          id: crypto.randomUUID(),
          title,
          contents,
          createdAt: new Date(),
          isDone: false,
        },
        {
          onSuccess: () => {
            resetForm();
            queryClient.invalidateQueries({
              queryKey: ['todos'],
            });
          },
        }
      );
    }
  };

  const goToStatisticsButton = () => {
    route.push('/report');
  };
  return (
    <>
      <section>
        <h2>Todo 추가하기</h2>
        <form onSubmit={onSubmitHandler}>
          <p>
            <label htmlFor="title">할일</label>
            <input
              type="text"
              name="title"
              id="title"
              value={title}
              onChange={onChangeHandler}
              placeholder="제목을 입력해 주세요."
              autoFocus
            />
          </p>
          <p>
            <label htmlFor="contents">내용</label>
            <input
              type="text"
              name="contents"
              id="contents"
              value={contents}
              onChange={onChangeHandler}
              placeholder="내용을 입력해 주세요."
            />
          </p>
          <button>추가하기</button>
        </form>
        <button onClick={goToStatisticsButton}>할일정보통계보러가기</button>
      </section>

      <section>
        <h1>
          <b>True</b>
        </h1>
        {todos
          .filter((todo: Todo) => !todo.isDone)
          .map((data: Todo) => (
            <div key={data.id}>
              <p>{data.title}</p>
              <p>{data.contents}</p>
              <button
                onClick={() => {
                  deleteTodoMutation.mutate(data.id);
                }}
              >
                삭제
              </button>
              <button
                onClick={() => {
                  patchTodoMutation.mutate({
                    id: data.id,
                    isDone: true,
                    title,
                    contents,
                    createdAt: new Date(),
                  });
                }}
              >
                수정
              </button>
            </div>
          ))}
      </section>

      <section>
        <h1>
          <b>False</b>
        </h1>
        {todos
          .filter((todo: Todo) => todo.isDone)
          .map((data: Todo) => (
            <div key={data.id}>
              <p>{data.title}</p>
              <p>{data.contents}</p>
              <button
                onClick={() => {
                  deleteTodoMutation.mutate(data.id);
                }}
              >
                delete
              </button>
              <button
                onClick={() => {
                  patchTodoMutation.mutate({
                    id: data.id,
                    isDone: false,
                    title,
                    contents,
                    createdAt: new Date(),
                  });
                }}
              >
                변화
              </button>
            </div>
          ))}
      </section>
    </>
  );
};

export default TodoCsrPage;
