import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import { Colors } from '@common';


const PayBar = ({total, onPress}) => {
  return (
    <View style={styles.container}>
      <View style={styles.amtContainer}>
        <Text style={styles.amtText}>
          {total}<Text style={styles.dollar}>$</Text>
        </Text>
      </View>
      <TouchableOpacity style={styles.btnContainer} onPress={onPress}>
        <Text style={styles.payText}>Pay</Text>
      </TouchableOpacity>
    </View>
  );
};
export default PayBar;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  btnContainer:{
    backgroundColor: Colors.tint,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  amtContainer: {
    flex: 3,
    marginLeft: 10
  },
  payText:{
    margin: 10,
    fontSize: 30, 
    fontWeight: 'bold',
    color: 'white'
  },
  amtText: {
    fontSize: 30, 
  }, 
  dollar:{
    fontSize: 15, 
  }
});
