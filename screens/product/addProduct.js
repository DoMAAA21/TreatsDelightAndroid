import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { View, StyleSheet, ScrollView, Image, Dimensions } from 'react-native';
import { Text, Input, Block, Button, } from 'galio-framework';
import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator';
import { Picker } from '@react-native-picker/picker';
import { Formik, Field} from 'formik';
import * as Yup from 'yup';
import { newProductReset } from '../../store/reducers/product/newProductSlice';
import { newProduct } from '../../store/reducers/product/newProductSlice';
import { categories } from '../../shared/inputs';
import { successMsg, errorMsg } from '../../shared/toast';
import NutritionForm from './nutritionForm';

const screenHeight = Dimensions.get('window').height;
const inputSize = screenHeight * 0.07;

const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    description: Yup.string().required('Description is required').min(1, 'Minimum of 1').max(100, 'Maximum of 100 characters'),
    costPrice: Yup.number().required('Cost price is Required').min(1, 'Minimum of 1').max(999, 'Maximum of 999'),
    sellPrice: Yup.number().required('Sell price is required').min(1, 'Minimum of 1').max(999, 'Maximum of 999'),
    stock: Yup.number().required('Stock is required').min(0, 'Minimum of 0').max(999, 'Maximum of 999').integer('Stock cannot be decimal'),
    category: Yup.string().required('Category is required'),
    active: Yup.boolean().required('Active or Not'),
    calories: Yup.number().required('Calorie is required').min(0, 'Minimum of 0'),
    protein: Yup.number().required('Protein is required').min(0, 'Minimum of 0'),
    carbs: Yup.number().required('Carbs is required').min(0, 'Minimum of 0'),
    fat: Yup.number().required('Fat is required').min(0, 'Minimum of 0'),
    fiber: Yup.number().required('Fiber is required').min(0, 'Minimum of 0'),
    sugar: Yup.number().required('Sugar is required').min(0, 'Minimum of 0'),
    sodium: Yup.number().required('Sodium is required').min(0, 'Minimum of 0'),
    cholesterol: Yup.number().required('Cholesterol is required').min(0, 'Minimum of 0'),
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


const AddProductScreen = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const { loading, error, success } = useSelector(state => state.newProduct);
    const [firstImage, setFirstImage] = useState(null);
    const [secondImage, setSecondImage] = useState(null);
    const [thirdImage, setThirdImage] = useState(null);
  
    const isActive = [
        { label: 'True', value: true },
        { label: 'False', value: false },
    ];

    useEffect(() => {
        if (error) {
            errorMsg(error);
            dispatch(newProductReset());
        }

        if (success) {
            navigation.navigate('Products');
            dispatch(newProductReset());
            successMsg('Product created successfully');
        }
    }, [dispatch, error, success, navigation]);

    const selectImage = async (index) => {
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
                if (index === 0) {
                    setFirstImage(uri);
                } else if (index === 1) {
                    setSecondImage(uri);
                } else if (index === 2) {
                    setThirdImage(uri);
                }
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
        calories: '',
        protein: '',
        carbs: '',
        fat: '',
        fiber: '',
        sugar: '',
        sodium: '',
        cholesterol: '',
    };

    const onSubmit = (values) => {
        const isActiveValue = values.active === 'True' ? true : false;
        const formData = new FormData();
        formData.append('name', values.name);
        formData.append('description', values.description);
        formData.append('costPrice', values.costPrice);
        formData.append('sellPrice', values.sellPrice);
        formData.append('category', values.category);
        formData.append('active', isActiveValue);
        formData.append('portion', false);
        formData.append('stock', values.stock);
        formData.append('calories', values.calories);
        formData.append('protein', values.protein);
        formData.append('carbs', values.carbs);
        formData.append('fat', values.fat);
        formData.append('fiber', values.fiber);
        formData.append('sugar', values.sugar);
        formData.append('sodium', values.sodium);
        formData.append('cholesterol', values.cholesterol);

        if (firstImage) {
            formData.append('firstImage', {
                uri: firstImage,
                type: 'image/jpeg',
                name: 'image_1.jpg',
            });
        }
        if (secondImage) {
            formData.append('secondImage', {
                uri: secondImage,
                type: 'image/jpeg',
                name: 'image_2.jpg',
            });
        }
        if (thirdImage) {
            formData.append('thirdImage', {
                uri: thirdImage,
                type: 'image/jpeg',
                name: 'image_3.jpg',
            });
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
                            <Field name="name" placeholder="Name" component={MyInput} />
                            {formik.touched.name && formik.errors.name ? (
                                <Text style={styles.errorMessage}>{formik.errors.name}</Text>
                            ) : null}
                            <Field name="description" placeholder="Description" component={MyInput} />
                            {formik.touched.description && formik.errors.description ? (
                                <Text style={styles.errorMessage}>{formik.errors.description}</Text>
                            ) : null}
                            <Field name="costPrice" placeholder="Cost Price" keyboardType="numeric" component={MyInput} />
                            {formik.touched.costPrice && formik.errors.costPrice ? (
                                <Text style={styles.errorMessage}>{formik.errors.costPrice}</Text>
                            ) : null}
                            <Field name="sellPrice" placeholder="Sell Price" keyboardType="numeric" component={MyInput} />
                            {formik.touched.sellPrice && formik.errors.sellPrice ? (
                                <Text style={styles.errorMessage}>{formik.errors.sellPrice}</Text>
                            ) : null}

                            <Field name="stock" placeholder="Stock" keyboardType="numeric" component={MyInput} />
                            {formik.touched.stock && formik.errors.stock ? (
                                <Text style={styles.errorMessage}>{formik.errors.stock}</Text>
                            ) : null}

                            <View style={styles.inputContainer}>
                                <Field name="category">
                                    {({ field }) => (
                                        <View style={styles.inputContainer}>
                                            <Text>Category</Text>
                                            <Picker selectedValue={field.value} onValueChange={field.onChange('category')}>
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
                                            <Picker selectedValue={field.value} onValueChange={field.onChange('active')}>
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
                           

                            <NutritionForm formik={formik}/>

                           

                            <View style={styles.inputContainer}>
                                <Text>Images (Left Most is Required)</Text>
                                <View style={styles.imagePickerContainer}>
                                    <Button
                                        color="info"
                                        style={styles.imagePickerButton}
                                        onPress={() => selectImage(0)}
                                    >
                                        <Image source={{ uri: firstImage }} style={styles.image} />
                                    </Button>
                                    <Button
                                        color="info"
                                        style={styles.imagePickerButton}
                                        onPress={() => selectImage(1)}
                                    >
                                        <Image source={{ uri: secondImage }} style={styles.image} />
                                    </Button>
                                    <Button
                                        color="info"
                                        style={styles.imagePickerButton}
                                        onPress={() => selectImage(2)}
                                    >
                                        <Image source={{ uri: thirdImage }} style={styles.image} />
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
        alignSelf: 'center',
        backgroundColor: '#d3d3d3'
    },
    image: {
        width: 100,
        height: 90,
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
   

});

export default AddProductScreen;
