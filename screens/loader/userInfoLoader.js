import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { Card } from 'galio-framework';

const screenWidth = Dimensions.get('window').width;
const SkeletonLoader = () => {
    return (
        <View style={styles.container}>
            <Card flex style={styles.card}>
                <View style={styles.contentContainer}>
                    <View style={styles.avatarSkeleton}></View>
                    <View style={styles.nameSkeleton}></View>
                    <View style={styles.infoSkeleton}></View>
                    <View style={styles.infoSkeleton}></View>
                    <View style={styles.infoSkeleton}></View>
                    <View style={styles.infoSkeleton}></View>
                </View>
            </Card>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1, // Make the container full-screen
        backgroundColor: 'white',
    },
    card: {
        margin: 10,
    },
    contentContainer: {
        alignItems: 'center',
        padding: 20,
    },
    avatarSkeleton: {
        width: screenWidth * 0.8, // Responsive avatar size
        height: screenWidth * 0.8,
        borderRadius: (screenWidth * 0.8) / 2,
        marginBottom: 20,
        backgroundColor: '#E0E0E0', // Placeholder color
    },
    nameSkeleton: {
        width: '80%',
        height: 20,
        marginBottom: 10,
        backgroundColor: '#E0E0E0', // Placeholder color
    },
    infoSkeleton: {
        width: '90%',
        height: 20,
        marginBottom: 10,
        backgroundColor: '#E0E0E0', // Placeholder color
    },
});

export default SkeletonLoader;
