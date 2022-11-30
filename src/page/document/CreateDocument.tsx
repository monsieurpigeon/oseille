import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { useSnapshot } from 'valtio';
import { store } from '../../backend';
import { Button } from '../../component/form/button/Button';
import { ContractInput, useDocument } from './useDocument';

export function CreateDocument() {
  const { customerId = '' } = useParams();
  const { products, customers } = useSnapshot(store);
  const { addContract } = useDocument();
  const [count, setCount] = useState([0]);
  const { register, handleSubmit } = useForm<ContractInput>();

  const onSubmit: SubmitHandler<ContractInput> = (d) => {
    console.log(d);
    addContract(d);
  };

  return (
    <div>
      CreateContract
      <form onSubmit={handleSubmit(onSubmit)}>
        <select {...register('customerId')}>
          {customers.map((customer) => {
            return (
              <option
                key={customer._id}
                value={customer._id}
              >
                {customer.name}
              </option>
            );
          })}
        </select>
        <div>
          {count.map((index) => {
            return (
              <div key={index}>
                <select {...register(`products.${index}.productId`)}>
                  {products.map((product) => {
                    return (
                      <option
                        value={product._id}
                        key={product._id}
                      >
                        {product.name}
                      </option>
                    );
                  })}
                </select>
                <input
                  type="number"
                  {...register(`products.${index}.quantity`)}
                />
              </div>
            );
          })}
          <Button
            label={'ajouter produit'}
            onClick={() => {
              const maxIndex = Math.max(...count);
              setCount((prev) => {
                return [...prev, maxIndex + 1];
              });
            }}
          />
        </div>

        <input
          type="submit"
          value="Valider"
        />
      </form>
    </div>
  );
}
