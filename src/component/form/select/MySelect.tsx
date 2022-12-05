import { Select } from '@chakra-ui/react';
import { ChangeEventHandler } from 'react';

interface Options {
  label: string;
  value: string;
}

type MySelectProps = {
  options: Options[];
  placeholder: string;
  value: string;
  onChange: ChangeEventHandler<HTMLSelectElement>;
};
export function MySelect({ options, placeholder, value, onChange }: MySelectProps) {
  return (
    <Select
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    >
      {options.map(({ label, value }) => (
        <option
          value={value}
          key={value}
        >
          {label}
        </option>
      ))}
    </Select>
  );
}
