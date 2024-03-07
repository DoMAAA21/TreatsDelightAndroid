import React, { useCallback } from "react";
import { View, ActivityIndicator, Dimensions } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import { BarChart } from "react-native-gifted-charts";
import { fetchElectricBillPerMonth } from "../../../store/reducers/chart/electricBillsPerMonthSlice";

const { width } = Dimensions.get('window');

function getMonthName(monthNumber) {
    const months = [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];
    if (monthNumber >= 1 && monthNumber <= 12) {
        return months[monthNumber - 1];
    } else {
        return "Invalid Month";
    }
}

const ElectricBillChart = () => {
    const dispatch = useDispatch();
    const { electricBillsPerMonth, loading } = useSelector(state => state.electricBill);

    useFocusEffect(
        useCallback(() => {
            dispatch(fetchElectricBillPerMonth());
        }, [dispatch])
    );

    console.log(electricBillsPerMonth);

    const chartData = electricBillsPerMonth.map((bill) => ({
        label: getMonthName(bill.month),
        value: bill.totalBill
    }));

    if (loading) {
        return <ActivityIndicator />;
    }

    return (
        <View >
            <BarChart
                 frontColor="#6366F1"
                data={chartData}
                width={width / 1.4}
                color="red"
                colorNegative="red"
                 
            />
        </View>
    );
};



export default ElectricBillChart;
