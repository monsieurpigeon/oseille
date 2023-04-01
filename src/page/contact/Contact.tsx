import { ScreenLayout } from '../../component/layout/ScreenLayout';
import { MyH1 } from '../../component/typography/MyFont';

export function Contact() {
  return (
    <ScreenLayout>
      <MyH1>Contact</MyH1>
      <p>Cette application est toujours en développement.</p>
      <p>Si vous avez des questions ou des suggestions, appelez moi : 06 45 66 56 55</p>
      <p>Si vous avez trop d'argent vous pouvez m'envoyer un Lydia.</p>
    </ScreenLayout>
  );
}
