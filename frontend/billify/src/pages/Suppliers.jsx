import { useEffect, useState } from "react";
import useDarkMode from "../components/hooks/DarkMode";
import { useOutletContext } from "react-router-dom";
import { getSuppliers, deleteSupplier } from "../services/supplierService";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { toast } from "react-toastify";
import SupplierModal from "./SupplierModal";

const Suppliers = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(true);
  const { refreshSuppliers, setRefreshSuppliers } = useOutletContext();

  const DarkMode = useDarkMode();
  
  // Para manejar la edición de proveedores
  const [showSupplierModal, setShowSupplierModal] = useState(false);
  const [selectedSupplier, setSelectedSupplier] = useState(null);

  const tableClass = `table table-hover align-middle ${DarkMode ? "table-dark" : "table-light"}`;

  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        const data = await getSuppliers();
        setSuppliers(data);
      } catch (error) {
        console.error("Error al obtener proveedores:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSuppliers();
  }, [refreshSuppliers]); // <-- esto es lo que hace que se actualice automáticamente

  const handleDelete = async (id) => {
    const confirmed = window.confirm("¿Are you sure you want to delete this supplier?");
    if (!confirmed) return;

    try {
      await deleteSupplier(id);
      toast.success("Supplier deleted successfully");
      setRefreshSuppliers((prev) => !prev);
    } catch (error) {
      console.error("Error deleting supplier:", error);
      toast.error("Error deleting supplier");
    }
  };

  const handleCloseModal = () => {
    setSelectedSupplier(null);
    setShowSupplierModal(false);
  };

  const handleSupplierSaved = (shouldClose = true) => {
    setRefreshSuppliers((prev) => !prev);
    if (shouldClose) handleCloseModal();
  };

  if (loading) return <p className={DarkMode ? "text-white" : ""}>Loading suppliers...</p>;

  return (
    <div className="d-flex justify-content-center mt-5 mb-5">
      <div style={{ width: "90%", maxWidth: "900px" }}>
        <h2 className={`mb-4 mt-4 ${DarkMode ? "text-white" : ""}`}>Suppliers</h2>

        <div className="table-responsive">
          <table className={tableClass}>
            <thead>
              <tr>
                <th>CIF</th>
                <th>Name</th>
                <th>Address</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {suppliers.map((supplier) => (
                <tr key={supplier.id}>
                  <td>{supplier.cif}</td>
                  <td>{supplier.name}</td>
                  <td>{supplier.address}</td>
                  <td>{supplier.email}</td>
                  <td>{supplier.phone}</td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-outline-warning btn-sm me-2"
                      title="Edit"
                      onClick={() => {
                        setSelectedSupplier(supplier);
                        setShowSupplierModal(true);
                      }}
                    >
                      <FiEdit />
                    </button>
                    <button
                      type="button"
                      className="btn btn-outline-danger btn-sm"
                      title="Delete"
                      onClick={() => handleDelete(supplier.id)}
                    >
                      <FiTrash2 />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Modal para crear o editar proveedores */}      
        {showSupplierModal && (
          <SupplierModal
            show={showSupplierModal}
            onClose={handleCloseModal}
            onSupplierSaved={handleSupplierSaved}
            supplier={selectedSupplier}
          />
        )}
      </div>
    </div>
  );
};

export default Suppliers;
