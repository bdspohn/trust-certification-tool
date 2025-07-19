import React, { useState, useEffect, useMemo } from 'react';

const StateRequirements = ({ selectedState, onRequirementsLoaded, compact = false }) => {
  const [requirements, setRequirements] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  // Comprehensive state requirements based on research
  const stateRequirementsData = useMemo(() => ({
    'CA': {
      name: 'California',
      statutes: {
        uniform_trust_code: 'Adopted',
        certification_requirements: 'California Probate Code Section 18100.5',
        notarization_required: 'Yes - Acknowledged declaration required',
        specific_language: 'Required - Statutory compliance mandatory'
      },
      requirements: [
        'Must be signed by all currently acting trustees',
        'Notarization required as acknowledged declaration',
        'Must include trust identification number (SSN for revocable, EIN for irrevocable)',
        'Must state trust has not been revoked, modified, or amended',
        'Must specify signature authority when multiple trustees exist',
        'Legal description of real property if trust holds real estate',
        'Manner in which title to trust assets should be taken'
      ],
      forms: [
        'California Probate Code § 18100.5 Compliant Certification',
        'Trust Identification Verification',
        'Acknowledged Declaration Form'
      ],
      certificationElements: [
        'Existence of trust and date of execution',
        'Identity of settlor(s) and currently acting trustee(s)',
        'Revocability or irrevocability of the trust',
        'Identity of person holding power to revoke (if applicable)',
        'Signature authority of trustees',
        'Trust identification number',
        'Manner of title holding for trust assets'
      ],
      bankAcceptance: {
        'Wells Fargo': 'Accepts CA Probate Code § 18100.5 compliant certifications',
        'Bank of America': 'Requires specific trustee powers for banking transactions',
        'Chase': 'Accepts standard certification with account opening authority',
        'Credit Unions': 'May require institution-specific forms'
      },
      trusteePowers: [
        'Open and close deposit and investment accounts',
        'Sign checks and withdrawal orders',
        'Transfer funds between accounts',
        'Borrow money and execute loan documents',
        'Pledge trust assets as security for loans',
        'Buy, sell, and mortgage real property',
        'Enter into contracts and agreements',
        'Sign all documents on behalf of the trust'
      ],
      legalProtection: 'California Probate Code § 18100.5(h): Third parties who refuse a valid certification may be liable for damages including attorney fees if court determines bad faith.',
      tooltips: {
        state: 'California Probate Code § 18100.5 provides specific statutory requirements and legal protections for trust certifications',
        trustName: 'Must match exactly as stated in the trust instrument - banks verify this against title documents',
        trustDate: 'Date the trust was originally executed and signed by settlor(s)',
        revocability: 'California distinguishes revocable (amendable by settlor) vs. irrevocable (permanent) trusts for tax and legal purposes',
        grantor: 'Also called settlor or trustor - the person(s) who created and initially funded the trust',
        trustee: 'Currently acting trustee(s) with legal authority to manage trust assets and conduct business',
        successorTrustee: 'Named successor(s) who will become trustee upon death, resignation, or incapacity of current trustee',
        powers: 'Must include specific powers granted in trust instrument - banks require explicit authority for financial transactions',
        tin: 'Revocable trusts typically use grantor\'s SSN; irrevocable trusts must obtain separate EIN from IRS'
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
    },
    // Additional states with basic requirements based on general trust law
    'AZ': {
      name: 'Arizona',
      statutes: {
        uniform_trust_code: 'Adopted',
        certification_requirements: 'Arizona Revised Statutes Title 14',
        notarization_required: 'Yes',
        specific_language: 'Required'
      },
      requirements: [
        'Must be signed by all currently acting trustees',
        'Notarization required',
        'Trust identification number required',
        'Must state trust has not been revoked or amended',
        'Trustee powers must be clearly stated',
        'Legal description required for real property'
      ],
      forms: [
        'Arizona Trust Certification Form',
        'Notary Acknowledgment'
      ],
      tooltips: {
        state: 'Arizona follows the Uniform Trust Code with state-specific modifications',
        trustName: 'Must match exactly as stated in the trust instrument',
        trustDate: 'Date the trust was originally executed',
        revocability: 'Affects tax treatment and modification rights',
        grantor: 'Person who created and funded the trust',
        trustee: 'Currently acting trustee(s) with management authority',
        successorTrustee: 'Backup trustee(s) named in the trust',
        powers: 'Must include all powers granted in trust document'
      }
    },
    'WA': {
      name: 'Washington',
      statutes: {
        uniform_trust_code: 'Adopted',
        certification_requirements: 'RCW 11.98 Trust and Estate Dispute Resolution Act',
        notarization_required: 'Yes',
        specific_language: 'Required'
      },
      requirements: [
        'All trustees must sign the certification',
        'Notarization required',
        'Trust taxpayer identification number',
        'Statement that trust has not been revoked',
        'Trustee signature authority clarification',
        'Title holding instructions'
      ],
      forms: [
        'Washington Trust Certification',
        'Trustee Authority Declaration'
      ],
      tooltips: {
        state: 'Washington state has adopted the Uniform Trust Code',
        trustName: 'Legal name as it appears in trust document',
        trustDate: 'Original execution date of trust',
        revocability: 'Important for tax and legal purposes',
        grantor: 'Trust creator (settlor/trustor)',
        trustee: 'Person(s) managing trust assets',
        successorTrustee: 'Designated backup trustees',
        powers: 'Authority granted under trust terms'
      }
    }
  }), []);

  // State name to code mapping
  const stateNameToCode = {
    'ALABAMA': 'AL', 'ALASKA': 'AK', 'ARIZONA': 'AZ', 'ARKANSAS': 'AR', 'CALIFORNIA': 'CA',
    'COLORADO': 'CO', 'CONNECTICUT': 'CT', 'DELAWARE': 'DE', 'FLORIDA': 'FL', 'GEORGIA': 'GA',
    'HAWAII': 'HI', 'IDAHO': 'ID', 'ILLINOIS': 'IL', 'INDIANA': 'IN', 'IOWA': 'IA',
    'KANSAS': 'KS', 'KENTUCKY': 'KY', 'LOUISIANA': 'LA', 'MAINE': 'ME', 'MARYLAND': 'MD',
    'MASSACHUSETTS': 'MA', 'MICHIGAN': 'MI', 'MINNESOTA': 'MN', 'MISSISSIPPI': 'MS', 'MISSOURI': 'MO',
    'MONTANA': 'MT', 'NEBRASKA': 'NE', 'NEVADA': 'NV', 'NEW HAMPSHIRE': 'NH', 'NEW JERSEY': 'NJ',
    'NEW MEXICO': 'NM', 'NEW YORK': 'NY', 'NORTH CAROLINA': 'NC', 'NORTH DAKOTA': 'ND', 'OHIO': 'OH',
    'OKLAHOMA': 'OK', 'OREGON': 'OR', 'PENNSYLVANIA': 'PA', 'RHODE ISLAND': 'RI', 'SOUTH CAROLINA': 'SC',
    'SOUTH DAKOTA': 'SD', 'TENNESSEE': 'TN', 'TEXAS': 'TX', 'UTAH': 'UT', 'VERMONT': 'VT',
    'VIRGINIA': 'VA', 'WASHINGTON': 'WA', 'WEST VIRGINIA': 'WV', 'WISCONSIN': 'WI', 'WYOMING': 'WY'
  };

  useEffect(() => {
    // Handle both state codes (CA) and full names (CALIFORNIA)
    let stateCode = selectedState;
    
    // If it's a full state name, convert to code
    if (selectedState && selectedState.length > 2) {
      const upperState = selectedState.toUpperCase();
      stateCode = stateNameToCode[upperState] || selectedState;
    }
    
    console.log('StateRequirements - selectedState:', selectedState);
    console.log('StateRequirements - converted to code:', stateCode);
    console.log('StateRequirements - available states:', Object.keys(stateRequirementsData));
    console.log('StateRequirements - state data exists?', stateCode && stateRequirementsData[stateCode]);
    
    if (stateCode && stateRequirementsData[stateCode]) {
      setLoading(true);
      // Simulate loading time
      setTimeout(() => {
        setRequirements(stateRequirementsData[stateCode]);
        onRequirementsLoaded(stateRequirementsData[stateCode]);
        setLoading(false);
      }, 500);
    } else {
      setRequirements(null);
    }
  }, [selectedState, onRequirementsLoaded, stateRequirementsData]);

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
    // Check if this is a state we have data for
    const availableStates = Object.keys(stateRequirementsData);
    const isStateAvailable = availableStates.includes(selectedState);
    
    return (
      <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
        <p className="text-yellow-700">
          {isStateAvailable 
            ? `Loading requirements for ${selectedState}...` 
            : `Requirements for ${selectedState} are being researched. Currently available states: ${availableStates.join(', ')}. Please check back soon or contact us for assistance.`
          }
        </p>
      </div>
    );
  }

  // Compact mode - show toggle button and expandable content
  if (compact) {
    return (
      <div className="relative">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="inline-flex items-center px-3 py-1 text-sm font-medium text-blue-600 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors"
        >
          {requirements.name.toUpperCase()} Requirements
          <span className="ml-1">{isExpanded ? '−' : '+'}</span>
        </button>
        
        {isExpanded && (
          <div className="absolute top-full right-0 mt-2 w-96 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto">
            <div className="p-4 space-y-4">
              {/* Compact Requirements Summary */}
              <div className="border-b pb-3">
                <h4 className="font-semibold text-blue-800 text-sm mb-2">
                  {requirements.name} Requirements
                </h4>
                <div className="text-xs text-gray-600 space-y-1">
                  <div><strong>Statute:</strong> {requirements.statutes.certification_requirements}</div>
                  <div><strong>Notarization:</strong> {requirements.statutes.notarization_required}</div>
                </div>
              </div>

              {/* Key Requirements */}
              <div>
                <h5 className="font-medium text-orange-800 text-sm mb-2">Key Requirements</h5>
                <ul className="text-xs text-orange-700 space-y-1">
                  {requirements.requirements.slice(0, 3).map((req, index) => (
                    <li key={index}>• {req}</li>
                  ))}
                  {requirements.requirements.length > 3 && (
                    <li className="text-gray-500">+ {requirements.requirements.length - 3} more...</li>
                  )}
                </ul>
              </div>

              {/* Bank Acceptance */}
              {requirements.bankAcceptance && (
                <div>
                  <h5 className="font-medium text-indigo-800 text-sm mb-2">Bank Acceptance</h5>
                  <div className="text-xs text-indigo-700 space-y-1">
                    {Object.entries(requirements.bankAcceptance).slice(0, 2).map(([bank, info]) => (
                      <div key={bank}>
                        <strong>{bank}:</strong> {info.substring(0, 60)}...
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
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

      {/* Bank Acceptance Information */}
      {requirements.bankAcceptance && (
        <div className="p-4 bg-indigo-50 border border-indigo-200 rounded-lg">
          <h4 className="font-semibold text-indigo-800 mb-2">Bank Acceptance Guidelines</h4>
          <div className="text-sm text-indigo-700 space-y-2">
            {Object.entries(requirements.bankAcceptance).map(([bank, info]) => (
              <div key={bank}>
                <strong>{bank}:</strong> {info}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Legal Protection */}
      {requirements.legalProtection && (
        <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
          <h4 className="font-semibold text-gray-800 mb-2">Legal Protection</h4>
          <p className="text-sm text-gray-700">{requirements.legalProtection}</p>
        </div>
      )}

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