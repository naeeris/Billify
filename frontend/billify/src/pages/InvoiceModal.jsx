import { useEffect, useState } from "react";
import { createInvoice, updateInvoice } from "../services/invoiceService";
import { getSuppliers } from "../services/supplierService";
import useDarkMode from "../components/hooks/DarkMode";
import { toast } from "react-toastify";

const InvoiceModal = ({ show, onClose, onInvoiceCreated, invoice }) => {
  const DarkMode = useDarkMode();
  const [suppliers, setSuppliers] = useState([]);
  const isEditMode = !!invoice;

  const [form, setForm] = useState({
    invoice_number: "",
    invoice_date: "",
    invoice_reg_date: new Date().toISOString().split("T")[0],
    invoice_supplier: "",
    total_amount: "",
  });

  const userId = localStorage.getItem("userId");

  // Si estamos editando, rellenamos los campos con los datos existentes
  useEffect(() => {
    if (invoice) {
      setForm({
        invoice_number: invoice.invoice_number,
        invoice_date: invoice.invoice_date,
        invoice_reg_date: invoice.invoice_reg_date,
        invoice_supplier: invoice.invoice_supplier,
        total_amount: invoice.total_amount,
      });
    }
  }, [invoice]);

  // Cargar proveedores
  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        const data = await getSuppliers();
        setSuppliers(data);
      } catch (err) {
        console.error("Error al cargar proveedores:", err);
      }
    };

    fetchSuppliers();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const resetForm = () => {
    setForm({
      invoice_number: "",
      invoice_date: "",
      invoice_reg_date: new Date().toISOString().split("T")[0],
      invoice_supplier: "",
      total_amount: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const invoiceData = {
      ...form,
      registered_by: userId,
    };

    try {
      if (isEditMode) {
        await updateInvoice(invoice.id, invoiceData);
        toast.success("Invoice updated successfully");
      } else {
        await createInvoice(invoiceData);
        toast.success("Invoice created successfully");
      }

      if (onInvoiceCreated) onInvoiceCreated(true); // 🔄 Notifica al padre
      onClose();
    } catch (error) {
      console.error(
        "Error al guardar la factura:",
        error.response?.data || error.message
      );
    }
  };

  //Función para añadir facturas seguidas
  const handleSaveAndNew = async () => {
    const invoiceData = {
      ...form,
      registered_by: userId,
    };

    try {
      await createInvoice(invoiceData);
      toast.success("Invoice created successfully");
      if (onInvoiceCreated) onInvoiceCreated(false); // 🔄 Notifica al padre
      resetForm(); // reinicia formulario
    } catch (error) {
      console.error(
        "Error creating invoice:",
        error.response?.data || error.message
      );
      toast.error("Error creating invoice");
    }
  };

  if (!show) return null;

  const containerClass = DarkMode ? "bg-dark text-white border-secondary" : "";

  return (
    <div
      className="modal show d-block"
      tabIndex="-1"
      style={{
        backgroundColor: "rgba(0,0,0,0.5)",
        zIndex: 2000, // Con esto hacemos que el modal quede por encima del navbar
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
      }}
    >
      <div className="modal-dialog">
        <div className={`modal-content ${containerClass}`}>
          <form onSubmit={handleSubmit}>
            <div className={`modal-header ${containerClass}`}>
              <h5 className="modal-title">
                {isEditMode ? "Edit Invoice" : "New Invoice"}
              </h5>
              <button
                type="button"
                className="btn-close"
                onClick={onClose}
              ></button>
            </div>
            <div className={`modal-body ${containerClass}`}>
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
            <div className={`modal-footer ${containerClass}`}>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={onClose}
              >
                Cancel
              </button>
              <button type="submit" className="btn btn-primary">
                {isEditMode ? "Save Changes" : "Save Invoice"}
              </button>
              {!isEditMode && (
                <button
                  type="button"
                  className="btn btn-success"
                  onClick={(e) => {
                    e.preventDefault();
                    handleSaveAndNew();
                  }}
                >
                  Save and Add New
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default InvoiceModal;
