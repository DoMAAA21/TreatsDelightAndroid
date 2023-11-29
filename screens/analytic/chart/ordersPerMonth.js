import { Dimensions } from "react-native";
import { LineChart } from "react-native-chart-kit";

const {width} = Dimensions.get('window');

const getMonthName = (monthNumber) => {
        const months = [
            'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'
        ];
        return months[monthNumber - 1];
    };
const OrdersPerMonth = ({ data }) => {
    

    return (
        <>
            <LineChart
                data={{
                    labels: data.map((data) => getMonthName(data._id)),
                    datasets: [
                        {
                            data: data.map((data) => data.totalOrderItems),
                        },
                    ],
                }}
                width={width * 0.9}
                height={300}
                yAxisInterval={1}
                chartConfig={{
                    backgroundColor: "#9ff0eb",
                    backgroundGradientFrom: "#3161c4",
                    backgroundGradientTo: "#1fa9ad",
                    backgroundGradientToOpacity: 0.5,
                    paddingTop: 20,
                    decimalPlaces: 0,
                    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                    style: {
                        borderRadius: 16
                    },
                    propsForDots: {
                        strokeWidth: "1",
                        stroke: "#000"
                    }
                }}
                bezier
                style={{
                    marginVertical: 8,
                    borderRadius: 16
                }}
            />
        </>
    )
};

export default OrdersPerMonth