import { forwardRef, Ref, useEffect, useImperativeHandle, useRef } from 'react';
import {
  useInputActionContext,
  useInputContext,
} from '@/components/@common/Input/context/hooks';

import type {
  IFieldProps,
  IFieldAttribute,
  IField,
} from '@/components/@common/Input/Field/type';

// 명명된 컴포넌트 정의
const FieldComponent = (
  { as = 'text', etcStyles = {}, ...attribute }: IFieldProps,
  ref: Ref<IFieldAttribute>,
) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const { name, value } = useInputContext();
  const { handleBlur, handleChange, handleFocus, validate } =
    useInputActionContext();

  useImperativeHandle(
    ref,
    (): IFieldAttribute => ({
      focus: () => {
        inputRef.current?.focus();
      },
      checkValidity: () => {
        if (validate) {
          return validate(inputRef.current?.value ?? '');
        }
        return true;
      },
      scrollIntoView: () => {
        inputRef.current?.scrollIntoView();
      },
      get value() {
        return inputRef.current?.value as string;
      },
      set value(newValue: string) {
        if (inputRef.current) {
          inputRef.current.value = newValue;
        }
      },
    }),
    [validate],
  );

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.value = value;
    }
  }, [value]);

  return (
    <input
      id={name}
      value={value}
      type={as || 'text'}
      ref={inputRef}
      onBlur={handleBlur}
      onFocus={handleFocus}
      onChange={handleChange}
      css={{
        display: 'block',
        ...etcStyles,
      }}
      {...attribute}
    />
  );
};

const Field: IField = forwardRef(FieldComponent);

export default Field;
