import { ChangeEvent } from 'react';

export function NumberInput({
                              placeholder,
                              value,
                              onChange,
                          }: {
    placeholder: string;
    value: number;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}) {
    return (
        <input
            type="number"
            placeholder={placeholder}
            value={value}
            onChange={onChange}
        />
    );
}
