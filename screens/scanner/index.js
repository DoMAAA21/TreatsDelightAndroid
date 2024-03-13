import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Camera } from 'expo-camera';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { newScanOrder, newScanOrderReset, clearErrors } from '../../store/reducers/myorder/scanOrderSlice';
import { topErrorMsg, topSuccessMsg } from '../../shared/toast';

const QRCodeScannerScreen = () => {
    const dispatch = useDispatch();
    const { success, error } = useSelector(state => state.newScan);
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);

    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

    useEffect(() => {
        if (success) {
            topSuccessMsg("Transaction Complete");
            dispatch(newScanOrderReset());
            return
        }

        if (error) {
            topErrorMsg(error);
            dispatch(clearErrors());
            return
        }
    }, [success, error])

    const handleBarCodeScanned = ({ type, data }) => {
        setScanned(true);
        dispatch(newScanOrder(data));
    };

    if (hasPermission === null) {
        return
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }

    return (

        <View style={styles.container}>
            <BarCodeScanner
                onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                style={StyleSheet.absoluteFillObject}
            />
            {scanned &&
                <TouchableOpacity style={styles.button} onPress={() => setScanned(false)} >
                    <Text style={styles.buttonText}>Scan Again</Text>
                </TouchableOpacity>}
        </View>


    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-end',

    },
    button: {
        width: '95%',
        borderRadius: 10,
        backgroundColor: '#6366F1',
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginHorizontal: 12,
        marginVertical: 20,
        alignItems: 'center'
    },
    buttonText: {
        color: 'white',
        fontSize: 16
    }
});

export default QRCodeScannerScreen;
