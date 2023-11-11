import { View, Text, Image, StyleSheet, FlatList } from 'react-native';

const PostList = () => {
  const data = [
    {
      id: '1',
      image: 'https://www.bootdey.com/image/1260x750/8A2BE2/000000',
      title: 'Cute Cat',
      subtitle: 'Feline friend'
    },
    {
      id: '2',
      image: 'https://www.bootdey.com/image/1260x750/5F9EA0/000000',
      title: 'Majestic Mountain',
      subtitle: 'Natural wonder'
    },
    {
      id: '3',
      image: 'https://www.bootdey.com/image/1260x750/FF7F50/000000',
      title: 'Delicious Pizza',
      subtitle: 'Yum!'
    },
    {
      id: '4',
      image: 'https://www.bootdey.com/image/1260x750/00FFFF/000000',
      title: 'Beautiful Beach',
      subtitle: 'Paradise'
    },
    {
      id: '5',
      image: 'https://www.bootdey.com/image/1260x750/FF00FF/000000',
      title: 'Crazy Concert',
      subtitle: 'Rock on!'
    },
  ];


  const renderItem = ({ item, index }) => {
    return (
      <View style={styles.itemContainer}>
        <Image source={{ uri: item.image }} style={styles.image} />
        <View style={styles.textContainer}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.subtitle}>{item.subtitle}</Text>
        </View>
      </View>
    );
  };

  return (
    <FlatList
      data={data}
      contentContainerStyle={styles.container}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      numColumns={2}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor:'#fff'
  },
  itemContainer: {
    flex: 1,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection:  'column' 
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    borderRadius: 8,
  },
  textContainer: {
    padding: 16,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  subtitle: {
    fontSize: 14,
    color: 'gray',
  },
});

export default PostList;