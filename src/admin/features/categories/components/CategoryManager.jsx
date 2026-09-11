import React, { useState, useEffect } from "react";
import { Plus, Edit2, Trash2, Upload, AlertCircle, CheckCircle, Image as ImageIcon } from "lucide-react";
import { fetchCategories, createCategory, updateCategory, deleteCategory, uploadImageFile } from "../services/categoriesAdminService";
import { getImageUrl } from "../../../shared/services/apiClient";

export function CategoryManager({ onCategoriesChanged }) {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [status, setStatus] = useState(null);

    // Modal state
    const [modalOpen, setModalOpen] = useState(false);
    const [editingCategory, setEditingCategory] = useState(null); // null = Add, object = Edit
    const [name, setName] = useState("");
    const [imagePath, setImagePath] = useState("");
    const [uploading, setUploading] = useState(false);

    const loadData = async () => {
        try {
            setLoading(true);
            const res = await fetchCategories();
            setCategories(res.categories || []);
            if (onCategoriesChanged) onCategoriesChanged();
        } catch (err) {
            setStatus({ type: "error", message: err.message });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadData();
    }, []);

    const openAddModal = () => {
        setEditingCategory(null);
        setName("");
        setImagePath("");
        setModalOpen(true);
    };

    const openEditModal = (cat) => {
        setEditingCategory(cat);
        setName(cat.name);
        setImagePath(cat.image || "");
        setModalOpen(true);
    };

    const handleFileUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        setUploading(true);
        try {
            const res = await uploadImageFile(file);
            if (res.image) {
                setImagePath(res.image);
            }
        } catch (err) {
            alert("Upload failed: " + err.message);
        } finally {
            setUploading(false);
        }
    };

    const [catToDelete, setCatToDelete] = useState(null);
    const [deleting, setDeleting] = useState(false);

    const handleSave = async (e) => {
        e.preventDefault();
        try {
            if (editingCategory) {
                await updateCategory(editingCategory.name, { name, image: imagePath });
                setStatus({ type: "success", message: `Category "${name}" updated!` });
            } else {
                await createCategory({ name, image: imagePath });
                setStatus({ type: "success", message: `Category "${name}" created!` });
            }
            setModalOpen(false);
            loadData();
        } catch (err) {
            alert(err.message || "Failed to save category");
        }
    };

    const confirmDelete = async () => {
        if (!catToDelete) return;
        setDeleting(true);
        try {
            await deleteCategory(catToDelete.name);
            setStatus({ type: "success", message: `Category "${catToDelete.name}" deleted.` });
            setCatToDelete(null);
            loadData();
        } catch (err) {
            setStatus({ type: "error", message: err.message || "Failed to delete category" });
        } finally {
            setDeleting(false);
        }
    };

    return (
        <div className="admin-card">
            <div className="card-header">
                <div>
                    <h3 className="card-title">Category Management</h3>
                    <p className="card-subtitle">Manage jewelry categories displayed on the website and mobile app.</p>
                </div>
                <button className="admin-primary-btn" onClick={openAddModal}>
                    <Plus size={16} /> Add New Category
                </button>
            </div>

            {status && (
                <div className={`admin-alert ${status.type}`}>
                    {status.type === "success" ? <CheckCircle size={18} /> : <AlertCircle size={18} />}
                    <span>{status.message}</span>
                </div>
            )}

            {loading ? (
                <p className="loading-text">Loading categories...</p>
            ) : categories.length === 0 ? (
                <p className="empty-text">No categories yet. Click "Add New Category" to create one.</p>
            ) : (
                <div className="admin-categories-grid">
                    {categories.map((cat, i) => (
                        <div key={i} className="admin-category-card">
                            <div className="admin-cat-thumb">
                                {cat.image ? (
                                    <img src={getImageUrl(cat.image)} alt={cat.name} />
                                ) : (
                                    <div className="no-img-placeholder"><ImageIcon size={24} /> No Image</div>
                                )}
                            </div>
                            <div className="admin-cat-body">
                                <h4>{cat.name}</h4>
                                <div className="admin-cat-actions">
                                    <button className="action-btn edit-btn" onClick={() => openEditModal(cat)}>
                                        <Edit2 size={14} /> Edit
                                    </button>
                                    <button className="action-btn delete-btn" onClick={() => setCatToDelete(cat)}>
                                        <Trash2 size={14} /> Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Add / Edit Modal */}
            {modalOpen && (
                <div className="admin-modal-backdrop" onClick={() => setModalOpen(false)}>
                    <div className="admin-modal-box" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h3>{editingCategory ? "Edit Category" : "Add New Category"}</h3>
                            <button className="modal-close" onClick={() => setModalOpen(false)}>×</button>
                        </div>
                        <form onSubmit={handleSave} className="admin-modal-form">
                            <div className="form-group">
                                <label>Category Name</label>
                                <input 
                                    type="text" 
                                    value={name} 
                                    onChange={(e) => setName(e.target.value)} 
                                    required 
                                    placeholder="e.g. Bridal Necklaces, Diamond Rings"
                                />
                            </div>

                            <div className="form-group">
                                <label>Category Photo</label>
                                <div className="upload-dropzone">
                                    {imagePath && (
                                        <div className="image-preview-box">
                                            <img src={getImageUrl(imagePath)} alt="Category Preview" />
                                        </div>
                                    )}
                                    <input 
                                        type="file" 
                                        accept="image/png, image/jpeg, image/webp" 
                                        onChange={handleFileUpload} 
                                    />
                                    <span className="upload-hint">
                                        <Upload size={16} /> {uploading ? "Uploading..." : "Upload JPG, PNG, or WebP"}
                                    </span>
                                </div>
                            </div>

                            <div className="modal-actions-row">
                                <button type="button" className="admin-secondary-btn" onClick={() => setModalOpen(false)}>
                                    Cancel
                                </button>
                                <button type="submit" className="admin-primary-btn" disabled={uploading}>
                                    {editingCategory ? "Save Changes" : "Create Category"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Category Delete Confirmation Modal */}
            {catToDelete && (
                <div className="admin-modal-backdrop" onClick={() => !deleting && setCatToDelete(null)}>
                    <div className="admin-modal-box" style={{ maxWidth: "420px" }} onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h3 style={{ color: "#EF4444", display: "flex", alignItems: "center", gap: "8px" }}>
                                <Trash2 size={20} /> Delete Category
                            </h3>
                            <button className="modal-close" onClick={() => !deleting && setCatToDelete(null)}>×</button>
                        </div>
                        <p style={{ color: "var(--admin-text-muted)", fontSize: "14px", lineHeight: "1.6", margin: "10px 0 24px" }}>
                            Are you sure you want to delete category <strong style={{ color: "#FFF" }}>"{catToDelete.name}"</strong>? This will remove it from the store catalog.
                        </p>
                        <div className="modal-actions-row">
                            <button 
                                type="button" 
                                className="admin-secondary-btn" 
                                onClick={() => setCatToDelete(null)}
                                disabled={deleting}
                            >
                                Cancel
                            </button>
                            <button 
                                type="button" 
                                className="admin-primary-btn" 
                                style={{ background: "linear-gradient(135deg, #EF4444, #B91C1C)" }}
                                onClick={confirmDelete}
                                disabled={deleting}
                            >
                                {deleting ? "Deleting..." : "Confirm Delete"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
