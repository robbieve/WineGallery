import jwt from 'jsonwebtoken';

const localStorageContent = localStorage.getItem(process.env.REACT_APP_AUTH_LOCAL_STORAGE);

/**
 * Gets auth information to browser local storage and decodes information
 * */
const getLocalStorageToken = () => {

  // Creates token object with null properties in case of error or `localStorage` is undefined
  const tokenObjectNull = { accessToken: null, refreshToken: null, email: null };

  let tokenObject = jwt.verify(
    localStorageContent, process.env.REACT_APP_AUTH_DECODE, (error, decode) => {
      try {
        return decode;
      } catch (e) {

        // Logs error
        error && console.log('error', error);
        e && console.log('e', e);
        return tokenObjectNull;
      }
    }
  );

  // Assigns token object with null properties in case it is `undefined`
  if (!tokenObject) tokenObject = tokenObjectNull;

  return tokenObject;
};

/**
 * Sets encoded auth information to browser local storage
 * @param response
 * @param email
 * */
const setLocalStorageToken = (response, email) => {
  localStorage.setItem(process.env.REACT_APP_AUTH_LOCAL_STORAGE, jwt.sign(
    {
      accessToken: response.data.access_token,
      refreshToken: response.data.refresh_token,
      email,
    },
    `${process.env.REACT_APP_AUTH_DECODE}`
  ));
};

/**
 * Checks if the browser has session stored in local storage
 * @return {boolean}
 * */
const isLoggedIn = () => {

  // TODO: add a check to expired tokens
  const getLocalStorageInfo = getLocalStorageToken();
  return localStorageContent && getLocalStorageInfo;
};

export {
  getLocalStorageToken,
  setLocalStorageToken,
  isLoggedIn,
};