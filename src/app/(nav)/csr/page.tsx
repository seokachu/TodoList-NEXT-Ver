'use client';

import InputForm from '@/hooks/inputForm';
import { createTodo, deleteTodo, getTodo, patchTodo } from '@/hooks/query';
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

  //불러오기
  const {
    data: todos,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['todos'],
    queryFn: getTodo,
  });

  //생성하기
  const { mutate: createMutate } = useMutation({
    mutationFn: (newTodo: Todo) => createTodo(newTodo),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });

  //삭제하기
  const { mutate: deleteMutate } = useMutation({
    mutationFn: (id: string) => deleteTodo(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });

  //수정하기
  const { mutate: editMutate } = useMutation({
    mutationFn: (editTodo: Todo) => patchTodo(editTodo),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });

  if (isLoading) {
    return <div>로딩중입니다!</div>;
  }

  if (isError) {
    return <div>에러입니다!</div>;
  }

  if (!todos) {
    return <div>데이터가 없습니다.</div>;
  }

  //게시글 작성 form
  const onSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validation()) {
      const newTodo = {
        title,
        contents,
        createdAt: new Date(),
        id: crypto.randomUUID(),
        isDone: false,
      };
      createMutate(newTodo);
    }
  };
};

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
  return true;
};

//통계버튼 이동
const goToStatisticsButton = () => {
  route.push('/report');
};

//삭제버튼

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
        <b>해야할 일</b>
      </h1>
      {todos
        .filter((todo: Todo) => !todo.isDone)
        .map((data: Todo) => (
          <div key={data.id}>
            <p>{data.title}</p>
            <p>{data.contents}</p>
            <button>삭제</button>
            <button>완료</button>
          </div>
        ))}
    </section>

    <section>
      <h1>
        <b>완료한 일</b>
      </h1>
      <ul>
        {todos
          .filter((todo: Todo) => todo.isDone)
          .map((data: Todo) => (
            <li key={data.id}>
              <p>{data.title}</p>
              <p>{data.contents}</p>

              <button>삭제</button>
              <button>취소</button>
            </li>
          ))}
      </ul>
    </section>
  </>
);

export default TodoCsrPage;
