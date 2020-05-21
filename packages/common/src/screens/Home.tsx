import React, { useContext, useState, useEffect } from 'react';
import { View, FlatList } from 'react-native';
import { useHistory } from 'react-router';
import { Button, ListItem, Text } from 'react-native-elements';
import { ApiContext } from '../context';
import { Container } from '../styled';
import AddGroupOverlay from './AddGroupOverlay';
import { useLinkTo } from '@react-navigation/native';
import ListEmptyState from '../components/ListEmptyState';

const Home = ({ navigation }) => {
  const linkTo = useLinkTo();

  const [isShowingCreate, toggleCreateGroup] = useState(false);
  const addGroup = () => {
    toggleCreateGroup(!isShowingCreate);
  };
  const { state, allGroups } = useContext(ApiContext);
  useEffect(() => {
    const refresh = async () => await allGroups();
    refresh();
  }, []);
  const history = useHistory();

  const keyExtractor = (_, index) => index.toString();

  const renderItem = ({ item, index }) => (
    <ListItem
      key={index}
      title={item.name}
      onPress={() => linkTo(`/groups/${item.id}`)}
      titleStyle={{ fontWeight: 'bold' }}
      rightTitle={`${item.users?.length || 0} members`}
      bottomDivider
    />
  );
  return (
    <Container>
      <View style={{ flex: 2 }}>
        <FlatList
          keyExtractor={keyExtractor}
          data={state.groups}
          renderItem={renderItem}
          ListEmptyComponent={(props) => (
            <ListEmptyState
              {...props}
              title={'Create a group to get started'}
            />
          )}
        />
        {isShowingCreate && (
          <AddGroupOverlay onDismiss={() => toggleCreateGroup(false)} />
        )}
      </View>
      <Button
        style={{ justifyContent: 'flex-end', marginBottom: 30 }}
        onPress={addGroup}
        title={'Start a group'}
      />
    </Container>
  );
};
export default Home;
