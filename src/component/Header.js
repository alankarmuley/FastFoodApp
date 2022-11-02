import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import ButtonImage from './ButtonImage';
import {Images, Colors} from '@common';


const Header = () => {
  return (
    <View style={styles.btnContainer}>
      <ButtonImage imageSource={Images.note} />
      <ButtonImage imageSource={Images.burger} />
      <ButtonImage imageSource={Images.cup} />
      <ButtonImage imageSource={Images.link} />
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
