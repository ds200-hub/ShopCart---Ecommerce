import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    FiSearch,
    FiEdit2,
    FiTrash2,
    FiPackage,
    FiAlertCircle,
    FiCheckCircle,
    FiX,
    FiImage,
    FiShoppingBag,
    FiUploadCloud,
    FiLogOut // Added FiLogOut icon
} from 'react-icons/fi';

const URL = import.meta.env.VITE_BASE_URL;

export default function ShopkeeperDashboard() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: '',
        category: '',
        originalPrice: '',
        discount: '',
        salePrice: '',
        stock: '',
        shopName: ''
    });

    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [myProducts, setMyProducts] = useState([]);
    const [sellerId, setSellerId] = useState();

    const getVerify = async () => {
        try {
            const isUser = await axios.get(`${URL}/userVerification`, { withCredentials: true });
            const { success, userId, role } = isUser.data;
            if (success && role === "seller") {
                setSellerId(userId);
                const res = await axios.post(
                    `${URL}/sellerProducts`,
                    { userId }
                );
                setMyProducts(res.data.result);
            } else {
                navigate("/Login");
            }
        } catch (error) {
            // navigate("/Login");
        }
    };

    useEffect(() => {
        getVerify();
    }, []);

    // Handle standard form inputs
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    // Handle local image file selection & preview generation
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (!file.type.startsWith('image/')) {
                alert('Please upload a valid image file (PNG, JPG, WEBP, etc.).');
                return;
            }

            setImageFile(file);

            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    // Remove selected image
    const handleRemoveImage = () => {
        setImageFile(null);
        setImagePreview(null);
    };

    // Reset Form
    const handleReset = () => {
        setFormData({
            title: '',
            category: '',
            originalPrice: '',
            discount: '',
            salePrice: '',
            stock: '',
            shopName: ''
        });
        setImageFile(null);
        setImagePreview(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append("title", formData.title);
        data.append("category", formData.category);
        data.append("originalPrice", formData.originalPrice);
        data.append("discount", formData.discount);
        data.append("salePrice", formData.salePrice);
        data.append("stock", formData.stock);
        data.append("shopName", formData.shopName);
        data.append("sellerId", sellerId);
        data.append("image", imageFile);

        try {
            const res = await axios.post(`${URL}/uploadProduct`, data);
            if (res.data.success) {
                alert(`${res.data.message}`);
                handleReset();
                getVerify();
            }
        } catch (error) {
            console.error("Failed to upload product:", error);
        }
    };

    const handleDelete = async (productId) => {
        try {
            const res = await axios.delete(`${URL}/sellerProduct/deleteProduct`, { data: { productId: productId } });
            if (res.data.success) {
                getVerify();
            }
        }
        catch (err) {
            console.log(err.response?.data?.message || err.message);
        }
    };

    const handleLogout = async () => {
        const res = await axios.post(`${URL}/deleteCookie`, {role: "seller"}, { withCredentials: true });
        const { success } = res.data;
        if (success) {
            navigate("/Login");
            return;
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 text-gray-800 font-sans">
            {/* Top Navigation Bar */}
            <header className="bg-white border-b border-gray-200 sticky top-0 z-30 shadow-xs">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <span className="text-2xl font-bold tracking-tight text-gray-900">
                            Shop<span className="text-amber-500">Cart</span>
                        </span>
                        <span className="bg-amber-100 text-amber-800 text-xs font-semibold px-2.5 py-0.5 rounded-full border border-amber-200">
                            Seller Portal
                        </span>
                    </div>

                    {/* Topmost Right Logout Button */}
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 px-3.5 py-2 text-sm font-medium text-rose-600 bg-rose-50 hover:bg-rose-100 border border-rose-200 rounded-lg transition-colors cursor-pointer"
                    >
                        <FiLogOut className="w-4 h-4" />
                        <span>Logout</span>
                    </button>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
                {/* Banner Section */}
                <section className="bg-amber-50 rounded-2xl p-6 md:p-8 border border-amber-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                        <p className="text-xs font-bold uppercase tracking-wider text-orange-600 mb-1">
                            Store Manager
                        </p>
                        <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900">
                            Shopkeeper Dashboard
                        </h1>
                        <p className="text-gray-600 text-sm mt-1">
                            Manage product listings, inventory levels, prices, and stock status.
                        </p>
                    </div>
                </section>

                {/* Inventory Analytics Cards */}
                <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                    <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-xs flex items-center gap-4">
                        <div className="p-3 bg-amber-100 text-amber-600 rounded-lg">
                            <FiPackage className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-xs font-medium text-gray-500 uppercase">Total Items</p>
                            <p className="text-2xl font-bold text-gray-900">24</p>
                        </div>
                    </div>

                    <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-xs flex items-center gap-4">
                        <div className="p-3 bg-emerald-100 text-emerald-600 rounded-lg">
                            <FiCheckCircle className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-xs font-medium text-gray-500 uppercase">In Stock</p>
                            <p className="text-2xl font-bold text-gray-900">20</p>
                        </div>
                    </div>

                    <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-xs flex items-center gap-4">
                        <div className="p-3 bg-rose-100 text-rose-600 rounded-lg">
                            <FiAlertCircle className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-xs font-medium text-gray-500 uppercase">Out of Stock</p>
                            <p className="text-2xl font-bold text-gray-900">4</p>
                        </div>
                    </div>

                    <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-xs flex items-center gap-4">
                        <div className="p-3 bg-blue-100 text-blue-600 rounded-lg">
                            <FiShoppingBag className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-xs font-medium text-gray-500 uppercase">Active Categories</p>
                            <p className="text-2xl font-bold text-gray-900">6</p>
                        </div>
                    </div>
                </section>

                {/* Filter and Search Bar */}
                <section className="bg-white p-4 rounded-xl border border-gray-200 shadow-xs flex flex-col md:flex-row gap-4 justify-between items-center">
                    <div className="relative w-full md:w-96">
                        <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search products by title..."
                            className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                        />
                    </div>
                </section>

                {/* Product Inventory Table */}
                <section className="bg-white rounded-xl border border-gray-200 shadow-xs overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-50 border-b border-gray-200 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                    <th className="px-6 py-4">Product Details</th>
                                    <th className="px-6 py-4">Category</th>
                                    <th className="px-6 py-4">Original Price</th>
                                    <th className="px-6 py-4">Sale Price</th>
                                    <th className="px-6 py-4">Stock</th>
                                    <th className="px-6 py-4">Status</th>
                                    <th className="px-6 py-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 text-sm">
                                {myProducts.map((product) => (
                                    <tr key={product._id} className="hover:bg-gray-50/80 transition-colors">
                                        <td className="px-6 py-4 flex items-center gap-3">
                                            {product.Image ? (
                                                <img
                                                    src={`${product.Image}`}
                                                    alt={product.Name}
                                                    className="w-12 h-12 rounded-lg object-cover border border-gray-200 shrink-0"
                                                />
                                            ) : (
                                                <div className="w-12 h-12 rounded-lg bg-gray-100 border border-gray-200 flex items-center justify-center text-gray-400 shrink-0">
                                                    <FiImage className="w-6 h-6" />
                                                </div>
                                            )}
                                            <div>
                                                <p className="font-semibold text-gray-900">{product.Name}</p>
                                                <p className="text-xs text-gray-500">ID: #{product._id ? product._id.slice(-6) : 'PROD'}</p>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-gray-600 font-medium">{product.Category}</td>
                                        <td className="px-6 py-4 text-gray-400 line-through">₹{product.Price}</td>
                                        <td className="px-6 py-4 font-bold text-gray-900">₹{product.PriceAfterDiscount}</td>
                                        <td className="px-6 py-4 text-gray-700 font-medium">{product.Stock} pcs</td>
                                        <td className="px-6 py-4">
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                                                In Stock
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right space-x-2">
                                            <button className="p-1.5 text-gray-500 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-colors">
                                                <FiEdit2 className="w-4 h-4" />
                                            </button>
                                            <button className="p-1.5 text-gray-500 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors" onClick={() => { handleDelete(product._id) }}>
                                                <FiTrash2 className="w-4 h-4" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>

                {/* Add Product Form Section */}
                <section className="bg-white rounded-2xl border border-gray-200 shadow-xs overflow-hidden">
                    <div className="bg-amber-50 px-6 py-4 border-b border-amber-100 flex items-center justify-between">
                        <h2 className="text-lg font-bold text-gray-900">Add New Product Form</h2>
                        <span className="text-xs text-gray-500 font-medium">* All fields required</span>
                    </div>

                    <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-xs font-semibold text-gray-700 uppercase mb-2">
                                    Product Title *
                                </label>
                                <input
                                    type="text"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleInputChange}
                                    placeholder="e.g. Wireless Noise Cancelling Headphones"
                                    className="w-full px-3.5 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-gray-700 uppercase mb-2">
                                    Category *
                                </label>
                                <select
                                    name="category"
                                    value={formData.category}
                                    onChange={handleInputChange}
                                    className="w-full px-3.5 py-2.5 border border-gray-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                                    required
                                >
                                    <option value="">Select Category</option>
                                    <option value="Men">Men</option>
                                    <option value="Women">Women</option>
                                    <option value="Electronics">Electronics</option>
                                    <option value="Home & Living">Home & Living</option>
                                    <option value="Accessories">Accessories</option>
                                </select>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                            <div>
                                <label className="block text-xs font-semibold text-gray-700 uppercase mb-2">
                                    Original Price (₹) *
                                </label>
                                <input
                                    type="number"
                                    name="originalPrice"
                                    value={formData.originalPrice}
                                    onChange={handleInputChange}
                                    placeholder="3999"
                                    className="w-full px-3.5 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-gray-700 uppercase mb-2">
                                    Discount (%) *
                                </label>
                                <input
                                    type="number"
                                    name="discount"
                                    value={formData.discount}
                                    onChange={handleInputChange}
                                    placeholder="10"
                                    className="w-full px-3.5 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-gray-700 uppercase mb-2">
                                    Discounted / Sale Price (₹)
                                </label>
                                <input
                                    type="number"
                                    name="salePrice"
                                    value={formData.salePrice}
                                    onChange={handleInputChange}
                                    placeholder="2999"
                                    className="w-full px-3.5 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-gray-700 uppercase mb-2">
                                    Initial Stock Quantity *
                                </label>
                                <input
                                    type="number"
                                    name="stock"
                                    value={formData.stock}
                                    onChange={handleInputChange}
                                    placeholder="50"
                                    className="w-full px-3.5 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                                    required
                                />
                            </div>
                        </div>

                        {/* File Upload Zone with Native Browser Validation */}
                        <div>
                            <label className="block text-xs font-semibold text-gray-700 uppercase mb-2">
                                Product Image *
                            </label>

                            <div className="relative">
                                <input
                                    type="file"
                                    id="productImageInput"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    required={!imageFile}
                                    className="sr-only"
                                />

                                {!imagePreview ? (
                                    <label
                                        htmlFor="productImageInput"
                                        className="flex flex-col items-center justify-center w-full h-44 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer bg-gray-50 hover:bg-amber-50/50 hover:border-amber-400 transition-colors"
                                    >
                                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                            <FiUploadCloud className="w-10 h-10 text-amber-500 mb-2" />
                                            <p className="mb-1 text-sm font-semibold text-gray-700">
                                                Click to upload <span className="font-normal text-gray-500">or drag and drop</span>
                                            </p>
                                            <p className="text-xs text-gray-500">PNG, JPG, WEBP or JPEG (max 5MB)</p>
                                        </div>
                                    </label>
                                ) : (
                                    <div className="relative w-48 h-48 border border-gray-200 rounded-xl overflow-hidden group shadow-sm bg-gray-50">
                                        <img
                                            src={imagePreview}
                                            alt="Product Preview"
                                            className="w-full h-full object-cover"
                                        />
                                        <button
                                            type="button"
                                            onClick={handleRemoveImage}
                                            className="absolute top-2 right-2 bg-rose-600 text-white p-1.5 rounded-full hover:bg-rose-700 transition-colors shadow-md"
                                            title="Remove Image"
                                        >
                                            <FiX className="w-4 h-4" />
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-gray-700 uppercase mb-2">
                                Shop Name *
                            </label>
                            <input
                                type="text"
                                name="shopName"
                                value={formData.shopName}
                                onChange={handleInputChange}
                                placeholder="e.g. Apex Retail Store"
                                className="w-full px-3.5 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                                required
                            />
                        </div>

                        <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                            <button
                                type="button"
                                onClick={handleReset}
                                className="px-5 py-2.5 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                            >
                                Reset Form
                            </button>
                            <button
                                type="submit"
                                className="px-6 py-2.5 bg-orange-500 hover:bg-orange-600 text-white rounded-lg text-sm font-medium transition-colors shadow-sm"
                            >
                                Save Product
                            </button>
                        </div>
                    </form>
                </section>
            </main>
        </div>
    );
}