// LoginScreen.js
import React from 'react';
import { View, TouchableOpacity,TextInput, Button, Text, StyleSheet, Keyboard } from 'react-native';
import Routes from './navigation/routes';
// import {firebase} from './config.js';


const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f0f0f0',
  },
  authContainer: {
    width: '80%',
    maxWidth: 400,
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    elevation: 3,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    marginBottom: 16,
    padding: 8,
    borderRadius: 4,
  },
  buttonContainer: {
    marginBottom: 16,
  },
  toggleText: {
    color: '#3498db',
    textAlign: 'center',
  },
  bottomContainer: {
    marginTop: 20,
  },
  emailText: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
  },
});
const AuthScreen = ({ email, setEmail, password, setPassword, isLogin, setIsLogin, handleAuthentication, navigation }) => {
  const handleSignIn = () => {
    navigation.navigate('home');
  };
// const todoRef = firebase.firestore().collection('todo');
// const [addData, setAddData] = useState('');
// const addField = () => {
//   if(addData.length > 0 && addData){
//     const timestamp = firebase.firestore.FieldValue.serverTimestamp();
//     const data = {
//       title: 'test1',
//       createdAt: timestamp,
//     };
//   todoRef
//     .add(data)
//     .then(() => {
//       setAddData('');
//       console.log('Todo added!');
//       Keyboard.dismiss();
//     })
//     .catch((error) => { 
//       alert(error)
//     })
//   }
// }
  const handlePermissionNotification = () => {

    console.log('Permission notification triggered');
  };

  return (
    <View style={styles.container}>
 <Text style={styles.title}>{isLogin ? 'Sign In' : 'Sign Up'}</Text>

<TextInput
  style={styles.input}
  value={email}
  onChangeText={setEmail}
  placeholder="Email"
  autoCapitalize="none"
/>
<TextInput
  style={styles.input}
  value={password}
  onChangeText={setPassword}
  placeholder="Password"
  secureTextEntry
/>
<View style={styles.buttonContainer}>
  <Button title={isLogin ? 'Sign In' : 'Sign Up'} onPress={handleAuthentication} color="#3498db" />
</View>

<View style={styles.bottomContainer}>
  <Text style={styles.toggleText} onPress={() => setIsLogin(!isLogin)}>
    {isLogin ? 'Need an account? Sign Up' : 'Already have an account? Sign In'}
  </Text>
</View>
{/* <TouchableOpacity onPress={addField}>
  <Text>Add</Text>
</TouchableOpacity> */}
    </View>
  );
};


export default AuthScreen;
