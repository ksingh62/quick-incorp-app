"use client";
import React, { useState } from "react";
import Layout from "@/components/Layout";
import advisorsData from "./advisorsData.json";
import AdvisorDetail from "@/components/AdvisorDetail";
import { db } from "@/app/prototype/_utils/firebase";
import { doc, updateDoc, increment } from "firebase/firestore";

const Advisors = () => {
  const [selectedAdvisor, setSelectedAdvisor] = useState(null);

  const handleCardClick = async (advisor) => {
    setSelectedAdvisor(advisor);

    // Increment impression count
    const advisorRef = doc(db, "advisors", advisor.id);
    try {
      await updateDoc(advisorRef, {
        impressions: increment(1),
      });
    } catch (error) {
      console.error("Error updating impressions:", error);
    }
  };

  const handleCalendlyClick = async (advisor) => {
    // Increment calendly click count
    const advisorRef = doc(db, "advisors", advisor.id);
    try {
      await updateDoc(advisorRef, {
        calendlyClicks: increment(1),
      });
    } catch (error) {
      console.error("Error updating calendly clicks:", error);
    }
  };

  // Separate financial and legal advisors
  const financialAdvisors = advisorsData.slice(0, 3);
  const legalAdvisors = advisorsData.slice(3, 6);

  return (
    <Layout>
      <div className="container mx-auto p-6">
        {/* <h1 className="text-4xl font-bold mb-6 text-white">Our Advisors</h1> */}

        <h2 className="text-3xl font-bold mb-4 text-white">
          Financial Advisors
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {financialAdvisors.map((advisor) => (
            <div
              key={advisor.id}
              onClick={() => handleCardClick(advisor)}
              className="bg-gray-800 text-white p-4 rounded-lg shadow-lg cursor-pointer hover:shadow-xl transition-shadow duration-300"
            >
              <img
                src={advisor.image}
                alt={advisor.name}
                className="rounded-full w-32 h-32 mx-auto mb-4"
              />
              <h2 className="text-xl font-semibold text-center">
                {advisor.name}
              </h2>
              <p className="text-center">{advisor.title}</p>
              <p className="text-center">{advisor.education}</p>
              <p className="mt-4">{advisor.synopsis}</p>
            </div>
          ))}
        </div>

        <h2 className="text-3xl font-bold m-4 ml-0 text-white">
          Legal Advisors
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {legalAdvisors.map((advisor) => (
            <div
              key={advisor.id}
              onClick={() => handleCardClick(advisor)}
              className="bg-gray-800 text-white p-4 rounded-lg shadow-lg cursor-pointer hover:shadow-xl transition-shadow duration-300"
            >
              <img
                src={advisor.image}
                alt={advisor.name}
                className="rounded-full w-32 h-32 mx-auto mb-4"
              />
              <h2 className="text-xl font-semibold text-center">
                {advisor.name}
              </h2>
              <p className="text-center">{advisor.title}</p>
              <p className="text-center">{advisor.education}</p>
              <p className="mt-4">{advisor.synopsis}</p>
            </div>
          ))}
        </div>

        {selectedAdvisor && (
          <AdvisorDetail
            advisor={selectedAdvisor}
            onClose={() => setSelectedAdvisor(null)}
            onCalendlyClick={() => handleCalendlyClick(selectedAdvisor)}
          />
        )}
      </div>
    </Layout>
  );
};

export default Advisors;
