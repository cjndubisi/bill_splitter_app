import React from 'react';
import {
  ActivityIndicator,
  ActivityIndicatorProps,
  Dimensions,
  View,
} from 'react-native';

let width = Dimensions.get('window').width;
let height = Dimensions.get('window').height;
export default ({ animating }: ActivityIndicatorProps) => {
  if (!animating) {
    return null;
  }
  return (
    <View
      style={{
        position: 'absolute',
        flex: 1,
        height,
        width,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        display: animating ? 'flex' : 'none',
        zIndex: 1,
        top: 0,
        left: 0,
        backgroundColor: 'rgba(52, 52, 52, 0.3)',
      }}
    >
      <View
        style={{
          backgroundColor: 'white',
          height: 100,
          width: 100,
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 10,
        }}
      >
        <ActivityIndicator
          size={'large'}
          color={'gray'}
          animating={animating}
        />
      </View>
    </View>
  );
};
