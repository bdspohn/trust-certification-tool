import React from 'react';

const EnhancedDocumentGenerator = ({ formData, stateRequirements }) => {
  // Format date for document
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  // Format trustee names
  const formatTrustees = (trustees) => {
    if (!trustees || !trustees.length) return '';
    const validTrustees = trustees.filter(t => t.trim());
    if (validTrustees.length === 0) return '';
    if (validTrustees.length === 1) return validTrustees[0];
    if (validTrustees.length === 2) return `${validTrustees[0]} and ${validTrustees[1]}`;
    const last = validTrustees.pop();
    return `${validTrustees.join(', ')}, and ${last}`;
  };

  // Format successor trustees
  const formatSuccessorTrustees = (successors) => {
    if (!successors || !successors.length) return '';
    const validSuccessors = successors.filter(s => s.trim());
    if (validSuccessors.length === 0) return '';
    if (validSuccessors.length === 1) return validSuccessors[0];
    if (validSuccessors.length === 2) return `${validSuccessors[0]} and ${validSuccessors[1]}`;
    const last = validSuccessors.pop();
    return `${validSuccessors.join(', ')}, and ${last}`;
  };

  // Format trustee powers with enhanced descriptions
  const formatPowers = (powers, otherPower) => {
    if (!powers || !powers.length) return '';
    const validPowers = powers.filter(p => p !== 'Other');
    if (otherPower && otherPower.trim()) {
      validPowers.push(otherPower.trim());
    }
    if (validPowers.length === 0) return '';
    if (validPowers.length === 1) return validPowers[0];
    if (validPowers.length === 2) return `${validPowers[0]} and ${validPowers[1]}`;
    const last = validPowers.pop();
    return `${validPowers.join(', ')}, and ${last}`;
  };

  // Get state name from code
  const getStateName = (code) => {
    const states = {
      'AL': 'Alabama', 'AK': 'Alaska', 'AZ': 'Arizona', 'AR': 'Arkansas', 'CA': 'California',
      'CO': 'Colorado', 'CT': 'Connecticut', 'DE': 'Delaware', 'DC': 'District of Columbia',
      'FL': 'Florida', 'GA': 'Georgia', 'HI': 'Hawaii', 'ID': 'Idaho', 'IL': 'Illinois',
      'IN': 'Indiana', 'IA': 'Iowa', 'KS': 'Kansas', 'KY': 'Kentucky', 'LA': 'Louisiana',
      'ME': 'Maine', 'MD': 'Maryland', 'MA': 'Massachusetts', 'MI': 'Michigan', 'MN': 'Minnesota',
      'MS': 'Mississippi', 'MO': 'Missouri', 'MT': 'Montana', 'NE': 'Nebraska', 'NV': 'Nevada',
      'NH': 'New Hampshire', 'NJ': 'New Jersey', 'NM': 'New Mexico', 'NY': 'New York',
      'NC': 'North Carolina', 'ND': 'North Dakota', 'OH': 'Ohio', 'OK': 'Oklahoma', 'OR': 'Oregon',
      'PA': 'Pennsylvania', 'RI': 'Rhode Island', 'SC': 'South Carolina', 'SD': 'South Dakota',
      'TN': 'Tennessee', 'TX': 'Texas', 'UT': 'Utah', 'VT': 'Vermont', 'VA': 'Virginia',
      'WA': 'Washington', 'WV': 'West Virginia', 'WI': 'Wisconsin', 'WY': 'Wyoming'
    };
    return states[code] || code;
  };

  // Get state-specific statutory language
  const getStateStatutoryLanguage = (stateCode) => {
    const statutoryLanguage = {
      'CA': 'Pursuant to California Probate Code Section 18100.5',
      'TX': 'Pursuant to Texas Property Code Chapter 114',
      'NY': 'Pursuant to New York Estates, Powers and Trusts Law',
      'FL': 'Pursuant to Florida Trust Code Chapter 736',
      'IL': 'Pursuant to Illinois Trust Code (760 ILCS 3/1013)',
      'VA': 'Pursuant to Virginia Code § 64.2-804'
    };
    return statutoryLanguage[stateCode] || 'Pursuant to Uniform Trust Code';
  };

  const trustees = formatTrustees(formData.trustee);
  const successorTrustees = formatSuccessorTrustees(formData.successorTrustee);
  const powers = formatPowers(formData.powers, formData.otherPower);
  const stateName = getStateName(formData.state);
  const trustDate = formatDate(formData.trustDate);
  const currentDate = new Date().toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
  const statutoryLanguage = getStateStatutoryLanguage(formData.state);

  return (
    <div className="max-w-4xl mx-auto bg-white p-8 shadow-lg">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">CERTIFICATION OF TRUST</h1>
        <p className="text-gray-600">{statutoryLanguage}</p>
      </div>

      <div className="space-y-6 text-sm leading-relaxed">
        {/* Opening Paragraph */}
        <p className="text-justify">
          I, <strong>{formData.grantor}</strong>, being the grantor (also known as settlor or trustor) of the trust 
          entitled &quot;<strong>{formData.trustName}</strong>&quot; (the &quot;Trust&quot;), hereby certify as follows:
        </p>

        {/* Trust Information */}
        <div className="space-y-4">
          <p><strong>1. Trust Name:</strong> {formData.trustName}</p>
          
          <p><strong>2. Date of Trust:</strong> {trustDate}</p>
          
          <p><strong>3. Governing Law:</strong> The Trust is governed by the laws of the State of {stateName}.</p>
          
          <p><strong>4. Revocability:</strong> The Trust is {formData.revocability}.</p>
          
          <p><strong>5. Grantor:</strong> {formData.grantor}</p>
          
          <p><strong>6. Current Trustee(s):</strong> {trustees}</p>
          
          {successorTrustees && (
            <p><strong>7. Successor Trustee(s):</strong> {successorTrustees}</p>
          )}
        </div>

        {/* Trustee Powers Section */}
        <div className="mt-6">
          <p><strong>8. Trustee Powers:</strong></p>
          <p className="ml-4 text-justify">
            The trustee(s) have been granted the following powers under the Trust instrument: {powers}.
          </p>
        </div>

        {/* Tax Information */}
        {formData.revocability === 'irrevocable' && formData.tin && (
          <div className="mt-6">
            <p><strong>9. Tax Identification Number:</strong> {formData.tin}</p>
          </div>
        )}

        {/* Enhanced Certification Statements */}
        <div className="mt-8 space-y-4">
          <p className="text-justify">
            <strong>Certification:</strong> I certify that the Trust has not been revoked, modified, or amended in any manner that would cause the representations contained in this Certification to be incorrect. This Certification is being provided to financial institutions and other third parties in connection with the administration of the Trust.
          </p>

          <p className="text-justify">
            <strong>Reliance:</strong> Any person may rely upon the statements contained in this Certification. A recipient of this Certification may require the trustee to furnish copies of those excerpts from the original trust instrument and any amendments thereto that designate the trustee and confer upon the trustee the power to act in the pending transaction.
          </p>

          <p className="text-justify">
            <strong>Limitation:</strong> This Certification does not include the dispositive provisions of the Trust, which remain confidential.
          </p>

          {/* State-specific additional language */}
          {formData.state === 'CA' && (
            <p className="text-justify">
              <strong>California Specific:</strong> This Certification is provided pursuant to California Probate Code Section 18100.5 and may be relied upon by any person without further inquiry.
            </p>
          )}
          
          {formData.state === 'TX' && (
            <p className="text-justify">
              <strong>Texas Specific:</strong> This Certification is provided pursuant to Texas Property Code Chapter 114 and may be relied upon by any person without further inquiry.
            </p>
          )}
          
          {formData.state === 'NY' && (
            <p className="text-justify">
              <strong>New York Specific:</strong> This Certification is provided pursuant to New York Estates, Powers and Trusts Law and may be relied upon by any person without further inquiry.
            </p>
          )}
          
          {formData.state === 'FL' && (
            <p className="text-justify">
              <strong>Florida Specific:</strong> This Certification is provided pursuant to Florida Trust Code Chapter 736 and may be relied upon by any person without further inquiry.
            </p>
          )}
        </div>

        {/* Signature Section */}
        <div className="mt-12 space-y-6">
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <div className="border-t-2 border-gray-400 pt-2 mt-16">
                <p className="text-center font-semibold">{formData.grantor}</p>
                <p className="text-center text-gray-600">Grantor</p>
              </div>
            </div>
            <div className="flex-1 ml-8">
              <div className="border-t-2 border-gray-400 pt-2 mt-16">
                <p className="text-center font-semibold">{trustees}</p>
                <p className="text-center text-gray-600">Trustee(s)</p>
              </div>
            </div>
          </div>
        </div>

        {/* Date */}
        <div className="mt-8 text-center">
          <p><strong>Date:</strong> {currentDate}</p>
        </div>

        {/* Enhanced Notary Section */}
        <div className="mt-12 border-t pt-6">
          <p className="text-center text-gray-600 text-xs">
            <strong>Notary Section:</strong> This Certification must be notarized by a qualified notary public. 
            Some financial institutions may require additional documentation or verification.
          </p>
        </div>

        {/* Compliance Notes */}
        <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <h4 className="font-semibold text-yellow-800 mb-2">Compliance Notes</h4>
          <div className="text-sm text-yellow-700 space-y-1">
            <p>• This document complies with {stateName} statutory requirements</p>
            <p>• All trustees must sign this certification</p>
            <p>• Notarization is required for acceptance by financial institutions</p>
            <p>• Keep original documents secure and accessible</p>
            <p>• Some institutions may require additional verification</p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-8 flex justify-center space-x-4">
        <button 
          onClick={() => window.print()} 
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
        >
          Print Document
        </button>
        <button 
          onClick={() => {
            const element = document.createElement('a');
            const file = new Blob([document.querySelector('.max-w-4xl').innerText], {type: 'text/plain'});
            element.href = URL.createObjectURL(file);
            element.download = `Certification_of_Trust_${formData.trustName.replace(/[^a-zA-Z0-9]/g, '_')}.txt`;
            element.click();
          }}
          className="bg-gray-600 text-white px-6 py-2 rounded hover:bg-gray-700 transition"
        >
          Download Text
        </button>
      </div>
    </div>
  );
};

export default EnhancedDocumentGenerator; 