import axios from "axios";
import { useState } from "react";
const URL = import.meta.env.VITE_BASE_URL;
import { useNavigate } from 'react-router-dom';

function ProductGrid({ productData }) {

    const [flag, setFlag] = useState(false);
    const [id, setId] = useState();
    const navigate = useNavigate();
    const handleAddToCart = async (ProductId, price) => {
        let userID;
        if (!flag) {
            const isUser = await axios.get(`${URL}/userVerification`, { withCredentials: true });
            const { success, userId, role } = isUser.data;
            if (success && role != "user") {
                navigate("/Login");
                return;
            }
            userID = userId;
            setFlag(success);
            setId(userId);
            if (!success) {
                navigate('/Login');
                return;
            }
        }
        try {
            const res = await axios.post(`${URL}/Product/Cart`, { ProductId, price, id: userID || id });
            const { success } = res.data;
            if (success) {
                navigate("/Cart");
            }
        }
        catch (err) {
            console.log(err.response.data.message);
        }
    }

    return (
        <>
            <div className="w-full">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mr-3">

                    {/* Card */}
                    {productData.length != 0
                        ?
                        productData.map((item) => (
                            <div key={item._id} className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm hover:shadow-lg transition flex flex-col justify-between">
                                <div>
                                    {/* Image kept exactly as requested */}
                                    <img
                                        src={item.Image}
                                        className="h-44 w-full rounded-lg object-cover"
                                    />

                                    {/* Updated Info Section */}
                                    <div className="mt-3 space-y-1.5">
                                        {/* Category & Seller Row */}
                                        <div className="flex items-center justify-between gap-2">
                                            <span className="text-[11px] font-semibold text-orange-500 uppercase tracking-wide">
                                                {item.Category}
                                            </span>
                                            <span className="text-[11px] text-gray-400 font-medium truncate">
                                                Seller: <span className="text-gray-600 font-semibold">{item.shopName}</span>
                                            </span>
                                        </div>

                                        {/* Product Name */}
                                        <h3 className="font-semibold text-sm text-gray-800 line-clamp-2 leading-snug">
                                            {item.Name}
                                        </h3>

                                        {/* Price & Discount Row */}
                                        <div className="pt-1 flex items-baseline gap-2 flex-wrap">
                                            <span className="text-base font-bold text-gray-900">
                                                ₹{item.PriceAfterDiscount?.toLocaleString('en-IN')}
                                            </span>
                                            {item.Price > item.PriceAfterDiscount && (
                                                <span className="line-through text-xs text-gray-400">
                                                    ₹{item.Price?.toLocaleString('en-IN')}
                                                </span>
                                            )}
                                            {item.Discount > 0 && (
                                                <span className="text-emerald-600 text-xs font-semibold bg-emerald-50 px-1.5 py-0.5 rounded">
                                                    {item.Discount}% OFF
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Button */}
                                <button className="mt-4 w-full rounded-lg bg-orange-500 py-2 text-sm font-medium text-white hover:bg-orange-600 transition" onClick={() => { handleAddToCart(item._id, item.PriceAfterDiscount); }}>
                                    Add to Cart
                                </button>
                            </div>
                        ))
                        :
                        <>
                            <div className="col-span-full w-full min-h-87.5 flex flex-col items-center justify-center p-8 text-center bg-white rounded-2xl border border-gray-200 shadow-sm">

                                <div className="w-20 h-20 bg-orange-50 rounded-full flex items-center justify-center mb-4 text-orange-500">

                                    <svg
                                        className="w-10 h-10"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="1.5"
                                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 4h.01"
                                        />
                                    </svg>

                                </div>

                                <h3 className="text-xl font-bold text-gray-800 mb-1">
                                    No Products Found
                                </h3>

                                <p className="text-sm text-gray-500 max-w-md">
                                    We couldn't find any items matching your current
                                    filters or search criteria. Try clearing your
                                    filters or searching for something else.
                                </p>

                            </div>
                        </>}

                </div>
            </div>
        </>
    );
}

export default ProductGrid;