import { usePostHog } from 'posthog-js/react';
import { useEffect } from 'react';
import { styled } from 'styled-components';
import { MyH1 } from '../../component/typography/MyFont';
import { PriceTable } from './PriceTable';

const StyledPricePage = styled.div`
  display: grid;
  position: relative;
  padding: 0 20px;
  grid-template-columns: 1fr;
  grid-template-rows: auto 600px;
`;

export function PricePage() {
  const posthog = usePostHog();
  useEffect(() => {
    posthog?.capture('price_page_viewed');
  }, []);

  return (
    <StyledPricePage>
      <MyH1>Tarifs</MyH1>
      <PriceTable />
    </StyledPricePage>
  );
}
