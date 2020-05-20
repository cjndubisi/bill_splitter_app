import React, { useContext, useState, useEffect } from 'react';
import { View, Platform, FlatList } from 'react-native';
import { Redirect, useHistory } from 'react-router';
import { Button, ListItem } from 'react-native-elements';
import { ApiContext } from '../context';
import { Container } from '../styled';
import AddGroupOverlay from './AddGroupOverlay';
import PrivateRoute from '../router/PrivateRoute';
import Group from './Group';

const Home = () => {
  const [isShowingCreate, toggleCreateGroup] = useState(false);
  const addGroup = () => {
    toggleCreateGroup(!isShowingCreate);
  };
  const { state, allGroups } = useContext(ApiContext);
  const Parent = Platform.OS === 'web' ? Container : View;
  useEffect(() => {
    const refresh = async () => await allGroups();
    refresh();
  }, []);
  const history = useHistory();

  const keyExtractor = (_, index) => index.toString();
  // <Redirect to={`/groups/${item.id}`} />;
  const renderItem = ({ item, index }) => (
    <ListItem
      key={index}
      title={item.name}
      onPress={() => history.push(`/groups/${item.id}`)}
      titleStyle={{ fontWeight: 'bold' }}
      rightTitle={`${item.users?.length || 0} members`}
      bottomDivider
    />
  );
  return (
    <Parent>
      <View style={{ flex: 2 }}>
        <FlatList
          keyExtractor={keyExtractor}
          data={state.groups}
          renderItem={renderItem}
        />
        {isShowingCreate && (
          <AddGroupOverlay onDismiss={() => toggleCreateGroup(false)} />
        )}
      </View>
      <Button
        style={{ justifyContent: 'flex-end', paddingTop: 10 }}
        onPress={addGroup}
        title={'Start a group'}
      />
    </Parent>
  );
};
export default Home;
