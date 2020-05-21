import { Bill, Group } from '../api';
type BalanceItem = {
  gets: { [key: string]: number };
  debts: { [key: string]: number };
};
export type BalanceResult = {
  [key: string]: BalanceItem;
};
export const balanceResolver = (group: Group): BalanceResult => {
  const users = group.users.map((user) => user.email);
  const history = group.bills.map((bill) => {
    const payer = group.users.find((user) => user.id == bill.payerId);
    return {
      amount: bill.amount,
      payer: payer.email,
      participants: users,
    };
  });

  const itemStatement = history.map((item) => {
    let result: { [key: string]: any } = {};
    const split = item.amount / item.participants.length;

    return item.participants.reduce((acc, next) => {
      if (next === item.payer) {
        return acc;
      }

      acc[item.payer] = acc[item.payer] || {};
      acc[next] = acc[next] || {};
      acc[item.payer].debts = {};
      acc[next].gets = {};

      acc[item.payer].gets = {
        ...(acc[item.payer].gets || {}),
        ...{ [next]: split },
      };
      acc[next].debts = {
        ...(acc[item.payer].debts || {}),
        ...{ [item.payer]: split * -1 },
      };
      return acc;
    }, result);
  });

  const details = itemStatement.reduce((acc, next, index) => {
    // get all debts and gets for each user
    users.forEach((user) => {
      acc[user] = acc[user] || {};
      const accGets = acc[user].gets || {};
      const accDebts = acc[user].debts || {};
      const nextGets = next[user].gets || {};
      const nextDebts = next[user].debts || {};

      const allGets = [accGets, nextGets].reduce((a, b) => {
        users.forEach((item) => (a[item] = (a[item] || 0) + (b[item] || 0)));
        return a;
      }, {});

      const allDebts = [accDebts, nextDebts].reduce((a, b) => {
        users.forEach((item) => (a[item] = (a[item] || 0) + (b[item] || 0)));
        return a;
      }, {});
      acc[user].gets = allGets;
      acc[user].debts = allDebts;
    });

    return acc;
  }, {});

  return details;
};

export default balanceResolver;
