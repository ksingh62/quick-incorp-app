import React from 'react';
import './library.css';

const resources = [
  { id: 1, title: 'Business Plan Template', description: 'A comprehensive template for drafting your business plan.' },
  { id: 2, title: 'Canadian Business Registration Guide', description: 'Step-by-step guide to registering your business in Canada.' },
  { id: 3, title: 'Funding and Grants Directory', description: 'A list of available funding and grants for Canadian businesses.' },
];

const documentation = [
  { id: 1, title: 'Getting Started with Business Registration', link: '/docs/getting-started' },
  { id: 2, title: 'Tax Obligations for Canadian Businesses', link: '/docs/tax-obligations' },
];

const tutorials = [
  { id: 1, title: 'How to Set Up Your Business in Canada', link: '/tutorials/setup-business' },
  { id: 2, title: 'Using Firebase Auth for Your Business Website', link: '/tutorials/firebase-auth' },
];

const caseStudies = [
  { id: 1, title: 'Success Story: Tech Startup in Toronto', description: 'How a tech startup successfully launched and scaled in Toronto.' },
  { id: 2, title: 'Case Study: E-commerce Business in Vancouver', description: 'A detailed case study of an e-commerce business thriving in Vancouver.' },
];

const LibraryPage = () => {
  return (
    <div className="library-container">
      <h1 className="library-title">Library</h1>
      <p className="library-description">Welcome to the Library. Here you can find various resources and documents related to setting up your business in Canada.</p>

      <div className="library-search">
        <input type="text" placeholder="Search for resources..." />
      </div>

      <div className="library-section">
        <h2>Documentation</h2>
        <ul>
          {documentation.map(doc => (
            <li key={doc.id}>
              <a href={doc.link}>{doc.title}</a>
            </li>
          ))}
        </ul>
      </div>

      <div className="library-section">
        <h2>Tutorials</h2>
        <ul>
          {tutorials.map(tutorial => (
            <li key={tutorial.id}>
              <a href={tutorial.link}>{tutorial.title}</a>
            </li>
          ))}
        </ul>
      </div>

      <div className="library-section">
        <h2>Case Studies</h2>
        <ul>
          {caseStudies.map(caseStudy => (
            <li key={caseStudy.id}>
              <h3>{caseStudy.title}</h3>
              <p>{caseStudy.description}</p>
            </li>
          ))}
        </ul>
      </div>

      <div className="library-resources">
        <h2>Resources</h2>
        <ul>
          {resources.map(resource => (
            <li key={resource.id}>
              <h3>{resource.title}</h3>
              <p>{resource.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default LibraryPage;
