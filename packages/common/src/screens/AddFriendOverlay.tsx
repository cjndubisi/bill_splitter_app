import React, { useContext, useState, useEffect, useRef } from 'react';
import { View, Platform } from 'react-native';
import { Overlay, Input, Button } from 'react-native-elements';
import Modal from 'modal-react-native-web';
import { ApiContext } from '../context/ApiContext';
import { Group } from 'src/api/types';
import validatejs from 'validate.js';

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
  const [formError, setFormError] = useState(null);
  const firstTime = useRef(true);

  useEffect(() => {
    if (firstTime.current) {
      firstTime.current = false;
      return;
    }
    onDismiss();
  }, [users.length]);

  var constraints = {
    name: {
      presence: true,
      length: {
        minimum: 3,
        message: 'must be at least 3 characters',
      },
    },
    email: {
      email: true,
    },
  };

  const addFriend = async () => {
    const validation = validatejs({ name, email }, constraints);
    if (Object.keys(validation || {}).length > 0) {
      setFormError(validation);
      return;
    }
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
            <Input
              onFocus={() => {
                setFormError(null);
              }}
              placeholder="Name"
              onChangeText={setName}
              value={name}
              errorMessage={formError?.['name']?.[0] || ''}
            />
            <Input
              onFocus={() => {
                setFormError(null);
              }}
              placeholder="Email"
              onChangeText={setEmail}
              value={email}
              errorMessage={formError?.['email']?.[0] || ''}
            />
          </View>
          <Button disabled={isLoading} title="Create" onPress={addFriend} />
        </View>
      </Overlay>
    </View>
  );
};
