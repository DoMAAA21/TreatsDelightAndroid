import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation, useRoute } from '@react-navigation/native';
import { View, StyleSheet, ScrollView, Dimensions, TouchableOpacity } from 'react-native';
import { Text, Input, Block, Button } from 'galio-framework';
import { Picker } from '@react-native-picker/picker';
import { Formik, Field } from 'formik';
import * as Yup from 'yup';
import { newMaintenanceReset } from '../../store/reducers/maintenance/newMaintenanceSlice';
import { newMaintenance } from '../../store/reducers/maintenance/newMaintenanceSlice';
import { successMsg, errorMsg } from '../../shared/toast';
import DateTimePickerModal from "react-native-modal-datetime-picker";

const screenHeight = Dimensions.get('window').height;
const inputSize = screenHeight * 0.07;


const validationSchema = Yup.object({
    amount: Yup.number().required('Amount is required'),
    type: Yup.string().required('Type is required'),
    cateredBy: Yup.string().required('Catered By is required'),
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

const AddMaintenanceScreen = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const route = useRoute();
    const { id } = route.params;
    const [issuedAt, setIssuedAt] = useState(new Date().toISOString().split('T')[0]);
    const [paidAt, setPaidAt] = useState(new Date().toISOString().split('T')[0]);
    const { loading, error, success } = useSelector(state => state.newMaintenance);
    const [issuedAtPickerVisible, setIssuedAtPickerVisible] = useState(false);
    const [paidAtPickerVisible, setPaidAtPickerVisible] = useState(false);

    const transactionType = [
        { label: 'To Pay', value: 'topay' },
        { label: 'Paid', value: 'paid' },
    ];

    const cateredBy = [
        { label: 'Admin', value: 'admin' },
        { label: 'Store', value: 'store' },
    ];

    useEffect(() => {
        if (error) {
            errorMsg(error)
            dispatch(newMaintenanceReset())
        }

        if (success) {
            console.log('asda');
            navigation.navigate('MaintenanceTransactions', { id });
            dispatch(newMaintenanceReset())
            successMsg('New Maintenance Added');
        }
    }, [dispatch, error, success, navigation])



    const initialValues = {
        amount: '0',
        type: '',
        cateredBy: '',
        note: '',
    };

    const onSubmit = (values) => {
        const maintenanceData = {
            amount: parseFloat(values.amount),
            cateredBy: values.cateredBy,
            type: values.type,
            issuedAt,
            paidAt,
            storeId: id,
        }
        dispatch(newMaintenance(maintenanceData));
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
                                New Maintenance
                            </Text>
                            <Field
                                name="amount"
                                placeholder="Amount"
                                component={MyInput}
                                keyboardType="numeric"
                            />
                            {formik.touched.amount && formik.errors.amount ? (
                                <Text style={styles.errorMessage}>{formik.errors.amount}</Text>
                            ) : null}



                            <View style={styles.inputContainer}>
                                <Field name="type">
                                    {({ field }) => (
                                        <View style={styles.selectContainer}>
                                            <Picker
                                                selectedValue={field.value}
                                                onValueChange={field.onChange('type')}
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

                            <View style={styles.inputContainer}>
                                <Field name="cateredBy">
                                    {({ field }) => (
                                        <View style={styles.selectContainer}>
                                            <Picker
                                                selectedValue={field.value}
                                                onValueChange={field.onChange('cateredBy')}
                                            >
                                                <Picker.Item label="Choose Catered By" value="" disabled />

                                                {cateredBy.map((cateredByOption) => (
                                                    <Picker.Item label={cateredByOption.label} value={cateredByOption.value} key={cateredByOption.label} />
                                                ))}
                                            </Picker>
                                        </View>
                                    )}
                                </Field>
                                {formik.touched.cateredBy && formik.errors.cateredBy ? (
                                    <Text style={styles.errorMessage}>{formik.errors.cateredBy}</Text>
                                ) : null}
                            </View>

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


                            <Field
                                name="note"
                                placeholder="Note"
                                component={MyInput}
                            />
                            {formik.touched.note && formik.errors.note ? (
                                <Text style={styles.errorMessage}>{formik.errors.note}</Text>
                            ) : null}



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
        backgroundColor: 'transpamaintenance',
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

export default AddMaintenanceScreen;
