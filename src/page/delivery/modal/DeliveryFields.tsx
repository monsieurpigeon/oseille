import { Box, Button, Flex, Grid, GridItem, Input, Select, Text, Textarea } from '@chakra-ui/react';
import { useMemo } from 'react';
import { FieldArrayWithId } from 'react-hook-form';
import { useSnapshot } from 'valtio';
import { DeliveryInput, store } from '../../../backend';
import { MyNumberInput } from '../../../component/form/MyNumberInput';
import { priceFormatter } from '../../../utils/formatter';
import { useFarmParameters } from '../../../utils/hooks/useFarmParameters';

export function DeliveryFields({ watch, control, register, fields, append, remove, setValue }: any) {
  const snap = useSnapshot(store);

  const watchCustomer = watch('customerId');
  const { isTVA } = useFarmParameters();

  const { products, prices } = useMemo(() => {
    const productPrices = store.prices.filter((price) => price.customer === watchCustomer);
    const productsList = productPrices.map((price) => price.product);
    const defaultPrices = store.prices.filter(
      (price) => price.customer === 'DEFAULT' && !productsList.includes(price.product),
    );

    const prices = [...productPrices, ...defaultPrices];

    const products = store.products
      .filter((product) => prices.map((price) => price.product).includes(product.id))
      .map((product) => ({
        ...product,
        price: prices.find((price) => price.product === product.id)?.value || 0,
      }));

    return { products, prices };
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

      <Flex
        direction="column"
        gap={1}
      >
        <Text>Lignes produit</Text>
        <Grid
          gap={1}
          templateColumns="3fr 2fr 2fr auto"
        >
          {fields.length > 0 && (
            <>
              <GridItem>Produit</GridItem>
              <GridItem>Quantité</GridItem>
              <GridItem>Prix{isTVA && ' HT'}</GridItem>
              <GridItem></GridItem>
            </>
          )}

          {fields.map((field: FieldArrayWithId<DeliveryInput, 'lines', 'id'>, index: number) => (
            <>
              <GridItem key={`${index}-a`}>
                <Select
                  {...register(`lines.${index}.productId`, {
                    onChange: (e: any) => {
                      setValue(`lines.${index}.price`, prices.find((price) => price.product === e.target.value)?.value);
                    },
                  })}
                >
                  <option value="">...</option>
                  {products.map((product) => (
                    <option
                      value={product.id}
                      key={product.id}
                    >
                      {product.name} {priceFormatter(product.price)}
                      {isTVA && 'HT'}/{product.unit}
                    </option>
                  ))}
                </Select>
              </GridItem>
              <GridItem key={`${index}-c`}>
                <MyNumberInput
                  control={control}
                  name={`lines.${index}.quantity`}
                  min={0}
                />
              </GridItem>
              <GridItem key={`${index}-b`}>
                <MyNumberInput
                  control={control}
                  name={`lines.${index}.price`}
                  min={0}
                  step={0.01}
                />
              </GridItem>
              <GridItem key={`${index}-d`}>
                <Button
                  colorScheme="red"
                  onClick={() => remove(index)}
                >
                  X
                </Button>
              </GridItem>
            </>
          ))}
        </Grid>

        <Button
          colorScheme="yellow"
          onClick={() => append({ productId: '', quantity: 0 })}
        >
          Ajouter produit
        </Button>
        <Box p={1}>
          <Text>Notes</Text>
          <Textarea
            placeholder="Ristourne sur les aubergines"
            {...register('notes')}
          />
        </Box>
      </Flex>
    </>
  );
}
