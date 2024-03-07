import { View, Text, StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get('window');

const Card = ({ title, value, icon, ...props }) => {
  return (
    <View style={[styles.card, props.style]}>
      {icon && <View style={styles.iconContainer}>{icon}</View>}
      <View style={styles.textContainer}>
        <Text style={[styles.cardTitle, props.titleStyle]}>{title}</Text>
        <Text style={[styles.cardValue, props.valueStyle]}>{value}</Text>
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  card: {
    flexDirection: 'row', 
    backgroundColor: 'white',
    padding: 12,
    borderRadius: 10,
    width: width * 0.45, 
    height: height * 0.11,
    alignItems: 'center',
    elevation: 3, 
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  iconContainer: {
    marginRight: 10,
  },
  textContainer: {
    flex: 1, 
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  cardValue: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default Card;
