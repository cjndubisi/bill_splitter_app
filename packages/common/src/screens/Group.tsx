import React, { useContext, useState, useEffect, useRef } from 'react';
import { View, Platform, FlatList } from 'react-native';
import { ListItem, Input, Button, Text } from 'react-native-elements';
import { ApiContext } from '../context/ApiContext';
import { useParams, useRouteMatch } from 'react-router';
import AddFriendOverlay from './AddFriendOverlay';
import AddBillOverlay from './AddBillOverlay';

export default ({ match: { params } }) => {
  let { id } = useParams();
  const [isShowingAdd, setShowingAddOverly] = useState(false);
  const [isShowingBill, setShowingBillOverly] = useState(false);
  const {
    state: { groups },
  } = useContext(ApiContext);
  let group = groups.find((item) => item.id === id || params.id);

  const addBill = async () => {
    setShowingBillOverly(!isShowingBill);
  };

  const addFriend = async () => {
    setShowingAddOverly(!isShowingAdd);
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
      <View>
        <Text style={{ textAlign: 'center' }}>{group.name}</Text>
        <Text style={{ textAlign: 'center' }}>
          {group.bills?.length || 0} Bills{' '}
        </Text>
        <Button title={'Add Bill'} onPress={addBill} />
      </View>
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
          onDismiss={() => setShowingAddOverly(false)}
          group={group}
        />
      )}
      {isShowingBill && (
        <AddBillOverlay
          onDismiss={() => setShowingBillOverly(false)}
          group={group}
        />
      )}
    </View>
  );
};
