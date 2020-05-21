import React, { useContext } from 'react';
import { Icon } from 'react-native-elements';
import { ApiContext } from '../context';

export default (props) => {
  const { allGroups } = useContext(ApiContext);
  return (
    <Icon
      {...props}
      name="refresh"
      iconStyle={{ marginRight: 20, color: 'white' }}
      type="font-awesome"
      onPress={allGroups}
    />
  );
};
