import { DEFAULT_FARM } from '../../../../utils/defaults';
import { Customer } from '../../../entity/customer';
import { Farm } from '../../../entity/farm';
import { DocumentType } from '../pdf';

export const addresses = (payload: { customer: Customer }, type: DocumentType, hasLogo: boolean, farm: Farm) => ({
  columns: [
    ...(hasLogo
      ? [
          {
            width: 150,
            image: 'logo',
            fit: [80, 80],
          },
        ]
      : [
          {
            width: 150,
            text: '',
          },
        ]),

    [
      {
        columns: [
          {
            width: 200,
            stack: [
              { text: farm?.title || DEFAULT_FARM.title, bold: true, width: 150 },
              { text: farm?.address1 || DEFAULT_FARM.address1 },
              { text: farm?.address2 || DEFAULT_FARM.address2 },
              { text: `${farm?.zip || DEFAULT_FARM.zip} ${farm?.city || DEFAULT_FARM.city}` },
            ],
          },
          {
            stack: [
              { text: payload.customer.name, bold: true },
              { text: payload.customer.address1 },
              { text: payload.customer.address2 },
              { text: `${payload.customer.zip} ${payload.customer.city}` },
              ...(type === DocumentType.invoice && payload.customer.tvaRef
                ? [{ text: `N° TVA: ${payload.customer.tvaRef}` }]
                : []),
              ...(type === DocumentType.delivery ? [{ text: payload.customer.phone }] : []),
            ],
          },
        ],
      },
      {
        stack: [
          { text: `${farm?.phone || ''}` },
          { text: `${farm?.email || ''}` },
          ...(farm?.tva ? [{ text: `N° TVA: ${farm?.tva || ''}` }] : []),
        ],
      },
    ],
  ],
});
