"use client";
import React, { useState } from "react";
import "./BusinessPlan.css";

const BusinessPlan = () => {
  const [inputs, setInputs] = useState({
    businessName: "",
    businessDescription: "",
    targetMarket: "",
    productsServices: "",
    revenueModel: "",
    marketingStrategy: "",
    financialPlan: "",
  });

  const [businessPlan, setBusinessPlan] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    generateBusinessPlan();
  };

  const generateBusinessPlan = () => {
    const plan = `
      ## Business Plan for ${inputs.businessName}

      **Business Description:**
      ${inputs.businessDescription}

      **Target Market:**
      ${inputs.targetMarket}

      **Products and Services:**
      ${inputs.productsServices}

      **Revenue Model:**
      ${inputs.revenueModel}

      **Marketing Strategy:**
      ${inputs.marketingStrategy}

      **Financial Plan:**
      ${inputs.financialPlan}
    `;

    setBusinessPlan(plan);
  };

  return (
    <div className="business-plan-container">
      <h1 className="business-plan-title">Business Plan Generator</h1>
      <form onSubmit={handleSubmit}>
        <div className="business-plan-formGroup">
          <label htmlFor="businessName" className="business-plan-label">
            Business Name
          </label>
          <input
            type="text"
            id="businessName"
            name="businessName"
            value={inputs.businessName}
            onChange={handleChange}
            className="business-plan-input"
            placeholder="Enter your business name"
          />
        </div>
        <div className="business-plan-formGroup">
          <label htmlFor="businessDescription" className="business-plan-label">
            Business Description
          </label>
          <textarea
            id="businessDescription"
            name="businessDescription"
            value={inputs.businessDescription}
            onChange={handleChange}
            className="business-plan-textarea"
            placeholder="Describe your business"
          />
        </div>
        <div className="business-plan-formGroup">
          <label htmlFor="targetMarket" className="business-plan-label">
            Target Market
          </label>
          <textarea
            id="targetMarket"
            name="targetMarket"
            value={inputs.targetMarket}
            onChange={handleChange}
            className="business-plan-textarea"
            placeholder="Describe your target market"
          />
        </div>
        <div className="business-plan-formGroup">
          <label htmlFor="productsServices" className="business-plan-label">
            Products and Services
          </label>
          <textarea
            id="productsServices"
            name="productsServices"
            value={inputs.productsServices}
            onChange={handleChange}
            className="business-plan-textarea"
            placeholder="Describe your products and services"
          />
        </div>
        <div className="business-plan-formGroup">
          <label htmlFor="revenueModel" className="business-plan-label">
            Revenue Model
          </label>
          <textarea
            id="revenueModel"
            name="revenueModel"
            value={inputs.revenueModel}
            onChange={handleChange}
            className="business-plan-textarea"
            placeholder="Describe your revenue model"
          />
        </div>
        <div className="business-plan-formGroup">
          <label htmlFor="marketingStrategy" className="business-plan-label">
            Marketing Strategy
          </label>
          <textarea
            id="marketingStrategy"
            name="marketingStrategy"
            value={inputs.marketingStrategy}
            onChange={handleChange}
            className="business-plan-textarea"
            placeholder="Describe your marketing strategy"
          />
        </div>
        <div className="business-plan-formGroup">
          <label htmlFor="financialPlan" className="business-plan-label">
            Financial Plan
          </label>
          <textarea
            id="financialPlan"
            name="financialPlan"
            value={inputs.financialPlan}
            onChange={handleChange}
            className="business-plan-textarea"
            placeholder="Describe your financial plan"
          />
        </div>
        <button type="submit" className="business-plan-button">
          Generate Business Plan
        </button>
      </form>
      {businessPlan && (
        <div className="business-plan-results">
          <h2>Your Business Plan</h2>
          <pre>{businessPlan}</pre>
        </div>
      )}
    </div>
  );
};

export default BusinessPlan;
