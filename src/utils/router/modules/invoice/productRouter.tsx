import { Params } from 'react-router-dom';
import { Product, relDb } from '../../../../backend';
import { ProductCreateModal } from '../../../../page/product/modal/ProductCreateModal';
import { ProductEditModal } from '../../../../page/product/modal/ProductEditModal';
import { ProductAll } from '../../../../page/product/ProductAll';
import { ProductDetail } from '../../../../page/product/ProductDetail';
import { ProductPage } from '../../../../page/product/ProductPage';

export const productRouter = {
  path: 'product',
  id: 'products',
  element: <ProductPage />,
  loader: async () =>
    relDb.rel
      .find('product')
      .then((doc) => doc.products.sort((a: Product, b: Product) => a.name.localeCompare(b.name))),
  children: [
    {
      index: true,
      element: <ProductAll />,
    },
    { path: 'create', element: <ProductCreateModal /> },
    {
      path: ':id',
      element: <ProductDetail />,
      id: 'product',
      loader: async ({ params }: { params: Params<string> }) =>
        relDb.rel.find('product', params.id).then((doc) => doc.products[0]),
      children: [
        {
          path: 'edit',
          element: <ProductEditModal />,
        },
      ],
    },
  ],
};
