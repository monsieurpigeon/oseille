import { Button } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Customer, CustomerInput, updateCustomer } from '../../backend';
import { MyH1 } from '../../component/typography/MyFont';
import { CustomerFields } from './CustomerFields';
import { customerSchema } from './Customers';

export const CustomerDetail = ({ selected }: { selected: Customer }) => {
  const { control, register, handleSubmit, reset } = useForm<CustomerInput>({
    resolver: zodResolver(customerSchema),
    defaultValues: selected,
  });

  useEffect(() => {
    reset(selected);
  }, [selected]);

  const onSubmit = (e: CustomerInput) => {
    selected && updateCustomer({ ...selected, ...e });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="catalog-header">
        <MyH1>Détail</MyH1>
        <Button
          colorScheme="twitter"
          type="submit"
          ml={3}
        >
          Enregistrer
        </Button>
      </div>

      <CustomerFields
        register={register}
        control={control}
      />
    </form>
  );
};
