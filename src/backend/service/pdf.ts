import { jsPDF } from 'jspdf';

// Default export is a4 paper, portrait, using millimeters for units
export const exportDocument = ({ payload }: any) => {
  const doc = new jsPDF();
  if (payload.type === 'Delivery') {
    doc.text('Bon de livraison', 10, 10);
  } else if (payload.type === 'Invoice') {
    doc.text('Facture', 10, 10);
  }

  doc.text(payload.customer.name, 10, 20);
  const totals: number[] = payload.products.map((el: any, index: number) => {
    const total = el.quantity * el.product.price;
    doc.text(`${el.product.name} - ${el.quantity} - ${el.product.price} : ${total}`, 10, 30 + 10 * index);
    return total;
  });

  doc.text(`Total:  ${totals.reduce((acc, total) => acc + total, 0)}`, 10, 200);

  doc.text('genere gratuitement grace a Oseille', 10, 285);
  doc.save('a4.pdf');
};
