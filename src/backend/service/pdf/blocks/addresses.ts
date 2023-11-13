import { DEFAULT_FARM } from '../../../../utils/defaults';
import { Customer } from '../../../entity/customer';
import { Farm } from '../../../entity/farm';
import { DocumentType } from '../pdf';

export const addresses = (
  payload: { customer: Customer },
  type: DocumentType,
  hasLogo: boolean,
  hasBio: boolean,
  farm: Farm,
) => ({
  columns: [
    ...(hasLogo
      ? [
          {
            image: 'logo',
            fit: [120, 120],
          },
        ]
      : []),

    [
      { text: farm?.title || DEFAULT_FARM.title, bold: true },
      { text: farm?.address1 || DEFAULT_FARM.address1 },
      { text: farm?.address2 || DEFAULT_FARM.address2 },
      { text: `${farm?.zip || DEFAULT_FARM.zip} ${farm?.city || DEFAULT_FARM.city}` },
      { text: `${farm?.phone || ''}` },
      { text: `${farm?.email || ''}` },
      ...(farm?.tva ? [{ text: `N° TVA: ${farm?.tva || ''}` }] : []),
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
        : [{ text: '.', height: 50, color: 'white' }]),
      { text: payload.customer.name, alignment: 'right', bold: true },
      { text: payload.customer.address1, alignment: 'right' },
      { text: payload.customer.address2, alignment: 'right' },
      { text: `${payload.customer.zip} ${payload.customer.city}`, alignment: 'right' },
      ...(type === DocumentType.delivery ? [{ text: payload.customer.phone, alignment: 'right' }] : []),
    ],
  ],
});
