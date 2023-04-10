import { Box, Button, Flex, Input, Select, Text } from '@chakra-ui/react';
import { useSnapshot } from 'valtio';
import { DeliveryInput, store } from '../../backend';
import { FieldArrayWithId } from 'react-hook-form';

export function DeliveryFields({ register, fields, append, remove }: any) {
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
          {fields.map((field: FieldArrayWithId<DeliveryInput, 'lines', 'id'>, index: number) => (
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
              <Input
                {...register(`lines.${index}.quantity`, {
                  valueAsNumber: true,
                })}
              />
              <Button
                colorScheme="red"
                onClick={() => remove(index)}
              >
                X
              </Button>
            </Flex>
          ))}
          <Button
            colorScheme="yellow"
            onClick={() => append({ productId: '', quantity: 0 })}
          >
            Ajouter produit
          </Button>
        </Flex>
      </Box>
    </>
  );
}
