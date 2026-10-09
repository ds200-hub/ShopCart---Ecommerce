import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const URL = import.meta.env.VITE_BASE_URL;
const Key = import.meta.env.VITE_KEY_ID;

function Checkout() {
    const [cart, setCart] = useState([]);
    const [totalPrice, setTotalPrice] = useState();
    const [id, setId] = useState();
    const [formData, setFormData] = useState({
        fullName:"",
        phoneNo:"",
        streetAddress:"",
        city:"",
        pincode:""
    });

    const navigate = useNavigate();

    useEffect(() => {
        const cartItems = async () => {
            try {
                const user = await axios.get(`${URL}/userVerification`, { withCredentials: true });
                const { userId } = user.data;
                setId(userId);
                const res = await axios.post(`${URL}/Product/Cart/CartItem`, { userId });
                const { success, data, totalPrice } = res.data;
                if (success) {
                    setCart(data);
                    setTotalPrice(totalPrice);
                }
            }
            catch (err) {
                console.log(err.response.data.message);
            }

        }
        cartItems();
    }, []);

    const handleForm = (e) => {
        const {name, value} = e.target;
        setFormData({
            ...formData,
            [name]:value
        });
    }

    const handlePlaceOrder = async () => {
        try {
            const { data } = await axios.post(`${URL}/payment/create-order`, {
                amount: totalPrice,
            });

            const { order } = data;

            console.log(order);

            const options = {
                key: Key,
                amount: order.amount,
                currency: order.currency,
                name: 'My Store',
                description: 'Payment for Cart Items',
                order_id: order.id,

                handler: async function (response) {
                    const verifyPayload = {
                        razorpay_order_id: response.razorpay_order_id,
                        razorpay_payment_id: response.razorpay_payment_id,
                        razorpay_signature: response.razorpay_signature,
                        carts: cart,      
                        shippingAddress: formData, 
                        userId: id
                    };

                    try {
                        const res = await axios.post(`${URL}/orders/verify-and-save`, verifyPayload);

                        if (res.data.success) {
                            navigate("/Account");
                        }
                    } catch (error) {
                        console.error('Verification failed:', error);
                    }
                },

                prefill: {
                    name: 'John Doe',
                    email: 'john@example.com',
                    contact: '9999999999',
                },
                theme: {
                    color: '#3399cc',
                },
            };

            const razorpayWindow = new window.Razorpay(options);
            razorpayWindow.open();

        } catch (error) {
            console.error('Payment initialization error:', error);
            alert('Unable to initiate payment. Please try again.');
        }
    }
    return (
        <>
            <div className="min-h-screen bg-gray-50 flex flex-col justify-between">

                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16 w-full grow">
                    <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
                        Checkout
                    </h1>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                        {/* Left: Shipping & Payment Form */}
                        <div className="lg:col-span-2 space-y-6">

                            {/* Shipping Address */}
                            <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
                                <h2 className="text-lg font-bold text-gray-800 mb-4 border-b border-gray-100 pb-2">
                                    Shipping Address
                                </h2>

                                <form className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                                    <div>
                                        <label className="block text-gray-600 font-medium mb-1">Full Name</label>
                                        <input
                                            type="text"
                                            name="fullName"
                                            placeholder="John Doe"
                                            className="w-full border border-gray-300 rounded-lg p-2.5 focus:outline-none focus:border-orange-500"
                                            onChange={handleForm}
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-gray-600 font-medium mb-1">Phone Number</label>
                                        <input
                                            type="text"
                                            name="phoneNo"
                                            placeholder="+91 9876543210"
                                            className="w-full border border-gray-300 rounded-lg p-2.5 focus:outline-none focus:border-orange-500"
                                            onChange={handleForm}
                                        />
                                    </div>

                                    <div className="md:col-span-2">
                                        <label className="block text-gray-600 font-medium mb-1">Street Address</label>
                                        <input
                                            type="text"
                                            name="streetAddress"
                                            placeholder="House No., Flat, Street Area"
                                            className="w-full border border-gray-300 rounded-lg p-2.5 focus:outline-none focus:border-orange-500"
                                            onChange={handleForm}
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-gray-600 font-medium mb-1">City</label>
                                        <input
                                            type="text"
                                            name="city"
                                            placeholder="New Delhi"
                                            className="w-full border border-gray-300 rounded-lg p-2.5 focus:outline-none focus:border-orange-500"
                                            onChange={handleForm}
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-gray-600 font-medium mb-1">Pincode</label>
                                        <input
                                            type="text"
                                            name="pincode"
                                            placeholder="110001"
                                            className="w-full border border-gray-300 rounded-lg p-2.5 focus:outline-none focus:border-orange-500"
                                            onChange={handleForm}
                                        />
                                    </div>
                                </form>
                            </div>


                        </div>

                        {/* Right: Order Summary */}
                        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm h-fit">
                            <h2 className="text-lg font-bold text-gray-800 mb-4 border-b border-gray-100 pb-3">
                                Order Details
                            </h2>

                            {/* Item Preview */}
                            {cart.map((cartItem) => (
                                <div key={cartItem._id} className="flex items-center gap-3 pb-4 border-b border-gray-100 text-sm">
                                    <img
                                        src={`${cartItem.items[0].productId.Image}`}
                                        alt="Product"
                                        className="w-12 h-12 object-contain bg-gray-50 rounded border border-gray-100"
                                    />
                                    <div className="flex-1">
                                        <p className="font-semibold text-gray-800 truncate">Nike Air Max Running Shoes</p>
                                        <p className="text-xs text-gray-500">Qty: {cartItem.items[0].quantity}</p>
                                    </div>
                                    <p className="font-bold text-gray-900">₹{cartItem.items[0].productId.PriceAfterDiscount * cartItem.items[0].quantity}</p>
                                </div>
                            ))}

                            <div className="space-y-3 text-sm text-gray-600 mt-4">
                                <div className="flex justify-between">
                                    <span>Subtotal</span>
                                    <span className="font-semibold text-gray-800">₹{totalPrice}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Delivery</span>
                                    <span className="font-semibold text-green-600">FREE</span>
                                </div>
                                <div className="border-t border-gray-100 pt-3 flex justify-between text-base font-bold text-gray-900">
                                    <span>Total Amount</span>
                                    <span>₹{totalPrice}</span>
                                </div>
                            </div>

                            <button
                                to="/order-success"
                                className="mt-6 w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-3 rounded-lg transition shadow-sm block text-center" onClick={handlePlaceOrder}
                            >
                                Place Order
                            </button>
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
}

export default Checkout;