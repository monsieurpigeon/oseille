import { Link } from 'react-router-dom';
import { ScreenLayout } from '../../component/layout/ScreenLayout';
import { useDocument } from './useDocument';

export function Documents() {
  const { contracts } = useDocument();

  return (
    <ScreenLayout>
      <Link to="create">Nouveau</Link>
      <h1>Contrats</h1>
      {contracts.map((contract: any) => {
        return (
          <div key={contract._id}>
            <div>{contract.customer.name}</div>
            {contract.products.map((el: any) => {
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
