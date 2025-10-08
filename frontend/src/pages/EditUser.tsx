import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

const EditUser: React.FC = () => {
  const [formData, setFormData] = useState({
    fullname: "",
    contact_number: "",
    email: "",
    address: "",
    date_registered: "",
  });

  const [status, setStatus] = useState(""); // for success/error messages

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("http://backend.test/edit/customers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Failed to submit");

      const data = await response.json();
      setStatus("User saved successfully!");
      console.log("Response from backend:", data);
    } catch (err) {
      console.error(err);
      setStatus("Error saving user.");
    }
  };

  return (
    <div className="dashboard">
      <Sidebar />
      <main className="main-content">
        <Header />

        <h1>Edit User</h1>

        <form onSubmit={handleSubmit} style={{ maxWidth: 500 }}>
          <div>
            <label>Full Name</label>
            <input
              type="text"
              name="fullname"
              value={formData.fullname}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label>Contact Number</label>
            <input
              type="text"
              name="contact_number"
              value={formData.contact_number}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label>Address</label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label>Date Registered</label>
            <input
              type="date"
              name="date_registered"
              value={formData.date_registered}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit">Save User</button>
        </form>

        {status && <p>{status}</p>}
      </main>
    </div>
  );
};

export default EditUser;
