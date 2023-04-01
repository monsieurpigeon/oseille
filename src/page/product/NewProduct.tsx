import { useState } from 'react';
import './style.css';

export function NewProduct() {
  const [selected, setSelected] = useState<number | null>(null);
  return (
    <div className="page-product">
      <div className="page-product-side">
        <div>Mes Produits</div>
        <div className="product-list">
          {Array.from(Array(50).keys()).map((index) => {
            return (
              <div
                className="product-item"
                onClick={() => setSelected(index)}
                onKeyDown={() => {}}
              >
                {index}
              </div>
            );
          })}
        </div>
      </div>
      <div className="page-product-side">{selected}</div>
    </div>
  );
}
