import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useSnapshot } from 'valtio';
import { getCustomer, store } from '../../../backend';

export function CustomerDetail() {
  const { id = '' } = useParams();
  const { customer } = useSnapshot(store);

  useEffect(() => {
    getCustomer(id).catch(console.error);
  }, [id]);

  return (
    <>
      <Link to={'/customers'}>Fermer</Link>
      {customer ? (
        <div>
          <div>Customer Detail : {customer.name}</div>
          <Link to={`/delivery/create/${id}`}>Livrer</Link>
        </div>
      ) : (
        '...'
      )}
    </>
  );
}
