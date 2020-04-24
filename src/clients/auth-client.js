import httpClient from './http';
import { db } from '../config/firebase-config';

const GOOGLE_PROVIDER_ID = 'google.com';
const FACEBOOK_PROVIDER_ID = 'facebook.com';

const isGoogleProvider = ({ providerId }) => providerId === GOOGLE_PROVIDER_ID;
const isFacebookProvider = ({ providerId }) =>
  providerId === FACEBOOK_PROVIDER_ID;

export const createUser = async ({ user, additionalUserInfo }) => {
  const isProvider = Boolean(additionalUserInfo);

  let values = {
    isAdmin: false,
  };

  if (!isProvider) {
    values = {
      ...values,
      firstName: user.firstName,
      lastName: user.lastName,
    };
  }

  if (isGoogleProvider(additionalUserInfo)) {
    const {
      profile: { given_name: firstName, family_name: lastName },
    } = additionalUserInfo;

    values = {
      ...values,
      firstName,
      lastName,
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
    };
  }

  const currentUser = await db.collection('users').doc(user.uid).get();
  if (!currentUser.exists) {
    await db.collection('users').doc(user.uid).set(values);
  }
};

export default {
  createUser,
};
