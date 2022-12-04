import styled from 'styled-components';
import { ScreenLayout } from '../../component/layout/ScreenLayout';
import { StyledH1, StyledH2, StyledLink, StyledSubtitle, StyledUl } from '../../component/typography/Font';

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export function Home() {
  return (
    <ScreenLayout>
      <StyledContainer>
        <StyledH1>Bienvenue sur Oseille</StyledH1>
        <StyledSubtitle>L'application qui aide les maraîchers à gérer leur argent</StyledSubtitle>
        <p>Application gratuite, en code libre, et qui marche sans internet</p>
        <StyledSubtitle>
          Attention : Cette application est toujours en développement et va connaitre de gros changements jusqu'à nouvel
          ordre
        </StyledSubtitle>
        <StyledSubtitle>
          Pour l'instant, des donnees de test seront utilise a chaque rechargement de la page
        </StyledSubtitle>
        <StyledH2>Fonctionnalités :</StyledH2>
        <StyledUl>
          <li>Gérer une liste de produits avec un prix</li>
          <li>Gérer une liste de clients</li>
          <li>Changer les prix des produits facilement</li>
          <li>Générer un bon de livraison</li>
          <li>Calcul automatique des lignes de livraison</li>
          <li>Grouper des bons de livraison en une facture</li>
          <li>Export .pdf des bons de livraison et des factures</li>
          <li>Import/Export de capsules temporelles pour protéger la data sur un autre support</li>
          <li>... et ensuite ...</li>
          <li>Gérer le status des documents (envoyé, payé)</li>
          <li>Suivi des ventes par client et par produit</li>
          <li>... Plein d'autres choses ...</li>
          <li>Gestion des paniers en click-and-collect personnalisé</li>
          <li>... Envoyez moi vos idées</li>
        </StyledUl>
        <div>
          <StyledLink
            href="https://www.facebook.com/maxime.pigeon/"
            target="_blank"
          >
            Facebook
          </StyledLink>
          <StyledLink
            href="https://www.linkedin.com/in/maxime-pigeon/"
            target="_blank"
          >
            Linkedin
          </StyledLink>
        </div>
      </StyledContainer>
    </ScreenLayout>
  );
}
