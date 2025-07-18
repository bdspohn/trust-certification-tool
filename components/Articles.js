import React, { useState } from 'react';

const articles = [
  {
    id: 1,
    title: "Why 40% of Trust Certifications Get Rejected (And How to Avoid It)",
    author: "Alex Morgan",
    date: "2024-07-17",
    readingTime: "4 min read",
    excerpt:
      "Financial institutions are quietly tightening the rules. Here’s what’s really happening behind the scenes—and how to make sure your trust certification gets accepted the first time.",
    content: `
      <section>
        <p><em>By Alex Morgan • July 17, 2024</em></p>
        <h2 style='font-size:1.5rem;font-weight:600;margin-top:2rem;'>The Hidden Bottleneck</h2>
        <p>Picture this: You’re at the bank, ready to move assets, and the teller glances at your Certification of Trust. She frowns. “I’m sorry, we can’t accept this.” Suddenly, your accounts are frozen, your transaction is delayed, and you’re left scrambling for answers.</p>
        <blockquote style='border-left:4px solid #2563EB;padding-left:1rem;margin:1.5rem 0;color:#2563EB;font-style:italic;'>
          <strong>40% of trust certifications are rejected on the first submission.</strong>
        </blockquote>
        <h3 style='font-size:1.2rem;font-weight:500;margin-top:2rem;'>Why So Many Get Rejected?</h3>
        <ul style='margin-left:1.5rem;list-style:disc;'>
          <li>Missing or vague trustee powers</li>
          <li>Incorrect or absent state-specific legal language</li>
          <li>Outdated formatting or missing certification statements</li>
          <li>Failure to include tax identification for irrevocable trusts</li>
        </ul>
        <h3 style='font-size:1.2rem;font-weight:500;margin-top:2rem;'>The Real-World Impact</h3>
        <p>Rejected certifications don’t just cause paperwork headaches. They can freeze access to funds, delay real estate closings, and even trigger legal fees or lost investment opportunities. For families, it’s more than an inconvenience—it’s a source of real stress.</p>
        <div style='background:#F1F5F9;padding:1rem;border-radius:0.5rem;margin:2rem 0;'>
          <strong>What You Need to Know:</strong>
          <ul style='margin-left:1.5rem;list-style:disc;'>
            <li>Every state has unique requirements. A generic template won’t cut it.</li>
            <li>Financial institutions are increasingly strict about compliance.</li>
            <li>Professional, state-specific templates dramatically reduce rejection risk.</li>
          </ul>
        </div>
        <h3 style='font-size:1.2rem;font-weight:500;margin-top:2rem;'>How to Get It Right (The First Time)</h3>
        <ol style='margin-left:1.5rem;list-style:decimal;'>
          <li>Use a template that matches your state’s exact legal requirements.</li>
          <li>Double-check that all trustee powers and required statements are included.</li>
          <li>Have the document reviewed and notarized as required by your state.</li>
        </ol>
        <p style='margin-top:2rem;'>
          <strong>Bottom line:</strong> Don’t risk delays or denials. With the right approach, you can ensure your Certification of Trust is accepted the first time—no stress, no surprises.
        </p>
      </section>
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

const Articles = () => {
  const [activeArticle, setActiveArticle] = useState(0);
  const article = articles[activeArticle];

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="mb-8 text-center">
        <h2 className="text-4xl font-bold text-gray-900 mb-2 tracking-tight">Trust Insights & Guides</h2>
        <p className="text-lg text-gray-600">Expert advice, urgent updates, and best practices for trust certification</p>
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
          <h1 className="text-3xl font-bold text-gray-900 mb-2 leading-tight">{article.title}</h1>
          <div className="flex items-center gap-2 mb-6">
            <span className="text-sm text-gray-500">By {article.author || 'Trusto Editorial'}</span>
            <span className="text-xs text-gray-400">• {article.date || '2024-07-17'}</span>
          </div>
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