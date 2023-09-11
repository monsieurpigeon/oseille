import { SettingCard } from '../../../components/SettingCard';
import { ExportAction } from '../../../components/actions/ExportAction';
import { ImportAction } from '../../../components/actions/ImportAction';

export function ImportExportSettingBlock() {
  return (
    <SettingCard title="Export / Import">
      <div>1. Récupérer toute votre base de donnée dans un fichier</div>
      <ExportAction />
      <div>2. Stockez ce fichier en lieu sûr, envoyez le par email, dropbox, etc.</div>
      <div>3. Si besoin rechargez ce fichier dans l'app Oseille vide</div>
      <ImportAction />
    </SettingCard>
  );
}
