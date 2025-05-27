import { useEffect, useState } from "react";
import useDarkMode from "../components/hooks/DarkMode";
import { createSupplier, updateSupplier } from "../services/supplierService";
import { toast } from "react-toastify";

const SupplierModal = ({ show, onClose, onSupplierSaved, supplier }) => {
  const DarkMode = useDarkMode();
  const isEditMode = !!supplier;

  const [form, setForm] = useState({
    cif: "",
    name: "",
    address: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    if (supplier) {
      setForm({
        cif: supplier.cif || "",
        name: supplier.name || "",
        address: supplier.address || "",
        email: supplier.email || "",
        phone: supplier.phone || "",
      });
    } 
  }, [supplier]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const resetForm = () => {
    setForm({ cif: "", name: "", address: "", email: "", phone: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isEditMode) {
        await updateSupplier(supplier.id, form);
        toast.success("Supplier updated successfully");
      } else {
        await createSupplier(form);
        toast.success("Supplier created successfully");
      }

      if (onSupplierSaved) onSupplierSaved(true);
    } catch (err) {
      console.error("Error saving supplier:", err);
      toast.error("Error saving supplier");
    }
  };

  const handleSaveAndNew = async () => {
    try {
      await createSupplier(form);
      toast.success("Supplier created successfully");
      if (onSupplierSaved) onSupplierSaved(false);
      resetForm();
    } catch (err) {
      console.error("Error creating supplier:", err);
      toast.error("Error creating supplier");
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
        zIndex: 2000,
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
                {isEditMode ? "Edit Supplier" : "New Supplier"}
              </h5>
              <button type="button" className="btn-close" onClick={onClose}></button>
            </div>
            <div className={`modal-body ${containerClass}`}>
               <input
                type="text"
                name="cif"
                placeholder="CIF"
                value={form.cif}
                onChange={handleChange}
                className="form-control mb-2"
              /> 
              <input
                type="text"
                name="name"
                placeholder="Supplier Name"
                value={form.name}
                onChange={handleChange}
                className="form-control mb-2"
                required
              />
              <input 
              type="text"
              name="address"
              placeholder="Address"
              value={form.address}
              onChange={handleChange}
              className="form-control mb-2"
            />
              <input
                type="email"
                name="email"
                placeholder="Supplier Email"
                value={form.email}
                onChange={handleChange}
                className="form-control mb-2"
              />
              <input
                type="tel"
                name="phone"
                placeholder="Phone"
                value={form.phone}
                onChange={handleChange}
                className="form-control mb-2"
              />
            </div>
            <div className={`modal-footer ${containerClass}`}>
              <button type="button" className="btn btn-secondary" onClick={onClose}>
                Cancel
              </button>
              {!isEditMode && (
                <button type="button" className="btn btn-success" onClick={handleSaveAndNew}>
                  Save and create new
                </button>
              )}
              <button type="submit" className="btn btn-primary">
                {isEditMode ? "Save changes" : "Save"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SupplierModal;
