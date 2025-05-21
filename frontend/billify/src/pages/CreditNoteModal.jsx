import { useEffect, useState } from "react";
import { createCreditNote, updateCreditNote } from "../services/creditNoteService";
import { getSuppliers } from "../services/supplierService";
import useDarkMode from "../components/hooks/DarkMode";

const CreditNoteModal = ({show, onClose, onCreditNoteCreated, creditNote }) => {
  const DarkMode = useDarkMode();
  const [suppliers, setSuppliers] = useState([]);
  const isEditMode = !!creditNote;

  const [form, setForm] = useState({
    credit_note_number: "",
    credit_note_date: "",
    credit_note_reg_date: new Date().toISOString().split("T")[0],
    credit_note_supplier: "",
    total_amount: "",
  });

  const userId = localStorage.getItem("userId");

  // Si estamos editando, rellenamos los campos con los datos existentes
  useEffect(() => {
    if (creditNote) {
      setForm({
        credit_note_number: creditNote.credit_note_number,
        credit_note_date: creditNote.credit_note_date,
        credit_note_reg_date: creditNote.credit_note_reg_date,
        credit_note_supplier: creditNote.credit_note_supplier,
        total_amount: creditNote.total_amount,
      });
    }
  }, [creditNote]);

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
      credit_note_number: "",
      credit_note_date: "",
      credit_note_reg_date: new Date().toISOString().split("T")[0],
      credit_note_supplier: "",
      total_amount: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const creditNoteData = {
      ...form,
      registered_by: userId,
    };

    try {
      if (isEditMode) {
        await updateCreditNote(creditNote.id, creditNoteData);
      } else {
        await createCreditNote(creditNoteData);
      }

      if (onCreditNoteCreated) onCreditNoteCreated(true); // 🔄 Notifica al padre
      onClose();
    } catch (error) {
      console.error(
        "Error al guardar el abono:", 
        error.response?.data || error.message
      );
    }
  };

  //Función para añadir facturas seguidas
  const handleSaveAndNew = async () => {
    const creditNoteData = {
      ...form,
      registered_by: userId,
    };

    try {
      await createCreditNote(creditNoteData);
      if (onCreditNoteCreated) onCreditNoteCreated(false); // 🔄 Notifica al padre
      resetForm();
    } catch (error) {
      console.error(
        "Error al crear el abono:", 
        error.response?.data || error.message
      );
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
        zIndex: 2000,  // Con esto hacemos que el modal quede por encima del navbar
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
                {isEditMode ? "Edit Credit Note" : "New Credit Note"}
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
                name="credit_note_number"
                placeholder="Credit Note Number"
                value={form.credit_note_number}
                onChange={handleChange}
                className="form-control mb-2"
                required
              />
              <input
                type="date"
                name="credit_note_date"
                value={form.credit_note_date}
                onChange={handleChange}
                className="form-control mb-2"
                required
              />
              <input
                type="date"
                name="credit_note_reg_date"
                value={form.credit_note_reg_date}
                onChange={handleChange}
                className="form-control mb-2"
                required
              />
              <select
                name="credit_note_supplier"
                value={form.credit_note_supplier}
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
                {isEditMode ? "Save Changes" : "Save Credit Note"}
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

export default CreditNoteModal;
