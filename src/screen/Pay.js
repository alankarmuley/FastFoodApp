import React, {useRef, useState} from 'react';
import {
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
  Animated,
  Text,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import useOrder from '../hooks/OrderContext';

const Pay = ({navigation}) => {
  const {products, addToCart, removeFromCart, total} = useOrder();

  return (
    <SafeAreaView style={styles.container}>
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
    textAlign: 'center'
  },
  dollar:{
    fontSize: 15, 
  }
});
