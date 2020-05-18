import React from 'react';
import { ButtonProps } from '../types';
import { Button, Text } from '../styled';

export default ({
  title,
  onPress,
  bold,
  backgroundColor = 'lightblue',
  titleColor = 'black',
}: ButtonProps) => {

  return (
    <Button
      activeOpacity={0.8}
      onPress={onPress}
      backgroundColor={backgroundColor}
    >
      <Text style={{ color: titleColor }} bold={bold}>
        {title}
      </Text>
    </Button>
  );
};
