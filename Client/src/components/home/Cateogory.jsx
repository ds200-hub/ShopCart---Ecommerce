import menDressImg from "../../assets/Images/men dress.png";
import womenDressImg from "../../assets/Images/women dress.png";
import electronicsImg from "../../assets/Images/electronics.png";
import homeAndLivingImg from "../../assets/Images/home and living.png";
import accessoriesImg from "../../assets/Images/accessories.png";
import topDealsImg from "../../assets/Images/top deals.png";

import { Link } from "react-router-dom";

function Cateogory() {
    return (
        <>
            <div className="flex flex-col mt-30">

                <h1 className="text-2xl font-bold relative left-5 mb-5">
                    Shop By Cateogory
                </h1>

                <div className="h-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-6 lg:gap-16 ml-4 mr-4 sm:ml-6 sm:mr-6 lg:ml-10 lg:mr-10">

                    <Link className="flex flex-col items-center justify-center bg-white border-black shadow-sm rounded-3xl hover:shadow-xl duration-150 ease-in-out py-3">

                        <img
                            className="h-24 w-24 sm:h-30 sm:w-30"
                            src={menDressImg}
                            alt="men dress"
                        />

                        <p className="font-semibold relative top-1">
                            Men
                        </p>

                    </Link>


                    <Link className="flex flex-col items-center justify-center bg-white border-black shadow-sm rounded-3xl hover:shadow-xl duration-150 ease-in-out py-3">

                        <img
                            className="h-24 w-16 sm:h-30 sm:w-18"
                            src={womenDressImg}
                            alt="women dress"
                        />

                        <p className="font-semibold relative top-1">
                            Women
                        </p>

                    </Link>


                    <Link className="flex flex-col items-center justify-center bg-white border-black shadow-sm rounded-3xl hover:shadow-xl duration-150 ease-in-out py-3">

                        <img
                            className="h-24 w-24 sm:h-30 sm:w-30"
                            src={electronicsImg}
                            alt="electronics"
                        />

                        <p className="font-semibold relative top-1">
                            Electronics
                        </p>

                    </Link>


                    <Link className="flex flex-col items-center justify-center bg-white border-black shadow-sm rounded-3xl hover:shadow-xl duration-150 ease-in-out py-3">

                        <img
                            className="h-24 w-24 sm:h-30 sm:w-30"
                            src={homeAndLivingImg}
                            alt="home and living"
                        />

                        <p className="font-semibold relative top-1">
                            Home & Living
                        </p>

                    </Link>


                    <Link className="flex flex-col items-center justify-center bg-white border-black shadow-sm rounded-3xl hover:shadow-xl duration-150 ease-in-out py-3">

                        <img
                            className="h-24 w-24 sm:h-30 sm:w-30"
                            src={accessoriesImg}
                            alt="accessories"
                        />

                        <p className="font-semibold relative top-1">
                            Accessories
                        </p>

                    </Link>


                    <Link className="flex flex-col items-center justify-center bg-white border-black shadow-sm rounded-3xl hover:shadow-xl duration-150 ease-in-out py-3">

                        <img
                            className="h-24 w-24 sm:h-30 sm:w-30"
                            src={topDealsImg}
                            alt="top deals"
                        />

                        <p className="font-semibold relative top-1">
                            Top Deals
                        </p>

                    </Link>

                </div>

            </div>
        </>
    );
}

export default Cateogory;