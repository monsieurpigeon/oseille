import { Link, useRouteError } from 'react-router-dom';

export function Error() {
  const error = useRouteError() as { message: string };
  console.log(error);
  // Uncaught ReferenceError: path is not defined
  return (
    <div className="w-screen h-screen bg-sky-100 flex items-center justify-center">
      <div className="rounded-xl border shadow-md bg-white p-4">
        <div className="flex gap-4">
          <div className="flex flex-col gap-2">
            <div className="text-xl font-bold">Oups ...</div>
            <div>Ceci est une erreur</div>
            <div className="max-w-prose max-h-96 overflow-y-auto bg-slate-800 text-lime-400 p-8 rounded-lg">
              {error?.message || 'ERROR'}
            </div>
            <div className="grid grid-cols-2 gap-8 bg-slate-50 rounded-lg p-4 border font-semibold">
              <Link
                className="group text-center"
                to="/"
              >
                ⬅️ <span className="group-hover:underline">Retour à l'accueil</span>
              </Link>
              <Link
                className="group text-center"
                to="/about/team"
              >
                📞 <span className="group-hover:underline">Contactez-moi</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
