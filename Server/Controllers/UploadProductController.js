const ProductModel = require("../Schema/ProductSchema");

const uploadProduct = async (req, res) => {
    const { title, category, originalPrice, discount, salePrice, stock, shopName, sellerId } = req.body;
    const { path } = req.file;

    try {
        const addProduct = new ProductModel({
            Name: title,
            Image: path,
            Category: category,
            Price: originalPrice,
            Discount: discount,
            PriceAfterDiscount: salePrice,
            Stock: stock,
            shopName: shopName,
            sellerId: sellerId
        });

        const product = await addProduct.save();
        return res.json({success: true, message: "Product successfully added"})
    }
    catch (err) {
        console.log(err);
    }

}

module.exports = uploadProduct;