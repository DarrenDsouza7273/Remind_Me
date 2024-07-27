// App.js
import React, { useState, useEffect } from 'react';
import { ScrollView,StyleSheet,Text } from 'react-native';
import AuthScreen from './AuthScreen';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from '@firebase/auth';
import { initializeApp } from '@firebase/app';
import Routes from './navigation/routes';
import app1 from './firebase';
 //Import your Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyBOZHLUttnveOTMWJLHbFIp5BlhHW3PpLo",
//   authDomain: "remind-me-629.firebaseapp.com",
//   projectId: "remind-me-629",
//   storageBucket: "remind-me-629.appspot.com",
//   messagingSenderId: "344364352337",
//   appId: "1:344364352337:web:59846e2a5d2c17abb68970"
// };
// const app = initializeApp(firebaseConfig);
 const app =app1;
const LoginScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null); // Track user authentication state
  const [isLogin, setIsLogin] = useState(true);

  const auth = getAuth(app);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, [auth]);

  const handleAuthentication = async () => {
    try {
      if (user) {
        // If user is already authenticated, log out
        console.log('User logged out successfully!');
        await signOut(auth);
      } else {
        // Sign in or sign up
        if (isLogin) {
          // Sign in
          await signInWithEmailAndPassword(auth, email, password);
          console.log('User signed in successfully!');
        } else {
          // Sign up
          await createUserWithEmailAndPassword(auth, email, password);
          console.log('User created successfully!');
        }
      }
    } catch (error) {
      console.error('Authentication error:', error.message);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {user ? (
        // Show user's email if user is authenticated
        navigation.navigate('home')
        //<AuthenticatedScreen user={user} handleAuthentication={handleAuthentication} />
      ) : (
        // Show sign-in or sign-up form if user is not authenticated
        <AuthScreen
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          isLogin={isLogin}
          setIsLogin={setIsLogin}
          handleAuthentication={handleAuthentication}
        />
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  // Styles for App
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f0f0f0',
  },
});

export default LoginScreen;
