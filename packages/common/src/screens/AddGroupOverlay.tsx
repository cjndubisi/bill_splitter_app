import React, { useContext, useState, useEffect, useRef } from 'react';
import { View, Platform } from 'react-native';
import { Overlay, Input, Button } from 'react-native-elements';
import Modal from 'modal-react-native-web';
import { ApiContext } from '../context/ApiContext';

export default ({ onDismiss }) => {
  const {
    createGroup,
    state: { isLoading, groups },
  } = useContext(ApiContext);

  const [groupName, setName] = useState('');
  const firstTime = useRef(true);

  useEffect(() => {
    if (firstTime.current) {
      firstTime.current = false;
      return;
    }
    onDismiss();
  }, [groups.length]);

  const addGroup = async () => {
    try {
      await createGroup(groupName);
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
        <View style={{ width: 200, height: 120 }}>
          <View style={{ flex: 2, justifyContent: 'center' }}>
            <Input
              placeholder="Group name"
              onChangeText={setName}
              value={groupName}
            />
          </View>
          <Button disabled={isLoading} title="Create" onPress={addGroup} />
        </View>
      </Overlay>
    </View>
  );
};
