"use client";
import React, { useState } from "react";
import axios from "axios";
import styles from "./CurrencyConverter.css";

const CurrencyConverter = () => {
  const [amount, setAmount] = useState("");
  const [baseCurrency, setBaseCurrency] = useState("USD");
  const [targetCurrency, setTargetCurrency] = useState("EUR");
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleConvert = async () => {
    try {
      const response = await axios.get("/api/currency-conversion", {
        params: { base: baseCurrency, target: targetCurrency, amount },
      });
      setResult(response.data.conversion_result);
      setError(null); // Clear any previous errors
    } catch (error) {
      console.error("Error converting currency:", error);
      setResult(null);
      setError("Failed to convert currency. Please try again.");
    }
  };

  return (
    <div className="currency-converter-container">
      <h1 className="currency-converter-title">Currency Converter</h1>
      <div className="currency-converter-formGroup">
        <label htmlFor="amount" className="currency-converter-label">
          Amount
        </label>
        <input
          type="number"
          id="amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="currency-converter-input"
        />
      </div>
      <div className="currency-converter-formGroup">
        <label htmlFor="baseCurrency" className="currency-converter-label">
          Base Currency
        </label>
        <input
          type="text"
          id="baseCurrency"
          value={baseCurrency}
          onChange={(e) => setBaseCurrency(e.target.value)}
          className="currency-converter-input"
        />
      </div>
      <div className="currency-converter-formGroup">
        <label htmlFor="targetCurrency" className="currency-converter-label">
          Target Currency
        </label>
        <input
          type="text"
          id="targetCurrency"
          value={targetCurrency}
          onChange={(e) => setTargetCurrency(e.target.value)}
          className="currency-converter-input"
        />
      </div>
      <button onClick={handleConvert} className="currency-converter-button">
        Convert
      </button>
      {result !== null && (
        <div className="currency-converter-result">
          <h2>Conversion Result</h2>
          <p>
            {amount} {baseCurrency} = {result} {targetCurrency}
          </p>
        </div>
      )}
      {error && <h2 className="currency-converter-error">{error}</h2>}
    </div>
  );
};

export default CurrencyConverter;

//https://www.youtube.com/watch?v=ZD_Yft-Qd9Y
