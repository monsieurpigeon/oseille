import { Input, Textarea } from '@chakra-ui/react';
import { MyField } from '../../../component/MyField';
import { DEFAULT_CUSTOMER } from '../../../utils/defaults';

export function CustomerFields({ control, register }: any) {
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
      <MyField title="Notes">
        <Textarea
          placeholder={DEFAULT_CUSTOMER.notes}
          {...register('notes')}
        />
      </MyField>
    </>
  );
}
