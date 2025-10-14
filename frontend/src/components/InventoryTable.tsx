import React, { useEffect, useState } from "react";

interface StockItem {
  StockItemID: number;
  ItemName: string;
  Description: string;
  QuantityOnHand: number;
  UnitPrice: number;
  Supplier: string;
  ReorderLevel: number;
}

interface StockItemHistory {
  HistoryID: number;
  StockItemID: number;
  FieldChanged: string;
  OldValue: string;
  NewValue: string;
  EditedAt: string;
}

const InventoryTable: React.FC = () => {
  const [inventory, setInventory] = useState<StockItem[]>([]);
  const [selectedItem, setSelectedItem] = useState<StockItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // NEW: History modal
  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);
  const [historyRecords, setHistoryRecords] = useState<StockItemHistory[]>([]);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(8);

  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/StockItem");
        const data = await response.json();
        setInventory(data);
      } catch (error) {
        console.error("Error fetching inventory:", error);
      }
    };

    fetchInventory();
  }, []);

  const handleEdit = (item: StockItem) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedItem(null);
    setIsModalOpen(false);
  };

  const handleSaveChanges = async () => {
    if (!selectedItem) return;

    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/StockItem/${selectedItem.StockItemID}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(selectedItem),
        }
      );

      if (response.ok) {
        const updatedInventory = inventory.map((item) =>
          item.StockItemID === selectedItem.StockItemID ? selectedItem : item
        );
        setInventory(updatedInventory);
        setIsModalOpen(false);
      } else {
        console.error("Failed to update item");
      }
    } catch (error) {
      console.error("Error saving item:", error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!selectedItem) return;
    const { name, value } = e.target;
    setSelectedItem({ ...selectedItem, [name]: value });
  };

  // 🧾 Handle opening of history popup
  const handleViewHistory = async (stockItemID: number) => {
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/StockItem/${stockItemID}/history`
      );
      const data = await response.json();
      setHistoryRecords(data);
      setIsHistoryModalOpen(true);
    } catch (error) {
      console.error("Error fetching history:", error);
    }
  };

  const handleCloseHistoryModal = () => {
    setIsHistoryModalOpen(false);
    setHistoryRecords([]);
  };

  // Pagination logic
  const totalPages = Math.ceil(inventory.length / rowsPerPage);
  const indexOfLastItem = currentPage * rowsPerPage;
  const indexOfFirstItem = indexOfLastItem - rowsPerPage;
  const currentItems = inventory.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="table-container">
      <table className="data-table">
        <thead>
          <tr>
            <th>Item Name</th>
            <th>Description</th>
            <th>Quantity on Hand</th>
            <th>Unit Price</th>
            <th>Supplier</th>
            <th>Reorder Level</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((item) => (
            <tr key={item.StockItemID}>
              <td>{item.ItemName}</td>
              <td>{item.Description}</td>
              <td>{item.QuantityOnHand}</td>
              <td>{item.UnitPrice ? Number(item.UnitPrice).toFixed(2) : "0.00"}</td>
              <td>{item.Supplier}</td>
              <td>{item.ReorderLevel}</td>
              <td>
                <button onClick={() => handleEdit(item)}>✏️</button>
                <button
                  style={{ marginLeft: "6px" }}
                  onClick={() => handleViewHistory(item.StockItemID)}
                >
                  📜
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      {inventory.length > 0 && (
        <div className="pagination-container">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="pagination-btn"
          >
            ← Previous
          </button>

          <div className="pagination-pages">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`pagination-number ${
                  currentPage === page ? "active" : ""
                }`}
              >
                {page}
              </button>
            ))}
          </div>

          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className="pagination-btn"
          >
            Next →
          </button>
        </div>
      )}

      {/* ✏️ Edit Modal */}
      {isModalOpen && selectedItem && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Edit Item</h3>

            <label>Item Name</label>
            <input
              type="text"
              name="ItemName"
              value={selectedItem.ItemName}
              onChange={handleChange}
            />

            <label>Description</label>
            <input
              type="text"
              name="Description"
              value={selectedItem.Description}
              onChange={handleChange}
            />

            <label>Quantity on Hand</label>
            <input
              type="number"
              name="QuantityOnHand"
              value={selectedItem.QuantityOnHand}
              onChange={handleChange}
            />

            <label>Unit Price</label>
            <input
              type="number"
              name="UnitPrice"
              value={selectedItem.UnitPrice}
              onChange={handleChange}
            />

            <label>Supplier</label>
            <input
              type="text"
              name="Supplier"
              value={selectedItem.Supplier}
              onChange={handleChange}
            />

            <label>Reorder Level</label>
            <input
              type="number"
              name="ReorderLevel"
              value={selectedItem.ReorderLevel}
              onChange={handleChange}
            />

            <div className="modal-actions">
              <button onClick={handleSaveChanges}>💾 Save</button>
              <button onClick={handleCloseModal}>❌ Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* 📜 History Modal */}
      {isHistoryModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Item Edit History</h3>

            {historyRecords.length > 0 ? (
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Field Changed</th>
                    <th>Old Value</th>
                    <th>New Value</th>
                    <th>Edited At</th>
                  </tr>
                </thead>
                <tbody>
                  {historyRecords.map((record) => (
                    <tr key={record.HistoryID}>
                      <td>{record.FieldChanged}</td>
                      <td>{record.OldValue}</td>
                      <td>{record.NewValue}</td>
                      <td>
                        {new Date(record.EditedAt).toLocaleString("en-US")}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>No edit history found for this item.</p>
            )}

            <div className="modal-actions">
              <button onClick={handleCloseHistoryModal}>❌ Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InventoryTable;
