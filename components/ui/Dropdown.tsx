import { SelectHTMLAttributes } from 'react';

interface DropdownProps extends SelectHTMLAttributes<HTMLSelectElement> {
  hiddenOption?: string;
  options: string[];
}

export default function Dropdown({
  hiddenOption,
  options,
  className,
  ...props
}: DropdownProps) {
  return (
    <select
      className={`px-3 py-1 rounded border border-gray_white focus:outline-none ${className}`}
      {...props}
    >
      {hiddenOption && <option hidden>{hiddenOption}</option>}
      {options.map((option, index) => (
        <option key={index}>{option}</option>
      ))}
    </select>
  );
}
