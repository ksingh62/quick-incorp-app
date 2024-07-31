'use client'
import Layout from '@/components/Layout';
import React, { useEffect, useState } from 'react';

const Resource2 = () => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [speechInstance, setSpeechInstance] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;
      localStorage.setItem('progress-resource2', scrollPercent);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleReadAloud = () => {
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    } else {
      const text = document.querySelector('.resource-section').innerText;
      const speech = new SpeechSynthesisUtterance(text);
      speech.lang = 'en-US';
      speech.onend = () => {
        setIsSpeaking(false);
      };
      window.speechSynthesis.speak(speech);
      setIsSpeaking(true);
      setSpeechInstance(speech);
    }
  };

  return (
    <Layout>
      <section className="resource-section bg-gray-900 text-gray-100 py-12">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-semibold mb-6 text-center">How to Incorporate a Business in Ontario</h2>
          <button
            onClick={handleReadAloud}
            className={`mb-6 px-4 py-2 ${isSpeaking ? 'bg-red-600' : 'bg-blue-600'} text-white font-semibold rounded`}
          >
            {isSpeaking ? 'Stop Reading' : 'Read Aloud'}
          </button>
          <p className="text-lg mb-12">
            As your business grows, incorporating could be a logical next step. If you choose to incorporate your business in Ontario, you’re essentially creating a legal entity. Similar to a person, a corporation will have its own rights and responsibilities, including liability and protection. This includes all personal assets.
          </p>
          <p className="text-lg mb-12">
            The process of incorporating a business can be quite arduous. A high level of detail needs to be taken into account which is why a number of business owners choose to hire a lawyer. However, hiring a lawyer can be quite pricey and is not the only route you can take. It’s possible to incorporate your business without one.
          </p>
          <h3 className="text-2xl font-semibold mb-4">Why incorporate your business?</h3>
          <p className="text-lg mb-12">
            While many entrepreneurs and small business owners choose to be sole proprietors or partnerships, there are some circumstances when incorporating your business is beneficial and maybe even necessary.
          </p>
          <p className="text-lg mb-12">
            There are two types of incorporations: not-for-profit and for-profit businesses. Business owners generally fall under the latter category. While incorporating isn’t for everyone, there are a few important reasons why sole proprietors choose to incorporate. There are also things you should be aware of before deciding to incorporate.
          </p>
          <h3 className="text-2xl font-semibold mb-4">Limited liability</h3>
          <p className="text-lg mb-12">
            A sole proprietorship is not a legal entity in and of itself and therefore, cannot be held liable for any debts or litigation independently. This falls squarely on the shoulders of the business owner. For some, this can be a significant worry as all their personal assets, including savings, real estate, and vehicles are exposed.
          </p>
          <p className="text-lg mb-12">
            Since a corporation is a legal entity apart from its owner(s), all liability is under the purview of the corporation, protecting the owners from any personal asset exposure. For some business owners, this is an attractive option.
          </p>
          <h3 className="text-2xl font-semibold mb-4">Tax advantages of incorporating your business</h3>
          <p className="text-lg mb-12">
            As a sole proprietor, all business earnings are declared on their personal income tax return and taxed under the personal tax rate. But as your business grows and you start bringing in more income, you run the risk of meeting a higher tax bracket threshold. While there are business expense tax advantages to being a sole proprietor if revenue ends up putting you over the higher tax bracket threshold, incorporating your business can be an advantage.
          </p>
          <p className="text-lg mb-12">
            Incorporating your business means a corporate tax rate, which is usually lower than personal income tax rates. Travel and health insurance costs are also protected under corporate tax rates.
          </p>
          <p className="text-lg mb-12">
            By incorporating your business, you can draw a salary, which can also safeguard you from hefty personal income taxes. Whereas your personal income tax might be significantly higher in a sole proprietorship, despite much of the earnings going back into the business, as a corporation you will be able to lower your tax bracket to more accurately reflect your actual earnings.
          </p>
          <h3 className="text-2xl font-semibold mb-4">Securing funds is easier</h3>
          <p className="text-lg mb-12">
            By incorporating, your business becomes eligible for business loans and grants that are geared only for incorporated companies. These grants and loans can be of a significantly higher value as well. Conversely, sole proprietors and partnerships might have challenges securing funds, either through loans or grant programs.
          </p>
          <h3 className="text-2xl font-semibold mb-4">Should you incorporate your business yourself?</h3>
          <p className="text-lg mb-12">
            If you decide to incorporate your business, the next step will be to decide if you want to invest the time to do this yourself or hire the services of a lawyer.
          </p>
          <p className="text-lg mb-12">
            Incorporating can be expensive, both in money and time. Add on the legal fees and this can be a hefty bill. Incorporating your business yourself can save you money, but it’s best to weigh that legal bill against the time it takes to prepare all the paperwork and submit it to all the right entities. Will this time spent be worth the cost of using that time working on your business? Time-wise, will legal fees actually be more cost-effective?
          </p>
          <p className="text-lg mb-12">
            Legal fees can also include consulting and advice on how to structure your corporation to the best advantage, particularly tax-wise. Corporation roles, such as directors and shareholders, will also take some consideration, which is where hiring a lawyer might be a good idea.
          </p>
          <p className="text-lg mb-12">
            However, there is another option. Rather than spending money on legal fees or the time doing this yourself, Ownr can help you incorporate your business for a fraction of the cost.
          </p>
          <h3 className="text-2xl font-semibold mb-4">Incorporating your business provincially and federally</h3>
          <p className="text-lg mb-12">
            A corporation’s business will only have name protection in the jurisdiction it’s registered in. Incorporating in one province won’t necessarily mean your name is protected in another. Where you will be conducting business should also play a factor in deciding if you want to incorporate in just Ontario, or provincially and federally.
          </p>
          <h3 className="text-2xl font-semibold mb-4">Incorporating in Ontario</h3>
          <p className="text-lg mb-12">
            It’s important to recognize that incorporating your business in Ontario means these rights are only extended provincially in Ontario. Your business will not have the same benefits across Canada unless you incorporate federally.
          </p>
          <p className="text-lg mb-12">
            Ontario incorporation is regulated under the Ontario Business Corporations Act (OBCA) and requires Articles of Incorporation to be filed. The Articles of Incorporation should include corporation name, named directors, shareholders, and the effective date. This is all included and must be filed as a Form 1.
          </p>
          <h3 className="text-2xl font-semibold mb-4">How much does it cost to incorporate in Ontario?</h3>
          <p className="text-lg mb-12">
            The costs to file the incorporation materials in Ontario runs anywhere from $300 to $360 and can be done online, by mail, or in person.
          </p>
          <h3 className="text-2xl font-semibold mb-4">Incorporating in Canada</h3>
          <p className="text-lg mb-12">
            The advantages to incorporating federally are much the same as incorporating in Ontario, but doing both can protect your corporation name across Canada, not just in Ontario.
          </p>
          <p className="text-lg mb-12">
            Choosing a business name is the first step, which can be done through NUANS for a fee (you get unlimited NUANS searches free with Ownr). If you are incorporating in both Ontario and federally, it’s wise to search both.
          </p>
          <p className="text-lg mb-12">
            Your business name should satisfy three legal requirements: a distinctive element, a descriptive element, and a legal ending. A distinctive element can be a word or a name; something that is unique to your business. A descriptive element describes the business, such as “flower shop.” A legal ending defines your business structure, like Inc. or Ltd. For example, a satisfactory business name will look something like this:
          </p>
          <p className="text-lg mb-12">
            [Distinctive] + [Descriptive] + [Legal Ending] = Mabel’s Flower Shop Inc.
          </p>
          <p className="text-lg mb-12">
            As with incorporating in Ontario, you will need to file Articles of Incorporation. This is probably the most complex step and where outsourcing help is beneficial.
          </p>
          <h3 className="text-2xl font-semibold mb-4">How much does it cost to incorporate in Canada?</h3>
          <p className="text-lg mb-12">
            Incorporating at the federal level usually costs $200 CAD, which makes it a cheaper option than a provincial incorporation.
          </p>
          <h3 className="text-2xl font-semibold mb-4">What is required after incorporating your business?</h3>
          <p className="text-lg mb-12">
            Incorporating your business isn’t the last step of the process. There are a few legal requirements in order to keep your incorporation status, both federally and in Ontario.
          </p>
          <h3 className="text-2xl font-semibold mb-4">A minute book and share records</h3>
          <p className="text-lg mb-12">
            Most of the official record of documents and activities that are not included in the original application for incorporation is included in the minute book. This will include:
          </p>
          <ul className="text-lg mb-12">
            <li>Initial Corporate Bylaws</li>
            <li>First Director Resolution</li>
            <li>First Shareholder Resolution</li>
            <li>Director Consent</li>
            <li>Subscription for Shares</li>
            <li>Shareholder Register</li>
            <li>Shareholder Ledger</li>
            <li>Digital Notices of Uncertified Shares</li>
            <li>Any other documents required under Ontario and/or federal law</li>
          </ul>
        </div>
      </section>
    </Layout>
  );
};

export default Resource2;

//https://www.ownr.co/blog/how-to-incorporate-business-ontario/
//https://www.youtube.com/watch?v=MUpVNTGVIPE
