import React from 'react';
import clsx from 'clsx';

interface IInput {
  label: string;
  placeholder: string;
  name: string;
  value: string;
  setState: Function;
  type?: string;
  className?: string;
}

export const Input = ({
  label,
  placeholder,
  name,
  value,
  setState,
  type = 'text',
  className,
}: IInput) => {
  return (
    <div className={clsx('flex flex-col ', className)}>
      <label>{label}</label>
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        className="bg-gray-200 rounded-md px-3 py-2"
        onChange={(ev) => {
          setState((prev: any) => ({ ...prev, [name]: ev.target.value }));
        }}
      />
    </div>
  );
};
