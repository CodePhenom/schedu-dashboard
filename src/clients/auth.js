import firebaseApp from '../config/firebase-config';

const login = (email, password) => {
  return firebaseApp.auth().loginWithEmailAndPassword(email, password);
};

const signup = (email, password) => {
  return firebaseApp.auth().createUserWithEmailAndPassword(email, password);
};

const logout = async () => {
  try {
    console.log('logout client');
    await firebaseApp.auth().signOut();
    console.log('logout complete');
  } catch (error) {
    console.log('AUTH', error);
  }
};

export { login, signup, logout };
