import { Input, Textarea } from '@chakra-ui/react';
import { UseFormRegister } from 'react-hook-form';
import { useRouteLoaderData } from 'react-router-dom';
import { CustomerInput } from '../../../backend';
import { MyField } from '../../../component/MyField';
import { DEFAULT_CUSTOMER } from '../../../utils/defaults';

interface Props {
  register: UseFormRegister<CustomerInput>;
}

export function CustomerFields({ register }: Props) {
  const { isTVA } = useRouteLoaderData('farm') as { isTVA: boolean };
  return (
    <>
      <MyField title="Nom">
        <Input
          placeholder={DEFAULT_CUSTOMER.name}
          {...register('name')}
        />
      </MyField>
      <MyField title="Adresse 1">
        <Input
          placeholder={DEFAULT_CUSTOMER.address1}
          {...register('address1')}
        />
      </MyField>
      <MyField title="Adresse 2">
        <Input
          placeholder={DEFAULT_CUSTOMER.address2}
          {...register('address2')}
        />
      </MyField>
      <MyField title="Code postal">
        <Input
          placeholder={DEFAULT_CUSTOMER.zip}
          {...register('zip')}
        />
      </MyField>
      <MyField title="Ville">
        <Input
          placeholder={DEFAULT_CUSTOMER.city}
          {...register('city')}
        />
      </MyField>
      <MyField title="Téléphone (visible sur Bon de livraison)">
        <Input
          placeholder={DEFAULT_CUSTOMER.phone}
          {...register('phone')}
        />
      </MyField>
      {isTVA && (
        <MyField title="N°  TVA">
          <Input
            placeholder={DEFAULT_CUSTOMER.tvaRef}
            {...register('tvaRef')}
          />
        </MyField>
      )}

      <MyField title="Notes">
        <Textarea
          placeholder={DEFAULT_CUSTOMER.notes}
          {...register('notes')}
        />
      </MyField>
    </>
  );
}
