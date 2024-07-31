'use client'
import Layout from '@/components/Layout';
import React, { useState } from 'react';

const teamMembers = [
  {
    name: 'Ammar Khan',
    title: 'Software Developer',
    imgSrc: '/Ammar.jpg',
    description: 'Ammar Khan is a skilled front end developer specializing in creating user-friendly interfaces with HTML, CSS, JavaScript, and React. His attention to detail and passion for innovation ensure our websites are both visually appealing and highly functional.',
    linkedin: 'https://www.linkedin.com/in/ammarkhan08/'
  },
  {
    name: 'Kapilmeet Singh',
    title: 'Software Developer',
    imgSrc: '/Kapil.jpg',
    description: 'Kapilmeet is an expert backend developer with proficiency in Node.js, Express, and MongoDB. His strong problem-solving skills and dedication to building robust, scalable systems ensure our applications run smoothly and efficiently. His technical expertise and commitment to excellence make him an indispensable part of our team.',
    linkedin: 'https://www.linkedin.com/in/kapilmeet-singh/'
  },
  {
    name: 'Sahib Aulakh',
    title: 'Software Developer',
    imgSrc: '/Sahib.jpeg',
    description: 'Sahib is a highly skilled backend developer with expertise in Node.js, Express, and MongoDB. His focus on building secure, scalable, and efficient systems ensures our applications perform flawlessly. His dedication to quality and innovative solutions makes him a vital member of our team.',
    linkedin: 'https://www.linkedin.com/in/sahib-aulakh-512036260/'
  },
  {
    name: 'Vansh Malhotra',
    title: 'Software Developer',
    imgSrc: '/Vansh.jpeg',
    description: 'Vansh is a proficient front end developer with a talent for creating intuitive and engaging user interfaces using HTML, CSS, JavaScript, and React. His creativity and meticulous approach ensure that our websites not only look great but also provide an exceptional user experience.',
    linkedin: 'https://www.linkedin.com/in/vansh-malhotra-softwaredeveloper/'
  },
];

const AboutUs = () => {
  const [expandedMember, setExpandedMember] = useState(null);

  const handleMoreInfoClick = (index) => {
    setExpandedMember(expandedMember === index ? null : index);
  };

  return (
    <Layout>
      <section className="about-section bg-gray-900 text-gray-100 py-12">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-semibold mb-6 text-center">About Us</h2>
          <p className="text-lg mb-8 text-center">
            Welcome to our company!
          </p>
          <p className="text-lg mb-8 text-center">
            We are dedicated to helping businesses thrive in Canada. Our mission is to provide top-notch services to entrepreneurs and business owners, ensuring a smooth and successful journey from start to finish.
          </p>
          <p className="text-lg mb-8 text-center">
            Our team consists of experienced professionals in various fields, including legal, financial, and business consulting. We are passionate about what we do and are committed to delivering the best results for our clients.
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
                  <div className="text-center mt-2">
                    <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="block text-sky-400 mt-2 hover:text-sky-300 transition-colors">
                      LinkedIn Profile
                    </a>
                  </div>
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
    </Layout>
  );
};

export default AboutUs;


//https://legacy.reactjs.org/docs/hooks-state.html
//https://www.w3schools.com/jsref/event_onmouseleave.asp

