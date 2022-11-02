import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Images} from '@common';
import ButtonImage from './ButtonImage';
const AddressBar = () => {
  return (
    <View style={styles.container}>
      <ButtonImage imageSource={Images.marker} />
      <View style={styles.textContainer}>
        <Text numberOfLines={2}>
          Dongcheng District Metro{'\n'}Cultural Building
        </Text>
      </View>
      <ButtonImage imageSource={Images.phone} />
    </View>
  );
};
export default React.memo(AddressBar);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textContainer: {
    flex: 5,
  },
});
