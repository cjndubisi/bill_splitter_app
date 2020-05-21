import React, { useContext, useState, useEffect, useRef } from 'react';
import { View, FlatList } from 'react-native';
import { ListItem, Button, Text } from 'react-native-elements';
import { ApiContext, AuthContext } from '../context';
import AddFriendOverlay from './AddFriendOverlay';
import { useHeaderHeight } from '@react-navigation/stack';

export default ({ navigation, route }) => {
  const {
    state: { groups },
  } = useContext(ApiContext);
  const {
    state: { userId },
  } = useContext(AuthContext);
  const headerHeight = useHeaderHeight();
  const params = route.params;
  const [isShowingAdd, setShowingAddOverly] = useState(false);
  const group = groups.find((item) => item.id.toString() === params.id);
  const addFriend = async () => {
    setShowingAddOverly(!isShowingAdd);
  };

  const keyExtractor = (_, index) => index.toString();

  const renderFriends = ({ item, index }) => (
    <ListItem
      key={index}
      title={item.name}
      titleStyle={{ fontWeight: 'bold' }}
      bottomDivider
    />
  );

  return (
    <View style={{ marginTop: headerHeight }}>
      <View>
        <FlatList
          keyExtractor={keyExtractor}
          data={group?.users || []}
          renderItem={renderFriends}
        />
      </View>
      <Button title={'Add friend'} onPress={addFriend} />
      {isShowingAdd && (
        <AddFriendOverlay
          onDismiss={() => setShowingAddOverly(false)}
          group={group}
        />
      )}
    </View>
  );
};
