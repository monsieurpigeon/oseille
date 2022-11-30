import { Link } from 'react-router-dom';
import { useSnapshot } from 'valtio';
import { store } from '../../backend';
import { ScreenLayout } from '../../component/layout/ScreenLayout';

export function Deals() {
  const { deals } = useSnapshot(store);

  return (
    <ScreenLayout>
      <Link to="create">Nouveau</Link>
      <h1>Accords</h1>
      {deals.map((deal: any) => {
        return (
          <div key={deal._id}>
            <div>{deal.customer.name}</div>
            {deal.products.map((el: any) => {
              return (
                <div key={el.product._id}>
                  {el.quantity} * {el.product.name} #{el.productId}
                </div>
              );
            })}
          </div>
        );
      })}
    </ScreenLayout>
  );
}
