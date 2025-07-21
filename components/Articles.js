import React, { useState } from 'react';

const articles = [
  {
    id: 1,
    title: "Understanding Trust Certification Requirements",
    author: "Trusto Editorial",
    avatar: "https://ui-avatars.com/api/?name=Trusto+Editorial&background=2563EB&color=fff&size=128&rounded=true&bold=true",
    date: "2024-07-17",
    readingTime: "4 min read",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80",
    excerpt:
      "Trust certifications require specific information and formatting to be accepted by financial institutions. Learn the key requirements.",
    content: `
      <section>
        <h2 style='font-size:1.5rem;font-weight:600;margin-top:2rem;'>What is a Trust Certification?</h2>
        <p>A Certification of Trust is a legal document that summarizes key provisions of a trust without revealing private details. Financial institutions typically require this document to verify trust authority for transactions.</p>
        <div class='callout callout-blue'>
          <strong>Key Information Required:</strong>
          <ul>
            <li>Trust name and date of execution</li>
            <li>Names of current trustees</li>
            <li>Trustee powers relevant to the transaction</li>
            <li>Tax identification number (for certain trusts)</li>
            <li>Certification statement and notarization</li>
          </ul>
        </div>
        <h3 style='font-size:1.2rem;font-weight:500;margin-top:2rem;'>State-Specific Requirements</h3>
        <p>Each state has its own legal requirements for trust certifications. California, for example, follows Probate Code Section 18100.5, while other states may have different statutory requirements.</p>
        <h3 style='font-size:1.2rem;font-weight:500;margin-top:2rem;'>Common Requirements</h3>
        <ul>
          <li>Required state-specific statutory language</li>
          <li>Complete trustee power descriptions</li>
          <li>Proper notarization as required by state law</li>
          <li>Current and accurate information</li>
        </ul>
        <div class='callout callout-green'>
          <strong>Best Practice:</strong> Consult with qualified legal counsel to ensure your trust certification meets all applicable requirements.
        </div>
      </section>
    `,
    urgency: "medium",
    category: "Legal"
  },
  {
    id: 2,
    title: "State-Specific Trust Certification Laws",
    author: "Trusto Editorial",
    avatar: "https://ui-avatars.com/api/?name=Trusto+Editorial&background=F59E42&color=fff&size=128&rounded=true&bold=true",
    date: "2024-07-16",
    readingTime: "5 min read",
    image: "https://images.unsplash.com/photo-1515169067865-5387a5b0ef43?auto=format&fit=crop&w=800&q=80",
    excerpt:
      "Trust certification requirements vary by state. Understanding your state's specific laws helps ensure compliance.",
    content: `
      <section>
        <h2 style='font-size:1.5rem;font-weight:600;margin-top:2rem;'>State Law Variations</h2>
        <p>Trust certification requirements are governed by state law, which means the format and content requirements can vary significantly between jurisdictions.</p>
        <div class='callout callout-blue'>
          <strong>Examples of State Requirements:</strong>
          <ul>
            <li><strong>California:</strong> Follows Probate Code Section 18100.5</li>
            <li><strong>Texas:</strong> Governed by Property Code Section 114.086</li>
            <li><strong>New York:</strong> Has specific EPTL requirements</li>
            <li><strong>Florida:</strong> Follows Florida Statutes Chapter 736</li>
          </ul>
        </div>
        <h3 style='font-size:1.2rem;font-weight:500;margin-top:2rem;'>Key Considerations</h3>
        <ul>
          <li>Required statutory language</li>
          <li>Notarization requirements</li>
          <li>Information that must be included or excluded</li>
          <li>Format and presentation standards</li>
        </ul>
        <h3 style='font-size:1.2rem;font-weight:500;margin-top:2rem;'>Working with Financial Institutions</h3>
        <p>Different financial institutions may have their own internal requirements in addition to state law requirements. It's advisable to check with your specific institution about their policies.</p>
        <div class='callout callout-yellow'>
          <strong>Important:</strong> This information is for educational purposes only. Always consult with qualified legal counsel for advice specific to your situation.
        </div>
      </section>
    `,
    urgency: "medium",
    category: "Legal"
  },
  {
    id: 3,
    title: "Common Trust Administration Challenges",
    author: "Trusto Editorial",
    avatar: "https://ui-avatars.com/api/?name=Trusto+Editorial&background=DC2626&color=fff&size=128&rounded=true&bold=true",
    date: "2024-07-15",
    readingTime: "4 min read",
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80",
    excerpt:
      "Trust administration involves various requirements and potential challenges. Understanding these helps ensure smooth operations.",
    content: `
      <section>
        <h2 style='font-size:1.5rem;font-weight:600;margin-top:2rem;'>Trust Administration Basics</h2>
        <p>Trust administration involves managing trust assets and operations according to the trust document and applicable law. Proper documentation is essential for financial transactions.</p>
        <div class='callout callout-blue'>
          <strong>Common Administrative Tasks:</strong>
          <ul>
            <li>Opening and managing bank accounts</li>
            <li>Filing tax returns</li>
            <li>Making distributions to beneficiaries</li>
            <li>Maintaining accurate records</li>
            <li>Providing required notices</li>
          </ul>
        </div>
        <h3 style='font-size:1.2rem;font-weight:500;margin-top:2rem;'>Documentation Requirements</h3>
        <p>Financial institutions typically require specific documentation to verify trust authority, including trust certifications, tax identification numbers, and trustee identification.</p>
        <h3 style='font-size:1.2rem;font-weight:500;margin-top:2rem;'>Best Practices</h3>
        <ul>
          <li>Maintain organized records</li>
          <li>Ensure all required documentation is current</li>
          <li>Work with qualified professionals</li>
          <li>Understand applicable deadlines and requirements</li>
        </ul>
        <div class='callout callout-green'>
          <strong>Recommendation:</strong> Consider working with experienced estate planning attorneys and financial advisors for trust administration matters.
        </div>
      </section>
    `,
    urgency: "medium",
    category: "Administration"
  },
  {
    id: 4,
    title: "Digital Tools for Trust Management",
    author: "Trusto Editorial",
    avatar: "https://ui-avatars.com/api/?name=Trusto+Editorial&background=2563EB&color=fff&size=128&rounded=true&bold=true",
    date: "2024-07-14",
    readingTime: "3 min read",
    image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=800&q=80",
    excerpt:
      "Technology can help streamline various aspects of trust administration and document preparation.",
    content: `
      <section>
        <h2 style='font-size:1.5rem;font-weight:600;margin-top:2rem;'>Technology in Trust Administration</h2>
        <p>Digital tools can assist with various aspects of trust management, from document preparation to record keeping.</p>
        <div class='callout callout-blue'>
          <strong>Potential Applications:</strong>
          <ul>
            <li>Document digitization and storage</li>
            <li>Automated data extraction from trust documents</li>
            <li>Template-based document generation</li>
            <li>Record keeping and reporting</li>
            <li>Compliance tracking</li>
          </ul>
        </div>
        <h3 style='font-size:1.2rem;font-weight:500;margin-top:2rem;'>Benefits and Considerations</h3>
        <ul>
          <li>Improved efficiency and accuracy</li>
          <li>Better organization of documents and records</li>
          <li>Enhanced security through digital storage</li>
          <li>Standardized processes and formats</li>
        </ul>
        <h3 style='font-size:1.2rem;font-weight:500;margin-top:2rem;'>Important Notes</h3>
        <p>While technology can be helpful, it should supplement rather than replace professional legal and financial advice. Always verify that technology-generated documents meet applicable legal requirements.</p>
        <div class='callout callout-yellow'>
          <strong>Remember:</strong> Technology tools should be used in conjunction with qualified professional guidance.
        </div>
      </section>
    `,
    urgency: "low",
    category: "Technology"
  },
  {
    id: 5,
    title: "Electronic Signatures and Remote Notarization",
    author: "Trusto Editorial",
    avatar: "https://ui-avatars.com/api/?name=Trusto+Editorial&background=15803D&color=fff&size=128&rounded=true&bold=true",
    date: "2024-07-13",
    readingTime: "4 min read",
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80",
    excerpt:
      "Electronic signatures and remote notarization are increasingly accepted options for various legal documents.",
    content: `
      <section>
        <h2 style='font-size:1.5rem;font-weight:600;margin-top:2rem;'>Electronic Signature Laws</h2>
        <p>Electronic signatures are generally recognized as legally valid under federal law (Electronic Signatures in Global and National Commerce Act) and state laws (Uniform Electronic Transactions Act).</p>
        <div class='callout callout-blue'>
          <strong>Key Points About Electronic Signatures:</strong>
          <ul>
            <li>Generally accepted for most business transactions</li>
            <li>Must meet certain technical and legal requirements</li>
            <li>Some documents may require traditional signatures</li>
            <li>Acceptance varies by institution and jurisdiction</li>
          </ul>
        </div>
        <h3 style='font-size:1.2rem;font-weight:500;margin-top:2rem;'>Remote Notarization: The Digital Revolution</h3>
        <p>Remote online notarization (RON) has transformed how documents get notarized, especially since the pandemic accelerated digital adoption. Instead of meeting a notary in person, you can now complete the entire process from your computer or mobile device.</p>
        <p>The process works through secure video conferencing platforms that meet strict state requirements. During a RON session, you'll connect with a commissioned notary who verifies your identity using advanced audio-visual technology. This typically involves checking your government-issued ID against facial recognition software and asking you knowledge-based authentication questions.</p>
        <p>One major advantage of RON is the enhanced security compared to traditional notarization. The entire session is recorded and stored, creating a permanent audit trail. Electronic notarial certificates and seals are cryptographically secured, making them much harder to forge than traditional paper stamps.</p>
        <div class='callout callout-blue'>
          <strong>RON vs. Traditional Notarization:</strong> While traditional notarization relies solely on physical presence and visual ID checks, RON combines multiple verification methods including biometric analysis, credential authentication, and knowledge-based questions for enhanced security.
        </div>
        <h3 style='font-size:1.2rem;font-weight:500;margin-top:2rem;'>State-by-State Availability</h3>
        <p>Not all states have authorized RON yet, and those that have may have different requirements. States like Virginia, Texas, and Florida were early adopters, while others have been more cautious. Some states require the notary to be physically located within state borders, while others allow out-of-state notaries if they're commissioned in a RON-authorized state.</p>
        <p>The requirements can also vary significantly. Some states mandate specific technology platforms, retention periods for recordings, or additional insurance coverage for notaries performing RON services.</p>
        <h3 style='font-size:1.2rem;font-weight:500;margin-top:2rem;'>Trust Documents and RON</h3>
        <p>When it comes to trust certifications and other trust-related documents, acceptance of RON varies by financial institution. While the technology is legally valid in many states, banks and investment firms may have their own policies. Some institutions readily accept RON documents, while others still prefer traditional notarization for high-value transactions.</p>
        <p>Before using RON for trust documents, check with the specific financial institutions where you plan to use the documents. This can save time and prevent delays in account openings or transactions.</p>
        <div class='callout callout-yellow'>
          <strong>Bottom Line:</strong> While RON offers convenience and enhanced security, always verify acceptance with the parties who will rely on your notarized documents. When in doubt, consult with legal counsel about specific requirements for your situation.
        </div>
      </section>
    `,
    urgency: "low",
    category: "Legal"
  }
];

const getUrgencyColor = (urgency) => {
  switch (urgency) {
    case 'high': return 'bg-red-100 text-red-800 border-red-200';
    case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    case 'low': return 'bg-green-100 text-green-800 border-green-200';
    default: return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};

const getCategoryColor = (category) => {
  switch (category) {
    case 'Legal': return 'bg-purple-100 text-purple-800';
    case 'Administration': return 'bg-green-100 text-green-800';
    case 'Technology': return 'bg-orange-100 text-orange-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

// Callout styles for prose
const calloutStyles = `
  .callout { margin: 2rem 0; padding: 1.25rem 1rem; border-radius: 0.75rem; font-size: 1rem; }
  .callout-blue { background: #EFF6FF; color: #2563EB; border-left: 4px solid #2563EB; }
  .callout-yellow { background: #FEF9C3; color: #B45309; border-left: 4px solid #F59E42; }
  .callout-red { background: #FEE2E2; color: #B91C1C; border-left: 4px solid #DC2626; }
  .callout-green { background: #DCFCE7; color: #15803D; border-left: 4px solid #22C55E; }
`;

const Articles = () => {
  const [activeArticle, setActiveArticle] = useState(0);
  const article = articles[activeArticle];

  return (
    <div className="max-w-3xl mx-auto p-6">
      <style>{calloutStyles}</style>
      <div className="mb-8 text-center">
        <h2 className="text-4xl font-bold text-gray-900 mb-2 tracking-tight">Trust Education Center</h2>
        <p className="text-lg text-gray-600">Educational resources for trust administration and compliance</p>
      </div>

      {/* Article Navigation */}
      <div className="flex flex-wrap gap-3 mb-8 justify-center">
        {articles.map((a, index) => (
          <button
            key={a.id}
            onClick={() => setActiveArticle(index)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
              activeArticle === index
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {a.title.split(':')[0]}
          </button>
        ))}
      </div>

      {/* Active Article */}
      <article className="bg-white rounded-2xl shadow-lg overflow-hidden mb-12">
        {article.image && (
          <img src={article.image} alt="Article visual" className="w-full h-64 object-cover object-center" style={{maxHeight:'18rem'}} />
        )}
        <div className="p-8 pb-4">
          <div className="flex items-center gap-3 mb-4">
            <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getUrgencyColor(article.urgency)}`}>
              {article.urgency === 'high' ? '🚨 High Priority' : 
               article.urgency === 'medium' ? '⚠️ Medium Priority' : 'ℹ️ Low Priority'}
            </span>
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(article.category)}`}>
              {article.category}
            </span>
            <span className="ml-auto text-xs text-gray-400">
              {article.readingTime || '3 min read'}
            </span>
          </div>
          <div className="flex items-center gap-3 mb-6">
            {article.avatar && (
              <img src={article.avatar} alt={article.author} className="w-10 h-10 rounded-full border border-gray-200" />
            )}
            <div>
              <span className="text-sm text-gray-700 font-medium">{article.author || 'Trusto Editorial'}</span>
              <span className="block text-xs text-gray-400">{article.date || '2024-07-17'}</span>
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2 leading-tight">{article.title}</h1>
          <p className="text-lg text-gray-700 mb-6">{article.excerpt}</p>
          <div 
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />
        </div>
      </article>

      {/* Related Articles */}
      <div className="mt-8">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Related Articles</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {articles.filter((_, index) => index !== activeArticle).slice(0, 2).map((a) => (
            <div key={a.id} className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-2 mb-3">
                <span className={`px-2 py-1 rounded text-xs font-medium ${getCategoryColor(a.category)}`}>{a.category}</span>
                <span className={`px-2 py-1 rounded text-xs font-medium border ${getUrgencyColor(a.urgency)}`}>{a.urgency === 'high' ? '🚨' : a.urgency === 'medium' ? '⚠️' : 'ℹ️'}</span>
              </div>
              <h4 className="font-semibold text-gray-800 mb-2 line-clamp-2">{a.title}</h4>
              <p className="text-gray-600 text-sm line-clamp-3">{a.excerpt}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Articles;