import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../services/api';

const InvoiceForm = ({ edit }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [invoice, setInvoice] = useState({ date: '', supplier: '', number: '', amount: '' });

  useEffect(() => {
    if (edit) {
      api.getById(id).then(data => setInvoice(data));
    }
  }, [edit, id]);

  const handleSubmit = async e => {
    e.preventDefault();
    if (edit) await api.update(id, invoice);
    else await api.create(invoice);
    navigate('/invoices');
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Campos: date, supplier, number, amount */}
      <button type="submit">Guardar</button>
    </form>
  );
};

export default InvoiceForm;