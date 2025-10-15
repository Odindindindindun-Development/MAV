import React, { useEffect, useState } from "react";

interface StockItem {
  StockItemID: number;
  ItemName: string;
  Description: string;
  QuantityOnHand: number;
  UnitPrice: number;
  Supplier: string;
  ReorderLevel: number;
  isArchived?: boolean | number | string;
}

interface StockItemHistory {
  HistoryID: number;
  StockItemID: number;
  FieldChanged: string;
  OldValue: string;
  NewValue: string;
  EditedAt: string;
}

const ArchivedTable: React.FC = () => {
  const [archivedItems, setArchivedItems] = useState<StockItem[]>([]);
  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);
  const [historyRecords, setHistoryRecords] = useState<StockItemHistory[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(8);

  // Fetch archived items
  useEffect(() => {
    const fetchArchivedItems = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/StockItem");
        const data = await response.json();
        console.log("API data:", data);

        // Normalize isArchived and filter only archived items
        const archived = data
          .map((item: any) => ({
            ...item,
            isArchived: item.isArchived === true || item.isArchived === 1 || item.isArchived === "true",
          }))
          .filter((item: StockItem) => item.isArchived);

        setArchivedItems(archived);
      } catch (error) {
        console.error("Error fetching archived items:", error);
      }
    };

    fetchArchivedItems();
  }, []);

  // Pagination logic
  const totalPages = Math.ceil(archivedItems.length / rowsPerPage);
  const indexOfLastItem = currentPage * rowsPerPage;
  const indexOfFirstItem = indexOfLastItem - rowsPerPage;
  const currentItems = archivedItems.slice(indexOfFirstItem, indexOfLastItem);

  // Restore an archived item
  const handleRestore = async (stockItemID: number) => {
    const confirmRestore = window.confirm("Are you sure you want to restore this item?");
    if (!confirmRestore) return;

    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/stockitem/${stockItemID}/unarchive`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ isArchived: false }),
        }
      );

      if (response.ok) {
        setArchivedItems(prev => prev.filter(item => item.StockItemID !== stockItemID));
        alert("✅ Item restored successfully!");
      } else {
        alert("❌ Failed to restore item.");
      }
    } catch (error) {
      console.error("Error restoring item:", error);
      alert("⚠️ Error restoring item. Please check your connection.");
    }
  };

  // View history
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
          {currentItems.map(item => (
            <tr key={item.StockItemID}>
              <td>{item.ItemName}</td>
              <td>{item.Description}</td>
              <td>{item.QuantityOnHand}</td>
              <td>{item.UnitPrice ? Number(item.UnitPrice).toFixed(2) : "0.00"}</td>
              <td>{item.Supplier}</td>
              <td>{item.ReorderLevel}</td>
              <td>
                <button onClick={() => handleViewHistory(item.StockItemID)}>📜</button>
                <button
                  style={{ marginLeft: "6px", color: "green" }}
                  onClick={() => handleRestore(item.StockItemID)}
                >
                  ♻️ Restore
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {archivedItems.length > 0 && (
        <div className="pagination-container">
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="pagination-btn"
          >
            ← Previous
          </button>

          <div className="pagination-pages">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`pagination-number ${currentPage === page ? "active" : ""}`}
              >
                {page}
              </button>
            ))}
          </div>

          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="pagination-btn"
          >
            Next →
          </button>
        </div>
      )}

      {/* History Modal */}
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
                  {historyRecords.map(record => (
                    <tr key={record.HistoryID}>
                      <td>{record.FieldChanged}</td>
                      <td>{record.OldValue}</td>
                      <td>{record.NewValue}</td>
                      <td>{new Date(record.EditedAt).toLocaleString("en-US")}</td>
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

export default ArchivedTable;
