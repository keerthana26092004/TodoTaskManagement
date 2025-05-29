// src/firebaseAuth.js
import { getAuth, signInWithPopup, GoogleAuthProvider, GithubAuthProvider } from 'firebase/auth';
import { app } from './firebase';      // make sure firebase.js exports `app`
import API from './api/api';           // your pre-configured Axios instance

const auth = getAuth(app);

export const loginWithGoogle = async () => {
  const provider = new GoogleAuthProvider();

  // 🔐 Force account selection
  provider.setCustomParameters({
    prompt: 'select_account',
  });

  const { user } = await signInWithPopup(getAuth(app), provider);

  const payload = {
    email: user.email,
    name: user.displayName,
    provider: 'google',
    providerId: user.uid,
  };

  return API.post('/api/users/oauth-login', payload);
};


export const loginWithGithub = async () => {
  const provider = new GithubAuthProvider();
  const { user } = await signInWithPopup(auth, provider);

  const payload = {
    email: user.email,
    name: user.displayName,
    provider: 'github',
    providerId: user.uid,
  };

  return API.post('/api/users/oauth-login', payload);
};
