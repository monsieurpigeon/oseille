import { Button, useDisclosure } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSnapshot } from 'valtio';
import { z } from 'zod';
import { Customer, CustomerInput, addCustomer, store } from '../../backend';
import { CreateModal } from '../../component/modal/CreateModal';
import { MyH1 } from '../../component/typography/MyFont';
import { CustomerDetail } from './CustomerDetail';
import { CustomerFields } from './CustomerFields';
import { EMPTY_CUSTOMER } from '../../utils/defaults';

export const customerSchema = z.object({
  name: z.string().min(1),
  address1: z.string().min(1),
  address2: z.string(),
  zip: z.string().min(1),
  city: z.string().min(1),
  notes: z.string(),
  phone: z.string(),
});

export function Customers() {
  const [selected, setSelected] = useState<Customer>();
  const snap = useSnapshot(store);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef<any>();

  const { control, register, handleSubmit, reset } = useForm<CustomerInput>({
    resolver: zodResolver(customerSchema),
    defaultValues: EMPTY_CUSTOMER,
  });

  useEffect(() => {
    const updated = store.customers.find((p) => p.id === selected?.id);
    if (updated) {
      setSelected(updated);
    }
  }, [snap]);

  const handleClose = () => {
    onClose();
    setTimeout(() => {
      reset();
    }, 100);
  };

  const onSubmit = (e: CustomerInput) => addCustomer(e).then(handleClose).catch(console.error);

  return (
    <div className="catalog">
      <div className="catalog-side">
        <div className="catalog-header">
          <MyH1>Mes Clients</MyH1>
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
        </div>
        <div className="catalog-list">
          {store.customers.map((entity) => (
            <div
              className={`catalog-item ${selected?.id === entity.id && 'selected'}`}
              key={entity.id}
              onClick={() => setSelected((e) => (e?.id === entity.id ? undefined : { ...entity }))}
              onKeyDown={() => {}}
            >
              {`${entity.name}`}
            </div>
          ))}
        </div>
      </div>
      <div className="catalog-side">{selected && <CustomerDetail selected={selected} />}</div>
    </div>
  );
}
