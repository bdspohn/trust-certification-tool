import React, { useState, useEffect } from 'react';
import { ArrowLeftIcon, DocumentPlusIcon, UserPlusIcon, BuildingOffice2Icon } from '@heroicons/react/24/outline';

const TrustAmendmentTool = ({ trustData, onComplete, onBack, onDataCapture }) => {
  const [step, setStep] = useState(0);
  const [amendmentType, setAmendmentType] = useState('');
  const [form, setForm] = useState({
    // Pre-filled from AI extraction
    trustName: trustData?.trustName || '',
    currentTrustees: trustData?.trustees || [],
    currentBeneficiaries: trustData?.beneficiaries || [],
    trustDate: trustData?.trustDate || '',
    state: trustData?.state || 'CA',
    
    // Amendment details
    amendmentReason: '',
    changes: {
      beneficiaries: {
        add: [],
        remove: [],
        modify: []
      },
      trustees: {
        add: [],
        remove: [],
        modify: []
      },
      assets: {
        add: [],
        remove: []
      },
      distributions: {
        modify: []
      }
    },
    
    // Legal requirements
    attorneyReview: true,
    notarizationRequired: true,
    recordingRequired: false,
    
    // Business analytics data
    amendmentValue: '', // For B2B insights
    clientMotivation: '', // For pattern analysis
    urgencyLevel: 'normal'
  });

  const [estimatedCost, setEstimatedCost] = useState(750);
  const [timeline, setTimeline] = useState('3-5 business days');

  const amendmentTypes = [
    {
      id: 'beneficiary_change',
      title: 'Beneficiary Changes',
      description: 'Add, remove, or modify beneficiaries and their distributions',
      icon: UserPlusIcon,
      complexity: 'medium',
      baseCost: 750,
      commonReasons: ['New family member', 'Deceased beneficiary', 'Changed relationships']
    },
    {
      id: 'trustee_change',
      title: 'Trustee Modifications',
      description: 'Change current trustees or succession plans',
      icon: BuildingOffice2Icon,
      complexity: 'medium',
      baseCost: 650,
      commonReasons: ['Trustee resignation', 'Corporate trustee change', 'Succession planning']
    },
    {
      id: 'asset_management',
      title: 'Asset Additions/Removals',
      description: 'Add new assets to trust or remove existing ones',
      icon: DocumentPlusIcon,
      complexity: 'low',
      baseCost: 500,
      commonReasons: ['New property purchase', 'Asset sale', 'Business acquisition']
    },
    {
      id: 'distribution_terms',
      title: 'Distribution Terms',
      description: 'Modify how and when distributions are made',
      icon: DocumentPlusIcon,
      complexity: 'high',
      baseCost: 1200,
      commonReasons: ['Tax optimization', 'Beneficiary maturity', 'Family circumstances']
    }
  ];

  const steps = [
    { title: 'Amendment Type', description: 'Choose what you want to modify' },
    { title: 'Current Information', description: 'Review extracted trust details' },
    { title: 'Proposed Changes', description: 'Specify your modifications' },
    { title: 'Legal Review', description: 'Attorney coordination and finalization' }
  ];

  useEffect(() => {
    // Calculate cost and timeline based on complexity
    const selectedType = amendmentTypes.find(t => t.id === amendmentType);
    if (selectedType) {
      let cost = selectedType.baseCost;
      let timelineDays = 3;
      
      // Adjust for complexity
      if (selectedType.complexity === 'high') {
        cost += 500;
        timelineDays += 2;
      } else if (selectedType.complexity === 'low') {
        cost -= 150;
        timelineDays -= 1;
      }
      
      // State-specific adjustments
      if (form.state === 'CA' || form.state === 'NY') {
        cost += 200; // Higher compliance requirements
      }
      
      setEstimatedCost(cost);
      setTimeline(`${timelineDays}-${timelineDays + 2} business days`);
    }
  }, [amendmentType, form.state]);

  // Capture business intelligence data
  useEffect(() => {
    if (onDataCapture && amendmentType) {
      onDataCapture({
        toolType: 'trust_amendment',
        amendmentType: amendmentType,
        trustAge: calculateTrustAge(form.trustDate),
        assetValue: form.amendmentValue,
        motivation: form.clientMotivation,
        state: form.state,
        complexity: amendmentTypes.find(t => t.id === amendmentType)?.complexity,
        timestamp: new Date().toISOString()
      });
    }
  }, [amendmentType, form.amendmentValue, form.clientMotivation]);

  const calculateTrustAge = (trustDate) => {
    if (!trustDate) return 0;
    const today = new Date();
    const trust = new Date(trustDate);
    return today.getFullYear() - trust.getFullYear();
  };

  const handleNext = () => {
    if (step < steps.length - 1) {
      setStep(step + 1);
    } else {
      // Final submission
      handleSubmission();
    }
  };

  const handlePrevious = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  const handleSubmission = () => {
    const submissionData = {
      amendmentType,
      trustData: {
        ...trustData,
        proposedChanges: form.changes
      },
      estimatedCost,
      timeline,
      clientInfo: {
        motivation: form.clientMotivation,
        urgency: form.urgencyLevel
      },
      nextSteps: [
        'Attorney review of proposed changes',
        'Draft amendment preparation',
        'Client review and approval',
        'Notarization and execution',
        'Distribution to relevant parties'
      ]
    };
    
    onComplete && onComplete(submissionData);
  };

  const renderStepContent = () => {
    switch (step) {
      case 0:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold mb-4">What would you like to modify in your trust?</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {amendmentTypes.map((type) => (
                <div
                  key={type.id}
                  className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                    amendmentType === type.id
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => setAmendmentType(type.id)}
                >
                  <div className="flex items-start space-x-3">
                    <type.icon className="h-6 w-6 text-gray-600 mt-1" />
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900">{type.title}</h4>
                      <p className="text-sm text-gray-600 mt-1">{type.description}</p>
                      <div className="mt-3 flex items-center justify-between">
                        <span className="text-sm font-medium text-green-600">
                          Starting at ${type.baseCost.toLocaleString()}
                        </span>
                        <span className={`text-xs px-2 py-1 rounded ${
                          type.complexity === 'high' ? 'bg-red-100 text-red-800' :
                          type.complexity === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-green-100 text-green-800'
                        }`}>
                          {type.complexity} complexity
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {amendmentType && (
              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-2">Common reasons for this type of amendment:</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  {amendmentTypes.find(t => t.id === amendmentType)?.commonReasons.map((reason, i) => (
                    <li key={i}>• {reason}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        );

      case 1:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold mb-4">Current Trust Information</h3>
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
              <h4 className="font-medium text-green-800 mb-2">✅ Pre-filled from your trust document</h4>
              <p className="text-sm text-green-700">
                Our AI has extracted this information from your trust. Please verify accuracy.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Trust Name</label>
                <input
                  type="text"
                  value={form.trustName}
                  onChange={(e) => setForm({...form, trustName: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Trust Date</label>
                <input
                  type="date"
                  value={form.trustDate}
                  onChange={(e) => setForm({...form, trustDate: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Current Trustees</label>
              <div className="space-y-2">
                {form.currentTrustees.map((trustee, i) => (
                  <div key={i} className="flex items-center p-3 bg-gray-50 rounded border">
                    <span className="flex-1">{trustee}</span>
                    <span className="text-sm text-gray-500">Current Trustee</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Current Beneficiaries</label>
              <div className="space-y-2">
                {form.currentBeneficiaries.map((beneficiary, i) => (
                  <div key={i} className="flex items-center p-3 bg-gray-50 rounded border">
                    <span className="flex-1">{beneficiary}</span>
                    <span className="text-sm text-gray-500">Beneficiary</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold mb-4">Describe Your Proposed Changes</h3>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Reason for Amendment *
              </label>
              <textarea
                value={form.amendmentReason}
                onChange={(e) => setForm({...form, amendmentReason: e.target.value})}
                rows={3}
                className="w-full border border-gray-300 rounded-lg px-4 py-2"
                placeholder="Briefly explain why you need to amend your trust..."
              />
            </div>

            {/* Business Intelligence Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Estimated Value Impact (Optional)
                </label>
                <select
                  value={form.amendmentValue}
                  onChange={(e) => setForm({...form, amendmentValue: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2"
                >
                  <option value="">Select range</option>
                  <option value="under_100k">Under $100,000</option>
                  <option value="100k_500k">$100,000 - $500,000</option>
                  <option value="500k_1m">$500,000 - $1,000,000</option>
                  <option value="1m_5m">$1,000,000 - $5,000,000</option>
                  <option value="over_5m">Over $5,000,000</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Urgency Level
                </label>
                <select
                  value={form.urgencyLevel}
                  onChange={(e) => setForm({...form, urgencyLevel: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2"
                >
                  <option value="normal">Normal (30 days)</option>
                  <option value="expedited">Expedited (2 weeks)</option>
                  <option value="urgent">Urgent (1 week)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Primary Motivation (helps us serve you better)
              </label>
              <select
                value={form.clientMotivation}
                onChange={(e) => setForm({...form, clientMotivation: e.target.value})}
                className="w-full border border-gray-300 rounded-lg px-4 py-2"
              >
                <option value="">Select primary reason</option>
                <option value="family_change">Family change (birth, death, marriage, divorce)</option>
                <option value="tax_planning">Tax planning and optimization</option>
                <option value="asset_protection">Asset protection</option>
                <option value="business_change">Business structure change</option>
                <option value="relocation">Relocation to different state</option>
                <option value="trustee_change">Trustee relationship change</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold mb-4">Legal Review & Next Steps</h3>
            
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h4 className="font-semibold text-blue-900 mb-4">📋 Amendment Summary</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium text-gray-700">Amendment Type:</span>
                  <p className="text-gray-900">
                    {amendmentTypes.find(t => t.id === amendmentType)?.title}
                  </p>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Estimated Cost:</span>
                  <p className="text-gray-900">${estimatedCost.toLocaleString()}</p>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Timeline:</span>
                  <p className="text-gray-900">{timeline}</p>
                </div>
                <div>
                  <span className="font-medium text-gray-700">State:</span>
                  <p className="text-gray-900">{form.state}</p>
                </div>
              </div>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-6">
              <h4 className="font-semibold text-green-900 mb-4">⚖️ Attorney Assignment</h4>
              <p className="text-sm text-green-800 mb-4">
                Your case will be assigned to a qualified estate planning attorney licensed in {form.state} 
                through our Arizona Alternative Business Structure network.
              </p>
              <div className="space-y-2 text-sm text-green-700">
                <div>✓ Licensed attorney review of all changes</div>
                <div>✓ State-specific compliance verification</div>
                <div>✓ Professional document preparation</div>
                <div>✓ Notarization coordination</div>
                <div>✓ Final execution assistance</div>
              </div>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <h4 className="font-semibold text-yellow-800 mb-2">⏰ Next Steps</h4>
              <ol className="text-sm text-yellow-700 space-y-1 list-decimal list-inside">
                <li>Attorney contact within 24 hours</li>
                <li>Detailed consultation and document review</li>
                <li>Amendment drafting and client approval</li>
                <li>Notarization and final execution</li>
                <li>Distribution to trustees and institutions</li>
              </ol>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Header */}
      <div className="flex items-center mb-6">
        <button
          onClick={onBack}
          className="flex items-center text-gray-600 hover:text-gray-800 mr-4"
        >
          <ArrowLeftIcon className="h-5 w-5 mr-1" />
          Back to Legal Tools
        </button>
        <h1 className="text-2xl font-bold text-gray-900">Trust Amendment</h1>
      </div>

      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">
            Step {step + 1} of {steps.length}: {steps[step].title}
          </span>
          <span className="text-sm text-gray-500">
            {Math.round(((step + 1) / steps.length) * 100)}% Complete
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((step + 1) / steps.length) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Step Content */}
      <div className="mb-8">
        {renderStepContent()}
      </div>

      {/* Navigation */}
      <div className="flex justify-between">
        <button
          onClick={handlePrevious}
          disabled={step === 0}
          className={`px-6 py-3 rounded-lg font-semibold ${
            step === 0
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          Previous
        </button>
        
        <button
          onClick={handleNext}
          disabled={step === 0 && !amendmentType}
          className={`px-6 py-3 rounded-lg font-semibold ${
            (step === 0 && !amendmentType)
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'bg-blue-600 text-white hover:bg-blue-700'
          }`}
        >
          {step === steps.length - 1 ? 'Submit Request' : 'Next'}
        </button>
      </div>

      {/* Cost Estimate */}
      {amendmentType && (
        <div className="mt-8 p-4 bg-gray-50 border border-gray-200 rounded-lg">
          <div className="flex justify-between items-center">
            <div>
              <span className="text-sm text-gray-600">Estimated Cost:</span>
              <span className="text-lg font-bold text-gray-900 ml-2">
                ${estimatedCost.toLocaleString()}
              </span>
            </div>
            <div>
              <span className="text-sm text-gray-600">Timeline:</span>
              <span className="text-lg font-bold text-gray-900 ml-2">
                {timeline}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TrustAmendmentTool;