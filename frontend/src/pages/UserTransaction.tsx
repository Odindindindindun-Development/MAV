import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";

interface Transaction {
  id: number;
  customer_name: string;
  DateIssued: string;
  TotalAmount: number;
  PaymentStatus: string;
}

const UserTransaction: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const res = await fetch("http://127.0.0.1:8000/api/transactions", {
          credentials: "include",
        });
        if (!res.ok) throw new Error("Failed to fetch transactions");
        const data = await res.json();
        setTransactions(data);
      } catch (err: any) {
        console.error(err);
        setError("Error loading transactions");
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  return (
    <div className="dashboard">
      <Sidebar />
      <main className="main-content">
        <h2>Customer Transactions</h2>
        <p>Track, manage and forecast your customer orders.</p>

        <table className="data-table">
          <thead>
            <tr>
              <th>Customer Name</th>
              <th>Date Issued</th>
              <th>Total Amount</th>
              <th>Payment Status</th>
            </tr>
          </thead>
          <tbody>
            {transactions.length > 0 ? (
              transactions.map((tx) => (
                <tr key={tx.id}>
                  <td>{tx.customer_name}</td>
                  <td>{tx.DateIssued}</td>
                  <td>{tx.TotalAmount}</td>
                  <td>{tx.PaymentStatus}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4}>No transactions found</td>
              </tr>
            )}
          </tbody>
        </table>
      </main>
    </div>
  );
};

export default UserTransaction;
