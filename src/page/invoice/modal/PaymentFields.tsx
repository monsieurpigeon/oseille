import { Input, Select, Textarea } from '@chakra-ui/react';
import { PAYMENT_MODES } from '../../../backend';
import { MyField } from '../../../component/MyField';
import { MyNumberInput } from '../../../component/form/MyNumberInput';

export function PaymentFields({ control, register }: any) {
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
          control={control}
          name={'amount'}
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
