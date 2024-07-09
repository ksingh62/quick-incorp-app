"use client";
import React, { useState } from "react";
import axios from "axios";
import Layout from "@/components/Layout";
import "./GstCalculator.css";

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
      setError(null);
    } catch (error) {
      console.error("Error calculating GST:", error);
      setGst(null);
      setError("Failed to calculate GST. Please try again.");
    }
  };

  return (
    <Layout>
      <div className="gst-calculator-container mx-auto text-center">
        <h2 className="gst-calculator-title text-4xl font-semibold mb-6">
          GST Calculator
        </h2>
        <p className="gst-calculator-text-black text-lg mb-12">
          Enter your income and select your province to calculate the GST.
        </p>
        <div className="flex flex-col items-center space-y-8">
          <div className="gst-calculator-formGroup">
            <label htmlFor="income" className="gst-calculator-label">
              Enter your income
            </label>
            <input
              type="number"
              id="income"
              value={income}
              onChange={(e) => setIncome(e.target.value)}
              className="gst-calculator-input"
            />
          </div>
          <div className="gst-calculator-formGroup">
            <label htmlFor="province" className="gst-calculator-label">
              Select Province
            </label>
            <select
              id="province"
              value={province}
              onChange={(e) => setProvince(e.target.value)}
              className="gst-calculator-select"
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
          </div>
          <button onClick={handleCalculate} className="gst-calculator-button">
            Calculate
          </button>
          {gst !== null && (
            <h2 className="gst-calculator-result">Total GST is: ${gst}</h2>
          )}
          {error && <h2 className="gst-calculator-error">{error}</h2>}
        </div>
      </div>
    </Layout>
  );
};

export default GstCalculator;

//https://chatgpt.com/share/b5e73201-ea2a-4a1c-95b8-0367ec2276a9
