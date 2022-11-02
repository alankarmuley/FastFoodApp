import React, {useRef, useState} from 'react';
import {
  FlatList,
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  Animated,
  Text,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import useOrder from '../hooks/OrderContext';

const Pay = ({navigation}) => {
  const {products, addToCart, removeFromCart, total} = useOrder();

  const renderItem = ({item}) => {
    return (
      <View style={styles.cardContainer}>
        <Image
          resizeMode="contain"
          source={item.cardImage}
          style={styles.image}
        />
        <View style={styles.detailContainer}>
          <Text>{item.title}</Text>
          <Text>{item.price}</Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList data={[...new Set(products)]} renderItem={renderItem} />
      <Text style={styles.amtText}>
        {total}
        <Text style={styles.dollar}>$</Text>
      </Text>
    </SafeAreaView>
  );
};

export default Pay;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  amtText: {
    fontSize: 30,
    textAlign: 'right',
    marginRight: 20
  },
  dollar: {
    fontSize: 15,
  },
  cardContainer: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: 'white',
  },
  image: {
    width: 80,
    height: 80,
    margin: 10,
  },
  detailContainer:{
    flex: 1,
    justifyContent: 'center'
  }
});
