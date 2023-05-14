import { DEFAULT_FARM } from '../../../../utils/defaults';
import { Customer } from '../../../entity/customer';
import { store } from '../../store';
import { DocumentType } from '../pdf';

export const addresses = (payload: { customer: Customer }, type: DocumentType, hasLogo: boolean) => ({
  columns: [
    ...(hasLogo
      ? [
          {
            image: 'logo',
            fit: [100, 100],
          },
        ]
      : []),

    [
      { text: store.farm?.title || DEFAULT_FARM.title },
      { text: store.farm?.address1 || DEFAULT_FARM.address1 },
      { text: store.farm?.address2 || DEFAULT_FARM.address2 },
      { text: `${store.farm?.zip || DEFAULT_FARM.zip} ${store.farm?.city || DEFAULT_FARM.city}` },
    ],
    [
      { text: payload.customer.name, alignment: 'right' },
      { text: payload.customer.address1, alignment: 'right' },
      { text: payload.customer.address2, alignment: 'right' },
      { text: `${payload.customer.zip} ${payload.customer.city}`, alignment: 'right' },
      ...(type === DocumentType.delivery ? [{ text: payload.customer.phone, alignment: 'right' }] : []),
    ],
  ],
});
