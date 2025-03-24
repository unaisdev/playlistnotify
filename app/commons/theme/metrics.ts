import {Dimensions, PixelRatio} from 'react-native';

export const SCREEN_WIDTH = Dimensions.get('window').width;
export const SCREEN_HEIGHT = Dimensions.get('window').height;

//based on iphone 11 pro's scale
const scale = SCREEN_WIDTH / 375;
const scaleHeight = SCREEN_HEIGHT / 812;

export const normalize = (size: number, foreight?: boolean) => {
  const newsize = size * (foreight ? scaleHeight : scale);
  return Math.round(PixelRatio.roundToNearestPixel(newsize));
};

export const insets = {
    paddingHorizontal: 12,
    paddingVertical: 12,
}