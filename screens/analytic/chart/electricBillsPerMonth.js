import { useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { View, ActivityIndicator } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { LineChartBicolor } from "react-native-gifted-charts";
import { fetchElectricBillPerMonth } from "../../../store/reducers/chart/electricBillsPerMonthSlice";




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

    const chartData = electricBillsPerMonth.map((bill) => ({
        label: getMonthName(bill.month),
        value: bill.totalBill
    }));

    



    if (loading && !electricBillsPerMonth) {
        return <ActivityIndicator />
    }

    return (
        <View style={{ flex: 1, width: '100%' }}>
            <LineChartBicolor
                data={chartData}
                areaChart
                color="green"
                colorNegative="red"
                startFillColor="green"
                startFillColorNegative="red"

            />
        </View>
    )
}

export default ElectricBillChart;