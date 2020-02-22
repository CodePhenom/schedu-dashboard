import firebaseApp from '../firebase-app';

const login = (email, password) => {
  return firebaseApp.auth().signInWithEmailAndPassword(email, password);
};

const signup = (email, password) => {
  return firebaseApp.auth().createUserWithEmailAndPassword(email, password);
};

const logout = async () => {
  try {
    await firebaseApp.auth().signOut();
  } catch (error) {
    console.log('AUTH', error);
  }
};

export { login, signup, logout };
