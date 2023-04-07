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
      shouldUnregister={true}
      name={name}
      render={({ field }) => (
        <NumberInput
          min={min}
          max={max}
          step={step}
          value={field.value}
          onChange={(value) => field.onChange(+value)}
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
      )}
    />
  );
}
