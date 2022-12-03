import { BLANK_PDF, generate, Template } from '@pdfme/generator';

const template: Template = {
  basePdf: BLANK_PDF,
  schemas: [
    {
      a: {
        type: 'text',
        position: { x: 0, y: 0 },
        width: 10,
        height: 10,
      },
      b: {
        type: 'text',
        position: { x: 10, y: 10 },
        width: 10,
        height: 10,
      },
      c: {
        type: 'text',
        position: { x: 20, y: 20 },
        width: 10,
        height: 10,
      },
    },
  ],
};
export const exportDocument = ({ payload }: any) => {
  console.log(payload);
  const inputs = [{ a: 'a1', b: 'b1', c: 'c1' }];

  generate({ template, inputs }).then((pdf) => {
    console.log(pdf);
    const blob = new Blob([pdf.buffer], { type: 'application/pdf' });
    window.open(URL.createObjectURL(blob));
  });
};
// if (payload.type === 'Delivery') {
//   doc.text('Bon de livraison', 10, 10);
// } else if (payload.type === 'Invoice') {
//   doc.text('Facture', 10, 10);
// }
//
// doc.text(payload.customer.name, 10, 20);
// const totals: number[] = payload.products.map((el: any, index: number) => {
//   const total = el.quantity * el.product.price;
//   doc.text(`${el.product.name} - ${el.quantity} - ${el.product.price} : ${total}`, 10, 30 + 10 * index);
//   return total;
// });
//
// doc.text(`Total:  ${totals.reduce((acc, total) => acc + total, 0)}`, 10, 200);
//
// doc.text('genere gratuitement grace a Oseille', 10, 285);
// doc.save('a4.pdf');
