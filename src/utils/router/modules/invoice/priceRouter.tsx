import { Customer, Product, relDb } from '../../../../backend';
import { PricePage } from '../../../../page/prices/PricePage';

export const priceRouter = {
  path: 'prices',
  element: <PricePage />,
  loader: async () => {
    const priceResult = relDb.rel.find('price');
    const productResult = relDb.rel.find('product');
    const customerResult = relDb.rel.find('customer');
    return Promise.all([priceResult, productResult, customerResult]).then((results) => {
      const prices = results[0].prices;
      const products = results[1].products.sort((a: Product, b: Product) => a.name.localeCompare(b.name));
      const customers = results[2].customers.sort((a: Customer, b: Customer) => a.name.localeCompare(b.name));
      return { prices, products, customers };
    });
  },
};
