import { useEffect, useState } from "react";
import { getInvoices, deleteInvoice } from "../services/invoiceService";
import { useOutletContext } from "react-router-dom";
import useDarkMode from "../components/hooks/DarkMode";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { isAdminUser } from "../services/authUtils";
import { toast } from "react-toastify";
import InvoiceModal from "./InvoiceModal";

const Invoices = () => {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const { refreshInvoices, setRefreshInvoices } = useOutletContext(); 

  const DarkMode = useDarkMode();
  const isAdmin = isAdminUser();

  // Para manejar la edición de facturas
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const tableClass = `table table-hover align-middle ${DarkMode ? "table-dark" : "table-light"}`;

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const data = await getInvoices();
        setInvoices(data);
      } catch (error) {
        console.error("Error al obtener las facturas:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchInvoices();
  }, [refreshInvoices]); // ← esto es lo que hace que se actualice automáticamente

  if (loading) return <p>Loading invoices...</p>;

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "¿Are you sure you want to delete this invoice?"
    );
    if (!confirmed) return;

    try {
      await deleteInvoice(id);
      setRefreshInvoices((prev) => !prev);
      toast.success("Invoice deleted successfully");
    } catch (error) {
      console.error("Error deleting invoice:", error);
      toast.error("Error deleting invoice");
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedInvoice(null);
  };

  const handleInvoiceCreated = () => {
    setRefreshInvoices((prev) => !prev);
    handleCloseModal();
  };


  return (
    <div className="d-flex justify-content-center  mt-5 mb-5">
      <div style={{ width: "90%", maxWidth: "900px" }}>
        <h2 className={`mb-4 mt-4 ${DarkMode ? "text-white" : ""}`}>
          Invoices
        </h2>
        <div className="table-responsive">
          <table className={tableClass}>
            <thead>
              <tr>
                <th>Invoice Number</th>
                <th>Registration Date</th>
                <th>Invoice Date</th>
                <th>Supplier</th>
                <th>Total Amount</th>
                <th>Registered by</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {invoices.map((invoice) => (
                <tr key={invoice.id}>
                  <td>{invoice.invoice_number}</td>
                  <td>{invoice.invoice_reg_date}</td>
                  <td>{invoice.invoice_date}</td>
                  <td>{invoice.invoice_supplier}</td>
                  <td>{invoice.total_amount} €</td>
                  <td>{invoice.registered_by_username}</td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-outline-warning btn-sm me-2"
                      onClick={() => {
                        setSelectedInvoice(invoice);
                        setShowModal(true);
                      }}
                      title="Edit"
                    >
                      <FiEdit />
                    </button>

                    {isAdmin && (
                      <button
                        type="button"
                        className="btn btn-outline-danger btn-sm"
                        onClick={() => handleDelete(invoice.id)}
                        title="Delete"
                      >
                        <FiTrash2 />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Modal para crear o editar factura */}
        {showModal && (
          <InvoiceModal
            show={showModal}
            onClose={handleCloseModal}
            onInvoiceCreated={handleInvoiceCreated}
            invoice={selectedInvoice}
          />
        )}
      </div>
    </div>
  );
};

export default Invoices;
