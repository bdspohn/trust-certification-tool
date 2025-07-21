// LEGAL DOC RULE: Always check Bonterms.com for a template before drafting any legal document (Privacy Policy, Terms, DPA, NDA, etc.). If available, use and customize for Trusto.com. If not, use a best-in-class open-source template and note the source.

import React, { useState } from 'react';
import CertificationStripeFlow from './certification';
import AIDocumentProcessor from '../components/AIDocumentProcessor';
import dynamic from 'next/dynamic';
import { trackEvents } from '../lib/analytics';

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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
        return <LandingPage onGetStarted={() => setCurrentStep('ai')} setCurrentStep={setCurrentStep} />;
      case 'ai':
        return <AIDocumentProcessor onDataExtracted={handleDataExtracted} />;
      case 'form':
        return <CertificationStripeFlow prefillData={extractedData} onSubmit={handleFormSubmitted} />;
      case 'signature':
        return <ESignatureIntegration formData={formData} onComplete={handleSignatureComplete} />;
      case 'articles':
        return <Articles />;
      default:
        return <LandingPage onGetStarted={() => setCurrentStep('ai')} setCurrentStep={setCurrentStep} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>Trusto - Making Trust Assets as Liquid as Cash</title>
        <meta name="description" content="Turn $84 trillion in trust assets into instant-access deposits. AI-powered trust verification platform for banks, credit unions, and fintechs." />
        <meta name="keywords" content="trust liquidity, trust assets, financial institutions, bank compliance, trust verification, API platform, fintech, trust deposits" />
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
              <span className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">Trusto<span className="text-blue-600">.Inc</span></span>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-6">
              <button 
                onClick={() => setCurrentStep('landing')}
                className="text-slate-600 hover:text-slate-900 font-medium transition-colors"
              >
                Platform
              </button>
              <Link href="/api-docs" className="text-slate-600 hover:text-slate-900 font-medium transition-colors">
                API Docs
              </Link>
              <Link href="/legal-services" className="text-slate-600 hover:text-slate-900 font-medium transition-colors">
                Legal Services
              </Link>
              <button 
                onClick={() => setCurrentStep('articles')}
                className="text-slate-600 hover:text-slate-900 font-medium transition-colors"
              >
                Resources
              </button>
              <Link href="/onboarding" className="text-slate-600 hover:text-slate-900 font-medium transition-colors">
                Get Started
              </Link>
              <button 
                onClick={() => setCurrentStep('ai')}
                className="bg-blue-600 text-white px-6 py-2.5 rounded-lg hover:bg-blue-700 font-semibold transition-all shadow-md hover:shadow-lg"
              >
                Start Free Trial
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="lg:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-slate-600 hover:text-slate-900 focus:outline-none focus:text-slate-900"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  {mobileMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile Navigation Menu */}
          {mobileMenuOpen && (
            <div className="lg:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-slate-200">
                <button 
                  onClick={() => {setCurrentStep('landing'); setMobileMenuOpen(false);}}
                  className="block px-3 py-2 text-slate-600 hover:text-slate-900 font-medium transition-colors w-full text-left"
                >
                  Platform
                </button>
                <Link 
                  href="/api-docs" 
                  className="block px-3 py-2 text-slate-600 hover:text-slate-900 font-medium transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  API Docs
                </Link>
                <Link 
                  href="/legal-services" 
                  className="block px-3 py-2 text-slate-600 hover:text-slate-900 font-medium transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Legal Services
                </Link>
                <button 
                  onClick={() => {setCurrentStep('articles'); setMobileMenuOpen(false);}}
                  className="block px-3 py-2 text-slate-600 hover:text-slate-900 font-medium transition-colors w-full text-left"
                >
                  Resources
                </button>
                <Link 
                  href="/onboarding" 
                  className="block px-3 py-2 text-slate-600 hover:text-slate-900 font-medium transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Get Started
                </Link>
                <button 
                  onClick={() => {setCurrentStep('ai'); setMobileMenuOpen(false);}}
                  className="block w-full mt-4 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 font-semibold transition-all shadow-md hover:shadow-lg text-center"
                >
                  Start Free Trial
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Main Content */}
      <main>
        {renderStep()}
      </main>

      {/* Enhanced Footer */}
      <footer className="bg-slate-900 text-white py-8 sm:py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-8 sm:mb-12">
            <div className="flex flex-col items-start">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <div className="text-white text-sm font-bold">T</div>
                </div>
                <h3 className="text-lg font-semibold">Trusto<span className="text-blue-400">.Inc</span></h3>
              </div>
              <p className="text-slate-300 text-sm leading-relaxed mb-6">
                Making trust certifications simple for everyone. Upload, extract, generate - done.
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
                <li><Link href="/ai-tool" className="hover:text-white transition-colors">AI Document Processing</Link></li>
                <li><Link href="/api-docs" className="hover:text-white transition-colors">API Integration</Link></li>
                <li><button onClick={() => setCurrentStep('signature')} className="hover:text-white transition-colors text-left">E-Signature Platform</button></li>
                <li><Link href="/admin/security" className="hover:text-white transition-colors">Compliance Engine</Link></li>
                <li><Link href="/trustee-dashboard" className="hover:text-white transition-colors">Enterprise Dashboard</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-white">Resources</h4>
              <ul className="text-sm text-slate-300 space-y-3">
                <li><Link href="/api-docs" className="hover:text-white transition-colors">Documentation</Link></li>
                <li><Link href="/api-docs" className="hover:text-white transition-colors">API Reference</Link></li>
                <li><button onClick={() => setCurrentStep('articles')} className="hover:text-white transition-colors text-left">Trust Law Updates</button></li>
                <li><button onClick={() => setCurrentStep('articles')} className="hover:text-white transition-colors text-left">Best Practices</button></li>
                <li><button onClick={() => setCurrentStep('articles')} className="hover:text-white transition-colors text-left">Case Studies</button></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-white">Company</h4>
              <ul className="text-sm text-slate-300 space-y-3">
                <li><Link href="/legal/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                <li><Link href="/legal/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
                <li><Link href="/admin/security" className="hover:text-white transition-colors">Security</Link></li>
                <li><Link href="/contact" className="hover:text-white transition-colors">Support</Link></li>
                <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-slate-800 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="text-sm text-slate-400 mb-4 md:mb-0">
                <p>&copy; 2024 Trusto.Inc. All rights reserved.</p>
              </div>
              <div className="flex space-x-6 text-sm text-slate-400">
                <span className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                  All systems operational
                </span>
                <Link href="/legal/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
                <Link href="/legal/terms" className="hover:text-white transition-colors">Terms of Service</Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

const LandingPage = ({ onGetStarted, setCurrentStep }) => {
  return (
    <div className="bg-gradient-to-b from-slate-50 to-white">
      {/* Enterprise Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16">
        <div className="text-center mb-12 sm:mb-20">
          <div className="mb-4 sm:mb-6">
            <span className="inline-flex items-center px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-medium bg-blue-100 text-blue-800 mb-4 sm:mb-6">
              ✨ New: AI-Powered Document Processing
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-4 sm:mb-6 leading-tight px-2">
            Making Trust Assets
            <span className="block text-blue-600">as Liquid as Cash</span>
          </h1>
          <p className="text-lg sm:text-xl text-slate-600 mb-6 sm:mb-8 max-w-4xl mx-auto leading-relaxed px-4">
            Turn $84 trillion in trust assets into instant-access deposits. Our AI-powered platform eliminates weeks of paperwork, making trust verification as simple as opening a checking account.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-6 sm:mb-8 px-4">
            <button
              onClick={onGetStarted}
              className="bg-blue-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl text-base sm:text-lg font-semibold hover:bg-blue-700 transition-all shadow-xl hover:shadow-2xl transform hover:-translate-y-1 w-full sm:w-auto"
            >
              Start Free Trial
            </button>
            <button className="border-2 border-slate-300 text-slate-700 px-6 sm:px-8 py-3 sm:py-4 rounded-xl text-base sm:text-lg font-semibold hover:bg-slate-50 transition-all w-full sm:w-auto">
              Schedule Demo
            </button>
          </div>
          <p className="text-xs sm:text-sm text-slate-500">
            No credit card required • Free trial available
          </p>
        </div>

        {/* Value Props */}
        <div className="mb-12 sm:mb-20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8 max-w-6xl mx-auto px-4">
            <div className="text-center p-3 sm:p-4">
              <div className="text-2xl sm:text-3xl md:text-4xl mb-2">💰</div>
              <h3 className="font-semibold text-slate-900 mb-1 text-sm sm:text-base">$84T Market</h3>
              <p className="text-xs sm:text-sm text-slate-600">Unlock massive trust deposits</p>
            </div>
            <div className="text-center p-3 sm:p-4">
              <div className="text-2xl sm:text-3xl md:text-4xl mb-2">⚡</div>
              <h3 className="font-semibold text-slate-900 mb-1 text-sm sm:text-base">Instant Verification</h3>
              <p className="text-xs sm:text-sm text-slate-600">Minutes, not weeks</p>
            </div>
            <div className="text-center p-3 sm:p-4">
              <div className="text-2xl sm:text-3xl md:text-4xl mb-2">🏦</div>
              <h3 className="font-semibold text-slate-900 mb-1 text-sm sm:text-base">Bank-Grade Security</h3>
              <p className="text-xs sm:text-sm text-slate-600">SOC 2 compliant platform</p>
            </div>
            <div className="text-center p-3 sm:p-4">
              <div className="text-2xl sm:text-3xl md:text-4xl mb-2">🔗</div>
              <h3 className="font-semibold text-slate-900 mb-1 text-sm sm:text-base">API Integration</h3>
              <p className="text-xs sm:text-sm text-slate-600">Seamless system integration</p>
            </div>
          </div>
        </div>
      </div>

      {/* Problem-Solution Comparison */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 mb-12 sm:mb-20">
          <div className="bg-red-50 border border-red-200 rounded-2xl p-4 sm:p-6 lg:p-8">
            <h3 className="text-xl sm:text-2xl font-bold text-red-800 mb-4 sm:mb-6">Frozen Trust Assets</h3>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="text-red-500 mr-3 mt-1">❌</div>
                <div>
                  <p className="font-semibold text-red-800">Weeks of Paperwork</p>
                  <p className="text-red-600 text-sm">Trust assets sit idle during verification</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="text-red-500 mr-3 mt-1">❌</div>
                <div>
                  <p className="font-semibold text-red-800">Lost Revenue</p>
                  <p className="text-red-600 text-sm">Banks miss out on $84T in potential deposits</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="text-red-500 mr-3 mt-1">❌</div>
                <div>
                  <p className="font-semibold text-red-800">Customer Friction</p>
                  <p className="text-red-600 text-sm">Wealthy clients go to competitors</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-green-50 border border-green-200 rounded-2xl p-4 sm:p-6 lg:p-8">
            <h3 className="text-xl sm:text-2xl font-bold text-green-800 mb-4 sm:mb-6">Liquid Trust Assets</h3>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="text-green-500 mr-3 mt-1">✅</div>
                <div>
                  <p className="font-semibold text-green-800">Instant Verification</p>
                  <p className="text-green-600 text-sm">Trust assets flow like checking accounts</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="text-green-500 mr-3 mt-1">✅</div>
                <div>
                  <p className="font-semibold text-green-800">Massive Revenue Unlock</p>
                  <p className="text-green-600 text-sm">Capture high-value trust deposits instantly</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="text-green-500 mr-3 mt-1">✅</div>
                <div>
                  <p className="font-semibold text-green-800">Delighted Customers</p>
                  <p className="text-green-600 text-sm">Zero-friction onboarding experience</p>
                </div>
              </div>
            </div>
          </div>
        </div>


        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="text-center p-8 bg-white rounded-2xl shadow-lg border border-slate-200">
            <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <div className="text-2xl">⚡</div>
            </div>
            <h3 className="text-xl font-semibold mb-4 text-slate-900">Instant Liquidity</h3>
            <p className="text-slate-600 leading-relaxed">
              Transform trust verification from weeks to minutes. Trust assets become immediately accessible for banking operations.
            </p>
          </div>
          <div className="text-center p-8 bg-white rounded-2xl shadow-lg border border-slate-200">
            <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <div className="text-2xl">💰</div>
            </div>
            <h3 className="text-xl font-semibold mb-4 text-slate-900">Revenue Multiplier</h3>
            <p className="text-slate-600 leading-relaxed">
              Capture high-value trust deposits that previously went to competitors. Turn verification friction into competitive advantage.
            </p>
          </div>
          <div className="text-center p-8 bg-white rounded-2xl shadow-lg border border-slate-200">
            <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <div className="text-2xl">🔗</div>
            </div>
            <h3 className="text-xl font-semibold mb-4 text-slate-900">API Integration</h3>
            <p className="text-slate-600 leading-relaxed">
              Plug into existing banking systems. Real-time trust verification that scales with your business.
            </p>
          </div>
        </div>
      </div>

      {/* Security & Compliance Section */}
      <div className="bg-slate-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h3 className="text-3xl font-bold text-slate-900 mb-8">Built for Financial Institution Requirements</h3>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Currently in beta testing. Working toward bank-grade security and compliance standards.
            </p>
          </div>

          {/* What We're Building Toward */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-8 shadow-lg border border-slate-200">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <div className="text-2xl">🔒</div>
              </div>
              <h3 className="text-xl font-semibold mb-4 text-slate-900 text-center">Security First</h3>
              <p className="text-slate-600 leading-relaxed text-center">
                Building toward SOC 2 Type II compliance with enterprise-grade security controls.
              </p>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-lg border border-slate-200">
              <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <div className="text-2xl">📋</div>
              </div>
              <h3 className="text-xl font-semibold mb-4 text-slate-900 text-center">Compliance Ready</h3>
              <p className="text-slate-600 leading-relaxed text-center">
                Designed to meet banking regulatory requirements and audit standards.
              </p>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-lg border border-slate-200">
              <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <div className="text-2xl">🏗️</div>
              </div>
              <h3 className="text-xl font-semibold mb-4 text-slate-900 text-center">Beta Testing</h3>
              <p className="text-slate-600 leading-relaxed text-center">
                Currently testing with select institutions to refine accuracy and compliance.
              </p>
            </div>
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
