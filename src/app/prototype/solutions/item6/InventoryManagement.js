"use client"; // This line ensures the component runs on the client side
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Goods.css";

const InventoryManagement = () => {
  const [categories, setCategories] = useState([]);
  const [goods, setGoods] = useState([]);
  const [newCategory, setNewCategory] = useState("");
  const [newGood, setNewGood] = useState({
    name: "",
    category: "",
    quantity: "",
    price: "",
  });

  useEffect(() => {
    fetchCategories();
    fetchGoods();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get("http://localhost:5000/categories");
      setCategories(response.data);
    } catch (err) {
      console.error("Error fetching categories:", err);
    }
  };

  const fetchGoods = async () => {
    try {
      const response = await axios.get("http://localhost:5000/goods");
      setGoods(response.data);
    } catch (err) {
      console.error("Error fetching goods:", err);
    }
  };

  const addCategory = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/categories", {
        name: newCategory,
      });
      setCategories([...categories, response.data]);
      setNewCategory("");
    } catch (err) {
      console.error("Error adding category:", err);
    }
  };

  const addGood = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/goods", newGood);
      setGoods([...goods, response.data]);
      setNewGood({ name: "", category: "", quantity: "", price: "" });
    } catch (err) {
      console.error("Error adding good:", err);
    }
  };

  const updateGood = async (id, updatedGood) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/goods/${id}`,
        updatedGood
      );
      setGoods(goods.map((good) => (good._id === id ? response.data : good)));
    } catch (err) {
      console.error("Error updating good:", err);
    }
  };

  const deleteGood = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/goods/${id}`);
      setGoods(goods.filter((good) => good._id !== id));
    } catch (err) {
      console.error("Error deleting good:", err);
    }
  };

  return (
    <div className="goods-container">
      <h1>Inventory Management System</h1>

      <form onSubmit={addCategory}>
        <input
          type="text"
          placeholder="New Category"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          required
        />
        <button type="submit">Add Category</button>
      </form>

      <form onSubmit={addGood}>
        <input
          type="text"
          placeholder="Name"
          value={newGood.name}
          onChange={(e) => setNewGood({ ...newGood, name: e.target.value })}
          required
        />
        <select
          value={newGood.category}
          onChange={(e) => setNewGood({ ...newGood, category: e.target.value })}
          required
        >
          <option value="">Select Category</option>
          {categories.map((category) => (
            <option key={category._id} value={category._id}>
              {category.name}
            </option>
          ))}
        </select>
        <input
          type="number"
          placeholder="Quantity"
          value={newGood.quantity}
          onChange={(e) => setNewGood({ ...newGood, quantity: e.target.value })}
          required
        />
        <input
          type="number"
          placeholder="Price"
          value={newGood.price}
          onChange={(e) => setNewGood({ ...newGood, price: e.target.value })}
          required
        />
        <button type="submit">Add Good</button>
      </form>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Category</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {goods.map((good) => (
            <tr key={good._id}>
              <td>{good.name}</td>
              <td>{good.category.name}</td>
              <td>{good.quantity}</td>
              <td>{good.price}</td>
              <td>
                <button
                  onClick={() =>
                    updateGood(good._id, {
                      ...good,
                      quantity: good.quantity + 1,
                    })
                  }
                >
                  +
                </button>
                <button
                  onClick={() =>
                    updateGood(good._id, {
                      ...good,
                      quantity: good.quantity - 1,
                    })
                  }
                >
                  -
                </button>
                <button onClick={() => deleteGood(good._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InventoryManagement;
