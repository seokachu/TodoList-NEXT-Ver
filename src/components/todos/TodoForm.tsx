'use client';
import InputForm from '@/hooks/inputForm';
import { randomCardColor } from '@/util/color';
import React, { FormEvent } from 'react';

const TodoForm = () => {
  const { formState, onChangeHandler, resetForm } = InputForm({
    id: '',
    title: '',
    content: '',
    createAt: new Date(),
    isdone: false,
    color: '',
  });

  const onSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const date = new Date();
    if (validation()) {
      const newTodos = {
        id: crypto.randomUUID(),
        title,
        content,
        createAt: date,
        isdone: false,
        color: randomCardColor(),
      };
      alert('입력되었습니다');
    }
  };

  //validation
  const validation = () => {
    if (!title.trim()) {
      alert('제목을 입력해 주세요');
      return;
    }
    if (!content.trim()) {
      alert('내용을 입력해 주세요');
      return;
    }
    return true;
  };

  const { title, content } = formState;
  return (
    <form onSubmit={onSubmitHandler}>
      <p>
        <label htmlFor="title">제목</label>
        <input
          type="text"
          id="title"
          name="title"
          value={title}
          onChange={onChangeHandler}
          autoFocus
        />
      </p>
      <p>
        <label htmlFor="content">내용</label>
        <input
          type="text"
          id="content"
          name="content"
          value={content}
          onChange={onChangeHandler}
        />
      </p>
      <button>등록하기</button>
    </form>
  );
};

export default TodoForm;
