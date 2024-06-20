'use client'
import Layout from '@/components/Layout';
import React, { useEffect } from 'react';

const Resource4 = () => {
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;
      localStorage.setItem('progress-resource4', scrollPercent);
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
          <h2 className="text-4xl font-semibold mb-6 text-center">How to Incorporate in Alberta: The Definitive Guide</h2>
          <p className="text-lg mb-12">
            Whether you’re starting a new company or taking your sole proprietorship to the next level, incorporation could be the right step for your business. This guide provides a short summary of the steps required to incorporate a business under Alberta law, as well as some questions to determine whether it’s the right time for your business to incorporate. Let’s take a look at how to incorporate in Alberta and answer some common incorporation questions.
          </p>
          <h3 className="text-2xl font-semibold mb-4">Choosing a business name</h3>
          <p className="text-lg mb-12">
            Choosing a name for your business can be a little stressful, but ultimately, it’s a fun exercise. There are five typical steps to confirming if a name is available. They don’t necessarily have to be completed in the order outlined below, but it is a good idea to go through each step before deciding to incorporate.
          </p>
          <h3 className="text-2xl font-semibold mb-4">Step One: Ownr</h3>
          <p className="text-lg mb-12">
            As part of our incorporation packages, you’ll be granted unlimited name searches with our name search tool. You’ll be able to see if other businesses are using the same name as the one you’d like to choose.
          </p>
          <h3 className="text-2xl font-semibold mb-4">Step Two: Domain name search</h3>
          <p className="text-lg mb-12">
            Next, you’ll want to check if a suitable domain is available. You can use a domain name registration service like Hover to search and see what’s available. Although most .com’s are taken, there are still plenty of .ca’s, .io’s, .co’s, and other TLDs available. Another option many new businesses and startups choose is to add “get” “go” or “my” at the front of their business name to get an available domain name (i.e. www.getrhinoicecream.com).
          </p>
          <h3 className="text-2xl font-semibold mb-4">Step Three: Legal requirements</h3>
          <p className="text-lg mb-12">
            It is recommended to include all three legal parts to your business name:
          </p>
          <p className="text-lg mb-12">
            [Distinctive] + [Descriptive] + [Legal Ending]
          </p>
          <p className="text-lg mb-12">
            For example: Rhino Ice Cream Inc.
          </p>
          <p className="text-lg mb-12">
            That being said, there are many companies that simply have a distinctive element (i.e. Apple Inc.). The difficulty with simply a distinctive element is it could be rejected by the Corporate Registry office, meaning that additional costs would need to be incurred to choose a different name with a descriptive element.
          </p>
          <p className="text-lg mb-12">
            When you choose to set up a corporation with Ownr, you’ll also be able to see if your chosen name satisfies the legal requirements as part of your setup.
          </p>
          <h3 className="text-2xl font-semibold mb-4">Step Four: Trademark search</h3>
          <p className="text-lg mb-12">
            You should check if anyone has already registered a trademark for your desired name. The Canadian Intellectual Property Office (CIPO) makes it easy using their online search.
          </p>
          <p className="text-lg mb-12">
            When conducting a search, you will want to consider alternate spellings. If your name is similar to one that is already registered, you may not be able to use it if it is likely to cause confusion to consumers.
          </p>
          <p className="text-lg mb-12">
            One final note about Trademarks: they are tied to specific goods or services. This means that you may still be able to use a desired name if your intended use is in a different industry. A trademark lawyer can help you navigate the ins and outs of any issues relating to trademarks.
          </p>
          <h3 className="text-2xl font-semibold mb-4">Step Five: NUANS search</h3>
          <p className="text-lg mb-12">
            Finally, you’ll need to get a NUANS search done. We’ve already written at length about NUANS searches. Note, however, that it’s common when you incorporate to obtain the NUANS search and the incorporation all at the same time.
          </p>
          <p className="text-lg mb-12">
            Final words of advice, if you’re stuck and having trouble finding a name that works, these business name generators can be useful and fun:
          </p>
          <ul className="text-lg mb-12">
            <li>Shopify Business Name Generator</li>
            <li>Namium Domain Name Generator</li>
          </ul>
          <h3 className="text-2xl font-semibold mb-4">What is a numbered company in Alberta</h3>
          <p className="text-lg mb-12">
            For business owners who can’t, or would rather not, settle on a name, there’s the option of choosing a numbered company. In simple terms, a numbered company operates under a number assigned by the Alberta Corporate Registry rather than a distinctive name. ‘Alberta’ is always included after the number, and then a legal element. So you may receive a numbered corporation name like: 123456 Alberta Ltd. This might be a good option for corporations that will only hold assets and not conduct any day-to-day business operations.
          </p>
          <h3 className="text-2xl font-semibold mb-4">Benefits of incorporation</h3>
          <p className="text-lg mb-12">
            The two main benefits to incorporation are limited liability and tax advantages.
          </p>
          <h3 className="text-2xl font-semibold mb-4">Limited liability</h3>
          <p className="text-lg mb-12">
            By incorporating, you will separate your personal and business obligations. Therefore, if your company goes south, your personal assets will remain protected and untouched. It is important to remember that directors of corporations may remain on the hook for unpaid employees’ wages in specific instances and unpaid taxes. This is different than if you remained a sole proprietor or a general partner in a partnership, as you would remain personally responsible for the debts of the business.
          </p>
          <h3 className="text-2xl font-semibold mb-4">Tax advantages</h3>
          <p className="text-lg mb-12">
            Corporations are taxed differently than individuals. Generally, tax rates for corporations are lower than tax rates for individuals. Also, corporations are subject to flat rates of tax, where individuals are taxed on a progressive basis.
          </p>
          <p className="text-lg mb-12">
            Additional benefits include:
          </p>
          <ul className="text-lg mb-12">
            <li>Raising money. It is easier to fund your business and raise money from investors as incorporated businesses can sell shares.</li>
            <li>Transferable. Incorporated companies can be transferred amongst individuals by simply selling shares and succession planning is considerably easier.</li>
            <li>Continuous lifespan. Corporations are not limited to the lifespan of the owners. They can exist indefinitely.</li>
          </ul>
          <h3 className="text-2xl font-semibold mb-4">Drawbacks of incorporation</h3>
          <p className="text-lg mb-12">
            The primary drawback to incorporation is the added expense. There will be the initial cost to incorporate your company as well as ongoing accounting and annual filing costs. Also, a corporation requires additional ongoing paperwork and record keeping. Thankfully, we’ve automated all ongoing corporate maintenance when you incorporate with Ownr.
          </p>
          <h3 className="text-2xl font-semibold mb-4">Where to incorporate: federal vs. provincial</h3>
          <p className="text-lg mb-12">
            In Canada, you have the option of incorporating provincially or federally. If you choose Federal, you’ll also need to extra-provincially register the company in Alberta.
          </p>
          <p className="text-lg mb-12">
            The differences between incorporating provincially or federally are often exaggerated. Both allow the company to operate in all provinces and service clients from anywhere in the world. There are a few key differences, which we’ve highlighted below:
          </p>
          <h3 className="text-2xl font-semibold mb-4">Provincial incorporation in Alberta</h3>
          <p className="text-lg mb-12">
            The benefits of incorporating provincially include:
          </p>
          <ul className="text-lg mb-12">
            <li>Potentially lower costs. The cost to incorporate a federal corporation and register extra-provincially in Alberta is $300, compared to $275 for a provincial Alberta incorporation.</li>
            <li>No Canada director residency requirement. Alberta has no residency requirements for the directors of a corporation. However, Federal corporations require that at least 25% of the directors of a corporation must be resident Canadians.</li>
          </ul>
          <h3 className="text-2xl font-semibold mb-4">Federal incorporation</h3>
          <p className="text-lg mb-12">
            The benefits of incorporating federally include:
          </p>
          <ul className="text-lg mb-12">
            <li>Increased name protection. Your business name will be registered throughout Canada (rather than just one province).</li>
            <li>Global recognition. Operating a federal corporation communicates to international clients and investors that the company is held to a higher standard.</li>
          </ul>
          <p className="text-lg mb-12">
            For a more detailed discussion on this topic, read about the differences between Federal and Provincial Incorporation.
          </p>
          <h3 className="text-2xl font-semibold mb-4">Shareholders, directors, and officers</h3>
          <p className="text-lg mb-12">
            Corporations in Alberta must have at least one director and one shareholder, but the director and shareholder don’t have to be the same person.
          </p>
          <p className="text-lg mb-12">
            Shareholders own the company and have a say in the company’s major decisions, such as who will be on the board of directors. The directors, on the other hand, are responsible for making the day-to-day business decisions. Finally, the officers manage the daily operations.
          </p>
          <p className="text-lg mb-12">
            Alberta’s Business Corporations Act (ABCA) sets out how shareholders, directors, and officers must act and the duties they must carry out.
          </p>
          <h3 className="text-2xl font-semibold mb-4">Creating bylaws</h3>
          <p className="text-lg mb-12">
            Once the company has been incorporated, the directors must create the company’s bylaws. These bylaws outline how the corporation will operate and may include information on the following:
          </p>
          <ul className="text-lg mb-12">
            <li>The rights and responsibilities of shareholders, directors, and officers</li>
            <li>How directors are elected and removed</li>
            <li>When meetings will be held and how voting will take place</li>
            <li>How shares can be transferred</li>
          </ul>
          <p className="text-lg mb-12">
            Creating bylaws is a significant step as it lays the groundwork for how the company will operate. This is where consulting with a lawyer can be beneficial. Once the bylaws have been created, they must be approved by the directors and shareholders.
          </p>
          <h3 className="text-2xl font-semibold mb-4">Filing Articles of Incorporation</h3>
          <p className="text-lg mb-12">
            The Articles of Incorporation is a legal document that establishes the corporation. It sets out the corporation’s name, share structure, and any restrictions on the business activities the corporation may engage in. This document must be filed with the Alberta Corporate Registry.
          </p>
          <h3 className="text-2xl font-semibold mb-4">Obtaining an Alberta NUANS Report</h3>
          <p className="text-lg mb-12">
            A NUANS (Newly Upgraded Automated Name Search) report is a document that shows the results of a search for similar corporate names and trademarks. This report is required when incorporating in Alberta and can be obtained online or through a service provider. The cost of a NUANS report is typically around $75.
          </p>
          <h3 className="text-2xl font-semibold mb-4">Filing the incorporation application</h3>
          <p className="text-lg mb-12">
            Now we get to the most important part: actually preparing and filing the incorporation documents. In general terms, there are three different ways to incorporate your business in Alberta:
          </p>
          <h3 className="text-2xl font-semibold mb-4">Online through Ownr</h3>
          <p className="text-lg mb-12">
            At Ownr, we’ve made incorporating easy and affordable. Here’s what makes Ownr different:
          </p>
          <h3 className="text-2xl font-semibold mb-4">One affordable price</h3>
          <p className="text-lg mb-12">
            With Ownr, you can incorporate your company through our intuitive platform. We explain everything in plain language, so you can feel confident navigating throughout. Processes that typically take weeks, involve stacks of paper, and cost thousands of dollars have been transformed into quick, paperless, and affordable tasks that require no legal expertise.
          </p>
          <h3 className="text-2xl font-semibold mb-4">Corporate organizational documents</h3>
          <p className="text-lg mb-12">
            Company bylaws, shareholder and director resolutions, share issuances (collectively known as a minute book) and more are all automated through Ownr. That means that you’ll get all the documents you would normally get if you went to a law firm, tailored to your business, and you’ll save time and money in the process.
          </p>
          <h3 className="text-2xl font-semibold mb-4">Automatic company updates</h3>
          <p className="text-lg mb-12">
            Anytime your company details change (like when you want to add a new director or change your address), Ownr automatically takes care of the paperwork by filing forms with the government, preparing the required corporate resolutions, gathering eSignatures, and securely storing all documents back into your account.
          </p>
          <h3 className="text-2xl font-semibold mb-4">Secure and organized online storage</h3>
          <p className="text-lg mb-12">
            Once you’ve incorporated, all your company’s legal documents are organized and securely stored in your Ownr account.
          </p>
          <h3 className="text-2xl font-semibold mb-4">Do it yourself (DIY) method</h3>
          <p className="text-lg mb-12">
            It is possible to complete the incorporation documents yourself. Not surprisingly, we don’t recommend this approach and suggest you get professional advice. Here’s why:
          </p>
          <h3 className="text-2xl font-semibold mb-4">No corporate organization documents</h3>
          <p className="text-lg mb-12">
            The biggest issue with DIY is you only obtain half of what is required to fully incorporate. The government won’t provide the legally required corporate organizational documents you need to properly structure your corporation. To complete the incorporation, you will need:
          </p>
          <ul className="text-lg mb-12">
            <li>Shareholder resolutions</li>
            <li>Director resolutions</li>
            <li>Shareholder ledgers</li>
            <li>Director and officer registers</li>
            <li>Director consents</li>
            <li>Share certificates</li>
            <li>Corporate bylaws</li>
            <li>Waiver of auditor form</li>
          </ul>
          <p className="text-lg mb-12">
            That’s a lot, to say the least. These documents aren’t insignificant and are legally required items that won’t be provided when you use the government website alone.
          </p>
          <h3 className="text-2xl font-semibold mb-4">One-size-fits-all approach</h3>
          <p className="text-lg mb-12">
            The government website has limited flexibility. This means that you won’t be able to set up customized share classes that suit your business. You’ll be stuck with the website’s defaults. Alternate share classes and customized bylaws can be extremely useful for adding non-voting shareholders, paying dividends, or attracting investors.
          </p>
          <h3 className="text-2xl font-semibold mb-4">Traditional method: law firms</h3>
          <p className="text-lg mb-12">
            Traditionally, many small businesses contact a local law firm to get incorporated. This removes all the concerns about the DIY method: you will get customized advice that fits your company’s future goals, and your lawyer will prepare all the corporate organizational documents to properly structure your corporation.
          </p>
          <p className="text-lg mb-12">
            But there is a downside to the traditional method—one that can be prohibitive for many small business owners. The cost is high. Incorporating through a traditional law firm can range anywhere from $1,200 to $1,800, or sometimes more, depending on the complexity.
          </p>
          <p className="text-lg mb-12">
            Apart from the high cost, you’ll need to take time away from your business to call the law firm, set up the appointment, and either drive to the lawyer’s office or pick up the documents or have them couriered to you (and your cost).
          </p>
          <h3 className="text-2xl font-semibold mb-4">After incorporation: ongoing obligations</h3>
          <p className="text-lg mb-12">
            After incorporating, your business has an obligation to maintain certain documents and records. In exchange for the legal and tax benefits of incorporating, you are expected to keep your corporation up-to-date and in compliance with the law. There are three main things that every company is legally required to keep up-to-date:
          </p>
          <h3 className="text-2xl font-semibold mb-4">Minute book and share records</h3>
          <p className="text-lg mb-12">
            You are required to keep your company documents in an organized manner. This can be in an old fashioned paper binder, or, like we do at Ownr, through a secure electronic minute book.
          </p>
          <h3 className="text-2xl font-semibold mb-4">Company updates</h3>
          <p className="text-lg mb-12">
            Any time your company details change (for example, when you want to add a new director or change your registered address), you are obligated to file forms with the government and prepare corporate resolutions which officially approve the company changes.
          </p>
          <p className="text-lg mb-12">
            Ownr takes care of all this paperwork on an ongoing basis: automatically preparing and filing forms with the government, preparing the required corporate resolutions, gathering e-signatures, and securely storing all documents within your account.
          </p>
          <h3 className="text-2xl font-semibold mb-4">Annual return and resolutions</h3>
          <p className="text-lg mb-12">
            Each year, your company will need to file an annual return with the government and pay the associated fees (which can range from $20 for a federal corporation to $50 for an Alberta corporation).
          </p>
          <p className="text-lg mb-12">
            You’ll also need to prepare annual shareholder and director resolutions, even if you’re a single-person corporation. These are all mandatory documents in order for your business to stay compliant. If you fail to file the annual return, the government can dissolve your company.
          </p>
        </div>
      </section>
    </Layout>
  );
};

export default Resource4;


//https://www.ownr.co/blog/how-to-incorporate-in-alberta/
//https://www.youtube.com/watch?v=MUpVNTGVIPE