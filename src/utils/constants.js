import {Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');

const Constants = {
    screenWidth: width,
    screenHeight: height,
    plusButtonTopMargin: width/1.3,
    moveFrom: {x: width/1.45 , y: width - 90},
}   

export default Constants;
