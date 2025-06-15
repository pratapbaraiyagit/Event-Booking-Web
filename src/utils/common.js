import GetCookies from 'hooks/GetCookies';

export const getSessionValue = () => {
  const sessionData = GetCookies('Token');
  if (sessionData) {
    return true;
  } else {
    return false;
  }
};
