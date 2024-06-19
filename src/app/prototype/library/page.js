'use client'
import Layout from '@/components/Layout';
import ProgressBar from '/src/components/ProgressBar/ProgressBar.js';
import React, { useEffect, useState } from 'react';

const resources = [
  {
    id: 'resource1',
    title: 'Incorporate in Canada',
    description: 'A comprehensive guide to incorporating in Canada.',
    link: '/prototype/resources/resource1',
  },
  {
    id: 'resource2',
    title: 'Incorporate in Ontario',
    description: 'A comprehensive guide to incorporating in Ontario.',
    link: '/prototype/resources/resource2',
  },
  {
    id: 'resource3',
    title: 'Incorporate in British Columbia',
    description: 'A comprehensive guide to incorporating in British Columbia.',
    link: '/prototype/resources/resource3',
  },
  {
    id: 'resource4',
    title: 'Incorporate in Alberta',
    description: 'A comprehensive guide to incorporating in Alberta.',
    link: '/prototype/resources/resource4',
  },
  {
    id: 'resource5',
    title: 'Why Incorporate',
    description: 'Learn about the benefits of incorporating your business.',
    link: '/prototype/resources/resource5',
  },
  {
    id: 'resource6',
    title: 'ESOP Guide',
    description: 'A comprehensive guide to Employee Stock Option Plans (ESOPs) for Canadian Startups.',
    link: '/prototype/resources/resource6',
  },
];

const Library = () => {
  const [progresses, setProgresses] = useState({});

  useEffect(() => {
    // Fetch progress for each article from local storage
    const storedProgresses = resources.reduce((acc, resource) => {
      const progress = localStorage.getItem(`progress-${resource.id}`) || 0;
      acc[resource.id] = parseFloat(progress);
      return acc;
    }, {});
    setProgresses(storedProgresses);
  }, []);

  return (
    <Layout>
      <section className="library-section bg-gray-900 text-gray-100 py-12">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-semibold mb-6 text-center">QuickInCorp Business Guides</h2>
          <p className="text-lg mb-12 text-center">
            Our guides cover all aspects of starting and running a business in Canada. Learn everything from how to incorporate your business to ongoing legal items that all businesses need to think about.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {resources.map((resource, index) => (
              <div key={index} className="resource-card bg-gray-800 p-6 rounded-lg shadow-lg">
                <h3 className="text-2xl font-semibold mb-4">{resource.title}</h3>
                <p className="text-gray-400 mb-4">{resource.description}</p>
                <ProgressBar progress={progresses[resource.id] || 0} />
                <a
                  href={resource.link}
                  className="text-sky-400 hover:text-sky-300 transition mt-4 block text-center"
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


//https://www.youtube.com/watch?v=MUpVNTGVIPE
//https://www.ownr.co/resources/business-guides