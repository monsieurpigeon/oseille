import { Select } from '@chakra-ui/react';
import { ChangeEventHandler } from 'react';

interface Options {
  label: string;
  value: string;
}

type MySelectProps = {
  options: Options[];
  placeholder: string;
  value?: string;
  onChange: ChangeEventHandler<HTMLSelectElement>;
};
export function MySelect({ options, placeholder, value, onChange, ...rest }: MySelectProps) {
  return (
    <Select
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      {...rest}
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
