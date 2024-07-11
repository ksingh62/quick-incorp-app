"use client";
import React, { useState } from "react";
import "./BusinessPlan.css";

const BusinessPlan = () => {
  const [inputs, setInputs] = useState({
    industry: "",
    businessName: "",
    businessDescription: "",
    targetMarket: "",
    productsServices: "",
    revenueModel: "",
    marketingStrategy: "",
    financialPlan: "",
  });

  const [imageSrc, setImageSrc] = useState(null);

  const handleIndustryChange = (e) => {
    const industry = e.target.value;
    setInputs({ ...inputs, industry });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    generateBusinessPlan();
  };

  const generateBusinessPlan = () => {
    fetch("http://localhost:5000/generate-insights", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(inputs),
    })
      .then((response) => response.blob())
      .then((blob) => {
        const url = URL.createObjectURL(blob);
        setImageSrc(url);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div className="business-plan-container">
      <h1 className="business-plan-title">Business Plan Generator</h1>
      <form onSubmit={handleSubmit}>
        <div className="business-plan-formGroup">
          <label htmlFor="industry" className="business-plan-label">
            Industry
          </label>
          <select
            id="industry"
            name="industry"
            value={inputs.industry}
            onChange={handleIndustryChange}
            className="business-plan-select"
          >
            <option value="">Select Industry</option>
            <option value="technology">Technology</option>
            <option value="retail">Retail</option>
            <option value="healthcare">Healthcare</option>
            <option value="education">Education</option>
          </select>
        </div>
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
      {imageSrc && (
        <div className="business-plan-results">
          <h2>Your Business Plan Flowchart</h2>
          <img src={imageSrc} alt="Business Plan Flowchart" />
        </div>
      )}
    </div>
  );
};

export default BusinessPlan;
