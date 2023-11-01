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
import { newStoreReset } from '../../store/reducers/store/newStoreSlice';
import { newStore } from '../../store/reducers/store/newStoreSlice';
import { successMsg, errorMsg } from '../../shared/toast';
const screenHeight = Dimensions.get('window').height;
const inputSize = screenHeight * 0.07;


const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    slogan: Yup.string().required('Slogan is required'),
    stall: Yup.number().min(1, 'Minimum of 1').max(99, 'Maximum of 99'),
    location: Yup.string().required('Location is required'),
    active: Yup.boolean().required('Active or Not'),
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

const AddStoreScreen = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const { loading, error, success } = useSelector(state => state.newStore);
    const [logo, setLogo] = useState('');
    const [logoPreview, setLogoPreview] = useState(null);

    const isActive = [
        { label: 'True', value: true },
        { label: 'False', value: false },
    ];

    useEffect(() => {
        if (error) {
            errorMsg(error)
            dispatch(newStoreReset())
        }

        if (success) {
            navigation.navigate('Stores');
            dispatch(newStoreReset())
            successMsg('Store created successfully');
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
                compress: 0.7,
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
                setLogoPreview(uri)
                setLogo(uri);
            }
        }
    };

    const initialValues = {
        name: '',
        slogan: '',
        stall: '',
        location: '',
        active: '',
    };

    const onSubmit = (values) => {
        const isActive = values.active === "True" ? true : false;
        const formData = new FormData(); 
        formData.append("name", values.name);
        formData.append("slogan", values.slogan);
        formData.append("stall", values.stall);
        formData.append("location", values.location);
        formData.append("active", isActive);
      
        if (logo) {
            formData.append("logo", {
              uri: logo,
              type: "image/jpeg",
              name: "logo.jpg",
            });
          }
      
        dispatch(newStore(formData));
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
                                New Store
                            </Text>
                            <Field
                                name="name"
                                placeholder="Name"
                                component={MyInput}
                            />
                            {formik.touched.name && formik.errors.name ? (
                                <Text style={styles.errorMessage}>{formik.errors.name}</Text>
                            ) : null}
                            <Field
                                name="slogan"
                                placeholder="Slogan"
                                component={MyInput}
                            />
                            {formik.touched.slogan && formik.errors.slogan ? (
                                <Text style={styles.errorMessage}>{formik.errors.slogan}</Text>
                            ) : null}
                            <Field
                                name="stall"
                                placeholder="Stall No."
                                keyboardType="numeric"
                                component={MyInput}
                            />
                            {formik.touched.stall && formik.errors.stall ? (
                                <Text style={styles.errorMessage}>{formik.errors.stall}</Text>
                            ) : null}
                            <Field
                                name="location"
                                placeholder="Location"

                                component={MyInput}
                            />
                            {formik.touched.location && formik.errors.location ? (
                                <Text style={styles.errorMessage}>{formik.errors.location}</Text>
                            ) : null}
                            <View style={styles.inputContainer}>
                                <Field name="active">
                                    {({ field }) => (
                                        <View style={styles.inputContainer}>
                                            <Text>Is Active</Text>
                                            <Picker
                                                selectedValue={field.value}
                                                onValueChange={field.onChange('active')}
                                            >
                                                <Picker.Item label="Choose Option" value="" />

                                                {isActive.map((isActiveOption) => (
                                                    <Picker.Item label={isActiveOption.label} value={isActiveOption.label} key={isActiveOption.label} />
                                                ))}
                                            </Picker>
                                        </View>
                                    )}
                                </Field>
                                {formik.touched.active && formik.errors.active ? (
                                    <Text style={styles.errorMessage}>{formik.errors.active}</Text>
                                ) : null}
                            </View>

                            <View style={styles.imagePickerContainer}>
                                {logoPreview ? (
                                    <Image source={{ uri: logoPreview }} style={styles.logo} />
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
                                        <Text color="white">Choose Logo</Text>
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
        height: inputSize
    },
    logo: {
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

export default AddStoreScreen;
