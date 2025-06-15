import { Navigate, useLocation } from 'react-router-dom';
import { getSessionValue } from 'utils/common';

import { useSelector } from 'react-redux';

const PrivateRouter = ({ children, ...rest }) => {
  const { isUserLogin } = useSelector(({ auth }) => auth);
  const location = useLocation();

  if (!getSessionValue()) {
    return (
      <Navigate
        exact
        to={{
          pathname: '/login',
          state: {
            from: location,
          },
        }}
      />
    );
  }
  return isUserLogin ? (
    <>{children}</>
  ) : (
    <Navigate
      exact
      to={{
        pathname: location && location.pathname ? location.pathname : '/',
        state: {
          from: location,
        },
      }}
    />
  );
};

export default PrivateRouter;
