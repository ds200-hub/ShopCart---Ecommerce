const ProductModel = require("../Schema/ProductSchema")

const productController = async(req, res) => {
    try{
        const productData = await ProductModel.find();
        return res.json(productData);
    }
    catch(err){
        res.status(500).json({ success: false, message: "Server error" });
    }
}

module.exports = productController;