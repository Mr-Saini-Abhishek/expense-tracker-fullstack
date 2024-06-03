import React, { useState, createContext, useReducer } from "react";
import AppReducer from "./AppReducer";

// Initial state
const initialState = {
  transactions: [],
};

// Create context
export const GlobalContext = createContext(initialState);

// Provider component
export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);
  const [payments, setPayments] = useState(initialState.transactions);
  const host = "http://localhost:5000";

  const getTransactions = async () => {
    // api calling
    const response = await fetch(`${host}/api/notes/fetchalltransactions`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjVmNmEyNTE4ZGI5MjcxM2IxNTUxY2RiIn0sImlhdCI6MTcxMDY2MjIyNX0.spb_qWcznZ4hd3Ov94xhldp82ZY1hhjBSmpxAPyk6F0",
      },
    });
    const json = await response.json();
    setPayments(json);
  };

  // adding note
  const addPayment = async (text, amount) => {
    // api calling
    const response = await fetch(`${host}/api/notes/transaction`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjVmNmEyNTE4ZGI5MjcxM2IxNTUxY2RiIn0sImlhdCI6MTcxMDY2MjIyNX0.spb_qWcznZ4hd3Ov94xhldp82ZY1hhjBSmpxAPyk6F0",
      },
      body: JSON.stringify({ text, amount }),
    });

    const transaction = await response.json();
    setPayments(payments.concat(transaction));
  };
  // deleteing Note
  const deletePayment = async (id) => {
    // api calling
    const response = await fetch(`${host}/api/notes/deltepayment/${id}`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjVmNmEyNTE4ZGI5MjcxM2IxNTUxY2RiIn0sImlhdCI6MTcxMDY2NjE1NH0.UpGOIRMyLtj8lE9sZukV9JQCLNQ4Xw6XgeDNhGcQlsQ",
      },
    });
    const json = await response.json();
    setPayments(json);
    const newPayments = payments.filter((transaction) => {
      return transaction._id !== id;
    });
    setPayments(newPayments);
  };
  // Actions
  function deleteTransaction(id) {
    dispatch({
      type: "DELETE_TRANSACTION",
      payload: id,
    });
  }

  function addTransaction(transaction) {
    dispatch({
      type: "ADD_TRANSACTION",
      payload: transaction,
    });
  }

  return (
    <GlobalContext.Provider
      value={{
        transactions: state.transactions,
        deleteTransaction,
        addTransaction,
        getTransactions,
        setPayments,
        payments,
        addPayment,
        deletePayment,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
