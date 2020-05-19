import React from 'react';
import { Overlay, Input, Button } from 'react-native-elements';
import Modal from 'modal-react-native-web';

export default ({ onDismiss }) => {
  return (
    <>
      <Overlay
        ModalComponent={Modal}
        isVisible={true}
        onBackdropPress={onDismiss}
      >
        <>
          <Input placeholder="Group name" />
          <Button title="Create" />
        </>
      </Overlay>
    </>
  );
};
