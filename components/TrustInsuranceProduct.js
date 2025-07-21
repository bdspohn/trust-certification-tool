import React, { useState } from 'react';
import { 
  ShieldCheckIcon, 
  CurrencyDollarIcon, 
  ExclamationTriangleIcon,
  DocumentTextIcon,
  CheckCircleIcon,
  ClockIcon
} from '@heroicons/react/24/outline';

const TrustInsuranceProduct = ({ trustData, onPurchase }) => {
  const [selectedCoverage, setSelectedCoverage] = useState('standard');
  const [quoteCalculated, setQuoteCalculated] = useState(false);

  // Calculate insurance premium based on trust value and risk factors
  const calculatePremium = (trustValue, riskProfile, coverageLevel) => {
    const basePremiumRate = {
      'basic': 0.001,      // 0.1% of trust value
      'standard': 0.002,   // 0.2% of trust value  
      'premium': 0.003     // 0.3% of trust value
    };

    const riskMultiplier = {
      'low': 1.0,
      'medium': 1.5,
      'high': 2.0
    };

    const baseRate = basePremiumRate[coverageLevel];
    const riskAdjustment = riskMultiplier[riskProfile];
    
    return Math.round(trustValue * baseRate * riskAdjustment);
  };

  // Sample trust data for calculation
  const sampleTrustValue = 2350000; // $2.35M
  const riskProfile = 'low'; // Based on trust age, complexity, update frequency

  const coverageOptions = [
    {
      id: 'basic',
      name: 'Basic Coverage',
      description: 'Essential protection against trustee verification errors',
      coverage_limit: '$100,000',
      premium: calculatePremium(sampleTrustValue, riskProfile, 'basic'),
      features: [
        'Trustee identity verification errors',
        'Basic status verification coverage',
        'Legal defense costs up to $25,000',
        'Standard claims processing'
      ],
      exclusions: [
        'Intentional fraud by trustee',
        'Changes not reported within 90 days'
      ]
    },
    {
      id: 'standard',
      name: 'Standard Coverage',
      description: 'Comprehensive protection for most trust operations',
      coverage_limit: '$500,000',
      premium: calculatePremium(sampleTrustValue, riskProfile, 'standard'),
      features: [
        'All Basic Coverage features',
        'Beneficiary verification errors',
        'Asset valuation discrepancies',
        'Legal defense costs up to $100,000',
        'Priority claims processing',
        'Real-time monitoring alerts'
      ],
      exclusions: [
        'Intentional fraud by trustee',
        'Changes not reported within 60 days'
      ],
      recommended: true
    },
    {
      id: 'premium',
      name: 'Premium Coverage',
      description: 'Maximum protection for high-value trusts',
      coverage_limit: '$2,000,000',
      premium: calculatePremium(sampleTrustValue, riskProfile, 'premium'),
      features: [
        'All Standard Coverage features',
        'Successor trustee verification',
        'Trust amendment coverage',
        'Legal defense costs unlimited',
        'White-glove claims service',
        'Dedicated account manager',
        'Proactive risk monitoring'
      ],
      exclusions: [
        'Intentional fraud by trustee'
      ]
    }
  ];

  const selectedOption = coverageOptions.find(option => option.id === selectedCoverage);

  const riskFactors = [
    {
      factor: 'Trust Age',
      assessment: '9 years old',
      risk: 'low',
      impact: 'Established trust with stable operations'
    },
    {
      factor: 'Trustee Changes',
      assessment: 'No changes in 5 years',
      risk: 'low',
      impact: 'Stable trustee management'
    },
    {
      factor: 'Institution Connections',
      assessment: '3 major institutions',
      risk: 'medium',
      impact: 'Multiple touchpoints increase verification complexity'
    },
    {
      factor: 'Asset Complexity',
      assessment: 'Real estate + investments',
      risk: 'medium',
      impact: 'Mixed asset types require ongoing valuation'
    }
  ];

  const claimsExamples = [
    {
      scenario: 'Bank Rejects Valid Trustee',
      description: 'Institution rejects legitimate trustee due to outdated verification data',
      coverage: '$15,000',
      outcome: 'Legal costs covered, trustee reinstated within 48 hours'
    },
    {
      scenario: 'Asset Transfer Blocked',
      description: 'Property sale blocked due to beneficiary verification discrepancy',
      coverage: '$45,000',
      outcome: 'Transaction costs and legal fees covered, sale completed'
    },
    {
      scenario: 'Successor Trustee Dispute',
      description: 'Institution questions successor trustee authority during transition',
      coverage: '$125,000',
      outcome: 'Legal defense and validation costs covered'
    }
  ];

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center mb-4">
          <ShieldCheckIcon className="h-12 w-12 text-blue-600 mr-4" />
          <h1 className="text-3xl font-bold text-gray-900">Trust Verification Insurance</h1>
        </div>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Protect against financial losses from trust verification errors and institutional disputes. 
          Like title insurance, but for trust operations.
        </p>
      </div>

      {/* Value Proposition */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
        <h2 className="text-xl font-semibold text-blue-900 mb-4">Why Trust Insurance?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <ExclamationTriangleIcon className="h-8 w-8 text-blue-600 mx-auto mb-2" />
            <h3 className="font-semibold text-blue-800">The Problem</h3>
            <p className="text-sm text-blue-700">
              95% of trustees never notify institutions of trust changes, creating counterparty risk
            </p>
          </div>
          <div className="text-center">
            <CurrencyDollarIcon className="h-8 w-8 text-blue-600 mx-auto mb-2" />
            <h3 className="font-semibold text-blue-800">The Cost</h3>
            <p className="text-sm text-blue-700">
              Average verification dispute costs $25,000+ in legal fees and delayed transactions
            </p>
          </div>
          <div className="text-center">
            <ShieldCheckIcon className="h-8 w-8 text-blue-600 mx-auto mb-2" />
            <h3 className="font-semibold text-blue-800">The Solution</h3>
            <p className="text-sm text-blue-700">
              Insurance coverage plus real-time verification infrastructure
            </p>
          </div>
        </div>
      </div>

      {/* Trust Information */}
      <div className="bg-white border border-gray-200 rounded-lg p-6 mb-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Trust Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <span className="text-sm font-medium text-gray-700">Trust Name:</span>
            <div className="text-gray-900">John and Mary Smith Family Trust</div>
          </div>
          <div>
            <span className="text-sm font-medium text-gray-700">Estimated Value:</span>
            <div className="text-lg font-bold text-gray-900">${sampleTrustValue.toLocaleString()}</div>
          </div>
          <div>
            <span className="text-sm font-medium text-gray-700">Risk Profile:</span>
            <div className={`inline-flex px-2 py-1 rounded text-sm font-medium ${
              riskProfile === 'low' ? 'bg-green-100 text-green-800' :
              riskProfile === 'medium' ? 'bg-yellow-100 text-yellow-800' :
              'bg-red-100 text-red-800'
            }`}>
              {riskProfile.toUpperCase()}
            </div>
          </div>
        </div>
      </div>

      {/* Coverage Options */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold text-gray-900 mb-6">Choose Your Coverage</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {coverageOptions.map((option) => (
            <div
              key={option.id}
              className={`relative border-2 rounded-lg p-6 cursor-pointer transition-all ${
                selectedCoverage === option.id
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              } ${option.recommended ? 'ring-2 ring-blue-500 ring-offset-2' : ''}`}
              onClick={() => setSelectedCoverage(option.id)}
            >
              {option.recommended && (
                <div className="absolute -top-3 left-4 bg-blue-600 text-white text-xs px-3 py-1 rounded-full">
                  Recommended
                </div>
              )}
              
              <div className="text-center mb-4">
                <h4 className="text-lg font-semibold text-gray-900">{option.name}</h4>
                <p className="text-sm text-gray-600 mt-1">{option.description}</p>
              </div>

              <div className="text-center mb-4">
                <div className="text-2xl font-bold text-gray-900">${option.premium.toLocaleString()}</div>
                <div className="text-sm text-gray-500">per year</div>
                <div className="text-sm font-medium text-blue-600">Coverage up to {option.coverage_limit}</div>
              </div>

              <div className="space-y-2 mb-4">
                <h5 className="font-medium text-gray-700">Includes:</h5>
                {option.features.map((feature, i) => (
                  <div key={i} className="flex items-start text-sm">
                    <CheckCircleIcon className="h-4 w-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>

              {option.exclusions.length > 0 && (
                <div className="border-t border-gray-200 pt-3">
                  <h5 className="font-medium text-gray-700 mb-2">Key Exclusions:</h5>
                  {option.exclusions.map((exclusion, i) => (
                    <div key={i} className="text-xs text-gray-500 mb-1">
                      • {exclusion}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Risk Assessment */}
      <div className="bg-white border border-gray-200 rounded-lg p-6 mb-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Risk Assessment</h3>
        <div className="space-y-4">
          {riskFactors.map((factor, i) => (
            <div key={i} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
              <div className="flex-1">
                <div className="font-medium text-gray-900">{factor.factor}</div>
                <div className="text-sm text-gray-600">{factor.assessment}</div>
              </div>
              <div className="mx-4">
                <span className={`px-2 py-1 rounded text-xs font-medium ${
                  factor.risk === 'low' ? 'bg-green-100 text-green-800' :
                  factor.risk === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {factor.risk}
                </span>
              </div>
              <div className="flex-1 text-sm text-gray-600">
                {factor.impact}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Claims Examples */}
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Real Claims Examples</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {claimsExamples.map((claim, i) => (
            <div key={i} className="bg-white rounded-lg p-4 border border-gray-200">
              <h4 className="font-semibold text-gray-900 mb-2">{claim.scenario}</h4>
              <p className="text-sm text-gray-600 mb-3">{claim.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-green-600">Covered: {claim.coverage}</span>
                <ClockIcon className="h-4 w-4 text-gray-400" />
              </div>
              <div className="text-xs text-gray-500 mt-2">{claim.outcome}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Purchase Section */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl font-semibold text-gray-900">Selected Coverage</h3>
            <p className="text-gray-600">{selectedOption.name} - {selectedOption.description}</p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-gray-900">
              ${selectedOption.premium.toLocaleString()}/year
            </div>
            <div className="text-sm text-gray-500">Coverage up to {selectedOption.coverage_limit}</div>
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <h4 className="font-semibold text-blue-900 mb-2">What happens next?</h4>
          <ol className="text-sm text-blue-800 space-y-1 list-decimal list-inside">
            <li>Complete application and underwriting review (24-48 hours)</li>
            <li>Policy issued and coverage begins immediately</li>
            <li>Integration with Trust Registry for real-time monitoring</li>
            <li>Receive policy documents and certificate of insurance</li>
          </ol>
        </div>

        <div className="flex items-center space-x-4">
          <button 
            onClick={() => onPurchase && onPurchase(selectedOption)}
            className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 font-semibold"
          >
            Apply for Coverage
          </button>
          <button className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-50">
            Download Quote
          </button>
          <div className="text-sm text-gray-500">
            No commitment required • Instant approval for qualified trusts
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrustInsuranceProduct;