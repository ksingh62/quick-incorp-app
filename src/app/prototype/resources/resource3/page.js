'use client'
import Layout from '@/components/Layout';
import React, { useEffect, useState } from 'react';

const Resource3 = () => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [speechInstance, setSpeechInstance] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;
      localStorage.setItem('progress-resource3', scrollPercent);
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
          <h2 className="text-4xl font-semibold mb-6 text-center">How to Incorporate in British Columbia: The Definitive Guide</h2>
          <button
            onClick={handleReadAloud}
            className={`mb-6 px-4 py-2 ${isSpeaking ? 'bg-red-600' : 'bg-blue-600'} text-white font-semibold rounded`}
          >
            {isSpeaking ? 'Stop Reading' : 'Read Aloud'}
          </button>
          <p className="text-lg mb-12">
            Incorporating a sole proprietorship business is a big decision for any entrepreneur, and not one to take lightly. There are a lot of things to consider, and the process can feel overwhelming, confusing, and daunting. If you’re a business owner contemplating incorporating your business in British Columbia, this is the definitive guide for you.
          </p>
          <h3 className="text-2xl font-semibold mb-4">What exactly is a corporation?</h3>
          <p className="text-lg mb-12">
            A corporation is a legal entity that is distinct and separate from the owner of the business. Unlike a sole proprietorship, under Canadian law, a corporation has the same rights and legal responsibilities as a person.
          </p>
          <p className="text-lg mb-12">
            If you decide to incorporate your business, you can do so either provincially, federally, or both.
          </p>
          <h3 className="text-2xl font-semibold mb-4">Why incorporate in British Columbia?</h3>
          <p className="text-lg mb-12">
            As an entrepreneur or small business owner in B.C., you’ll want to incorporate your business for two main reasons:
          </p>
          <ul className="text-lg mb-12">
            <li>To limit your liability</li>
            <li>To reduce your tax burden</li>
          </ul>
          <p className="text-lg mb-12">
            Although these are probably the most common reasons business owners incorporate their businesses, there are other reasons why incorporating your business in British Columbia might be a good idea for you.
          </p>
          <h3 className="text-2xl font-semibold mb-4">No Canadian residency requirement</h3>
          <p className="text-lg mb-12">
            Most Canadian provinces and the Canadian federal government require a corporation to have at least one director who is a permanent resident or Canadian citizen. However, in B.C. there is no citizenship or residency requirement. Many international entrepreneurs choose to incorporate in B.C. because they don’t need to partner with a Canadian director.
          </p>
          <p className="text-lg mb-12">
            Keep in mind that it’s mandatory to have an address in British Columbia to serve as the corporation’s head office address, even if that address is just a “virtual” office where mail can be received, such as a P.O. box.
          </p>
          <h3 className="text-2xl font-semibold mb-4">Less fees and paperwork than a federal Canadian corporation</h3>
          <p className="text-lg mb-12">
            In each province, including B.C., you can choose to incorporate federally with the Canadian government or with the provincial government. When you incorporate federally, you must file documents and pay fees to both the federal and provincial government. So, incorporating provincially in B.C. will result in less overall paperwork and fees.
          </p>
          <p className="text-lg mb-12">
            However, incorporating provincially won’t prevent you from operating in other provinces in the future, or even in other countries. You will simply need to register your corporation in those jurisdictions as you expand your operations.
          </p>
          <h3 className="text-2xl font-semibold mb-4">Should you incorporate federally or provincially in British Columbia?</h3>
          <p className="text-lg mb-12">
            There are two tiers to incorporate in Canada: provincially and federally. Here is how they differ:
          </p>
          <h3 className="text-2xl font-semibold mb-4">Incorporating in British Columbia</h3>
          <p className="text-lg mb-12">
            Incorporating provincially only extends those rights in that particular jurisdiction. So if you incorporate in British Columbia, you don’t have incorporation rights in another province. As a result, your company won’t have the same benefits across Canada. This is where federal incorporation comes in.
          </p>
          <p className="text-lg mb-12">
            British Columbia incorporation is regulated by the B.C. Business Corporations Act, which sets out definitions, legal obligations and rights, the required documents, and how to file them.
          </p>
          <h3 className="text-2xl font-semibold mb-4">Incorporating in Canada</h3>
          <p className="text-lg mb-12">
            The advantages of incorporating federally are much the same as incorporating in British Columbia, but doing both can protect your corporation name across Canada, not just in B.C.
          </p>
          <p className="text-lg mb-12">
            Incorporating your business in Canada falls under the purview of the Canada Business Corporations Act.
          </p>
          <h3 className="text-2xl font-semibold mb-4">Steps to incorporating in B.C.</h3>
          <p className="text-lg mb-12">
            There are a few basic steps you need to follow in order to incorporate your business in B.C. They include:
          </p>
          <h3 className="text-2xl font-semibold mb-4">Choosing and reserving a business name</h3>
          <p className="text-lg mb-12">
            Choosing a name for your business can be a little stressful, but ultimately, it’s a fun exercise. There are five steps to confirm whether a business name is available and how to reserve it. The steps don’t necessarily need to be completed in the order outlined below, but it’s a good idea to go through each step before deciding to incorporate.
          </p>
          <h3 className="text-2xl font-semibold mb-4">Internet searches</h3>
          <p className="text-lg mb-12">
            A good first step is to simply Google your preferred name to see if anyone is already using it. Your primary concern should be to identify anyone using the same name or a similar name in B.C. or other parts of Canada. If there’s an international company using a similar name, you may run into future problems with trademarks, but it likely won’t prevent you from incorporating under that name.
          </p>
          <h3 className="text-2xl font-semibold mb-4">Domain name search</h3>
          <p className="text-lg mb-12">
            Next, you’ll want to check if a suitable domain is available for your company’s website. This isn’t a legal requirement, but you will almost certainly want to secure a domain to match your corporate name.
          </p>
          <p className="text-lg mb-12">
            You can use a domain name registrar like Hover to search and see what’s available. Although most .com’s are taken, there are still plenty of .ca’s, .io’s, .co’s, and other top-level domains (TLDs) available.
          </p>
          <p className="text-lg mb-12">
            Another option many new businesses and startups choose is to add “get,” “go,” or “my” at the front of their business name to create an available domain name (i.e. getrhinosandwiches.com).
          </p>
          <h3 className="text-2xl font-semibold mb-4">Trademark search</h3>
          <p className="text-lg mb-12">
            You should check if anyone has already registered a trademark for your preferred name. The Canadian Intellectual Property Office (CIPO) makes it easy to check trademarks using their online search.
          </p>
          <p className="text-lg mb-12">
            When searching, you will always want to consider alternate spellings. If your name is similar to one that is already registered, you may not be able to use it, especially if using that name is likely to confuse consumers.
          </p>
          <p className="text-lg mb-12">
            One final note about trademarks: they are tied to specific goods or services. This means that you may still be able to incorporate under a desired name if your intended use is in a completely different industry. A trademark lawyer can help you navigate the ins and outs of trademarks.
          </p>
          <h3 className="text-2xl font-semibold mb-4">Legal requirements</h3>
          <p className="text-lg mb-12">
            Legal requirements are just that: requirements. There are no exceptions to these requirements.
          </p>
          <p className="text-lg mb-12">
            Your business name should have three components:
          </p>
          <p className="text-lg mb-12">
            [Distinctive Element] + [Descriptive Element] + [Legal Ending]
          </p>
          <p className="text-lg mb-12">
            For example: Rhino Sandwiches Inc.
          </p>
          <p className="text-lg mb-12">
            “Rhino” is the distinctive element which promotes the corporation’s brand. “Sandwiches” is the descriptive element, as it describes the nature of the corporation’s business. And “Inc.”, “Ltd.”, or “Corp.” are the legal endings. You can choose one of the three legal endings and there are no legal implications or significant differences between those options. Basically, you can choose what sounds best to you.
          </p>
          <p className="text-lg mb-12">
            There are many companies that simply have a distinctive element and a legal ending with no descriptive element (i.e. Apple Inc.). But not everyone is Apple and without a descriptive element, there is a higher chance that your name will be rejected for being too similar to existing business names. However, in B.C. you are permitted to list three potential business names in your application, so you can always request a purely distinctive name first and ask for an alternate name if your first choice is rejected.
          </p>
          <h3 className="text-2xl font-semibold mb-4">Name approval request</h3>
          <p className="text-lg mb-12">
            Now you’re ready to formally request approval of your preferred corporate name. Before actually filing your incorporation documents, you will need to get your proposed business name approved by BC Registry Services. The Name Request Form is a simple document where you can list up to three potential names for your corporation. You are allowed to rank your three choices, so you will get your first choice unless an issue is identified by the examiner.
          </p>
          <p className="text-lg mb-12">
            All of this can be completed online without the need to conduct a NUANS search. However, going through the process of a NUANS search is strongly recommended.
          </p>
          <h3 className="text-2xl font-semibold mb-4">Filing the incorporation application</h3>
          <p className="text-lg mb-12">
            Now we get to the most important part: actually preparing and filing the incorporation documents. In general terms, there are three different ways to incorporate your business in British Columbia:
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
          <h3 className="text-2xl font-semibold mb-4">Should I incorporate in B.C.?</h3>
          <p className="text-lg mb-12">
            Rather than how to incorporate, you might be wondering if incorporation is right for you and your business at this time. Here’s a short refresher on when and why you should incorporate your business.
          </p>
          <h3 className="text-2xl font-semibold mb-4">Benefits of incorporation</h3>
          <p className="text-lg mb-12">
            There are five main benefits of incorporating. They include:
          </p>
          <h3 className="text-2xl font-semibold mb-4">Limited liability</h3>
          <p className="text-lg mb-12">
            By incorporating, you will separate your personal and business obligations. This protects your personal assets, including your home and car. This is different from if you remained a sole proprietor or a partnership, as you would remain personally liable for the debts of the business.
          </p>
          <p className="text-lg mb-12">
            It is important to remember that directors of corporations may still be responsible for unpaid taxes and unpaid employees’ wages in specific instances.
          </p>
          <h3 className="text-2xl font-semibold mb-4">Tax advantages</h3>
          <p className="text-lg mb-12">
            Corporations are taxed differently than individuals. Generally, tax rates for corporations are lower than tax rates for individuals. Also, corporations are subject to flat rates of tax, whereas individuals are taxed on a progressive basis.
          </p>
          <h3 className="text-2xl font-semibold mb-4">Raising money</h3>
          <p className="text-lg mb-12">
            It’s easier to raise money from investors, as incorporated businesses can sell shares in exchange for investment capital.
          </p>
          <h3 className="text-2xl font-semibold mb-4">Transferable</h3>
          <p className="text-lg mb-12">
            The ownership of a corporation is easy to transfer, making succession planning that much easier than it is with a sole proprietorship.
          </p>
          <h3 className="text-2xl font-semibold mb-4">Continuous lifespan</h3>
          <p className="text-lg mb-12">
            Corporations are not limited to the lifespan of the owners. Because they are independent legal entities, they can exist indefinitely.
          </p>
          <h3 className="text-2xl font-semibold mb-4">Drawbacks of incorporation</h3>
          <p className="text-lg mb-12">
            There are really only two drawbacks to incorporating your business: added expenses and additional paperwork.
          </p>
          <h3 className="text-2xl font-semibold mb-4">Additional expenses</h3>
          <p className="text-lg mb-12">
            The initial cost of incorporating your company, as well as ongoing accounting and filling costs, can deter some sole proprietors from the process. That’s when you might need help with the incorporation process, and the long-term financial benefits usually outweigh the initial costs.
          </p>
          <h3 className="text-2xl font-semibold mb-4">Paperwork</h3>
          <p className="text-lg mb-12">
            Yes, paperwork is always involved, no matter what you really do. With incorporation, there will be additional paperwork, both initially and yearly. Again, this is where Ownr can help you.
          </p>
          <h3 className="text-2xl font-semibold mb-4">Frequently asked questions</h3>
          <h3 className="text-2xl font-semibold mb-4">How much does it cost to incorporate in B.C.?</h3>
          <p className="text-lg mb-12">
            Simply filig the incorporation documents with the B.C. government runs between $350 to $400. So the obvious advantage of doing it yourself is a temporarily lower cost. However, the costs will likely balloon within the first year to pay for missing items.
          </p>
          <p className="text-lg mb-12">
            The cost to incorporate with Ownr is marginally higher than incorporating yourself, but you’ll get all your documents completed and file properly the first time.
          </p>
          <h3 className="text-2xl font-semibold mb-4">Do I need a lawyer to incorporate in B.C.?</h3>
          <p className="text-lg mb-12">
            Not at all. Keep in mind that creating the required documents can be very time-consuming, and if there are errors, fixing them could be costlier. There is a far more cost-effective way to go about incorporating your business. That’s where Ownr can help.
          </p>
          <h3 className="text-2xl font-semibold mb-4">How do I incorporate myself in B.C.?</h3>
          <p className="text-lg mb-12">
            Incorporating yourself in B.C. is the same as the DIY method. You’ll need to prepare all your minute book documents, then head over to the BC Registries and Online Services website to file your documents.
          </p>
          <p className="text-lg mb-12">
            But simply registering your company with BC Registries and Online Services doesn’t mean you’re finished incorporating your company. There are steps you need to take after receiving your Certificate of Incorporation in order to keep your incorporation status.
          </p>
          <h3 className="text-2xl font-semibold mb-4">What is a limited company in B.C.?</h3>
          <p className="text-lg mb-12">
            According to the BC Registries and Online Services, a limited company in B.C. is a company that “results from the process of incorporation, and is formed according to the terms of a special contract between the members (shareholders).”
          </p>
          <p className="text-lg mb-12">
            Basically, a limited company is the same as an incorporated company. The only difference is in the legal ending of the company name, “Ltd.” or “Inc.”
          </p>
          <h3 className="text-2xl font-semibold mb-4">How long does it take to incorporate in B.C.?</h3>
          <p className="text-lg mb-12">
            To file a B.C. incorporation application can take as little as a few hours. Preparing those documents can take longer, and receiving your Certificate of Incorporation can take up to 27 days.
          </p>
        </div>
      </section>
    </Layout>
  );
};

export default Resource3;

//https://www.ownr.co/blog/how-to-incorporate-in-british-columbia/
//https://www.youtube.com/watch?v=MUpVNTGVIPE
