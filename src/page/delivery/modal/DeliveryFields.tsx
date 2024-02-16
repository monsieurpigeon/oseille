import { Box, Button, Flex, Grid, GridItem, Input, Select, Text, Textarea } from '@chakra-ui/react';
import { useMemo } from 'react';
import { FieldArrayWithId, useFieldArray, UseFormReturn } from 'react-hook-form';
import { useLoaderData, useNavigate, useRouteLoaderData } from 'react-router-dom';
import { addPrice, Customer, DeliveryInput, Price, Product, ProductWithPrice } from '../../../backend';
import { MyNumberInput } from '../../../component/form/MyNumberInput';
import { useConfirm } from '../../../component/modal/confirm-modal/ConfirmContext';
import { SideKickFeeling } from '../../../component/modules/sidekick/enums';
import { useSideKick } from '../../../component/modules/sidekick/SideKickContext';
import { Country } from '../../../utils/defaults';
import { priceFormatter } from '../../../utils/formatter';

interface Props {
  methods: UseFormReturn<DeliveryInput, unknown>;
}

export function DeliveryFields({ methods }: Props) {
  const { watch, control, register } = methods;

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'lines',
  });

  const navigate = useNavigate();
  const { products, customers, prices } = useLoaderData() as {
    products: Product[];
    customers: Customer[];
    prices: Price[];
  };

  const watchCustomer = watch('customer');
  const { isTVA } = useRouteLoaderData('farm') as { isTVA: boolean; country: Country };

  const { availableProducts, availablePrices } = useMemo(() => {
    const productPrices = prices.filter((price) => price.customer === watchCustomer);
    const productsList = productPrices.map((price) => price.product);
    const defaultPrices = prices.filter(
      (price) => price.customer === 'DEFAULT' && !productsList.includes(price.product),
    );

    const availablePrices = [...productPrices, ...defaultPrices];

    const availableProducts = products
      .filter((product) => availablePrices.map((price) => price.product).includes(product.id))
      .map((product) => ({
        ...product,
        price: availablePrices.find((price) => price.product === product.id)?.value || 0,
      }));

    return { availableProducts, availablePrices };
  }, [watchCustomer, products, customers, prices]);

  return (
    <>
      {customers.length === 0 ? (
        <Flex
          direction="column"
          bg="blue.50"
          border="2px solid"
          borderColor="blue.200"
          padding={2}
          onClick={() => navigate('../../customer/create')}
          className="clickable"
          borderRadius={10}
        >
          <Text>Ajoutez un premier client en cliquant ici</Text>
        </Flex>
      ) : (
        <Box p={1}>
          <Text>Client</Text>
          <Select {...register('customer')}>
            <option value="">Choisir un client</option>
            {customers.map((customer) => {
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
      )}

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
        <Text>
          {fields.length} ligne{fields.length > 1 ? 's' : ''} produit
        </Text>
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

          {fields.map((field: FieldArrayWithId<DeliveryInput, 'lines', 'id'>, index: number) => {
            const customer = customers.find((customer) => customer.id === watchCustomer);
            return (
              customer && (
                <ProductLine
                  key={field.id}
                  index={index}
                  methods={methods}
                  availableProducts={availableProducts}
                  availablePrices={availablePrices}
                  remove={remove}
                  customer={customer}
                />
              )
            );
          })}
        </Grid>
        {watchCustomer &&
          (availableProducts.length === 0 ? (
            <Flex
              direction="column"
              bg="blue.50"
              border="2px solid"
              borderColor="blue.200"
              padding={2}
              onClick={() => navigate('../../prices')}
              className="clickable"
              borderRadius={10}
            >
              <Text>Pour ajouter un premier tarif à ce client cliquez ici</Text>
            </Flex>
          ) : (
            <Button
              colorScheme="yellow"
              onClick={() => append({ productId: '', price: 0, quantity: 0 })}
            >
              Ajouter produit
            </Button>
          ))}

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

interface ProductLineProps {
  index: number;
  methods: UseFormReturn<DeliveryInput, unknown>;
  availableProducts: ProductWithPrice[];
  availablePrices: Price[];
  remove: (index: number) => void;
  customer: Customer;
}

const ProductLine = ({ index, methods, availableProducts, availablePrices, remove, customer }: ProductLineProps) => {
  const { watch, control, register, setValue } = methods;
  const { isTVA, country } = useRouteLoaderData('farm') as { isTVA: boolean; country: Country };
  const { say } = useSideKick();
  const { confirm } = useConfirm();

  const watchPrice = watch(`lines.${index}.price`);
  const watchProduct = watch(`lines.${index}.productId`);
  const watchCustomer = watch('customer');

  const currentPrice = useMemo(
    () => availablePrices.find((price: Price) => price.product === watchProduct),
    [availableProducts, watchProduct],
  );

  const updatePrice = async () => {
    const product = availableProducts.find((product: Product) => product.id === watchProduct) as Product;
    if (
      await confirm({
        title: 'Éditer le tarif ?',
        message: `${product.name} => ${customer.name} : ${priceFormatter(watchPrice)} HT par ${product.unit} ?`,
      })
    ) {
      if (currentPrice && (currentPrice as Price).customer === watchCustomer) {
        addPrice({ ...currentPrice, value: watchPrice })
          .then(() =>
            say({
              sentence: `Le tarif a bien été enregistré`,
              autoShutUp: true,
              feeling: SideKickFeeling.GOOD,
            }),
          )
          .catch(console.error);
      } else {
        addPrice({ product: watchProduct, customer: watchCustomer, value: watchPrice })
          .then(() =>
            say({
              sentence: `Le tarif a bien été enregistré`,
              autoShutUp: true,
              feeling: SideKickFeeling.GOOD,
            }),
          )
          .catch(console.error);
      }
    }
  };
  return (
    <>
      <GridItem key={`${index}-a`}>
        <Select
          {...register(`lines.${index}.productId`, {
            onChange: (e: React.ChangeEvent<HTMLSelectElement>) => {
              setValue(
                `lines.${index}.price`,
                availablePrices.find((price: Price) => price.product === e.target.value)?.value || 0,
              );
            },
          })}
        >
          <option value="">...</option>
          {availableProducts.map((product: ProductWithPrice) => (
            <option
              value={product.id}
              key={product.id}
            >
              {product.name} {priceFormatter(product.price, country.currency)}
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
        <Flex gap={1}>
          <Button
            colorScheme="green"
            onClick={updatePrice}
            variant="outline"
            disabled={watchPrice == null || watchPrice === (currentPrice as Price)?.value}
            title="Sauvegarder le nouveau prix"
          >
            💾
          </Button>
          <Button
            colorScheme="red"
            onClick={() => remove(index)}
          >
            X
          </Button>
        </Flex>
      </GridItem>
    </>
  );
};
