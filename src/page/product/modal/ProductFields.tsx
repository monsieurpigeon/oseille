import { Input, Select } from '@chakra-ui/react';
import { useRouteLoaderData } from 'react-router-dom';
import { MyField } from '../../../component/MyField';
import { Country, PRODUCT_UNITS, TVA_RATES_MAP } from '../../../utils/defaults';

export const ProductFields = ({ register }: any) => {
  const { isTVA, country } = useRouteLoaderData('farm') as { isTVA: boolean; country: Country };
  const tvaRates = TVA_RATES_MAP[country.value];
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
            {tvaRates.map((rate) => (
              <option
                key={rate.value}
                value={rate.value}
              >
                {rate.label}
              </option>
            ))}
          </Select>
        </MyField>
      )}
    </>
  );
};
