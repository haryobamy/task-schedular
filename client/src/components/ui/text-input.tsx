import { InputHTMLAttributes } from 'react';

type InputProps = {
  label?: string;
  containerClass?: string;
  error?: string;
} & InputHTMLAttributes<HTMLInputElement>;

export function TextInput({
  value,
  onChange,
  label,
  name,
  type,
  error,
  containerClass,
  ...props
}: InputProps) {
  return (
    <div className={`mb-16 ${containerClass}`}>
      <label
        htmlFor={name}
        className="block text-base font-semibold mb-2 uppercase  text-blue-500 "
      >
        {label}
      </label>
      <div
        className={`flex items-center appearance-none border border-solid  ${error ? 'border-red-500' : 'border-[#94A3B8]'}  rounded-xl w-full py-3 px-3 text-gray-700 leading-tight`}
      >
        <input
          {...props}
          type={type}
          value={value}
          name={name}
          id={name}
          onChange={onChange}
          className={`w-full text-base px-2 bg-transparent text-[#0C1248] leading-tight focus:outline-none placeholder:text-sm placeholder:text-[#94A3B8] `}
        />
      </div>
      <span>
        {error && <p className="text-red-500 text-xs mt-2">{error}</p>}
      </span>
    </div>
  );
}
