import { ChangeEventHandler } from 'react';

export function NumberInput({
  value,
  onChange,
  ...props
}: {
  value: number;
  onChange: ChangeEventHandler<HTMLInputElement>;
}) {
  return (
    <input
      style={{ width: '100%', padding: '10px' }}
      type="number"
      {...props}
      value={value}
      onChange={onChange}
    />
  );
}

export function NumberLabelInput({
  value,
  onChange,
  label,
  ...props
}: {
  value: number;
  label: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  min?: number;
  max?: number;
}) {
  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <label style={{ width: '120px' }}>{label}</label>
      <NumberInput
        value={value}
        onChange={onChange}
        {...props}
      />
    </div>
  );
}
