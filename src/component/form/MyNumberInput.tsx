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
            onChange={field.onChange}
            value={field.value}
            precision={isInt ? 0 : 2}
            {...props}
          >
            <NumberInputField
              pattern={!min || min < 0 ? '(-)?[0-9]*(.[0-9]+)?' : '[0-9]*(.[0-9]+)?'} // Allow negative and decimal numbers
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
