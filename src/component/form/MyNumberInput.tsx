import {
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputProps,
  NumberInputStepper,
} from '@chakra-ui/react';
import { FieldValues, UseFormRegister } from 'react-hook-form';

interface MyNumberInputProps extends NumberInputProps {
  name: string;
  min?: number;
  max?: number;
  step?: number;
  register: UseFormRegister<FieldValues>;
}

export function MyNumberInput({ name, min, max, step, register, ...props }: MyNumberInputProps) {
  return (
    <NumberInput
      {...props}
      min={min ?? -9999.99}
      max={max ?? 9999.99}
      step={step}
    >
      <NumberInputField
        {...register(name, {
          valueAsNumber: true,
          required: 'This field is required',
        })}
      />
      <NumberInputStepper>
        <NumberIncrementStepper />
        <NumberDecrementStepper />
      </NumberInputStepper>
    </NumberInput>
  );
}
