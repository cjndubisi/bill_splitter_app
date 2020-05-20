import React, { useContext, useState } from 'react';
import { View, Platform } from 'react-native';
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
  const { state } = useContext(ApiContext);
  const Parent = Platform.OS === 'web' ? Container : View

  return (
    <Parent>
      <Header
        statusBarProps={{ hidden: true, translucent: true }}
        centerComponent={{
          text: 'BillSplit',
          style: { color: '#fff', fontWeight: 'bold' },
        }}
        rightComponent={<Button onPress={logout} title={'Logout'} />}
      />
      {state.groups.map((item, index) => (
        <ListItem
          key={index}
          title={item.name}
          titleStyle={{ fontWeight: 'bold' }}
          rightTitle={`${item.users?.length || 0} members`}
          bottomDivider
        />
      ))}
      {isShowingCreate && (
        <AddGroupOverlay onDismiss={() => toggleCreateGroup(false)} />
      )}
      <Button
        style={{ justifyContent: 'flex-end' }}
        onPress={addGroup}
        title={'Start a group'}
      />
    </Parent>
  );
};
export default Home;
