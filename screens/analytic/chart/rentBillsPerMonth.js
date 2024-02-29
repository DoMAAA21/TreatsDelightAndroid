import React, { useCallback } from "react";
import { View, ActivityIndicator, Dimensions } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import { BarChart } from "react-native-gifted-charts";
import { fetchRentBillPerMonth } from "../../../store/reducers/chart/rentBillsPerMonthSlice";

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

const RentBillChart = () => {
    const dispatch = useDispatch();
    const { rentBillsPerMonth, loading } = useSelector(state => state.rentBill);

    useFocusEffect(
        useCallback(() => {
            dispatch(fetchRentBillPerMonth());
        }, [dispatch])
    );

    const chartData = rentBillsPerMonth.map((bill) => ({
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



export default RentBillChart;
