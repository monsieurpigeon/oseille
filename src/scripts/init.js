console.log('DEBUT');
const db = new PouchDB('hello_world');

db.get('init').catch((error) => {
  if (error.status === 404) {
    console.log('MAKE INIT');
    db.bulkDocs([
      { type: 'Product', _id: '1', name: 'Tomate' },
      { type: 'Product', _id: '2', name: 'Carotte' },
      { type: 'Product', _id: '3', name: 'Courgette' },
      { type: 'Customer', _id: '4', name: 'Biocoop' },
      {
        type: 'Contract',
        customerId: '4',
        products: [
          { productId: '1', quantity: '17' },
          { productId: '2', quantity: '24' },
          { productId: '3', quantity: '33' },
        ],
      },
      { _id: 'init' },
    ])
      .then((result) => {
        console.log({ result });
      })
      .catch(console.error);
  }
});

console.log('FIN');
