import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Articles() {
  const articles = [
    {
      id: 1,
      title: "Understanding Trust Certification Requirements",
      excerpt: "Learn about the key requirements for trust certification across different financial institutions and legal jurisdictions.",
      date: "2024-01-15",
      readTime: "5 min read",
      category: "Legal Guide"
    },
    {
      id: 2,
      title: "Common Mistakes in Trust Certification",
      excerpt: "Avoid these common pitfalls when preparing trust certification documents for financial institutions.",
      date: "2024-01-10",
      readTime: "4 min read",
      category: "Best Practices"
    },
    {
      id: 3,
      title: "State-Specific Trust Requirements",
      excerpt: "How trust certification requirements vary by state and what you need to know for your jurisdiction.",
      date: "2024-01-05",
      readTime: "7 min read",
      category: "Legal Guide"
    },
    {
      id: 4,
      title: "Digital Signatures and Remote Notarization",
      excerpt: "Modern approaches to signing and notarizing trust certification documents in the digital age.",
      date: "2024-01-01",
      readTime: "6 min read",
      category: "Technology"
    }
  ];

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6 md:p-10">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Trust Certification Articles
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Expert insights, legal guides, and best practices for trust certification
          </p>
        </div>

        {/* Articles Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {articles.map((article) => (
            <article key={article.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                    {article.category}
                  </span>
                  <span className="text-sm text-gray-500">{article.readTime}</span>
                </div>
                <h2 className="text-xl font-semibold text-gray-900 mb-3 line-clamp-2">
                  {article.title}
                </h2>
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {article.excerpt}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">
                    {new Date(article.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </span>
                  <Link href={`/articles/${article.id}`}>
                    <Button variant="outline" size="sm">
                      Read More
                    </Button>
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Newsletter Signup */}
        <div className="mt-16 bg-white rounded-xl shadow-lg p-8 text-center">
          <h3 className="text-2xl font-semibold text-gray-900 mb-4">
            Stay Updated
          </h3>
          <p className="text-gray-600 mb-6 max-w-md mx-auto">
            Get notified about new articles, legal updates, and trust certification best practices.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <Button className="bg-blue-600 hover:bg-blue-700">
              Subscribe
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
} 