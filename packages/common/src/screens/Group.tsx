import React, { useContext, useState, useEffect, useRef } from 'react';
import { View, Platform, FlatList } from 'react-native';
import { ListItem, Input, Button, Text } from 'react-native-elements';
import { ApiContext } from '../context/ApiContext';
import { useParams, useRouteMatch } from 'react-router';
import AddFriendOverlay from './AddFriendOverlay';

export default ({ match: { params } }) => {
  let { id } = useParams();
  const [isShowingAdd, setShowingOverly] = useState(false);
  const {
    addFriendToGroup,
    state: { groups },
  } = useContext(ApiContext);
  let group = groups.find((item) => item.id === id || params.id);

  const addFriend = async () => {
    setShowingOverly(!isShowingAdd);
  };

  const keyExtractor = (_, index) => index.toString();

  const renderItem = ({ item, index }) => (
    <ListItem
      key={index}
      title={item.name}
      titleStyle={{ fontWeight: 'bold' }}
      bottomDivider
    />
  );

  return (
    <View>
      <Text></Text>
      <View>
        <FlatList
          keyExtractor={keyExtractor}
          data={group?.users || []}
          renderItem={renderItem}
        />
      </View>
      <Button title={'Add friend'} onPress={addFriend} />
      {isShowingAdd && (
        <AddFriendOverlay
          onDismiss={() => setShowingOverly(false)}
          group={group}
        />
      )}
    </View>
  );
};
