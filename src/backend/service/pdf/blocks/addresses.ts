import { DEFAULT_FARM } from '../../../../utils/defaults';
import { Customer } from '../../../entity/customer';
import { store } from '../../store';
import { DocumentType } from '../pdf';

export const addresses = (payload: { customer: Customer }, type: DocumentType, hasLogo: boolean, hasBio: boolean) => ({
  columns: [
    ...(hasLogo
      ? [
          {
            image: 'logo',
            fit: [150, 150],
          },
        ]
      : []),

    [
      { text: store.farm?.title || DEFAULT_FARM.title, bold: true },
      { text: store.farm?.address1 || DEFAULT_FARM.address1 },
      { text: store.farm?.address2 || DEFAULT_FARM.address2 },
      { text: `${store.farm?.zip || DEFAULT_FARM.zip} ${store.farm?.city || DEFAULT_FARM.city}` },
    ],
    [
      ...(hasBio
        ? [
            {
              image: 'bio',
              width: 150,
              alignment: 'right',
            },
          ]
        : []),
      { text: payload.customer.name, alignment: 'right', bold: true },
      { text: payload.customer.address1, alignment: 'right' },
      { text: payload.customer.address2, alignment: 'right' },
      { text: `${payload.customer.zip} ${payload.customer.city}`, alignment: 'right' },
      ...(type === DocumentType.delivery ? [{ text: payload.customer.phone, alignment: 'right' }] : []),
    ],
  ],
});
