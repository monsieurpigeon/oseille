import { Box, Checkbox, Input, Text, Textarea } from '@chakra-ui/react';
import { Control, UseFormRegister } from 'react-hook-form';
import styled from 'styled-components';
import { InvoiceInfoInput } from '../../../backend';

interface InvoiceFieldsProps {
  control: Control<InvoiceInfoInput, any>;
  register: UseFormRegister<InvoiceInfoInput>;
}

const StyledCheckbox = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  .checkbox {
    border: 2px solid grey;
    border-radius: 5px;
  }
`;

export function InvoiceFields({ register, control }: InvoiceFieldsProps) {
  return (
    <>
      <Box p={1}>
        <Text>Date de facturation</Text>
        <Input
          type="date"
          {...register('createdAt')}
        />
      </Box>
      <Box p={1}>
        <Text>Notes</Text>
        <Textarea
          placeholder="Ristourne sur les aubergines"
          {...register('notes')}
        />
      </Box>
      <StyledCheckbox>
        <label htmlFor="isPaid">Payée ?</label>
        <Checkbox
          className="checkbox"
          id="isPaid"
          {...register('isPaid')}
        />
      </StyledCheckbox>
    </>
  );
}
