import { Input, Select, Textarea } from '@chakra-ui/react';
import { FieldValues, UseFormRegister } from 'react-hook-form';
import { InvoicePaymentInput, PAYMENT_MODES } from '../../../backend';
import { MyNumberInput } from '../../../component/form/MyNumberInput';
import { MyField } from '../../../component/MyField';

export function PaymentFields({ register }: { register: UseFormRegister<InvoicePaymentInput> }) {
  return (
    <>
      <MyField title="Date de paiement">
        <Input
          type="date"
          {...register('paidAt')}
        />
      </MyField>
      <MyField title="Mode de paiement">
        <Select {...register('paymentMode')}>
          <option
            disabled
            selected
            value={undefined}
          >
            Choisir un mode de paiement
          </option>
          {PAYMENT_MODES.map(({ value, label }) => (
            <option
              key={value}
              value={value}
            >
              {label}
            </option>
          ))}
        </Select>
      </MyField>
      <MyField title="Montant">
        <MyNumberInput
          register={register as unknown as UseFormRegister<FieldValues>}
          name="amount"
          min={0}
          step={0.01}
        />
      </MyField>
      <MyField title="Référence">
        <Input {...register('reference')} />
      </MyField>
      <MyField title="Notes privées">
        <Textarea {...register('notes')} />
      </MyField>
    </>
  );
}
