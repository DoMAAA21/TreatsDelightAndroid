import { View, Text } from "react-native";
import { BarChart } from "react-native-gifted-charts";
import { Dimensions } from "react-native";

const { width } = Dimensions.get('window');

const getMonthName = (monthNumber) => {
    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];
    return months[monthNumber - 1];
};
const SalesPerMonth = ({ data }) => {
    const chartData = data.map((item) => ({
        value: item.totalSales,
        label: getMonthName(item._id), 
    }));

    return (
        <BarChart
            yAxisLabelWidth={50}
            yAxisLabelPrefix='P'
            yAxisTextStyle={{fontStyle: 'italic'}}
            noOfSections={3}
            barBorderRadius={4}
            frontColor="#4ADDBA"
            data={chartData}
            yAxisThickness={0}
            xAxisThickness={0}
            width={width * 0.75}
            sideColor='#36D9B2'
            topColor='#7DE7CE'
            isThreeD
            barWidth={40}
            isAnimated
            renderTooltip={(item, index) => {
                return (
                  <View
                    style={{
                      marginBottom: 20,
                      marginLeft: -6,
                      backgroundColor: '#ffcefe',
                      paddingHorizontal: 6,
                      paddingVertical: 4,
                      borderRadius: 4,
                    }}>
                    <Text>₱{item.value}</Text>
                  </View>
                );
              }}
            
        />
    );
};

export default SalesPerMonth