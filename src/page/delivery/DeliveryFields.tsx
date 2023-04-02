import { Box, Flex, Input, Select, Text } from '@chakra-ui/react';
import { MyNumberInput } from '../../component/form/MyNumberInput';
import { MyButton } from '../../component/form/button/MyButton';
import { useSnapshot } from 'valtio';
import { store } from '../../backend';
import { useFieldArray } from 'react-hook-form';

export function DeliveryFields({ control, register }: any) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'lines',
  });

  const snap = useSnapshot(store);
  return (
    <>
      <Box p={1}>
        <Text>Client</Text>
        <Select {...register('customerId')}>
          <option value="">Choisir un client</option>
          {store.customers.map((customer) => {
            return (
              <option
                key={customer.id}
                value={customer.id}
              >
                {customer.name}
              </option>
            );
          })}
        </Select>
      </Box>
      <Box p={1}>
        <Text>Date de livraison</Text>
        <Input
          type="date"
          {...register('deliveredAt')}
        />
      </Box>

      <Box p={1}>
        <Text>Lignes produit</Text>
        <Flex
          direction="column"
          gap={2}
        >
          {fields.map((field, index) => (
            <Flex
              gap={2}
              key={field.id}
            >
              <Select {...register(`lines.${index}.productId`)}>
                <option value="">...</option>
                {store.products.map((product) => (
                  <option
                    value={product.id}
                    key={product.id}
                  >
                    {product.name} ({product.unit})
                  </option>
                ))}
              </Select>
              <MyNumberInput
                control={control}
                name={`lines.${index}.quantity`}
                min={0}
              />
              <MyButton
                label="X"
                onClick={() => remove(index)}
              />
            </Flex>
          ))}
          <MyButton
            label={'Ajouter produit'}
            onClick={() => append({ productId: '', quantity: 0 })}
          />
        </Flex>
      </Box>
    </>
  );
}
