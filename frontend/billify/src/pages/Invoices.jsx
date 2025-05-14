import { useEffect, useState } from "react";
import { getInvoices } from "../services/invoiceService";
import { useOutletContext } from "react-router-dom";
import useDarkMode from "../components/hooks/DarkMode";
import { FiEdit, FiTrash2 } from "react-icons/fi";

const Invoices = () => {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const { refreshInvoices } = useOutletContext();
  const DarkMode = useDarkMode();

  const tableClass = `table table-dark table-hover align-middle ${
    DarkMode ? "table-dark" : ""
  }`;

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

  return (
    <div className="d-flex justify-content-center  mt-5 mb-5">
      <div style={{ width: "90%", maxWidth: "900px" }}>
        <h2 className={`mb-4 mt-4 ${DarkMode ? "text-white" : ""}`}>
          Invoice List
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
                  <td>{invoice.registered_by}</td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-outline-warning btn-sm me-2"
                      onClick={() => handleEdit(invoice.id)}
                      title="Edit"
                    >
                      <FiEdit />
                    </button>
                    <button
                      type="button"
                      className="btn btn-outline-danger btn-sm"
                      onClick={() => handleDelete(invoice.id)}
                      title="Delete"
                    >
                      <FiTrash2 />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Invoices;
