"use client";
import React from "react";
import "./pricing.css";
import Layout from "@/components/Layout";
import { useRouter } from "next/navigation";

const Pricing = () => {
  const router = useRouter();

  const handleGetStarted = () => {
    router.push("/prototype/form");
  };
  return (
    <Layout>
      <div className="container mx-auto text-center">
        <h2 className="text-4xl font-semibold mb-6">
          Fair and Transparent Pricing
        </h2>
        <p className="text-lg mb-12">
          Whether you're starting a new business or already running one, we've
          got you covered.
        </p>
        <div className="flex flex-col md:flex-row justify-center space-y-8 md:space-y-0 md:space-x-8">
          <div className="plan bg-gray-800 p-8 rounded-lg shadow-lg w-full md:w-1/3">
            <h3 className="text-2xl font-semibold mb-4">QuickIncorp Basics</h3>
            <p className="text-xl font-bold mb-4">
              $225/month{" "}
              <span className="text-sm">Government fees additional</span>
            </p>
            <ul className="text-left space-y-2 mb-6">
              <li>
                <strong>Business Formation</strong>: Register a Canadian
                corporation
              </li>
              <li>
                <strong>Corporate Maintenance</strong>: Complete mandatory
                resolutions, set officers & directors, issue bylaws
              </li>
              <li>
                <strong>Tax Filings</strong>: A CPA prepares the annual T2 tax
                return
              </li>
              <li>
                <strong>Compliance</strong>: Generate required registers and
                ledgers
              </li>
              <li>
                <strong>Jurisdiction</strong>: Start a Federal Corporation in
                any province or territory.
              </li>
            </ul>
            <button onClick={handleGetStarted} className="btn">
              Get Started
            </button>
          </div>
          <div className="plan bg-gray-800 p-8 rounded-lg shadow-lg w-full md:w-1/3">
            <h3 className="text-2xl font-semibold mb-4">Managed Corporation</h3>
            <p className="text-xl font-bold mb-4">
              $300/year{" "}
              <span className="text-sm">Government fees additional</span>
            </p>
            <ul className="text-left space-y-2 mb-6">
              <li>
                <strong>Business Formation</strong>: Register and structure a
                Canadian corporation
              </li>
              <li>
                <strong>Corporate Maintenance</strong>: Digital minute book,
                easily make changes
              </li>
              <li>
                <strong>Tax Filings</strong>: A CPA prepares the annual T2 tax
                return, processes up to five T4 or T5 slips, and handles
                HST/GST/PST filings
              </li>
              <li>
                <strong>Payroll + Accounting Software</strong>: Includes
                QuickBooks Online Essentials + Payroll subscription with
                personalized setup and training
              </li>
              <li>
                <strong>Bookkeeping</strong>: Ongoing bookkeeping with 30
                transactions per month included
              </li>
            </ul>
            <button onClick={handleGetStarted} className="btn">
              Get Started
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Pricing;
