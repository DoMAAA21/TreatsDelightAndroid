import React, { useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation, useRoute, useFocusEffect } from '@react-navigation/native';
import { View, StyleSheet, ScrollView, Image, Dimensions, ActivityIndicator } from 'react-native';
import { Text, Input, Block, Button } from 'galio-framework';
import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator';
import { Picker } from '@react-native-picker/picker';
import { Formik, Field } from 'formik';
import * as Yup from 'yup';
import NutritionForm from './nutritionForm';
import { getProductDetails } from '../../store/reducers/product/productDetailsSlice';
import { updateProduct, clearErrors } from '../../store/reducers/product/productSlice';
import { errorMsg } from '../../shared/toast';


const screenHeight = Dimensions.get('window').height;
const inputSize = screenHeight * 0.07;

const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    description: Yup.string().required('Description is required').min(1, 'Minimum of 1').max(100, 'Maximum of 100 characters'),
    costPrice: Yup.number().required('Cost Price is Required').min(1, 'Minimum of 1').max(999, 'Maximum of 999'),
    sellPrice: Yup.number().required('Sell Price is required').min(1, 'Minimum of 1').max(999, 'Maximum of 999'),
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


const EditMealScreen = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const route = useRoute();
    const { productId } = route.params;
    const { product } = useSelector(state => state.productDetails);
    const { error, isUpdated, loading } = useSelector(state => state.product);
    const [productDataFetched, setProductFetched] = useState(false);
    const [firstImage, setFirstImage] = useState(null);
    const [secondImage, setSecondImage] = useState(null);
    const [thirdImage, setThirdImage] = useState(null);
    const [firstImagePreview, setFirstImagePreview] = useState(null);
    const [secondImagePreview, setSecondImagePreview] = useState(null);
    const [thirdImagePreview, setThirdImagePreview] = useState(null);   
    const isActive = [
        { label: 'True', value: true },
        { label: 'False', value: false },
    ];

    useFocusEffect(
        useCallback(() => {
            const fetchData = async () => {
                try {
                    dispatch(getProductDetails(productId))
                        .then(() => {
                            setProductFetched(true);
                        });

                } catch (error) {
                    errorMsg(error);
                    dispatch(clearErrors());
                }
            };

            fetchData();

            if (isUpdated) {

                navigation.navigate('Meals');

            }
            if (error) {
                errorMsg(error);
                dispatch(clearErrors());
            }

            return () => {
                setFirstImage(null);
                setSecondImage(null);
                setThirdImage(null);
                setFirstImagePreview(null);
                setSecondImagePreview(null);
                setThirdImagePreview(null);
            };
        }, [dispatch, productId, isUpdated, error])
    );

    useFocusEffect(
        useCallback(() => {


            if (product && product.images && product.images.length > 0 && !loading) {
                const productImages = product.images;
                const imagePreviews = Array(3).fill(null);

                productImages.forEach(image => {
                    if (image.index >= 0 && image.index < 3 && image.url) {
                        imagePreviews[image.index] = image.url;
                    }
                });

                setFirstImagePreview(imagePreviews[0]);
                setSecondImagePreview(imagePreviews[1]);
                setThirdImagePreview(imagePreviews[2]);
            }
        }, [product])
    );



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
                    setFirstImagePreview(uri);
                } else if (index === 1) {
                    setSecondImage(uri);
                    setSecondImagePreview(uri);
                } else if (index === 2) {
                    setThirdImage(uri);
                    setThirdImagePreview(uri);
                }
            }
        }
    };

    const initialValues = {
        name: product?.name || '',
        description: product?.description || '',
        costPrice: (product?.costPrice || 0).toString(),
        sellPrice: (product?.sellPrice || 0).toString(),
        active: product?.active === true ? 'True' : 'False',
        calories: (product?.nutrition?.calories || 0).toString(),
        protein: (product?.nutrition?.protein || 0).toString(),
        carbs: (product?.nutrition?.carbs || 0).toString(),
        fat: (product?.nutrition?.fat || 0).toString(),
        fiber: (product?.nutrition?.fiber || 0).toString(),
        sugar: (product?.nutrition?.sugar || 0).toString(),
        sodium: (product?.nutrition?.sodium || 0).toString(),
        cholesterol: (product?.nutrition?.cholesterol || 0).toString(),
    };

    const onSubmit = (values) => {
        const isActiveValue = values.active === 'True' ? true : false;
        const formData = new FormData();
        formData.append('name', values.name);
        formData.append('description', values.description);
        formData.append('costPrice', values.costPrice);
        formData.append('sellPrice', values.sellPrice);
        formData.append('category', 'Meals');
        formData.append('active', isActiveValue);
        formData.append('portion', true);
        formData.append('stock', 0);
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

        dispatch(updateProduct({ id: productId, productData: formData }))
    };

    return (
        <ScrollView contentContainerStyle={styles.scrollViewContainer}>
            {productDataFetched ? (
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={onSubmit}
                >
                    {(formik) => (
                        <View style={styles.container}>
                            <Block style={styles.formContainer}>
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

                                <NutritionForm formik={formik} />

                                <View style={styles.inputContainer}>
                                    <Text>Images (Left Most is Required)</Text>
                                    <View style={styles.imagePickerContainer}>
                                        <Button
                                            color="info"
                                            style={styles.imagePickerButton}
                                            onPress={() => selectImage(0)}
                                        >
                                            <Image source={{ uri: firstImagePreview }} style={styles.image} />
                                        </Button>
                                        <Button
                                            color="info"
                                            style={styles.imagePickerButton}
                                            onPress={() => selectImage(1)}
                                        >
                                            <Image source={{ uri: secondImagePreview }} style={styles.image} />
                                        </Button>
                                        <Button
                                            color="info"
                                            style={styles.imagePickerButton}
                                            onPress={() => selectImage(2)}
                                        >
                                            <Image source={{ uri: thirdImagePreview }} style={styles.image} />
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
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }


});

export default EditMealScreen;
