'use client'
import React, { useState } from 'react';

const teamMembers = [
  {
    name: 'Ammar Khan',
    title: 'CEO & Founder',
    imgSrc: '/pic-3.jpg',
    description: ''
  },
  {
    name: 'Kapilmeet Singh',
    title: 'Chief Operating Officer',
    imgSrc: '/pic-2.jpg',
    description: ''
  },
  {
    name: 'Sahib Aulakh',
    title: 'Chief Technology Officer',
    imgSrc: '/pic-1.jpg',
    description: ''
  },
  {
    name: 'Vansh Malhotra',
    title: 'Chief Technology Officer',
    imgSrc: '/pic-4.jpg',
    description: ''
  },
];

const AboutUs = () => {
  const [expandedMember, setExpandedMember] = useState(null);

  const handleMoreInfoClick = (index) => {
    setExpandedMember(expandedMember === index ? null : index);
  };

  return (
    
      <section className="about-section bg-gray-900 text-gray-100 py-12">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-semibold mb-6 text-center">About Us</h2>
          <p className="text-lg mb-8 text-center">
          </p>
          <div className="team">
            <h3 className="text-2xl font-semibold mb-6 text-center">Meet Our Team</h3>
            <div className="flex flex-wrap justify-center">
              {teamMembers.map((member, index) => (
                <div
                  key={index}
                  className={`team-member bg-gray-800 p-6 m-4 rounded-lg shadow-lg text-center w-64 relative transition-all duration-300 ease-in-out ${expandedMember === index ? 'expanded' : ''}`}
                  onMouseLeave={() => setExpandedMember(null)}
                >
                  <img className="w-24 h-24 rounded-full mx-auto mb-4" src={member.imgSrc} alt={member.name} />
                  <h4 className="text-xl font-semibold">{member.name}</h4>
                  <p className="text-gray-400">{member.title}</p>
                  {expandedMember === index && <p className="text-gray-300 mt-4">{member.description}</p>}
                  <button
                    onClick={() => handleMoreInfoClick(index)}
                    className={`more-info-btn mt-4 py-1 px-4 rounded text-gray-900 bg-sky-400 hover:bg-sky-300 transition-all ${expandedMember === index ? 'hidden' : ''}`}
                  >
                    More Info
                  </button>
                  {expandedMember === index && (
                    <button
                      onClick={() => handleMoreInfoClick(index)}
                      className="more-info-btn mt-4 py-1 px-4 rounded text-gray-900 bg-red-400 hover:bg-red-300 transition-all"
                    >
                      Less Info
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
  );
};

export default AboutUs;



