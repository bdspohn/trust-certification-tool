import React, { useState } from 'react';
import Head from 'next/head';
import LegalToolFramework from '../components/LegalToolFramework';
import TrustAmendmentTool from '../components/TrustAmendmentTool';
import TransferDeedTool from '../components/TransferDeedTool';

const LegalServicesPage = () => {
  const [selectedTool, setSelectedTool] = useState(null);
  const [extractedData, setExtractedData] = useState(null);
  const [businessIntelligence, setBusinessIntelligence] = useState([]);

  // Sample extracted data (would come from AI processing)
  const sampleTrustData = {
    trustName: "John and Mary Smith Family Trust",
    trustees: ["John Smith", "Mary Smith"],
    beneficiaries: ["John Smith Jr.", "Sarah Smith", "Michael Smith"],
    trustDate: "2015-03-15",
    state: "CA",
    revocability: "revocable",
    propertyAssets: [
      "123 Main Street, Los Angeles, CA 90210",
      "456 Oak Avenue, Santa Monica, CA 90401"
    ],
    businessAssets: []
  };

  const handleToolSelect = (tool) => {
    setSelectedTool(tool);
    
    // Simulate AI data extraction if not already available
    if (!extractedData) {
      setExtractedData({
        trustData: sampleTrustData,
        propertyAssets: sampleTrustData.propertyAssets,
        beneficiaries: sampleTrustData.beneficiaries,
        state: sampleTrustData.state
      });
    }
  };

  const handleDataCapture = (data) => {
    // Capture business intelligence for B2B sales
    const intelligenceRecord = {
      ...data,
      sessionId: generateSessionId(),
      clientSegment: determineClientSegment(data),
      marketValue: calculateMarketValue(data)
    };
    
    setBusinessIntelligence(prev => [...prev, intelligenceRecord]);
    
    // In production, this would send to analytics backend
    console.log('Business Intelligence Captured:', intelligenceRecord);
  };

  const generateSessionId = () => {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  };

  const determineClientSegment = (data) => {
    if (data.amendmentValue === 'over_5m') return 'ultra_high_net_worth';
    if (data.amendmentValue === '1m_5m') return 'high_net_worth';
    if (data.amendmentValue === '500k_1m') return 'affluent';
    return 'mass_market';
  };

  const calculateMarketValue = (data) => {
    // Algorithm to determine data value for B2B sales
    let value = 100; // Base value per record
    
    if (data.clientSegment === 'ultra_high_net_worth') value += 500;
    if (data.clientSegment === 'high_net_worth') value += 300;
    if (data.clientSegment === 'affluent') value += 150;
    
    if (data.toolType === 'trust_amendment') value += 200;
    if (data.complexity === 'high') value += 100;
    
    return value;
  };

  const handleToolComplete = (result) => {
    console.log('Legal tool completed:', result);
    
    // Capture completion data for business intelligence
    handleDataCapture({
      event: 'tool_completion',
      toolType: selectedTool.id,
      result: result,
      timestamp: new Date().toISOString()
    });
    
    // Show success message or redirect
    alert('Legal service request submitted successfully! An attorney will contact you within 24 hours.');
    setSelectedTool(null);
  };

  const renderContent = () => {
    if (!selectedTool) {
      return (
        <LegalToolFramework
          extractedData={extractedData}
          selectedTool={selectedTool}
          onToolSelect={handleToolSelect}
          onDataCapture={handleDataCapture}
        />
      );
    }

    // Route to specific tool components
    switch (selectedTool.id) {
      case 'trust_amendment':
        return (
          <TrustAmendmentTool
            trustData={extractedData?.trustData}
            onComplete={handleToolComplete}
            onBack={() => setSelectedTool(null)}
            onDataCapture={handleDataCapture}
          />
        );
      
      case 'property_transfer':
        return (
          <TransferDeedTool
            onComplete={handleToolComplete}
            onBack={() => setSelectedTool(null)}
          />
        );
      
      default:
        return (
          <div className="max-w-4xl mx-auto p-6 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Coming Soon</h2>
            <p className="text-gray-600 mb-6">
              The {selectedTool.title} tool is currently in development. 
              Please contact us directly for assistance with this service.
            </p>
            <button
              onClick={() => setSelectedTool(null)}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Back to Legal Tools
            </button>
          </div>
        );
    }
  };

  return (
    <>
      <Head>
        <title>Legal Services - Trusto</title>
        <meta name="description" content="AI-powered legal services for trust administration and estate planning" />
      </Head>
      
      <div className="min-h-screen bg-gray-50">
        {/* Navigation would go here */}
        
        <main>
          {renderContent()}
        </main>
        
        {/* Business Intelligence Dashboard (Admin Only) */}
        {process.env.NODE_ENV === 'development' && (
          <div className="fixed bottom-4 right-4 max-w-sm bg-white border border-gray-200 rounded-lg shadow-lg p-4">
            <h3 className="font-semibold text-gray-800 mb-2">🔍 BI Dashboard (Dev)</h3>
            <div className="text-xs text-gray-600 space-y-1">
              <div>Sessions: {businessIntelligence.length}</div>
              <div>
                Total Value: ${businessIntelligence.reduce((sum, record) => sum + (record.marketValue || 0), 0)}
              </div>
              <div>
                Segments: {[...new Set(businessIntelligence.map(r => r.clientSegment))].join(', ')}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default LegalServicesPage;