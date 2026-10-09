import { useState } from "react";
import ProductFilter from "./ProductFilter";
import ProductGrid from "./ProductGrid";
import { useEffect } from "react";
import axios from "axios";
const URL = import.meta.env.VITE_BASE_URL;

function ProductListing() {
    const [productData, setProductData] = useState([]);
    const [originalData, setOriginalData] = useState([]);

    useEffect(() => {
        const fetchData = async() => {
            const {data} = await axios.get(`${URL}/Product`);
            setProductData(data);
            setOriginalData(data);
        }
        fetchData();
    }, []);

    return (
        <>
            <div className=" relative top-23 mb-50 grid grid-cols-[1fr_4fr] gap-6">
                <ProductFilter productData = {productData} setProductData = {setProductData} originalData = {originalData} setOriginalData ={setOriginalData}  className=''></ProductFilter>
                <ProductGrid productData = {productData}  className=''></ProductGrid>
            </div>
        </>
    );
}

export default ProductListing;