import actionNames from './action-names';

const { CREATE_TASK } = actionNames.task;

export const createTask = ({ name }) => {
  console.log('name ', name);
  return async (dispatch, getState, getFirebase) => {
    const firebase = getFirebase();
    const db = firebase.firestore();

    try {
      const tasks = await db.collection('tasks').doc('').set({
        name,
      });
      console.log('tasks ', tasks);
      // dispatch({ type: CREATE_TASK });
    } catch (error) {
      console.log('create Task', error);
    }
  };
};
