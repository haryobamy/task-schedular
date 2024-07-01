type SelectProps = {
  label: string;
  selectItems: { label: string; value: string }[];
  error?: string;
  placeholder?: string;
} & React.DetailedHTMLProps<
  React.SelectHTMLAttributes<HTMLSelectElement>,
  HTMLSelectElement
>;

export function SelectInput({
  label,
  id,
  selectItems,
  error,
  placeholder,
  ...props
}: SelectProps) {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-base font-semibold mb-2 uppercase  text-blue-500 "
      >
        {label}
      </label>

      <div
        className={`flex items-center appearance-none border border-solid  ${error ? 'border-red-500' : 'border-[#94A3B8]'}  rounded-xl w-full py-3 px-3 text-gray-700 leading-tight`}
      >
        <select
          aria-placeholder={placeholder}
          {...props}
          className={`w-full text-base px-2 bg-transparent text-[#0C1248] leading-tight focus:outline-none placeholder:text-sm placeholder:text-[#94A3B8] `}
        >
          <option value="">-- Select Time --</option>
          {selectItems.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
      {error && <span className="text-red-500 text-xs mt-2"> {error}</span>}
    </div>
  );
}
