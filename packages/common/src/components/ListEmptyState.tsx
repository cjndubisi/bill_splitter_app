import React from 'react';
import { View } from 'react-native';

import { Text } from 'react-native-elements';

export default ({ title, ...rest }) => (
  <View
    {...rest}
    style={{
      height: 400,
      alignItems: 'center',
      alignContent: 'center',
      justifyContent: 'center',
    }}
  >
    <Text
      style={{
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center',
        color: 'grey',
      }}
    >
      {title}
    </Text>
  </View>
);
