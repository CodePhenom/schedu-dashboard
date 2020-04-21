import httpClient from './http';

const GOOGLE_PROVIDER_ID = 'google.com';
const FACEBOOK_PROVIDER_ID = 'facebook.com';

const isGoogleProvider = ({ providerId }) => providerId === GOOGLE_PROVIDER_ID;
const isFacebookProvider = ({ providerId }) =>
  providerId === FACEBOOK_PROVIDER_ID;

export const createUser = async ({ user, additionalUserInfo }) => {
  const isProvider = Boolean(additionalUserInfo);

  let values = {
    id: user.uid,
    email: user.email,
    isAdmin: false,
    isEnable: true,
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
      profile: { given_name: firstName, family_name: lastName, verified_email },
    } = additionalUserInfo;

    values = {
      ...values,
      firstName,
      lastName,
      isEmailVerified: verified_email,
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
      isEmailVerified: true,
      photoUrl: user.photoURL,
    };
  }

  return httpClient.post('/users', values);
};

export default {
  createUser,
};
