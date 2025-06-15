import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import Routes from 'routes/index';
import { BrowserRouter } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import GetCookies from 'hooks/GetCookies';
import { setIsUserLogin } from 'store/reducers/auths.slice';
import RemoveCookies from 'hooks/RemoveCookies';
import SetCookies from 'hooks/SetCookies';
import { getVenueListData } from 'store/reducers/Venue/venue.slice';
import { getAboutListData } from 'store/reducers/About/about.slice';

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

export function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const values = GetCookies('Token');
    if (values) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${atob(values)}`;
      dispatch(setIsUserLogin(true));
      RemoveCookies('Token');
      SetCookies('Token', btoa(atob(values)));
    }
  }, [dispatch]);

  const { i18n } = useTranslation();

  useEffect(() => {
    dispatch(getVenueListData());
    dispatch(getAboutListData());
  }, [dispatch]);
  return (
    <BrowserRouter>
      <Helmet
        titleTemplate="%s - React Boilerplate"
        defaultTitle="React Boilerplate"
        htmlAttributes={{ lang: i18n.language }}
      >
        <meta name="description" content="A React Boilerplate application" />
      </Helmet>
      <Routes />
    </BrowserRouter>
  );
}
