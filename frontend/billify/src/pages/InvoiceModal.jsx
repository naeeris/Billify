import { useEffect, useState } from "react";
import { createInvoice } from "../services/invoiceService";
import { getSuppliers } from "../services/supplierService";

const InvoiceModal = ({ show, onClose, onInvoiceCreated }) => {
  const DarkMode = useDarkMode();
  const [suppliers, setSuppliers] = useState([]);
  const [form, setForm] = useState({
    invoice_number: "",
    invoice_date: "",
    invoice_reg_date: new Date().toISOString().split("T")[0],
    invoice_supplier: "",
    total_amount: "",
  });

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (show) {
      getSuppliers()
        .then((data) => setSuppliers(data))
        .catch((err) => console.error("Error al cargar proveedores:", err));
    }
  }, [show]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const invoiceData = {
      ...form,
      registered_by: userId,
    };

    try {
      console.log("Enviando datos:", invoiceData);

      await createInvoice(invoiceData);
      if (onInvoiceCreated) onInvoiceCreated(); // 🔄 Notifica al padre
      onClose(); // Cierra el modal
    } catch (error) {
      console.error(
        "Error al crear la factura:",
        error.response?.data || error.message
      );
    }
  };

  if (!show) return null;

  return (
    <div
      className="modal show d-block"
      tabIndex="-1"
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <form onSubmit={handleSubmit}>
            <div className="modal-header">
              <h5 className="modal-title">New Invoice</h5>
              <button
                type="button"
                className="btn-close"
                onClick={onClose}
              ></button>
            </div>
            <div className="modal-body">
              <input
                type="text"
                name="invoice_number"
                placeholder="Invoice Number"
                value={form.invoice_number}
                onChange={handleChange}
                className="form-control mb-2"
                required
              />
              <input
                type="date"
                name="invoice_date"
                value={form.invoice_date}
                onChange={handleChange}
                className="form-control mb-2"
                required
              />
              <input
                type="date"
                name="invoice_reg_date"
                value={form.invoice_reg_date}
                onChange={handleChange}
                className="form-control mb-2"
                required
              />
              <select
                name="invoice_supplier"
                value={form.invoice_supplier}
                onChange={handleChange}
                className="form-select mb-2"
                required
              >
                <option value="">Select supplier</option>
                {suppliers.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name}
                  </option>
                ))}
              </select>
              <input
                type="number"
                name="total_amount"
                placeholder="Total Amount"
                value={form.total_amount}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={onClose}
              >
                Cancel
              </button>
              <button type="submit" className="btn btn-primary">
                Save Invoice
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default InvoiceModal;
