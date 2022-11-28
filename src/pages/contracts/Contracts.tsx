import { Link } from 'react-router-dom';
import { useContracts } from './useContracts';

export function Contracts() {
  const { contracts } = useContracts();

  return (
    <div>
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
    </div>
  );
}
