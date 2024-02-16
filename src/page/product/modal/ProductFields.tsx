import { Center, Checkbox, Input, Select } from '@chakra-ui/react';
import { UseFormRegister } from 'react-hook-form';
import { useRouteLoaderData } from 'react-router-dom';
import { ProductInput } from '../../../backend';
import { MyField } from '../../../component/MyField';
import { Country, PRODUCT_UNITS, TVA_RATES_MAP } from '../../../utils/defaults';

const getTaxFields = (isTVA: boolean, country: Country, register: UseFormRegister<ProductInput>) => {
  const tvaRates = TVA_RATES_MAP[country.value];
  if (country.value === 'CA') {
    return (
      <>
        {isTVA && (
          <Center p={4}>
            <Checkbox {...register('tvq')}>TVQ ?</Checkbox>
          </Center>
        )}
      </>
    );
  }

  return (
    <>
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

export const ProductFields = ({ register }: { register: UseFormRegister<ProductInput> }) => {
  const { isTVA, country } = useRouteLoaderData('farm') as { isTVA: boolean; country: Country };
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
      {getTaxFields(isTVA, country, register)}
    </>
  );
};
