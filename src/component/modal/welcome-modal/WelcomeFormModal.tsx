import {
  Button,
  Flex,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
} from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAtom } from 'jotai';
import { useForm } from 'react-hook-form';
import { useRouteLoaderData } from 'react-router-dom';
import { z } from 'zod';
import { Farm, FarmInput, updateFarm } from '../../../backend';
import { DEFAULT_FARM, EMPTY_FARM } from '../../../utils/defaults';
import { SelectBio } from '../../form/SelectBio';
import { useSideKick } from '../../modules/sidekick/SideKickContext';
import { SideKickFeeling } from '../../modules/sidekick/enums';
import { welcomeAtom } from './WelcomeModal';

const welcomeSchema = z.object({
  title: z.string().min(1),
  bioLabel: z.string(),
  isTVA: z.string(),
});

export function WelcomeFormModal() {
  const [, setWelcome] = useAtom(welcomeAtom);
  const onClose = () => setWelcome(false);
  const { say } = useSideKick();

  const { farm } = useRouteLoaderData('farm') as { farm: Farm };

  const { register, handleSubmit, formState } = useForm<FarmInput>({
    resolver: zodResolver(welcomeSchema),
    defaultValues: { ...EMPTY_FARM, ...farm },
  });
  console.log(formState.errors);

  const onSubmit = (e: FarmInput) => {
    farm &&
      updateFarm({ ...farm, ...e })
        .then(() =>
          say({
            sentence: `Bienvenue sur Oseille!`,
            autoShutUp: true,
            feeling: SideKickFeeling.GOOD,
          }),
        )
        .then(onClose)
        .catch(console.error);
  };

  return (
    <Modal
      closeOnOverlayClick={false}
      isOpen={true}
      onClose={onClose}
    >
      <ModalOverlay />
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit(onSubmit)();
        }}
      >
        <ModalContent className="no-select">
          <ModalHeader>Avant de commencer...</ModalHeader>
          <ModalBody>
            <Flex
              direction="column"
              gap="3"
              marginBottom="20px"
            >
              <FormLabel
                flexGrow={1}
                htmlFor="bioLabel"
              >
                Quel est le nom de votre ferme ?
              </FormLabel>
              <Input
                placeholder={DEFAULT_FARM.title}
                {...register('title')}
              />
            </Flex>
            <Flex
              direction="column"
              gap="3"
              marginBottom="20px"
            >
              <FormLabel
                flexGrow={1}
                htmlFor="bioLabel"
              >
                Pratiquez vous l'agriculture biologique ?
              </FormLabel>
              <SelectBio register={register} />
            </Flex>
            <Flex
              direction="column"
              mt={3}
              mb={3}
            >
              <FormLabel
                flexGrow={1}
                htmlFor="isTVA"
              >
                Souhaitez-vous activer la gestion de la TVA ?
              </FormLabel>
              <Select {...register('isTVA')}>
                <option value="non">NON</option>
                <option value="oui">OUI</option>
              </Select>
            </Flex>
          </ModalBody>
          <ModalFooter>
            <Flex gap={2}>
              <Button
                variant="ghost"
                onClick={onClose}
              >
                Plus tard
              </Button>
              <Button
                colorScheme="blue"
                type="submit"
              >
                Enregistrer
              </Button>
            </Flex>
          </ModalFooter>
        </ModalContent>
      </form>
    </Modal>
  );
}
