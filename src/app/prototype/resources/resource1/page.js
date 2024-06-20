'use client'
import Layout from '@/components/Layout';
import React, { useEffect } from 'react';

const Resource1 = () => {
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;
      localStorage.setItem('progress-resource1', scrollPercent);
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
          <h2 className="text-4xl font-semibold mb-6 text-center">How to Incorporate a Business in Canada</h2>
          <p className="text-lg mb-12">
            Incorporation is a big decision for an entrepreneur, and there is a lot of advice out there that can make it seem more complex than it needs to be. But never fear, this article has everything you need to know about how to incorporate a business in Canada. Let’s get started!
          </p>
          <p className="text-lg mb-12">
            When are you ready to incorporate?
          </p>
          <h3 className="text-2xl font-semibold mb-4">Limited liability</h3>
          <p className="text-lg mb-12">
            The benefits of limited liability cannot be overstated. By incorporating, you will separate your personal and business obligations. This is crucial, as an Innovation, Science, and Economic Development Canada study concluded that only about 70% of all small businesses survive beyond their first five years.
          </p>
          <p className="text-lg mb-12">
            If you incorporate and your business is unsuccessful, your personal assets will remain protected and untouched. If you do not incorporate and operate your business as a sole proprietorship or a partnership, you will remain personally responsible for the debts of the business – which can put your personal property (like your home, car, and computers) all at risk.
          </p>
          <p className="text-lg mb-12">
            NOTE: There are times when directors can remain personally liable for a business’s debts if certain preconditions are met. The most common examples include:
          </p>
          <ul className="text-lg mb-12">
            <li>Unpaid employee wages and vacation pay: Up to six months’ wages and 12 months’ vacation pay.</li>
            <li>Employee source deductions and remittances: Includes source deductions for employee income taxes, EI and CPP contributions.</li>
            <li>GST/HST remittances: This includes GST/HST that has been collected by the corporation but was not remitted to the government.</li>
          </ul>
          <h3 className="text-2xl font-semibold mb-4">Tax advantages</h3>
          <p className="text-lg mb-12">
            Corporations are taxed differently than individuals. In Canada, the tax rate on corporations is lower than the tax rate for individuals, and you can find further tax reductions available for incorporated small businesses. Whenever you can leave some money in the corporation, rather than transferring it to your personal account, you can reduce the taxes you pay.
          </p>
          <p className="text-lg mb-12">
            How you choose to pay yourself can also have tax advantages. You can pay yourself in salary, dividends, or a combination of both depending on what will result in the lowest tax burden.
          </p>
          <p className="text-lg mb-12">
            For example, in Ontario, a Canadian Controlled Private Corporation (a corporation owned primarily by Canadian residents) pays a tax rate of 13.5% on the first $500,000 of income each year, and 26.5% for all income beyond that. As a business owner, if you are able to leave money in the company, and not take it all out for personal expenses, you can increase the value of your company’s assets and pay less in taxes. This means that the money you leave in your company could be used to invest into the business in various ways. For example, to spend on marketing, buy new equipment, purchase additional inventory or hire new staff.
          </p>
          <h3 className="text-2xl font-semibold mb-4">What are the benefits of incorporating?</h3>
          <p className="text-lg mb-12">
            On top of the limited liability and tax benefits mentioned above, there are at least four other clear benefits of incorporating your business:
          </p>
          <h3 className="text-2xl font-semibold mb-4">Raising capital</h3>
          <p className="text-lg mb-12">
            If you want investors to invest in your company, you’ll need to be incorporated. Without incorporation, you will not have shares to sell to investors.
          </p>
          <h3 className="text-2xl font-semibold mb-4">Improving professional image</h3>
          <p className="text-lg mb-12">
            When working with clients, your business comes across as more professional when it is incorporated. Invoices are sent with your incorporated business name (ending in Inc., Ltd. or Corp.). This communicates to your clients that you have thought about the long-term viability of your business and take your obligations seriously.
          </p>
          <h3 className="text-2xl font-semibold mb-4">Transferable shares</h3>
          <p className="text-lg mb-12">
            Corporations can be transferred among individuals by simply selling or transferring shares. This makes long-term succession planning considerably easier.
          </p>
          <h3 className="text-2xl font-semibold mb-4">Continuous lifespan</h3>
          <p className="text-lg mb-12">
            Corporations are not limited to the lifespan of the owners. They can exist indefinitely.
          </p>
          <h3 className="text-2xl font-semibold mb-4">How to incorporate your business in Canada</h3>
          <p className="text-lg mb-12">
            Setting up a corporation is manageable if you break it down into discrete tasks. Let’s take a look at the steps to incorporate a business in Canada. By following each one, you’ll be able to incorporate your business and correctly adhere to legal requirements from the beginning, saving yourself the trouble of having to deal with potential mistakes down the line.
          </p>
          <h3 className="text-2xl font-semibold mb-4">Choosing a business name</h3>
          <p className="text-lg mb-12">
            Choosing a name for your business can be stressful, but ultimately, it’s a fun exercise. Keep in mind, you can always incorporate as a numbered company (ex. 12345678 Canada Inc). Then you can choose a name at a later date, or if you don’t have a public-facing business, operate without a legal name. But most entrepreneurs are excited to give their business a name and have it legally registered.
          </p>
          <p className="text-lg mb-12">
            First decide on what you would like to call your business. Remember that this is your formal legal name. It’s not necessarily the same as your brand name.
          </p>
          <p className="text-lg mb-12">
            Next, make sure your business name satisfies three legal requirements. It must have (1) a distinctive element, (2) a descriptive element, and (3) a legal ending:
          </p>
          <p className="text-lg mb-12">
            [Distinctive] + [Descriptive] + [Legal Ending]
          </p>
          <p className="text-lg mb-12">
            For example: Rhino Ice Cream Inc.
          </p>
          <p className="text-lg mb-12">
            Bonus step: trademark search. Have a look through Canadian trademarks to see if anyone else has registered a trademark on your desired name. You can conduct a free search with the Canadian Intellectual Property Office.
          </p>
          <p className="text-lg mb-12">
            One final note about trademarks: they are tied to specific goods or services. This means that you may still be able to use a registered trademark, if that’s your desired name, so long as your intended use is in a different industry.
          </p>
          <p className="text-lg mb-12">
            If you incorporate through Ownr, we handle all required NUANS searches so you don’t have to worry about conducting your own business name search in advance.
          </p>
          <h3 className="text-2xl font-semibold mb-4">Choose your incorporation jurisdiction</h3>
          <p className="text-lg mb-12">
            You can incorporate your business at either the federal or the provincial level. We’ll provide more detail about the differences below, but for most entrepreneurs, both jurisdictions are appropriate.
          </p>
          <h3 className="text-2xl font-semibold mb-4">Filing Articles of Incorporation with government</h3>
          <p className="text-lg mb-12">
            After you’ve decided on your name, you’ll need to file the initial registration forms with the government. For this step, you’ll need to determine your share class structure along with deciding on the company’s initial directors.
          </p>
          <p className="text-lg mb-12">
            With Ownr, we automatically file your initial registration documents with the government, by collecting all required information during your onboarding. Learn everything you need to know about articles of incorporation.
          </p>
          <h3 className="text-2xl font-semibold mb-4">Pay incorporation fees</h3>
          <p className="text-lg mb-12">
            The federal and provincial governments charge a fee for incorporation, so be prepared to pay this when you file your Articles of Incorporation.
          </p>
          <h3 className="text-2xl font-semibold mb-4">Company formation documents</h3>
          <p className="text-lg mb-12">
            Filing documents with the provincial or federal corporate registry is only half of what’s required when incorporating your business. You also need to create and sign all of your company formation documents: Corporate Bylaws, Shareholder and Director Resolutions, Director Consents, Share Subscriptions, and Share Issuances.
          </p>
          <p className="text-lg mb-12">
            There are significant risks if you fail to obtain these documents and set up your company properly from the start. Potential risks include having no owners in your business (because shares were never issued to shareholders) and the inability to have investors. These risks can increase over time and will cost more to fix than if your company was set up properly from the start.
          </p>
          <p className="text-lg mb-12">
            We often get the question: are company formation documents (otherwise known as minute book documents) really necessary? The short answer is yes. This Government of Canada article goes into detail about the different documents that a corporation must prepare and keep.
          </p>
          <p className="text-lg mb-12">
            With Ownr, we prepare all company formation documents for you instantly. Based on the information you provide during the onboarding process, our technology tailors all documents for your business, sends them out for eSignature, and once signed, saves them all in your Ownr account.
          </p>
          <h3 className="text-2xl font-semibold mb-4">How much does it cost to incorporate a business in Canada?</h3>
          <p className="text-lg mb-12">
            The cost to incorporate in Canada will vary according to your location. The total cost to incorporate with Ownr can be between $599 and $699, depending on your jurisdiction. This includes all government fees, name search fees, company formation documents as well as 12 months on the Ownr platform. Get started and incorporate in minutes with Ownr.
          </p>
          <p className="text-lg mb-12">
            Another option for incorporation is to go directly to the government. It’s important to note that the prices listed here are highly unlikely to be the total cost of your incorporation. Completing government filings yourself may still incur paperwork and other legal costs, such as hiring a lawyer, in order to ensure that your business is fully compliant.
          </p>
          <p className="text-lg mb-12">
            It’s also worth remembering that government prices will vary based on your jurisdiction and type of incorporation:
          </p>
          <ul className="text-lg mb-12">
            <li>British Columbia: Incorporation in British Columbia costs $350 CAD, plus an additional $30 charge for name approval.</li>
            <li>Alberta: Incorporation in Alberta costs $275 CAD, along with a name approval fee of $30. Incorporation is done through agents who generally charge an additional fee of $150 or more.</li>
            <li>Saskatchewan: In Saskatchewan, it costs $265 CAD to incorporate, plus a fee of $60 for a search report for named corporations.</li>
            <li>Manitoba: The government incorporation fee in Manitoba is $350 CAD, plus a search report fee of $45 for named corporations.</li>
            <li>Ontario: In Ontario, it costs $300 CAD to incorporate a business online or by mail. There is an additional $60 fee to register your business name.</li>
            <li>Quebec: Incorporation in Quebec costs $378 CAD, with an additional $25 charged for the business name search.</li>
            <li>New Brunswick: In New Brunswick, it costs $290 CAD to incorporate, which includes a government fee of $260 plus a name search report fee of $30.</li>
            <li>Nova Scotia: The fee to incorporate in Nova Scotia is $200 CAD, plus a $70 fee for a name search report.</li>
            <li>PEI: It costs a total of $305 CAD to incorporate in PEI, which covers the government fee and the name search report fee.</li>
            <li>Newfoundland: In Newfoundland, the fee to incorporate is $300 CAD plus a $30 charge for a name search report.</li>
            <li>Yukon: Incorporation in the Yukon costs $345 CAD, which covers a basic government charge and a corporation name search fee.</li>
          </ul>
          <p className="text-lg mb-12">
            Is compliance causing you stress and you’re looking for an easier way? Incorporate with Ownr and save additional fees for government filings. With our one-stop solution, you receive with your provincial incorporation:
          </p>
          <ul className="text-lg mb-12">
            <li>A full year of our Online Minute Book plan</li>
            <li>Company name registration</li>
            <li>Company organization documents & share issuances</li>
            <li>Access to Ownr Perks</li>
          </ul>
          <h3 className="text-2xl font-semibold mb-4">Federal versus provincial incorporation</h3>
          <p className="text-lg mb-12">
            In Canada, you have the option of incorporating provincially or federally. If you choose federal, you’ll also need to register the company in the province where your business is located.
          </p>
          <p className="text-lg mb-12">
            The differences between incorporating provincially or federally are often exaggerated. Both allow the company to operate in all provinces and service clients from anywhere in the world.
          </p>
          <p className="text-lg mb-12">
            The main benefit to incorporating a federal corporation is that it provides your company with increased name protection. Your business name will be registered throughout Canada (rather than just one province).
          </p>
          <p className="text-lg mb-12">
            One other difference between a federal and provincial corporation is the requirement for the directors of the corporation to be Canadian residents. Federal corporations require that at least 25% of the directors of a corporation must be resident Canadians. There are no Canada director residency requirements for Alberta, British Columbia, Ontario, and several other provinces and territories.
          </p>
          <p className="text-lg mb-12">
            One of the downsides of federal corporations is that in some jurisdictions, they can take extra work to register and, depending on the province, can cost more money. With Ownr, however, we’ve automated all the additional paperwork for federal corporations in Ontario, and it is actually less expensive to incorporate a federal corporation than an Ontario provincial corporation.
          </p>
          <h3 className="text-2xl font-semibold mb-4">Different roles in a corporation</h3>
          <p className="text-lg mb-12">
            There are three major roles in a corporation: shareholders, directors and officers. It’s common in small businesses for one person to be the sole shareholder, sole director, and sole officer.
          </p>
          <h3 className="text-2xl font-semibold mb-4">Shareholder</h3>
          <p className="text-lg mb-12">
            A shareholder is a person that owns shares in a company. The unit of ownership is called a share.
          </p>
          <p className="text-lg mb-12">
            Shareholders are legally separate from the company. As a result, shareholders are generally not liable for the debts of a company (unless a shareholder has signed a personal guarantee on behalf of the company).
          </p>
          <h3 className="text-2xl font-semibold mb-4">Director</h3>
          <p className="text-lg mb-12">
            A director has overall responsibility to oversee the activities and strategy of the corporation. Collectively, the directors are called the Board of Directors. A director is appointed by the shareholder(s) of the corporation.
          </p>
          <h3 className="text-2xl font-semibold mb-4">Officer</h3>
          <p className="text-lg mb-12">
            Officers actively operate and manage the business.
          </p>
          <p className="text-lg mb-12">
            A company can have several different officer positions. Companies can create whatever officer positions suit them. Common examples of officer titles include President, Secretary, CEO, Vice-President, and Treasurer. These can all be held by the same person.
          </p>
          <p className="text-lg mb-12">
            Officers are appointed by the directors to run the day-to-day operations of the corporation.
          </p>
          <h3 className="text-2xl font-semibold mb-4">How to structure your corporation</h3>
          <p className="text-lg mb-12">
            The number of shares owned by each shareholder reflects the proportion of the company they own. But that doesn’t mean all shareholders are equal. When first incorporating your company, you can create multiple share classes to allow different groups of shareholders to have different rights and privileges over the company.
          </p>
          <p className="text-lg mb-12">
            Also, it’s important to remember that you can choose to have multiple share classes when you incorporate, but you don’t need to issue shares in each share class at the outset. For example, you could choose to have your company structured with three share classes: Class A Common Voting Shares, Class B Common Voting Shares and Class C Common Non-Voting Shares, but only issue shares in Class A.
          </p>
          <p className="text-lg mb-12">
            So what are the different types of share classes? We’ve provided a basic overview below:
          </p>
          <h3 className="text-2xl font-semibold mb-4">Voting and non-voting shares</h3>
          <p className="text-lg mb-12">
            The most common difference among share classes is the ability to vote on matters relating to the business. Voting shares will be held by those shareholders who want to actively participate in the decision-making process (like the founders, directors, and senior managers). Non-voting shares are intended for shareholders who wish to benefit from the company’s long-term growth, but don’t necessarily want to get involved in high-level decisions (for example, employees).
          </p>
          <h3 className="text-2xl font-semibold mb-4">Common shares</h3>
          <p className="text-lg mb-12">
            Common shares are the standard shares in the corporation. As the corporation grows and becomes profitable, the value of the Common shares will increase.
          </p>
          <p className="text-lg mb-12">
            Common shares do not have any special priority over the corporation’s assets. If the corporation stops operating, the holders of common shares will be paid out in proportion to their ownership stake.
          </p>
          <p className="text-lg mb-12">
            The directors can declare and pay dividends on common shares at any time and in any amount.
          </p>
          <h3 className="text-2xl font-semibold mb-4">Preferred shares</h3>
          <p className="text-lg mb-12">
            Preferred shares are only called ‘preferred’ because they entitle the shareholder to get paid back first if the corporation stops conducting business. However, it is important to understand that preferred shares are not necessarily more valuable than common shares. Preferred shares usually have a limit on the amount they can increase in value over time. They are often issued for tax-planning reasons on the advice of an accountant.
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

export default Resource1;

//https://www.ownr.co/blog/guide-to-business-incorporation-in-canada/
//https://www.youtube.com/watch?v=MUpVNTGVIPE