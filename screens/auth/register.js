import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { View, StyleSheet, ImageBackground, Dimensions } from 'react-native';
import { Card, Text, Input, Button } from 'galio-framework';
import { Formik, Field } from 'formik';
import * as Yup from 'yup';
import Icon from 'react-native-vector-icons/FontAwesome';
import Toast from 'react-native-toast-message';
import { Picker } from '@react-native-picker/picker';
import { registerUser, clearErrors } from '../../store/reducers/auth/authenticationSlice';


const screenHeight = Dimensions.get('window').height;
const inputSize = screenHeight * 0.07;
const validationSchema = Yup.object({
    fname: Yup.string().required('First Name is required'),
    lname: Yup.string().required('Last Name is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
    religion: Yup.string().required('Religion is required'),
    course: Yup.string().required('Course is required'),
    role: Yup.string().required('Role is required'),
});

const initialValues = {
    fname: '',
    lname: '',
    email: '',
    password: '',
    role: '',
    course: '',
    religion: '',
};

const religions = ['Catholic', 'Muslim', 'Iglesia ni Cristo'];
const courses = [
    { label: 'BS in Information Technology', value: 'BSIT' },
    { label: 'BS in Civil Engineering', value: 'CE' },
];

const RegisterScreen = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const { isAuthenticated, error, loading } = useSelector((state) => state.auth);

    useEffect(() => {
        if (isAuthenticated) {
            navigation.navigate('Users');
        }
        if (error) {
            dispatch(clearErrors());
            errorMsg(error);
        }
    }, [dispatch, isAuthenticated, error]);

    const onSubmit = (values) => {
        const userData = {
            fname: values.fname,
            lname: values.lname,
            email: values.email,
            password: values.password,
            course: values.course,
            religion: values.religion,
        }
        dispatch(registerUser(userData));
    };

    const errorMsg = (message) => {
        Toast.show({
            text1: 'Error',
            text2: `${message}`,
            type: 'error',
            position: 'top',
            visibilityTime: 4000,
            autoHide: true,
            topOffset: 50,
            bottomOffset: 40,
            customStyles: {
                title: {
                    fontSize: 30,
                    fontWeight: 'bold',
                },
                message: {
                    fontSize: 24,
                    fontWeight: 'bold',
                },
            },
        });
    };

    return (
        <ImageBackground
            source={require('../../assets/login3.jpg')}
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

                            <Text style={styles.cardTitle}>Register</Text>
                            <Input
                                placeholder="First Name"
                                rounded
                                style={styles.input}
                                onChangeText={formik.handleChange('fname')}
                                onBlur={formik.handleBlur('fname')}
                                value={formik.values.fname}
                            />
                            {formik.touched.fname && formik.errors.fname ? (
                                <Text style={styles.errorMessage}>{formik.errors.fname}</Text>
                            ) : null}
                            <Input
                                placeholder="Last Name"
                                rounded
                                style={styles.input}
                                onChangeText={formik.handleChange('lname')}
                                onBlur={formik.handleBlur('lname')}
                                value={formik.values.lname}
                            />
                            {formik.touched.lname && formik.errors.lname ? (
                                <Text style={styles.errorMessage}>{formik.errors.lname}</Text>
                            ) : null}

                            <View style={styles.inputContainer}>
                                <Text style={styles.label}>Religion</Text>
                                <View style={styles.pickerContainer}>
                                    <Picker
                                        selectedValue={formik.values.religion}
                                        onValueChange={formik.handleChange('religion')}
                                        style={styles.picker}
                                    >
                                        <Picker.Item label="Choose Option" value="" />
                                        {religions.map((religionOption) => (
                                            <Picker.Item label={religionOption} value={religionOption} key={religionOption} />
                                        ))}
                                    </Picker>
                                </View>
                                
                            </View>
                            {formik.touched.religion && formik.errors.religion ? (
                                    <Text style={styles.errorMessage}>{formik.errors.religion}</Text>
                                ) : null}



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
                                Register
                            </Button>
                            <Button
                                color="google"
                                style={styles.socialButton}
                            >
                                <Icon name="google" size={20} color="white" style={styles.socialIcon} />
                            </Button>
                            <Text style={styles.dontHaveAccount}>Already have an account?
                                <Text onPress={() => navigation.navigate('Login')} style={styles.registerLink}> Login</Text>
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
        borderRadius: 15,
    },
    loginButton: {
        marginBottom: 20,
        height: 60,
        width: '80%',
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
    inputContainer: {
        marginVertical: 10,
    },
    label: {
        fontSize: 15,
        marginBottom: 5,
    },
    pickerContainer: {
        borderWidth: 0.5,
        borderColor: '#000000',
        borderRadius: 15,
        height: inputSize * 1.1,
        width: inputSize * 5.5,
        backgroundColor: "#ffffff"
    },
    picker: {
        height: inputSize,
    },

});

export default RegisterScreen;
