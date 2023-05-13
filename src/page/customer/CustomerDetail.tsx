import { Button, useDisclosure } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { Customer, CustomerInput, updateCustomer } from '../../backend';
import { MyH1 } from '../../component/typography/MyFont';
import { CustomerFields } from './CustomerFields';
import { customerSchema } from './Customers';
import { EditDialog } from '../../component/modal/edit-dialog/EditDialog';
import { CustomerDisplay } from './CustomerDisplay';

export const CustomerDetail = ({ selected }: { selected: Customer }) => {
  const { control, register, handleSubmit, reset } = useForm<CustomerInput>({
    resolver: zodResolver(customerSchema),
    defaultValues: selected,
  });

  useEffect(() => {
    reset(selected);
  }, [selected]);

  const onSubmit = (e: CustomerInput) => {
    selected && updateCustomer({ ...selected, ...e }).then(onClose);
  };

  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef<any>();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="catalog-header">
        <MyH1>Détail</MyH1>
        <Button
          colorScheme="red"
          onClick={onOpen}
        >
          Modifier
        </Button>
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
      </div>

      <CustomerDisplay customer={selected} />
    </form>
  );
};
