import { Navigate } from 'react-router-dom';

export const visitDefault = (route: string) => ({
  index: true,
  element: (
    <Navigate
      to={route}
      replace
    />
  ),
});
