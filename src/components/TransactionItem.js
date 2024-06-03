import React, {useContext} from 'react';
import { GlobalContext } from '../context/GlobalState';



export const TransactionItem = ({ transaction }) => {
  const { deletePayment } = useContext(GlobalContext);

  const sign = transaction.amount < 0 ? '-' : '+';
  function addDollarSign(amount) {
    // Insert '$' at the second index of the string
    return amount < 0 ? '-' + '$' + Math.abs(amount) : '$' + amount;
  }
  return (
    <li className={transaction.amount < 0 ? 'minus' : 'plus'}>
      {transaction.text}<span>{addDollarSign(transaction.amount)}</span><button onClick={()=> {deletePayment(transaction._id) }}className="delete-btn">x</button>
    </li>
  )
}
