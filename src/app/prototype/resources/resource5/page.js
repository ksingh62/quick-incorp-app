'use client'
import Layout from '@/components/Layout';
import React, { useEffect } from 'react';

const Resource5 = () => {
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;
      localStorage.setItem('progress-resource5', scrollPercent);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <Layout>
      <section className="resource-section bg-gray-900 text-gray-100 py-12">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-semibold mb-6 text-center">5 Benefits of Incorporating in Canada</h2>
          <p className="text-lg mb-12">
            That’s a question many Canadian business owners may consider on a regular basis. Knowing when to upgrade and why incorporating your business makes sense can help you make better decisions as your business grows. Here are a few of the benefits of incorporating in Canada.
          </p>
          <h3 className="text-2xl font-semibold mb-4">1. Protect your personal assets</h3>
          <p className="text-lg mb-12">
            When you incorporate, your business becomes a separate legal entity. This means that your personal assets (such as your house, car, and savings) are protected from any liabilities or debts incurred by the business. This separation of personal and business assets is one of the key benefits of incorporation.
          </p>
          <h3 className="text-2xl font-semibold mb-4">2. Access tax advantages</h3>
          <p className="text-lg mb-12">
            Corporations are taxed differently than individuals, and often at a lower rate. By incorporating, you can take advantage of tax benefits such as income splitting, potential tax deferral, and access to the small business deduction. These benefits can result in significant tax savings for your business.
          </p>
          <h3 className="text-2xl font-semibold mb-4">3. Enhance your business credibility</h3>
          <p className="text-lg mb-12">
            Having “Inc.” or “Ltd.” after your business name can enhance your business's credibility with customers, suppliers, and lenders. It signals that your business is established and committed to long-term growth. This can be particularly important when seeking financing or entering into contracts.
          </p>
          <h3 className="text-2xl font-semibold mb-4">4. Attract investors</h3>
          <p className="text-lg mb-12">
            Investors are often more willing to invest in a corporation than in a sole proprietorship or partnership because their liability is limited to the amount of their investment. Additionally, a corporation can issue shares, making it easier to raise capital for growth and expansion.
          </p>
          <h3 className="text-2xl font-semibold mb-4">5. Ensure business continuity</h3>
          <p className="text-lg mb-12">
            A corporation has a continuous lifespan and is not dependent on the life of its owners. This means that the business can continue to operate even if the ownership changes due to retirement, sale, or succession. This continuity can be a significant advantage for long-term business planning and stability.
          </p>
        </div>
      </section>
    </Layout>
  );
};

export default Resource5;


//https://www.ownr.co/blog/5-things-to-consider-when-incorporating-your-business/
//https://www.youtube.com/watch?v=MUpVNTGVIPE