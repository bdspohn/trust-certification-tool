import React, { useState } from 'react';

const Articles = () => {
  const [activeArticle, setActiveArticle] = useState(0);

  const articles = [
    {
      id: 1,
      title: "Financial Institutions Are Rejecting 40% of Trust Certifications",
      excerpt: "New compliance requirements are causing widespread rejection of incomplete or incorrect Certification of Trust documents.",
      content: `
        <h3>The Growing Problem</h3>
        <p>Financial institutions are implementing stricter requirements for Certification of Trust documents, leading to a 40% rejection rate for incomplete or incorrectly formatted submissions. This trend is causing significant delays and frustration for trust administrators.</p>
        
        <h3>Common Rejection Reasons</h3>
        <ul>
          <li>Missing trustee powers or incomplete power descriptions</li>
          <li>Incorrect state-specific legal language</li>
          <li>Missing tax identification information for irrevocable trusts</li>
          <li>Outdated or inconsistent formatting</li>
          <li>Missing certification statements required by state law</li>
        </ul>
        
        <h3>Why This Matters</h3>
        <p>Rejected certifications can lead to:</p>
        <ul>
          <li>Frozen bank accounts and investment accounts</li>
          <li>Delayed real estate transactions</li>
          <li>Increased legal fees for corrections</li>
          <li>Missed investment opportunities</li>
          <li>Stress and frustration for trustees and beneficiaries</li>
        </ul>
        
        <h3>The Solution</h3>
        <p>Using a professional, state-specific Certification of Trust template that includes all required elements can dramatically reduce rejection rates and ensure smooth transactions with financial institutions.</p>
      `,
      urgency: "high",
      category: "Compliance"
    },
    {
      id: 2,
      title: "State-Specific Requirements: What You Need to Know",
      excerpt: "Each state has unique legal requirements for Certification of Trust documents that must be followed exactly.",
      content: `
        <h3>State Variations Matter</h3>
        <p>Certification of Trust requirements vary significantly by state, and using the wrong format can result in immediate rejection by financial institutions.</p>
        
        <h3>Key State Differences</h3>
        <ul>
          <li><strong>California:</strong> Requires specific language under CA Probate Code § 18100.5</li>
          <li><strong>Texas:</strong> Must include recording requirements under TX Prop. Code § 114.086</li>
          <li><strong>New York:</strong> Requires specific certification statements</li>
          <li><strong>Florida:</strong> Has unique notarization requirements</li>
          <li><strong>Illinois:</strong> Requires specific trustee power descriptions</li>
        </ul>
        
        <h3>Common Mistakes</h3>
        <ul>
          <li>Using a generic template for all states</li>
          <li>Missing state-specific legal citations</li>
          <li>Incorrect recording requirements</li>
          <li>Wrong notarization language</li>
        </ul>
        
        <h3>Why Professional Templates Matter</h3>
        <p>State-specific templates ensure compliance with local laws and reduce the risk of rejection by financial institutions that are familiar with their state's requirements.</p>
      `,
      urgency: "medium",
      category: "Legal"
    },
    {
      id: 3,
      title: "The Hidden Costs of Incorrect Trust Certifications",
      excerpt: "Beyond rejection, incorrect certifications can lead to significant financial and legal consequences.",
      content: `
        <h3>Immediate Financial Impact</h3>
        <p>Rejected trust certifications can have immediate financial consequences:</p>
        <ul>
          <li>Frozen accounts preventing access to funds</li>
          <li>Missed investment opportunities due to delays</li>
          <li>Additional legal fees for corrections</li>
          <li>Potential tax penalties for delayed transactions</li>
        </ul>
        
        <h3>Long-term Consequences</h3>
        <ul>
          <li>Damaged relationships with financial institutions</li>
          <li>Increased scrutiny on future trust transactions</li>
          <li>Potential legal liability for trustees</li>
          <li>Stress and time burden on family members</li>
        </ul>
        
        <h3>Prevention is Key</h3>
        <p>Investing in a proper Certification of Trust from the beginning can save thousands in legal fees and prevent months of delays. Professional templates ensure compliance and acceptance.</p>
        
        <h3>Real Examples</h3>
        <p>Recent cases show that families have lost access to trust funds for months due to incorrect certifications, leading to missed mortgage payments, delayed medical procedures, and other financial hardships.</p>
      `,
      urgency: "high",
      category: "Financial"
    },
    {
      id: 4,
      title: "AI-Powered Document Processing: The Future is Here",
      excerpt: "New technology can automatically extract trust information and generate compliant certifications in minutes.",
      content: `
        <h3>The AI Revolution</h3>
        <p>Advanced artificial intelligence can now automatically extract information from trust documents and generate compliant Certification of Trust documents in minutes, not hours.</p>
        
        <h3>How It Works</h3>
        <ul>
          <li>Upload your trust document (PDF, DOC, DOCX)</li>
          <li>AI extracts key information automatically</li>
          <li>Generates state-specific certification</li>
          <li>Provides confidence scoring for accuracy</li>
          <li>Allows manual review and editing</li>
        </ul>
        
        <h3>Benefits</h3>
        <ul>
          <li>Save hours of manual data entry</li>
          <li>Reduce human error in transcription</li>
          <li>Ensure compliance with state requirements</li>
          <li>Generate professional documents instantly</li>
          <li>Maintain privacy and security</li>
        </ul>
        
        <h3>Accuracy and Reliability</h3>
        <p>Modern AI systems achieve 95%+ accuracy in extracting trust information, with human review ensuring 100% accuracy for critical legal documents.</p>
      `,
      urgency: "medium",
      category: "Technology"
    },
    {
      id: 5,
      title: "E-Signature and Online Notarization: What's Legal Now",
      excerpt: "Electronic signatures and remote notarization are now widely accepted for trust documents.",
      content: `
        <h3>Electronic Signatures Are Legally Binding</h3>
        <p>Electronic signatures on Certification of Trust documents are legally binding in all 50 states under the Electronic Signatures in Global and National Commerce Act (ESIGN) and state UETA laws.</p>
        
        <h3>Online Notarization Acceptance</h3>
        <ul>
          <li>Remote notarization accepted in 45+ states</li>
          <li>Video call verification with certified notaries</li>
          <li>Instant notary certificates and seals</li>
          <li>Same legal validity as in-person notarization</li>
        </ul>
        
        <h3>Financial Institution Acceptance</h3>
        <p>Most major financial institutions now accept electronically signed and remotely notarized trust certifications, including:</p>
        <ul>
          <li>All major banks (Chase, Bank of America, Wells Fargo)</li>
          <li>Investment firms (Fidelity, Vanguard, Charles Schwab)</li>
          <li>Credit unions and regional banks</li>
          <li>Real estate and title companies</li>
        </ul>
        
        <h3>Benefits of Electronic Processing</h3>
        <ul>
          <li>Complete the entire process from home</li>
          <li>No need to find a local notary</li>
          <li>Instant document delivery</li>
          <li>Secure and tamper-proof</li>
          <li>24/7 availability</li>
        </ul>
      `,
      urgency: "medium",
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
      case 'Compliance': return 'bg-blue-100 text-blue-800';
      case 'Legal': return 'bg-purple-100 text-purple-800';
      case 'Financial': return 'bg-green-100 text-green-800';
      case 'Technology': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Latest Trust Certification News & Insights</h2>
        <p className="text-lg text-gray-600">
          Stay informed about the latest requirements, trends, and best practices
        </p>
      </div>

      {/* Article Navigation */}
      <div className="flex flex-wrap gap-3 mb-8 justify-center">
        {articles.map((article, index) => (
          <button
            key={article.id}
            onClick={() => setActiveArticle(index)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
              activeArticle === index
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {article.title.split(':')[0]}
          </button>
        ))}
      </div>

      {/* Active Article */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="p-8">
          <div className="flex items-center gap-3 mb-4">
            <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getUrgencyColor(articles[activeArticle].urgency)}`}>
              {articles[activeArticle].urgency === 'high' ? '🚨 High Priority' : 
               articles[activeArticle].urgency === 'medium' ? '⚠️ Medium Priority' : 'ℹ️ Low Priority'}
            </span>
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(articles[activeArticle].category)}`}>
              {articles[activeArticle].category}
            </span>
          </div>

          <h3 className="text-2xl font-bold text-gray-800 mb-4">
            {articles[activeArticle].title}
          </h3>

          <p className="text-gray-600 mb-6 text-lg">
            {articles[activeArticle].excerpt}
          </p>

          <div 
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: articles[activeArticle].content }}
          />

          {/* Call to Action */}
          <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200">
            <h4 className="font-semibold text-gray-800 mb-2">Ready to Create Your Certification of Trust?</h4>
            <p className="text-gray-600 mb-4">
              Don't risk delays or rejections. Use our state-specific templates and AI-powered processing to create a compliant Certification of Trust in minutes.
            </p>
            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition">
              Get Started Now
            </button>
          </div>
        </div>
      </div>

      {/* Related Articles */}
      <div className="mt-8">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Related Articles</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.filter((_, index) => index !== activeArticle).slice(0, 3).map((article) => (
            <div key={article.id} className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-2 mb-3">
                <span className={`px-2 py-1 rounded text-xs font-medium ${getCategoryColor(article.category)}`}>
                  {article.category}
                </span>
                <span className={`px-2 py-1 rounded text-xs font-medium border ${getUrgencyColor(article.urgency)}`}>
                  {article.urgency === 'high' ? '🚨' : article.urgency === 'medium' ? '⚠️' : 'ℹ️'}
                </span>
              </div>
              <h4 className="font-semibold text-gray-800 mb-2 line-clamp-2">
                {article.title}
              </h4>
              <p className="text-gray-600 text-sm line-clamp-3">
                {article.excerpt}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Articles; 