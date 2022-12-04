import { MyScreenLayout } from '../../component/layout/MyScreenLayout';
import { StyledH1 } from '../../component/typography/MyFont';

export function Contact() {
  return (
    <MyScreenLayout>
      <StyledH1>Contact</StyledH1>
      <p>Cette application est toujours en developpement.</p>
      <p>Si vous avez des questions ou des suggestions, appelez moi : 06 45 66 56 55</p>
    </MyScreenLayout>
  );
}
