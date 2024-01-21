import React, {createContext, useEffect, useState} from 'react';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';

GoogleSignin.configure({
  webClientId:
    '558389464794-dpt1odrehn86kk53iqt819nd52qequgh.apps.googleusercontent.com',
});

interface AuthContextProps {
  googleLogin: () => Promise<
    FirebaseAuthTypes.UserCredential | {error: string}
  >;
  user: FirebaseAuthTypes.User | null;
  setUser: React.Dispatch<React.SetStateAction<FirebaseAuthTypes.User | null>>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextProps>({});

interface Props {
  children: React.ReactNode;
}

const AuthProvider: React.FC<Props> = ({children}) => {
  const [initializing, setInitializing] = useState<boolean>(true);
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(currentUser => {
      setUser(currentUser);
      if (initializing) {
        setInitializing(false);
      }
    });
    return subscriber;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Somewhere in your code
  const googleLogin = async (): Promise<
    FirebaseAuthTypes.UserCredential | {error: string}
  > => {
    try {
      // Check if your device supports Google Play
      await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
      // Get the users ID token
      const {idToken} = await GoogleSignin.signIn();
      // Create a Google credential with the token
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);

      // Sign-in the user with the credential
      return auth().signInWithCredential(googleCredential);
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
      } else if (error.code === statusCodes.IN_PROGRESS) {
        return {error: 'login in progress'};
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        return {error: 'play services not available'};
      }
      return {error: 'Login failed'};
    }
  };

  const logout = async () => {
    await GoogleSignin.revokeAccess();
    await GoogleSignin.signOut();
    await auth().signOut();
  };

  if (initializing) {
    return null;
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        googleLogin,
        logout,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
