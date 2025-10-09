import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface Customer {
  id: number;
  fullname: string;
  email: string;
  contact_number: string;
  address: string;
  date_registered: string;
}

interface Transaction {
  id: number;
  DateIssued: string;
  TotalAmount: number;
  PaymentStatus: string;
}

const UsersInfoTable: React.FC = () => {
  const [data, setData] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [selectedUser, setSelectedUser] = useState<Customer | null>(null);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const res = await fetch("http://127.0.0.1:8000/api/customers", {
          credentials: "include",
        });
        if (!res.ok) throw new Error("Failed to fetch customers");
        const customers = await res.json();
        setData(customers);
      } catch (err: any) {
        console.error(err);
        setError("Error loading customers");
      } finally {
        setLoading(false);
      }
    };

    fetchCustomers();
  }, []);

  const handleViewTransactions = async (user: Customer) => {
    try {
      setSelectedUser(user);
      const res = await fetch(
        `http://127.0.0.1:8000/api/customers/${user.id}/transactions`,
        { credentials: "include" }
      );
      if (!res.ok) throw new Error("Failed to fetch transactions");
      const data = await res.json();
      setTransactions(data);
      setShowModal(true);
    } catch (err) {
      console.error(err);
      alert("Error fetching transactions");
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setTransactions([]);
    setSelectedUser(null);
  };

  if (loading) return <p>Loading customers...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <table className="data-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email address</th>
            <th>Contact Number</th>
            <th>Address</th>
            <th>Date Registered</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((user) => (
            <tr key={user.id}>
              <td>{user.fullname}</td>
              <td>{user.email}</td>
              <td>{user.contact_number}</td>
              <td>{user.address}</td>
              <td>{user.date_registered}</td>
              <td>
                <Link to={`/users/edit/${user.id}`}>
                  <button>✏️</button>
                </Link>
                <button
                  style={{ marginLeft: "5px" }}
                  onClick={() => handleViewTransactions(user)}
                >
                  📄 Transactions
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal */}
      {showModal && selectedUser && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
        >
          <div
            style={{
              backgroundColor: "#fff",
              padding: "20px",
              borderRadius: "8px",
              maxHeight: "80%",
              overflowY: "auto",
              width: "80%",
            }}
          >
            <h3>{selectedUser.fullname}'s Transactions</h3>
            <button onClick={closeModal} style={{ float: "right" }}>
              ❌
            </button>
            <table style={{ width: "100%", marginTop: "20px" }}>
              <thead>
                <tr>
                  <th>Date Issued</th>
                  <th>Total Amount</th>
                  <th>Payment Status</th>
                </tr>
              </thead>
              <tbody>
                {transactions.length > 0 ? (
                  transactions.map((tx) => (
                    <tr key={tx.id}>
                      <td>{tx.DateIssued}</td>
                      <td>{tx.TotalAmount}</td>
                      <td>{tx.PaymentStatus}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={3}>No transactions found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default UsersInfoTable;
