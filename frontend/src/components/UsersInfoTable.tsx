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

const UsersInfoTable: React.FC = () => {
  const [data, setData] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const res = await fetch("http://backend.test/customers");
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

  if (loading) return <p>Loading customers...</p>;
  if (error) return <p>{error}</p>;

  return (
    <table className="data-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Status</th>
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
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default UsersInfoTable;
