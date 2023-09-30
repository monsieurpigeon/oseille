export const VERSION = '01/10/2023';

const users = {
  myriam: {
    name: 'Myriam',
    farm: "Les P'tits Poids",
    avatar:
      'https://scontent-cdg4-2.xx.fbcdn.net/v/t39.30808-6/309897777_214357800946585_1132889211349622487_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=a2f6c7&_nc_ohc=MIYKjstjCQwAX8TuliD&_nc_ht=scontent-cdg4-2.xx&oh=00_AfDpFOjMlNHsQivvcH25h7Y_Y7OrummoQGDQkJjz4Y_-bw&oe=651DCDAC',
    link: 'https://www.facebook.com/lesptitspoids',
  },
  jeremy: {
    name: 'Jeremy',
    farm: "Le Pota'djé",
    avatar:
      'https://scontent-cdg4-2.xx.fbcdn.net/v/t39.30808-6/331790648_946698469838728_3261562363491866199_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=a2f6c7&_nc_ohc=K2egGXmEBJ0AX9pC2b6&_nc_ht=scontent-cdg4-2.xx&oh=00_AfCo5nazcKpL4asT5OKGH8cAZhCB4EsjTMLLl1cusltM-w&oe=651DEED5',
    link: 'https://www.facebook.com/potadje',
  },
  thomas: {
    name: 'Thomas',
    farm: 'Ferme du Méridien',
    avatar:
      'https://scontent-cdg4-3.xx.fbcdn.net/v/t39.30808-6/309436309_462210849268313_1111800250944277904_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=a2f6c7&_nc_ohc=2iMmeypPxJgAX-3ff8J&_nc_ht=scontent-cdg4-3.xx&oh=00_AfB4oLxyEp-9s93VFfAKic9R3mmQIotaPOeGCZHfHyVA3Q&oe=651DF0D3',
    link: 'https://www.facebook.com/fermedumeridien',
  },
};
export const FEATURES = [
  {
    title: "Première version de l'app",
    user: users.myriam,
    description:
      "Suite à mon message sur un groupe facebook, Myriam m'a exprimé son besoin d'avoir une application simple pour gérer la facturation de son exploitation maraîchère, et nous avons trouvé le nom Oseille ensemble",
  },
  {
    title: 'Gestion du tarif par défaut',
    user: users.thomas,
    description:
      "Après un premier essai, Thomas avait peur d'avoir à passer beaucoup trop de temps à mettre les tarifs à jour et nous avons pensés ensemble à ajouter le tarif par défaut sur chaque produit, tout en gardant le tarif par client",
  },
  {
    title: 'Modification des numéros de documents',
    user: users.myriam,
    description:
      "Afin d'avoir plus de liberté d'édition, Myriam a souhaité pouvoir modifier les numéros de documents (factures et bons de livraison). Je l'ai ajouté dans les paramètres \"dangereux\" de l'application car à utiliser avec beaucoup de précaution",
  },
  {
    title: 'Export des factures en csv',
    user: users.jeremy,
    description:
      "Jeremy souhaitait pouvoir exploiter les données de facturation d'Oseille dans ses tableurs, et nous avons trouvé ensemble un format d'export suffisamment utile pour tout le monde et qui lui permettait de conserver ses outils actuels",
  },
  {
    title: 'Gestion de la TVA',
    user: users.thomas,
    description:
      "Thomas a été le premier utilisateur qui a eu besoin de la gestion de TVA et j'ai pu l'ajouter dans l'application grâce à ses conseils et à ses modèles de factures affichant la TVA",
  },
  {
    title: 'Noter une facture comme payée',
    user: users.jeremy,
    description:
      'Afin de faire le suivi du paiement des factures, Jeremy souhaitait pouvoir les noter comme payées et voir plus facilement les clients à recontacter pour régler les factures en retard',
  },
  {
    title: 'Édition des conditions de retard',
    user: users.jeremy,
    description:
      "Tout le monde n'utilise pas les mêmes délais de paiement avec ses clients, et Jeremy souhaitait pouvoir modifier les conditions pour s'adapter à ses habitudes.",
  },
  {
    title: 'Dashboard des ventes',
    user: users.thomas,
    description:
      "Thomas a l'habitude d'avoir une vue très claire de ses ventes pendant la saison et j'ai fait une première version de dashboard pour avoir un aperçu des ventes dans un tableau",
  },
];
