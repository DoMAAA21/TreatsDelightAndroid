import React from 'react';
import { View, StyleSheet, Text} from 'react-native';
import ElectricBillChart from './chart/electricBillsPerMonth';

const ElectricBillScreen = () => {
  return (
    <View style={styles.container}>
        <Text style={styles.title}>Electric Bill per Month</Text>
      <ElectricBillChart />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%', // Make it take full width
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingBottom: 20,
  }
});

export default ElectricBillScreen;
