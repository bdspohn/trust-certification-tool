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
    title: "State-Specific Trust Rules: The Compliance Trap Most People Miss",
    author: "Jamie Lee",
    date: "2024-07-16",
    readingTime: "5 min read",
    excerpt:
      "Every state has its own trust certification rules. Here’s how to avoid the most common (and costly) compliance mistakes.",
    content: `
      <section>
        <p><em>By Jamie Lee • July 16, 2024</em></p>
        <h2 style='font-size:1.5rem;font-weight:600;margin-top:2rem;'>One Size Does Not Fit All</h2>
        <p>It’s tempting to use a generic trust certification template. But what works in California could get instantly rejected in Texas or New York. State-specific rules are the #1 reason certifications get bounced back.</p>
        <div style='background:#FEF3C7;padding:1rem;border-radius:0.5rem;margin:2rem 0;'>
          <strong>Key State Differences:</strong>
          <ul style='margin-left:1.5rem;list-style:disc;'>
            <li><strong>California:</strong> Requires statutory language under Probate Code § 18100.5</li>
            <li><strong>Texas:</strong> Needs recording requirements under Prop. Code § 114.086</li>
            <li><strong>New York:</strong> Demands specific certification statements</li>
            <li><strong>Florida:</strong> Unique notarization requirements</li>
            <li><strong>Illinois:</strong> Detailed trustee power descriptions</li>
          </ul>
        </div>
        <h3 style='font-size:1.2rem;font-weight:500;margin-top:2rem;'>The Most Common Mistakes</h3>
        <ul style='margin-left:1.5rem;list-style:disc;'>
          <li>Using a one-size-fits-all template</li>
          <li>Missing state legal citations</li>
          <li>Wrong notarization or recording language</li>
        </ul>
        <blockquote style='border-left:4px solid #2563EB;padding-left:1rem;margin:1.5rem 0;color:#2563EB;font-style:italic;'>
          <strong>“Our bank rejected the form because it didn’t mention Texas Property Code 114.086.”</strong>
        </blockquote>
        <h3 style='font-size:1.2rem;font-weight:500;margin-top:2rem;'>How to Stay Compliant</h3>
        <ol style='margin-left:1.5rem;list-style:decimal;'>
          <li>Always use a template tailored to your state’s laws.</li>
          <li>Double-check for required legal citations and language.</li>
          <li>Ask your financial institution if they have a preferred format.</li>
        </ol>
        <p style='margin-top:2rem;'>
          <strong>Takeaway:</strong> State compliance isn’t optional. It’s the difference between instant approval and weeks of delay.
        </p>
      </section>
    `,
    urgency: "medium",
    category: "Legal"
  },
  {
    id: 3,
    title: "The Real Cost of a Rejected Trust Certification",
    author: "Morgan Patel",
    date: "2024-07-15",
    readingTime: "4 min read",
    excerpt:
      "A rejected trust certification can freeze your assets, delay deals, and cost thousands. Here’s how to avoid the pain.",
    content: `
      <section>
        <p><em>By Morgan Patel • July 15, 2024</em></p>
        <h2 style='font-size:1.5rem;font-weight:600;margin-top:2rem;'>The High Price of a Simple Mistake</h2>
        <p>It’s not just about paperwork. When a trust certification is rejected, the consequences are immediate and expensive. Accounts can be frozen, real estate closings delayed, and legal fees pile up fast.</p>
        <div style='background:#F1F5F9;padding:1rem;border-radius:0.5rem;margin:2rem 0;'>
          <strong>What’s at Stake:</strong>
          <ul style='margin-left:1.5rem;list-style:disc;'>
            <li>Frozen bank and investment accounts</li>
            <li>Missed investment or real estate opportunities</li>
            <li>Additional legal fees for corrections</li>
            <li>Potential tax penalties for delays</li>
          </ul>
        </div>
        <h3 style='font-size:1.2rem;font-weight:500;margin-top:2rem;'>Long-Term Fallout</h3>
        <ul style='margin-left:1.5rem;list-style:disc;'>
          <li>Damaged relationships with banks and advisors</li>
          <li>Increased scrutiny on future trust transactions</li>
          <li>Potential legal liability for trustees</li>
          <li>Stress and time burden on families</li>
        </ul>
        <blockquote style='border-left:4px solid #2563EB;padding-left:1rem;margin:1.5rem 0;color:#2563EB;font-style:italic;'>
          <strong>“We lost access to funds for months because of a missing notary stamp.”</strong>
        </blockquote>
        <h3 style='font-size:1.2rem;font-weight:500;margin-top:2rem;'>How to Protect Yourself</h3>
        <ol style='margin-left:1.5rem;list-style:decimal;'>
          <li>Invest in a professional, state-specific certification template.</li>
          <li>Review all requirements before submitting to a bank or title company.</li>
          <li>Keep originals and notarized copies secure and accessible.</li>
        </ol>
        <p style='margin-top:2rem;'>
          <strong>Bottom line:</strong> The cost of getting it wrong is far higher than the cost of getting it right.
        </p>
      </section>
    `,
    urgency: "high",
    category: "Financial"
  },
  {
    id: 4,
    title: "AI for Trusts: How Document Automation is Changing the Game",
    author: "Taylor Kim",
    date: "2024-07-14",
    readingTime: "3 min read",
    excerpt:
      "AI can now extract trust info and generate compliant certifications in minutes. Here’s how it works—and why it matters.",
    content: `
      <section>
        <p><em>By Taylor Kim • July 14, 2024</em></p>
        <h2 style='font-size:1.5rem;font-weight:600;margin-top:2rem;'>The Rise of AI in Trust Law</h2>
        <p>What used to take hours of manual review can now be done in minutes. AI-powered document processing is transforming how trust certifications are created, reviewed, and approved.</p>
        <div style='background:#E0E7FF;padding:1rem;border-radius:0.5rem;margin:2rem 0;'>
          <strong>How AI-Powered Trust Processing Works:</strong>
          <ul style='margin-left:1.5rem;list-style:disc;'>
            <li>Upload your trust document (PDF, DOC, DOCX)</li>
            <li>AI extracts key information automatically</li>
            <li>Generates a state-specific certification</li>
            <li>Provides confidence scoring for accuracy</li>
            <li>Allows manual review and editing</li>
          </ul>
        </div>
        <h3 style='font-size:1.2rem;font-weight:500;margin-top:2rem;'>Why This Matters</h3>
        <ul style='margin-left:1.5rem;list-style:disc;'>
          <li>Save hours of manual data entry</li>
          <li>Reduce human error in transcription</li>
          <li>Ensure compliance with state requirements</li>
          <li>Generate professional documents instantly</li>
          <li>Maintain privacy and security</li>
        </ul>
        <blockquote style='border-left:4px solid #2563EB;padding-left:1rem;margin:1.5rem 0;color:#2563EB;font-style:italic;'>
          <strong>“Our AI system cut our processing time by 90%.”</strong>
        </blockquote>
        <p style='margin-top:2rem;'>
          <strong>Takeaway:</strong> AI isn’t the future of trust certification—it’s the present. The best firms are already using it.
        </p>
      </section>
    `,
    urgency: "medium",
    category: "Technology"
  },
  {
    id: 5,
    title: "E-Signatures & Online Notarization: What’s Actually Legal?",
    author: "Jordan Chen",
    date: "2024-07-13",
    readingTime: "4 min read",
    excerpt:
      "Electronic signatures and remote notarization are now widely accepted for trust documents. Here’s what you need to know.",
    content: `
      <section>
        <p><em>By Jordan Chen • July 13, 2024</em></p>
        <h2 style='font-size:1.5rem;font-weight:600;margin-top:2rem;'>The New Normal for Trust Signatures</h2>
        <p>Gone are the days when every trust document had to be signed in person. Today, e-signatures and online notarization are accepted in most states—and by most major financial institutions.</p>
        <div style='background:#F1F5F9;padding:1rem;border-radius:0.5rem;margin:2rem 0;'>
          <strong>What’s Legal Now:</strong>
          <ul style='margin-left:1.5rem;list-style:disc;'>
            <li>Electronic signatures are legally binding in all 50 states (ESIGN Act & UETA)</li>
            <li>Remote notarization accepted in 45+ states</li>
            <li>Video call verification with certified notaries</li>
            <li>Instant notary certificates and seals</li>
            <li>Same legal validity as in-person notarization</li>
          </ul>
        </div>
        <h3 style='font-size:1.2rem;font-weight:500;margin-top:2rem;'>Why This Matters</h3>
        <ul style='margin-left:1.5rem;list-style:disc;'>
          <li>Complete the entire process from home</li>
          <li>No need to find a local notary</li>
          <li>Instant document delivery</li>
          <li>Secure and tamper-proof</li>
          <li>24/7 availability</li>
        </ul>
        <blockquote style='border-left:4px solid #2563EB;padding-left:1rem;margin:1.5rem 0;color:#2563EB;font-style:italic;'>
          <strong>“We closed our trust account online in under an hour.”</strong>
        </blockquote>
        <p style='margin-top:2rem;'>
          <strong>Takeaway:</strong> E-signatures and online notarization aren’t just convenient—they’re the new standard for trust certification.
        </p>
      </section>
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