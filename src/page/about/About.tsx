import { CheckIcon, RepeatIcon, TimeIcon } from '@chakra-ui/icons';
import { List, ListIcon, ListItem } from '@chakra-ui/react';
import { NavLink } from 'react-router-dom';
import { MyHeader } from '../../component/layout/page-layout/MyHeader';
import { MyPage } from '../../component/layout/page-layout/MyPage';
import { MyScrollList } from '../../component/layout/page-layout/MyScrollList';
import { MySide } from '../../component/layout/page-layout/MySide';
import { MyH1, MyH2, MySubtitle } from '../../component/typography/MyFont';

type Status = 'todo' | 'doing' | 'done';

const TODO_ITEMS: Array<{ text: string; status: Status }> = [
  { text: 'Gérer une liste de produits', status: 'done' },
  { text: 'Gérer une liste de clients', status: 'done' },
  { text: 'Gérer une liste de prix par client', status: 'done' },
  { text: 'Changer les prix des produits facilement', status: 'done' },
  { text: 'Générer un bon de livraison', status: 'done' },
  { text: 'Calcul automatique des lignes de livraison', status: 'done' },
  { text: 'Grouper des bons de livraison en une facture', status: 'done' },
  { text: 'Export .pdf des bons de livraison et des factures', status: 'done' },
  { text: 'Import/Export de capsules temporelles pour protéger la data sur un autre support', status: 'done' },
];

const NEXT: Array<{ text: string; status: Status }> = [
  { text: 'Gérer le statut des documents (envoyé, payé)', status: 'todo' },
  { text: 'Suivi des ventes par client et par produit', status: 'todo' },
];

const ROADMAP: Array<{ text: string; status: Status }> = [
  { text: 'Gestion des paniers en click-and-collect personnalisé', status: 'todo' },
  { text: 'Assolement, cahier de culture', status: 'todo' },
];

// TODO add a better typing to keep only Status as key
const statusIcon: { [key: string]: { icon: typeof CheckIcon; color: string } } = {
  done: { icon: CheckIcon, color: 'green.500' },
  doing: { icon: RepeatIcon, color: 'blue.500' },
  todo: { icon: TimeIcon, color: 'yellow.500' },
};
export function About() {
  return (
    <>
      <MyPage>
        <MySide>
          <MyHeader>
            <MyH1>Bienvenue sur Oseille</MyH1>
          </MyHeader>
          <MyScrollList>
            <MySubtitle>L'application qui aide les maraîchers à gérer leurs factures</MySubtitle>
            <MySubtitle>Application gratuite, en code libre, et qui marche sans internet</MySubtitle>
            <p>
              <span className="bold">Attention</span> : Cette application est toujours en développement et va connaître
              de gros changements jusqu'à nouvel ordre
            </p>
            <p className="bold">
              Faites régulièrement des exports depuis la page <NavLink to="settings">Réglages</NavLink>.
            </p>
          </MyScrollList>
        </MySide>
        <MySide>
          <MyH2>Fonctionnalités :</MyH2>
          <List spacing={3}>
            {TODO_ITEMS.map((item) => (
              <TodoItem
                key={item.text}
                item={item}
              />
            ))}
            <ListItem listStyleType="none">... et ensuite...</ListItem>
            {NEXT.map((item) => (
              <TodoItem
                key={item.text}
                item={item}
              />
            ))}
            <ListItem listStyleType="none">... Plein d'autres choses...</ListItem>
            {ROADMAP.map((item) => (
              <TodoItem
                key={item.text}
                item={item}
              />
            ))}
            <ListItem listStyleType="none">... Dites moi de quoi vous avez besoin.</ListItem>
          </List>
        </MySide>
      </MyPage>
    </>
  );
}

function TodoItem({ item }: { item: { text: string; status: string } }) {
  return (
    <ListItem>
      <ListIcon
        as={statusIcon[item.status].icon}
        color={statusIcon[item.status].color}
      />
      {item.text}
    </ListItem>
  );
}
