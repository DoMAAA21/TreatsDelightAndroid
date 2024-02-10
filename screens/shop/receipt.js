import React, { useRef, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useSelector } from 'react-redux';
import ViewShot from 'react-native-view-shot';
import * as MediaLibrary from 'expo-media-library';
import { topSuccessMsg, topErrorMsg } from '../../shared/toast';
import { ScrollView } from 'react-native-gesture-handler';
import _ from 'lodash';
import QRCode from 'react-native-qrcode-svg';

export default ReceiptScreen = () => {
    const viewShot = useRef(null);
    const { receipt, qrCode } = useSelector(state => state.cart);
    console.log(qrCode);
    const datePart = receipt?.paidAt ? new Date(receipt.paidAt).toISOString().split('T')[0] : '';
    const groupedItems = _.groupBy(receipt?.orderItems, 'storeId');

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
                <ViewShot ref={viewShot} style={styles.receiptContainer}>

                    <View style={styles.header}>
                        <Image
                            source={require('../../assets/capstone_logo.png')}
                            style={styles.logo}
                        />
                        <Text style={styles.title}>Receipt</Text>
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
                    <View>
                        <Text style={styles.subtitle}>Items</Text>
                        {Object.keys(groupedItems).map(storeId => (
                            <View key={storeId}>
                                <Text style={styles.storeName}>Store: {groupedItems[storeId][0].storeName}</Text>
                                <View style={styles.storeDivider} />
                                {groupedItems[storeId].map(item => (
                                    <View style={styles.item} key={item._id}>
                                        <Text style={styles.itemName}>{item.name}</Text>
                                        <Text style={styles.itemDetails}>
                                            {item.quantity} x ₱{item.price}
                                        </Text>
                                        <Text style={styles.itemTotal}>₱{item.quantity * item.price}</Text>
                                    </View>
                                ))}
                                <View style={styles.subtotalContainer}>
                                    <Text style={styles.subtotalLabel}>Subtotal:</Text>
                                    <Text style={styles.subtotalValue}>
                                        ₱{_.sumBy(groupedItems[storeId], item => item.quantity * item.price)}
                                    </Text>
                                </View>
                            </View>
                        ))}
                    </View>
                    <View style={styles.divider} />
                    <View style={styles.totalContainer}>
                        <Text style={styles.label}>Total:</Text>
                        <Text style={styles.total}>₱{receipt.totalPrice}</Text>
                    </View>
                    {qrCode &&
                    <View style={styles.qrCode}>
                        <QRCode
                            value={qrCode}
                            size={200}
                            color="black"
                            backgroundColor="white"
                        />
                    </View>
                    }
                </ViewShot>
            </ScrollView>
            <TouchableOpacity style={styles.button} onPress={onCapture}>
                <Text style={styles.buttonText} >Save as Image</Text>
            </TouchableOpacity>

        </>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        marginBottom: 10,
        backgroundColor: '#ebf0f7'
    },
    receiptContainer: {
        borderWidth: 0.5,
        borderColor: 'black',
        borderRadius: 0,
        padding: 20,
        marginBottom: 80,
        backgroundColor: 'white'
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    logo: {
        width: 60,
        height: 60,
        borderRadius: 30
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
    storeDivider: {
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
        marginVertical: 5,
        marginEnd: 10,
        marginStart: 10
    },
    divider: {
        borderBottomColor: 'black',
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
    storeName: {
        fontSize: 16,
        fontWeight: '500',
        fontStyle: 'italic',
    },
    item: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 5,
    },
    itemName: {
        flex: 2,
        fontSize: 16,
    },
    itemDetails: {
        flex: 1,
    },
    itemTotal: {
        flex: 0.6,
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
    subtotalContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginTop: 10,
    },
    subtotalLabel: {
        fontWeight: 'bold',
        marginRight: 5,
        width: 60,
    },
    subtotalValue: {
        fontWeight: 'bold',
        width: 52,
    },
    button: {
        backgroundColor: '#3498db',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        alignItems: 'center',
        margin: 10,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    qrCode: {
        marginVertical: 20,
        justifyContent: 'center', 
        alignItems: 'center', 
      },
});
