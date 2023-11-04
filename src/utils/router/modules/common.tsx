import { Navigate } from 'react-router-dom';

export const visitDefault = (route: string) => {
  return {
    index: true,
    element: (
      <Navigate
        to={route}
        replace
      />
    ),
  };
};
