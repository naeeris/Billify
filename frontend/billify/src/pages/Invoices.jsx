import { useEffect, useState } from "react";
import { getInvoices } from "../services/invoiceService";

const Invoices = () => {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);

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
  }, []);

  if (loading) return <p>Loading invoices...</p>;

  return (
    <div>
      <h2>Invoice List</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Invoice Number</th>
            <th>Registration Date</th>
            <th>Invoice Date</th>
            <th>Supplier</th>
            <th>Total Amount</th>
            <th>Registered by</th>
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
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Invoices;
