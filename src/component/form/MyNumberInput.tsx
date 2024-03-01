import {
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputProps,
  NumberInputStepper,
} from '@chakra-ui/react';
import { Control, Controller, FieldValues } from 'react-hook-form';

interface MyNumberInputProps extends NumberInputProps {
  control: Control<FieldValues>;
  name: string;
  min?: number;
  max?: number;
  step?: number;
  isInt?: boolean;
}

export function MyNumberInput({ control, name, min, max, step, isInt, ...props }: MyNumberInputProps) {
  return (
    <Controller
      control={control}
      shouldUnregister={true}
      name={name}
      render={({ field }) => {
        return (
          <NumberInput
            min={min ?? -9999.99}
            max={max ?? 9999.99}
            step={step}
            onBlur={(e) => {
              field.onChange(Number(e.target.value));
            }}
            onChange={isInt ? (value) => field.onChange(parseInt(value)) : field.onChange}
            value={field.value}
            {...props}
          >
            <NumberInputField
              ref={field.ref}
              name={field.name}
            />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        );
      }}
    />
  );
}
