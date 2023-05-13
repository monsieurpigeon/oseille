import { Product } from '../../backend';
import { TVAFormatter } from '../../utils/formatter';
import { useFarmParameters } from '../../utils/hooks/useFarmParameters';

export function ProductDisplay({ product }: { product: Product }) {
  const { isTVA } = useFarmParameters();

  return (
    <div>
      <div>
        {product.name} /{product.unit}
      </div>
      {isTVA && <div>TVA: {TVAFormatter(product.tva)}</div>}
    </div>
  );
}
