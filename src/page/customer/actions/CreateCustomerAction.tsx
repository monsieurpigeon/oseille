import { Button, useDisclosure } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRef } from 'react';
import { useForm } from 'react-hook-form';
import { CustomerInput, addCustomer } from '../../../backend';
import { CreateModal } from '../../../component/modal/CreateModal';
import { EMPTY_CUSTOMER } from '../../../utils/defaults';
import { CustomerFields } from '../CustomerFields';
import { z } from 'zod';

export const customerSchema = z.object({
  name: z.string().min(1),
  address1: z.string().min(1),
  address2: z.string(),
  zip: z.string().min(1),
  city: z.string().min(1),
  notes: z.string(),
  phone: z.string(),
});

export function CreateCustomerAction() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef<any>();

  const { control, register, handleSubmit, reset } = useForm<CustomerInput>({
    resolver: zodResolver(customerSchema),
    defaultValues: EMPTY_CUSTOMER,
  });

  const handleClose = () => {
    onClose();
    setTimeout(() => {
      reset();
    }, 100);
  };

  const onSubmit = (e: CustomerInput) => addCustomer(e).then(handleClose).catch(console.error);

  return (
    <>
      <Button
        colorScheme="twitter"
        onClick={onOpen}
      >
        Nouveau
      </Button>
      <CreateModal
        isOpen={isOpen}
        cancelRef={cancelRef}
        title="Nouveau client"
        onClose={handleClose}
        onSubmit={handleSubmit(onSubmit)}
        body={
          <CustomerFields
            register={register}
            control={control}
          />
        }
        footer={
          <>
            <Button
              ref={cancelRef}
              onClick={handleClose}
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
