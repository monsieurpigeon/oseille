import { PriceTable } from './PriceTable';
import { MyH1 } from '../../component/typography/MyFont';

export function Prices() {
  return (
    <div className="catalog-full">
      <MyH1>Mes Tarifs</MyH1>
      <PriceTable />
    </div>
  );
}
