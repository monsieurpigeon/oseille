import { Input, Select } from '@chakra-ui/react';
import { useRouteLoaderData } from 'react-router-dom';
import { MyField } from '../../../component/MyField';
import { PRODUCT_UNITS } from '../../../utils/defaults';

export const ProductFields = ({ control, register }: any) => {
  const { isTVA } = useRouteLoaderData('farm') as any;
  return (
    <>
      <MyField title="Nom">
        <Input
          placeholder="Tomates cerises"
          {...register('name')}
        />
      </MyField>
      <MyField title="Unité">
        <Select {...register('unit')}>
          {PRODUCT_UNITS.map(({ value, label }) => (
            <option
              key={value}
              value={value}
            >
              {label}
            </option>
          ))}
        </Select>
      </MyField>

      {isTVA && (
        <MyField title="Taux de TVA">
          <Select {...register('tva')}>
            <option value="0">0%</option>
            <option value="5.5">5.5%</option>
            <option value="10">10%</option>
            <option value="20">20%</option>
          </Select>
        </MyField>
      )}
    </>
  );
};
