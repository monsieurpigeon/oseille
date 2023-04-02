import { MyH1 } from '../../component/typography/MyFont';

export function BackOffice() {
  return (
    <div className="catalog">
      <div className="catalog-side">
        <div className="catalog-header">
          <MyH1>Back Office</MyH1>
        </div>
        <p>Vous ne devriez pas être la</p>
      </div>
    </div>
  );
}
