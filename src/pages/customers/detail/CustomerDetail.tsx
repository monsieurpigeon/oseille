import { Link, useParams } from 'react-router-dom';

export function CustomerDetail() {
  const { id = '' } = useParams();

  const customer = null;

  return (
    <>
      <Link to={'/customers'}>Fermer</Link>
      {customer ? (
        <div>
          <div>Customer Detail : {customer}</div>
          <Link to={`/contracts/create/${id}`}>Livrer</Link>
        </div>
      ) : (
        '...'
      )}
    </>
  );
}
