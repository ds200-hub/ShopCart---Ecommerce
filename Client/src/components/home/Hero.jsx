import heroImg from "../../assets/images/hero-img.png";
function Hero() {
    return (
        <>
            <div className="w-full h-auto min-h-110 bg-[#fae1c5] grid grid-cols-1 md:grid-cols-2 mb-8 relative top-23">

                <div className="h-full flex flex-col justify-center items-center px-6 sm:px-10 md:px-16 py-10 md:py-0 gap-4 sm:gap-6">

                    <p className="text-orange-600 text-base sm:text-lg font-semibold uppercase tracking-wider">
                        Summer Sale
                    </p>

                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight text-gray-900 text-center md:text-left">
                        Up to 50% OFF <br />
                        On Latest Collection
                    </h1>

                    <p className="text-gray-700 text-base sm:text-lg w-full md:w-4/5 text-center md:text-left">
                        Discover trendy fashion, electronics, and accessories at amazing
                        prices. Shop now and enjoy exclusive discounts.
                    </p>

                    <button className="bg-orange-500 text-white px-8 py-3 rounded-lg w-fit hover:bg-orange-600 transition">
                        Shop Now
                    </button>

                </div>

                <div className="h-full flex justify-center items-center px-4 md:px-0">

                    <img
                        src={heroImg}
                        alt="Hero Product"
                        className="w-full sm:w-[80%] md:w-[90%] h-70 sm:h-90 md:h-110 object-contain"
                    />

                </div>

            </div>
        </>
    );
}

export default Hero;