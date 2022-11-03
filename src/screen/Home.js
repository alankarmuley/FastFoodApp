import React, {useRef, useState} from 'react';
import {
  FlatList,
  StyleSheet,
  Image,
  Animated,
  Pressable,
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
  const {addToCart, total} = useOrder();
  const [currentPageIndex , setCurrentPageIndex] = useState(0); 
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const scrollX = useRef(new Animated.Value(0)).current;

  const fastFood = [
    {
      id: '1',
      title: 'FRIES',
      price: 4,
      cardImage: Images.friedBig,
      movingImage: Images.fray,
      animatedScale: new Animated.Value(0),
      animatedParams: new Animated.ValueXY(Constants.moveFrom),
      moveTo: {x: Constants.screenWidth / 2.2, y: Constants.screenHeight / 1.9},
    },
    {
      id: '2',
      title: 'LATTE',
      price: 3,
      cardImage: Images.coke,
      movingImage: Images.coffee,
      animatedScale: new Animated.Value(0),
      animatedParams: new Animated.ValueXY(Constants.moveFrom),
      moveTo: {x: Constants.screenWidth / 1.9, y: Constants.screenHeight / 1.7},
    },
    {
      id: '3',
      title: 'BURGER',
      price: 6,
      cardImage: Images.burgerBig,
      movingImage: Images.hanbao,
      animatedScale: new Animated.Value(0),
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
    Animated.spring(currentItem.animatedScale, {
      toValue: 2,
      useNativeDriver: false,
    }).start();
  };

  const onViewableItemsChanged = useRef(({ viewableItems }) => {
    setCurrentPageIndex(viewableItems[0].index ?? 0);
  }).current;

  const onMomentumScrollEnd = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 400,
      useNativeDriver: true,
    }).start();
  };

  const renderItem = ({item ,index}) => (
    <FoodItem item={item} index={index} fadeAnim={fadeAnim} scrollX={scrollX} />
  );

  const AddButton = React.memo(({onPress}) => {
    return (
      <Pressable style={styles.addBtn} onPress={onPress}>
        <Image source={Images.plus} style={styles.addImage} />
      </Pressable>
    );
  });

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <Animated.FlatList
        data={fastFood}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        horizontal={true}
        bounces={false}
        decelerationRate={0}
        snapToInterval={Constants.screenWidth}
        snapToAlignment='start'
        scrollEventThrottle={16}
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={onViewableItemsChanged}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
        onMomentumScrollBegin={() => {
          fadeAnim.setValue(0.5);
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
      {fastFood.map((item, index) => {
        const animationScale = { transform: [{scale: item.animatedScale}]}
        return (<Animated.Image
          key={index}
          source={item.movingImage}
          style={[styles.movingImage, animationScale,  item.animatedParams.getLayout()]}
        />)
      }
      )}
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
    height: 90,
    width: 90,
  },
  trayImage: {
    width: Constants.screenWidth / 1.1,
    alignSelf: 'center',
  },
  movingImage: {
    position: 'absolute',
    height: 80,
    width: 80,
  },
});
