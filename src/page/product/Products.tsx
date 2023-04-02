import { Button, useDisclosure } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSnapshot } from 'valtio';
import { z } from 'zod';
import { Product, ProductInput, addProduct, store } from '../../backend';
import { CreateModal } from '../../component/modal/CreateModal';
import { MyH1 } from '../../component/typography/MyFont';
import { ProductDetail } from './ProductDetail';
import { ProductFields } from './ProductFields';
import { priceFormatter } from '../../utils/formatter';

export const productSchema = z.object({
  name: z.string().min(1),
  price: z.string(),
  unit: z.string(),
});

export function Products() {
  const [selected, setSelected] = useState<Product>();
  const snap = useSnapshot(store);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef<any>();

  const { control, register, handleSubmit, reset } = useForm<ProductInput>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: '',
      price: 0,
      unit: 'kg',
    },
  });

  useEffect(() => {
    const updated = store.products.find((p) => p.id === selected?.id);
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

  const onSubmit = (e: ProductInput) => addProduct(e).then(handleClose).catch(console.error);

  return (
    <div className="catalog">
      <div className="catalog-side">
        <div className="catalog-header">
          <MyH1>Mes Produits</MyH1>
          <Button
            colorScheme="twitter"
            onClick={onOpen}
          >
            Nouveau
          </Button>
          <CreateModal
            isOpen={isOpen}
            cancelRef={cancelRef}
            title="Nouveau produit"
            onClose={handleClose}
            onSubmit={handleSubmit(onSubmit)}
            body={
              <ProductFields
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
          {store.products.map((entity) => (
            <div
              className={`catalog-item ${selected?.id === entity.id && 'selected'}`}
              key={entity.id}
              onClick={() => setSelected((e) => (e?.id === entity.id ? undefined : { ...entity }))}
              onKeyDown={() => {}}
            >
              {`${entity.name} - ${priceFormatter(entity.price || 0)} /${entity.unit}`}
            </div>
          ))}
        </div>
      </div>
      <div className="catalog-side">{selected && <ProductDetail selected={selected} />}</div>
    </div>
  );
}
