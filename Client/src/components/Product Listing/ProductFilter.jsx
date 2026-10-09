import { useContext, useEffect, useState } from "react";
import { FiFilter } from "react-icons/fi";
import { searchContext } from "../../context/searchContext";

function ProductFilter({ productData, setProductData, originalData }) {
    let filterData = productData;

    const categories = ["Men", "Women", "Electronics", "Home & Living", "Accessories"];
    const [checkedItems, setCheckedItems] = useState([]);
    const [priceRange, setPriceRange] = useState("500");

    const { search, searchBtnClick } = useContext(searchContext);

    const handleInput = (e) => {
        const { value, checked } = e.target;
        if (checked) {
            setCheckedItems([...checkedItems, value]);
        }
        else {
            setCheckedItems(checkedItems.filter((item) => item != value));
        }
    }

    const handleRange = (e) => {
        const { value } = e.target;
        setPriceRange(value);
    }

    const handleSearchButton = () => {
        if (search.length > 0) {
            const data = originalData.filter((items) => {
                return items.Name.toLowerCase().includes(search.toLowerCase());
            });

            setProductData(data);
        }
        else {
            setProductData(originalData);
        }
    }

    useEffect(()=>{
        handleSearchButton();
    },[searchBtnClick]);

    if (checkedItems.length != 0) {
        filterData = originalData.filter((items) => {
            return checkedItems.includes(items.Category);
        });
    }

    if (priceRange) {
        filterData = filterData.filter((items) => {
            return items.PriceAfterDiscount <= priceRange;
        });
    }

    const handleClearAll = () => {
        setCheckedItems([]);
        setPriceRange("500");
        setProductData(originalData);

    }

    const handleApplyFilter = () => {
        setProductData(filterData);
    }

    return (
        <>
            <aside className="w-full lg:w-64 bg-white p-5 rounded-xl border border-gray-200 shadow-sm h-fit ml-3">
                {/* Filter Header */}
                <div className="flex items-center justify-between pb-4 border-b border-gray-200 mb-5">
                    <div className="flex items-center gap-2 font-bold text-gray-800 text-lg">
                        <FiFilter className="text-orange-500" />
                        <span>Filter By</span>
                    </div>
                    <button className="text-xs font-medium text-orange-500 hover:underline" onClick={handleClearAll}>
                        Clear All
                    </button>
                </div>

                {/* Categories Filter */}
                <div className="mb-6">
                    <h3 className="text-sm font-semibold text-gray-800 mb-3">Category</h3>
                    <div className="space-y-2.5">
                        {categories.map((category, index) => (
                            <label key={category} className="flex items-center gap-2.5 text-sm text-gray-600 cursor-pointer hover:text-gray-900">
                                <input
                                    type="checkbox"
                                    className="accent-orange-500 w-4 h-4 rounded cursor-pointer"
                                    value={category}
                                    checked={checkedItems.includes(category)}
                                    onChange={handleInput}
                                />
                                <span>{category}</span>
                            </label>
                        ))}
                    </div>
                </div>

                {/* Price Range Filter */}
                <div className="mb-6 pt-5 border-t border-gray-100">
                    <div className="flex justify-between items-center mb-2">
                        <h3 className="text-sm font-semibold text-gray-800">Price Range</h3>
                        <span className="text-xs font-bold text-orange-500">₹{priceRange}</span>
                    </div>
                    <input
                        type="range"
                        min="0"
                        max="10000"
                        value={priceRange}
                        onChange={handleRange}
                        className="w-full accent-orange-500 cursor-pointer"
                    />
                    <div className="flex justify-between text-xs text-gray-400 mt-1">
                        <span>₹500</span>
                        <span>₹10,000</span>
                    </div>
                </div>

                {/* Apply Filter Button */}
                <div className="pt-4 border-t border-gray-100">
                    <button
                        className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium text-sm py-2.5 rounded-lg transition-colors duration-200 shadow-sm" onClick={handleApplyFilter}
                    >
                        Apply Filter
                    </button>
                </div>
            </aside>
        </>
    );
}

export default ProductFilter;