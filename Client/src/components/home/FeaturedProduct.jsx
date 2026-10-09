import { Link } from "react-router-dom";
import { MdOutlineArrowRightAlt } from "react-icons/md";

function FeaturedProduct() {
    return (
        <>
            <div className="flex flex-col mt-10">

                <div className="flex flex-row justify-between items-center px-4 sm:px-0">

                    <h1 className="text-xl sm:text-2xl font-bold mb-5 relative left-0 sm:left-5">
                        Featured Product
                    </h1>

                    <Link className="relative right-0 sm:right-10 flex flex-row text-amber-500">
                        View All
                        <MdOutlineArrowRightAlt className="relative top-0.5 left-1 text-xl" />
                    </Link>

                </div>


                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-5 sm:gap-6 lg:gap-8 xl:gap-16 ml-4 mr-4 sm:ml-6 sm:mr-6 lg:ml-10 lg:mr-10">


                    {/* Product 1 */}
                    <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm hover:shadow-lg transition w-full">

                        <img
                            src="https://images.unsplash.com/photo-1542291026-7eec264c27ff"
                            alt="Product"
                            className="h-30 w-full rounded-lg object-cover"
                        />

                        <p className="mt-3 text-sm text-orange-500">
                            Shoes
                        </p>

                        <h3 className="mt-1 font-semibold text-lg">
                            Nike Air Max Running Shoes
                        </h3>

                        <div className="mt-2">
                            ⭐⭐⭐⭐☆
                            <span className="ml-2 text-gray-500">(124)</span>
                        </div>

                        <div className="mt-3 flex items-center gap-3 flex-wrap">

                            <span className="text-xl font-bold">
                                ₹2,999
                            </span>

                            <span className="line-through text-gray-400">
                                ₹3,999
                            </span>

                            <span className="text-green-600 text-sm">
                                25% OFF
                            </span>

                        </div>

                        <button className="mt-5 w-full rounded-lg bg-orange-500 py-2 text-white hover:bg-orange-600">
                            Add to Cart
                        </button>

                    </div>


                    {/* Product 2 */}
                    <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm hover:shadow-lg transition w-full">

                        <img
                            src="https://images.unsplash.com/photo-1542291026-7eec264c27ff"
                            alt="Product"
                            className="h-30 w-full rounded-lg object-cover"
                        />

                        <p className="mt-3 text-sm text-orange-500">
                            Shoes
                        </p>

                        <h3 className="mt-1 font-semibold text-lg">
                            Nike Air Max Running Shoes
                        </h3>

                        <div className="mt-2">
                            ⭐⭐⭐⭐☆
                            <span className="ml-2 text-gray-500">(124)</span>
                        </div>

                        <div className="mt-3 flex items-center gap-3 flex-wrap">

                            <span className="text-xl font-bold">
                                ₹2,999
                            </span>

                            <span className="line-through text-gray-400">
                                ₹3,999
                            </span>

                            <span className="text-green-600 text-sm">
                                25% OFF
                            </span>

                        </div>

                        <button className="mt-5 w-full rounded-lg bg-orange-500 py-2 text-white hover:bg-orange-600">
                            Add to Cart
                        </button>

                    </div>


                    {/* Product 3 */}
                    <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm hover:shadow-lg transition w-full">

                        <img
                            src="https://images.unsplash.com/photo-1542291026-7eec264c27ff"
                            alt="Product"
                            className="h-30 w-full rounded-lg object-cover"
                        />

                        <p className="mt-3 text-sm text-orange-500">
                            Shoes
                        </p>

                        <h3 className="mt-1 font-semibold text-lg">
                            Nike Air Max Running Shoes
                        </h3>

                        <div className="mt-2">
                            ⭐⭐⭐⭐☆
                            <span className="ml-2 text-gray-500">(124)</span>
                        </div>

                        <div className="mt-3 flex items-center gap-3 flex-wrap">

                            <span className="text-xl font-bold">
                                ₹2,999
                            </span>

                            <span className="line-through text-gray-400">
                                ₹3,999
                            </span>

                            <span className="text-green-600 text-sm">
                                25% OFF
                            </span>

                        </div>

                        <button className="mt-5 w-full rounded-lg bg-orange-500 py-2 text-white hover:bg-orange-600">
                            Add to Cart
                        </button>

                    </div>


                    {/* Product 4 */}
                    <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm hover:shadow-lg transition w-full">

                        <img
                            src="https://images.unsplash.com/photo-1542291026-7eec264c27ff"
                            alt="Product"
                            className="h-30 w-full rounded-lg object-cover"
                        />

                        <p className="mt-3 text-sm text-orange-500">
                            Shoes
                        </p>

                        <h3 className="mt-1 font-semibold text-lg">
                            Nike Air Max Running Shoes
                        </h3>

                        <div className="mt-2">
                            ⭐⭐⭐⭐☆
                            <span className="ml-2 text-gray-500">(124)</span>
                        </div>

                        <div className="mt-3 flex items-center gap-3 flex-wrap">

                            <span className="text-xl font-bold">
                                ₹2,999
                            </span>

                            <span className="line-through text-gray-400">
                                ₹3,999
                            </span>

                            <span className="text-green-600 text-sm">
                                25% OFF
                            </span>

                        </div>

                        <button className="mt-5 w-full rounded-lg bg-orange-500 py-2 text-white hover:bg-orange-600">
                            Add to Cart
                        </button>

                    </div>


                    {/* Product 5 */}
                    <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm hover:shadow-lg transition w-full">

                        <img
                            src="https://images.unsplash.com/photo-1542291026-7eec264c27ff"
                            alt="Product"
                            className="h-30 w-full rounded-lg object-cover"
                        />

                        <p className="mt-3 text-sm text-orange-500">
                            Shoes
                        </p>

                        <h3 className="mt-1 font-semibold text-lg">
                            Nike Air Max Running Shoes
                        </h3>

                        <div className="mt-2">
                            ⭐⭐⭐⭐☆
                            <span className="ml-2 text-gray-500">(124)</span>
                        </div>

                        <div className="mt-3 flex items-center gap-3 flex-wrap">

                            <span className="text-xl font-bold">
                                ₹2,999
                            </span>

                            <span className="line-through text-gray-400">
                                ₹3,999
                            </span>

                            <span className="text-green-600 text-sm">
                                25% OFF
                            </span>

                        </div>

                        <button className="mt-5 w-full rounded-lg bg-orange-500 py-2 text-white hover:bg-orange-600">
                            Add to Cart
                        </button>

                    </div>


                    {/* Product 6 */}
                    <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm hover:shadow-lg transition w-full">

                        <img
                            src="https://images.unsplash.com/photo-1542291026-7eec264c27ff"
                            alt="Product"
                            className="h-30 w-full rounded-lg object-cover"
                        />

                        <p className="mt-3 text-sm text-orange-500">
                            Shoes
                        </p>

                        <h3 className="mt-1 font-semibold text-lg">
                            Nike Air Max Running Shoes
                        </h3>

                        <div className="mt-2">
                            ⭐⭐⭐⭐☆
                            <span className="ml-2 text-gray-500">(124)</span>
                        </div>

                        <div className="mt-3 flex items-center gap-3 flex-wrap">

                            <span className="text-xl font-bold">
                                ₹2,999
                            </span>

                            <span className="line-through text-gray-400">
                                ₹3,999
                            </span>

                            <span className="text-green-600 text-sm">
                                25% OFF
                            </span>

                        </div>

                        <button className="mt-5 w-full rounded-lg bg-orange-500 py-2 text-white hover:bg-orange-600">
                            Add to Cart
                        </button>

                    </div>


                </div>

            </div>
        </>
    );
}

export default FeaturedProduct;