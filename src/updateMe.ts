export const VERSION = '18/10/2023';

const users = {
  myriam: {
    name: 'Myriam',
    farm: "Les P'tits Poids",
    avatar: '',
    link: 'https://www.facebook.com/lesptitspoids',
  },
  jeremy: {
    name: 'Jeremy',
    farm: "Le Pota'djé",
    avatar: '',
    link: 'https://www.facebook.com/potadje',
  },
  thomas: {
    name: 'Thomas',
    farm: 'Ferme du Méridien',
    avatar: '',
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
  {
    title: 'Rappel des factures en retard',
    user: users.thomas,
    description:
      "Pour plus facilement rappeler aux clients les plus distraits de régler leurs facture, Thomas souhaitait une meilleure visibilité sur les retards de paiement et j'ai ajouté un tableau bilan dans le menu des factures",
  },
  {
    title: 'Gestion des commandes, récolte totale',
    user: users.thomas,
    description:
      "Le matin, Thomas a besoin de connaître la quantité totale de chaque produit à récolter sans se soucier du client. Au lieu de faire des calculs savants il est possible de créer des commandes et d'additionner les produits des commandes sélectionnées. Ces commandes sont ensuite passées en BL",
  },
  {
    title: 'Gestion des paiements améliorée',
    user: users.thomas,
    description:
      "A la fin de la saison, pour passer moins de temps à se gratter la tête avec son comptable, Thomas a besoin de pouvoir ressortir tous les paiements reçu pour chaque facture, j'ai donc amélioré l'enregistrement actuel des paiements pour enregistrer les références nécessaires",
  },
];
