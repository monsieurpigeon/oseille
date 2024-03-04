import { Select } from '@chakra-ui/react';
import { UseFormRegister } from 'react-hook-form';
import { FarmInput } from '../../backend';

export function SelectBio({ register }: { register: UseFormRegister<FarmInput> }) {
  return (
    <Select {...register('bioLabel')}>
      <option value="non">NON</option>
      <option value="sustainable">Agriculture raisonnée</option>
      <option value="fr-bio-01">FR-BIO-01</option>
      <option value="fr-bio-09">FR-BIO-09</option>
      <option value="fr-bio-10">FR-BIO-10</option>
      <option value="fr-bio-15">FR-BIO-15</option>
      <option value="fr-bio-16">FR-BIO-16</option>
    </Select>
  );
}
