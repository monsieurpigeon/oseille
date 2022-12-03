import { db } from '../service/database';
import { store } from '../service/store';

export interface Invoice {
    id: string;
    customerId: string;
    products: Array<{
        productId: string;
        name: string;
        quantity: number;
        price: number;
        totalPrice: number;
    }>;
}

export interface InvoiceInput {
    customerId: string;
    products: Array<{
        productId: string;
        name: string;
        quantity: number;
        price: number;
        totalPrice: number;
    }>;
}

export const loadInvoices = () => {
    db.find({
        selector: { type: 'Invoice' },
    })
        .then((result: { docs: unknown }) => {
            return Promise.all(
                (result.docs as unknown as Invoice[]).map(async (doc) => {
                    const customer = await db.get(doc.customerId);
                    const products = await Promise.all(
                        doc.products.map(async (el) => {
                            const product = await db.get(el.productId);
                            return { ...el, product };
                        }),
                    );
                    return { ...doc, customer, products };
                }),
            );
        })
        .then((data: Invoice[]) => {
            store.invoices = data;
        });
};

export const addDelivery = (invoice: InvoiceInput) => {
    db.post({
        ...invoice,
        type: 'Invoice',
    })
        .then(loadInvoices)
        .catch(console.error);
};
