import React, { useContext, useState, useEffect, useRef } from 'react';
import { View, Platform } from 'react-native';
import { Overlay, Input, Button } from 'react-native-elements';
import Modal from 'modal-react-native-web';
import { ApiContext } from '../context/ApiContext';
import { Group } from 'src/api/types';

export default ({
  onDismiss,
  group,
}: {
  group: Group;
  onDismiss: () => void;
}) => {
  const {
    addFriendToGroup,
    state: { isLoading, groups },
  } = useContext(ApiContext);

  const users = group.users;
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const firstTime = useRef(true);

  useEffect(() => {
    if (firstTime.current) {
      firstTime.current = false;
      return;
    }
    onDismiss();
  }, [users.length]);

  const addFriend = async () => {
    try {
      await addFriendToGroup(group.id, {
        name: name,
        email: email,
      });
    } catch {}
  };

  const isWeb = Platform.OS === 'web';

  return (
    <View>
      <Overlay
        {...(isWeb ? { ModalComponent: Modal } : {})}
        isVisible={true}
        onBackdropPress={() => {
          !isLoading && onDismiss();
        }}
      >
        <View style={{ width: 200 }}>
          <View style={{ flex: 2, justifyContent: 'center' }}>
            <Input placeholder="Name" onChangeText={setName} value={name} />
            <Input placeholder="Email" onChangeText={setEmail} value={email} />
          </View>
          <Button disabled={isLoading} title="Create" onPress={addFriend} />
        </View>
      </Overlay>
    </View>
  );
};
