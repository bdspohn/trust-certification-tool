import React, { useState, useEffect } from 'react';
import { fetchBontermsTemplate } from '../../lib/bonterms';

export default function PrivacyPolicy() {
  const [policy, setPolicy] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadPolicy() {
      try {
        const document = await fetchBontermsTemplate('privacy-policy');
        setPolicy(document);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadPolicy();
  }, []);

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto p-8 bg-white rounded-lg shadow mt-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded mb-4"></div>
          <div className="h-4 bg-gray-200 rounded mb-2"></div>
          <div className="h-4 bg-gray-200 rounded mb-2"></div>
          <div className="h-4 bg-gray-200 rounded mb-4"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-3xl mx-auto p-8 bg-white rounded-lg shadow mt-8">
        <h1 className="text-3xl font-bold mb-4 text-red-600">Error Loading Privacy Policy</h1>
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-8 bg-white rounded-lg shadow mt-8">
      <h1 className="text-3xl font-bold mb-4">{policy.title}</h1>
      
      {/* Source attribution */}
      <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <p className="text-sm text-blue-700 font-semibold mb-2">
          📋 Based on Bonterms.com Template
        </p>
        <div className="text-xs text-blue-600 space-y-1">
          <p>Template ID: {policy.meta.templateId}</p>
          <p>Last Updated: {policy.meta.lastUpdated}</p>
          <p>Customized for: {policy.meta.customizedFor}</p>
          <p>Source: <a href="https://bonterms.com" className="underline" target="_blank" rel="noopener noreferrer">bonterms.com</a></p>
        </div>
      </div>

      {/* Render policy content */}
      {policy.content.map((section, index) => (
        <div key={index} className="mb-6">
          {section.section === 'header' && (
            <p className="mb-4 text-sm text-blue-700 font-semibold">{section.content}</p>
          )}
          
          {section.section === 'effective-date' && (
            <p className="mb-4 font-medium">{section.content}</p>
          )}
          
          {section.section === 'introduction' && (
            <p className="mb-6 text-gray-700 leading-relaxed">{section.content}</p>
          )}
          
          {section.title && (
            <>
              <h2 className="text-xl font-semibold mt-6 mb-3 text-gray-900">{section.title}</h2>
              {Array.isArray(section.content) ? (
                <ul className="list-disc ml-6 mb-4 space-y-2">
                  {section.content.map((item, itemIndex) => (
                    <li key={itemIndex} className="text-gray-700 leading-relaxed">{item}</li>
                  ))}
                </ul>
              ) : (
                <p className="mb-4 text-gray-700 leading-relaxed">{section.content}</p>
              )}
            </>
          )}
        </div>
      ))}

      {/* Legal disclaimer */}
      <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
        <p className="text-sm text-yellow-800">
          <strong>Legal Notice:</strong> This document is automatically generated from Bonterms.com templates 
          and customized for Trusto, Inc. For the most current version, please refresh this page. 
          If you have questions about this policy, contact us at legal@trusto.com.
        </p>
      </div>
    </div>
  );
} 