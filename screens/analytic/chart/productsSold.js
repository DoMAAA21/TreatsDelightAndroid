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