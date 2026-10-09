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
    origin: ['http://localhost:5173', process.env.VITE_BASE_URL],
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

app.use("/", route);

app.listen(port, () => {
    console.log(`server is listining at port no ${port}`);
    main().catch(err => { console.log(err) });
});

async function main() {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("database connected");
}
