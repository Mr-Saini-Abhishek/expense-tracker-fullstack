import React, { useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';

export const Balance = () => {
  const { payments } = useContext(GlobalContext);

  const amounts = payments.map(transaction => parseInt(transaction.amount));

  const total = amounts.reduce((acc, item) => (acc += item), 0);

  function addDollarSign(amount) {
    // Insert '$' at the second index of the string
    return amount < 0 ? '-' + '$' + Math.abs(amount) : '$' + amount;
  }

  return (
    <>
      <h2>Your Balance</h2>
      <h1 style={{ fontSize: '3rem' }} className={total < 0 ? 'money minus' : 'money plus'}>
        {addDollarSign(total)}
      </h1>
    </>
  );
};
