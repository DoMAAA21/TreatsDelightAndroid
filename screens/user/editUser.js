import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation, useRoute } from '@react-navigation/native';
import { View, StyleSheet, ScrollView, Image, ActivityIndicator, Dimensions } from 'react-native';
import { Text, Input, Block, Button, Icon } from 'galio-framework';
import * as ImagePicker from 'expo-image-picker';
import { Picker } from '@react-native-picker/picker';
import { Formik, Field } from 'formik';
import * as Yup from 'yup';
import * as ImageManipulator from 'expo-image-manipulator';
import axios from 'axios';
import { getUserDetails } from '../../store/reducers/user/userDetailsSlice';
import { updateUser, clearErrors } from '../../store/reducers/user/userSlice';
import { BACKEND_URL } from '../../shared/constants';
import { courses, religions, roles } from '../../shared/inputs';
import { errorMsg } from '../../shared/toast';
const screenHeight = Dimensions.get('window').height;
const inputSize = screenHeight * 0.07;

const validationSchema = Yup.object({
    fname: Yup.string().required('First Name is required'),
    lname: Yup.string().required('Last Name is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
    religion: Yup.string().required('Religion is required'),
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


const EditUserScreen = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const route = useRoute();
    const { user } = useSelector(state => state.userDetails);
    const { error, isUpdated, loading } = useSelector(state => state.user);
    const [avatar, setAvatar] = useState('');
    const [avatarPreview, setAvatarPreview] = useState(null);
    const [userDataFetched, setUserDataFetched] = useState(false);
    const [selectedRole, setSelectedRole] = useState('');
    const [storeDropdown, setStoreDropdown] = useState([]);
    const [loadingOptions, setLoadingOptions] = useState(false);
    const { userId } = route.params;

    useEffect(() => {
        const fetchStores = async () => {
            try {
                const response = await axios.get(`${BACKEND_URL}/api/v1/stores`);
                const storeData = response.data.stores;
                const options = storeData.map((store) => ({
                    value: store._id,
                    label: store.name,
                }));
                setStoreDropdown(options);
                setLoadingOptions(true);
                setSelectedRole(user.role);

            } catch (error) {
                console.error('Error fetching store data:', error);
                setLoadingOptions(false);
            }
        };

        fetchStores();

        dispatch(getUserDetails(userId))
            .then(() => {
                setUserDataFetched(true);
            });
        if (isUpdated) {
            navigation.navigate('Users');
        }
        if (error) {
            errorMsg(error);
            dispatch(clearErrors());
        }
    }, [dispatch, userId, isUpdated, error, user.role]);



    useEffect(() => {
        if (user && user.avatar && user.avatar.url) {
            setAvatarPreview(user.avatar.url);
        }
    }, [user]);

    const initialValues = {
        fname: user?.fname || '',
        lname: user?.lname || '',
        email: user?.email || '',
        password: '',
        religion: user?.religion || '',
        store: user.store ? `${user.store.storeId}-${user.store.name}` : '',
    };



    const selectImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            const selectedAsset = result.assets[0];
            const manipulatorOptions = {
                compress: 0.5,
                format: ImageManipulator.SaveFormat.JPEG,
            };

            // Manipulate the image
            const manipulatedImage = await ImageManipulator.manipulateAsync(
                selectedAsset.uri,
                [],
                manipulatorOptions
            );


            if (manipulatedImage) {
                const { uri } = manipulatedImage;

                setAvatarPreview(uri);
                setAvatar(uri);
            }
        }
    };



    const onSubmit = (values) => {
        const selectedStoreValue = values.store.split('-');
        const storeId = selectedStoreValue[0];
        const storeName = selectedStoreValue[1];
        const formData = new FormData();
        formData.append("fname", values.fname);
        formData.append("lname", values.lname);
        formData.append("email", values.email);
        formData.append("password", values.password);
        formData.append("religion", values.religion);
        formData.append("role", "Owner");
        formData.append("avatar", avatar);
        if (avatar) {
            formData.append("avatar", {
                uri: avatar,
                type: "image/jpeg",
                name: "avatar.jpg",
            });
        }
        formData.append("storeId", storeId);
        formData.append("storeName", storeName);
        dispatch(updateUser({ id: userId, userData: formData }));
    };


    return (
        <ScrollView contentContainerStyle={styles.scrollViewContainer}>
            {userDataFetched ? (
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={onSubmit}
                >
                    {(formik) => (

                        <View style={styles.container}>
                            <Block style={styles.formContainer}>
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
                                                        <Picker.Item label={religionOption.label} value={religionOption.value} key={religionOption.value} />
                                                    ))}
                                                </Picker>
                                            </View>
                                        )}
                                    </Field>
                                    {formik.touched.religion && formik.errors.religion ? (
                                        <Text style={styles.errorMessage}>{formik.errors.religion}</Text>
                                    ) : null}
                                </View>

                                {loadingOptions ? (
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
                                        <Image source={{ uri: avatarPreview }} style={styles.avatar} key={user._id} />
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
            ) : (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" />
                </View>
            )}
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
    imagePickerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    imagePickerButton: {
        flex: 1,
        backgroundColor: '#16aec1',
        marginRight: 10,
        height: inputSize
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
        alignSelf: 'center',
        height: inputSize
    },
    inputContainer: {
        marginVertical: 10,
    },
    errorMessage: {
        color: 'red'
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default EditUserScreen;
