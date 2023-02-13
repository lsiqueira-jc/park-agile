import React, { createContext, useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { api } from '../api';
import { auth, db, firebase } from '../firebase';

export const authContext = createContext({});

export function AuthContextProvider(props) {
  const [loadingClientData, setLoadingClientData] = useState(false);

  const [loadingLogin, setLoadingLogin] = useState(false);
  const [loadingRegister, setLoadingRegister] = useState(false);
  const [statusRegister, setStatusRegister] = useState('Cadastrar');
  const [statusLogin, setStatusLogin] = useState('Entrar');
  const [user, setUser] = useState();
  const [dataUser, setDataUser] = useState();

  const [authenticatedUser, setAuthenticatedUser] = useState(() => {
    const user = firebase.auth.currentUser;

    return user;
  });
  const [loadingAuthenticatedUser, setLoadingAuthenticatedUser] =
    useState(true);

  useEffect(() => {
    firebase.auth.onAuthStateChanged(async (firebaseUser) => {
      if (firebaseUser) {
        setAuthenticatedUser(firebaseUser);
        setLoadingAuthenticatedUser(false);
        const userRef = await (
          await db.getSigninClient(firebaseUser.uid)
        ).val();
        console.log(
          '🚀 ~ file: AuthContext.js:34 ~ firebase.auth.onAuthStateChanged ~ userRef',
          userRef,
        );
        if (userRef) {
          setUser(userRef);
        }
        return;
      } else {
        setAuthenticatedUser(null);
        setLoadingAuthenticatedUser(false);
      }
    });
  }, []);

  async function getDataUser() {
    return new Promise(async (resolve, reject) => {
      const authToken = await auth.getAuthUserToken();

      try {
        let parameters = {
          searchFunctionality: 'getDataUser',
          userType: 'egua',
          userId:
            authenticatedUser && authenticatedUser.uid
              ? authenticatedUser.uid
              : '',
        };
        const requestConfig = {
          headers: { Authorization: authToken },
        };
        const { data } = await api.post('/search', parameters, requestConfig);

        if (data.success) {
          if (data) {
            setDataUser(data.data);
            console.log('setou aqui', dataUser);
            return;
          }
        }
      } catch (error) {
        Alert.alert(`Atenção`, `Erro ao buscar animais`, [{ text: 'OK' }]);
      }
    });
  }
  async function updateUser(dataUser) {
    return new Promise(async (resolve, reject) => {
      const authToken = await auth.getAuthUserToken();

      try {
        let parameters = {
          data: dataUser,
          searchFunctionality: 'updateUser',
          userType: 'egua',
          userId:
            authenticatedUser && authenticatedUser.uid
              ? authenticatedUser.uid
              : '',
        };
        const requestConfig = {
          headers: { Authorization: authToken },
        };
        const { data } = await api.post('/update', parameters, requestConfig);

        if (data.success) {
          if (data) {
            // Alert.alert(`Sucesso!`, `${data.message}`, [{ text: 'OK' }])
            return resolve(data);
          }
        }
      } catch (error) {
        Alert.alert(`Atenção`, `Erro ao buscar animais`, [{ text: 'OK' }]);
      }
    });
  }

  async function registerUserEgua(
    nameAnimal,
    nameResponsible,
    numberRegister,
    email,
    password,
  ) {
    return new Promise(async (resolve, reject) => {
      setLoadingRegister(true);
      setStatusRegister('Cadastrando...');
      try {
        let user = {
          nameAnimal,
          nameResponsible,
          numberRegister,
          email,
          password,
        };
        let parameters = {
          user,
          typeUser: 'registerEgua',
        };
        const { data } = await api.post(`/createUser`, parameters);

        if (data.success) {
          setLoadingRegister(false);
          setStatusRegister('Cadastrar');
          resolve(data);
        } else {
          setStatusRegister('Cadastrar');
          Alert.alert(`Atenção`, `${data.message}`, [{ text: 'OK' }]);
        }
      } catch (error) {
        console.log('error: register', error);
      }
    });
  }
  async function registerUserCavalo(
    // nameAnimal: string,
    nameResponsible,
    // numberRegister: number,
    email,
    password,
  ) {
    return new Promise(async (resolve, reject) => {
      setLoadingRegister(true);
      setStatusRegister('Cadastrando...');
      try {
        let user = {
          // nameAnimal,
          nameResponsible,
          // numberRegister,
          email,
          password,
        };
        let parameters = {
          user,
          typeUser: 'registerHaras',
        };
        const { data } = await api.post(`/createUser`, parameters);

        if (data.success) {
          setLoadingRegister(false);
          setStatusRegister('Cadastrar');
          Alert.alert(`Atenção`, `${data.message}`, [{ text: 'OK' }]);
          resolve(data);
        } else {
          setStatusRegister('Cadastrar');
          Alert.alert(`Atenção`, `${data.message}`, [{ text: 'OK' }]);
        }
      } catch (error) {
        console.log('error: register', error);
      }
    });
  }

  async function loginUser(email, password) {
    return new Promise(async (resolve, reject) => {
      setLoadingLogin(true);
      setStatusLogin('Entrando...');
      console.log(email, password);

      try {
        const responseUserAuth = await auth.doSignInWithEmailAndPassword(
          email,
          password,
        );

        if (responseUserAuth.success) {
          setStatusLogin('Entrar');

          if (!responseUserAuth) {
            setLoadingLogin(false);
            alert('Email ou senha incorreto.');
            return;
          }
          setUser(responseUserAuth.data);
          return resolve(responseUserAuth.data);
        } else {
          setLoadingLogin(false);
          console.log('erroo-->', responseUserAuth);
        }
      } catch (error) {
        setLoadingLogin(false);
        setStatusLogin('Login');
        console.log('loginUser-->', error);
        let errorMsg = '';
        if (error.code === 'auth/wrong-password') {
          errorMsg = 'E-mail ou senha incorretos.';
        } else if (
          error.code === 'auth/account-exists-with-different-credential'
        ) {
          errorMsg = 'Já existe uma conta com o e-mail informado.';
        } else if (
          error.message ===
          'Você não está autorizado a fazer login nesse momento. Contate o administrador para mais informações.'
        ) {
          errorMsg = 'E-mail não cadastrado para este cliente.';
        } else {
          errorMsg = 'E-mail ou senha incorretos.';
        }

        alert(errorMsg);
      }
    });
  }
  async function signOut() {
    setUser({});
    console.log('clicou em sairr');
    auth.doSignOut().then(() => {
      setUser({});
    });
  }

  return (
    <authContext.Provider
      value={{
        loginUser,
        registerUserEgua,
        user,
        statusRegister,
        loadingClientData,
        loadingLogin,
        statusLogin,
        authenticatedUser,
        loadingAuthenticatedUser,
        signOut,
        dataUser,
        setDataUser,
        registerUserCavalo,
        updateUser,
        setUser,
        getDataUser,
      }}
    >
      {props.children}
    </authContext.Provider>
  );
}
