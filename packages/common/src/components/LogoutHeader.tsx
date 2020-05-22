import React, { useContext, useEffect } from 'react';
import { AuthContext } from '../context';
import { Icon } from 'react-native-elements';
import { useNavigation, useLinkTo } from '@react-navigation/native';

export default () => {
  const {
    logout,
    state: { isSignedIn },
  } = useContext(AuthContext);
  const linkTo = useLinkTo();

  return (
    <Icon
      name="sign-out"
      iconStyle={{ marginRight: 20, color: 'white' }}
      type="font-awesome"
      onPress={() => {
        logout();
        linkTo('/splash');
      }}
    />
  );
};
