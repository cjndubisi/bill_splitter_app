import React from 'react';
import { useRoute, useLinkTo } from '@react-navigation/native';
import { Icon } from 'react-native-elements';

export default (props) => {
  const linkTo = useLinkTo();
  const { params } = useRoute();

  return (
    <Icon
      {...props}
      name="cog"
      iconStyle={{ marginRight: 20, color: 'white' }}
      type="font-awesome"
      onPress={() => linkTo(`/groups/${(params as any).id}/settings`)}
    />
  );
};
