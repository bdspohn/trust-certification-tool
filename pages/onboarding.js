import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';

export default function Onboarding() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    role: '',
    useCase: '',
    volume: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    // In production, this would send to your email service
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Store lead data locally for now
      const leads = JSON.parse(localStorage.getItem('trustoLeads') || '[]');
      leads.push({
        ...formData,
        timestamp: new Date().toISOString(),
        source: 'website_onboarding'
      });
      localStorage.setItem('trustoLeads', JSON.stringify(leads));
      
      setSubmitted(true);
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
        <Head>
          <title>Thank You - Trusto</title>
        </Head>
        
        <nav className="bg-white/95 backdrop-blur-sm shadow-sm border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <Link href="/" className="flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <div className="text-white text-sm font-bold">T</div>
                </div>
                <span className="text-xl font-bold text-slate-900">Trusto<span className="text-blue-600">.Inc</span></span>
              </Link>
            </div>
          </div>
        </nav>

        <div className="max-w-2xl mx-auto px-4 py-16 text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          
          <h1 className="text-3xl font-bold text-slate-900 mb-4">Thank You!</h1>
          <p className="text-lg text-slate-600 mb-8">
            We've received your information and will be in touch within 24 hours to discuss how Trusto can transform your trust operations.
          </p>
          
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
            <h3 className="font-semibold text-blue-900 mb-2">What happens next?</h3>
            <ul className="text-left text-blue-800 space-y-2">
              <li>• Our team will review your requirements</li>
              <li>• We'll schedule a personalized demo</li>
              <li>• You'll receive documentation about our platform</li>
              <li>• We'll discuss implementation timeline and pricing</li>
            </ul>
          </div>
          
          <Link href="/" className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <Head>
        <title>Get Started - Trusto</title>
        <meta name="description" content="Transform your trust operations with Trusto. Schedule a demo to see how we make trust assets as liquid as cash." />
      </Head>

      <nav className="bg-white/95 backdrop-blur-sm shadow-sm border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <div className="text-white text-sm font-bold">T</div>
              </div>
              <span className="text-xl font-bold text-slate-900">Trusto<span className="text-blue-600">.Inc</span></span>
            </Link>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left Column - Value Props */}
          <div className="lg:pr-8">
            <h1 className="text-4xl font-bold text-slate-900 mb-6">
              Ready to Make Trust Assets 
              <span className="block text-blue-600">as Liquid as Cash?</span>
            </h1>
            
            <p className="text-lg text-slate-600 mb-8">
              Join forward-thinking financial institutions transforming how they handle trust operations. 
              Our platform eliminates weeks of paperwork and unlocks massive deposit opportunities.
            </p>

            <div className="space-y-6 mb-8">
              <div className="flex items-start">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0 mr-4">
                  <span className="text-xl">⚡</span>
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 mb-1">Instant Verification</h3>
                  <p className="text-slate-600">Transform weeks of paperwork into minutes with AI-powered processing</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0 mr-4">
                  <span className="text-xl">💰</span>
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 mb-1">$84T Market Opportunity</h3>
                  <p className="text-slate-600">Capture high-value trust deposits your competitors are missing</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0 mr-4">
                  <span className="text-xl">🔗</span>
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 mb-1">Seamless Integration</h3>
                  <p className="text-slate-600">API-first platform integrates with your existing systems</p>
                </div>
              </div>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <p className="text-sm text-yellow-800">
                <strong>Limited Beta Access:</strong> We're onboarding select institutions for our beta program. 
                Early partners receive preferential pricing and direct input on feature development.
              </p>
            </div>
          </div>

          {/* Right Column - Form */}
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-slate-200">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Let's Talk About Your Needs</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="John Smith"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
                  Work Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="john@institution.com"
                />
              </div>

              <div>
                <label htmlFor="company" className="block text-sm font-medium text-slate-700 mb-2">
                  Institution Name *
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  required
                  value={formData.company}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="First National Bank"
                />
              </div>

              <div>
                <label htmlFor="role" className="block text-sm font-medium text-slate-700 mb-2">
                  Your Role *
                </label>
                <select
                  id="role"
                  name="role"
                  required
                  value={formData.role}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select your role</option>
                  <option value="executive">Executive (C-Suite)</option>
                  <option value="trust_officer">Trust Officer</option>
                  <option value="operations">Operations Manager</option>
                  <option value="technology">Technology/IT</option>
                  <option value="compliance">Compliance/Legal</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label htmlFor="useCase" className="block text-sm font-medium text-slate-700 mb-2">
                  Primary Use Case *
                </label>
                <select
                  id="useCase"
                  name="useCase"
                  required
                  value={formData.useCase}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select primary need</option>
                  <option value="trust_verification">Trust Verification & Certification</option>
                  <option value="account_opening">Trust Account Opening</option>
                  <option value="compliance">Compliance & Documentation</option>
                  <option value="api_integration">API Integration</option>
                  <option value="multiple">Multiple Use Cases</option>
                </select>
              </div>

              <div>
                <label htmlFor="volume" className="block text-sm font-medium text-slate-700 mb-2">
                  Monthly Trust Volume
                </label>
                <select
                  id="volume"
                  name="volume"
                  value={formData.volume}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select volume range</option>
                  <option value="0-50">0-50 trusts/month</option>
                  <option value="50-200">50-200 trusts/month</option>
                  <option value="200-500">200-500 trusts/month</option>
                  <option value="500+">500+ trusts/month</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-2">
                  Tell us about your specific needs (optional)
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="What challenges are you facing with trust operations? What would success look like for your institution?"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 text-white py-4 rounded-lg font-semibold hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Submitting...' : 'Schedule Demo'}
              </button>

              <p className="text-xs text-slate-500 text-center">
                By submitting this form, you agree to our privacy policy and terms of service.
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}