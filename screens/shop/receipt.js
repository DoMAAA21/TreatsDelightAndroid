import React, { useRef,useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { useSelector } from 'react-redux';
import ViewShot from 'react-native-view-shot';
import * as MediaLibrary from 'expo-media-library';
import { topSuccessMsg, topErrorMsg } from '../../shared/toast';
import { ScrollView } from 'react-native-gesture-handler';

export default ReceiptScreen = () => {
    const viewShot = useRef(null);
    const { receipt } = useSelector(state => state.cart);
    const datePart = receipt?.paidAt ? new Date(receipt.paidAt).toISOString().split('T')[0] : '';

    const onCapture = useCallback(async () => {
        try {
            const { status } = await MediaLibrary.requestPermissionsAsync();
            if (status !== 'granted') {
                topErrorMsg('Permission to access media library denied');
                return;
            }
            const uri = await viewShot.current.capture();
            await MediaLibrary.saveToLibraryAsync(uri);
            topSuccessMsg('Image saved to gallery')

        } catch (error) {
            topErrorMsg('Capture Failed');
        }
    }, []);


    return (
        <>
        <ScrollView style={styles.container}>
        <ViewShot  ref={viewShot}  style={styles.receiptContainer}>
            
                <View style={styles.header}>
                    <Text style={styles.title}>Invoice</Text>
                </View>
                <View style={styles.invoiceInfoContainer}>
                    <View style={styles.invoiceInfo}>
                        <Text style={styles.label}>Receipt ID:</Text>
                        <Text style={styles.text}>{receipt?._id}</Text>
                        </View>
                    <View style={styles.invoiceInfo}>
                        <Text style={styles.label}>Date:</Text>
                        <Text style={styles.text}>{datePart}</Text>
                    </View>
                </View>
                <View style={styles.divider} />
                <View style={styles.customerInfoContainer}>
                    <Text style={styles.subtitle}>Customer Information</Text>
                    <View style={styles.customerInfo}>
                        <Text style={styles.label}>Name:</Text>
                        <Text style={styles.text}>{receipt?.user?.name}</Text>
                    </View>
                </View>
                <View style={styles.divider} />
                <View style={styles.itemsContainer}>
                    <Text style={styles.subtitle}>Invoice Items</Text>
                    {receipt?.orderItems?.map((item) => (
                        <View style={styles.item} key={item._id}>
                            <Text style={styles.itemName}>{item.name}</Text>
                            <Text style={styles.itemDetails}>
                                {item.quantity} x ${item.price}
                            </Text>
                            <Text style={styles.itemTotal}>${item.quantity * item.price}</Text>
                        </View>
                    ))}
                </View>
                <View style={styles.divider} />
                <View style={styles.totalContainer}>
                    <Text style={styles.label}>Total:</Text>
                    <Text style={styles.total}>${receipt.totalPrice}</Text>
                </View>
           
           
        </ViewShot>
        </ScrollView>
         <TouchableOpacity onPress={onCapture}>
         <Text>Save as Image</Text>
     </TouchableOpacity>
     </>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        // marginTop: 80,
        marginBottom: 30,
        
    },
    receiptContainer: {
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 10,
        padding: 20,
        marginBottom: 80,
        backgroundColor: 'white'
    },
    header: {
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    invoiceInfoContainer: {
        marginTop: 20,
    },
    invoiceInfo: {
        flexDirection: 'row',
    },
    label: {
        fontWeight: 'bold',
    },
    text: {
        marginLeft: 5,
    },
    divider: {
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
        marginVertical: 20,
    },
    customerInfoContainer: {
        marginTop: 20,
    },
    customerInfo: {
        flexDirection: 'row',
        marginVertical: 5,
    },
    subtitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    itemsContainer: {
        marginTop: 20,
    },
    item: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 5,
    },
    itemName: {
        fontSize: 16,
    },
    itemDetails: {},
    itemTotal: {
        fontWeight: 'bold',
    },
    totalContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginTop: 20,
    },
    total: {
        fontSize: 18,
        fontWeight: 'bold',
    },
});
