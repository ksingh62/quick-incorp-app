// app/prototype/solutions/item1/GstCalculator.js
"use client";
import React, { useState } from "react";
import axios from "axios";
import styles from "./GstCalculator.css";

const GstCalculator = () => {
  const [income, setIncome] = useState("");
  const [province, setProvince] = useState("");
  const [gst, setGst] = useState(null);
  const [error, setError] = useState(null);

  const handleCalculate = async () => {
    try {
      const response = await axios.get("/api/calculate-gst", {
        params: { income, province },
      });
      setGst(response.data.gst.toFixed(2));
      setError(null); // Clear any previous errors
    } catch (error) {
      console.error("Error calculating GST:", error);
      setGst(null);
      setError("Failed to calculate GST. Please try again.");
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Canadian GST Calculator</h1>
      <input
        type="number"
        placeholder="Enter your income"
        value={income}
        onChange={(e) => setIncome(e.target.value)}
        className={styles.input}
      />
      <select
        value={province}
        onChange={(e) => setProvince(e.target.value)}
        className={styles.select}
      >
        <option value="">Select Province</option>
        <option value="AB">Alberta</option>
        <option value="BC">British Columbia</option>
        <option value="MB">Manitoba</option>
        <option value="NB">New Brunswick</option>
        <option value="NL">Newfoundland and Labrador</option>
        <option value="NS">Nova Scotia</option>
        <option value="ON">Ontario</option>
        <option value="PE">Prince Edward Island</option>
        <option value="QC">Quebec</option>
        <option value="SK">Saskatchewan</option>
        <option value="NT">Northwest Territories</option>
        <option value="NU">Nunavut</option>
        <option value="YT">Yukon</option>
      </select>
      <button onClick={handleCalculate} className={styles.button}>
        Calculate
      </button>
      {gst !== null && <h2 className={styles.result}>Total GST is: ${gst}</h2>}
      {error && <h2 className={styles.error}>{error}</h2>}
    </div>
  );
};

export default GstCalculator;
