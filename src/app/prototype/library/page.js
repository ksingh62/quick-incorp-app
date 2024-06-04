'use client'
import Layout from '@/components/Layout';
import React from 'react';

const resources = [
  {
    title: 'How to Incorporate Your Business',
    description: 'A comprehensive guide on the steps to incorporate your business in Canada.',
    link: 'https://www.ownr.co/blog/guide-to-business-incorporation-in-canada/',
  },
  {
    title: 'Managing Your Business',
    description: 'Tips and tools for effective management of your business.',
    link: 'https://www.ownr.co/blog/category/ownrship-101/business-stages/managing-your-business/',
  },
  {
    title: 'Legal Requirements for Startups',
    description: 'Understanding the legal requirements and obligations for new businesses.',
    link: 'https://www.freshbooks.com/en-ca/hub/startup/starting-small-business-legal-requirements-in-canada',
  },
];

const Library = () => {
  return (
    <Layout>
      <section className="library-section bg-gray-900 text-gray-100 py-12">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-semibold mb-6 text-center">Library</h2>
          <p className="text-lg mb-12 text-center">
            Explore our collection of resources to help you start, manage, and grow your business.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {resources.map((resource, index) => (
              <div key={index} className="resource-card bg-gray-800 p-6 rounded-lg shadow-lg">
                <h3 className="text-2xl font-semibold mb-4">{resource.title}</h3>
                <p className="text-gray-400 mb-4">{resource.description}</p>
                <a
                  href={resource.link}
                  className="text-sky-400 hover:text-sky-300 transition"
                >
                  Read More
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Library;

//https://www.ownr.co/blog/guide-to-business-incorporation-in-canada/ 
//https://www.ownr.co/blog/category/ownrship-101/business-stages/managing-your-business/ 
//https://www.freshbooks.com/en-ca/hub/startup/starting-small-business-legal-requirements-in-canada 