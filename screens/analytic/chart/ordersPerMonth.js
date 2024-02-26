import { Dimensions } from "react-native";
import { LineChart } from "react-native-gifted-charts"; // Import from react-native-gifted-charts

const { width } = Dimensions.get('window');

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
                data={data}
                color={'#177AD5'}
                thickness={3}
                dataPointsColor={'red'}
            />
        </>
    )
};

export default OrdersPerMonth;
