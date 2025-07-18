// LEGAL DOC RULE: Always check Bonterms.com for a template before drafting any legal document (Privacy Policy, Terms, DPA, NDA, etc.). If available, use and customize for Trusto.com. If not, use a best-in-class open-source template and note the source.

import React, { useState } from 'react';
import CertificationStripeFlow from './certification';
import AIDocumentProcessor from '../components/AIDocumentProcessor';
import dynamic from 'next/dynamic';

const ESignatureIntegration = dynamic(() => import('../components/ESignatureIntegrationClient'), {
  ssr: false,
  loading: () => <div className="text-center p-8">Loading signature options...</div>
});
import Articles from '../components/Articles';
import Head from 'next/head';
import Link from 'next/link';

export default function Home() {
  const [currentStep, setCurrentStep] = useState('landing');
  const [extractedData, setExtractedData] = useState(null);
  const [formData, setFormData] = useState(null);

  const handleDataExtracted = (data) => {
    setExtractedData(data);
    setCurrentStep('form');
  };

  const handleFormSubmitted = (data) => {
    setFormData(data);
    setCurrentStep('signature');
  };

  const handleSignatureComplete = () => {
    setCurrentStep('articles');
  };

  const renderStep = () => {
    switch (currentStep) {
      case 'landing':
        return <LandingPage onGetStarted={() => setCurrentStep('ai')} />;
      case 'ai':
        return <AIDocumentProcessor onDataExtracted={handleDataExtracted} />;
      case 'form':
        return <CertificationStripeFlow prefillData={extractedData} onSubmit={handleFormSubmitted} />;
      case 'signature':
        return <ESignatureIntegration formData={formData} onComplete={handleSignatureComplete} />;
      case 'articles':
        return <Articles />;
      default:
        return <LandingPage onGetStarted={() => setCurrentStep('ai')} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>Trusto.Inc - Enterprise Trust Infrastructure Platform | Bank-Grade Certification Solutions</title>
        <meta name="description" content="Enterprise trust certification platform powering compliant transactions for banks, credit unions, and wealth managers. API-first architecture with SOC 2 security and 99% bank acceptance rate." />
        <meta name="keywords" content="trust certification, financial institutions, bank compliance, trust infrastructure, API platform, SOC 2, fintech" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* Enhanced Navigation */}
      <nav className="bg-white/95 backdrop-blur-sm shadow-sm border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <div className="text-white text-sm font-bold">T</div>
              </div>
              <span className="text-xl font-bold text-slate-900 tracking-tight">Trusto<span className="text-blue-600">.Inc</span></span>
            </div>
            <div className="flex items-center space-x-6">
              <button 
                onClick={() => setCurrentStep('landing')}
                className="text-slate-600 hover:text-slate-900 font-medium transition-colors"
              >
                Platform
              </button>
              <button 
                onClick={() => setCurrentStep('articles')}
                className="text-slate-600 hover:text-slate-900 font-medium transition-colors"
              >
                Resources
              </button>
              <div className="text-slate-600 hover:text-slate-900 font-medium transition-colors cursor-pointer">
                Pricing
              </div>
              <button 
                onClick={() => setCurrentStep('ai')}
                className="bg-blue-600 text-white px-6 py-2.5 rounded-lg hover:bg-blue-700 font-semibold transition-all shadow-md hover:shadow-lg"
              >
                Start Free Trial
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main>
        {renderStep()}
      </main>

      {/* Enhanced Footer */}
      <footer className="bg-slate-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            <div className="flex flex-col items-start">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <div className="text-white text-sm font-bold">T</div>
                </div>
                <h3 className="text-lg font-semibold">Trusto<span className="text-blue-400">.Inc</span></h3>
              </div>
              <p className="text-slate-300 text-sm leading-relaxed mb-6">
                Enterprise trust infrastructure platform powering compliant transactions for financial institutions worldwide.
              </p>
              <div className="flex space-x-4">
                <div className="w-8 h-8 bg-slate-800 rounded-lg flex items-center justify-center cursor-pointer hover:bg-slate-700 transition-colors">
                  <span className="text-sm">in</span>
                </div>
                <div className="w-8 h-8 bg-slate-800 rounded-lg flex items-center justify-center cursor-pointer hover:bg-slate-700 transition-colors">
                  <span className="text-sm">tw</span>
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-white">Platform</h4>
              <ul className="text-sm text-slate-300 space-y-3">
                <li className="hover:text-white transition-colors cursor-pointer">AI Document Processing</li>
                <li className="hover:text-white transition-colors cursor-pointer">API Integration</li>
                <li className="hover:text-white transition-colors cursor-pointer">E-Signature Platform</li>
                <li className="hover:text-white transition-colors cursor-pointer">Compliance Engine</li>
                <li className="hover:text-white transition-colors cursor-pointer">Enterprise Dashboard</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-white">Resources</h4>
              <ul className="text-sm text-slate-300 space-y-3">
                <li className="hover:text-white transition-colors cursor-pointer">Documentation</li>
                <li className="hover:text-white transition-colors cursor-pointer">API Reference</li>
                <li className="hover:text-white transition-colors cursor-pointer">Trust Law Updates</li>
                <li className="hover:text-white transition-colors cursor-pointer">Best Practices</li>
                <li className="hover:text-white transition-colors cursor-pointer">Case Studies</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-white">Company</h4>
              <ul className="text-sm text-slate-300 space-y-3">
                <li><Link href="/legal/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                <li><Link href="/legal/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
                <li className="hover:text-white transition-colors cursor-pointer">Security</li>
                <li className="hover:text-white transition-colors cursor-pointer">Support</li>
                <li className="hover:text-white transition-colors cursor-pointer">Contact</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-slate-800 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="text-sm text-slate-400 mb-4 md:mb-0">
                <p>&copy; 2024 Trusto.Inc. All rights reserved. SOC 2 Type II Certified.</p>
              </div>
              <div className="flex space-x-6 text-sm text-slate-400">
                <span className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                  All systems operational
                </span>
                <span>99.9% uptime</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

const LandingPage = ({ onGetStarted }) => {
  return (
    <div className="bg-gradient-to-b from-slate-50 to-white">
      {/* Enterprise Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-20">
          <div className="mb-6">
            <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-blue-100 text-blue-800 mb-6">
              🏆 99% Bank Acceptance Rate
            </span>
          </div>
          <h1 className="text-5xl lg:text-6xl font-bold text-slate-900 mb-6 leading-tight">
            Trust Infrastructure
            <span className="block text-blue-600">for Financial Services</span>
          </h1>
          <p className="text-xl text-slate-600 mb-8 max-w-4xl mx-auto leading-relaxed">
            Enterprise-grade trust certification platform powering compliant transactions for banks, 
            credit unions, and wealth managers. API-first architecture with SOC 2 security.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <button
              onClick={onGetStarted}
              className="bg-blue-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-blue-700 transition-all shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
            >
              Start Free Trial
            </button>
            <button className="border-2 border-slate-300 text-slate-700 px-8 py-4 rounded-xl text-lg font-semibold hover:bg-slate-50 transition-all">
              Schedule Demo
            </button>
          </div>
          <p className="text-sm text-slate-500">
            No credit card required • Enterprise support available • GDPR compliant
          </p>
        </div>

        {/* Social Proof */}
        <div className="mb-20">
          <p className="text-center text-slate-500 mb-8 font-medium">Trusted by financial institutions</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center opacity-60">
            <div className="flex items-center justify-center">
              <div className="text-2xl font-bold text-slate-400">REGIONAL BANK</div>
            </div>
            <div className="flex items-center justify-center">
              <div className="text-2xl font-bold text-slate-400">CREDIT UNION</div>
            </div>
            <div className="flex items-center justify-center">
              <div className="text-2xl font-bold text-slate-400">WEALTH MGMT</div>
            </div>
            <div className="flex items-center justify-center">
              <div className="text-2xl font-bold text-slate-400">TRUST BANK</div>
            </div>
          </div>
        </div>
      </div>

      {/* Problem-Solution Comparison */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          <div className="bg-red-50 border border-red-200 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-red-800 mb-6">Traditional Process</h3>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="text-red-500 mr-3 mt-1">❌</div>
                <div>
                  <p className="font-semibold text-red-800">2-4 Week Processing</p>
                  <p className="text-red-600 text-sm">Manual legal review creates bottlenecks</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="text-red-500 mr-3 mt-1">❌</div>
                <div>
                  <p className="font-semibold text-red-800">40% Rejection Rate</p>
                  <p className="text-red-600 text-sm">Incomplete or incorrect documentation</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="text-red-500 mr-3 mt-1">❌</div>
                <div>
                  <p className="font-semibold text-red-800">$500-2,000 Cost</p>
                  <p className="text-red-600 text-sm">Attorney fees and processing delays</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-green-50 border border-green-200 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-green-800 mb-6">Trusto Platform</h3>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="text-green-500 mr-3 mt-1">✅</div>
                <div>
                  <p className="font-semibold text-green-800">Same-Day Processing</p>
                  <p className="text-green-600 text-sm">AI-powered extraction and validation</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="text-green-500 mr-3 mt-1">✅</div>
                <div>
                  <p className="font-semibold text-green-800">99% Acceptance Rate</p>
                  <p className="text-green-600 text-sm">Bank-compliant formatting and validation</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="text-green-500 mr-3 mt-1">✅</div>
                <div>
                  <p className="font-semibold text-green-800">$50-200 Cost</p>
                  <p className="text-green-600 text-sm">Automated processing reduces overhead</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ROI Calculator */}
        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-8 mb-20">
          <h3 className="text-2xl font-bold text-blue-800 mb-6 text-center">Enterprise ROI Calculator</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">10,000</div>
              <p className="text-blue-800 font-semibold">Annual Certifications</p>
              <p className="text-blue-600 text-sm">Large regional bank volume</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">$8.7M</div>
              <p className="text-blue-800 font-semibold">Annual Cost Savings</p>
              <p className="text-blue-600 text-sm">vs. traditional processing</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">87%</div>
              <p className="text-blue-800 font-semibold">Cost Reduction</p>
              <p className="text-blue-600 text-sm">Immediate operational impact</p>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="text-center p-8 bg-white rounded-2xl shadow-lg border border-slate-200">
            <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <div className="text-2xl">🤖</div>
            </div>
            <h3 className="text-xl font-semibold mb-4 text-slate-900">AI-Powered Extraction</h3>
            <p className="text-slate-600 leading-relaxed">
              Advanced ML models extract trust information with 95%+ accuracy. Multi-format support for PDF, DOCX, and text documents.
            </p>
          </div>
          <div className="text-center p-8 bg-white rounded-2xl shadow-lg border border-slate-200">
            <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <div className="text-2xl">🏛️</div>
            </div>
            <h3 className="text-xl font-semibold mb-4 text-slate-900">Bank-Grade Compliance</h3>
            <p className="text-slate-600 leading-relaxed">
              SOC 2 certified platform with 50-state legal compliance. Templates accepted by major financial institutions.
            </p>
          </div>
          <div className="text-center p-8 bg-white rounded-2xl shadow-lg border border-slate-200">
            <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <div className="text-2xl">⚡</div>
            </div>
            <h3 className="text-xl font-semibold mb-4 text-slate-900">API-First Architecture</h3>
            <p className="text-slate-600 leading-relaxed">
              RESTful APIs for seamless integration. White-label solutions available for enterprise customers.
            </p>
          </div>
        </div>
      </div>

      {/* How It Works - Enterprise Process */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-4xl font-bold text-center mb-16 text-slate-900">Enterprise Integration Process</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-16">
          <div className="text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
              <span className="text-2xl font-bold text-white">1</span>
            </div>
            <h3 className="text-xl font-semibold mb-3 text-slate-900">Upload & Process</h3>
            <p className="text-slate-600 leading-relaxed">Secure document upload with AI-powered information extraction and validation</p>
          </div>
          <div className="text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
              <span className="text-2xl font-bold text-white">2</span>
            </div>
            <h3 className="text-xl font-semibold mb-3 text-slate-900">Compliance Check</h3>
            <p className="text-slate-600 leading-relaxed">Automated state-specific compliance validation and bank requirement verification</p>
          </div>
          <div className="text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
              <span className="text-2xl font-bold text-white">3</span>
            </div>
            <h3 className="text-xl font-semibold mb-3 text-slate-900">Generate & Review</h3>
            <p className="text-slate-600 leading-relaxed">Professional certification generation with legal review and approval workflow</p>
          </div>
          <div className="text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
              <span className="text-2xl font-bold text-white">4</span>
            </div>
            <h3 className="text-xl font-semibold mb-3 text-slate-900">Execute & Deliver</h3>
            <p className="text-slate-600 leading-relaxed">E-signature integration with secure delivery and audit trail</p>
          </div>
        </div>
      </div>

      {/* Trust & Security Section */}
      <div className="bg-slate-900 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-6">Bank-Grade Security & Compliance</h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Trusted by financial institutions for mission-critical trust operations
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            <div className="text-center">
              <div className="bg-blue-600 w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold">SOC 2</span>
              </div>
              <p className="text-slate-300 font-semibold">SOC 2 Type II</p>
            </div>
            <div className="text-center">
              <div className="bg-green-600 w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold">GDPR</span>
              </div>
              <p className="text-slate-300 font-semibold">GDPR Compliant</p>
            </div>
            <div className="text-center">
              <div className="bg-purple-600 w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold">256</span>
              </div>
              <p className="text-slate-300 font-semibold">AES-256 Encryption</p>
            </div>
            <div className="text-center">
              <div className="bg-orange-600 w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold">99.9%</span>
              </div>
              <p className="text-slate-300 font-semibold">Uptime SLA</p>
            </div>
          </div>
        </div>
      </div>

      {/* Final CTA Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-purple-700 rounded-3xl p-12 text-center text-white shadow-2xl">
          <h2 className="text-4xl font-bold mb-6">Transform Your Trust Operations</h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Join forward-thinking financial institutions already using Trusto to streamline trust certifications and improve customer experience.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={onGetStarted}
              className="bg-white text-blue-600 px-8 py-4 rounded-xl text-lg font-semibold hover:bg-slate-50 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Start Free Trial
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-white hover:text-blue-600 transition-all">
              Schedule Enterprise Demo
            </button>
          </div>
          <p className="text-sm mt-6 opacity-75">
            Enterprise support • Custom integration • Dedicated success manager
          </p>
        </div>
      </div>
    </div>
  );
};
