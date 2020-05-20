import React, { useContext, useState } from 'react';
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

  return (
    <Container>
      <Header
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
    </Container>
  );
};
export default Home;
