import React, {useRef, useState} from 'react';
import {
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
  Animated,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Images, Constants} from '@common';
import useOrder from '../hooks/OrderContext';

// Custom Componenets
import Header from '../component/Header';
import AddressBar from '../component/AddressBar';
import PayBar from '../component/PayBar';
import FoodItem from '../component/FoodItem';

const Home = ({navigation}) => {
  const {products, addToCart, removeFromCart, total} = useOrder();
  const [currentPageIndex , setCurrentPageIndex] = useState(0); 
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const spinanim = useRef(new Animated.Value(0)).current;

  const spinStar = spinanim.interpolate({
    inputRange: [0, 1, 2],
    outputRange: ['0deg', '-90deg', '90deg'],
  });

  const fastFood = [
    {
      id: '1',
      color: 'red',
      title: 'FRIES',
      price: 4,
      cardImage: Images.friedBig,
      movingImage: Images.fray,
      animatedParams: new Animated.ValueXY(Constants.moveFrom),
      moveTo: {x: Constants.screenWidth / 2.5, y: Constants.screenHeight / 1.7},
    },
    {
      id: '2',
      color: 'green',
      title: 'LATTE',
      price: 3,
      cardImage: Images.coke,
      movingImage: Images.coffee,
      animatedParams: new Animated.ValueXY(Constants.moveFrom),
      moveTo: {x: Constants.screenWidth / 2.0, y: Constants.screenHeight / 1.6},
    },
    {
      id: '3',
      color: 'blue',
      title: 'BURGER',
      price: 6,
      cardImage: Images.burgerBig,
      movingImage: Images.hanbao,
      animatedParams: new Animated.ValueXY(Constants.moveFrom),
      moveTo: {
        x: Constants.screenWidth / 3.2,
        y: Constants.screenHeight / 1.55,
      },
    },
  ];

  const moveItemToTray = () => {
    const currentItem = fastFood[currentPageIndex];
    console.log(currentPageIndex)
    Animated.spring(currentItem.animatedParams, {
      toValue: currentItem.moveTo,
      useNativeDriver: false,
    }).start(() => {addToCart(currentItem);});
    // 
  };

  const onViewableItemsChanged = useRef(({ viewableItems }) => {
    setCurrentPageIndex(viewableItems[0].index ?? 0);
  }).current;

  const onMomentumScrollEnd = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
    Animated.timing(spinanim, {
      toValue: currentPageIndex,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const renderItem = ({item}) => (
    <FoodItem item={item} fadeAnim={fadeAnim} spinanim={spinStar} />
  );

  const AddButton = React.memo(({onPress}) => {
    return (
      <TouchableOpacity style={styles.addBtn} onPress={onPress}>
        <Image source={Images.plus} style={styles.addImage} />
      </TouchableOpacity>
    );
  });

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <FlatList
        data={fastFood}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        horizontal={true}
        decelerationRate={0}
        snapToInterval={Constants.screenWidth}
        snapToAlignment={'center'}
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={onViewableItemsChanged}
        onMomentumScrollBegin={() => {
          fadeAnim.setValue(0);
          spinanim.setValue(currentPageIndex);
        }}
        onMomentumScrollEnd={onMomentumScrollEnd}
        viewabilityConfig={{
          itemVisiblePercentThreshold: 50,
        }}
      />
      <Image
        resizeMode="contain"
        source={Images.tray}
        style={styles.trayImage}
      />
      {fastFood.map((item, index) => (
        <Animated.Image
          key={index}
          source={item.movingImage}
          style={[styles.movingImage, item.animatedParams.getLayout()]}
        />
      ))}
      <AddressBar />
      <PayBar total={total} onPress={()=> navigation.navigate('Pay')}/>
      <AddButton onPress={moveItemToTray} />
    </SafeAreaView>
  );
};
export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  addBtn: {
    position: 'absolute',
    zIndex: 1,
    right: 20,
    top: Constants.plusButtonTopMargin,
  },
  addImage: {
    height: 120,
    width: 120,
  },
  trayImage: {
    width: Constants.screenWidth / 1.6,
    alignSelf: 'center',
  },
  movingImage: {
    position: 'absolute',
    height: 80,
    width: 80,
  },
});
