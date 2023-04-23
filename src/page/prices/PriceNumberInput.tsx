import { Button } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Customer, Product } from '../../backend';
import { Price, PriceInput, addPrice } from '../../backend/entity/price';
import { MyNumberInput } from '../../component/form/MyNumberInput';
import { priceFormatter } from '../../utils/formatter';
import { useFarmParameters } from '../../utils/hooks/useFarmParameters';

export const priceSchema = z.object({
  value: z.number().gt(0),
});

export function PriceNumberInput({
  product,
  customer,
  price,
}: {
  product: Product;
  customer: Customer;
  price: Price | undefined;
}) {
  const { isTVA } = useFarmParameters();
  const { watch, control, handleSubmit, reset } = useForm<PriceInput>({
    resolver: zodResolver(priceSchema),
    defaultValues: {
      value: price?.value || 0,
    },
  });
  const [isEdit, setIsEdit] = useState(false);

  const watchValue = watch('value') || price?.value;

  const handleClose = () => {
    setIsEdit(false);
  };

  useEffect(() => {
    reset({ value: price?.value || 0 });
  }, [price]);

  const onSubmit = (e: PriceInput) =>
    addPrice({ ...price, ...e, customer, product })
      .then(handleClose)
      .catch(console.error);

  const tva = +product.tva || 5.5;

  return (
    <div>
      {isEdit ? (
        <div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div style={{ display: 'flex', gap: '5px', width: '140px' }}>
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
            </div>
            {isTVA && <div>{priceFormatter(+watchValue! * (1 + tva / 100))}TTC</div>}
          </form>
        </div>
      ) : (
        <button onClick={() => setIsEdit(true)}>{price ? `${priceFormatter(price.value)}HT` : <AddPrice />}</button>
      )}
    </div>
  );
}

function AddPrice() {
  return (
    <div style={{ borderRadius: '7px', color: 'white', padding: '5px 10px', backgroundColor: 'salmon' }}>Ajouter</div>
  );
}
