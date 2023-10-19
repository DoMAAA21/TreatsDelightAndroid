import React from 'react';
import { View, StyleSheet, ImageBackground} from 'react-native';
import { Card, Text, Input, Button, Block } from 'galio-framework';
import Icon from 'react-native-vector-icons/FontAwesome';
// import ks from '../../assets/loginbackground.jpg'
const LoginForm = () => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleLogin = async () => {
    // Implement your login logic here
  };

  return (
    <ImageBackground
    source={require('../../assets/login2.jpg')} // Update the path to your image
    style={styles.backgroundImage}
  >
    <View style={styles.container}>
      <Card style={styles.card}>
        <Text style={styles.cardTitle}>Welcome back!</Text>
        {/* <View > */}
        <Input
          placeholder="Email"
          rounded
          style={styles.input}
        />
        <Input
          placeholder="Password"
          rounded
          password
          style={styles.input}
        />
        <Button
          color="primary"
          style={styles.loginButton}
          onPress={handleLogin}
        >
          Log In
        </Button>
        <Button
          color="google"
          style={styles.socialButton}
        >
          <Icon name="google" size={20} color="white" style={styles.socialIcon} />
        </Button>
        {/* </View> */}
      </Card>
    </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
   
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover', // or 'stretch' for other resizing options
  },
  card: {
    width: '90%',
    backgroundColor: '#b7fbd0',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30
  },
  cardTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  input: {
    marginBottom: 15,
    height: 70,
    width: '90%',
    marginRight: 20,
    marginLeft: 20
  },
  loginButton: {
    marginBottom: 20,
    height: 60,
    width: '80%',
    borderRadius: 25,
  },
  socialButton: {
    backgroundColor: '#4285F4',
    height: 60,
    width: '80%',
    borderRadius: 25,
    marginBottom: 25
  },
  socialIcon: {
    marginRight: 10,
  },
});

export default LoginForm;
