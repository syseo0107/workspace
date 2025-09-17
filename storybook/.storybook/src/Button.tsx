import React from 'react';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  label: string;
};

export default function Button({ label, ...props }: ButtonProps) {
  return <button {...props}>{label}</button>;
}
