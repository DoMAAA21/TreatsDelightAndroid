import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { View, Text, StyleSheet, Image, Dimensions, ScrollView ,ActivityIndicator} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Card } from 'galio-framework';
import Icon from 'react-native-vector-icons/FontAwesome';
import SkeletonLoader from '../loader/userInfoLoader';
import { getStoreDetails } from '../../store/reducers/store/storeDetailsSlice';

const screenWidth = Dimensions.get('window').width;
const StoreInfo = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const route = useRoute();
  const { store, loading } = useSelector(state => state.storeDetails);
  const { storeId } = route.params;
  
  useEffect(() => {
    dispatch(getStoreDetails(storeId));

   
  }, [dispatch, storeId]);


  if (loading) {
    return (
      <SkeletonLoader/>
    );
  }

  return (
    
    <ScrollView style={styles.container}>
        <Card
        flex
        style={styles.card}
       
      >
      <View style={styles.contentContainer}>
        <Image source={{ uri: store?.logo?.url }} style={styles.avatar} />
        <Text style={styles.name}>
          {store.name}
        </Text>
        <View style={styles.info}>
          <Icon name="quote-left" size={20} style={styles.icon} />
          <Text style={styles.infoText}>"{store.slogan}"</Text>
        </View>
        <View style={styles.info}>
          <Icon name="list" size={20} style={styles.icon} />
          <Text style={styles.infoText}>Stall No. :{store.stall}</Text>
        </View>
        <View style={styles.info}>
          <Icon name="location-arrow" size={20} style={styles.icon} />
          <Text style={styles.infoText}>{store.location}</Text>
        </View>
        <View style={styles.info}>
          <Icon name="check" size={20} style={styles.icon} />
          <Text style={styles.infoText}>Is Active:{store?.active?.toString()}</Text>
        </View>
      </View>
      </Card>
    </ScrollView>
    
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1, // Make the container full-screen
      backgroundColor: 'white',
    },
    card: {
        margin: 10,
      },
    contentContainer: {
      alignItems: 'center',
      padding: 20,
    },
    avatar: {
      width: screenWidth * 0.8, // Responsive avatar size
      height: screenWidth * 0.8,
      borderRadius: (screenWidth * 0.8) / 2,
      marginBottom: 20,
    },
    name: {
      fontSize: 35,
      fontWeight: 'bold',
      marginBottom: 10,
    },
    info: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 10,
    },
    icon: {
      marginRight: 10,
    },
    infoText: {
      fontSize: 30,
    },
  });

export default StoreInfo;
