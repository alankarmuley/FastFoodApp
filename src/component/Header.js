import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import ButtonImage from './ButtonImage';
import {Images, Colors} from '@common';


const Header = () => {
  return (
    <View style={styles.btnContainer}>
      <ButtonImage imageSoruce={Images.note} />
      <ButtonImage imageSoruce={Images.burger} />
      <ButtonImage imageSoruce={Images.cup} />
      <ButtonImage imageSoruce={Images.link} />
    </View>
  );
};
export default React.memo(Header);

const styles = StyleSheet.create({
  btnContainer: {
    backgroundColor: Colors.gradientStart ,
    flexDirection: 'row',
  },
});
