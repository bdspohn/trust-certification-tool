import React, { useState } from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const ESignatureIntegration = ({ formData, documentUrl }) => {
  const [signatureMethod, setSignatureMethod] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [signatureStatus, setSignatureStatus] = useState('');

  const prepareDocuSignEnvelope = async () => {
    // Generate the PDF for DocuSign
    const pdf = generateTrustCertificationPDF();
    const pdfData = pdf.output('datauristring');
    
    // Prepare envelope data for DocuSign API
    const envelopeData = {
      emailSubject: `Certification of Trust - ${formData.trustName}`,
      documents: [{
        documentBase64: pdfData.split(',')[1], // Remove data:application/pdf;base64, prefix
        name: `Certification_of_Trust_${formData.trustName?.replace(/[^a-zA-Z0-9]/g, '_')}.pdf`,
        fileExtension: 'pdf',
        documentId: '1'
      }],
      recipients: {
        signers: [{
          email: formData.trusteeEmail || 'trustee@example.com', // This would come from form
          name: Array.isArray(formData.trustee) ? formData.trustee[0] : formData.trustee || 'Trustee',
          recipientId: '1',
          tabs: {
            signHereTabs: [{
              documentId: '1',
              pageNumber: '1',
              xPosition: '100',
              yPosition: '200'
            }],
            dateSignedTabs: [{
              documentId: '1',
              pageNumber: '1',
              xPosition: '300',
              yPosition: '200'
            }]
          }
        }]
      },
      status: 'sent'
    };
    
    return envelopeData;
  };

  const handleDocuSign = async () => {
    setIsProcessing(true);
    setSignatureStatus('preparing');
    
    try {
      // Prepare the envelope data
      const envelopeData = await prepareDocuSignEnvelope();
      
      // In a real implementation, this would call your backend API which would:
      // 1. Call DocuSign API to create envelope
      // 2. Return the signing URL
      // 
      // Example backend call:
      // const response = await fetch('/api/docusign/create-envelope', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(envelopeData)
      // });
      // const { envelopeId, signingUrl } = await response.json();
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock envelope creation
      const envelopeId = 'envelope-' + Date.now();
      const signingUrl = `https://demo.docusign.net/signing/${envelopeId}`;
      
      setSignatureStatus('sent');
      setIsProcessing(false);
      
      // Open DocuSign signing session
      window.open(signingUrl, '_blank');
      
      // You would also want to store the envelope ID for tracking
      console.log('DocuSign envelope created:', envelopeId);
      
    } catch (error) {
      console.error('DocuSign error:', error);
      setSignatureStatus('error');
      setIsProcessing(false);
    }
  };

  const prepareNotarizeSession = async () => {
    // Generate the PDF for notarization
    const pdf = generateTrustCertificationPDF();
    const pdfData = pdf.output('datauristring');
    
    // Prepare session data for Notarize API
    const sessionData = {
      documentName: `Certification of Trust - ${formData.trustName}`,
      documentType: 'certification_of_trust',
      signerInfo: {
        firstName: formData.trustee?.split(' ')[0] || 'Trustee',
        lastName: formData.trustee?.split(' ').slice(1).join(' ') || '',
        email: formData.trusteeEmail || 'trustee@example.com',
        phoneNumber: formData.trusteePhone || ''
      },
      document: {
        name: `Certification_of_Trust_${formData.trustName?.replace(/[^a-zA-Z0-9]/g, '_')}.pdf`,
        content: pdfData.split(',')[1], // base64 content
        mimeType: 'application/pdf'
      },
      notarizationType: 'acknowledgment',
      jurisdiction: formData.state
    };
    
    return sessionData;
  };

  const handleNotarize = async () => {
    setIsProcessing(true);
    setSignatureStatus('preparing');
    
    try {
      // Prepare the notarization session
      const sessionData = await prepareNotarizeSession();
      
      // In a real implementation, this would call your backend API which would:
      // 1. Call Notarize.com API to create session
      // 2. Return the session URL
      // 
      // Example backend call:
      // const response = await fetch('/api/notarize/create-session', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(sessionData)
      // });
      // const { sessionId, sessionUrl } = await response.json();
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Mock session creation
      const sessionId = 'notary-session-' + Date.now();
      const sessionUrl = `https://app.notarize.com/session/${sessionId}`;
      
      setSignatureStatus('notarized');
      setIsProcessing(false);
      
      // Open Notarize session
      window.open(sessionUrl, '_blank');
      
      // You would also want to store the session ID for tracking
      console.log('Notarize session created:', sessionId);
      
    } catch (error) {
      console.error('Notarize error:', error);
      setSignatureStatus('error');
      setIsProcessing(false);
    }
  };

  const generateTrustCertificationPDF = () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.width;
    const margin = 20;
    const contentWidth = pageWidth - 2 * margin;
    
    // Header
    doc.setFontSize(20);
    doc.setFont('helvetica', 'bold');
    doc.text('CERTIFICATION OF TRUST', pageWidth / 2, 30, { align: 'center' });
    
    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    doc.text(`State of ${formData.state}`, pageWidth / 2, 45, { align: 'center' });
    
    // Main content
    let yPosition = 70;
    
    doc.setFontSize(11);
    doc.text('I/We, the undersigned Trustee(s) of the trust described below, certify that:', margin, yPosition);
    yPosition += 20;
    
    // Trust details
    const trustDetails = [
      [`Trust Name:`, formData.trustName || 'N/A'],
      [`Date of Trust:`, formData.trustDate || 'N/A'],
      [`Grantor(s):`, formData.grantor || 'N/A'],
      [`Current Trustee(s):`, Array.isArray(formData.trustee) ? formData.trustee.join(', ') : formData.trustee || 'N/A'],
      [`Successor Trustee(s):`, Array.isArray(formData.successorTrustee) ? formData.successorTrustee.join(', ') : formData.successorTrustee || 'N/A'],
      [`Trust Tax ID:`, formData.taxId || 'N/A'],
      [`Governing Law:`, formData.governingLaw || formData.state || 'N/A'],
      [`Revocability:`, formData.revocability || 'N/A']
    ];
    
    trustDetails.forEach(([label, value]) => {
      doc.setFont('helvetica', 'bold');
      doc.text(label, margin, yPosition);
      doc.setFont('helvetica', 'normal');
      doc.text(value, margin + 50, yPosition);
      yPosition += 12;
    });
    
    yPosition += 10;
    
    // Powers section
    if (formData.powers && formData.powers.length > 0) {
      doc.setFont('helvetica', 'bold');
      doc.text('Trustee Powers:', margin, yPosition);
      yPosition += 15;
      
      doc.setFont('helvetica', 'normal');
      formData.powers.slice(0, 5).forEach((power, index) => {
        const wrappedText = doc.splitTextToSize(`${index + 1}. ${power}`, contentWidth - 10);
        doc.text(wrappedText, margin + 5, yPosition);
        yPosition += wrappedText.length * 6 + 5;
      });
      
      if (formData.powers.length > 5) {
        doc.text(`... and ${formData.powers.length - 5} additional powers as specified in the trust document.`, margin + 5, yPosition);
        yPosition += 15;
      }
    }
    
    yPosition += 20;
    
    // Certification statement
    doc.setFont('helvetica', 'normal');
    const certText = `The trust has not been revoked, modified, or amended in any manner that would cause the representations contained herein to be incorrect, and the representations contained herein are true and complete. The trust is currently in full force and effect.`;
    const wrappedCertText = doc.splitTextToSize(certText, contentWidth);
    doc.text(wrappedCertText, margin, yPosition);
    yPosition += wrappedCertText.length * 6 + 20;
    
    // Signature lines
    const today = new Date().toLocaleDateString();
    doc.text(`Dated: ${today}`, margin, yPosition);
    yPosition += 30;
    
    doc.text('_________________________________', margin, yPosition);
    yPosition += 8;
    doc.text('Trustee Signature', margin, yPosition);
    yPosition += 20;
    
    doc.text('_________________________________', margin, yPosition);
    yPosition += 8;
    doc.text('Print Name', margin, yPosition);
    yPosition += 30;
    
    // Notary section
    doc.setFont('helvetica', 'bold');
    doc.text('NOTARY ACKNOWLEDGMENT', margin, yPosition);
    yPosition += 15;
    
    doc.setFont('helvetica', 'normal');
    doc.text('State of: _________________', margin, yPosition);
    yPosition += 15;
    doc.text('County of: _______________', margin, yPosition);
    yPosition += 20;
    
    const notaryText = `On this _____ day of __________, 20__, before me personally appeared the above-named individual(s), who proved to me on the basis of satisfactory evidence to be the person(s) whose name(s) is/are subscribed to the within instrument and acknowledged to me that he/she/they executed the same in his/her/their authorized capacity, and that by his/her/their signature(s) on the instrument the person(s), or the entity upon behalf of which the person(s) acted, executed the instrument.`;
    const wrappedNotaryText = doc.splitTextToSize(notaryText, contentWidth);
    doc.text(wrappedNotaryText, margin, yPosition);
    yPosition += wrappedNotaryText.length * 6 + 20;
    
    doc.text('_________________________________', margin, yPosition);
    yPosition += 8;
    doc.text('Notary Public Signature', margin, yPosition);
    
    return doc;
  };

  const handlePrintSign = () => {
    try {
      setIsProcessing(true);
      setSignatureStatus('preparing');
      
      const pdf = generateTrustCertificationPDF();
      
      // Generate filename
      const filename = `Certification_of_Trust_${formData.trustName?.replace(/[^a-zA-Z0-9]/g, '_') || 'Document'}_${new Date().toISOString().split('T')[0]}.pdf`;
      
      // Save the PDF
      pdf.save(filename);
      
      // Set success status
      setSignatureStatus('printed');
      setIsProcessing(false);
      
      // Also open print dialog for the current page after a delay
      setTimeout(() => {
        window.print();
      }, 1000);
    } catch (error) {
      console.error('Error generating PDF:', error);
      setSignatureStatus('error');
      setIsProcessing(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow mt-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Complete Your Certification of Trust</h2>
        <p className="text-lg text-gray-600">
          Choose how you&apos;d like to sign and notarize your document
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
            className="w-full bg-gray-600 text-white py-3 px-4 rounded-lg hover:bg-gray-700 transition font-semibold"
          >
            📄 Generate & Print PDF
          </button>
        </div>
      </div>

      {/* Status Messages */}
      {signatureStatus === 'sent' && (
        <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-start">
            <div className="text-blue-500 mr-3 mt-1">✅</div>
            <div>
              <h4 className="font-semibold text-blue-800 mb-2">DocuSign Envelope Sent!</h4>
              <p className="text-blue-700 text-sm">
                Check your email for the DocuSign link. Complete the signature process and your document will be automatically processed.
              </p>
            </div>
          </div>
        </div>
      )}

      {signatureStatus === 'notarized' && (
        <div className="mb-6 p-4 bg-purple-50 border border-purple-200 rounded-lg">
          <div className="flex items-start">
            <div className="text-purple-500 mr-3 mt-1">🏛️</div>
            <div>
              <h4 className="font-semibold text-purple-800 mb-2">Notarization Session Ready!</h4>
              <p className="text-purple-700 text-sm">
                Your online notarization session is ready. Click the link in your email to connect with a certified notary.
              </p>
            </div>
          </div>
        </div>
      )}

      {signatureStatus === 'printed' && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
          <div className="flex items-start">
            <div className="text-green-500 mr-3 mt-1">📄</div>
            <div>
              <h4 className="font-semibold text-green-800 mb-2">PDF Generated Successfully!</h4>
              <p className="text-green-700 text-sm mb-3">
                Your professional Certification of Trust has been downloaded. Next steps:
              </p>
              <ol className="text-green-700 text-sm list-decimal ml-4 space-y-1">
                <li>Print the downloaded PDF document</li>
                <li>Sign in the designated signature areas</li>
                <li>Visit a notary public for notarization</li>
                <li>Submit the completed document to your financial institution</li>
              </ol>
            </div>
          </div>
        </div>
      )}

      {signatureStatus === 'error' && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <div className="flex items-start">
            <div className="text-red-500 mr-3 mt-1">❌</div>
            <div>
              <h4 className="font-semibold text-red-800 mb-2">Error Processing Request</h4>
              <p className="text-red-700 text-sm">
                There was an error processing your request. Please try again or contact our support team at support@trusto.com.
              </p>
            </div>
          </div>
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