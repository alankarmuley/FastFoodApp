import React from 'react';
import {StyleSheet, TouchableOpacity, Image} from 'react-native';

const ButtonImage = ({imageSource, containerStyle}) => {
  return (
    <TouchableOpacity style={[styles.container, containerStyle]}>
      <Image
        resizeMode="contain"
        source={imageSource}
        style={styles.btnImage}
      />
    </TouchableOpacity>
  );
};

export default React.memo(ButtonImage);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  },
  btnImage: {
    height: 40,
    width: 40,
    marginVertical: 10,
  },
});
