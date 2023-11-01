import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { View, StyleSheet, ScrollView, Image, Dimensions, TouchableOpacity } from 'react-native';
import { Text, Input, Block, Button, Icon, } from 'galio-framework';
import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator';
import { Picker } from '@react-native-picker/picker';
import { Formik, Field } from 'formik';
import * as Yup from 'yup';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Toast from 'react-native-toast-message';
import { newProductReset } from '../../store/reducers/product/newProductSlice';
import { newProduct } from '../../store/reducers/product/newProductSlice';
import { categories } from '../../constants/inputs';


const screenHeight = Dimensions.get('window').height;
const inputSize = screenHeight * 0.07;


const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    description: Yup.string().required('Description is required'),
    costPrice: Yup.number().required('Cost Price is Required').min(1, 'Minimum of 1').max(999, 'Maximum of 999'),
    sellPrice: Yup.number().required('Sell Price is required').min(1, 'Minimum of 1').max(999, 'Maximum of 999'),
    stock: Yup.number().min(0, 'Minimum of 0').max(999, 'Maximum of 999').integer('Stock cannot be decimal'),
    category: Yup.string().required('Category is required'),
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
const AddProductScreen = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const { loading, error, success } = useSelector(state => state.newProduct);
    const [image, setImage] = useState('');
    const [imagePreview, setImagePreview] = useState(null);

    const [isPortion, setIsPortion] = useState(false);

    const MyStockInput = ({ field, form, ...props }) => (
        <Input
            {...props}
            onChangeText={field.onChange(field.name)}
            onBlur={field.onBlur(field.name)}
            value={field.value}
            style={{ fontSize: inputSize, height: inputSize, width: '100%', borderWidth: isPortion ? 0.5 : 1, backgroundColor: isPortion ? '#EBEBE4' : null }}
        />
    );


    const handleCheckboxChange = () => {
        setIsPortion(!isPortion);
    };

    const isActive = [
        { label: 'True', value: true },
        { label: 'False', value: false },
    ];

    useEffect(() => {
        if (error) {
            errorMsg(error)
            dispatch(newProductReset())
        }

        if (success) {
            navigation.navigate('Products');
            dispatch(newProductReset())
            successMsg('Product created successfully');
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
            const manipulatedImage = await ImageManipulator.manipulateAsync(
                selectedAsset.uri,
                [],
                manipulatorOptions
            );


            if (manipulatedImage) {
                const { uri } = manipulatedImage;
                setImagePreview(uri)
                setImage(uri);
            }
        }
    };

    const initialValues = {
        name: '',
        description: '',
        costPrice: '',
        sellPrice: '',
        stock: '',
        category: '',
        active: '',
    };

    const onSubmit = (values) => {
        const isActive = values.active === "True" ? true : false;
        const formData = new FormData();
        formData.append("name", values.name);
        formData.append("description", values.description);
        formData.append("costPrice", values.costPrice);
        formData.append("sellPrice", values.sellPrice);
        formData.append("category", values.category);
        formData.append("active", isActive);
        if (image) {
            formData.append("image", {
                uri: image,
                type: "image/jpeg",
                name: "image.jpg",
            });
        }
        if (!isPortion) {
            formData.append("stock", values.stock);
        } else {
            formData.append("stock", '');
        }
        dispatch(newProduct(formData));
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
                                New Product
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
                                name="description"
                                placeholder="Description"
                                component={MyInput}
                            />
                            {formik.touched.description && formik.errors.description ? (
                                <Text style={styles.errorMessage}>{formik.errors.description}</Text>
                            ) : null}
                            <Field
                                name="costPrice"
                                placeholder="Cost Price"
                                keyboardType="numeric"
                                component={MyInput}
                            />
                            {formik.touched.costPrice && formik.errors.costPrice ? (
                                <Text style={styles.errorMessage}>{formik.errors.costPrice}</Text>
                            ) : null}
                            <Field
                                name="sellPrice"
                                placeholder="Sell Price"
                                keyboardType="numeric"
                                component={MyInput}
                            />
                            {formik.touched.sellPrice && formik.errors.sellPrice ? (
                                <Text style={styles.errorMessage}>{formik.errors.sellPrice}</Text>
                            ) : null}


                            <View style={styles.rowContainer}>
                                <View style={styles.checkboxContainer}>
                                    <TouchableOpacity onPress={handleCheckboxChange}>
                                        <Fontisto
                                            name={isPortion ? 'checkbox-active' : 'checkbox-passive'}
                                            width={32}
                                            family="MaterialCommunityIcons"
                                            size={30}
                                            color={isPortion ? 'green' : 'gray'}

                                        />
                                    </TouchableOpacity>
                                    <Text style={styles.checkboxLabel}>By Portion</Text>
                                </View>
                                <View style={styles.stockContainer}>
                                    <Field
                                        name="stock"
                                        placeholder="Stock"
                                        keyboardType="numeric"
                                        component={MyStockInput}
                                        editable={!isPortion}
                                    />
                                </View>

                            </View>

                            {formik.touched.stock && formik.errors.stock ? (
                                <Text style={styles.errorMessage}>{formik.errors.stock}</Text>
                            ) : null}


                            <View style={styles.inputContainer}>
                                <Field name="category">
                                    {({ field }) => (
                                        <View style={styles.inputContainer}>
                                            <Text>Category</Text>
                                            <Picker
                                                selectedValue={field.value}
                                                onValueChange={field.onChange('category')}
                                            >
                                                <Picker.Item label="Choose Option" value="" />

                                                {categories.map((category) => (
                                                    <Picker.Item label={category.label} value={category.value} key={category.label} />
                                                ))}
                                            </Picker>
                                        </View>
                                    )}
                                </Field>
                                {formik.touched.category && formik.errors.category ? (
                                    <Text style={styles.errorMessage}>{formik.errors.category}</Text>
                                ) : null}
                            </View>
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


                            {/* <View style={styles.imagePickerContainer}>
                                {imagePreview ? (
                                    <Image source={{ uri: imagePreview }} style={styles.image} />
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
                                        <Text color="white">Choose Image</Text>
                                    </Block>
                                </Button>
                            </View> */}
                            <View style={styles.inputContainer}>
                                <Text>Images</Text>
                                <View style={styles.imagePickerContainer}>

                                    <Button
                                        color="info"
                                        style={styles.imagePickerButton}
                                        onPress={selectImage}
                                    >
                                        <Image source={{ uri: imagePreview }} style={styles.image} />

                                    </Button>
                                    <Button
                                        color="info"
                                        style={styles.imagePickerButton}
                                        onPress={selectImage}
                                    >
                                        <Image source={{ uri: imagePreview }} style={styles.image} />

                                    </Button>
                                    <Button
                                        color="info"
                                        style={styles.imagePickerButton}
                                        onPress={selectImage}
                                    >
                                        <Image source={{ uri: imagePreview }} style={styles.image} />

                                    </Button>

                                </View>
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
        width: 100,
        height: 90,
        marginTop: 10,
        alignSelf: 'center',
        backgroundColor: '#d3d3d3'
    },
    image: {
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
    },
    rowContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '150%'
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 18,
        marginLeft: 10,
        width: '20%'
    },
    stockContainer: {
        width: '41%',
    },

    disabledField: {
        backgroundColor: 'lightgray',
        borderWidth: 2
    },
    checkboxLabel: {
        marginLeft: 10
    }


});

export default AddProductScreen;
