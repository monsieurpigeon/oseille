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
}

export function MyNumberInput({ control, name, min, max, step, ...props }: MyNumberInputProps) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { ref, ...restField } }) => (
        <NumberInput
          {...restField}
          {...props}
          min={min ?? -9999.99}
          max={max ?? 9999.99}
          step={step}
        >
          <NumberInputField
            ref={ref}
            name={restField.name}
          />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
      )}
    />
  );
}
