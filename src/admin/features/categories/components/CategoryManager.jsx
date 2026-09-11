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

    const handleDelete = async (catName) => {
        if (!window.confirm(`Are you sure you want to delete category "${catName}"?`)) return;
        try {
            await deleteCategory(catName);
            setStatus({ type: "success", message: `Category "${catName}" deleted.` });
            loadData();
        } catch (err) {
            setStatus({ type: "error", message: err.message });
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
                                    <button className="action-btn delete-btn" onClick={() => handleDelete(cat.name)}>
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
        </div>
    );
}
