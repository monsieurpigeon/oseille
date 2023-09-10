import { useDisclosure } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { Customer, CustomerInput, updateCustomer } from '../../../backend';
import { EditButton } from '../../../component/buttons';
import { MyModal } from '../../../component/modal/MyModal';
import { CustomerFields } from '../CustomerFields';
import { customerSchema } from './CreateCustomerAction';

interface EditCustomerActionProps {
  customer: Customer;
}

export function EditCustomerAction({ customer }: EditCustomerActionProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef<any>();

  const { control, register, handleSubmit, reset, formState } = useForm<CustomerInput>({
    resolver: zodResolver(customerSchema),
    defaultValues: customer,
  });

  useEffect(() => {
    reset(customer);
  }, [customer]);

  const onSubmit = (e: CustomerInput) => {
    customer && updateCustomer({ ...customer, ...e }).then(onClose);
  };

  return (
    <>
      <EditButton onClick={onOpen} />
      <MyModal
        isOpen={isOpen}
        cancelRef={cancelRef}
        title="Modifier le client"
        onClose={onClose}
        onSubmit={handleSubmit(onSubmit)}
        disabled={!formState.isDirty}
      >
        <CustomerFields
          control={control}
          register={register}
        />
      </MyModal>
    </>
  );
}
