import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { View, StyleSheet, ScrollView, Image, Dimensions } from 'react-native';
import { Text, Input, Block, Button, Icon, } from 'galio-framework';
import * as ImagePicker from 'expo-image-picker';
import { Picker } from '@react-native-picker/picker';
import { Formik, Field } from 'formik';
import * as Yup from 'yup';
import * as ImageManipulator from 'expo-image-manipulator';
import Toast from 'react-native-toast-message';
import axios from 'axios';
import { newUserReset } from '../../store/reducers/user/newUserSlice';
import { newUser } from '../../store/reducers/user/newUserSlice';
import { BACKEND_URL } from '../../constants/constants';
import { ActivityIndicator } from 'react-native';
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

const MyInput = ({ field, form, ...props }) => (
    <Input
        {...props}
        onChangeText={field.onChange(field.name)}
        onBlur={field.onBlur(field.name)}
        value={field.value}
        style={{ fontSize: inputSize, height: inputSize, width: '100%' }}
    />
);

const successMsg = (message) => {
    Toast.show({
        text1: 'Success',
        text2: `${message}`,
        type: 'success',
        position: 'bottom',
        visibilityTime: 4000,
        autoHide: true,
        topOffset: 30,
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

const errorMsg = (message) => {
    Toast.show({
        text1: 'Error',
        text2: `${message}`,
        type: 'error',
        position: 'bottom',
        visibilityTime: 4000,
        autoHide: true,
        topOffset: 30,
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
const AddUserScreen = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const { loading, error, success } = useSelector(state => state.newUser);
    const [avatar, setAvatar] = useState('');
    const [avatarPreview, setAvatarPreview] = useState(null);
    const [selectedRole, setSelectedRole] = useState('');
    const [storeDropdown, setStoreDropdown] = useState([]);
    const [loadingOptions, setLoadingOptions] = useState(false);

    const courses = [
        { label: 'BS in Information Technology', value: 'BSIT' },
        { label: 'BS in Civil Engineering', value: 'CE' },
    ];
    const religions = ['Catholic', 'Muslim', 'Iglesia ni Cristo'];
    const roles = ["User", "Employee"];

    const fetchStores = () => {
        axios.get(`${BACKEND_URL}/api/v1/admin/stores`)
            .then((response) => {
                const storeData = response.data.stores;
                const options = storeData.map((store) => ({
                    value: store._id,
                    label: store.name,
                }));
                setStoreDropdown(options);
                setLoadingOptions(true);
            })
            .catch((error) => {
                console.error('Error fetching store data:', error);
                setLoadingOptions(false);
            });
    }

    useEffect(() => {

        fetchStores();
        if (error) {
            errorMsg(error)
            dispatch(newUserReset())
        }

        if (success) {
            navigation.navigate('Users');
            dispatch(newUserReset())
            successMsg('User created successfully');
        }
    }, [dispatch, error, success, navigation])


    const selectImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [3, 2],
            quality: 1,
        });

        if (!result.canceled) {
            const selectedAsset = result.assets[0];


            const manipulatorOptions = {
                compress: 0.5,
                format: ImageManipulator.SaveFormat.JPEG,
                base64: true,
            };

            // Manipulate the image
            const manipulatedImage = await ImageManipulator.manipulateAsync(
                selectedAsset.uri,
                [],
                manipulatorOptions
            );


            if (manipulatedImage) {
                const { uri, base64 } = manipulatedImage;
                setAvatarPreview(uri)
                setAvatar(`data:image/jpg;base64,${base64}`);
            }
        }
    };



    const initialValues = {
        fname: '',
        lname: '',
        email: '',
        password: '',
        role: '',
        course: '',
        religion: '',
    };

    const onSubmit = (values) => {

        const userData = {
            fname: values.fname,
            lname: values.lname,
            email: values.email,
            password: values.password,
            course: values.course,
            religion: values.religion,
            role: values.role,
            avatar
        }
        if (values.role === "Employee" && values.store) {
            const selectedStoreValue = values.store.split('-');
            const storeId = selectedStoreValue[0];
            const storeName = selectedStoreValue[1];
            userData.storeId = storeId;
            userData.storeName = storeName;
        }

        dispatch(newUser(userData));
    };





    return (
        <ScrollView contentContainerStyle={styles.scrollViewContainer}>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
            >
                {(formik) => (

                    <View style={styles.container}>
                        <Block style={styles.formContainer}>
                            <Text h5 style={styles.formHeader}>
                                User Registration
                            </Text>
                            <Field
                                name="fname"
                                placeholder="First Name"
                                component={MyInput}
                            />
                            {formik.touched.fname && formik.errors.fname ? (
                                <Text style={styles.errorMessage}>{formik.errors.fname}</Text>
                            ) : null}
                            <Field
                                name="lname"
                                placeholder="Last Name"
                                component={MyInput}
                            />
                            {formik.touched.lname && formik.errors.lname ? (
                                <Text style={styles.errorMessage}>{formik.errors.lname}</Text>
                            ) : null}
                            <Field
                                name="email"
                                placeholder="Email"
                                keyboardType="email-address"
                                component={MyInput}
                            />
                            {formik.touched.email && formik.errors.email ? (
                                <Text style={styles.errorMessage}>{formik.errors.email}</Text>
                            ) : null}
                            <Field
                                name="password"
                                placeholder="Password"
                                secureTextEntry
                                component={MyInput}
                            />
                            {formik.touched.password && formik.errors.password ? (
                                <Text style={styles.errorMessage}>{formik.errors.password}</Text>
                            ) : null}
                            <View style={styles.inputContainer}>
                                <Field name="course">
                                    {({ field }) => (
                                        <View style={styles.inputContainer}>
                                            <Text>Course</Text>
                                            <Picker
                                                selectedValue={field.value}
                                                onValueChange={field.onChange('course')}
                                            >
                                                <Picker.Item label="Choose Option" value="" />

                                                {courses.map((courseOption) => (
                                                    <Picker.Item label={courseOption.label} value={courseOption.value} key={courseOption.value} />
                                                ))}
                                            </Picker>
                                        </View>
                                    )}
                                </Field>
                                {formik.touched.course && formik.errors.course ? (
                                    <Text style={styles.errorMessage}>{formik.errors.course}</Text>
                                ) : null}
                            </View>

                            <View style={styles.inputContainer}>
                                <Field name="religion">
                                    {({ field }) => (
                                        <View style={styles.inputContainer}>
                                            <Text>Religion</Text>
                                            <Picker
                                                selectedValue={field.value}
                                                onValueChange={field.onChange('religion')}
                                            >
                                                <Picker.Item label="Choose Option" value="" />
                                                {religions.map((religionOption) => (
                                                    <Picker.Item label={religionOption} value={religionOption} key={religionOption} />
                                                ))}
                                            </Picker>
                                        </View>
                                    )}
                                </Field>
                                {formik.touched.religion && formik.errors.religion ? (
                                    <Text style={styles.errorMessage}>{formik.errors.religion}</Text>
                                ) : null}
                            </View>

                            <View style={styles.inputContainer}>
                                <Field name="role">
                                    {({ field }) => (
                                        <View style={styles.inputContainer}>
                                            <Text>Role</Text>
                                            <Picker
                                                selectedValue={field.value}
                                                onValueChange={(itemValue) => {
                                                    field.onChange('role')(itemValue);
                                                    setSelectedRole(itemValue);
                                                }}
                                            >
                                                <Picker.Item label="Choose Option" value="" />
                                                {roles.map((roleOption) => (
                                                    <Picker.Item label={roleOption} value={roleOption} key={roleOption} />
                                                ))}
                                            </Picker>
                                        </View>
                                    )}
                                </Field>
                                {formik.touched.role && formik.errors.role ? (
                                    <Text style={styles.errorMessage}>{formik.errors.role}</Text>
                                ) : null}
                            </View>

                            {selectedRole === 'Employee' && loadingOptions ? (
                                <View style={styles.inputContainer}>
                                    <Field name="store">
                                        {({ field }) => (
                                            <View style={styles.inputContainer}>
                                                <Text>Store</Text>
                                                <Picker
                                                    selectedValue={field.value}
                                                    onValueChange={field.onChange('store')}
                                                >
                                                    <Picker.Item label="Choose Option" value="" />
                                                    {storeDropdown.map((option) => (
                                                        <Picker.Item label={option.label} value={`${option.value}-${option.label}`} key={option.value} />
                                                    ))}
                                                </Picker>
                                            </View>
                                        )}
                                    </Field>
                                </View>

                            ) : null}



                            <View style={styles.imagePickerContainer}>
                                {avatarPreview ? (
                                    <Image source={{ uri: avatarPreview }} style={styles.avatar} />
                                ) : null}

                                <Button
                                    color="info"
                                    style={styles.imagePickerButton}
                                    onPress={selectImage}
                                >
                                    <Block row middle>
                                        <Icon
                                            family="FontAwesome"
                                            size={16}
                                            name="camera"
                                            color="white"
                                            style={{ marginRight: 5 }}
                                        />
                                        <Text color="white">Choose Avatar</Text>
                                    </Block>
                                </Button>
                            </View>

                            <Button
                                round
                                color="success"
                                style={[styles.submitButton, { opacity: formik.isValid && !loading ? 1 : 0.5 }]}
                                onPress={formik.handleSubmit}
                                disabled={!formik.isValid || loading}
                            >
                                Submit
                            </Button>
                        </Block>
                    </View>

                )}
            </Formik>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    scrollViewContainer: {
        flexGrow: 1
    },
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    formContainer: {
        backgroundColor: 'transparent',
    },
    formHeader: {
        marginBottom: 20,
        textAlign: 'center',
        color: '#333',
    },
    imagePickerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    imagePickerButton: {
        flex: 1,
        backgroundColor: '#16aec1',
        marginRight: 10,
        height: inputSize,
    },
    avatar: {
        width: 100,
        height: 100,
        marginTop: 10,
        alignSelf: 'center',
    },
    submitButton: {
        marginTop: 20,
        width: '100%',
        height: inputSize,
        alignSelf: 'center',
    },
    inputContainer: {
        marginVertical: 10,
    },
    errorMessage: {
        color: 'red'
    }
});

export default AddUserScreen;
