import React, { useEffect } from 'react';
import { Dimensions, Text, StyleSheet, View, ActivityIndicator } from 'react-native';
import { Input, Button } from 'galio-framework';
import { Field } from 'formik';
import useFetchNutritionFacts from '../../hooks/useFetchNutrition';
import { successMsg, errorMsg } from '../../shared/toast';
import OpenAILogo from '../../assets/svg/OpenAi';

const screenHeight = Dimensions.get('window').height;
const inputSize = screenHeight * 0.07;

const MyInput = ({ field, form, ...props }) => (


    <Input
        {...props}
        onChangeText={field.onChange(field.name)}
        onBlur={field.onBlur(field.name)}
        value={field.value}
        style={{ fontSize: inputSize, height: inputSize, width: '100%' }}
    />
);


const NutritionForm = ({ formik }) => {
    const { gptLoading, gptSuccess, gptError, fetchNutrition, setGptError, setGptSuccess } = useFetchNutritionFacts({ formik }, 'product');
    useEffect(() => {
        if (gptError) {
            errorMsg(gptError)
            setGptError(null)
        }
        if (gptSuccess) {
            successMsg('Nutrition fetched')
            setGptSuccess(false);
        }
    }, [gptError, gptSuccess]);
    const fetchNutritionFacts = async () => {
        fetchNutrition();
    };
    return (
        <>
            <View style={styles.lineContainer}>
                <View style={styles.line} />
                <Text style={styles.text}> Nutrition </Text>
                <View style={styles.line} />
            </View>
            <Button
                style={styles.gptButton}
                onPress={fetchNutritionFacts}
                disabled={gptLoading}
            >
                <View style={styles.gptContainer}>
                    {gptLoading ? (
                        <ActivityIndicator  size="large" color="white"/>
                    ) : (
                        <>
                            <OpenAILogo style={styles.logo} />
                            <Text style={styles.buttonText}>Ask ChatGPT</Text>
                        </>
                    )}
                </View>
            </Button>
            <Field name="calories" placeholder="Calories" keyboardType="numeric" component={MyInput} />
            {formik.touched.calories && formik.errors.calories ? (
                <Text style={styles.errorMessage}>{formik.errors.calories}</Text>
            ) : null}

            <Field name="protein" placeholder="Protein" keyboardType="numeric" component={MyInput} />
            {formik.touched.protein && formik.errors.protein ? (
                <Text style={styles.errorMessage}>{formik.errors.protein}</Text>
            ) : null}

            <Field name="carbs" placeholder="Carbs" keyboardType="numeric" component={MyInput} />
            {formik.touched.carbs && formik.errors.carbs ? (
                <Text style={styles.errorMessage}>{formik.errors.carbs}</Text>
            ) : null}

            <Field name="fat" placeholder="Fat" keyboardType="numeric" component={MyInput} />
            {formik.touched.fat && formik.errors.fat ? (
                <Text style={styles.errorMessage}>{formik.errors.fat}</Text>
            ) : null}

            <Field name="fiber" placeholder="Fiber" keyboardType="numeric" component={MyInput} />
            {formik.touched.fiber && formik.errors.fiber ? (
                <Text style={styles.errorMessage}>{formik.errors.fiber}</Text>
            ) : null}

            <Field name="sugar" placeholder="Sugar" keyboardType="numeric" component={MyInput} />
            {formik.touched.sugar && formik.errors.sugar ? (
                <Text style={styles.errorMessage}>{formik.errors.sugar}</Text>
            ) : null}

            <Field name="sodium" placeholder="Sodium" keyboardType="numeric" component={MyInput} />
            {formik.touched.sodium && formik.errors.sodium ? (
                <Text style={styles.errorMessage}>{formik.errors.sodium}</Text>
            ) : null}

            <Field name="cholesterol" placeholder="Cholesterol" keyboardType="numeric" component={MyInput} />
            {formik.touched.cholesterol && formik.errors.cholesterol ? (
                <Text style={styles.errorMessage}>{formik.errors.cholesterol}</Text>
            ) : null}
        </>
    )
}

const styles = StyleSheet.create({
    gptButton: {
        marginTop: 20,
        width: '100%',
        height: inputSize,
        alignSelf: 'center',
        backgroundColor: '#4299e1',
        borderRadius: 8
    },
    gptContainer: {
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'center', 
    },
    logo: {
        width: 40, 
        height: 40, 
        marginRight: 10, 
    },
    buttonText: {
        color: 'white'
    },
    lineContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10,
    },
    line: {
        flex: 1,
        height: 1,
        backgroundColor: 'black',
        opacity: 0.2
    },
    text: {
        color: 'black',
        fontWeight: 'bold',
        marginHorizontal: 5,
    },
    errorMessage: {
        color: 'red'
    },
});


export default NutritionForm