import { Button, Text } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { Control, FieldValues, useForm } from 'react-hook-form';
import { useRouteLoaderData } from 'react-router-dom';
import { z } from 'zod';
import { Customer, Product } from '../../backend';
import { addPrice, deletePrice, Price, PriceInput } from '../../backend/entity/price';
import { MyNumberInput } from '../../component/form/MyNumberInput';
import { useConfirm } from '../../component/modal/confirm-modal/ConfirmContext';
import { SideKickFeeling } from '../../component/modules/sidekick/enums';
import { useSideKick } from '../../component/modules/sidekick/SideKickContext';
import { round } from '../../utils/compute';
import { Country } from '../../utils/defaults';
import { priceFormatter } from '../../utils/formatter';

export const priceSchema = z.object({
  value: z.string().transform((v) => Number(v)),
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
  const { isTVA, country } = useRouteLoaderData('farm') as { isTVA: boolean; country: Country };
  const { watch, control, handleSubmit, reset } = useForm<PriceInput>({
    resolver: zodResolver(priceSchema),
    defaultValues: {
      value,
    },
  });

  const { say } = useSideKick();
  const { confirm } = useConfirm();

  const watchValue = watch('value', value);

  const handleDeletePrice = async (price: Price) => {
    if (
      await confirm({
        title: 'Supprimer le tarif ?',
        message: (
          <Text>
            Supprimer le tarif pour le produit <Text as="b">{product.name}</Text> du client{' '}
            <Text as="b">{customer === 'DEFAULT' ? 'par défaut' : customer.name}</Text>
          </Text>
        ),
      })
    ) {
      deletePrice(price)
        .then(() =>
          say({
            sentence: `Le tarif a bien été supprimé`,
            autoShutUp: true,
            feeling: SideKickFeeling.GOOD,
          }),
        )
        .then(onClose);
    }
  };

  useEffect(() => {
    reset({ value });
  }, [value]);

  const onSubmit = (e: PriceInput) =>
    addPrice({ ...price, ...e, value: round(+e.value), customer, product })
      .then(() =>
        say({
          sentence: `Le tarif a bien été enregistré`,
          autoShutUp: true,
          feeling: SideKickFeeling.GOOD,
        }),
      )
      .then(onClose)
      .catch(console.error);

  const tva = +product.tva || 5.5;

  useEffect(() => {
    if (country.value === 'CA' && isTVA) {
      const tvaRate = product.tvq ? 14.975 : 5;
      say({
        feeling: SideKickFeeling.COMPUTE,
        sentence: `Ce qui fait: ${priceFormatter((watchValue || value) * (1 + tvaRate / 100), country.currency)}TTC`,
      });
    } else if (isTVA) {
      say({
        feeling: SideKickFeeling.COMPUTE,
        sentence: `Ce qui fait: ${priceFormatter((watchValue || value) * (1 + tva / 100), country.currency)}TTC`,
      });
    }
  }, [watchValue]);

  return (
    <div>
      {
        <div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div style={{ display: 'flex', gap: '5px', width: '140px', position: 'relative' }}>
              <MyNumberInput
                control={control as unknown as Control<FieldValues>}
                name="value"
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
