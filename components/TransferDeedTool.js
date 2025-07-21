import React, { useState } from 'react';

const TransferDeedTool = ({ onComplete }) => {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    propertyType: '',
    propertyAddress: '',
    propertyCity: '',
    propertyState: 'CA',
    propertyZip: '',
    apn: '', // Assessor's Parcel Number
    currentOwner: '',
    trustName: '',
    trustDate: '',
    grantorName: '',
    notaryRequired: true,
    recordingCounty: ''
  });
  const [errors, setErrors] = useState({});

  const steps = [
    { title: 'Property Information', fields: ['propertyType', 'propertyAddress', 'propertyCity', 'propertyState', 'propertyZip', 'apn'] },
    { title: 'Ownership Details', fields: ['currentOwner', 'trustName', 'trustDate', 'grantorName'] },
    { title: 'Recording Information', fields: ['recordingCounty', 'notaryRequired'] },
    { title: 'Review & Generate', fields: [] }
  ];

  const propertyTypes = [
    { value: 'residential', label: 'Single Family Residence' },
    { value: 'condo', label: 'Condominium' },
    { value: 'commercial', label: 'Commercial Property' },
    { value: 'vacant_land', label: 'Vacant Land' },
    { value: 'multi_family', label: 'Multi-Family Residential' },
    { value: 'other', label: 'Other' }
  ];

  const states = [
    { code: 'CA', name: 'California' },
    { code: 'TX', name: 'Texas' },
    { code: 'NY', name: 'New York' },
    { code: 'FL', name: 'Florida' },
    // Add more states as needed
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateStep = () => {
    const currentFields = steps[step].fields;
    const newErrors = {};

    currentFields.forEach(field => {
      if (!form[field] || form[field].trim() === '') {
        newErrors[field] = 'This field is required';
      }
    });

    // Additional validation
    if (step === 0) {
      if (form.propertyZip && !/^\d{5}(-\d{4})?$/.test(form.propertyZip)) {
        newErrors.propertyZip = 'Invalid ZIP code format';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep()) {
      if (step < steps.length - 1) {
        setStep(step + 1);
      } else {
        // Generate deed
        generateDeed();
      }
    }
  };

  const handlePrevious = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  const generateDeed = () => {
    // This would integrate with actual deed generation logic
    const deedData = {
      ...form,
      generatedDate: new Date().toLocaleDateString(),
      deedType: 'Grant Deed', // Default for CA
      legalDescription: generateLegalDescription()
    };
    
    onComplete && onComplete(deedData);
  };

  const generateLegalDescription = () => {
    // Simplified legal description - in reality this would be much more complex
    return `The real property situated in ${form.propertyCity}, County of ${form.recordingCounty}, State of ${form.propertyState}, described as: ${form.propertyAddress}, ${form.propertyCity}, ${form.propertyState} ${form.propertyZip}. APN: ${form.apn}`;
  };

  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Property Type *
              </label>
              <select
                name="propertyType"
                value={form.propertyType}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select property type</option>
                {propertyTypes.map(type => (
                  <option key={type.value} value={type.value}>{type.label}</option>
                ))}
              </select>
              {errors.propertyType && <p className="text-red-500 text-sm mt-1">{errors.propertyType}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Property Address *
              </label>
              <input
                type="text"
                name="propertyAddress"
                value={form.propertyAddress}
                onChange={handleChange}
                placeholder="123 Main Street"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              {errors.propertyAddress && <p className="text-red-500 text-sm mt-1">{errors.propertyAddress}</p>}
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  City *
                </label>
                <input
                  type="text"
                  name="propertyCity"
                  value={form.propertyCity}
                  onChange={handleChange}
                  placeholder="Los Angeles"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                {errors.propertyCity && <p className="text-red-500 text-sm mt-1">{errors.propertyCity}</p>}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  State *
                </label>
                <select
                  name="propertyState"
                  value={form.propertyState}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {states.map(state => (
                    <option key={state.code} value={state.code}>{state.name}</option>
                  ))}
                </select>
                {errors.propertyState && <p className="text-red-500 text-sm mt-1">{errors.propertyState}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  ZIP Code *
                </label>
                <input
                  type="text"
                  name="propertyZip"
                  value={form.propertyZip}
                  onChange={handleChange}
                  placeholder="90210"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                {errors.propertyZip && <p className="text-red-500 text-sm mt-1">{errors.propertyZip}</p>}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Assessor&apos;s Parcel Number (APN) *
                <span className="text-gray-500 text-xs ml-2">Found on property tax bill</span>
              </label>
              <input
                type="text"
                name="apn"
                value={form.apn}
                onChange={handleChange}
                placeholder="123-456-789"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              {errors.apn && <p className="text-red-500 text-sm mt-1">{errors.apn}</p>}
            </div>
          </div>
        );

      case 1:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Current Owner Name *
                <span className="text-gray-500 text-xs ml-2">As shown on current deed</span>
              </label>
              <input
                type="text"
                name="currentOwner"
                value={form.currentOwner}
                onChange={handleChange}
                placeholder="John Doe"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              {errors.currentOwner && <p className="text-red-500 text-sm mt-1">{errors.currentOwner}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Trust Name *
                <span className="text-gray-500 text-xs ml-2">Full legal name of the trust</span>
              </label>
              <input
                type="text"
                name="trustName"
                value={form.trustName}
                onChange={handleChange}
                placeholder="John Doe Family Trust"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              {errors.trustName && <p className="text-red-500 text-sm mt-1">{errors.trustName}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Trust Date *
                <span className="text-gray-500 text-xs ml-2">Date trust was executed</span>
              </label>
              <input
                type="date"
                name="trustDate"
                value={form.trustDate}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              {errors.trustDate && <p className="text-red-500 text-sm mt-1">{errors.trustDate}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Grantor/Trustee Name *
                <span className="text-gray-500 text-xs ml-2">Person transferring property to trust</span>
              </label>
              <input
                type="text"
                name="grantorName"
                value={form.grantorName}
                onChange={handleChange}
                placeholder="John Doe, Trustee"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              {errors.grantorName && <p className="text-red-500 text-sm mt-1">{errors.grantorName}</p>}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Recording County *
                <span className="text-gray-500 text-xs ml-2">County where property is located</span>
              </label>
              <input
                type="text"
                name="recordingCounty"
                value={form.recordingCounty}
                onChange={handleChange}
                placeholder="Los Angeles"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              {errors.recordingCounty && <p className="text-red-500 text-sm mt-1">{errors.recordingCounty}</p>}
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="font-semibold text-blue-800 mb-2">Important Notice</h3>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• This deed must be notarized before recording</li>
                <li>• Recording fees vary by county (typically $15-50)</li>
                <li>• Consider consulting with a real estate attorney</li>
                <li>• Check with your title company about insurance implications</li>
              </ul>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                name="notaryRequired"
                checked={form.notaryRequired}
                onChange={handleChange}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label className="ml-3 text-sm text-gray-700">
                I understand this document requires notarization and county recording
              </label>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="bg-green-50 border border-green-200 rounded-lg p-6">
              <h3 className="font-semibold text-green-800 mb-4">Transfer Deed Summary</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium text-gray-700">Property:</span>
                  <p className="text-gray-900">{form.propertyAddress}, {form.propertyCity}, {form.propertyState} {form.propertyZip}</p>
                </div>
                <div>
                  <span className="font-medium text-gray-700">APN:</span>
                  <p className="text-gray-900">{form.apn}</p>
                </div>
                <div>
                  <span className="font-medium text-gray-700">From:</span>
                  <p className="text-gray-900">{form.currentOwner}</p>
                </div>
                <div>
                  <span className="font-medium text-gray-700">To:</span>
                  <p className="text-gray-900">{form.grantorName}, as Trustee of {form.trustName}</p>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Trust Date:</span>
                  <p className="text-gray-900">{form.trustDate}</p>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Recording County:</span>
                  <p className="text-gray-900">{form.recordingCounty} County, {form.propertyState}</p>
                </div>
              </div>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <h4 className="font-semibold text-yellow-800 mb-2">⚠️ Coming Soon</h4>
              <p className="text-sm text-yellow-700">
                Our automated deed generation and county filing service is currently in development. 
                For now, we recommend consulting with a qualified real estate attorney to prepare and record your transfer deed.
              </p>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-semibold text-blue-800 mb-2">Next Steps</h4>
              <ol className="text-sm text-blue-700 space-y-1 list-decimal list-inside">
                <li>Consult with a real estate attorney or title company</li>
                <li>Prepare the appropriate deed type for your state</li>
                <li>Have the deed notarized</li>
                <li>Record the deed with the county recorder&apos;s office</li>
                <li>Update your homeowner&apos;s insurance</li>
              </ol>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow mt-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Transfer Deed Preparation</h2>
        <p className="text-lg text-gray-600">
          Transfer real property into your trust with proper legal documentation.
        </p>
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
        {renderStep()}
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
          className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700"
        >
          {step === steps.length - 1 ? 'Complete' : 'Next'}
        </button>
      </div>
    </div>
  );
};

export default TransferDeedTool;