import React, { useContext, useState, useEffect } from 'react';
import { View, Platform, FlatList } from 'react-native';
import { Navigation } from 'react-router-navigation';
import { Button, Header, ListItem } from 'react-native-elements';
import { AuthContext, ApiContext } from '../context';
import { Container } from '../styled';
import AddGroupOverlay from './AddGroupOverlay';

const Home = () => {
  const { logout } = useContext(AuthContext);
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

  const keyExtractor = (item, index) => index.toString();

  const renderItem = ({ item, index }) => (
    <ListItem
      key={index}
      title={item.name}
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
