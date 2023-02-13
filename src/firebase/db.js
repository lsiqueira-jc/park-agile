import { db } from './firebase';

export const getSigninClient = (userId) => {
  return db.ref(`Users/${userId}`).once('value');
};

// export const SigninClientRef = (userId) => {
//   return db.ref(`Clients/${userId}`);
// };

export const onceGetAdmins = (userId) =>
  db.ref(`Admins/${userId}`).once('value');

export const getAllUsers = () => db.ref('Users');

export const refNode = (nodeRef) => db.ref(nodeRef);

export const setToken = (userId, token) => {
  db.ref(`Users/${userId}`).update({ fcmToken: token });
};
