import React, { useContext, useState, useEffect, useRef } from 'react';
import { View, Platform, FlatList } from 'react-native';
import { ListItem, Input, Button, Text } from 'react-native-elements';
import { ApiContext } from '../context/ApiContext';
import { useParams, useHistory, RouteComponentProps } from 'react-router';
import { Switch, Link, Route } from '../router';
import AddFriendOverlay from './AddFriendOverlay';
import AddBillOverlay from './AddBillOverlay';
import { Bill } from '../api/types';
import { AUTH_USER_ID_KEY } from '../utils';
import AsyncStorage from '@react-native-community/async-storage';
import PrivateRoute from '../router/PrivateRoute';
import Balance from './Balance';

export default ({ match }: RouteComponentProps) => {
  const { url, params } = match;
  const history = useHistory();
  const { id } = useParams();
  const [isShowingAdd, setShowingAddOverly] = useState(false);
  const [isShowingBill, setShowingBillOverly] = useState(false);
  const [currentUser, setCurrentUser] = useState<number>(-1);

  const {
    state: { groups },
  } = useContext(ApiContext);
  let group = groups.find((item) => item.id === id || (params as any).id);

  const addBill = async () => {
    setShowingBillOverly(!isShowingBill);
  };

  const firstTime = useRef(true);

  useEffect(() => {
    const currentUser = async () => {
      const id = await AsyncStorage.getItem(AUTH_USER_ID_KEY);
      setCurrentUser(parseInt(id));
    };
    if (firstTime.current) {
      firstTime.current = false;
    }

    currentUser();
  }, [currentUser]);

  if (firstTime.current) {
    return null;
  }

  const showBalance = () => {
    history.push(`${url}/balances`);
  };

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

  const renderBill = ({ item, index }: { item: Bill; index: number }) => {
    const payer = group.users.find((user) => user.id === item.payerId);
    const action = payer.id === currentUser ? 'lent' : 'borrowed';
    const perPerson = item.amount / group.users.length;
    const details = `you ${action} \n $${(
      perPerson *
      (group.users.length - 1)
    ).toFixed(2)}`;
    return (
      <ListItem
        key={index}
        title={item.name}
        subtitle={`${payer.name} paid $${item.amount}`}
        rightTitle={details.charAt(0).toUpperCase() + details.slice(1)}
        rightTitleStyle={{ textAlign: 'right', fontSize: 12 }}
        titleStyle={{ fontWeight: 'bold' }}
        bottomDivider
      />
    );
  };

  return (
    <View>
      <View style={{ backgroundColor: 'lightblue' }}>
        <Text style={{ textAlign: 'center', fontSize: 30, fontWeight: 'bold' }}>
          {group.name}
        </Text>
        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
          <Text style={{ textAlign: 'center' }}>
            {group.bills?.length || 0} Bills{' '}
          </Text>
          <Text style={{ textAlign: 'center' }}>
            {group.users?.length || 0} members{' '}
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginVertical: 10,
          }}
        >
          <Button title={'Add Bill'} onPress={addBill} />
          <Link to={`${url}/balances`}>
            <Text>{'Balances'} /></Text>
          </Link>
        </View>
      </View>
      <View>
        <FlatList
          keyExtractor={keyExtractor}
          data={group?.bills || []}
          renderItem={renderBill}
        />
      </View>
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
      {isShowingBill && (
        <AddBillOverlay
          onDismiss={() => setShowingBillOverly(false)}
          group={group}
        />
      )}
    </View>
  );
};
