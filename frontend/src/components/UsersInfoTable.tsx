import React from "react";

const UsersInfoTable: React.FC = () => {

  const data = [
    { name: "Olivia Rhye", email: "olivia@untitledui.com", contact: "09465132456", status: "Active" },
    { name: "Phoenix Baker", email: "phoenix@untitledui.com", contact: "09465132456", status: "Active" },
    { name: "Lana Steiner", email: "lana@untitledui.com", contact: "09465132456", status: "Active" },
  ];

  return (
    <table className="data-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Status</th>
          <th>Email address</th>
          <th>Contact Number</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {data.map((user, i) => (
          <tr key={i}>
            <td>{user.name}</td>
            <td>{user.status}</td>
            <td>{user.email}</td>
            <td>{user.contact}</td>
            <td>
              <button>✏️</button>
              <button>🗑️</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default UsersInfoTable;
