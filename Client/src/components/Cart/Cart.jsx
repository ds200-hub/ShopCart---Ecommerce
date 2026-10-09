import { useEffect, useState } from "react";
import { FiTrash2, FiArrowRight } from "react-icons/fi";
import { Link } from "react-router-dom";
import axios from 'axios';
const URL = import.meta.env.VITE_BASE_URL;


function Cart() {
    const [cartItem, setCartItem] = useState([]);
    const [Subtotal, setSubTotal] = useState();
    const cartProduct = async () => {
        try {
            const user = await axios.get(`${URL}/userVerification`, { withCredentials: true });
            const { userId } = user.data;
            const res = await axios.post(`${URL}/Product/Cart/CartItem`, { userId });
            const { success, data, totalPrice } = res.data;
            if (success) {
                setCartItem(data);
                setSubTotal(totalPrice);
            }
        }

        catch (err) {
            console.log(err.response.data.message);
        }
    }
    useEffect(() => {
        cartProduct();
    }, []);
    const handleDeleteProduct = async (id) => {
        try {
            const res = await axios.delete(`${URL}/Product/Cart/CartItem/${id}`);
            const {success} = res.data;
            if(success){
                cartProduct();
            }
        }
        catch (err) {
            console.log(err.response.data.message);
        }
    }
    const handleCount = async (previousQty, value, id) => {
        let updatedQty = previousQty + value;
        if (updatedQty >= 1 && updatedQty <= 5) {
            try {
                const res = await axios.patch(`${URL}/Product/Cart/CartItem/qtyUpdate/${id}`, { updatedQty });
                if (res.data.success) {
                    cartProduct();
                }
            }
            catch (err) {
                console.log(err.response.data.message);
            }
        }
    }
    return (
        <>
            <div className="min-h-screen bg-gray-50 flex flex-col justify-between">
                {/* Main Container */}
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16 w-full grow">
                    <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
                        Shopping Cart
                    </h1>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                        {/* Left: Cart Items List */}
                        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
                            <div className="divide-y divide-gray-100">

                                {/* Single Item Row */}
                                {cartItem.map((cart) => (
                                    cart.items.map((item) => (
                                        <div key={item.productId} className="py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                                            <div className="flex items-center gap-4 w-full sm:w-auto">
                                                <img
                                                    src={item.productId.Image}
                                                    alt="Product"
                                                    className="w-20 h-20 object-contain rounded-lg bg-gray-50 p-2 border border-gray-100"
                                                />
                                                <div>
                                                    <h3 className="font-semibold text-gray-800 text-sm sm:text-base">
                                                        {item.productId.Name}
                                                    </h3>
                                                    <p className="text-xs text-orange-500 font-bold mt-0.5">
                                                        {item.productId.Category}
                                                    </p>
                                                    <p className="text-gray-900 font-bold text-sm mt-1">
                                                        {item.productId.PriceAfterDiscount}
                                                    </p>
                                                </div>
                                            </div>

                                            {/* Quantity Controls & Remove */}
                                            <div className="flex items-center justify-between w-full sm:w-auto gap-6">
                                                <div className="flex items-center border border-gray-300 rounded-md">
                                                    <button className="px-2.5 py-1 bg-gray-100 text-gray-600 hover:bg-gray-200 transition font-semibold" onClick={() => { handleCount(item.quantity, -1, cart._id) }}>
                                                        -
                                                    </button>
                                                    <span className="px-3 py-1 text-sm font-medium text-gray-800">
                                                        {item.quantity}
                                                    </span>
                                                    <button className="px-2.5 py-1 bg-gray-100 text-gray-600 hover:bg-gray-200 transition font-semibold" onClick={() => { handleCount(item.quantity, 1, cart._id) }}>
                                                        +
                                                    </button>
                                                </div>

                                                <button className="text-gray-400 hover:text-red-500 transition text-lg" onClick={() => { handleDeleteProduct(cart._id); }}>
                                                    <FiTrash2 />
                                                </button>
                                            </div>
                                        </div>
                                    ))
                                ))}
                            </div>
                        </div>

                        {/* Right: Order Summary Sidebar */}
                        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm h-fit">
                            <h2 className="text-lg font-bold text-gray-800 mb-4 border-b border-gray-100 pb-3">
                                Order Summary
                            </h2>

                            <div className="space-y-3 text-sm text-gray-600">
                                <div className="flex justify-between">
                                    <span>Subtotal</span>
                                    <span className="font-semibold text-gray-800">₹{Subtotal}</span>
                                </div>

                                <div className="flex justify-between">
                                    <span>Shipping Fee</span>
                                    <span className="font-semibold text-green-600">FREE</span>
                                </div>

                                <div className="border-t border-gray-100 pt-3 flex justify-between text-base font-bold text-gray-900">
                                    <span>Total</span>
                                    <span>₹{Subtotal}</span>
                                </div>
                            </div>

                            <Link
                                to="/checkout"
                                className="mt-6 w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-3 rounded-lg transition shadow-sm flex items-center justify-center gap-2"
                            >
                                Proceed to Checkout
                                <FiArrowRight />
                            </Link>
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
}

export default Cart;