import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Dimensions, Image, ScrollView } from 'react-native';
import { Block, Text } from 'galio-framework';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { getStoreDetails } from '../../store/reducers/store/storeDetailsSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import HeaderCard from './headerCard';
import UserGroup from '../../assets/svg/UserGroup';
import Store from '../../assets/svg/Store';
import Burger from '../../assets/svg/Burger';
import UserSquare from '../../assets/svg/UserSquare';
import Dish from '../../assets/svg/Dish';
import Package from '../../assets/svg/Package';
import Chart from '../../assets/svg/Chart';
import Rent from '../../assets/svg/Rent';
import Faucet from '../../assets/svg/Faucet';
import Electricity from '../../assets/svg/Electricity';
import Wrench from '../../assets/svg/Wrench';

const screenHeight = Dimensions.get('window').height;
const HomeScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [user, setUser] = useState('');
  const [loading, setIsLoading] = useState(false);
  const { store, loading: storeLoading } = useSelector(state => state.storeDetails);
  const currentDate = new Date();
  const options = { month: 'short', day: 'numeric', year: 'numeric' };
  const formattedDate = currentDate.toLocaleDateString(undefined, options);

  useEffect(() => {
    const fetchUserAndStoreDetails = async () => {
      try {
        const storedUser = await AsyncStorage.getItem('user');
        await setUser(JSON.parse(storedUser));

        if (user.role === 'Employee' || user.role === 'Owner') {
          await dispatch(getStoreDetails(user.store.storeId));
          setIsLoading(true);
        } else if (user.role === 'User' || user.role === 'Admin') {
          setIsLoading(true);
        }

      } catch (error) {
        console.error('Error fetching user or store details:', error);
      }
    };
    fetchUserAndStoreDetails();
  }, [user.role]);




  return (

    <>
      <ScrollView >
        <View style={styles.container}>
          {loading ? (
            <HeaderCard user={user} date={formattedDate} store={store} />
          ) : (
            <>
              <View style={[styles.card, { backgroundColor: 'lightgray' }]} />
              <View style={styles.switchSpace} />
            </>
          )
          }
          <View style={styles.grid}>

            {user.role === 'Employee' || user.role === 'Owner' ?
              (
                <>
                  <TouchableOpacity
                    key='Products'
                    style={styles.box}
                    onPress={() => navigation.navigate('Products')}
                  >
                    <Block middle center style={styles.content}>
                      <Burger height={40} width={40} />
                      <Text size={16}>Products</Text>
                    </Block>
                  </TouchableOpacity>

                  <TouchableOpacity
                    key='Employees'
                    style={styles.box}
                    onPress={() => navigation.navigate('Employees')}
                  >
                    <Block middle center style={styles.content}>
                      <UserSquare height={40} width={40} />
                      <Text size={16}>Employees</Text>
                    </Block>
                  </TouchableOpacity>

                  <TouchableOpacity
                    key='Meals'
                    style={styles.box}
                    onPress={() => navigation.navigate('Meals')}
                  >
                    <Block middle center style={styles.content}>
                      <Dish height={40} width={40} />
                      <Text size={16}>Meals</Text>
                    </Block>
                  </TouchableOpacity>

                  <TouchableOpacity
                    key='Stocks'
                    style={styles.box}
                    onPress={() => navigation.navigate('Stocks')}
                  >
                    <Block middle center style={styles.content}>
                      <Package height={40} width={40} />
                      <Text size={16}>Stocks</Text>
                    </Block>
                  </TouchableOpacity>

                  <TouchableOpacity
                    key='Analytics'
                    style={styles.box}
                    onPress={() => navigation.navigate('Analytics')}
                  >
                    <Block middle center style={styles.content}>
                      <Chart height={40} width={40} />
                      <Text size={16}>Analytics</Text>
                    </Block>
                  </TouchableOpacity>
                </>


              ) : user.role === "Admin" ?

                <>

                  <TouchableOpacity
                    key='User'
                    style={styles.box}
                    onPress={() => navigation.navigate('Users')}
                  >
                    <Block middle center style={styles.content}>
                      <UserGroup height={40} width={40} />
                      <Text size={16}>Owners</Text>
                    </Block>
                  </TouchableOpacity>


                  <TouchableOpacity
                    key='Stores'
                    style={styles.box}
                    onPress={() => navigation.navigate('Stores')}
                  >
                    <Block middle center style={styles.content}>
                      <Store height={40} width={40} />
                      <Text size={16}>Stores</Text>
                    </Block>
                  </TouchableOpacity>

                  <TouchableOpacity
                    key='Rent'
                    style={styles.box}
                    onPress={() => navigation.navigate('Rent')}
                  >
                    <Block middle center style={styles.content}>
                      <Rent height={40} width={40} />
                      <Text size={16}>Rent</Text>
                    </Block>
                  </TouchableOpacity>

                  <TouchableOpacity
                    key='Water'
                    style={styles.box}
                    onPress={() => navigation.navigate('Water')}
                  >
                    <Block middle center style={styles.content}>
                      <Faucet height={40} width={40} />
                      <Text size={16}>Water</Text>
                    </Block>
                  </TouchableOpacity>

                  <TouchableOpacity
                    key='Electricity'
                    style={styles.box}
                    onPress={() => navigation.navigate('Electricity')}
                  >
                    <Block middle center style={styles.content}>
                      <Electricity height={40} width={40} />
                      <Text size={16}>Electricity</Text>
                    </Block>
                  </TouchableOpacity>

                  <TouchableOpacity
                    key='Maintenance'
                    style={styles.box}
                    onPress={() => navigation.navigate('Maintenance')}
                  >
                    <Block middle center style={styles.content}>
                      <Wrench height={40} width={40} />
                      <Text size={16}>Maintenance</Text>
                    </Block>
                  </TouchableOpacity>
                </>
                : null
            }





          </View>
        </View>
      </ScrollView>
    </>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 60,
    paddingHorizontal: 16
  },
  card: {
    // backgroundColor: '#ff7f50',
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
    padding: 16,
    width: '100%',
    height: 150,
    margin: 16

  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    margin: 10,
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 10,
    overflow: 'hidden',
    width: screenHeight * 0.12,
    height: screenHeight * 0.12,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',

  },
  switchSpace: {
    height: 48,
  }
});

export default HomeScreen;
