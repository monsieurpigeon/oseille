import {
  Button,
  Flex,
  FormLabel,
  Image,
  Input,
  Kbd,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Text,
} from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAtom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';
import { useForm } from 'react-hook-form';
import { useRouteLoaderData } from 'react-router-dom';
import { z } from 'zod';
import { Farm, FarmInput, updateFarm } from '../../backend';
import { DEFAULT_FARM, EMPTY_FARM } from '../../utils/defaults';
import { SelectBio } from '../form/SelectBio';
import { SideKickFeeling } from '../modules/sidekick/enums';
import { useSideKick } from '../modules/sidekick/SideKickContext';

const welcomeAtom = atomWithStorage('welcome', true);
const welcomeStepAtom = atomWithStorage('welcome-step', 0);

export function WelcomeModal() {
  const [welcome, setWelcome] = useAtom(welcomeAtom);
  const [welcomeSteps, setWelcomeSteps] = useAtom(welcomeStepAtom);

  const onChangeStep = (step: number) => setWelcomeSteps(step);
  const onClose = () => setWelcome(false);

  return (
    <>
      {welcome && welcomeSteps === 0 && (
        <Modal
          closeOnOverlayClick={false}
          isOpen={true}
          onClose={onClose}
        >
          <ModalOverlay />
          <ModalContent className="no-select">
            <ModalHeader>Bienvenue sur Oseille !</ModalHeader>
            <Image
              src="/maraicher.jpg"
              alt="Maraicher"
              height={300}
              fit="cover"
            />
            <ModalBody>
              <Flex
                gap={4}
                direction="column"
              >
                <Text>
                  Oseille est une application open-source, hors-ligne et gratuite qui vous permet de gérer facilement la
                  facturation de votre ferme.
                </Text>
                <Text>Pas besoin de s'inscrire, vous êtes tout de suite à la maison.</Text>
                <Text>Vos données restent chez vous et sont accessibles même sans internet.</Text>
                <Text>
                  Pensez à exporter régulièrement vos données (bouton <Kbd>Export</Kbd> en haut a droite) et à les
                  stocker en sécurité.
                </Text>
              </Flex>
            </ModalBody>
            <ModalFooter>
              <Button
                colorScheme="blue"
                onClick={() => onChangeStep(1)}
              >
                C'est parti !
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
      {welcome && welcomeSteps === 1 && <WelcomeFormModal />}
    </>
  );
}

const welcomeSchema = z.object({
  title: z.string().min(1),
  bioLabel: z.string(),
  isTVA: z.string(),
});

function WelcomeFormModal() {
  const [, setWelcomeSteps] = useAtom(welcomeStepAtom);
  const onClose = () => setWelcomeSteps(2);
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
