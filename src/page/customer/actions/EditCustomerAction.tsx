import { Button, useDisclosure } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { Customer, CustomerInput, updateCustomer } from '../../../backend';
import { EditButton } from '../../../component/buttons';
import { EditDialog } from '../../../component/modal/edit-dialog/EditDialog';
import { CustomerFields } from '../CustomerFields';
import { customerSchema } from './CreateCustomerAction';

interface EditCustomerActionProps {
  customer: Customer;
}

export function EditCustomerAction({ customer }: EditCustomerActionProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef<any>();

  const { control, register, handleSubmit, reset } = useForm<CustomerInput>({
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
      <EditDialog
        isOpen={isOpen}
        cancelRef={cancelRef}
        title="Modifier le client"
        onClose={onClose}
        onSubmit={handleSubmit(onSubmit)}
        fields={
          <CustomerFields
            control={control}
            register={register}
          />
        }
        footer={
          <>
            <Button
              ref={cancelRef}
              onClick={onClose}
            >
              Annuler
            </Button>
            <Button
              colorScheme="twitter"
              type="submit"
              ml={3}
            >
              Enregistrer
            </Button>
          </>
        }
      />
    </>
  );
}
