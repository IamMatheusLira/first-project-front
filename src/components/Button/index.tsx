import { Spinner } from '@chakra-ui/spinner';
import clsx from 'clsx';
import React, { MouseEventHandler } from 'react';

interface IButton {
  label: string;
  load: boolean;
  type?: 'button' | 'submit' | 'reset' | undefined;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  className?: string;
}

export const Button = ({
  label,
  load,
  type = 'button',
  onClick,
  className,
}: IButton) => {
  return (
    <div className={clsx('flex justify-center ', className)}>
      <button
        className="bg-blue-500 hover:bg-blue-400 py-2 px-10 rounded-lg text-white"
        type={type}
        onClick={onClick}
      >
        {load ? <Spinner size="sm" color="white" /> : label}
      </button>
    </div>
  );
};
