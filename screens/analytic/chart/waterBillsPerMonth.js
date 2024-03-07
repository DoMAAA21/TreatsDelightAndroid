import React, { useCallback } from "react";
import { View, ActivityIndicator, Dimensions } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import { BarChart } from "react-native-gifted-charts";
import { fetchWaterBillPerMonth } from "../../../store/reducers/chart/waterBillsPerMonthSlice";

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

// Function to convert large numbers to a simplified form (e.g., 1k, 2k, 3.5k)
function simplifyNumber(number) {
    if (number < 10000) return (number / 1000).toFixed(1); // Less than 10k, show 1 decimal place
    return Math.round(number / 1000); // More than 10k, round to nearest integer
}

const WaterBillChart = () => {
    const dispatch = useDispatch();
    const { waterBillsPerMonth, loading } = useSelector(state => state.waterBill);
   
    useFocusEffect(
        useCallback(() => {
            dispatch(fetchWaterBillPerMonth());
        }, [dispatch])
    );

    const chartData = waterBillsPerMonth.map((bill) => ({
        label: getMonthName(bill.month),
        value: simplifyNumber(bill?.totalBill) // Simplify the number before passing it to the chart
    }));

    if (loading) {
        return <ActivityIndicator />;
    }

    return (
        <View>
            <BarChart
                frontColor="#6366F1"
                data={chartData}
                width={width / 1.4}
                color="red"
                yAxisLabelSuffix ={`k`}
            />
        </View>
    );
};

export default WaterBillChart;
