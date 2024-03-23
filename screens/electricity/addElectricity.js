import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation, useRoute } from '@react-navigation/native';
import { View, StyleSheet, ScrollView, Dimensions, TouchableOpacity } from 'react-native';
import { Text, Input, Block, Button } from 'galio-framework';
import { Picker } from '@react-native-picker/picker';
import { Formik, Field } from 'formik';
import * as Yup from 'yup';
import { newElectricityReset } from '../../store/reducers/electricity/newElectricitySlice';
import { newElectricity } from '../../store/reducers/electricity/newElectricitySlice';
import { successMsg, errorMsg } from '../../shared/toast';
import DateTimePickerModal from "react-native-modal-datetime-picker";

const screenHeight = Dimensions.get('window').height;
const inputSize = screenHeight * 0.07;


const validationSchema = Yup.object({
    consumed: Yup.number().required('Amount is required'),
    price: Yup.number().required('Amount is required'),
    additionals: Yup.number().required('Amount is required'),
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

const AddElectricityScreen = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const route = useRoute();
    const { id } = route.params;
    const { loading, error, success } = useSelector(state => state.newElectricity);
    const [issuedAt, setIssuedAt] = useState(new Date().toISOString().split('T')[0]);
    const [paidAt, setPaidAt] = useState(new Date().toISOString().split('T')[0]);
    const [startAt, setStartAt] = useState(new Date().toISOString().split('T')[0]);
    const [endAt, setEndAt] = useState(new Date().toISOString().split('T')[0]);
    const [issuedAtPickerVisible, setIssuedAtPickerVisible] = useState(false);
    const [paidAtPickerVisible, setPaidAtPickerVisible] = useState(false);
    const [startAtPickerVisible, setStartAtPickerVisible] = useState(false);
    const [endAtPickerVisible, setEndAtPickerVisible] = useState(false);

    const transactionType = [
        { label: 'To Pay', value: 'topay' },
        { label: 'Paid', value: 'paid' },
    ];

    useEffect(() => {
        if (error) {
            errorMsg(error)
            dispatch(newElectricityReset())
        }

        if (success) {
            navigation.navigate('ElectricityTransactions', { id });
            dispatch(newElectricityReset())
            successMsg('New Electricity Added');
        }
    }, [dispatch, error, success, navigation])

    const initialValues = {
        consumed: '0',
        price: '0',
        additionals: '0',
        type: 'topay',
        note: '',
    };

    const onSubmit = (values) => {
        const electricityData = {
            consumed: parseFloat(values.consumed),
            price: parseFloat(values.price),
            additionals: parseFloat(values.additionals),
            total: parseFloat((values.consumed * values.price) + parseFloat(values.additionals)),
            type: "topay",
            issuedAt,
            paidAt,
            startAt,
            endAt,
            storeId: id,
        }
        dispatch(newElectricity(electricityData));
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
                                New Electricity
                            </Text>
                            <View style={styles.formContainer}>
                                <Text>Consumed</Text>
                                <Field
                                    name="consumed"
                                    component={MyInput}
                                    keyboardType="numeric"
                                />
                                {formik.touched.consumed && formik.errors.consumed ? (
                                    <Text style={styles.errorMessage}>{formik.errors.consumed}</Text>
                                ) : null}
                            </View>


                            <View style={styles.formContainer}>
                                <Text>Price per watts</Text>
                                <Field
                                    name="price"
                                    placeholder="Price per watts"
                                    component={MyInput}
                                    keyboardType="numeric"
                                />
                                {formik.touched.price && formik.errors.price ? (
                                    <Text style={styles.errorMessage}>{formik.errors.price}</Text>
                                ) : null}
                            </View>

                            <View style={styles.formContainer}>
                                <Text>Additionals / Deductions</Text>
                                <Field
                                    name="additionals"
                                    component={MyInput}
                                    keyboardType="numeric"
                                />
                                {formik.touched.additionals && formik.errors.additionals ? (
                                    <Text style={styles.errorMessage}>{formik.errors.additionals}</Text>
                                ) : null}
                            </View>


                            <View style={styles.formContainer}>
                                <Text>Total</Text>
                                <Input
                                    name="total"
                                    value={((formik.values.consumed && formik.values.price) ? ((formik.values.consumed * formik.values.price) + parseFloat(formik.values.additionals)).toString() : '0')}
                                    style={{ fontSize: inputSize, height: inputSize, width: '100%' }}
                                    editable={false}
                                />
                            </View>


                            <View style={styles.inputContainer}>
                                <Field name="type">
                                    {({ field }) => (
                                        <View style={styles.selectContainer}>
                                            <Picker
                                                selectedValue={field.value}
                                                onValueChange={field.onChange('type')}
                                                enabled={false}
                                                style={{ backgroundColor: 'lightgray' }}
                                            >
                                                <Picker.Item label="Choose Type" value="" disabled />

                                                {transactionType.map((transactionTypeOption) => (
                                                    <Picker.Item label={transactionTypeOption.label} value={transactionTypeOption.value} key={transactionTypeOption.label} />
                                                ))}
                                            </Picker>
                                        </View>
                                    )}
                                </Field>
                                {formik.touched.type && formik.errors.type ? (
                                    <Text style={styles.errorMessage}>{formik.errors.type}</Text>
                                ) : null}
                            </View>

                            <Field
                                name="startAt"
                                component={() => (
                                    <View style={styles.inputContainer}>
                                        <Text>Start At</Text>
                                        <TouchableOpacity style={styles.dateButton} onPress={() => setStartAtPickerVisible(true)}>
                                            <Text style={styles.dateButtonText}>{startAt ? startAt : 'Select date'}</Text>
                                        </TouchableOpacity>
                                        <DateTimePickerModal
                                            isVisible={startAtPickerVisible}
                                            mode="date"
                                            date={startAt ? new Date(startAt) : new Date()}
                                            onConfirm={(date) => {
                                                setStartAtPickerVisible(false);
                                                setStartAt(date.toISOString().split('T')[0]);

                                            }}
                                            onCancel={() => setStartAtPickerVisible(false)}
                                        />
                                    </View>
                                )}
                            />

                            <Field
                                name="endAt"
                                component={() => (
                                    <View style={styles.inputContainer}>
                                        <Text>End At</Text>
                                        <TouchableOpacity style={styles.dateButton} onPress={() => setEndAtPickerVisible(true)}>
                                            <Text style={styles.dateButtonText}>{endAt ? endAt : 'Select date'}</Text>
                                        </TouchableOpacity>
                                        <DateTimePickerModal
                                            isVisible={endAtPickerVisible}
                                            mode="date"
                                            date={endAt ? new Date(endAt) : new Date()}
                                            onConfirm={(date) => {
                                                setEndAtPickerVisible(false);
                                                setEndAt(date.toISOString().split('T')[0]);

                                            }}
                                            onCancel={() => setEndAtPickerVisible(false)}
                                        />
                                    </View>
                                )}
                            />

                            <Field
                                name="issuedAt"
                                component={() => (
                                    <View style={styles.inputContainer}>
                                        <Text>Issued At</Text>
                                        <TouchableOpacity style={styles.dateButton} onPress={() => setIssuedAtPickerVisible(true)}>
                                            <Text style={styles.dateButtonText}>{issuedAt ? issuedAt : 'Select date'}</Text>
                                        </TouchableOpacity>
                                        <DateTimePickerModal
                                            isVisible={issuedAtPickerVisible}
                                            mode="date"
                                            date={issuedAt ? new Date(issuedAt) : new Date()}
                                            onConfirm={(date) => {
                                                setIssuedAtPickerVisible(false);
                                                setIssuedAt(date.toISOString().split('T')[0]);

                                            }}
                                            onCancel={() => setIssuedAtPickerVisible(false)}
                                        />
                                    </View>
                                )}
                            />

                            {formik.values.type.toLowerCase() === 'paid' && (
                                <Field
                                    name="paidAt"
                                    component={() => (
                                        <View style={styles.inputContainer}>
                                            <Text>Paid At</Text>

                                            <TouchableOpacity style={styles.dateButton} onPress={() => setPaidAtPickerVisible(true)}>
                                                <Text style={styles.dateButtonText}>{paidAt ? paidAt : 'Select date'}</Text>
                                            </TouchableOpacity>

                                            <DateTimePickerModal
                                                isVisible={paidAtPickerVisible}
                                                mode="date"
                                                onConfirm={(date) => {
                                                    setPaidAtPickerVisible(false);
                                                    setPaidAt(date.toISOString().split('T')[0]);
                                                }}
                                                onCancel={() => setPaidAtPickerVisible(false)}
                                            />
                                        </View>
                                    )}
                                />
                            )}

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
    submitButton: {
        marginTop: 20,
        width: '100%',
        height: inputSize,
        alignSelf: 'center',
    },
    inputContainer: {
        marginVertical: 10,
    },
    selectContainer: {
        marginVertical: 10,
        borderWidth: 0.5,
        borderRadius: 8,
    },
    errorMessage: {
        color: 'red'
    },
    dateButton: {
        backgroundColor: '#e0e0e0',
        borderRadius: 5,
        padding: 20,
        marginTop: 5,
    },
    dateButtonText: {
        fontSize: 16,
        color: '#333',
    }
});

export default AddElectricityScreen;
