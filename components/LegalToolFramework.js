import React, { useState, useEffect } from 'react';
import { ChevronRightIcon, DocumentTextIcon, UserGroupIcon, BuildingOfficeIcon, ClockIcon } from '@heroicons/react/24/outline';

const LegalToolFramework = ({ 
  extractedData = null, 
  selectedTool = null, 
  onToolSelect, 
  onDataCapture 
}) => {
  const [clientProfile, setClientProfile] = useState({
    trustData: extractedData?.trustData || null,
    propertyAssets: extractedData?.propertyAssets || [],
    familyStructure: extractedData?.beneficiaries || [],
    state: extractedData?.state || 'CA',
    estimatedAssetValue: null,
    urgencyLevel: 'normal'
  });

  const [toolProgress, setToolProgress] = useState({});
  const [dataInsights, setDataInsights] = useState({});

  // Legal tool definitions with data requirements
  const legalTools = [
    {
      id: 'trust_amendment',
      title: 'Trust Amendment',
      description: 'Modify beneficiaries, assets, or trustee appointments',
      icon: DocumentTextIcon,
      urgency: 'high',
      estimatedTime: '3-5 business days',
      cost: '$750-1,500',
      dataRequired: ['trustData', 'familyStructure'],
      businessValue: 'high', // For B2B data insights
      category: 'trust_management'
    },
    {
      id: 'property_transfer',
      title: 'Property Transfer Deed',
      description: 'Transfer real estate into or out of trust',
      icon: BuildingOfficeIcon,
      urgency: 'medium',
      estimatedTime: '5-7 business days',
      cost: '$500-1,200',
      dataRequired: ['trustData', 'propertyAssets'],
      businessValue: 'very_high', // Real estate data is valuable
      category: 'real_estate'
    },
    {
      id: 'successor_trustee',
      title: 'Successor Trustee Appointment',
      description: 'Designate new trustee or update succession plan',
      icon: UserGroupIcon,
      urgency: 'medium',
      estimatedTime: '2-4 business days',
      cost: '$400-800',
      dataRequired: ['trustData', 'familyStructure'],
      businessValue: 'medium',
      category: 'trust_management'
    },
    {
      id: 'trust_termination',
      title: 'Trust Termination',
      description: 'Distribute assets and formally terminate trust',
      icon: ClockIcon,
      urgency: 'high',
      estimatedTime: '10-15 business days',
      cost: '$1,500-3,000',
      dataRequired: ['trustData', 'propertyAssets', 'familyStructure'],
      businessValue: 'very_high', // Asset distribution data
      category: 'trust_management'
    }
  ];

  // Analyze client data to recommend tools
  useEffect(() => {
    if (extractedData) {
      const insights = generateClientInsights(extractedData);
      setDataInsights(insights);
      
      // Capture data for B2B analytics
      if (onDataCapture) {
        onDataCapture({
          timestamp: new Date().toISOString(),
          clientProfile: {
            ...clientProfile,
            insights: insights
          },
          recommendedTools: insights.recommendedTools
        });
      }
    }
  }, [extractedData]);

  const generateClientInsights = (data) => {
    const insights = {
      trustAge: calculateTrustAge(data.trustDate),
      assetComplexity: assessAssetComplexity(data),
      familyComplexity: assessFamilyComplexity(data.beneficiaries),
      recommendedTools: [],
      riskFactors: [],
      opportunities: []
    };

    // AI-driven recommendations based on extracted data
    if (insights.trustAge > 10) {
      insights.recommendedTools.push('trust_amendment');
      insights.opportunities.push('Trust modernization review recommended');
    }

    if (data.propertyAssets?.length > 0) {
      insights.recommendedTools.push('property_transfer');
      insights.opportunities.push('Property consolidation opportunities identified');
    }

    if (data.beneficiaries?.length > 3) {
      insights.riskFactors.push('Complex beneficiary structure may require review');
    }

    return insights;
  };

  const calculateTrustAge = (trustDate) => {
    if (!trustDate) return 0;
    const today = new Date();
    const trust = new Date(trustDate);
    return today.getFullYear() - trust.getFullYear();
  };

  const assessAssetComplexity = (data) => {
    let complexity = 'simple';
    const assetCount = (data.propertyAssets?.length || 0) + (data.businessAssets?.length || 0);
    
    if (assetCount > 5) complexity = 'complex';
    else if (assetCount > 2) complexity = 'moderate';
    
    return complexity;
  };

  const assessFamilyComplexity = (beneficiaries) => {
    if (!beneficiaries) return 'simple';
    if (beneficiaries.length > 5) return 'complex';
    if (beneficiaries.length > 2) return 'moderate';
    return 'simple';
  };

  const getUrgencyColor = (urgency) => {
    switch (urgency) {
      case 'high': return 'border-red-200 bg-red-50';
      case 'medium': return 'border-yellow-200 bg-yellow-50';
      default: return 'border-green-200 bg-green-50';
    }
  };

  const getBusinessValueIndicator = (value) => {
    switch (value) {
      case 'very_high': return '💎';
      case 'high': return '🔥';
      case 'medium': return '⭐';
      default: return '📊';
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Legal Services Platform</h1>
        <p className="text-lg text-gray-600">
          AI-powered legal tools integrated with your trust data
        </p>
      </div>

      {/* Client Insights Dashboard */}
      {dataInsights.trustAge && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold text-blue-900 mb-4">📊 AI Analysis of Your Trust</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div className="bg-white rounded-lg p-4">
              <div className="text-2xl font-bold text-blue-600">{dataInsights.trustAge} years</div>
              <div className="text-sm text-gray-600">Trust Age</div>
            </div>
            <div className="bg-white rounded-lg p-4">
              <div className="text-2xl font-bold text-green-600 capitalize">{dataInsights.assetComplexity}</div>
              <div className="text-sm text-gray-600">Asset Complexity</div>
            </div>
            <div className="bg-white rounded-lg p-4">
              <div className="text-2xl font-bold text-purple-600 capitalize">{dataInsights.familyComplexity}</div>
              <div className="text-sm text-gray-600">Family Structure</div>
            </div>
          </div>
          
          {dataInsights.opportunities.length > 0 && (
            <div className="bg-green-100 border border-green-200 rounded-lg p-4">
              <h3 className="font-semibold text-green-800 mb-2">💡 Opportunities Identified</h3>
              <ul className="text-sm text-green-700 space-y-1">
                {dataInsights.opportunities.map((opp, i) => (
                  <li key={i}>• {opp}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {/* Legal Tools Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {legalTools.map((tool) => {
          const isRecommended = dataInsights.recommendedTools?.includes(tool.id);
          const isDataReady = tool.dataRequired.every(req => 
            clientProfile[req] && clientProfile[req] !== null
          );

          return (
            <div
              key={tool.id}
              className={`relative border-2 rounded-lg p-6 cursor-pointer transition-all hover:shadow-lg ${
                isRecommended 
                  ? 'border-blue-500 bg-blue-50' 
                  : getUrgencyColor(tool.urgency)
              }`}
              onClick={() => onToolSelect && onToolSelect(tool)}
            >
              {/* Business Value Indicator (for internal tracking) */}
              <div className="absolute top-2 right-2 text-lg" title={`Business Value: ${tool.businessValue}`}>
                {getBusinessValueIndicator(tool.businessValue)}
              </div>

              {isRecommended && (
                <div className="absolute -top-2 -left-2 bg-blue-600 text-white text-xs px-2 py-1 rounded-full">
                  AI Recommended
                </div>
              )}

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <tool.icon className="h-8 w-8 text-gray-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{tool.title}</h3>
                  <p className="text-gray-600 text-sm mb-4">{tool.description}</p>
                  
                  <div className="grid grid-cols-2 gap-4 text-xs text-gray-500 mb-4">
                    <div>
                      <span className="font-medium">Timeline:</span> {tool.estimatedTime}
                    </div>
                    <div>
                      <span className="font-medium">Cost:</span> {tool.cost}
                    </div>
                  </div>

                  {/* Data Readiness Indicator */}
                  <div className="flex items-center justify-between">
                    <div className={`text-xs px-2 py-1 rounded ${
                      isDataReady 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {isDataReady ? '✅ Data Ready' : '⏳ Additional Data Needed'}
                    </div>
                    <ChevronRightIcon className="h-5 w-5 text-gray-400" />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Arizona ABS Integration Notice */}
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
        <h3 className="font-semibold text-gray-800 mb-2">🏛️ Legal Services Network</h3>
        <p className="text-sm text-gray-600 mb-4">
          All legal services are provided through our Arizona Alternative Business Structure, 
          connecting you with qualified attorneys nationwide while maintaining consistent 
          quality and competitive pricing.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div className="flex items-center space-x-2">
            <span className="text-green-600">✓</span>
            <span>Licensed attorneys in all 50 states</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-green-600">✓</span>
            <span>Transparent, fixed pricing</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-green-600">✓</span>
            <span>AI-enhanced document preparation</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LegalToolFramework;