import React, { useState } from "react";
import Sidebar from "../components/Sidebar";

const AddUser: React.FC = () => {
  const [formData, setFormData] = useState({
    fullname: "",
    contact_number: "",
    email: "",
    address: "",
    date_registered: "",
  });

  const [status, setStatus] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Get CSRF token from meta tag (Laravel)
      const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');

      const res = await fetch("http://backend.test/add/customers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-TOKEN": csrfToken || "",
        },
        credentials: "include", // send cookies
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Failed to add user");

      const data = await res.json();
      setStatus("✅ User added successfully!");
      setFormData({ fullname: "", contact_number: "", email: "", address: "", date_registered: "" });
    } catch (err) {
      console.error(err);
      setStatus("❌ Error adding user.");
    }
  };

  return (
    <div className="dashboard">
      <Sidebar />
      <main className="main-content">
        <div className="add-user-container">
          <h2>Add New User</h2>
          <p>Please fill out all the fields below carefully to add a new user to the system.</p>

          <form className="user-form" onSubmit={handleSubmit}>
            {["fullname", "contact_number", "email", "date_registered"].map((field) => (
              <div className="form-group" key={field}>
                <label>{field.replace("_", " ").replace(/\b\w/g, (l) => l.toUpperCase())}</label>
                <input
                  type={field === "email" ? "email" : field === "date_registered" ? "date" : "text"}
                  name={field}
                  value={formData[field as keyof typeof formData]}
                  onChange={handleChange}
                  required
                />
              </div>
            ))}

            <div className="form-group">
              <label>Address</label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
              />
            </div>

            <button type="submit" className="submit-btn">Add User</button>
          </form>

          {status && <p className="status-msg">{status}</p>}
        </div>
      </main>
    </div>
  );
};

export default AddUser;
