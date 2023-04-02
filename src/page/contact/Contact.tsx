import { MyH1 } from '../../component/typography/MyFont';

export function Contact() {
  return (
    <div className="catalog">
      <div className="catalog-side">
        <div className="catalog-header">
          <MyH1>Contact</MyH1>
        </div>
        <div className="catalog-list">
          <p>Cette application est toujours en développement.</p>
          <p>Si vous avez des questions ou des suggestions, appelez moi : 06 45 66 56 55</p>
          <p>Si vous avez trop d'argent vous pouvez m'envoyer un Lydia.</p>
        </div>
      </div>
    </div>
  );
}
