import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { View, StyleSheet, ImageBackground, Image } from 'react-native';
import { Card, Text, Input, Button } from 'galio-framework';
import { Formik} from 'formik';
import * as Yup from 'yup';
import { login, clearErrors } from '../../store/reducers/auth/authenticationSlice';
import { topErrorMsg } from '../../shared/toast';

const validationSchema = Yup.object().shape({
  email: Yup.string().required('Email is required'),
  password: Yup.string().required('Password is required'),
});

const initialValues = { email: '', password: '' };

const LoginScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { error, loading } = useSelector((state) => state.auth);

  useEffect(() => {
    if (error) {
      dispatch(clearErrors());
      topErrorMsg(error);
    }
  }, [dispatch, error]);  // AppNavigator is the one who handles isAuthenticated so no need to navigate

  const onSubmit = (values) => {
    dispatch(login({ email: values.email, password: values.password }));
  };

  return (
    <ImageBackground
      source={require('../../assets/login2.jpg')}
      style={styles.backgroundImage}
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {(formik) => (
          <View style={styles.container}>
            <Card style={styles.card}>
              <View style={styles.header}>
                <Image
                  source={require('../../assets/capstone_logo.png')}
                  style={styles.logo}
                />
                <Text style={styles.cardTitle}>Welcome back!</Text>

              </View>
              <Input
                placeholder="Email"
                rounded
                style={styles.input}
                onChangeText={formik.handleChange('email')}
                onBlur={formik.handleBlur('email')}
                value={formik.values.email}
              />
              {formik.touched.email && formik.errors.email ? (
                <Text style={styles.errorMessage}>{formik.errors.email}</Text>
              ) : null}
              <Input
                placeholder="Password"
                rounded
                password
                style={styles.input}
                onChangeText={formik.handleChange('password')}
                onBlur={formik.handleBlur('password')}
                value={formik.values.password}
              />
              {formik.touched.password && formik.errors.password ? (
                <Text style={styles.errorMessage}>{formik.errors.password}</Text>
              ) : null}
              <Button
                color="primary"
                style={[styles.loginButton, { opacity: !loading ? 1 : 0.5 }]}
                onPress={formik.handleSubmit}
                disabled={loading}
              >
                Log In
              </Button>
              <Text style={styles.dontHaveAccount}>Don't have an account?
                <Text onPress={() => navigation.navigate('Register')} style={styles.registerLink}> Register</Text>
              </Text>

            </Card>

          </View>
        )}
      </Formik>
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
    resizeMode: 'cover',
  },
  card: {
    width: '90%',
    backgroundColor: '#b7fbd0',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 60,
    height: 60,
    borderRadius: 30
  },
  cardTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  input: {
    marginBottom: 5,
    height: 70,
    width: '90%',
    marginRight: 20,
    marginLeft: 20,
    marginTop: 5,
  },
  loginButton: {
    marginBottom: 20,
    height: 60,
    width: '90%',
    borderRadius: 25,
    marginTop: 20
  },
  socialButton: {
    backgroundColor: '#4285F4',
    height: 60,
    width: '80%',
    borderRadius: 25,
    marginBottom: 25,
  },
  socialIcon: {
    alignContent: 'center',
  },
  errorMessage: {
    color: 'red',
    fontSize: 16,
  },
  dontHaveAccount: {
    marginTop: 10,
    fontSize: 16,
    marginBottom: 20

  },
  registerLink: {
    color: 'blue',
    fontSize: 16,
  },
});

export default LoginScreen;
