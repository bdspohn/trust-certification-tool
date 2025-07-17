import React, { useState } from 'react';
import CertificationStripeFlow from './certification';
import AIDocumentProcessor from '../components/AIDocumentProcessor';
import ESignatureIntegration from '../components/ESignatureIntegration';
import Articles from '../components/Articles';
import Head from 'next/head';

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
        <title>Trusto.Inc – Professional Certification of Trust</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 bg-blue-600 rounded-lg">
                <div className="text-white font-bold text-lg">T</div>
              </div>
              <span className="text-xl font-bold text-gray-900 tracking-tight">Trusto<span className="text-blue-600">.Inc</span></span>
            </div>
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => setCurrentStep('landing')}
                className="text-gray-600 hover:text-gray-900"
              >
                Home
              </button>
              <button 
                onClick={() => setCurrentStep('articles')}
                className="text-gray-600 hover:text-gray-900"
              >
                Articles
              </button>
              <button 
                onClick={() => setCurrentStep('ai')}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main>
        {renderStep()}
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="flex flex-col items-start">
              <div className="flex items-center justify-center w-10 h-10 bg-blue-600 rounded-lg mb-2">
                <div className="text-white font-bold text-lg">T</div>
              </div>
              <h3 className="text-lg font-semibold mb-2">Trusto<span className="text-blue-400">.Inc</span></h3>
              <p className="text-gray-300 text-sm">
                Professional Certification of Trust generation with AI-powered document processing and e-signature integration.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Features</h4>
              <ul className="text-sm text-gray-300 space-y-2">
                <li>AI Document Processing</li>
                <li>State-Specific Templates</li>
                <li>E-Signature Integration</li>
                <li>Online Notarization</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="text-sm text-gray-300 space-y-2">
                <li>Privacy Policy</li>
                <li>Terms of Service</li>
                <li>Legal Disclaimer</li>
                <li>State Compliance</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="text-sm text-gray-300 space-y-2">
                <li>Help Center</li>
                <li>Contact Support</li>
                <li>FAQ</li>
                <li>Documentation</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm text-gray-300">
            <p>&copy; 2024 Trusto.Inc. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

const LandingPage = ({ onGetStarted }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-5xl font-bold text-gray-900 mb-6">
          Professional Certification of Trust
          <span className="text-blue-600"> in Minutes</span>
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
          Generate state-specific, legally compliant Certification of Trust documents with AI-powered document processing, 
          e-signature integration, and online notarization. Accepted by all major financial institutions.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={onGetStarted}
            className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition shadow-lg"
          >
            Start Now - Free
          </button>
          <button className="border border-gray-300 text-gray-700 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-50 transition">
            Learn More
          </button>
        </div>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        <div className="text-center p-6 bg-white rounded-lg shadow-lg">
          <div className="text-4xl mb-4">🤖</div>
          <h3 className="text-xl font-semibold mb-3">AI-Powered Processing</h3>
          <p className="text-gray-600">
            Upload your trust document and our AI automatically extracts all required information with 95%+ accuracy.
          </p>
        </div>
        <div className="text-center p-6 bg-white rounded-lg shadow-lg">
          <div className="text-4xl mb-4">📋</div>
          <h3 className="text-xl font-semibold mb-3">State-Specific Compliance</h3>
          <p className="text-gray-600">
            Generate documents that comply with your state&apos;s specific legal requirements and formatting standards.
          </p>
        </div>
        <div className="text-center p-6 bg-white rounded-lg shadow-lg">
          <div className="text-4xl mb-4">✍️</div>
          <h3 className="text-xl font-semibold mb-3">E-Signature & Notarization</h3>
          <p className="text-gray-600">
            Complete the entire process electronically with DocuSign integration and online notarization.
          </p>
        </div>
      </div>

      {/* Urgency Section */}
      <div className="bg-gradient-to-r from-red-50 to-orange-50 border border-red-200 rounded-lg p-8 mb-16">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-red-800 mb-4">⚠️ Urgent: 40% Rejection Rate</h2>
          <p className="text-lg text-red-700 mb-6">
            Financial institutions are rejecting 40% of Certification of Trust documents due to incomplete or incorrect information. 
            Don&apos;t risk frozen accounts or delayed transactions.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left max-w-4xl mx-auto">
            <div>
              <h4 className="font-semibold text-red-800 mb-2">Common Rejection Reasons:</h4>
              <ul className="text-red-700 space-y-1">
                <li>• Missing trustee powers</li>
                <li>• Incorrect state-specific language</li>
                <li>• Missing tax identification</li>
                <li>• Outdated formatting</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-red-800 mb-2">Our Solution:</h4>
              <ul className="text-red-700 space-y-1">
                <li>• AI-powered information extraction</li>
                <li>• State-specific legal compliance</li>
                <li>• Professional formatting</li>
                <li>• 99% acceptance rate</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-blue-600">1</span>
            </div>
            <h3 className="font-semibold mb-2">Upload Document</h3>
            <p className="text-gray-600 text-sm">Drag & drop your trust document or enter information manually</p>
          </div>
          <div className="text-center">
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-blue-600">2</span>
            </div>
            <h3 className="font-semibold mb-2">AI Processing</h3>
            <p className="text-gray-600 text-sm">Our AI extracts information and generates state-specific certification</p>
          </div>
          <div className="text-center">
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-blue-600">3</span>
            </div>
            <h3 className="font-semibold mb-2">Review & Edit</h3>
            <p className="text-gray-600 text-sm">Review extracted information and make any necessary adjustments</p>
          </div>
          <div className="text-center">
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-blue-600">4</span>
            </div>
            <h3 className="font-semibold mb-2">Sign & Notarize</h3>
            <p className="text-gray-600 text-sm">E-sign with DocuSign and get notarized online or print to sign</p>
          </div>
        </div>
      </div>



      {/* CTA Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-8 text-center text-white">
        <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
        <p className="text-xl mb-6 opacity-90">
          Create your professional Certification of Trust in minutes, not hours
        </p>
        <button
          onClick={onGetStarted}
          className="bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition shadow-lg"
        >
          Start Your Certification Now
        </button>
      </div>
    </div>
  );
};
