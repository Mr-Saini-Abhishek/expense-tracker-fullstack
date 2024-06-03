import React, { useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';

export const IncomeExpenses = () => {
  const { payments } = useContext(GlobalContext);

  const amounts = payments.map(transaction => parseInt(transaction.amount));
  
  const income = amounts
    .filter(item => item > 0)
    .reduce((acc, item) => (acc + item), 0);

  const expense = amounts
    .filter(item => item < 0)
    .reduce((acc, item) => (acc + item), 0) * -1;

  return (
    <div className="inc-exp-container">
      <div>
        <h4>Income</h4>
        <p className="money plus">${income}.00</p>
      </div>
      <div>
        <h4>Expense</h4>
        <p className="money minus">${expense}.00</p>
      </div>
    </div>
  );
};
