import { ChangeEventHandler } from 'react';

export function TextInput({
  value,
  onChange,
  ...props
}: {
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
}) {
  return (
    <input
      style={{ width: '100%', padding: '10px' }}
      {...props}
      value={value}
      onChange={onChange}
      maxLength={50}
    />
  );
}

export function TextLabelInput({
  value,
  onChange,
  label,
  ...props
}: {
  value: string;
  label: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
}) {
  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <label style={{ width: '120px' }}>{label}</label>
      <TextInput
        {...props}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}
