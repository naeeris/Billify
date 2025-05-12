import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../services/api';

const InvoiceView = () => {
  const { id } = useParams();
  const [invoice, setInvoice] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    api.getById(id).then(setInvoice);
  }, [id]);

  if (!invoice) return <p>Cargando…</p>;

  return (
    <div>
      <h3>Factura #{invoice.number}</h3>
      <table>{/* Mostrar campos */}</table>
      <button onClick={() => navigate('/invoices')}>Volver</button>
    </div>
  );
};

export default InvoiceView;