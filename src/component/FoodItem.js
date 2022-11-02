import React, {useState} from 'react';
import {View, Text, StyleSheet, Animated, Image} from 'react-native';
import {Images, Constants, Colors} from '@common';

const Stars = ({spinanim}) => {
  return (
    <Animated.View
      style={[styles.starContainer, {transform: [{rotate: spinanim}]}]}>
      <Image resizeMode="contain" source={Images.star} style={styles.star} />
      <Image resizeMode="contain" source={Images.star} style={styles.star1} />
      <Image resizeMode="contain" source={Images.star} style={styles.star2} />
    </Animated.View>
  );
};

const FoodItem = ({item, fadeAnim, spinanim}) => {
  return (
    <View style={styles.item}>
      <View style={styles.container}>
        <Image
        resizeMode="contain"
          source={item.cardImage}
          style={styles.food}
        />
        <Stars spinanim={spinanim} />
      </View>
      <Animated.View style={[styles.container, {opacity: fadeAnim}]}>
        <Text style={styles.title}>
          {item.title}
          <Text style={styles.price}>
            {'\n'}
            {item.price}$
          </Text>
        </Text>
      </Animated.View>
    </View>
  );
};

export default FoodItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: 40,
  },
  starContainer: {
    position: 'absolute',
    height: 180,
    width: 120,
  },
  item: {
    flex: 1,
    flexDirection: 'row',
    height: Constants.screenWidth / 1.5,
    width: Constants.screenWidth,
  },
  title: {
    fontSize: 30,
    color: Colors.tint,
    textAlign: 'right',
  },
  price: {
    fontSize: 14,
  },
  star: {
    position: 'absolute',
    left: 10,
    top: 5,
    height: 20,
    width: 20,
  },
  star1: {
    position: 'absolute',
    right: 0,
    height: 12,
    width: 12,
  },
  star2: {
    position: 'absolute',
    bottom: 10,
    height: 10,
    width: 10,
  },
  food: {
    height: Constants.screenWidth/1.5,
  },
});
