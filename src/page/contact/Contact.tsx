import { ScreenLayout } from '../../component/layout/ScreenLayout';
import {StyledH1} from "../../component/typography/Font";

export function Contact() {
  return (
    <ScreenLayout>
      <StyledH1>Contact</StyledH1>
        <p>Cette application est toujours en developpement.</p>
        <p>Vous pouvez l'essayer mais ne l'utilisez pas encore serieusement</p>
        <p>Si vous avez des questions ou des suggestions, appelez moi : 06 45 66 56 55</p>
    </ScreenLayout>
  );
}
