"use client";
import React, { useState } from "react";
import axios from "axios";
import styles from "./PayrollCalculator.css";

const PayrollCalculator = () => {
  const [income, setIncome] = useState("");
  const [province, setProvince] = useState("");
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);

  const handleCalculate = async () => {
    try {
      const response = await axios.get("/api/calculate-payroll", {
        params: { income, province },
      });
      setResults(response.data);
      setError(null); // Clear any previous errors
    } catch (error) {
      console.error("Error calculating payroll tax:", error);
      setResults(null);
      setError("Failed to calculate payroll tax. Please try again.");
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Canadian Payroll Tax Calculator</h1>
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
      {results && (
        <div className={styles.results}>
          <h2>Results</h2>
          <p>Federal Tax: ${results.federalTax}</p>
          <p>Provincial Tax: ${results.provincialTax}</p>
          <p>CPP: ${results.cpp}</p>
          <p>EI: ${results.ei}</p>
          <p>Net Income: ${results.netIncome}</p>
        </div>
      )}
      {error && <h2 className={styles.error}>{error}</h2>}
    </div>
  );
};

export default PayrollCalculator;
