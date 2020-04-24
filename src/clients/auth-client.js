import { db } from '../config/firebase-config';

const PASSWORD_PROVIDER_ID = 'password';
const GOOGLE_PROVIDER_ID = 'google.com';
const FACEBOOK_PROVIDER_ID = 'facebook.com';

export const createUser = async ({
  user,
  additionalUserInfo,
  firstName,
  lastName,
}) => {
  let values = {
    isAdmin: false,
  };

  if (additionalUserInfo.providerId === PASSWORD_PROVIDER_ID) {
    values = {
      ...values,
      firstName: firstName,
      lastName: lastName,
    };
  }

  if (additionalUserInfo.providerId === GOOGLE_PROVIDER_ID) {
    const {
      profile: { given_name: firstName, family_name: lastName },
    } = additionalUserInfo;

    values = {
      ...values,
      firstName,
      lastName,
    };
  }

  if (additionalUserInfo.providerId === FACEBOOK_PROVIDER_ID) {
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
