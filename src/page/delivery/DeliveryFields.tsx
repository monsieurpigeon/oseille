import { Box, Button, Flex, Input, Select, Text } from '@chakra-ui/react';
import { FieldArrayWithId } from 'react-hook-form';
import { useSnapshot } from 'valtio';
import { DeliveryInput, getPrice, store } from '../../backend';
import { MyNumberInput } from '../../component/form/MyNumberInput';
import { useMemo } from 'react';
import { priceFormatter } from '../../utils/formatter';

export function DeliveryFields({ watch, control, register, fields, append, remove, setValue, getValues }: any) {
  const snap = useSnapshot(store);

  const watchCustomer = watch('customerId');

  const products = useMemo(() => {
    const prices = store.prices.filter((price) => price.customer === watchCustomer);
    return store.products
      .filter((product) => prices.map((price) => price.product).includes(product.id))
      .map((product) => ({
        ...product,
        price: prices.find((price) => price.product === product.id)?.value || 0,
      }));
  }, [watchCustomer]);
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
              <Select
                {...register(`lines.${index}.productId`, {
                  onChange: (e: any) => {
                    setValue(
                      `lines.${index}.price`,
                      getPrice({ customer: watchCustomer, product: e.target.value })?.value,
                    );
                  },
                })}
              >
                <option value="">...</option>
                {products.map((product) => (
                  <option
                    value={product.id}
                    key={product.id}
                  >
                    {product.name} {priceFormatter(product.price)}/{product.unit}
                  </option>
                ))}
              </Select>
              <MyNumberInput
                control={control}
                name={`lines.${index}.price`}
                min={0}
                step={0.01}
              />
              <MyNumberInput
                control={control}
                name={`lines.${index}.quantity`}
                min={0}
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
