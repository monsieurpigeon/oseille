import { Link, useParams } from 'react-router-dom';
import { useCustomerDetail } from './useCustomerDetail';

export function CustomerDetail() {
  const { id = '' } = useParams();

  const { customer } = useCustomerDetail({ id });

  return (
    <>
      <Link to={'/customers'}>Fermer</Link>
      {customer ? (
        <div>
          <div>Customer Detail : {customer.name}</div>
          <Link to={`/contracts/create/${id}`}>Livrer</Link>
        </div>
      ) : (
        '...'
      )}
    </>
  );
}
