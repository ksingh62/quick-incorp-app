import React from "react";

const AdvisorDetail = ({ advisor, onClose, onCalendlyClick }) => {
  if (!advisor) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg max-w-lg w-full relative">
        <button
          className="absolute top-2 right-2 text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-gray-500"
          onClick={onClose}
        >
          ✖
        </button>
        <div className="flex flex-col items-center">
          <img
            src={advisor.image}
            alt={advisor.name}
            className="rounded-full w-32 h-32 mb-4"
          />
          <h1 className="text-4xl font-bold mb-2 text-gray-900 dark:text-white">
            {advisor.name}
          </h1>
          <p className="text-xl text-gray-500 dark:text-gray-400 mb-2">
            {advisor.title}
          </p>
          <p className="text-gray-500 dark:text-gray-400 mb-2">
            {advisor.education}
          </p>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            {advisor.fullSynopsis}
          </p>
          <a
            href={advisor.calendly}
            target="_blank"
            className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors duration-300"
            onClick={onCalendlyClick}
          >
            Book session on Calendly
          </a>
        </div>
      </div>
    </div>
  );
};

export default AdvisorDetail;
