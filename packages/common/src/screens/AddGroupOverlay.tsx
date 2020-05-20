import React, { useContext, useState, useEffect, useRef } from 'react';
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

  return (
    <>
      <Overlay
        ModalComponent={Modal}
        isVisible={true}
        onBackdropPress={() => {
          !isLoading && onDismiss();
        }}
      >
        <>
          <Input
            placeholder="Group name"
            onChangeText={setName}
            value={groupName}
          />
          <Button disabled={isLoading} title="Create" onPress={addGroup} />
        </>
      </Overlay>
    </>
  );
};
