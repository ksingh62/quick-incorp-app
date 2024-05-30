"use client";
import React from "react";
import Layout from "../../../components/Layout";
import "./pricing.css";

const PricingPage = () => {
  return (
    <Layout>
      <div className="pricing-container">
        <h1>Pricing Plans</h1>
        <div className="pricing-cards">
          <div className="pricing-card">
            <h2>Basic</h2>
            <p>$70/month</p>
            <ul>
              <li>Company Name Registration</li>
              <li>Filings with the Government</li>
              <li>Up to 3 User Accounts</li>
            </ul>
            <a href="/prototype/pricing/basic-details.js">
              <button>Choose Plan</button>
            </a>
          </div>
          <div className="pricing-card">
            <h2>Premium</h2>
            <p>$100/month</p>
            <ul>
              <li>Full Incorporation plus additional features</li>
              <li>Unlimited Access to QuickInCorp Legal Agreement Library</li>
              <li>Unlimited User Accounts</li>
              <li>Unlimited Company Updates & Government Filings</li>
              <li>Unlimited Support</li>
              <li>Unlimited User Accounts</li>
            </ul>
            <a href="/prototype/pricing/basic-details.js">
              <button>Choose Plan</button>
            </a>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PricingPage;
