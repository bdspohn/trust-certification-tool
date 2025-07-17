import React, { useState } from 'react';

const ESignatureIntegration = ({ formData, documentUrl }) => {
  const [signatureMethod, setSignatureMethod] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [signatureStatus, setSignatureStatus] = useState('');

  const handleDocuSign = async () => {
    setIsProcessing(true);
    setSignatureStatus('preparing');
    
    try {
      // Simulate DocuSign integration
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock DocuSign envelope creation
      const envelopeId = 'mock-envelope-' + Date.now();
      
      setSignatureStatus('sent');
      setIsProcessing(false);
      
      // In real implementation, this would redirect to DocuSign
      window.open(`https://demo.docusign.net/signing/envelope/${envelopeId}`, '_blank');
      
    } catch (error) {
      setSignatureStatus('error');
      setIsProcessing(false);
    }
  };

  const handleNotarize = async () => {
    setIsProcessing(true);
    setSignatureStatus('preparing');
    
    try {
      // Simulate online notarization
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      setSignatureStatus('notarized');
      setIsProcessing(false);
      
      // In real implementation, this would integrate with Notarize.com or similar
      window.open('https://demo.notarize.com/session/mock-session', '_blank');
      
    } catch (error) {
      setSignatureStatus('error');
      setIsProcessing(false);
    }
  };

  const handlePrintSign = () => {
    // Trigger print dialog
    window.print();
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow mt-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Complete Your Certification of Trust</h2>
        <p className="text-lg text-gray-600">
          Choose how you'd like to sign and notarize your document
        </p>
      </div>

      {/* Signature Options */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* DocuSign Option */}
        <div className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
          <div className="text-center mb-4">
            <div className="text-4xl mb-2">📧</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">E-Sign with DocuSign</h3>
            <p className="text-sm text-gray-600 mb-4">
              Sign electronically with industry-leading DocuSign
            </p>
          </div>
          
          <div className="space-y-3 mb-4">
            <div className="flex items-center text-sm">
              <span className="text-green-500 mr-2">✓</span>
              <span>Legally binding electronic signature</span>
            </div>
            <div className="flex items-center text-sm">
              <span className="text-green-500 mr-2">✓</span>
              <span>Accepted by all financial institutions</span>
            </div>
            <div className="flex items-center text-sm">
              <span className="text-green-500 mr-2">✓</span>
              <span>Secure and tamper-proof</span>
            </div>
            <div className="flex items-center text-sm">
              <span className="text-green-500 mr-2">✓</span>
              <span>Instant delivery and tracking</span>
            </div>
          </div>

          <button
            onClick={handleDocuSign}
            disabled={isProcessing}
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            {isProcessing && signatureStatus === 'preparing' ? 'Preparing...' : 'Sign with DocuSign'}
          </button>
        </div>

        {/* Online Notarization Option */}
        <div className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
          <div className="text-center mb-4">
            <div className="text-4xl mb-2">🏛️</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Online Notarization</h3>
            <p className="text-sm text-gray-600 mb-4">
              Get notarized remotely with a certified notary
            </p>
          </div>
          
          <div className="space-y-3 mb-4">
            <div className="flex items-center text-sm">
              <span className="text-green-500 mr-2">✓</span>
              <span>Remote notarization available</span>
            </div>
            <div className="flex items-center text-sm">
              <span className="text-green-500 mr-2">✓</span>
              <span>Certified notary public</span>
            </div>
            <div className="flex items-center text-sm">
              <span className="text-green-500 mr-2">✓</span>
              <span>Video call verification</span>
            </div>
            <div className="flex items-center text-sm">
              <span className="text-green-500 mr-2">✓</span>
              <span>Instant notary certificate</span>
            </div>
          </div>

          <button
            onClick={handleNotarize}
            disabled={isProcessing}
            className="w-full bg-purple-600 text-white py-3 px-4 rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            {isProcessing && signatureStatus === 'preparing' ? 'Connecting...' : 'Get Notarized Online'}
          </button>
        </div>

        {/* Print & Sign Option */}
        <div className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
          <div className="text-center mb-4">
            <div className="text-4xl mb-2">🖨️</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Print & Sign</h3>
            <p className="text-sm text-gray-600 mb-4">
              Traditional print, sign, and notarize process
            </p>
          </div>
          
          <div className="space-y-3 mb-4">
            <div className="flex items-center text-sm">
              <span className="text-green-500 mr-2">✓</span>
              <span>Print professional document</span>
            </div>
            <div className="flex items-center text-sm">
              <span className="text-green-500 mr-2">✓</span>
              <span>Sign in person</span>
            </div>
            <div className="flex items-center text-sm">
              <span className="text-green-500 mr-2">✓</span>
              <span>Visit local notary</span>
            </div>
            <div className="flex items-center text-sm">
              <span className="text-green-500 mr-2">✓</span>
              <span>Physical document copy</span>
            </div>
          </div>

          <button
            onClick={handlePrintSign}
            className="w-full bg-gray-600 text-white py-3 px-4 rounded-lg hover:bg-gray-700 transition"
          >
            Print Document
          </button>
        </div>
      </div>

      {/* Status Messages */}
      {signatureStatus === 'sent' && (
        <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h4 className="font-semibold text-blue-800 mb-2">DocuSign Envelope Sent!</h4>
          <p className="text-blue-700 text-sm">
            Check your email for the DocuSign link. Complete the signature process and your document will be automatically processed.
          </p>
        </div>
      )}

      {signatureStatus === 'notarized' && (
        <div className="mb-6 p-4 bg-purple-50 border border-purple-200 rounded-lg">
          <h4 className="font-semibold text-purple-800 mb-2">Notarization Session Ready!</h4>
          <p className="text-purple-700 text-sm">
            Your online notarization session is ready. Click the link in your email to connect with a certified notary.
          </p>
        </div>
      )}

      {signatureStatus === 'error' && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <h4 className="font-semibold text-red-800 mb-2">Error</h4>
          <p className="text-red-700 text-sm">
            There was an error processing your request. Please try again or contact support.
          </p>
        </div>
      )}

      {/* Document Preview */}
      <div className="mt-8 p-6 bg-gray-50 rounded-lg">
        <h4 className="font-semibold text-gray-800 mb-4">Document Preview</h4>
        <div className="bg-white p-4 rounded border">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <strong>Trust Name:</strong> {formData.trustName}
            </div>
            <div>
              <strong>Date:</strong> {formData.trustDate}
            </div>
            <div>
              <strong>Grantor:</strong> {formData.grantor}
            </div>
            <div>
              <strong>Trustee(s):</strong> {formData.trustee.join(', ')}
            </div>
            <div>
              <strong>State:</strong> {formData.state}
            </div>
            <div>
              <strong>Type:</strong> {formData.revocability}
            </div>
          </div>
        </div>
      </div>

      {/* Legal Information */}
      <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
        <h4 className="font-semibold text-yellow-800 mb-2">Important Legal Information</h4>
        <div className="text-sm text-yellow-700 space-y-2">
          <p>• Electronic signatures are legally binding in all 50 states</p>
          <p>• Online notarization is accepted in most states</p>
          <p>• Some financial institutions may require original wet signatures</p>
          <p>• Check with your specific institution for their requirements</p>
        </div>
      </div>
    </div>
  );
};

export default ESignatureIntegration; 