import React, { useState, useEffect } from "react";
import { Plus, Edit2, Trash2, Search, Upload, X, ShieldCheck, Image as ImageIcon, AlertCircle, CheckCircle } from "lucide-react";
import { fetchJewellery, createJewellery, updateJewellery, deleteJewellery, uploadJewelleryImage } from "../services/jewelleryAdminService";
import { fetchCategories } from "../../categories/services/categoriesAdminService";
import { getImageUrl } from "../../../shared/services/apiClient";

export function JewelleryManager() {
    const [items, setItems] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [searchQuery, setSearchQuery] = useState("");
    const [loading, setLoading] = useState(true);
    const [status, setStatus] = useState(null);

    // Modal state
    const [modalOpen, setModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState(null); // null = Add, object = Edit
    const [name, setName] = useState("");
    const [category, setCategory] = useState("");
    const [purity, setPurity] = useState("22K (916 BIS)");
    const [weight, setWeight] = useState("");
    const [description, setDescription] = useState("");
    const [photos, setPhotos] = useState([]);
    const [uploading, setUploading] = useState(false);

    const loadData = async () => {
        try {
            setLoading(true);
            const [jewelleryRes, catRes] = await Promise.all([
                fetchJewellery({ category: selectedCategory, search: searchQuery }),
                fetchCategories()
            ]);
            setItems(jewelleryRes.jewellery || []);
            setCategories(catRes.categories || []);
        } catch (err) {
            setStatus({ type: "error", message: err.message });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadData();
    }, [selectedCategory, searchQuery]);

    const openAddModal = () => {
        setEditingItem(null);
        setName("");
        setCategory(categories[0]?.name || "Rings");
        setPurity("22K (916 BIS)");
        setWeight("");
        setDescription("");
        setPhotos([]);
        setModalOpen(true);
    };

    const openEditModal = (item) => {
        setEditingItem(item);
        setName(item.name || "");
        setCategory(item.category || categories[0]?.name || "");
        setPurity(item.purity || "22K (916 BIS)");
        setWeight(item.weight || "");
        setDescription(item.description || "");
        setPhotos(Array.isArray(item.photos) && item.photos.length > 0 ? item.photos : (item.image ? [item.image] : []));
        setModalOpen(true);
    };

    const handleUploadPhoto = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        setUploading(true);
        try {
            const res = await uploadJewelleryImage(file);
            if (res.image) {
                setPhotos(prev => [...prev, res.image]);
            }
        } catch (err) {
            alert("Image upload failed: " + err.message);
        } finally {
            setUploading(false);
        }
    };

    const removePhoto = (index) => {
        setPhotos(prev => prev.filter((_, i) => i !== index));
    };

    const handleSave = async (e) => {
        e.preventDefault();
        try {
            const payload = {
                name,
                category,
                purity,
                weight,
                description,
                photos,
                image: photos[0] || ""
            };

            if (editingItem) {
                await updateJewellery(editingItem.id, payload);
                setStatus({ type: "success", message: `Updated "${name}" successfully!` });
            } else {
                await createJewellery(payload);
                setStatus({ type: "success", message: `Created "${name}" successfully!` });
            }
            setModalOpen(false);
            loadData();
        } catch (err) {
            alert(err.message || "Failed to save product");
        }
    };

    const handleDelete = async (item) => {
        if (!window.confirm(`Are you sure you want to delete "${item.name}"?`)) return;
        try {
            await deleteJewellery(item.id);
            setStatus({ type: "success", message: `Deleted "${item.name}".` });
            loadData();
        } catch (err) {
            setStatus({ type: "error", message: err.message });
        }
    };

    return (
        <div className="admin-card">
            <div className="card-header">
                <div>
                    <h3 className="card-title">Jewellery Catalog Management</h3>
                    <p className="card-subtitle">Add, edit, upload multi-photos, and manage jewellery designs.</p>
                </div>
                <button className="admin-primary-btn" onClick={openAddModal}>
                    <Plus size={16} /> Add New Jewellery
                </button>
            </div>

            {status && (
                <div className={`admin-alert ${status.type}`}>
                    {status.type === "success" ? <CheckCircle size={18} /> : <AlertCircle size={18} />}
                    <span>{status.message}</span>
                </div>
            )}

            {/* Filter controls */}
            <div className="admin-table-filters">
                <div className="filter-search-box">
                    <Search size={16} className="search-icon" />
                    <input 
                        type="text" 
                        placeholder="Filter products..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>

                <div className="filter-select-box">
                    <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
                        <option value="All">All Categories</option>
                        {categories.map((c, i) => (
                            <option key={i} value={c.name}>{c.name}</option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Table */}
            {loading ? (
                <p className="loading-text">Loading catalog items...</p>
            ) : items.length === 0 ? (
                <p className="empty-text">No jewellery items found matching your criteria.</p>
            ) : (
                <div className="admin-table-container">
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th>Photo</th>
                                <th>Name</th>
                                <th>Category</th>
                                <th>Purity</th>
                                <th>Weight</th>
                                <th style={{ textAlign: "right" }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {items.map(item => {
                                const thumb = item.photos?.[0] || item.image;
                                return (
                                    <tr key={item.id}>
                                        <td style={{ width: "60px" }}>
                                            <div className="table-thumb-wrap">
                                                {thumb ? (
                                                    <img src={getImageUrl(thumb)} alt={item.name} />
                                                ) : (
                                                    <ImageIcon size={18} />
                                                )}
                                            </div>
                                        </td>
                                        <td>
                                            <div className="table-item-name">{item.name}</div>
                                        </td>
                                        <td><span className="table-badge">{item.category || "—"}</span></td>
                                        <td><span className="purity-tag">{item.purity || "22K"}</span></td>
                                        <td>{item.weight || "—"}</td>
                                        <td style={{ textAlign: "right" }}>
                                            <div className="table-action-btns">
                                                <button className="action-btn edit-btn" onClick={() => openEditModal(item)} title="Edit">
                                                    <Edit2 size={14} />
                                                </button>
                                                <button className="action-btn delete-btn" onClick={() => handleDelete(item)} title="Delete">
                                                    <Trash2 size={14} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Add / Edit Modal */}
            {modalOpen && (
                <div className="admin-modal-backdrop" onClick={() => setModalOpen(false)}>
                    <div className="admin-modal-box large" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h3>{editingItem ? "Edit Jewellery Design" : "Add New Jewellery Design"}</h3>
                            <button className="modal-close" onClick={() => setModalOpen(false)}>×</button>
                        </div>
                        <form onSubmit={handleSave} className="admin-modal-form">
                            <div className="form-grid-2">
                                <div className="form-group">
                                    <label>Product Name</label>
                                    <input 
                                        type="text" 
                                        value={name} 
                                        onChange={(e) => setName(e.target.value)} 
                                        required 
                                        placeholder="e.g. Royal Bridal Gold Choker"
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Category</label>
                                    <select value={category} onChange={(e) => setCategory(e.target.value)} required>
                                        {categories.map((c, i) => (
                                            <option key={i} value={c.name}>{c.name}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div className="form-grid-2">
                                <div className="form-group">
                                    <label>Gold Purity</label>
                                    <select value={purity} onChange={(e) => setPurity(e.target.value)}>
                                        <option value="22K (916 BIS)">22K (916 BIS Hallmarked)</option>
                                        <option value="24K (999 Pure)">24K (999 Pure Gold)</option>
                                        <option value="18K (750 Gold)">18K (750 Gold)</option>
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label>Weight (Grams)</label>
                                    <input 
                                        type="text" 
                                        value={weight} 
                                        onChange={(e) => setWeight(e.target.value)} 
                                        placeholder="e.g. 24.5 grams"
                                    />
                                </div>
                            </div>

                            <div className="form-group">
                                <label>Description & Crafting Details</label>
                                <textarea 
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    placeholder="Add details on craftsmanship, stone settings, or bridal styling..."
                                    rows={3}
                                />
                            </div>

                            {/* Multi-Photo Upload */}
                            <div className="form-group">
                                <label>Product Images ({photos.length} uploaded)</label>
                                
                                <div className="photos-preview-gallery">
                                    {photos.map((photo, i) => (
                                        <div key={i} className="photo-thumb-box">
                                            <img src={getImageUrl(photo)} alt={`Photo ${i + 1}`} />
                                            <button 
                                                type="button" 
                                                className="remove-photo-btn"
                                                onClick={() => removePhoto(i)}
                                                title="Remove photo"
                                            >
                                                <X size={12} />
                                            </button>
                                            {i === 0 && <span className="main-tag">Cover</span>}
                                        </div>
                                    ))}

                                    <label className="add-photo-dropzone">
                                        <input 
                                            type="file" 
                                            accept="image/*" 
                                            onChange={handleUploadPhoto}
                                            disabled={uploading}
                                        />
                                        <Upload size={18} />
                                        <span>{uploading ? "Uploading..." : "Add Photo"}</span>
                                    </label>
                                </div>
                            </div>

                            <div className="modal-actions-row">
                                <button type="button" className="admin-secondary-btn" onClick={() => setModalOpen(false)}>
                                    Cancel
                                </button>
                                <button type="submit" className="admin-primary-btn" disabled={uploading}>
                                    {editingItem ? "Save Changes" : "Publish Jewellery"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
