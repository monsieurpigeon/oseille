import { Input } from '@chakra-ui/react';
import { useRef, useState } from 'react';
import { login } from '../../backend/service/publicDatabase';
import { BasicModalProps, MyModal } from './MyModal';

export function SignUpModal({ isOpen, onClose }: BasicModalProps) {
  const cancelRef = useRef<any>();
  const [state, setState] = useState({ username: '', password: '' });

  const handleSubmit = () => {
    console.log(state);
    login(state.username, state.password).then((data: any) => {
      console.log(data);
    });
  };

  const handleChange = (value: string, key: string) => {
    setState({ ...state, [key]: value });
  };

  return (
    <MyModal
      cancelRef={cancelRef}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      title="Inscription"
    >
      <Input
        value={state.username}
        onChange={(e) => handleChange(e.target.value, 'username')}
      />
      <Input
        value={state.password}
        onChange={(e) => handleChange(e.target.value, 'password')}
        type="password"
      />
    </MyModal>
  );
}
