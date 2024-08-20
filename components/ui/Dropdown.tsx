import { HTMLAttributes } from 'react';

interface DropdownProps<T> extends HTMLAttributes<HTMLSelectElement> {
  hiddenOption?: string;
  options: T[];
  getOptionLabel: (option: T) => string;
}

export default function Dropdown<T>({
  hiddenOption,
  options,
  className = '',
  getOptionLabel,
  ...props
}: DropdownProps<T>) {
  return (
    <select
      className={`px-3 py-1 rounded border border-gray_white focus:outline-none ${className}`}
      {...props}
    >
      {hiddenOption && <option hidden>{hiddenOption}</option>}
      {options.map((option, index) => (
        <option key={index}>{getOptionLabel(option)}</option>
      ))}
    </select>
  );
}
