import React, {useState} from 'react';
import {View, Text, StyleSheet, Animated, Image} from 'react-native';
import {Images, Constants, Colors} from '@common';

const FoodItem = ({item, index, fadeAnim, spinanim, scrollX}) => {
  const ITEM_SIZE = Constants.screenWidth;
  const inputRange = [
    (index - 2) * ITEM_SIZE,
    (index - 1) * ITEM_SIZE,
    index * ITEM_SIZE,
  ];
  const translateY = scrollX.interpolate({
    inputRange,
    outputRange: [0, 40, 0],
    extrapolate: 'clamp',
  });

  const animStyle = {
    transform: [
      {
        translateY,
      },
      {
        translateX: translateY,
      },
    ],
  };

  const translateStarY = scrollX.interpolate({
    inputRange,
    outputRange: [0, 50, 150],
    extrapolate: 'clamp',
  });

  const animStartStyle = {
    transform: [
      {
        translateY: translateStarY,
      },
      {
        translateX: translateStarY,
      },
    ],
  };

  const translateStar1Y = scrollX.interpolate({
    inputRange,
    outputRange: [0, -150, 0],
    extrapolate: 'clamp',
  });

  const animStart1Style = {
    transform: [
      {
        translateX: translateStar1Y,
      },
    ],
  };

  const translateStar2Y = scrollX.interpolate({
    inputRange,
    outputRange: [0, 80, 0],
    extrapolate: 'clamp',
  });

  const animStart2Style = {
    transform: [
      {
        translateX: translateStar2Y,
      },
      {
        translateY: translateStarY,
      },
     
    ],
  };

  return (
    <View style={styles.item}>
      <View style={styles.container}>
        <Animated.Image
          resizeMode="contain"
          source={item.cardImage}
          style={[styles.food, animStyle]}
        />
        <Animated.View style={[styles.starContainer]}>
      <Animated.Image resizeMode="contain" source={Images.star} style={[styles.star,animStartStyle] } />
      <Animated.Image resizeMode="contain" source={Images.star} style={[styles.star1, animStart1Style]} />
      <Animated.Image resizeMode="contain" source={Images.star} style={[styles.star2,  animStart2Style]} />
    </Animated.View>
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
    top: 20,
    height: 20,
    width: 20,
  },
  food: {
    height: Constants.screenWidth / 1.5,
  },
});
