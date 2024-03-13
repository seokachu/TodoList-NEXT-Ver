'use client';

import { Todo } from '@/types/todo';
import { ChangeEvent, useState } from 'react';

const InputForm = (initialState: Todo) => {
  const [formState, setFormState] = useState<Todo>(initialState);
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    setFormState(initialState);
  };

  return { formState, onChangeHandler, resetForm };
};

export default InputForm;
