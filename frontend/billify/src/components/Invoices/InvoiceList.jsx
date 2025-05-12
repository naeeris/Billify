import { useEffect, useState } from "react";
import Tables from "../Layout/Tables";
import SearchBox from "../Layout/SearchBox";
import { getInvoices, deleteInvoice }from "../../services/api";

const InvoiceList = () => {
  const [invoices, setInvoices] = useState([]);
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    getInvoices().then((data) => {
      setInvoices(data);
      setFiltered(data);
    });
  }, []);

  const handleSearch = (term) => {
    const lower = term.toLowerCase();
    setFiltered(
      invoices.filter(
        (inv) =>
          inv.customerName.toLowerCase().includes(lower) ||
          inv.id.toString().includes(lower)
      )
    );
  };

  const handleDelete = (id) => {
    deleteInvoice(id).then(() => {
      const updated = invoices.filter((inv) => inv.id !== id);
      setInvoices(updated);
      setFiltered(updated);
    });
  };

  return (
    <>
      <SearchBox onSearch={handleSearch} placeholder="Buscar factura..." />
      <Tables resource="invoices" data={filtered} onDelete={handleDelete} />
    </>
  );
};

export default InvoiceList;
