"use client";
import React, { useState } from "react";
import axios from "axios";
import { Pie } from "react-chartjs-2";
import "./LoanCalculator.css";

const LoanCalculator = () => {
  const [loanAmount, setLoanAmount] = useState("");
  const [loanTerm, setLoanTerm] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [compound, setCompound] = useState("");
  const [payback, setPayback] = useState("");
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);

  const handleCalculate = async () => {
    try {
      const response = await axios.get("/api/loan-calculator", {
        params: { loanAmount, loanTerm, interestRate, compound, payback },
      });
      console.log("API response:", response.data);
      setResults(response.data);
      setError(null); // Clear any previous errors
    } catch (error) {
      console.error("Error calculating loan:", error);
      setResults(null);
      setError("Failed to calculate loan. Please try again.");
    }
  };

  const data = results
    ? {
        labels: ["Principal", "Total Interest", "Total Tax"],
        datasets: [
          {
            data: [
              parseFloat(loanAmount),
              parseFloat(results.totalInterest),
              parseFloat(results.totalTax),
            ],
            backgroundColor: ["#36A2EB", "#FF6384", "#FFCE56"],
          },
        ],
      }
    : null;

  return (
    <div className="loan-calculator-container">
      <h1 className="loan-calculator-title">Canadian Loan Calculator</h1>
      <div className="loan-calculator-formGroup">
        <label htmlFor="loanAmount" className="loan-calculator-label">
          Loan Amount
        </label>
        <input
          type="number"
          id="loanAmount"
          value={loanAmount}
          onChange={(e) => setLoanAmount(e.target.value)}
          className="loan-calculator-input"
        />
      </div>
      <div className="loan-calculator-formGroup">
        <label htmlFor="loanTerm" className="loan-calculator-label">
          Loan Term (years)
        </label>
        <input
          type="number"
          id="loanTerm"
          value={loanTerm}
          onChange={(e) => setLoanTerm(e.target.value)}
          className="loan-calculator-input"
        />
      </div>
      <div className="loan-calculator-formGroup">
        <label htmlFor="interestRate" className="loan-calculator-label">
          Interest Rate (%)
        </label>
        <input
          type="number"
          id="interestRate"
          value={interestRate}
          onChange={(e) => setInterestRate(e.target.value)}
          className="loan-calculator-input"
        />
      </div>
      <div className="loan-calculator-formGroup">
        <label htmlFor="compound" className="loan-calculator-label">
          Compound Frequency (per year)
        </label>
        <input
          type="number"
          id="compound"
          value={compound}
          onChange={(e) => setCompound(e.target.value)}
          className="loan-calculator-input"
        />
      </div>
      <div className="loan-calculator-formGroup">
        <label htmlFor="payback" className="loan-calculator-label">
          Payback Frequency (per year)
        </label>
        <input
          type="number"
          id="payback"
          value={payback}
          onChange={(e) => setPayback(e.target.value)}
          className="loan-calculator-input"
        />
      </div>
      <button onClick={handleCalculate} className="loan-calculator-button">
        Calculate
      </button>
      {results && (
        <div className="loan-calculator-results">
          <h2>Results</h2>
          <p>Monthly Payment: ${results.monthlyPayment}</p>
          <p>Total Payment: ${results.totalPayment}</p>
          <p>Total Interest: ${results.totalInterest}</p>
          <p>Federal Tax: ${results.federalTax}</p>
          <p>Provincial Tax: ${results.provincialTax}</p>
          <p>Total Tax: ${results.totalTax}</p>
          <div className="loan-calculator-chart">
            <Pie data={data} />
          </div>
        </div>
      )}
      {error && <h2 className="loan-calculator-error">{error}</h2>}
    </div>
  );
};

export default LoanCalculator;
