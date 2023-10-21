import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { View, Text, StyleSheet, Image, Dimensions, ScrollView} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Card } from 'galio-framework';
import Icon from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import SkeletonLoader from '../loader/userInfoLoader';
import { getUserDetails } from '../../store/reducers/user/userDetailsSlice';

const screenWidth = Dimensions.get('window').width;
const UserInfo = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const route = useRoute();
  const { user, loading } = useSelector(state => state.userDetails);
  const { userId } = route.params;

  useEffect(() => {
    dispatch(getUserDetails(userId));
  }, [dispatch, userId]);


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
        <Image source={{ uri: user?.avatar?.url }} style={styles.avatar} />
        <Text style={styles.name}>
          {user.fname} {user.lname}
        </Text>
        <View style={styles.info}>
          <Icon name="envelope" size={20} style={styles.icon} />
          <Text style={styles.infoText}>{user.email}</Text>
        </View>
        <View style={styles.info}>
          <Icon name="graduation-cap" size={20} style={styles.icon} />
          <Text style={styles.infoText}>{user.course}</Text>
        </View>
        <View style={styles.info}>
          <Icon name="globe" size={20} style={styles.icon} />
          <Text style={styles.infoText}>{user.religion}</Text>
        </View>
        <View style={styles.info}>
          <Icon name="user" size={20} style={styles.icon} />
          <Text style={styles.infoText}>{user.role}</Text>
        </View>
        {user?.store?.name ? (
           <View style={styles.info}>
           <FontAwesome5 name="store" size={20} style={styles.icon} />
           <Text style={styles.infoText}>{user?.store?.name}</Text>
         </View>
        ) : null }
       
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

export default UserInfo;
