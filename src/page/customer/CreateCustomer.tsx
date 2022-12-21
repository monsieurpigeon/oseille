import { useState } from 'react';
import { addCustomer } from '../../backend';
import { MyTextInput } from '../../component/form/input/MyTextInput';
import { MyCreateModal } from '../../component/modal/MyCreateModal';

export function CreateCustomer() {
  const [text, setText] = useState('');
  return (
    <MyCreateModal
      onSubmit={() => {
        addCustomer({ name: text }).catch(console.error);
        setText('');
      }}
      title="Nouveau client"
    >
      <MyTextInput
        placeholder="Nom du client"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
    </MyCreateModal>
  );
}
