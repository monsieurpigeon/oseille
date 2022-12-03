import { Link } from 'react-router-dom';
import { useSnapshot } from 'valtio';
import {exportDocument, store} from '../../backend';
import { ScreenLayout } from '../../component/layout/ScreenLayout';

export function Invoices() {
    const { invoices } = useSnapshot(store);

    return (
        <ScreenLayout>
            <Link to="create">Nouveau</Link>
            <h1>Factures</h1>
            {invoices.map((invoice: any) => {
                return (
                    <div key={invoice._id}>
                        <div>{invoice.customer.name}</div>
                        {invoice.products.map((el: any) => {
                            return (
                                <div key={el.product._id}>
                                    {el.quantity} * {el.product.name} #{el.productId} - {el.product.price}
                                </div>
                            );
                        })}
                        <button onClick={()=>{
                            exportDocument({payload: invoice})
                        }
                        }
                        >Export</button>
                    </div>
                );
            })}
        </ScreenLayout>
    );
}
