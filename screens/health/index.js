import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, Switch, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { submitHealthDeclaration, updateUserReset } from '../../store/reducers/user/userSlice';
import { getUserHealth } from '../../store/reducers/user/userDetailsSlice';
import { successMsg } from '../../shared/toast';
import { useFocusEffect } from '@react-navigation/native';

const HealthDeclarationForm = () => {
    const dispatch = useDispatch();
    const { isUpdated, loading } = useSelector(state => state.user);
    const { user } = useSelector(state => state.userDetails);
    const [isLoading, setIsLoading] = useState(true);
    const [formData, setFormData] = useState({
        diabetic: false,
        hypertension: false,
        kidneyProblem: false,
        cardiovascular: false,
        obese: false,
        heartDisease: false,
        none: false
    });
    useFocusEffect(
    useCallback(() => {
        dispatch(getUserHealth()).then(() => {
            setFormData({
                diabetic: user.health?.diabetic || false,
                hypertension: user.health?.hypertension || false,
                kidneyProblem: user.health?.kidneyProblem || false,
                cardiovascular: user.health?.cardiovascular || false,
                obese: user?.health?.obese || false,
                heartDisease: user?.health?.heartDisease || false,
                none: user?.health?.none || false,
            });
            setIsLoading(false);
        });
    }, [dispatch, isLoading]));

    useEffect(() => {
        setIsLoading(true);
        if (isUpdated) {
            successMsg('Health declaration updated');

            dispatch(getUserHealth()).then(() => {
                setFormData({
                    diabetic: user.health?.diabetic || false,
                    hypertension: user.health?.hypertension || false,
                    kidneyProblem: user.health?.kidneyProblem || false,
                    cardiovascular: user.health?.cardiovascular || false,
                    obese: user?.health?.obese || false,
                    heartDisease: user?.health?.heartDisease || false,
                    none: user?.health?.none || false,
                });
                setIsLoading(false);
                dispatch(updateUserReset());
            });
        }
    }, [isUpdated]);

    const handleSubmit = () => {
        dispatch(submitHealthDeclaration(formData));
    };

    const handleChange = (name, value) => {
        if (name === 'none' && value) {
            setFormData({
                diabetic: false,
                hypertension: false,
                kidneyProblem: false,
                cardiovascular: false,
                obese: false,
                heartDisease: false,
                none: true
            });
        } else {
            setFormData(prevState => ({
                ...prevState,
                [name]: value,
                none: false
            }));
        }
    };

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            {!isLoading && (
                <>
                    <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 20, color: 'red' }}>Health Declaration Form</Text>
                    <View style={{ marginBottom: 20 }}>
                        <Text style={{ fontSize: 18, marginBottom: 10 }}>Do you have any of the following health conditions? Check all that apply:</Text>
                        <View style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
                            <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                                <Switch
                                    value={formData.diabetic}
                                    onValueChange={value => handleChange('diabetic', value)}
                                    disabled={formData.none}
                                />
                                <Text style={{ marginLeft: 10 }}>Diabetic</Text>
                            </View>
                            <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                                <Switch
                                    value={formData.hypertension}
                                    onValueChange={value => handleChange('hypertension', value)}
                                    disabled={formData.none}
                                />
                                <Text style={{ marginLeft: 10 }}>Hypertension</Text>
                            </View>


                            <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                                <Switch
                                    value={formData.kidneyProblem}
                                    onValueChange={value => handleChange('kidneyProblem', value)}
                                    disabled={formData.none}
                                />
                                <Text style={{ marginLeft: 10 }}>Kidney Problem</Text>
                            </View>


                            <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                                <Switch
                                    value={formData.cardiovascular}
                                    onValueChange={value => handleChange('cardiovascular', value)}
                                    disabled={formData.none}
                                />
                                <Text style={{ marginLeft: 10 }}>Cardiovascular Disease</Text>
                            </View>

                            <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                                <Switch
                                    value={formData.obese}
                                    onValueChange={value => handleChange('obese', value)}
                                    disabled={formData.none}
                                />
                                <Text style={{ marginLeft: 10 }}>Obese</Text>
                            </View>

                            <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                                <Switch
                                    value={formData.heartDisease}
                                    onValueChange={value => handleChange('heartDisease', value)}
                                    disabled={formData.none}
                                />
                                <Text style={{ marginLeft: 10 }}>Heart Disease</Text>
                            </View>


                            <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                                <Switch
                                    value={formData.none}
                                    onValueChange={value => handleChange('none', value)}
                                />
                                <Text style={{ marginLeft: 10 }}>None</Text>
                            </View>

                        </View>
                    </View>
                    <TouchableOpacity
                        onPress={handleSubmit}
                        style={{ backgroundColor: '#4299e1', padding: 10, marginHorizontal:20 ,borderRadius: 5, width: '80%', alignItems: 'center' }}
                        disabled={loading}
                    >
                        {loading ? <ActivityIndicator color="white" /> : <Text style={{ color: 'white', fontWeight: 'bold' }}>Submit</Text>}
                    </TouchableOpacity>
                </>
            )}
        </View>
    );
};

export default HealthDeclarationForm;
