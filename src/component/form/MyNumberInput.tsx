import {
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
} from '@chakra-ui/react';
import { Controller } from 'react-hook-form';

export function MyNumberInput({ control, name, min, max, step }: any) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { ref, ...restField } }) => (
        <NumberInput
          min={min}
          max={max}
          step={step}
          {...restField}
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
