import { Button } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Customer, Product } from '../../backend';
import { Price, PriceInput, addPrice, deletePrice } from '../../backend/entity/price';
import { MyNumberInput } from '../../component/form/MyNumberInput';
import { priceFormatter } from '../../utils/formatter';
import { useFarmParameters } from '../../utils/hooks/useFarmParameters';
import { useSideKick } from '../../component/modules/sidekick/SideKickContext';
import { useConfirm } from '../../component/modal/confirm-dialog/ConfirmContext';

export const priceSchema = z.object({
  value: z.number().gt(0),
});

export function PriceNumberInput({
  product,
  customer,
  price,
  value,
  onClose,
}: {
  product: Product;
  customer: Customer | 'DEFAULT';
  price: Price | undefined;
  value: number;
  onClose: () => void;
}) {
  const { isTVA } = useFarmParameters();
  const { watch, control, handleSubmit, reset } = useForm<PriceInput>({
    resolver: zodResolver(priceSchema),
    defaultValues: {
      value,
    },
  });

  const { say, shutUp } = useSideKick();
  const { confirm } = useConfirm();

  const watchValue = watch('value', value);

  const handleDeletePrice = async (price: Price) => {
    if (
      await confirm({
        title: 'Supprimer le tarif ?',
        message: `Supprimer le tarif pour le produit : "${product.name}" du client ${
          customer === 'DEFAULT' ? 'par défaut' : customer.name
        }`,
      })
    ) {
      deletePrice(price).then(onClose);
    }
  };

  useEffect(() => {
    reset({ value });
  }, [value]);

  const onSubmit = (e: PriceInput) =>
    addPrice({ ...price, ...e, customer, product })
      .then(shutUp)
      .then(onClose)
      .catch(console.error);

  const tva = +product.tva || 5.5;

  useEffect(() => {
    isTVA && say(`Ce qui fait : ${priceFormatter((watchValue || value) * (1 + tva / 100))}TTC`);
  }, [watchValue]);

  return (
    <div>
      {
        <div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div style={{ display: 'flex', gap: '5px', width: '140px', position: 'relative' }}>
              <MyNumberInput
                control={control}
                name="value"
                min={0}
                step={0.01}
                size="sm"
              />
              <Button
                size="sm"
                type="submit"
              >
                OK
              </Button>
              {price && (
                <Button
                  onClick={() => handleDeletePrice(price)}
                  colorScheme="red"
                  size="sm"
                  style={{ position: 'absolute', right: '-40px', top: '0' }}
                >
                  X
                </Button>
              )}
            </div>
          </form>
        </div>
      }
    </div>
  );
}
