import React from 'react';
import Image from 'next/image';
import './page.css';

const AboutPage = () => {
  return (
    <div className="about-background">
      <div className="about-container">
        <h1>About Us</h1>
        <p>Welcome to our company!</p>
        <p>We are dedicated to helping businesses thrive in Canada. Our mission is to provide top-notch services to entrepreneurs and business owners, ensuring a smooth and successful journey from start to finish.</p>
        <p>Our team consists of experienced professionals in various fields, including legal, financial, and business consulting. We are passionate about what we do and are committed to delivering the best results for our clients.</p>
        <h2>Meet the Team</h2>
        <div className="team">
          <div className="team-member">
            <Image src="/pic-3.jpg" alt="Ammar" width={150} height={150} />
            <h3>Ammar Khan</h3>
          </div>
          <div className="team-member">
            <Image src="/pic-2.jpg" alt="Kapil" width={150} height={150} />
            <h3>Kapilmeet Singh</h3>
          </div>
          <div className="team-member">
            <Image src="/pic-1.jpg" alt="Sahib" width={150} height={150} />
            <h3>Sahib Aulakh</h3>
          </div>
          <div className="team-member">
            <Image src="/pic-4.jpg" alt="Vansh" width={150} height={150} />
            <h3>Vansh Malhotra</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;