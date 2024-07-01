import { InputHTMLAttributes } from 'react';

type RadioProps = {
  label: string;
  containerClass?: string;
} & InputHTMLAttributes<HTMLInputElement>;

export function RadioInput({ label, containerClass, ...props }: RadioProps) {
  return (
    <label className="text-base flex items-center ">
      <input
        {...props}
        type="radio"
        value="recurring"
        className={`mr-2 w-6 h-6 ${containerClass}`}
      />
      {label}
    </label>
  );
}
