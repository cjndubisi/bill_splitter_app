import React, { useContext, useState, useEffect, useRef } from 'react';
import { View, Platform, FlatList } from 'react-native';
import { ListItem, Input, Button, Text, Divider } from 'react-native-elements';
import { ApiContext } from '../context/ApiContext';
import { useParams } from 'react-router';
import { balanceResolver } from '../core/balanceResolver';
import { AuthContext } from '../context';
const OrangeText = (props) => (
  <Text style={{ color: 'orange' }}>{props.children}</Text>
);
const GreenText = (props) => (
  <Text style={{ color: 'green' }}>{props.children}</Text>
);
export default ({ navigation, route }) => {
  const { params } = route;
  const currency = '$';

  const {
    state: { groups },
  } = useContext(ApiContext);
  const {
    state: { userId },
  } = useContext(AuthContext);
  const group = groups.find((item) => item.id.toString() === params.id);
  if (!group) {
    return null;
  }
  const resolved = balanceResolver(group);
  const title = (user) => {
    const gets = Object.keys(resolved[user].gets).reduce(
      (acc, next) => acc + resolved[user].gets[next],
      0
    );
    const debts = Object.keys(resolved[user].debts).reduce(
      (acc, next) => acc + resolved[user].debts[next],
      0
    );

    const verb = gets >= Math.abs(debts) ? 'gets back' : 'owes';
    const Amount = () =>
      gets >= Math.abs(debts) ? (
        <GreenText>
          {currency}
          {Math.abs(gets).toFixed(2)}
        </GreenText>
      ) : (
        <OrangeText>
          {currency}
          {Math.abs(debts).toFixed(2)}
        </OrangeText>
      );
    return (
      <Text>
        {user} {verb} <Amount /> in total
      </Text>
    );
  };
  return (
    <View>
      {Object.keys(resolved).map((user, index) => (
        <View style={{ paddingHorizontal: 20 }} key={`user${index}`}>
          <Text>{title(user)}</Text>
          <View style={{ marginLeft: 20 }}>
            {Object.keys(resolved[user].gets).map((get, index) => {
              const amount = resolved[user].gets[get];
              if (amount === 0) {
                return null;
              }
              return (
                <Text
                  style={{ fontSize: 12, color: 'grey', marginVertical: 5 }}
                  key={index.toString()}
                >
                  {get} owes{' '}
                  <GreenText>{` ${currency}${amount.toFixed(2)} `}</GreenText>
                  {'to '}
                  {user}
                </Text>
              );
            })}
          </View>
          <View style={{ marginLeft: 20 }}>
            {Object.keys(resolved[user].debts).map((debt, index) => {
              const amount = resolved[user].debts[debt];
              if (amount === 0 || debt === user) {
                return null;
              }

              const debtor = amount < 0 ? user : debt;
              const creditor = amount < 0 ? debt : user;
              return (
                <Text
                  style={{ fontSize: 12, color: 'grey', marginVertical: 5 }}
                  key={`debt${index}`}
                >
                  {debtor} owes
                  {amount < 0 ? (
                    <OrangeText>{` ${currency}${Math.abs(amount).toFixed(
                      2
                    )} `}</OrangeText>
                  ) : (
                    <GreenText>{` ${currency}${Math.abs(amount).toFixed(
                      2
                    )} `}</GreenText>
                  )}
                  to {creditor}
                </Text>
              );
            })}
          </View>
          <Divider style={{ backgroundColor: 'grey' }} />
        </View>
      ))}
    </View>
  );
};
