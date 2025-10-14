import React, { useState } from "react";
import Sidebar from "../components/Sidebar";

const AddInventory: React.FC = () => {
  const [formData, setFormData] = useState({
    ItemName: "",
    Description: "",
    QuantityOnHand: "",
    UnitPrice: "",
    Supplier: "",
    ReorderLevel: "",
  });

  const [status, setStatus] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch("http://127.0.0.1:8000/api/StockItem", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // 👈 Laravel Sanctum session
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Failed to add inventory item");

      await res.json();
      alert("✅ Item added successfully!");
      setFormData({
        ItemName: "",
        Description: "",
        QuantityOnHand: "",
        UnitPrice: "",
        Supplier: "",
        ReorderLevel: "",
      });
    } catch (err) {
      console.error(err);
      setStatus("❌ Error adding item.");
    }
  };

  return (
    <div className="dashboard">
      <Sidebar />
      <main className="main-content">
        <h2>Add New Inventory Item</h2>
        <p>
          Please fill out all the fields below carefully to add a new inventory item to the system.
        </p>

        <div className="add-user-container">
          <form className="user-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Item Name</label>
              <input
                type="text"
                name="ItemName"
                value={formData.ItemName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Description</label>
              <textarea
                name="Description"
                value={formData.Description}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Quantity on Hand</label>
              <input
                type="number"
                name="QuantityOnHand"
                value={formData.QuantityOnHand}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Unit Price</label>
              <input
                type="number"
                name="UnitPrice"
                step="0.01"
                value={formData.UnitPrice}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Supplier</label>
              <input
                type="text"
                name="Supplier"
                value={formData.Supplier}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Reorder Level</label>
              <input
                type="number"
                name="ReorderLevel"
                value={formData.ReorderLevel}
                onChange={handleChange}
                required
              />
            </div>

            <button type="submit" className="submit-btn">
              Add Item
            </button>
          </form>

          {status && <p className="status-msg">{status}</p>}
        </div>
      </main>
    </div>
  );
};

export default AddInventory;
