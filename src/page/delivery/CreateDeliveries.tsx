import { Box, Flex, Input, Select, Text } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useFieldArray, useForm } from 'react-hook-form';
import { useSnapshot } from 'valtio';
import { z } from 'zod';
import { DeliveryInput, addDelivery, store } from '../../backend';
import { MyNumberInput } from '../../component/form/MyNumberInput';
import { MyButton } from '../../component/form/button/MyButton';
import { MyCreateModal } from '../../component/modal/MyCreateModal';

const schema = z.object({
  customerId: z.string().min(1),
  deliveredAt: z.string(),
  lines: z
    .object({
      productId: z.string().min(1),
      quantity: z.string(),
    })
    .array()
    .nonempty(),
});

export function CreateDeliveries() {
  const { products, customers } = useSnapshot(store);
  const { control, register, handleSubmit, reset } = useForm<DeliveryInput>({
    resolver: zodResolver(schema),
    defaultValues: { customerId: '', deliveredAt: new Date().toISOString().split('T')[0] },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'lines',
  });

  return (
    <MyCreateModal
      onCreate={addDelivery}
      handleSubmit={handleSubmit}
      reset={() => {
        remove();
        reset();
      }}
      title="Nouvelle livraison"
    >
      <Box p={1}>
        <Text>Client</Text>
        <Select {...register('customerId')}>
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
                {products.map((product) => (
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
    </MyCreateModal>
  );
}
