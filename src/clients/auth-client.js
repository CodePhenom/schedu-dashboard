import axios from 'axios';

const GOOGLE_PROVIDER_ID = 'google.com';
const FACEBOOK_PROVIDER_ID = 'facebook.com';

const httpClient = axios.create({
  baseURL: process.env.REACT_APP_SCHEDU_API_BASE_URL,
  json: true,
});

const isGoogleProvider = ({ providerId }) => providerId === GOOGLE_PROVIDER_ID;
const isFacebookProvider = ({ providerId }) =>
  providerId === FACEBOOK_PROVIDER_ID;

export const createUser = async ({ user, additionalUserInfo }) => {
  const isProvider = Boolean(additionalUserInfo);

  let values = {
    id: user.uid,
    email: user.email,
    isAdmin: false,
    isEmailVerified: false,
  };

  if (!isProvider) {
    values = {
      ...values,
      firstName: user.firstName,
      lastName: user.lastName,
    };
    return httpClient.post('/users', values);
  }

  if (isGoogleProvider(additionalUserInfo)) {
    const {
      profile: { given_name: firstName, family_name: lastName },
    } = additionalUserInfo;

    values = {
      ...values,
      firstName,
      lastName,
      photoUrl: user.photoURL,
    };
  }

  if (isFacebookProvider(additionalUserInfo)) {
    const {
      profile: { first_name: firstName, last_name: lastName },
    } = additionalUserInfo;

    values = {
      ...values,
      firstName,
      lastName,
      photoUrl: user.photoURL,
    };
  }

  return httpClient.post('/users', values);
};

export default {
  createUser,
};
