import { Link } from "react-router-dom";
import { FaShippingFast, FaShieldAlt, FaHeadset } from "react-icons/fa";

function Footer() {
    return (
        <>
            <footer className="bg-gray-50 border-t border-gray-200 text-gray-600 mt-16 pt-10 pb-6">
                <div className="max-w-7xl mx-auto px-6">

                    {/* Trust Badges */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pb-8 border-b border-gray-200 text-center md:text-left">
                        <div className="flex items-center justify-center md:justify-start gap-3">
                            <FaShippingFast className="text-orange-500 text-2xl" />
                            <div>
                                <h4 className="text-sm font-semibold text-gray-800">Free Delivery</h4>
                                <p className="text-xs text-gray-500">For all orders over ₹499</p>
                            </div>
                        </div>
                        <div className="flex items-center justify-center md:justify-start gap-3">
                            <FaShieldAlt className="text-orange-500 text-2xl" />
                            <div>
                                <h4 className="text-sm font-semibold text-gray-800">Secure Payments</h4>
                                <p className="text-xs text-gray-500">100% protected transactions</p>
                            </div>
                        </div>
                        <div className="flex items-center justify-center md:justify-start gap-3">
                            <FaHeadset className="text-orange-500 text-2xl" />
                            <div>
                                <h4 className="text-sm font-semibold text-gray-800">24/7 Support</h4>
                                <p className="text-xs text-gray-500">Dedicated customer care</p>
                            </div>
                        </div>
                    </div>

                    {/* Main Footer Content */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 py-8">

                        {/* Brand Info */}
                        <div className="space-y-3">
                            <h2 className="text-xl font-bold text-gray-800">
                                Shop<span className="text-orange-500">Cart</span>
                            </h2>
                            <p className="text-xs text-gray-500 leading-relaxed">
                                Your one-stop destination for quality fashion, modern electronics, and home essentials.
                            </p>
                        </div>

                        {/* Quick Links */}
                        <div>
                            <h3 className="text-sm font-semibold text-gray-800 uppercase tracking-wider mb-3">Quick Links</h3>
                            <ul className="space-y-2 text-xs">
                                <li><Link to="/" className="hover:text-orange-500 transition">Home</Link></li>
                                <li><Link to="/products" className="hover:text-orange-500 transition">All Products</Link></li>
                                <li><Link to="/cart" className="hover:text-orange-500 transition">Shopping Cart</Link></li>
                            </ul>
                        </div>

                        {/* Categories */}
                        <div>
                            <h3 className="text-sm font-semibold text-gray-800 uppercase tracking-wider mb-3">Categories</h3>
                            <ul className="space-y-2 text-xs">
                                <li><a href="#men" className="hover:text-orange-500 transition">Men's Fashion</a></li>
                                <li><a href="#women" className="hover:text-orange-500 transition">Women's Fashion</a></li>
                                <li><a href="#electronics" className="hover:text-orange-500 transition">Electronics</a></li>
                                <li><a href="#home" className="hover:text-orange-500 transition">Home & Living</a></li>
                            </ul>
                        </div>

                        {/* Contact Details */}
                        <div>
                            <h3 className="text-sm font-semibold text-gray-800 uppercase tracking-wider mb-3">Contact Us</h3>
                            <ul className="space-y-2 text-xs text-gray-500">
                                <li>Email: support@shopcart.com</li>
                                <li>Phone: +91 98765 43210</li>
                                <li>Location: New Delhi, India</li>
                            </ul>
                        </div>

                    </div>

                    {/* Copyright */}
                    <div className="border-t border-gray-200 pt-6 text-center text-xs text-gray-400">
                        <p>© {new Date().getFullYear()} ShopCart. Built for Academic Project.</p>
                    </div>

                </div>
            </footer>
        </>
    );
}

export default Footer;