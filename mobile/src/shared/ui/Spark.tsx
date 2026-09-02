import React from 'react';
import { Image } from 'react-native';
import { palette } from '../theme';

/** The Attira 4-point spark mark (exported from the Figma component). */
const Spark = ({ size = 16, color = palette.lime }: { size?: number; color?: string }) => (
  <Image
    source={require('../../assets/tab-styleme.png')}
    resizeMode="contain"
    style={{ width: size, height: size, tintColor: color }}
  />
);

export default Spark;
