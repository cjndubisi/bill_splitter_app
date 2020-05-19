import React, { useContext, useState } from 'react';
import { Button, Header, ListItem } from 'react-native-elements';
import { AuthContext } from '../context/AuthContext';
import { Container } from '../styled';
import AddGroupOverlay from './AddGroupOverlay';
const Home = () => {
  const { logout } = useContext(AuthContext);
  const [isShowingCreate, toggleCreateGroup] = useState(false);
  const addGroup = () => {
    toggleCreateGroup(!isShowingCreate);
  };
  const list = [
    {
      name: 'TEsst',
      users: [{ name: '' }, { name: '' }],
    },
  ];

  return (
    <Container>
      <Header
        centerComponent={{ text: 'MY TITLE', style: { color: '#fff' } }}
        rightComponent={<Button onPress={logout} title={'Logout'} />}
      />
      {list.map((item, index) => (
        <ListItem
          key={index}
          title={item.name}
          titleStyle={{ fontWeight: 'bold' }}
          rightTitle={`${item.users.length} members`}
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
