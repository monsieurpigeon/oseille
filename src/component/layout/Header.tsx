import { Box, Flex, Select, Spacer, Text } from '@chakra-ui/react';
import { useAtom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';
import { useEffect, useState } from 'react';
import { Link, useRouteLoaderData } from 'react-router-dom';
import { Farm } from '../../backend';
import { ExportAction } from '../../page/settings/sections/advanced-section/actions/ExportAction';
import { Country, DEFAULT_FARM } from '../../utils/defaults';
import { YearAlertModal } from './modals/YearAlertModal';
import { HeaderNavigation } from './Navigation';

export const yearAtom = atomWithStorage('year', '');

export function Header() {
  const { farm, country } = useRouteLoaderData('farm') as { farm: Farm; country: Country };
  const [year, setYear] = useAtom(yearAtom);

  const [openAlertYear, setOpenAlertYear] = useState(false);

  useEffect(() => {
    if (farm && farm.year !== new Date().getFullYear()) {
      setOpenAlertYear(true);
    }
  }, [farm]);

  return (
    <>
      <Flex
        alignItems="center"
        justifyContent="space-between"
        bg="yellow"
        fontWeight="semibold"
        padding="5px 50px"
      >
        <div>Cliquez sur Export pour télécharger la sauvegarde de votre ferme toutes les semaines</div>
        <Box>⤵️</Box>
      </Flex>
      <Flex
        alignItems="center"
        padding="0 20px"
        gap={8}
        borderBottom="4px solid lightcyan"
        h="50"
        marginBottom="20px"
        bg="white"
      >
        <Link to="/">
          <Text fontSize="2xl">Oseille</Text>
        </Link>
        <Spacer />
        <HeaderNavigation />
        <Spacer />
        <Select
          width="inherit"
          value={year}
          onChange={(e) => setYear(e.target.value)}
        >
          <option value="">Tout</option>
          <option value="2025">2025</option>
          <option value="2024">2024</option>
          <option value="2023">2023</option>
          {/* TODO add more years */}
        </Select>
        <Spacer />
        <Link to="/settings/farm/address">
          {farm?.title && (
            <Text as="b">
              {country.flag} {farm?.title?.toUpperCase()}
            </Text>
          )}
          {farm && !farm?.title && <Text as="b">{DEFAULT_FARM.title.toUpperCase()}</Text>}
        </Link>
        <ExportAction />
        <YearAlertModal
          isOpen={openAlertYear}
          onClose={() => setOpenAlertYear(false)}
        />
      </Flex>
    </>
  );
}
