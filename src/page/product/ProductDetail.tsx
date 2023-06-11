import { Product } from '../../backend';
import { MyHeader } from '../../component/layout/page-layout/MyHeader';
import { MyH1 } from '../../component/typography/MyFont';
import { ProductDisplay } from './ProductDisplay';
import { EditProductAction } from './actions/EditProductAction';

export const ProductDetail = ({ selected }: { selected: Product }) => {
  return (
    <>
      <MyHeader>
        <MyH1>Détail</MyH1>
        <EditProductAction product={selected} />
      </MyHeader>
      <ProductDisplay product={selected} />
    </>
  );
};
