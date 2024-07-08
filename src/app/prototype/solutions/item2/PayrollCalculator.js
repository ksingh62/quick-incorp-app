"use client";
import React, { useState } from "react";
import axios from "axios";
import Layout from "@/components/Layout";
import "./PayrollCalculator.css";

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
    <Layout>
      <div className="payroll-calculator-container mx-auto text-center">
        <h1 className="payroll-calculator-title text-4xl font-semibold mb-6">
          Canadian Payroll Tax Calculator
        </h1>
        <p className="payroll-calculator-text-black text-lg mb-12">
          Enter your income and select your province to calculate the payroll.
        </p>
        <div className="flex flex-col items-center space-y-8">
          <div className="payroll-calculator-formGroup">
            <label htmlFor="income" className="payroll-calculator-label">
              Enter your income
            </label>
            <input
              type="number"
              id="income"
              value={income}
              onChange={(e) => setIncome(e.target.value)}
              className="payroll-calculator-input"
            />
          </div>
          <div className="payroll-calculator-formGroup">
            <label htmlFor="province" className="payroll-calculator-label">
              Select Province
            </label>
            <select
              id="province"
              value={province}
              onChange={(e) => setProvince(e.target.value)}
              className="payroll-calculator-select"
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
          <button
            onClick={handleCalculate}
            className="payroll-calculator-button"
          >
            Calculate
          </button>
          {results && (
            <div className="payroll-calculator-results">
              <h2>Results</h2>
              <p>Federal Tax: ${results.federalTax}</p>
              <p>Provincial Tax: ${results.provincialTax}</p>
              <p>CPP: ${results.cpp}</p>
              <p>EI: ${results.ei}</p>
              <p>Net Income: ${results.netIncome}</p>
            </div>
          )}
          {error && <h2 className="payroll-calculator-error">{error}</h2>}
        </div>
      </div>
    </Layout>
  );
};

export default PayrollCalculator;
