import React, { useState, useEffect } from 'react';

const StateRequirements = ({ selectedState, onRequirementsLoaded }) => {
  const [requirements, setRequirements] = useState(null);
  const [loading, setLoading] = useState(false);

  // Comprehensive state requirements based on research
  const stateRequirementsData = {
    'CA': {
      name: 'California',
      statutes: {
        uniform_trust_code: 'Adopted',
        certification_requirements: 'California Probate Code Section 18100.5',
        notarization_required: 'Yes',
        specific_language: 'Required'
      },
      requirements: [
        'Certification must be signed by all trustees',
        'Notarization by California-licensed notary required',
        'Original trust document or certified copy',
        'Trustee identification verification',
        'Tax identification number for irrevocable trusts',
        'Specific California statutory language required'
      ],
      forms: [
        'California Certification of Trust Form',
        'Trustee Authority Verification Form',
        'Notary Acknowledgment Form'
      ],
      tooltips: {
        state: 'California has specific statutory requirements for trust certification under Probate Code Section 18100.5',
        trustName: 'Must match exactly as stated in the original trust document',
        trustDate: 'Date the trust was originally executed, not the certification date',
        revocability: 'California law distinguishes between revocable and irrevocable trusts for tax purposes',
        grantor: 'Person(s) who created the trust (also called settlor or trustor)',
        trustee: 'Person(s) currently authorized to act on behalf of the trust',
        successorTrustee: 'Person(s) who will become trustee upon death or incapacity of current trustees',
        powers: 'Must include all powers granted to trustees under the trust instrument'
      }
    },
    'NY': {
      name: 'New York',
      statutes: {
        uniform_trust_code: 'Adopted',
        certification_requirements: 'New York Estates, Powers and Trusts Law',
        notarization_required: 'Yes',
        specific_language: 'Required'
      },
      requirements: [
        'Certification must be signed by all trustees',
        'Notarization by New York-licensed notary required',
        'Original trust document or certified copy',
        'Trustee identification verification',
        'Tax identification number for irrevocable trusts',
        'New York-specific statutory language required'
      ],
      forms: [
        'New York Certification of Trust Form',
        'Trustee Authority Verification Form',
        'Notary Acknowledgment Form'
      ],
      tooltips: {
        state: 'New York has specific requirements under the Estates, Powers and Trusts Law',
        trustName: 'Must match exactly as stated in the original trust document',
        trustDate: 'Date the trust was originally executed, not the certification date',
        revocability: 'New York law distinguishes between revocable and irrevocable trusts',
        grantor: 'Person(s) who created the trust (also called settlor or trustor)',
        trustee: 'Person(s) currently authorized to act on behalf of the trust',
        successorTrustee: 'Person(s) who will become trustee upon death or incapacity of current trustees',
        powers: 'Must include all powers granted to trustees under the trust instrument'
      }
    },
    'TX': {
      name: 'Texas',
      statutes: {
        uniform_trust_code: 'Adopted',
        certification_requirements: 'Texas Property Code Chapter 114',
        notarization_required: 'Yes',
        specific_language: 'Required'
      },
      requirements: [
        'Certification must be signed by all trustees',
        'Notarization by Texas-licensed notary required',
        'Original trust document or certified copy',
        'Trustee identification verification',
        'Tax identification number for irrevocable trusts',
        'Texas-specific statutory language required'
      ],
      forms: [
        'Texas Certification of Trust Form',
        'Trustee Authority Verification Form',
        'Notary Acknowledgment Form'
      ],
      tooltips: {
        state: 'Texas has specific requirements under Property Code Chapter 114',
        trustName: 'Must match exactly as stated in the original trust document',
        trustDate: 'Date the trust was originally executed, not the certification date',
        revocability: 'Texas law distinguishes between revocable and irrevocable trusts',
        grantor: 'Person(s) who created the trust (also called settlor or trustor)',
        trustee: 'Person(s) currently authorized to act on behalf of the trust',
        successorTrustee: 'Person(s) who will become trustee upon death or incapacity of current trustees',
        powers: 'Must include all powers granted to trustees under the trust instrument'
      }
    },
    'FL': {
      name: 'Florida',
      statutes: {
        uniform_trust_code: 'Adopted',
        certification_requirements: 'Florida Trust Code Chapter 736',
        notarization_required: 'Yes',
        specific_language: 'Required'
      },
      requirements: [
        'Certification must be signed by all trustees',
        'Notarization by Florida-licensed notary required',
        'Original trust document or certified copy',
        'Trustee identification verification',
        'Tax identification number for irrevocable trusts',
        'Florida-specific statutory language required'
      ],
      forms: [
        'Florida Certification of Trust Form',
        'Trustee Authority Verification Form',
        'Notary Acknowledgment Form'
      ],
      tooltips: {
        state: 'Florida has specific requirements under Trust Code Chapter 736',
        trustName: 'Must match exactly as stated in the original trust document',
        trustDate: 'Date the trust was originally executed, not the certification date',
        revocability: 'Florida law distinguishes between revocable and irrevocable trusts',
        grantor: 'Person(s) who created the trust (also called settlor or trustor)',
        trustee: 'Person(s) currently authorized to act on behalf of the trust',
        successorTrustee: 'Person(s) who will become trustee upon death or incapacity of current trustees',
        powers: 'Must include all powers granted to trustees under the trust instrument'
      }
    }
  };

  useEffect(() => {
    if (selectedState && stateRequirementsData[selectedState]) {
      setLoading(true);
      // Simulate loading time
      setTimeout(() => {
        setRequirements(stateRequirementsData[selectedState]);
        onRequirementsLoaded(stateRequirementsData[selectedState]);
        setLoading(false);
      }, 500);
    } else {
      setRequirements(null);
    }
  }, [selectedState, onRequirementsLoaded]);

  if (!selectedState) return null;

  if (loading) {
    return (
      <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <div className="flex items-center">
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600 mr-2"></div>
          <span className="text-blue-700">Loading {stateRequirementsData[selectedState]?.name || selectedState} requirements...</span>
        </div>
      </div>
    );
  }

  if (!requirements) {
    return (
      <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
        <p className="text-yellow-700">
          Requirements for {selectedState} are being researched. Please check back soon or contact us for assistance.
        </p>
      </div>
    );
  }

  return (
    <div className="mt-4 space-y-4">
      {/* State Requirements Summary */}
      <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <h4 className="font-semibold text-blue-800 mb-2">
          {requirements.name} Trust Certification Requirements
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <strong>Statutes:</strong> {requirements.statutes.certification_requirements}
          </div>
          <div>
            <strong>Notarization:</strong> {requirements.statutes.notarization_required}
          </div>
          <div>
            <strong>UTC Adopted:</strong> {requirements.statutes.uniform_trust_code}
          </div>
          <div>
            <strong>Specific Language:</strong> {requirements.statutes.specific_language}
          </div>
        </div>
      </div>

      {/* Required Forms */}
      <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
        <h4 className="font-semibold text-green-800 mb-2">Required Forms</h4>
        <ul className="text-sm text-green-700 space-y-1">
          {requirements.forms.map((form, index) => (
            <li key={index}>• {form}</li>
          ))}
        </ul>
      </div>

      {/* Key Requirements */}
      <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
        <h4 className="font-semibold text-orange-800 mb-2">Key Requirements</h4>
        <ul className="text-sm text-orange-700 space-y-1">
          {requirements.requirements.map((req, index) => (
            <li key={index}>• {req}</li>
          ))}
        </ul>
      </div>

      {/* Compliance Tips */}
      <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
        <h4 className="font-semibold text-purple-800 mb-2">Compliance Tips</h4>
        <div className="text-sm text-purple-700 space-y-2">
          <p>• Ensure all trustees sign the certification</p>
          <p>• Use a {requirements.name}-licensed notary</p>
          <p>• Include all required statutory language</p>
          <p>• Verify trustee identification thoroughly</p>
          <p>• Keep original documents secure</p>
        </div>
      </div>
    </div>
  );
};

export default StateRequirements; 