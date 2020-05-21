import React, { useContext, useState, useEffect, useRef } from 'react';
import { View, Platform } from 'react-native';
import { Overlay, Input, Button, Text } from 'react-native-elements';
import Modal from 'modal-react-native-web';
import { ApiContext } from '../context/ApiContext';
import { Group } from 'src/api/types';
import { AUTH_USER_ID_KEY } from '../utils';
import AsyncStorage from '@react-native-community/async-storage';
import { allGroups } from 'src/api';

export default ({
  onDismiss,
  group,
}: {
  group: Group;
  onDismiss: () => void;
}) => {
  const {
    addBillToGroup,
    allGroups,
    state: { isLoading },
  } = useContext(ApiContext);

  const bills = group.bills;
  const [name, setName] = useState('');
  const [amount, setBill] = useState('');
  const firstTime = useRef(true);

  useEffect(() => {
    if (firstTime.current) {
      firstTime.current = false;
      return;
    }
    onDismiss();
  }, [bills?.length || 0]);

  const addBill = async () => {
    try {
      const currentUser: string = await AsyncStorage.getItem(AUTH_USER_ID_KEY);
      await addBillToGroup({
        groupId: group.id,
        name,
        payerId: parseInt(currentUser),
        amount: parseInt(amount),
      });
      await allGroups();
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
              placeholder="Expense Title"
              onChangeText={setName}
              value={name}
            />
            <Input
              keyboardType="decimal-pad"
              placeholder="0.0"
              onChangeText={setBill}
              value={amount}
            />
            <Text
              style={{ color: 'grey', textAlign: 'center', marginVertical: 10 }}
            >
              Bill will be split evenly
            </Text>
          </View>
          <Button disabled={isLoading} title="Add Bill" onPress={addBill} />
        </View>
      </Overlay>
    </View>
  );
};
