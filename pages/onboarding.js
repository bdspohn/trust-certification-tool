import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { 
  BuildingOffice2Icon,
  UserGroupIcon,
  DocumentTextIcon,
  ShieldCheckIcon,
  CheckCircleIcon,
  ClockIcon,
  ArrowRightIcon
} from '@heroicons/react/24/outline';

const InstitutionOnboarding = () => {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    // Institution Details
    institutionName: '',
    institutionType: '',
    assetsUnderManagement: '',
    headquartersState: '',
    yearFounded: '',
    numberOfBranches: '',
    
    // Contact Information
    primaryContactName: '',
    primaryContactTitle: '',
    primaryContactEmail: '',
    primaryContactPhone: '',
    technicalContactName: '',
    technicalContactEmail: '',
    
    // Use Case & Requirements
    useCases: [],
    expectedMonthlyVolume: '',
    currentTrustProcess: '',
    integrationTimeline: '',
    complianceRequirements: [],
    
    // Technical Details
    existingSystems: [],
    preferredIntegration: '',
    webhookUrl: '',
    ipWhitelist: '',
    
    // Legal & Compliance
    regulatoryOversight: [],
    dataRetentionRequirements: '',
    auditRequirements: '',
    insuranceNeeds: false
  });

  const steps = [
    { 
      title: 'Institution Details', 
      description: 'Tell us about your organization',
      icon: BuildingOffice2Icon 
    },
    { 
      title: 'Contact Information', 
      description: 'Primary and technical contacts',
      icon: UserGroupIcon 
    },
    { 
      title: 'Use Cases & Volume', 
      description: 'How you plan to use the API',
      icon: DocumentTextIcon 
    },
    { 
      title: 'Technical Setup', 
      description: 'Integration requirements',
      icon: ShieldCheckIcon 
    },
    { 
      title: 'Review & Submit', 
      description: 'Finalize your application',
      icon: CheckCircleIcon 
    }
  ];

  const institutionTypes = [
    'Commercial Bank',
    'Credit Union', 
    'Investment Firm',
    'Trust Company',
    'Insurance Company',
    'Title Company',
    'Wealth Management Firm',
    'Corporate Trustee',
    'Other Financial Institution'
  ];

  const useCaseOptions = [
    { id: 'account_opening', label: 'Account Opening Verification' },
    { id: 'loan_origination', label: 'Loan Origination' },
    { id: 'investment_management', label: 'Investment Account Management' },
    { id: 'compliance_monitoring', label: 'Ongoing Compliance Monitoring' },
    { id: 'risk_assessment', label: 'Risk Assessment & KYC' },
    { id: 'estate_settlement', label: 'Estate Settlement Services' },
    { id: 'trust_administration', label: 'Trust Administration' },
    { id: 'audit_preparation', label: 'Audit Preparation' }
  ];

  const complianceOptions = [
    { id: 'bsa_aml', label: 'BSA/AML Requirements' },
    { id: 'kyc', label: 'Know Your Customer (KYC)' },
    { id: 'cip', label: 'Customer Identification Program (CIP)' },
    { id: 'privacy_act', label: 'Privacy Act Compliance' },
    { id: 'sox', label: 'Sarbanes-Oxley (SOX)' },
    { id: 'state_banking', label: 'State Banking Regulations' },
    { id: 'federal_banking', label: 'Federal Banking Regulations' },
    { id: 'fiduciary', label: 'Fiduciary Duty Requirements' }
  ];

  const existingSystemOptions = [
    'Core Banking System (FIS, Fiserv, Jack Henry)',
    'CRM (Salesforce, Microsoft Dynamics)',
    'Loan Origination System',
    'Wealth Management Platform',
    'Document Management System',
    'Compliance Platform',
    'Risk Management System',
    'Other Custom Systems'
  ];

  const calculatePricing = () => {
    const volume = parseInt(formData.expectedMonthlyVolume) || 0;
    
    if (volume <= 1000) {
      return { plan: 'Community', monthly: 500, setup: 1000, perCall: 2.00 };
    } else if (volume <= 5000) {
      return { plan: 'Regional', monthly: 2000, setup: 5000, perCall: 1.50 };
    } else if (volume <= 25000) {
      return { plan: 'Enterprise', monthly: 8000, setup: 15000, perCall: 1.00 };
    } else {
      return { plan: 'Platform', monthly: 25000, setup: 50000, perCall: 0.75 };
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleArrayToggle = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter(item => item !== value)
        : [...prev[field], value]
    }));
  };

  const handleNext = () => {
    if (step < steps.length - 1) {
      setStep(step + 1);
    }
  };

  const handlePrevious = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  const handleSubmit = async () => {
    // In production, this would submit to your backend
    const applicationData = {
      ...formData,
      submittedAt: new Date().toISOString(),
      recommendedPricing: calculatePricing()
    };

    console.log('Institution Application Submitted:', applicationData);
    
    // Simulate API call
    alert('Application submitted successfully! You will receive confirmation within 24 hours.');
  };

  const renderStepContent = () => {
    switch (step) {
      case 0:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Institution Name *
                </label>
                <input
                  type="text"
                  value={formData.institutionName}
                  onChange={(e) => handleInputChange('institutionName', e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3"
                  placeholder="Wells Fargo Bank"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Institution Type *
                </label>
                <select
                  value={formData.institutionType}
                  onChange={(e) => handleInputChange('institutionType', e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3"
                >
                  <option value="">Select type</option>
                  {institutionTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Assets Under Management
                </label>
                <select
                  value={formData.assetsUnderManagement}
                  onChange={(e) => handleInputChange('assetsUnderManagement', e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3"
                >
                  <option value="">Select range</option>
                  <option value="under_100m">Under $100M</option>
                  <option value="100m_1b">$100M - $1B</option>
                  <option value="1b_10b">$1B - $10B</option>
                  <option value="10b_100b">$10B - $100B</option>
                  <option value="over_100b">Over $100B</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Headquarters State *
                </label>
                <select
                  value={formData.headquartersState}
                  onChange={(e) => handleInputChange('headquartersState', e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3"
                >
                  <option value="">Select state</option>
                  <option value="CA">California</option>
                  <option value="TX">Texas</option>
                  <option value="NY">New York</option>
                  <option value="FL">Florida</option>
                  {/* Add more states */}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Year Founded
                </label>
                <input
                  type="number"
                  value={formData.yearFounded}
                  onChange={(e) => handleInputChange('yearFounded', e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3"
                  placeholder="1985"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Number of Branches/Offices
                </label>
                <input
                  type="number"
                  value={formData.numberOfBranches}
                  onChange={(e) => handleInputChange('numberOfBranches', e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3"
                  placeholder="25"
                />
              </div>
            </div>
          </div>
        );

      case 1:
        return (
          <div className="space-y-6">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <h4 className="font-semibold text-blue-900 mb-2">Contact Information</h4>
              <p className="text-sm text-blue-800">
                We'll use these contacts for onboarding, support, and technical integration.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Primary Contact Name *
                </label>
                <input
                  type="text"
                  value={formData.primaryContactName}
                  onChange={(e) => handleInputChange('primaryContactName', e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3"
                  placeholder="John Smith"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Primary Contact Title *
                </label>
                <input
                  type="text"
                  value={formData.primaryContactTitle}
                  onChange={(e) => handleInputChange('primaryContactTitle', e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3"
                  placeholder="VP of Operations"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Primary Contact Email *
                </label>
                <input
                  type="email"
                  value={formData.primaryContactEmail}
                  onChange={(e) => handleInputChange('primaryContactEmail', e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3"
                  placeholder="john.smith@bank.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Primary Contact Phone *
                </label>
                <input
                  type="tel"
                  value={formData.primaryContactPhone}
                  onChange={(e) => handleInputChange('primaryContactPhone', e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3"
                  placeholder="(555) 123-4567"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Technical Contact Name
                </label>
                <input
                  type="text"
                  value={formData.technicalContactName}
                  onChange={(e) => handleInputChange('technicalContactName', e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3"
                  placeholder="Jane Doe"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Technical Contact Email
                </label>
                <input
                  type="email"
                  value={formData.technicalContactEmail}
                  onChange={(e) => handleInputChange('technicalContactEmail', e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3"
                  placeholder="jane.doe@bank.com"
                />
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Primary Use Cases * (Select all that apply)
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {useCaseOptions.map(useCase => (
                  <label key={useCase.id} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.useCases.includes(useCase.id)}
                      onChange={() => handleArrayToggle('useCases', useCase.id)}
                      className="h-4 w-4 text-blue-600 rounded border-gray-300"
                    />
                    <span className="ml-2 text-sm text-gray-700">{useCase.label}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Expected Monthly API Calls *
                </label>
                <select
                  value={formData.expectedMonthlyVolume}
                  onChange={(e) => handleInputChange('expectedMonthlyVolume', e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3"
                >
                  <option value="">Select volume</option>
                  <option value="500">Under 500</option>
                  <option value="1000">500 - 1,000</option>
                  <option value="5000">1,000 - 5,000</option>
                  <option value="25000">5,000 - 25,000</option>
                  <option value="100000">25,000 - 100,000</option>
                  <option value="250000">Over 100,000</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Integration Timeline
                </label>
                <select
                  value={formData.integrationTimeline}
                  onChange={(e) => handleInputChange('integrationTimeline', e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3"
                >
                  <option value="">Select timeline</option>
                  <option value="immediate">ASAP (&lt; 1 month)</option>
                  <option value="quarter">This quarter (1-3 months)</option>
                  <option value="half_year">6 months</option>
                  <option value="planning">Planning phase (6+ months)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Current Trust Verification Process
              </label>
              <textarea
                value={formData.currentTrustProcess}
                onChange={(e) => handleInputChange('currentTrustProcess', e.target.value)}
                rows={3}
                className="w-full border border-gray-300 rounded-lg px-4 py-3"
                placeholder="Describe your current process for verifying trust documents..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Compliance Requirements (Select all that apply)
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {complianceOptions.map(requirement => (
                  <label key={requirement.id} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.complianceRequirements.includes(requirement.id)}
                      onChange={() => handleArrayToggle('complianceRequirements', requirement.id)}
                      className="h-4 w-4 text-blue-600 rounded border-gray-300"
                    />
                    <span className="ml-2 text-sm text-gray-700">{requirement.label}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Existing Systems (Select all that apply)
              </label>
              <div className="grid grid-cols-1 gap-3">
                {existingSystemOptions.map(system => (
                  <label key={system} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.existingSystems.includes(system)}
                      onChange={() => handleArrayToggle('existingSystems', system)}
                      className="h-4 w-4 text-blue-600 rounded border-gray-300"
                    />
                    <span className="ml-2 text-sm text-gray-700">{system}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Preferred Integration Method
                </label>
                <select
                  value={formData.preferredIntegration}
                  onChange={(e) => handleInputChange('preferredIntegration', e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3"
                >
                  <option value="">Select method</option>
                  <option value="rest_api">REST API</option>
                  <option value="webhooks">Webhooks</option>
                  <option value="batch_processing">Batch Processing</option>
                  <option value="custom_integration">Custom Integration</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Webhook URL (if applicable)
                </label>
                <input
                  type="url"
                  value={formData.webhookUrl}
                  onChange={(e) => handleInputChange('webhookUrl', e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3"
                  placeholder="https://api.yourbank.com/webhooks/trust-updates"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                IP Address Whitelist (comma separated)
              </label>
              <input
                type="text"
                value={formData.ipWhitelist}
                onChange={(e) => handleInputChange('ipWhitelist', e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-3"
                placeholder="192.168.1.1, 10.0.0.1"
              />
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                checked={formData.insuranceNeeds}
                onChange={(e) => handleInputChange('insuranceNeeds', e.target.checked)}
                className="h-4 w-4 text-blue-600 rounded border-gray-300"
              />
              <span className="ml-2 text-sm text-gray-700">
                Interested in Trust Insurance coverage
              </span>
            </div>
          </div>
        );

      case 4:
        const pricing = calculatePricing();
        return (
          <div className="space-y-6">
            <div className="bg-green-50 border border-green-200 rounded-lg p-6">
              <h4 className="font-semibold text-green-900 mb-4">Application Summary</h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium text-gray-700">Institution:</span>
                  <div className="text-gray-900">{formData.institutionName}</div>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Type:</span>
                  <div className="text-gray-900">{formData.institutionType}</div>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Expected Volume:</span>
                  <div className="text-gray-900">{formData.expectedMonthlyVolume} calls/month</div>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Use Cases:</span>
                  <div className="text-gray-900">{formData.useCases.length} selected</div>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h4 className="font-semibold text-blue-900 mb-4">Recommended Pricing</h4>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <span className="text-sm font-medium text-gray-700">Plan:</span>
                  <div className="text-xl font-bold text-blue-900">{pricing.plan}</div>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-700">Monthly Cost:</span>
                  <div className="text-xl font-bold text-blue-900">${pricing.monthly.toLocaleString()}</div>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-700">Setup Fee:</span>
                  <div className="text-xl font-bold text-blue-900">${pricing.setup.toLocaleString()}</div>
                </div>
              </div>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <h4 className="font-semibold text-yellow-800 mb-2">Next Steps</h4>
              <ol className="text-sm text-yellow-700 space-y-1 list-decimal list-inside">
                <li>Application review and KYB verification (24-48 hours)</li>
                <li>API credentials generation and sandbox access</li>
                <li>Technical integration call with our team</li>
                <li>Production testing and go-live</li>
              </ol>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <>
      <Head>
        <title>Institution Onboarding - Trust Registry API</title>
        <meta name="description" content="Get your financial institution connected to Trust Registry API" />
      </Head>

      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <Link href="/" className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <div className="text-white text-sm font-bold">T</div>
                </div>
                <span className="text-xl font-bold text-gray-900">Trusto</span>
              </Link>
              <div className="text-sm text-gray-500">
                Need help? Contact: institutions@trusto.inc
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Institution Onboarding
            </h1>
            <p className="text-lg text-gray-600">
              Join the Trust Registry network and start verifying trusts in real-time
            </p>
          </div>

          {/* Progress Steps */}
          <div className="mb-12">
            <div className="flex items-center justify-between mb-4">
              {steps.map((stepItem, index) => (
                <div key={index} className="flex items-center">
                  <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                    index <= step 
                      ? 'bg-blue-600 border-blue-600 text-white' 
                      : 'border-gray-300 text-gray-400'
                  }`}>
                    {index < step ? (
                      <CheckCircleIcon className="h-6 w-6" />
                    ) : (
                      <stepItem.icon className="h-5 w-5" />
                    )}
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`h-1 w-24 mx-4 ${
                      index < step ? 'bg-blue-600' : 'bg-gray-300'
                    }`} />
                  )}
                </div>
              ))}
            </div>
            
            <div className="text-center">
              <h2 className="text-xl font-semibold text-gray-900">
                {steps[step].title}
              </h2>
              <p className="text-gray-600">{steps[step].description}</p>
            </div>
          </div>

          {/* Step Content */}
          <div className="bg-white rounded-lg border border-gray-200 p-8 mb-8">
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
              onClick={step === steps.length - 1 ? handleSubmit : handleNext}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 flex items-center"
            >
              {step === steps.length - 1 ? 'Submit Application' : 'Next'}
              {step < steps.length - 1 && <ArrowRightIcon className="h-4 w-4 ml-2" />}
            </button>
          </div>

          {/* Contact Information */}
          <div className="mt-12 bg-gray-100 rounded-lg p-6 text-center">
            <h3 className="font-semibold text-gray-900 mb-2">Need Assistance?</h3>
            <p className="text-gray-600 text-sm mb-4">
              Our institution onboarding team is here to help with your integration.
            </p>
            <div className="flex justify-center space-x-6 text-sm">
              <div>
                <span className="font-medium text-gray-700">Email:</span>
                <a href="mailto:institutions@trusto.inc" className="text-blue-600 ml-1">
                  institutions@trusto.inc
                </a>
              </div>
              <div>
                <span className="font-medium text-gray-700">Phone:</span>
                <a href="tel:+1-555-TRUSTO" className="text-blue-600 ml-1">
                  +1 (555) TRUSTO
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default InstitutionOnboarding;