import React from 'react';
import Header from 'Components/Common/Header';
import Footer from 'Components/Common/Footer';
import { Navigate, Route, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

const UnProtectedRoute = ({ component: Component, ...rest }) => {
  const location = useLocation();
  const { isUserLogin } = useSelector(({ auth }) => auth);
  return (
    <Route>
      {...rest}
      render=
      {props => {
        if (!isUserLogin) {
          return (
            <>
              <Header />
              <div className="main_wrapper">
                <Component {...props} />
              </div>
              <Footer />
            </>
          );
        } else {
          return (
            <>
              <Navigate
                to={{
                  pathname:
                    location && location.pathname
                      ? location.pathname
                      : '/account',
                  state: {
                    from: location,
                  },
                }}
              />
            </>
          );
        }
      }}
    </Route>
  );
};
export default UnProtectedRoute;
