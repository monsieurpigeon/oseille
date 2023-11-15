import {
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
} from '@chakra-ui/react';
import { Controller } from 'react-hook-form';

export function MyNumberInput({ control, name, min, max, step, ...props }: any) {
  return (
    <Controller
      control={control}
      shouldUnregister={true}
      name={name}
      render={({ field }) => (
        <NumberInput
          min={min ?? -9999.99}
          max={max ?? 9999.99}
          step={step}
          value={field.value}
          onChange={(text, value) => {
            if (text.slice(-1) === '.') {
              field.onChange(text);
            } else {
              field.onChange(value);
            }
          }}
          {...props}
        >
          <NumberInputField
            ref={field.ref}
            name={field.name}
            pattern="(-)?[0-9]*(.[0-9]+)?"
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
