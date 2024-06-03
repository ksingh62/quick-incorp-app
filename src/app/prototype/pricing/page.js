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
      </div>
    </Layout>
  );
};

export default Pricing;
