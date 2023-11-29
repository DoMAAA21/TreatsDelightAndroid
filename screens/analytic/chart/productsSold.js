import { View, Text, Dimensions } from "react-native";
import { PieChart } from "react-native-gifted-charts";

const { width } = Dimensions.get('window');
const renderLegend = (data) => {
    return data.map((item, index) => (
        <View key={index} style={{ flexDirection: 'row', marginBottom: 12, marginHorizontal: 10 }}>
            <View
                style={{
                    height: 18,
                    width: 18,
                    marginRight: 10,
                    borderRadius: 4,
                    backgroundColor: item.color || 'white',
                }}
            />
            <Text style={{ color: 'black', fontSize: 16 }}>{item.label || ''}</Text>
        </View>
    ));
};

const ProductsSold = ({ data }) => {
    const totalSum = data.reduce((sum, item) => sum + item.value, 0);

    const colors = ["#FF5733", "#33FF57", "#5733FF", "#FF3366", "#33A6FF", "#FFD700"];
    // const colors = ["#f7aab9", "#f27a93", "#e63f66", "#b21e4b", "#801b40", "#470a1f"];
    // const colors = ["#fff1c9", "#f7b7a3", "#ea5f89", "#9b3192", "#57167e", "#2b0b3f"];
    // const colors = ["#2085ec", "#72b4eb", "#0a417a", "#8464a0", "#cea9bc", "#323232"];

    const newData = data.map((item, index) => ({
        ...item,
        text: `${parseFloat(((item.value / totalSum) * 100).toFixed(2))}%`,
        color: colors[index % colors.length]
    }));

    return (
        <View>
            <PieChart
                labelsPosition='outward'
                radius={width * 0.42}
                strokeColor="white"
                strokeWidth={4}
                donut
                innerCircleColor="#414141"
                innerCircleBorderWidth={4}
                innerCircleBorderColor={'white'}
                showValuesAsLabels={true}
                showText
                textColor="#fff"
                fontStyle="italic"
                textSize={18}
                focusOnPress
                centerLabelComponent={() => {
                    return (
                        <View>
                            <Text style={{ color: 'white', fontSize: 20 }}>Top</Text>
                            <Text style={{ color: 'white', fontSize: 18 }}>Products</Text>
                        </View>
                    );
                }}

                data={newData} />
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', }}>
                {renderLegend(newData)}
            </View>
        </View>

    )
}

export default ProductsSold