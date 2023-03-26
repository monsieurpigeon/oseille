import { Flex, Input, Select } from '@chakra-ui/react';
import { useState } from 'react';
import { useSnapshot } from 'valtio';
import { DeliveryInput, addDelivery, store } from '../../backend';
import { MyButton } from '../../component/form/button/MyButton';
import { CreateModal } from '../../component/modal/CreateModal';
import { SubmitHandler, useForm } from 'react-hook-form';

export function CreateDeliveries() {
  const { products, customers } = useSnapshot(store);
  const [count, setCount] = useState([0]);
  const { register, handleSubmit, reset } = useForm<DeliveryInput>();

  const onSubmit: SubmitHandler<DeliveryInput> = (d) => {
    addDelivery(d).then(() => {
      reset();
      setCount([0]);
    });
  };

  return (
    <CreateModal
      title={''}
      onSubmit={handleSubmit(onSubmit)}
    >
      <form>
        <Flex
          direction="column"
          gap={8}
        >
          <Select {...register('customerId')}>
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
            {...register('deliveredAt')}
          />
          <Flex
            direction="column"
            gap={2}
          >
            {count.map((index) => {
              return (
                <Flex
                  gap={2}
                  key={index}
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
                  <Input {...register(`products.${index}.quantity`)} />
                </Flex>
              );
            })}
            <MyButton
              label={'ajouter produit'}
              onClick={() => {
                const maxIndex = Math.max(...count);
                setCount((prev) => {
                  return [...prev, maxIndex + 1];
                });
              }}
            />
          </Flex>{' '}
        </Flex>
      </form>
    </CreateModal>
  );
}
