const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cookieParser = require("cookie-parser");
const cors = require('cors');
const ProductModel = require('./Schema/ProductSchema');
const route = require('./Routes/Route');

require('dotenv').config();

const port = 3000;

app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'DELETE', 'PUT', 'PATCH'],
    allowedHeaders: [
        "Content-Type",
        "Authorization",
        "Cache-Control",
        "Expires",
        "Pragma"
    ],
    credentials: true
}));

app.use(cookieParser());
app.use(express.json());

app.get("/", async (req, res) => {
    res.send("This is home page");
});

// app.get("/addProduct",async(req, res) => {
//     const addProduct = [
//   {
//     Name: "Classic Cotton Shirt",
//     Image: "https://loremflickr.com/600/600/mens,shirt?lock=1",
//     Category: "Men",
//     Rating: 4.5,
//     Price: 1299,
//     Discount: 20,
//     PriceAfterDiscount: 1039,
//     Stock: 45
//   },
//   {
//     Name: "Slim Fit Jeans",
//     Image: "https://loremflickr.com/600/600/mens,jeans?lock=2",
//     Category: "Men",
//     Rating: 4.3,
//     Price: 1999,
//     Discount: 15,
//     PriceAfterDiscount: 1699,
//     Stock: 32
//   },
//   {
//     Name: "Casual Hoodie",
//     Image: "https://loremflickr.com/600/600/mens,hoodie?lock=3",
//     Category: "Men",
//     Rating: 4.6,
//     Price: 1799,
//     Discount: 25,
//     PriceAfterDiscount: 1349,
//     Stock: 28
//   },
//   {
//     Name: "Running Sneakers",
//     Image: "https://loremflickr.com/600/600/mens,sneakers?lock=4",
//     Category: "Men",
//     Rating: 4.7,
//     Price: 2499,
//     Discount: 30,
//     PriceAfterDiscount: 1749,
//     Stock: 19
//   },
//   {
//     Name: "Denim Jacket",
//     Image: "https://loremflickr.com/600/600/mens,denim,jacket?lock=5",
//     Category: "Men",
//     Rating: 4.4,
//     Price: 2999,
//     Discount: 20,
//     PriceAfterDiscount: 2399,
//     Stock: 24
//   },
//   {
//     Name: "Formal Trousers",
//     Image: "https://loremflickr.com/600/600/mens,trousers?lock=6",
//     Category: "Men",
//     Rating: 4.2,
//     Price: 1599,
//     Discount: 10,
//     PriceAfterDiscount: 1439,
//     Stock: 40
//   },
//   {
//     Name: "Premium Polo T-Shirt",
//     Image: "https://loremflickr.com/600/600/mens,polo?lock=7",
//     Category: "Men",
//     Rating: 4.5,
//     Price: 999,
//     Discount: 15,
//     PriceAfterDiscount: 849,
//     Stock: 55
//   },
//   {
//     Name: "Leather Loafers",
//     Image: "https://loremflickr.com/600/600/mens,loafers?lock=8",
//     Category: "Men",
//     Rating: 4.6,
//     Price: 3499,
//     Discount: 25,
//     PriceAfterDiscount: 2624,
//     Stock: 15
//   },
//   {
//     Name: "Winter Puffer Jacket",
//     Image: "https://loremflickr.com/600/600/mens,winter,jacket?lock=9",
//     Category: "Men",
//     Rating: 4.8,
//     Price: 4999,
//     Discount: 35,
//     PriceAfterDiscount: 3249,
//     Stock: 12
//   },
//   {
//     Name: "Casual Cotton Shorts",
//     Image: "https://loremflickr.com/600/600/mens,shorts?lock=10",
//     Category: "Men",
//     Rating: 4.1,
//     Price: 899,
//     Discount: 20,
//     PriceAfterDiscount: 719,
//     Stock: 62
//   },
//   {
//     Name: "Oversized Graphic T-Shirt",
//     Image: "https://loremflickr.com/600/600/mens,tshirt?lock=11",
//     Category: "Men",
//     Rating: 4.4,
//     Price: 799,
//     Discount: 10,
//     PriceAfterDiscount: 719,
//     Stock: 70
//   },
//   {
//     Name: "Leather Formal Shoes",
//     Image: "https://loremflickr.com/600/600/mens,formal,shoes?lock=12",
//     Category: "Men",
//     Rating: 4.7,
//     Price: 3999,
//     Discount: 30,
//     PriceAfterDiscount: 2799,
//     Stock: 18
//   },
//   {
//     Name: "Sports Track Pants",
//     Image: "https://loremflickr.com/600/600/mens,trackpants?lock=13",
//     Category: "Men",
//     Rating: 4.3,
//     Price: 1299,
//     Discount: 20,
//     PriceAfterDiscount: 1039,
//     Stock: 38
//   },
//   {
//     Name: "Checked Casual Shirt",
//     Image: "https://loremflickr.com/600/600/mens,checked,shirt?lock=14",
//     Category: "Men",
//     Rating: 4.5,
//     Price: 1399,
//     Discount: 25,
//     PriceAfterDiscount: 1049,
//     Stock: 33
//   },
//   {
//     Name: "Premium Bomber Jacket",
//     Image: "https://loremflickr.com/600/600/mens,bomber,jacket?lock=15",
//     Category: "Men",
//     Rating: 4.6,
//     Price: 3299,
//     Discount: 20,
//     PriceAfterDiscount: 2639,
//     Stock: 20
//   },
//   {
//     Name: "Athletic Running T-Shirt",
//     Image: "https://loremflickr.com/600/600/mens,running,shirt?lock=16",
//     Category: "Men",
//     Rating: 4.2,
//     Price: 1099,
//     Discount: 15,
//     PriceAfterDiscount: 934,
//     Stock: 47
//   },

//   // ==================== WOMEN ====================
//   {
//     Name: "Floral Summer Dress",
//     Image: "https://loremflickr.com/600/600/womens,dress?lock=17",
//     Category: "Women",
//     Rating: 4.7,
//     Price: 2199,
//     Discount: 25,
//     PriceAfterDiscount: 1649,
//     Stock: 35
//   },
//   {
//     Name: "Casual Women Top",
//     Image: "https://loremflickr.com/600/600/womens,top?lock=18",
//     Category: "Women",
//     Rating: 4.4,
//     Price: 999,
//     Discount: 20,
//     PriceAfterDiscount: 799,
//     Stock: 48
//   },
//   {
//     Name: "High Waist Jeans",
//     Image: "https://loremflickr.com/600/600/womens,jeans?lock=19",
//     Category: "Women",
//     Rating: 4.5,
//     Price: 1999,
//     Discount: 15,
//     PriceAfterDiscount: 1699,
//     Stock: 27
//   },
//   {
//     Name: "Women Running Shoes",
//     Image: "https://loremflickr.com/600/600/womens,running,shoes?lock=20",
//     Category: "Women",
//     Rating: 4.6,
//     Price: 2799,
//     Discount: 30,
//     PriceAfterDiscount: 1959,
//     Stock: 22
//   },
//   {
//     Name: "Premium Handbag",
//     Image: "https://loremflickr.com/600/600/womens,handbag?lock=21",
//     Category: "Women",
//     Rating: 4.8,
//     Price: 3499,
//     Discount: 25,
//     PriceAfterDiscount: 2624,
//     Stock: 16
//   },
//   {
//     Name: "Denim Jacket Women",
//     Image: "https://loremflickr.com/600/600/womens,denim,jacket?lock=22",
//     Category: "Women",
//     Rating: 4.3,
//     Price: 2499,
//     Discount: 20,
//     PriceAfterDiscount: 1999,
//     Stock: 31
//   },
//   {
//     Name: "Cotton Kurti",
//     Image: "https://loremflickr.com/600/600/womens,kurti?lock=23",
//     Category: "Women",
//     Rating: 4.6,
//     Price: 1299,
//     Discount: 15,
//     PriceAfterDiscount: 1104,
//     Stock: 52
//   },
//   {
//     Name: "Party Wear Dress",
//     Image: "https://loremflickr.com/600/600/womens,party,dress?lock=24",
//     Category: "Women",
//     Rating: 4.7,
//     Price: 2999,
//     Discount: 35,
//     PriceAfterDiscount: 1949,
//     Stock: 14
//   },
//   {
//     Name: "Elegant Heels",
//     Image: "https://loremflickr.com/600/600/womens,heels?lock=25",
//     Category: "Women",
//     Rating: 4.5,
//     Price: 2299,
//     Discount: 20,
//     PriceAfterDiscount: 1839,
//     Stock: 25
//   },
//   {
//     Name: "Winter Cardigan",
//     Image: "https://loremflickr.com/600/600/womens,cardigan?lock=26",
//     Category: "Women",
//     Rating: 4.4,
//     Price: 1899,
//     Discount: 25,
//     PriceAfterDiscount: 1424,
//     Stock: 30
//   },
//   {
//     Name: "Printed Saree",
//     Image: "https://loremflickr.com/600/600/womens,saree?lock=27",
//     Category: "Women",
//     Rating: 4.8,
//     Price: 2599,
//     Discount: 30,
//     PriceAfterDiscount: 1819,
//     Stock: 20
//   },
//   {
//     Name: "Women Sports Leggings",
//     Image: "https://loremflickr.com/600/600/womens,leggings?lock=28",
//     Category: "Women",
//     Rating: 4.3,
//     Price: 899,
//     Discount: 10,
//     PriceAfterDiscount: 809,
//     Stock: 65
//   },
//   {
//     Name: "Oversized Sweatshirt",
//     Image: "https://loremflickr.com/600/600/womens,sweatshirt?lock=29",
//     Category: "Women",
//     Rating: 4.5,
//     Price: 1599,
//     Discount: 20,
//     PriceAfterDiscount: 1279,
//     Stock: 42
//   },
//   {
//     Name: "Designer Sunglasses",
//     Image: "https://loremflickr.com/600/600/womens,sunglasses?lock=30",
//     Category: "Women",
//     Rating: 4.4,
//     Price: 1499,
//     Discount: 30,
//     PriceAfterDiscount: 1049,
//     Stock: 37
//   },
//   {
//     Name: "Casual Canvas Shoes",
//     Image: "https://loremflickr.com/600/600/womens,canvas,shoes?lock=31",
//     Category: "Women",
//     Rating: 4.2,
//     Price: 1399,
//     Discount: 15,
//     PriceAfterDiscount: 1189,
//     Stock: 44
//   },
//   {
//     Name: "Elegant Crossbody Bag",
//     Image: "https://loremflickr.com/600/600/womens,crossbody,bag?lock=32",
//     Category: "Women",
//     Rating: 4.6,
//     Price: 1799,
//     Discount: 25,
//     PriceAfterDiscount: 1349,
//     Stock: 29
//   },

//   // ==================== ELECTRONICS ====================
//   {
//     Name: "Smartphone Pro 5G",
//     Image: "https://loremflickr.com/600/600/smartphone?lock=33",
//     Category: "Electronics",
//     Rating: 4.8,
//     Price: 49999,
//     Discount: 15,
//     PriceAfterDiscount: 42499,
//     Stock: 18
//   },
//   {
//     Name: "UltraBook Laptop",
//     Image: "https://loremflickr.com/600/600/laptop?lock=34",
//     Category: "Electronics",
//     Rating: 4.7,
//     Price: 74999,
//     Discount: 20,
//     PriceAfterDiscount: 59999,
//     Stock: 10
//   },
//   {
//     Name: "Wireless Noise Cancelling Headphones",
//     Image: "https://loremflickr.com/600/600/headphones?lock=35",
//     Category: "Electronics",
//     Rating: 4.6,
//     Price: 6999,
//     Discount: 25,
//     PriceAfterDiscount: 5249,
//     Stock: 32
//   },
//   {
//     Name: "Smartwatch Series 5",
//     Image: "https://loremflickr.com/600/600/smartwatch?lock=36",
//     Category: "Electronics",
//     Rating: 4.5,
//     Price: 8999,
//     Discount: 30,
//     PriceAfterDiscount: 6299,
//     Stock: 24
//   },
//   {
//     Name: "Mirrorless Camera",
//     Image: "https://loremflickr.com/600/600/mirrorless,camera?lock=37",
//     Category: "Electronics",
//     Rating: 4.8,
//     Price: 64999,
//     Discount: 10,
//     PriceAfterDiscount: 58499,
//     Stock: 8
//   },
//   {
//     Name: "Bluetooth Speaker",
//     Image: "https://loremflickr.com/600/600/bluetooth,speaker?lock=38",
//     Category: "Electronics",
//     Rating: 4.4,
//     Price: 3999,
//     Discount: 20,
//     PriceAfterDiscount: 3199,
//     Stock: 41
//   },
//   {
//     Name: "Gaming Mouse",
//     Image: "https://loremflickr.com/600/600/gaming,mouse?lock=39",
//     Category: "Electronics",
//     Rating: 4.5,
//     Price: 2499,
//     Discount: 15,
//     PriceAfterDiscount: 2124,
//     Stock: 56
//   },
//   {
//     Name: "Mechanical Gaming Keyboard",
//     Image: "https://loremflickr.com/600/600/mechanical,keyboard?lock=40",
//     Category: "Electronics",
//     Rating: 4.7,
//     Price: 4999,
//     Discount: 25,
//     PriceAfterDiscount: 3749,
//     Stock: 26
//   },
//   {
//     Name: "Android Tablet",
//     Image: "https://loremflickr.com/600/600/tablet?lock=41",
//     Category: "Electronics",
//     Rating: 4.6,
//     Price: 24999,
//     Discount: 20,
//     PriceAfterDiscount: 19999,
//     Stock: 15
//   },
//   {
//     Name: "Fast Charging Power Bank",
//     Image: "https://loremflickr.com/600/600/powerbank?lock=42",
//     Category: "Electronics",
//     Rating: 4.3,
//     Price: 1999,
//     Discount: 30,
//     PriceAfterDiscount: 1399,
//     Stock: 63
//   },
//   {
//     Name: "4K Smart TV",
//     Image: "https://loremflickr.com/600/600/smart,tv?lock=43",
//     Category: "Electronics",
//     Rating: 4.7,
//     Price: 54999,
//     Discount: 25,
//     PriceAfterDiscount: 41249,
//     Stock: 9
//   },
//   {
//     Name: "Wireless Earbuds",
//     Image: "https://loremflickr.com/600/600/wireless,earbuds?lock=44",
//     Category: "Electronics",
//     Rating: 4.5,
//     Price: 2999,
//     Discount: 20,
//     PriceAfterDiscount: 2399,
//     Stock: 48
//   },
//   {
//     Name: "Portable SSD 1TB",
//     Image: "https://loremflickr.com/600/600/ssd,drive?lock=45",
//     Category: "Electronics",
//     Rating: 4.8,
//     Price: 8999,
//     Discount: 15,
//     PriceAfterDiscount: 7649,
//     Stock: 21
//   },
//   {
//     Name: "WiFi 6 Router",
//     Image: "https://loremflickr.com/600/600/wifi,router?lock=46",
//     Category: "Electronics",
//     Rating: 4.4,
//     Price: 4499,
//     Discount: 20,
//     PriceAfterDiscount: 3599,
//     Stock: 35
//   },
//   {
//     Name: "Smart Home Camera",
//     Image: "https://loremflickr.com/600/600/security,camera?lock=47",
//     Category: "Electronics",
//     Rating: 4.3,
//     Price: 3499,
//     Discount: 25,
//     PriceAfterDiscount: 2624,
//     Stock: 30
//   },
//   {
//     Name: "USB C Fast Charger",
//     Image: "https://loremflickr.com/600/600/usb,charger?lock=48",
//     Category: "Electronics",
//     Rating: 4.6,
//     Price: 1499,
//     Discount: 10,
//     PriceAfterDiscount: 1349,
//     Stock: 75
//   },
//   {
//     Name: "Gaming Monitor",
//     Image: "https://loremflickr.com/600/600/gaming,monitor?lock=49",
//     Category: "Electronics",
//     Rating: 4.7,
//     Price: 29999,
//     Discount: 20,
//     PriceAfterDiscount: 23999,
//     Stock: 13
//   },

//   // ==================== HOME AND LIVING ====================
//   {
//     Name: "Modern 3 Seater Sofa",
//     Image: "https://loremflickr.com/600/600/sofa?lock=50",
//     Category: "Home and Living",
//     Rating: 4.6,
//     Price: 24999,
//     Discount: 20,
//     PriceAfterDiscount: 19999,
//     Stock: 8
//   },
//   {
//     Name: "Modern Table Lamp",
//     Image: "https://loremflickr.com/600/600/table,lamp?lock=51",
//     Category: "Home and Living",
//     Rating: 4.4,
//     Price: 1999,
//     Discount: 25,
//     PriceAfterDiscount: 1499,
//     Stock: 35
//   },
//   {
//     Name: "Ceramic Flower Vase",
//     Image: "https://loremflickr.com/600/600/ceramic,vase?lock=52",
//     Category: "Home and Living",
//     Rating: 4.5,
//     Price: 999,
//     Discount: 15,
//     PriceAfterDiscount: 849,
//     Stock: 48
//   },
//   {
//     Name: "Non Stick Kitchen Set",
//     Image: "https://loremflickr.com/600/600/kitchen,cookware?lock=53",
//     Category: "Home and Living",
//     Rating: 4.7,
//     Price: 4999,
//     Discount: 30,
//     PriceAfterDiscount: 3499,
//     Stock: 22
//   },
//   {
//     Name: "Wooden Dining Chair",
//     Image: "https://loremflickr.com/600/600/dining,chair?lock=54",
//     Category: "Home and Living",
//     Rating: 4.3,
//     Price: 3999,
//     Discount: 20,
//     PriceAfterDiscount: 3199,
//     Stock: 16
//   },
//   {
//     Name: "Minimal Wall Clock",
//     Image: "https://loremflickr.com/600/600/wall,clock?lock=55",
//     Category: "Home and Living",
//     Rating: 4.4,
//     Price: 1499,
//     Discount: 25,
//     PriceAfterDiscount: 1124,
//     Stock: 42
//   },
//   {
//     Name: "Bedside Table",
//     Image: "https://loremflickr.com/600/600/bedside,table?lock=56",
//     Category: "Home and Living",
//     Rating: 4.5,
//     Price: 2999,
//     Discount: 15,
//     PriceAfterDiscount: 2549,
//     Stock: 20
//   },
//   {
//     Name: "Elegant Floor Lamp",
//     Image: "https://loremflickr.com/600/600/floor,lamp?lock=57",
//     Category: "Home and Living",
//     Rating: 4.6,
//     Price: 3499,
//     Discount: 30,
//     PriceAfterDiscount: 2449,
//     Stock: 17
//   },
//   {
//     Name: "Decorative Cushion Set",
//     Image: "https://loremflickr.com/600/600/cushions?lock=58",
//     Category: "Home and Living",
//     Rating: 4.3,
//     Price: 1299,
//     Discount: 20,
//     PriceAfterDiscount: 1039,
//     Stock: 50
//   },
//   {
//     Name: "Metal Storage Rack",
//     Image: "https://loremflickr.com/600/600/storage,rack?lock=59",
//     Category: "Home and Living",
//     Rating: 4.2,
//     Price: 2799,
//     Discount: 15,
//     PriceAfterDiscount: 2379,
//     Stock: 26
//   },
//   {
//     Name: "Luxury Bedsheet Set",
//     Image: "https://loremflickr.com/600/600/bedsheet?lock=60",
//     Category: "Home and Living",
//     Rating: 4.7,
//     Price: 1999,
//     Discount: 25,
//     PriceAfterDiscount: 1499,
//     Stock: 38
//   },
//   {
//     Name: "Artificial Indoor Plant",
//     Image: "https://loremflickr.com/600/600/indoor,plant?lock=61",
//     Category: "Home and Living",
//     Rating: 4.5,
//     Price: 899,
//     Discount: 20,
//     PriceAfterDiscount: 719,
//     Stock: 60
//   },
//   {
//     Name: "Premium Dining Table",
//     Image: "https://loremflickr.com/600/600/dining,table?lock=62",
//     Category: "Home and Living",
//     Rating: 4.8,
//     Price: 18999,
//     Discount: 20,
//     PriceAfterDiscount: 15199,
//     Stock: 7
//   },
//   {
//     Name: "Kitchen Storage Containers",
//     Image: "https://loremflickr.com/600/600/kitchen,containers?lock=63",
//     Category: "Home and Living",
//     Rating: 4.4,
//     Price: 1299,
//     Discount: 15,
//     PriceAfterDiscount: 1104,
//     Stock: 54
//   },
//   {
//     Name: "Soft Area Rug",
//     Image: "https://loremflickr.com/600/600/area,rug?lock=64",
//     Category: "Home and Living",
//     Rating: 4.6,
//     Price: 2999,
//     Discount: 30,
//     PriceAfterDiscount: 2099,
//     Stock: 18
//   },
//   {
//     Name: "Decorative Mirror",
//     Image: "https://loremflickr.com/600/600/decorative,mirror?lock=65",
//     Category: "Home and Living",
//     Rating: 4.5,
//     Price: 2499,
//     Discount: 20,
//     PriceAfterDiscount: 1999,
//     Stock: 21
//   },
//   {
//     Name: "Comfort Memory Foam Pillow",
//     Image: "https://loremflickr.com/600/600/pillow?lock=66",
//     Category: "Home and Living",
//     Rating: 4.7,
//     Price: 1499,
//     Discount: 25,
//     PriceAfterDiscount: 1124,
//     Stock: 44
//   },

//   // ==================== ACCESSORIES ====================
//   {
//     Name: "Classic Analog Watch",
//     Image: "https://loremflickr.com/600/600/wristwatch?lock=67",
//     Category: "Accessories",
//     Rating: 4.6,
//     Price: 3999,
//     Discount: 25,
//     PriceAfterDiscount: 2999,
//     Stock: 25
//   },
//   {
//     Name: "Aviator Sunglasses",
//     Image: "https://loremflickr.com/600/600/aviator,sunglasses?lock=68",
//     Category: "Accessories",
//     Rating: 4.5,
//     Price: 1499,
//     Discount: 20,
//     PriceAfterDiscount: 1199,
//     Stock: 45
//   },
//   {
//     Name: "Travel Backpack",
//     Image: "https://loremflickr.com/600/600/travel,backpack?lock=69",
//     Category: "Accessories",
//     Rating: 4.7,
//     Price: 2499,
//     Discount: 30,
//     PriceAfterDiscount: 1749,
//     Stock: 33
//   },
//   {
//     Name: "Leather Wallet",
//     Image: "https://loremflickr.com/600/600/leather,wallet?lock=70",
//     Category: "Accessories",
//     Rating: 4.4,
//     Price: 999,
//     Discount: 15,
//     PriceAfterDiscount: 849,
//     Stock: 67
//   },
//   {
//     Name: "Genuine Leather Belt",
//     Image: "https://loremflickr.com/600/600/leather,belt?lock=71",
//     Category: "Accessories",
//     Rating: 4.5,
//     Price: 1299,
//     Discount: 20,
//     PriceAfterDiscount: 1039,
//     Stock: 52
//   },
//   {
//     Name: "Crossbody Sling Bag",
//     Image: "https://loremflickr.com/600/600/sling,bag?lock=72",
//     Category: "Accessories",
//     Rating: 4.3,
//     Price: 1599,
//     Discount: 25,
//     PriceAfterDiscount: 1199,
//     Stock: 40
//   },
//   {
//     Name: "Classic Baseball Cap",
//     Image: "https://loremflickr.com/600/600/baseball,cap?lock=73",
//     Category: "Accessories",
//     Rating: 4.2,
//     Price: 699,
//     Discount: 10,
//     PriceAfterDiscount: 629,
//     Stock: 80
//   },
//   {
//     Name: "Premium Winter Scarf",
//     Image: "https://loremflickr.com/600/600/winter,scarf?lock=74",
//     Category: "Accessories",
//     Rating: 4.6,
//     Price: 899,
//     Discount: 20,
//     PriceAfterDiscount: 719,
//     Stock: 46
//   },
//   {
//     Name: "Stylish Bracelet",
//     Image: "https://loremflickr.com/600/600/bracelet?lock=75",
//     Category: "Accessories",
//     Rating: 4.4,
//     Price: 799,
//     Discount: 15,
//     PriceAfterDiscount: 679,
//     Stock: 58
//   },
//   {
//     Name: "Metal Key Holder",
//     Image: "https://loremflickr.com/600/600/keychain?lock=76",
//     Category: "Accessories",
//     Rating: 4.1,
//     Price: 499,
//     Discount: 10,
//     PriceAfterDiscount: 449,
//     Stock: 100
//   },
//   {
//     Name: "Premium Leather Watch",
//     Image: "https://loremflickr.com/600/600/leather,watch?lock=77",
//     Category: "Accessories",
//     Rating: 4.8,
//     Price: 5999,
//     Discount: 30,
//     PriceAfterDiscount: 4199,
//     Stock: 14
//   },
//   {
//     Name: "Polarized Sunglasses",
//     Image: "https://loremflickr.com/600/600/polarized,sunglasses?lock=78",
//     Category: "Accessories",
//     Rating: 4.7,
//     Price: 1999,
//     Discount: 25,
//     PriceAfterDiscount: 1499,
//     Stock: 29
//   },
//   {
//     Name: "Laptop Backpack",
//     Image: "https://loremflickr.com/600/600/laptop,backpack?lock=79",
//     Category: "Accessories",
//     Rating: 4.6,
//     Price: 2999,
//     Discount: 20,
//     PriceAfterDiscount: 2399,
//     Stock: 34
//   },
//   {
//     Name: "Minimal Card Holder",
//     Image: "https://loremflickr.com/600/600/cardholder?lock=80",
//     Category: "Accessories",
//     Rating: 4.3,
//     Price: 699,
//     Discount: 15,
//     PriceAfterDiscount: 594,
//     Stock: 72
//   },
//   {
//     Name: "Fashion Hair Accessories Set",
//     Image: "https://loremflickr.com/600/600/hair,accessories?lock=81",
//     Category: "Accessories",
//     Rating: 4.5,
//     Price: 599,
//     Discount: 20,
//     PriceAfterDiscount: 479,
//     Stock: 65
//   },
//   {
//     Name: "Premium Travel Pouch",
//     Image: "https://loremflickr.com/600/600/travel,pouch?lock=82",
//     Category: "Accessories",
//     Rating: 4.4,
//     Price: 999,
//     Discount: 25,
//     PriceAfterDiscount: 749,
//     Stock: 43
//   },
//   {
//     Name: "Classic Tie Set",
//     Image: "https://loremflickr.com/600/600/tie?lock=83",
//     Category: "Accessories",
//     Rating: 4.2,
//     Price: 799,
//     Discount: 15,
//     PriceAfterDiscount: 679,
//     Stock: 39
//   },

//   // ==================== TOP DEALS ====================
//   {
//     Name: "Deal Smartphone 5G",
//     Image: "https://loremflickr.com/600/600/smartphone?lock=84",
//     Category: "Top Deals",
//     Rating: 4.8,
//     Price: 29999,
//     Discount: 40,
//     PriceAfterDiscount: 17999,
//     Stock: 20
//   },
//   {
//     Name: "Deal Running Sneakers",
//     Image: "https://loremflickr.com/600/600/running,sneakers?lock=85",
//     Category: "Top Deals",
//     Rating: 4.7,
//     Price: 3999,
//     Discount: 50,
//     PriceAfterDiscount: 1999,
//     Stock: 35
//   },
//   {
//     Name: "Deal Wireless Headphones",
//     Image: "https://loremflickr.com/600/600/headphones?lock=86",
//     Category: "Top Deals",
//     Rating: 4.6,
//     Price: 5999,
//     Discount: 45,
//     PriceAfterDiscount: 3299,
//     Stock: 28
//   },
//   {
//     Name: "Deal Smartwatch",
//     Image: "https://loremflickr.com/600/600/smartwatch?lock=87",
//     Category: "Top Deals",
//     Rating: 4.5,
//     Price: 4999,
//     Discount: 40,
//     PriceAfterDiscount: 2999,
//     Stock: 31
//   },
//   {
//     Name: "Deal Travel Backpack",
//     Image: "https://loremflickr.com/600/600/backpack?lock=88",
//     Category: "Top Deals",
//     Rating: 4.7,
//     Price: 2999,
//     Discount: 50,
//     PriceAfterDiscount: 1499,
//     Stock: 44
//   },
//   {
//     Name: "Deal Bluetooth Speaker",
//     Image: "https://loremflickr.com/600/600/bluetooth,speaker?lock=89",
//     Category: "Top Deals",
//     Rating: 4.4,
//     Price: 2999,
//     Discount: 35,
//     PriceAfterDiscount: 1949,
//     Stock: 37
//   },
//   {
//     Name: "Deal Men's Jacket",
//     Image: "https://loremflickr.com/600/600/mens,jacket?lock=90",
//     Category: "Top Deals",
//     Rating: 4.6,
//     Price: 4999,
//     Discount: 45,
//     PriceAfterDiscount: 2749,
//     Stock: 18
//   },
//   {
//     Name: "Deal Premium Watch",
//     Image: "https://loremflickr.com/600/600/watch?lock=91",
//     Category: "Top Deals",
//     Rating: 4.8,
//     Price: 6999,
//     Discount: 40,
//     PriceAfterDiscount: 4199,
//     Stock: 22
//   },
//   {
//     Name: "Deal Ultrabook Laptop",
//     Image: "https://loremflickr.com/600/600/laptop?lock=92",
//     Category: "Top Deals",
//     Rating: 4.7,
//     Price: 79999,
//     Discount: 30,
//     PriceAfterDiscount: 55999,
//     Stock: 7
//   },
//   {
//     Name: "Deal Mirrorless Camera",
//     Image: "https://loremflickr.com/600/600/camera?lock=93",
//     Category: "Top Deals",
//     Rating: 4.8,
//     Price: 69999,
//     Discount: 25,
//     PriceAfterDiscount: 52499,
//     Stock: 5
//   },
//   {
//     Name: "Deal Women's Handbag",
//     Image: "https://loremflickr.com/600/600/womens,handbag?lock=94",
//     Category: "Top Deals",
//     Rating: 4.6,
//     Price: 3999,
//     Discount: 50,
//     PriceAfterDiscount: 1999,
//     Stock: 27
//   },
//   {
//     Name: "Deal Party Dress",
//     Image: "https://loremflickr.com/600/600/womens,dress?lock=95",
//     Category: "Top Deals",
//     Rating: 4.7,
//     Price: 2999,
//     Discount: 40,
//     PriceAfterDiscount: 1799,
//     Stock: 19
//   },
//   {
//     Name: "Deal Gaming Keyboard",
//     Image: "https://loremflickr.com/600/600/gaming,keyboard?lock=96",
//     Category: "Top Deals",
//     Rating: 4.5,
//     Price: 3999,
//     Discount: 45,
//     PriceAfterDiscount: 2199,
//     Stock: 33
//   },
//   {
//     Name: "Deal 4K Smart TV",
//     Image: "https://loremflickr.com/600/600/smart,tv?lock=97",
//     Category: "Top Deals",
//     Rating: 4.8,
//     Price: 59999,
//     Discount: 35,
//     PriceAfterDiscount: 38999,
//     Stock: 6
//   },
//   {
//     Name: "Deal Leather Loafers",
//     Image: "https://loremflickr.com/600/600/leather,shoes?lock=98",
//     Category: "Top Deals",
//     Rating: 4.5,
//     Price: 3999,
//     Discount: 50,
//     PriceAfterDiscount: 1999,
//     Stock: 24
//   },
//   {
//     Name: "Deal Floor Lamp",
//     Image: "https://loremflickr.com/600/600/floor,lamp?lock=99",
//     Category: "Top Deals",
//     Rating: 4.4,
//     Price: 2999,
//     Discount: 40,
//     PriceAfterDiscount: 1799,
//     Stock: 29
//   },
//   {
//     Name: "Deal Wireless Earbuds",
//     Image: "https://loremflickr.com/600/600/wireless,earbuds?lock=100",
//     Category: "Top Deals",
//     Rating: 4.6,
//     Price: 2999,
//     Discount: 45,
//     PriceAfterDiscount: 1649,
//     Stock: 51
//   }
// ];
//    await ProductModel.insertMany(addProduct);
//    res.send("done");
// })

app.get("/delete",async(req, res)=>{
    await ProductModel.deleteMany();
    res.send("done");
})

app.use("/", route);

app.listen(port, () => {
    console.log(`server is listining at port no ${port}`);
    main().catch(err => { console.log(err) });
});

async function main() {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("database connected");
}
