import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Sidebar from "../components/sidebar";

const EditUser: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [formData, setFormData] = useState({
    fullname: "",
    contact_number: "",
    email: "",
    address: "",
    date_registered: "",
  });

  const [status, setStatus] = useState("");

  // Fetch user data when component mounts
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(`http://backend.test/api/customers/${id}`);
        if (!res.ok) throw new Error("Failed to fetch user");
        const data = await res.json();
        setFormData(data);
      } catch (err) {
        console.error(err);
        setStatus("Error fetching user data.");
      }
    };

    fetchUser();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://backend.test/api/customers/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error("Failed to update user");
      await res.json();
      setStatus("User updated successfully!");
    } catch (err) {
      console.error(err);
      setStatus("Error updating user.");
    }
  };

  return (
    <div className="dashboard">
      <Sidebar />
      <main className="main-content">
        <h2>Edit User</h2>
        <p>Please update the fields below and save your changes.</p>
        <div className="add-user-container">
          <form className="user-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Full Name</label>
              <input type="text" name="fullname" value={formData.fullname} onChange={handleChange} required />
            </div>

            <div className="form-group">
              <label>Contact Number</label>
              <input type="text" name="contact_number" value={formData.contact_number} onChange={handleChange} required />
            </div>

            <div className="form-group">
              <label>Email</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} required />
            </div>

            <div className="form-group">
              <label>Address</label>
              <textarea name="address" value={formData.address} onChange={handleChange} required />
            </div>

            <div className="form-group">
              <label>Date Registered</label>
              <input type="date" name="date_registered" value={formData.date_registered} onChange={handleChange} required />
            </div>

            <button type="submit" className="submit-btn">Update User</button>
          </form>

          {status && <p className="status-msg">{status}</p>}
        </div>
      </main>
    </div>
  );
};

export default EditUser;
