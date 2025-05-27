import { useEffect, useState } from "react";
import { getCreditNotes, deleteCreditNote } from "../services/creditNoteService";
import { useOutletContext } from "react-router-dom";
import useDarkMode from "../components/hooks/DarkMode";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { isAdminUser } from "../services/authUtils";
import { toast } from "react-toastify";
import CreditNoteModal from "./CreditNoteModal";

const CreditNotes = () => {
  const [creditNotes, setCreditNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const { refreshCreditNotes, setRefreshCreditNotes } = useOutletContext();

  const DarkMode = useDarkMode();
  const isAdmin = isAdminUser();

  // Para manejar la edición de abonos
  const [selectedCreditNote, setSelectedCreditNote] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const tableClass = `table table-hover align-middle ${DarkMode ? "table-dark" : "table-light"}`;

  useEffect(() => {
    const fetchCreditNotes = async () => {
      try {
        const data = await getCreditNotes();
        setCreditNotes(data);
      } catch (error) {
        console.error("Error al obtener notas de crédito:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCreditNotes();
  }, [refreshCreditNotes]); // ← esto es lo que hace que se actualice automáticamente

  if (loading) return <p>Loading credit notes...</p>;

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
        "¿Seguro que quieres eliminar esta nota de crédito?"
    );
    if (!confirmed) return;

    try {
      await deleteCreditNote(id);
      setRefreshCreditNotes((prev) => !prev);
      toast.success("Abono eliminado correctamente");
    } catch (error) {
      console.error("Error al eliminar:", error);
      toast.error("Error al eliminar el abono");
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedCreditNote(null);
  };

  const handleCreditNoteCreated = () => {
    setRefreshCreditNotes((prev) => !prev);
    handleCloseModal();
  };

  return (
    <div className="d-flex justify-content-center mt-5 mb-5">
      <div style={{ width: "90%", maxWidth: "900px" }}>
        <h2 className={`mb-4 mt-4 ${DarkMode ? "text-white" : ""}`}>
          Credit Notes
        </h2>

        <div className="table-responsive">
          <table className={tableClass}>
            <thead>
              <tr>
                <th>Credit Note Number</th>
                <th>Registration Date</th>
                <th>Credit Note Date</th>
                <th>Supplier</th>
                <th>Total Amount</th>
                <th>Registered by</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {creditNotes.map((creditnote) => (
                <tr key={creditnote.id}>
                  <td>{creditnote.credit_note_number}</td>
                  <td>{creditnote.credit_note_date}</td>
                  <td>{creditnote.credit_note_reg_date}</td>
                  <td>{creditnote.credit_note_supplier}</td>
                  <td>{creditnote.total_amount} €</td>
                  <td>{creditnote.registered_by}</td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-outline-warning btn-sm me-2"
                      onClick={() => {
                        setSelectedCreditNote(creditnote);
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
                        onClick={() => handleDelete(creditnote.id)}
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
        {/* Modal para crear o editar abono */}
        {showModal && (
          <CreditNoteModal
            show={showModal}
            onClose={handleCloseModal}
            onCreditNoteCreated={handleCreditNoteCreated}
            creditNote={selectedCreditNote}
          />
        )}
      </div>
    </div>
  );
};

export default CreditNotes;
