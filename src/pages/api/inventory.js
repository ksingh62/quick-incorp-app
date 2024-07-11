const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/inventory", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

// Define a schema and model for categories
const categorySchema = new mongoose.Schema({
  name: { type: String, required: true },
});

const Category = mongoose.model("Category", categorySchema);

// Define a schema and model for goods
const goodsSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
});

const Good = mongoose.model("Good", goodsSchema);

// API to get all categories
app.get("/categories", async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (err) {
    res.status(500).send(err);
  }
});

// API to add a new category
app.post("/categories", async (req, res) => {
  const newCategory = new Category(req.body);
  try {
    const savedCategory = await newCategory.save();
    res.json(savedCategory);
  } catch (err) {
    res.status(500).send(err);
  }
});

// API to get all goods
app.get("/goods", async (req, res) => {
  try {
    const goods = await Good.find().populate("category");
    res.json(goods);
  } catch (err) {
    res.status(500).send(err);
  }
});

// API to add a new good
app.post("/goods", async (req, res) => {
  const newGood = new Good(req.body);
  try {
    const savedGood = await newGood.save();
    res.json(savedGood);
  } catch (err) {
    res.status(500).send(err);
  }
});

// API to update a good
app.put("/goods/:id", async (req, res) => {
  try {
    const updatedGood = await Good.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(updatedGood);
  } catch (err) {
    res.status(500).send(err);
  }
});

// API to delete a good
app.delete("/goods/:id", async (req, res) => {
  try {
    await Good.findByIdAndDelete(req.params.id);
    res.sendStatus(204);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
