'use client';
import { ChangeEvent, useState } from 'react';
import { IInputForm } from '@/hooks/interface';

const InputForm = (initialState: IInputForm) => {
  const [formState, setFormState] = useState<IInputForm>(initialState);
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
