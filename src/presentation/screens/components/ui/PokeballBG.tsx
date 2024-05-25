import React, {useContext} from 'react';
import {Image, ImageStyle, StyleProp} from 'react-native';
import {ThemeContext} from '../../context/themeContext';

interface Props {
  style?: StyleProp<ImageStyle>;
}

const PokeballBG = ({style}: Props) => {
  const {isDark} = useContext(ThemeContext);
  const pokeballImg = isDark
    ? require('../../../../assets/pokeball-dark.png')
    : require('../../../../assets/pokeball-light.png');
  return (
    <Image
      source={pokeballImg}
      style={[
        {
          width: 300,
          height: 300,
          opacity: 0.3,
        },
        style,
      ]}
    />
  );
};

export default PokeballBG;
