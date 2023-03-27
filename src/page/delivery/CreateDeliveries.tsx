import { Flex, Input, Select } from '@chakra-ui/react';
import { SubmitHandler, useFieldArray, useForm } from 'react-hook-form';
import { useSnapshot } from 'valtio';
import { DeliveryInput, addDelivery, store } from '../../backend';
import { MyButton } from '../../component/form/button/MyButton';
import { CreateModal } from '../../component/modal/CreateModal';

export function CreateDeliveries() {
  const { products, customers } = useSnapshot(store);
  const { control, register, handleSubmit, reset } = useForm<DeliveryInput>({
    defaultValues: { deliveredAt: new Date().toISOString().split('T')[0] },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'products',
  });

  const onSubmit: SubmitHandler<DeliveryInput> = (d) => {
    addDelivery(d).then(() => {
      reset();
    });
  };

  return (
    <CreateModal
      title={''}
      onSubmit={handleSubmit(onSubmit)}
      onCancel={remove}
    >
      <form>
        <Flex
          direction="column"
          gap={8}
        >
          <Select {...register('customerId')}>
            <option value={undefined}>Choisir un client</option>
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
          <Input
            type="date"
            {...register('deliveredAt', { required: true })}
          />
          <Flex
            direction="column"
            gap={2}
          >
            {fields.map((field, index) => (
              <Flex
                gap={2}
                key={field.id}
              >
                <Select {...register(`products.${index}.productId`)}>
                  <option value={undefined}>...</option>
                  {products.map((product) => {
                    return (
                      <option
                        value={product.id}
                        key={product.id}
                      >
                        {product.name} ({product.unit})
                      </option>
                    );
                  })}
                </Select>
                <Input
                  type="number"
                  min={0}
                  {...register(`products.${index}.quantity`)}
                />
                <MyButton
                  label="X"
                  onClick={() => {
                    remove(index);
                  }}
                />
              </Flex>
            ))}
            <MyButton
              label={'ajouter produit'}
              onClick={() => {
                append({ productId: '', quantity: 0 });
              }}
            />
          </Flex>
        </Flex>
      </form>
    </CreateModal>
  );
}
