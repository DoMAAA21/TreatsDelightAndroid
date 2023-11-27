import { LineChart } from "react-native-chart-kit";
import { View, Text, Dimensions } from "react-native";

const ChartSreen = () => {
    return (
        <View>
            <Text>Bezier Line Chart</Text>
            <LineChart
                data={{
                    labels: ["January", "February", "March", "April", "May", "June",],
                    datasets: [
                        {
                            data: [
                                Math.random() * 100,
                                Math.random() * 100,
                                Math.random() * 100,
                                Math.random() * 100,
                                Math.random() * 100,
                                Math.random() * 100
                            ]
                        }
                    ]
                }}
                width={Dimensions.get("window").width} // from react-native
                height={300}
                yAxisLabel="$"
                yAxisSuffix="k"
                yAxisInterval={1} // optional, defaults to 1
                chartConfig={{
                    // backgroundColor: "#e26a00",
                    // backgroundGradientFrom: "#fb8c00",
                    // backgroundGradientTo: "#ffa726",
                    backgroundGradientFrom: "#1E2923",
                    backgroundGradientFromOpacity: 0,
                    backgroundGradientTo: "#08130D",
                    backgroundGradientToOpacity: 0.5,
                    decimalPlaces: 2, // optional, defaults to 2dp
                    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                    style: {
                        borderRadius: 16
                    },
                    propsForDots: {
                        r: "6",
                        strokeWidth: "2",
                        stroke: "#ffa726"
                    }
                }}
                bezier
                style={{
                    marginVertical: 8,
                    borderRadius: 16
                }}
            />
        </View>
    )
}

export default ChartSreen
