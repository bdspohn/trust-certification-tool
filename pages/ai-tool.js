import React, { useState } from "react";
import { Button } from "@/components/ui/button";

export default function AITool() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    useCase: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Store demo request
    const requests = JSON.parse(localStorage.getItem('demoRequests') || '[]');
    requests.push({
      ...formData,
      timestamp: new Date().toISOString(),
      source: 'ai-tool-page'
    });
    localStorage.setItem('demoRequests', JSON.stringify(requests));
    setSubmitted(true);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6 md:p-10">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            AI-Powered Trust Certification
          </h1>
          <p className="text-lg text-gray-600">
            Upload your trust document and let AI extract the information automatically
          </p>
        </div>

        {/* Main Container */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* Coming Soon Notice */}
          <div className="text-center mb-8 p-6 bg-yellow-50 border border-yellow-200 rounded-lg">
            <h2 className="text-2xl font-semibold text-yellow-800 mb-2">
              🚀 Coming Soon
            </h2>
            <p className="text-yellow-700">
              Our AI-powered trust certification tool is currently in development. 
              This feature will allow you to upload your trust document and automatically 
              generate a certification form for review and editing.
            </p>
          </div>

          {/* Security Notice */}
          <div className="mb-8 p-6 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-start">
              <div className="text-red-500 mr-3">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-red-800 mb-2">
                  Document Upload Temporarily Disabled
                </h3>
                <p className="text-red-700">
                  For security and legal compliance reasons, document upload functionality is currently disabled. 
                  We are working on enhanced security measures to protect your sensitive trust documents.
                </p>
              </div>
            </div>
          </div>

          {/* Demo Request Form */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Request a Demo
            </h3>
            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">
                    Company/Organization
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label htmlFor="useCase" className="block text-sm font-medium text-gray-700 mb-1">
                    How would you use the AI tool?
                  </label>
                  <textarea
                    id="useCase"
                    name="useCase"
                    rows={3}
                    value={formData.useCase}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Tell us about your trust certification needs..."
                  />
                </div>
                <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
                  Request Demo Access
                </Button>
              </form>
            ) : (
              <div className="text-center p-6 bg-green-50 border border-green-200 rounded-lg">
                <div className="text-green-600 mb-3">
                  <svg className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h4 className="text-lg font-semibold text-green-800 mb-2">
                  Demo Request Received!
                </h4>
                <p className="text-green-700">
                  Thank you for your interest. We'll contact you within 24 hours to schedule a personalized demo.
                </p>
              </div>
            )}
          </div>

          {/* Features Preview */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-2">AI Extraction</h4>
              <p className="text-gray-600 text-sm">
                Our AI will automatically extract trust name, date, trustees, powers, 
                and other key information from your document.
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-2">Review & Edit</h4>
              <p className="text-gray-600 text-sm">
                Review the extracted information and make any necessary edits 
                before generating your certification.
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-2">Universal Format</h4>
              <p className="text-gray-600 text-sm">
                Generate certifications compatible with all major financial 
                institutions and legal requirements.
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-2">E-Signature Ready</h4>
              <p className="text-gray-600 text-sm">
                Export your certification for manual signature, e-signature, 
                or remote notarization.
              </p>
            </div>
          </div>

          {/* Alternative Options */}
          <div className="text-center p-6 bg-gray-50 rounded-lg">
            <h4 className="font-semibold text-gray-900 mb-3">
              Alternative Options Available Now:
            </h4>
            <div className="space-y-2 text-gray-600">
              <p>• Use our <a href="/tool" className="text-blue-600 hover:underline">Manual Entry Tool</a> to create trust certifications</p>
              <p>• <a href="/contact" className="text-blue-600 hover:underline">Contact us</a> for enterprise solutions with secure document handling</p>
              <p>• View our <a href="/api-docs" className="text-blue-600 hover:underline">API documentation</a> for integration options</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 