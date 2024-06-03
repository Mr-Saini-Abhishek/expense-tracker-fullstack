import React, { useEffect, useContext } from 'react';
import { TransactionItem } from './TransactionItem';

import { GlobalContext } from '../context/GlobalState';

export const Transaction = () => {
  const context = useContext(GlobalContext);
  const { payments, getTransactions} = context;

  
  useEffect(() => {
    if ('auth-token'){
      getTransactions();
    }
    else{
    }
        // eslint-disable-next-line
      }, [])


  return (
    <>
      <h3>History</h3>
      <ul className="list">
      {payments.map((transaction) => {
console.log(payments.transaction)
return <TransactionItem key={transaction._id}  transaction={transaction} />

})}

      </ul>
    </>
  )
}
