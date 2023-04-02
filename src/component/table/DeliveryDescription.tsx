import { Delivery } from '../../backend';
import { priceFormatter } from '../../utils/formatter';

export function DeliveryDescription({ delivery }: { delivery: Delivery }) {
  return (
    <table style={{ width: '100%', textAlign: 'right' }}>
      <thead>
        <tr>
          <th>Produit</th>
          <th>Quantité</th>
          <th>Prix unitaire</th>
          <th>Total</th>
        </tr>
      </thead>
      <tbody>
        {delivery.lines.map((line, index) => (
          <tr key={`${index}`}>
            <td>{line.product.name}</td>
            <td>
              {line.quantity} {line.product.unit}
              {line.quantity > 1 ? 's' : ''}
            </td>
            <td>{priceFormatter(line.product.price)}</td>
            <td>{priceFormatter(line.product.price * line.quantity)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
