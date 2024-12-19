const port = 4000;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const cors = require("cors");

app.use(express.json());
app.use(cors());

// Database connection with MongoDB
mongoose.connect("mongodb+srv://raeflafi:Versace235@cluster0.8hf59.mongodb.net/ecommerce")
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.error("Error connecting to MongoDB:", err));

// API creation
app.get("/", (req, res) => {
    res.send("Express App is running");
});

// Image storage engine
const storage = multer.diskStorage({
    destination: './upload/images',
    filename: (req, file, cb) => {
        cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
    }
});

const upload = multer({ storage: storage });

// Creating upload endpoint for images
app.use('/images', express.static('upload/images'));

app.post("/upload", upload.single('product'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ success: 0, message: "No file uploaded" });
    }
    console.log("File:", req.file);
    res.json({
        success: 1,
        image_url: `http://localhost:${port}/images/${req.file.filename}`,
    });
});

// Schema for creating products
const Product = mongoose.model("Product", {
    id: {
        type: Number,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    new_price: {
        type: Number,
        required: true,
    },
    old_price: {
        type: Number,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    available: {
        type: Boolean,
        default: true,
    },
});
// add product api
app.post('/addproduct', async (req, res) => {
    try {
        let products = await Product.find({});
        let id;

        if (products.length > 0) {
            let last_product = products[products.length - 1];
            id = last_product.id + 1;  // Ensure we're getting the correct id based on the last product
        } else {
            id = 1;  // Start with ID 1 if no products exist
        }

        const product = new Product({
            id: id,  // Use the dynamically generated ID
            name: req.body.name,
            image: req.body.image,
            category: req.body.category,
            new_price: req.body.new_price,
            old_price: req.body.old_price,
        });

        console.log(product);
        await product.save();  // Save the product to the database
        console.log("Saved");

        res.json({
            success: true,
            name: req.body.name,
        });
    } catch (error) {
        console.error("Error saving product:", error);
        res.status(500).json({ success: false, message: "Error saving product" });
    }
});


// API for deleting a product by ID using POST
app.post('/removeproduct', async (req, res) => {
    try {
        const { id } = req.body;  // Get the product ID from the request body
        
        // Find and delete the product by its ID
        const product = await Product.findOneAndDelete({ id: id });

        if (!product) {
            // If no product is found, return an error message
            return res.status(404).json({
                success: false,
                message: "Product not found",
            });
        }

        // Successfully deleted the product
        res.json({
            success: true,
            message: `Product with ID ${id} deleted successfully`,
        });
    } catch (error) {
        console.error("Error deleting product:", error);
        res.status(500).json({
            success: false,
            message: "Error deleting product",
        });
    }
});

// API for getting all products
app.get('/allproducts', async (req, res) => {
    try {
        // Find all products in the database
        let products = await Product.find();
        console.log("All products fetshed.");

        if (products.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No products found",
            });
        }

        // Successfully found products
        res.json({
            success: true,
            products: products,
        });
    } catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).json({
            success: false,
            message: "Error fetching products",
        });
    }
});

// Schema for User Model

const Users = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        default: "user",
    },
    created_at: {
        type: Date,
        default: Date.now,
    },
    updated_at: {
        type: Date,
        default: Date.now,
    },
    cartData: {
        type: Object,
    },
});

// Middleware to update `updated_at` field before saving
Users.pre('save', function (next) {
    this.updated_at = Date.now();
    next();
});

const User = mongoose.model("User", Users);

module.exports = User;
app.post('/signup', async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ success: false, message: "Name, email, and password are required" });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ success: false, message: "Email is already registered" });
        }

        // Initialize the user with an empty cart
        const newUser = new User({
            name,
            email,
            password,
            role,
            cart: [], // Initialize cart as an empty array
        });
        await newUser.save();

        // Generate token
        const token = jwt.sign(
            { id: newUser._id, email: newUser.email, role: newUser.role },
            'secret_ecom'
        );

        res.status(201).json({
            success: true,
            message: "User registered successfully",
            token: token,
        });
    } catch (error) {
        console.error("Error during signup:", error);
        res.status(500).json({ success: false, message: "Error registering user" });
    }
});

app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate request data
        if (!email || !password) {
            return res.status(400).json({ success: false, message: "Email and password are required" });
        }

        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ success: false, message: "Invalid email or password" });
        }

        // Validate password
        if (user.password !== password) {
            return res.status(401).json({ success: false, message: "Invalid email or password" });
        }

        // Generate token
        const token = jwt.sign(
            { id: user._id, email: user.email, role: user.role },
            'secret_ecom'
        );

        res.json({
            success: true,
            message: "Login successful",
            token: token,
        });
    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).json({ success: false, message: "Error logging in" });
    }
});
// creating endpoint for new collection data
app.get('/newcollections', async(req,res)=>{
    let products =await Product.find({});
    let newcollection = products.slice(1).slice(-8);
    console.log("New collection fetshed");
    res.send(newcollection);

} )

//creating endpoint for poppular in women section
app.get('/popularinwomen', async(req,res)=>{
    let products = await Product.find({category:"women"})
    let popular_in_women =products.slice(0,4);
    res.send(popular_in_women);
})
//creating middleware to fetch user
const fetchUser = async (req, res, next) => {
    const token = req.header('auth-token');
    if (!token) {
        return res.status(401).send({ errors: "Please authenticate using a valid token" });
    } else {
        try {
            const data = jwt.verify(token, 'secret_ecom');
            req.user = data.user; // Attach the user information to the request object
            next(); // Pass control to the next middleware or route handler
        } catch (error) {
            return res.status(401).send({ errors: "Please authenticate using valid token" });
        }
    }
};

// Endpoint for adding products to cart
app.post('/addtocart', fetchUser, async (req, res) => {
    console.log("added",req.body.itemId);
    let userData =await UserSchema.findOne({_id:req.user._id});
    userData.cartData[req.body.itemId] +=1;
    await Users.findOneAndUpdate({_id:req.user.id},{cartData:userData.cartData});
    res.send("Added")
})

//creating endpoint to remove product from cartdata
app.post('/removefromcart',fetchUser,async(req,res)=>{
    console.log("removed",req.body.itemId);
    let userData =await UserSchema.findOne({_id:req.user._id});
    if(userData.cartData[req.body.itemId]>0)
    userData.cartData[req.body.itemId] -=1;
    await Users.findOneAndUpdate({_id:req.user.id},{cartData:userData.cartData});
    res.send("Removed")

})
//creating endpoit to get cart
app.post('/getcart',fetchUser,async(req,res)=>{
    console.log("Get cart");
    let userData =await Users.findOne({_id:req.user.id})
    res.json(userData.cartData);
})
// Start the server
app.listen(port, (error) => {
    if (!error) {
        console.log("Server Running on Port " + port);
    } else {
        console.log("Error : " + error);
    }
});
