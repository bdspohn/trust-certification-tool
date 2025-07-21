import React, { useState, useEffect } from 'react';
import DocumentGenerator from '../components/DocumentGenerator';
import StateRequirements from '../components/StateRequirements';
import { 
  validateForm, 
  sanitizeInput, 
  sanitizeArray, 
  formatTIN,
  normalizeState 
} from '../utils/validation';

// All US states + DC
const states = [
  { code: 'AL', name: 'Alabama' }, { code: 'AK', name: 'Alaska' }, { code: 'AZ', name: 'Arizona' }, { code: 'AR', name: 'Arkansas' }, { code: 'CA', name: 'California' }, { code: 'CO', name: 'Colorado' }, { code: 'CT', name: 'Connecticut' }, { code: 'DE', name: 'Delaware' }, { code: 'DC', name: 'District of Columbia' }, { code: 'FL', name: 'Florida' }, { code: 'GA', name: 'Georgia' }, { code: 'HI', name: 'Hawaii' }, { code: 'ID', name: 'Idaho' }, { code: 'IL', name: 'Illinois' }, { code: 'IN', name: 'Indiana' }, { code: 'IA', name: 'Iowa' }, { code: 'KS', name: 'Kansas' }, { code: 'KY', name: 'Kentucky' }, { code: 'LA', name: 'Louisiana' }, { code: 'ME', name: 'Maine' }, { code: 'MD', name: 'Maryland' }, { code: 'MA', name: 'Massachusetts' }, { code: 'MI', name: 'Michigan' }, { code: 'MN', name: 'Minnesota' }, { code: 'MS', name: 'Mississippi' }, { code: 'MO', name: 'Missouri' }, { code: 'MT', name: 'Montana' }, { code: 'NE', name: 'Nebraska' }, { code: 'NV', name: 'Nevada' }, { code: 'NH', name: 'New Hampshire' }, { code: 'NJ', name: 'New Jersey' }, { code: 'NM', name: 'New Mexico' }, { code: 'NY', name: 'New York' }, { code: 'NC', name: 'North Carolina' }, { code: 'ND', name: 'North Dakota' }, { code: 'OH', name: 'Ohio' }, { code: 'OK', name: 'Oklahoma' }, { code: 'OR', name: 'Oregon' }, { code: 'PA', name: 'Pennsylvania' }, { code: 'RI', name: 'Rhode Island' }, { code: 'SC', name: 'South Carolina' }, { code: 'SD', name: 'South Dakota' }, { code: 'TN', name: 'Tennessee' }, { code: 'TX', name: 'Texas' }, { code: 'UT', name: 'Utah' }, { code: 'VT', name: 'Vermont' }, { code: 'VA', name: 'Virginia' }, { code: 'WA', name: 'Washington' }, { code: 'WV', name: 'West Virginia' }, { code: 'WI', name: 'Wisconsin' }, { code: 'WY', name: 'Wyoming' }
];

// Actual trustee powers based on bank requirements and trust research
const trusteePowersList = [
  'Open and close deposit and investment account(s) on behalf of the Trust, deposit funds into, sign checks drawn upon, and withdraw funds from the account(s) established for the Trust',
  'Borrow from financial institutions from time to time on such terms and in such amounts as may be agreed and execute and deliver documents, instruments and agreements on behalf of the Trust that evidence, secure or otherwise relate to such loan(s)',
  'Transfer funds among accounts, pledge trust assets as security for loans, and transact all business with respect to any such accounts',
  'Purchase, sell, convey, exchange, partition, divide, improve and repair trust property including real estate',
  'Mortgage, pledge, or encumber property by deed of trust, mortgage, pledge or otherwise',
  'Sign documents, contracts, and legal instruments on behalf of the trust including loan applications, account agreements, and closing documents',
  'Execute and deliver renewals, extensions, increases, modifications or substitutions for any and all loans and financial agreements',
  'Make investments and manage investment accounts, including purchase and sale of stocks, bonds, mutual funds, and other securities',
  'Distribute trust assets to beneficiaries according to the trust terms and make discretionary distributions as authorized',
  'File tax returns and handle all tax matters for the trust, including obtaining tax identification numbers',
  'Enter into lease agreements, manage rental properties, and collect rents on behalf of the trust',
  'Hire professionals such as attorneys, accountants, financial advisors, and property managers as needed for trust administration',
  'Exercise voting rights for securities held in the trust and make investment decisions',
  'Establish and maintain retirement accounts, business accounts, and other specialized accounts for the trust',
  'Make charitable donations and gifts as specifically authorized in the trust instrument',
  'Other powers specifically granted in the trust document',
];

// Comprehensive state-specific requirements based on trust research
const stateRequirements = {
  CA: {
    fields: ['state', 'trustName', 'trustDate', 'revocability', 'grantor', 'trustee', 'successorTrustee', 'powers', 'tin', 'signatureAuthority'],
    requiredFields: ['trustName', 'trustDate', 'grantor', 'trustee', 'powers'],
    tooltips: {
      state: 'California Probate Code § 18100.5 provides specific statutory requirements and legal protections for trust certifications. Select the state that governs your trust.',
      trustName: 'The complete legal name of the trust exactly as stated in the trust instrument (CA Probate Code § 18100.5). Banks verify this against original documents.',
      trustDate: 'The date the trust was originally executed and signed by the settlor(s). This is not the certification date.',
      revocability: 'California law distinguishes revocable trusts (can be modified by settlor) from irrevocable trusts (permanent). This affects tax treatment and trustee powers.',
      grantor: 'The person(s) who created and initially funded the trust. Also called settlor or trustor. Required for bank verification.',
      trustee: 'The person(s) or institution currently authorized to manage trust assets and conduct business. All acting trustees must sign certification.',
      successorTrustee: 'The person(s) or institution who will become trustee upon death, resignation, or incapacity of current trustees.',
      powers: 'Select all powers granted to trustees in the trust instrument. Banks require explicit authorization for financial transactions.',
      tin: 'Trust Identification Number: Use grantor\'s SSN for revocable trusts or the trust\'s EIN for irrevocable trusts (CA Probate Code § 18100.5).',
      signatureAuthority: 'When multiple trustees exist, specify whether all trustees must sign or if less than all may act independently.',
      governingLaw: 'The state law governing the trust administration, typically where the trust was created and executed.'
    },
    statute: 'CA Probate Code § 18100.5 - Certification of Trust',
    legalProtection: 'Third parties who refuse a valid CA certification may be liable for damages including attorney fees (§ 18100.5(h)).',
    recording: 'May need to be recorded if trust owns real property in California.'
  },
  TX: {
    fields: ['trustName', 'trustDate', 'revocability', 'grantor', 'trustee', 'successorTrustee', 'powers', 'tin'],
    tooltips: {
      trustName: 'The full legal name of the trust as stated in the trust document (TX Prop. Code § 114.086).',
      trustDate: 'The date the trust was executed (signed).',
      revocability: 'A revocable trust can be changed or canceled by the grantor. An irrevocable trust cannot be changed except under special circumstances.',
      grantor: 'The person who created and funded the trust (also called settlor or trustor).',
      trustee: 'The person(s) or institution currently managing the trust assets.',
      successorTrustee: 'The person(s) or institution who will manage the trust if the current trustee cannot.',
      powers: 'Select all powers granted to the trustee as specified in the trust document.',
      tin: 'Only required if your trust is irrevocable and has its own EIN. Most revocable trusts use the grantor\'s SSN.',
      governingLaw: 'The state law that governs the trust (usually the state where the trust was created).'
    },
    statute: 'TX Prop. Code § 114.086',
    recording: 'Must be recorded if trust owns real property in Texas.'
  },
  NY: {
    fields: ['trustName', 'trustDate', 'revocability', 'grantor', 'trustee', 'successorTrustee', 'powers', 'tin'],
    tooltips: {
      trustName: 'The full legal name of the trust as stated in the trust document.',
      trustDate: 'The date the trust was executed (signed).',
      revocability: 'A revocable trust can be changed or canceled by the grantor. An irrevocable trust cannot be changed except under special circumstances.',
      grantor: 'The person who created and funded the trust (also called settlor or trustor).',
      trustee: 'The person(s) or institution currently managing the trust assets.',
      successorTrustee: 'The person(s) or institution who will manage the trust if the current trustee cannot.',
      powers: 'Select all powers granted to the trustee as specified in the trust document.',
      tin: 'Only required if your trust is irrevocable and has its own EIN. Most revocable trusts use the grantor\'s SSN.',
      governingLaw: 'The state law that governs the trust (usually the state where the trust was created).'
    },
    statute: 'NY Est. Powers & Trusts Law § 7-2.4',
    recording: 'May need to be recorded if trust owns real property in New York.'
  },
  FL: {
    fields: ['trustName', 'trustDate', 'revocability', 'grantor', 'trustee', 'successorTrustee', 'powers', 'tin'],
    tooltips: {
      trustName: 'The full legal name of the trust as stated in the trust document (FL Stat. § 736.1017).',
      trustDate: 'The date the trust was executed (signed).',
      revocability: 'A revocable trust can be changed or canceled by the grantor. An irrevocable trust cannot be changed except under special circumstances.',
      grantor: 'The person who created and funded the trust (also called settlor or trustor).',
      trustee: 'The person(s) or institution currently managing the trust assets.',
      successorTrustee: 'The person(s) or institution who will manage the trust if the current trustee cannot.',
      powers: 'Select all powers granted to the trustee as specified in the trust document.',
      tin: 'Only required if your trust is irrevocable and has its own EIN. Most revocable trusts use the grantor\'s SSN.',
      governingLaw: 'The state law that governs the trust (usually the state where the trust was created).'
    },
    statute: 'FL Stat. § 736.1017',
    recording: 'Must be recorded if trust owns real property in Florida.'
  },
  IL: {
    fields: ['trustName', 'trustDate', 'revocability', 'grantor', 'trustee', 'successorTrustee', 'powers', 'tin'],
    tooltips: {
      trustName: 'The full legal name of the trust as stated in the trust document (760 ILCS 3/1013).',
      trustDate: 'The date the trust was executed (signed).',
      revocability: 'A revocable trust can be changed or canceled by the grantor. An irrevocable trust cannot be changed except under special circumstances.',
      grantor: 'The person who created and funded the trust (also called settlor or trustor).',
      trustee: 'The person(s) or institution currently managing the trust assets.',
      successorTrustee: 'The person(s) or institution who will manage the trust if the current trustee cannot.',
      powers: 'Select all powers granted to the trustee as specified in the trust document.',
      tin: 'Only required if your trust is irrevocable and has its own EIN. Most revocable trusts use the grantor\'s SSN.',
      governingLaw: 'The state law that governs the trust (usually the state where the trust was created).'
    },
    statute: '760 ILCS 3/1013',
    recording: 'May need to be recorded if trust owns real property in Illinois.'
  },
  VA: {
    fields: ['trustName', 'trustDate', 'revocability', 'grantor', 'trustee', 'successorTrustee', 'powers', 'tin'],
    tooltips: {
      trustName: 'The full legal name of the trust as stated in the trust document (VA Code § 64.2-804).',
      trustDate: 'The date the trust was executed (signed).',
      revocability: 'A revocable trust can be changed or canceled by the grantor. An irrevocable trust cannot be changed except under special circumstances.',
      grantor: 'The person who created and funded the trust (also called settlor or trustor).',
      trustee: 'The person(s) or institution currently managing the trust assets.',
      successorTrustee: 'The person(s) or institution who will manage the trust if the current trustee cannot.',
      powers: 'Select all powers granted to the trustee as specified in the trust document.',
      tin: 'Only required if your trust is irrevocable and has its own EIN. Most revocable trusts use the grantor\'s SSN.',
      governingLaw: 'The state law that governs the trust (usually the state where the trust was created).'
    },
    statute: 'VA Code § 64.2-804',
    recording: 'May need to be recorded if trust owns real property in Virginia.'
  }
};

// Generic requirements for states not specifically defined
const genericFields = ['trustName', 'trustDate', 'revocability', 'grantor', 'trustee', 'successorTrustee', 'powers', 'tin'];
const genericTooltips = {
  trustName: 'The full legal name of the trust as stated in the trust document.',
  trustDate: 'The date the trust was executed (signed).',
  revocability: 'A revocable trust can be changed or canceled by the grantor. An irrevocable trust cannot be changed except under special circumstances.',
  grantor: 'The person who created and funded the trust (also called settlor or trustor).',
  trustee: 'The person(s) or institution currently managing the trust assets.',
  successorTrustee: 'The person(s) or institution who will manage the trust if the current trustee cannot.',
  powers: 'Select all powers granted to the trustee as specified in the trust document.',
  tin: 'Only required if your trust is irrevocable and has its own EIN. Most revocable trusts use the grantor\'s SSN.',
  governingLaw: 'The state law that governs the trust (usually the state where the trust was created).'
};

const steps = [
  { label: 'State', fields: ['state'] },
  { label: 'Trust Basics', fields: ['trustName', 'trustDate', 'revocability'] },
  { label: 'Parties', fields: ['grantor', 'trustee', 'successorTrustee'] },
  { label: 'Trustee Powers', fields: ['powers'] },
  { label: 'Tax Info', fields: ['tin'] },
];

const initialForm = {
  state: 'CA', // Default to California
  trustName: '',
  trustDate: '',
  revocability: '',
  grantor: '',
  trusteeType: 'one',
  trustee: [''],
  successorTrusteeType: 'one',
  successorTrustee: [''],
  powers: [],
  otherPower: '',
  tin: '',
};

export default function CertificationStripeFlow({ prefillData }) {
  const [form, setForm] = useState(initialForm);
  const [step, setStep] = useState(0);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [showDocument, setShowDocument] = useState(false);

  // Helper function to validate names (same logic as AI processor)
  const isValidName = (name) => {
    if (!name || typeof name !== 'string') return false;
    name = name.trim();
    if (name.length < 3 || name.length > 50) return false;
    
    const invalidKeywords = [
      'trust', 'instrument', 'vacant', 'become', 'terms', 'each', 
      'under', 'created', 'exoneration', 'removed', 'able', 'will not',
      'shall', 'may', 'must', 'hereby', 'whereas', 'therefore', 'between',
      'agreement', 'document', 'provisions', 'article', 'section', 'replace',
      'independent', 'special', 'benefit', 'expenses', 'taxes', 'tangible',
      'personal', 'property', 'income', 'principal', 'distribution', 'guidelines',
      'authority', 'powers', 'any', 'our', 'their', 'this', 'that', 'these',
      'those', 'which', 'what', 'when', 'where', 'how', 'why', 'who', 'whom'
    ];
    const lowerName = name.toLowerCase();
    if (invalidKeywords.some(keyword => lowerName.includes(keyword))) return false;
    
    if (/^(article|section|chapter|part|clause)\s+(one|two|three|four|five|six|seven|eight|nine|ten|\d+)/i.test(name)) return false;
    if (/^(first|second|third|fourth|fifth|sixth|seventh|eighth|ninth|tenth)$/i.test(name)) return false;
    
    const namePattern = /^[A-Z][a-z]+(\s+[A-Z]\.)?(\s+[A-Z][a-z]+)+$/;
    if (!namePattern.test(name)) return false;
    
    const parts = name.split(/\s+/);
    if (parts.length < 2) return false;
    
    const nonNameWords = ['and', 'or', 'the', 'of', 'in', 'on', 'at', 'by', 'for', 'with', 'as'];
    if (parts.some(part => nonNameWords.includes(part.toLowerCase()))) return false;
    
    return true;
  };

  // Autofill form with prefillData (from AI extraction)
  useEffect(() => {
    if (prefillData && Object.keys(prefillData).length > 0) {
      // Clean up trustee names by filtering out invalid ones
      const cleanTrustees = Array.isArray(prefillData.trustee) 
        ? prefillData.trustee.filter(isValidName)
        : (prefillData.trustee && isValidName(prefillData.trustee) ? [prefillData.trustee] : []);
      
      const cleanSuccessorTrustees = Array.isArray(prefillData.successorTrustee)
        ? prefillData.successorTrustee.filter(isValidName)
        : (prefillData.successorTrustee && isValidName(prefillData.successorTrustee) ? [prefillData.successorTrustee] : []);
      
      // Convert state name to code if needed - prioritize the already-converted state code
      let stateValue = prefillData.state || f.state; // Use the converted state code first
      
      // If still not a code, try governingLaw and convert it
      if (!stateValue || stateValue.length > 2) {
        const fallbackState = prefillData.governingLaw || stateValue || 'CALIFORNIA';
        if (fallbackState.length > 2) {
          // It's a full state name, convert to code
          const stateObj = states.find(s => s.name.toUpperCase() === fallbackState.toUpperCase());
          stateValue = stateObj ? stateObj.code : 'CA'; // Default to CA if not found
        } else {
          stateValue = fallbackState; // Already a code
        }
      }
      
      setForm(f => ({
        ...f,
        ...prefillData,
        state: stateValue,
        trustee: cleanTrustees.length > 0 ? cleanTrustees : [''],
        successorTrustee: cleanSuccessorTrustees.length > 0 ? cleanSuccessorTrustees : [''],
        powers: Array.isArray(prefillData.powers) ? prefillData.powers : (prefillData.powers ? [prefillData.powers] : []),
      }));
    }
  }, [prefillData]);

  // Ensure state is always a valid code (not full name)
  useEffect(() => {
    if (form.state && form.state.length > 2) {
      // It's a full state name, convert to code
      const stateObj = states.find(s => s.name.toUpperCase() === form.state.toUpperCase());
      const stateCode = stateObj ? stateObj.code : 'CA';
      setForm(prev => ({ ...prev, state: stateCode }));
    }
  }, [form.state]);

  // Force default to California if no state or invalid state
  useEffect(() => {
    if (!form.state || !states.find(s => s.code === form.state)) {
      setForm(prev => ({ ...prev, state: 'CA' }));
    }
  }, []);

  // Get state-specific fields/tooltips or fall back to generic
  const selectedState = form.state;
  const req = stateRequirements[selectedState] || { fields: genericFields, tooltips: genericTooltips };

  // For each step, only show fields that are required for the selected state
  // Special case: step 0 is always the state selection step
  const stepFields = step === 0 ? ['state'] : steps[step].fields.filter(f => req.fields.includes(f));
  

  // Validation logic
  const validate = () => {
    const newErrors = validateForm(form, step, stepFields);
    
    // Additional state-specific validation
    if (stepFields.includes('tin') && form.revocability === 'irrevocable' && !form.tin) {
      newErrors.tin = 'TIN is required for irrevocable trusts';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handlers for dynamic trustee/successor trustee fields
  const handleChange = (e) => {
    let value = e.target.value;
    const name = e.target.name;
    
    // Sanitize input without trimming during typing
    if (typeof value === 'string') {
      value = sanitizeInput(value, false);
    }
    
    // Special formatting for specific fields
    if (name === 'tin') {
      value = formatTIN(value);
    } else if (name === 'state') {
      value = normalizeState(value);
    }
    
    setForm({ ...form, [name]: value });
    setErrors({ ...errors, [name]: undefined });
  };

  const handleBlur = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    
    // Trim the value when user finishes typing
    if (typeof value === 'string') {
      const trimmedValue = sanitizeInput(value, true);
      if (trimmedValue !== value) {
        setForm({ ...form, [name]: trimmedValue });
      }
    }
  };

  const handleTrusteeType = (e) => {
    const newType = e.target.value;
    if (newType === 'one') {
      // Keep only the first trustee name if switching to "one"
      setForm({ ...form, trusteeType: newType, trustee: [form.trustee[0] || ''] });
    } else {
      // If switching to "multiple", ensure at least 2 empty fields
      const currentTrustees = form.trustee.filter(t => t && t.trim());
      const trusteesToSet = currentTrustees.length >= 2 ? form.trustee : [...currentTrustees, '', ''].slice(0, Math.max(2, currentTrustees.length + 1));
      setForm({ ...form, trusteeType: newType, trustee: trusteesToSet });
    }
    setErrors({ ...errors, trustee: undefined });
  };
  const handleTrusteeChange = (idx, value) => {
    const updated = [...form.trustee];
    updated[idx] = sanitizeInput(value, false);
    setForm({ ...form, trustee: updated });
    setErrors({ ...errors, trustee: undefined });
  };
  const addTrustee = () => setForm({ ...form, trustee: [...form.trustee, ''] });
  const removeTrustee = (idx) => {
    const updated = form.trustee.filter((_, i) => i !== idx);
    setForm({ ...form, trustee: updated });
  };

  const handleSuccessorType = (e) => {
    setForm({ ...form, successorTrusteeType: e.target.value, successorTrustee: e.target.value === 'one' ? [''] : ['', ''] });
    setErrors({ ...errors, successorTrustee: undefined });
  };
  const handleSuccessorChange = (idx, value) => {
    const updated = [...form.successorTrustee];
    updated[idx] = sanitizeInput(value, false);
    setForm({ ...form, successorTrustee: updated });
    setErrors({ ...errors, successorTrustee: undefined });
  };
  const addSuccessor = () => setForm({ ...form, successorTrustee: [...form.successorTrustee, ''] });
  const removeSuccessor = (idx) => {
    const updated = form.successorTrustee.filter((_, i) => i !== idx);
    setForm({ ...form, successorTrustee: updated });
  };

  // Trustee powers handler
  const handlePowersChange = (e) => {
    const { value, checked } = e.target;
    let updated = [...form.powers];
    if (checked) {
      updated.push(value);
    } else {
      updated = updated.filter(p => p !== value);
    }
    setForm({ ...form, powers: updated });
    setErrors({ ...errors, powers: undefined });
  };
  const handleOtherPower = (e) => {
    setForm({ ...form, otherPower: sanitizeInput(e.target.value, false) });
    setErrors({ ...errors, otherPower: undefined });
  };

  // Progress bar
  const progress = ((step + (submitted ? 1 : 0)) / steps.length) * 100;

  // Only show TIN if irrevocable
  const showTIN = stepFields.includes('tin') && form.revocability === 'irrevocable';

  // Get state info for display
  const getStateInfo = (code) => {
    const state = states.find(s => s.code === code);
    return state ? state.name : code;
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow mt-8">
      {/* Enhanced urgency-driven CTA/article */}
      <div className="mb-6 p-6 bg-gradient-to-r from-yellow-50 to-orange-50 border-l-4 border-yellow-400 rounded-lg">
        <h2 className="text-xl font-bold mb-3 text-gray-800">Don&apos;t risk delays or denials—get your Certification of Trust right the first time.</h2>
        <p className="text-sm text-gray-700 mb-3">Financial institutions are tightening requirements. Missing or incorrect information can lead to frozen accounts, rejected transactions, or legal headaches. Complete your Certification of Trust with confidence—using the same standards top banks and law firms require.</p>
        <div className="flex items-center text-sm text-gray-600">
          <span className="mr-4">✓ Accepted by all major financial institutions</span>
          <span className="mr-4">✓ State-specific legal compliance</span>
          <span>✓ Professional document generation</span>
        </div>
      </div>

      {/* Progress bar */}
      <div className="w-full bg-gray-200 rounded-full h-3 mb-8">
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 h-3 rounded-full transition-all duration-300" style={{ width: `${progress}%` }} />
      </div>

      {!submitted ? (
        <form onSubmit={step === steps.length - 1 ? (e) => { e.preventDefault(); if (validate()) setSubmitted(true); } : (e) => { e.preventDefault(); if (validate()) setStep(step + 1); }} className="space-y-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-semibold text-gray-800">{steps[step].label}</h3>
            {selectedState && (
              <div className="text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded">
                {getStateInfo(selectedState)} Requirements
              </div>
            )}
          </div>

          {/* State Requirements Display - Removed to reduce form clutter */}
          {/* Users see requirements when they first select a state, don't need to repeat on form */}

          {/* Force state field on step 0 */}
          {step === 0 && (
            <div key="state" className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="block font-medium text-gray-700">
                  What state is your trust governed by?
                  <span className="ml-1 text-blue-500 cursor-help" title="Select the state that governs your trust">ⓘ</span>
                </label>
                {form.state && (
                  <StateRequirements 
                    selectedState={form.state}
                    onRequirementsLoaded={() => {}}
                    compact={true}
                  />
                )}
              </div>
              <select
                name="state"
                value={form.state && form.state.length > 2 ? 'CA' : form.state || 'CA'}
                onChange={e => {
                  setForm({ ...form, state: e.target.value });
                  setErrors({ ...errors, state: undefined });
                }}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {states.map(s => (
                  <option key={s.code} value={s.code}>{s.name}</option>
                ))}
              </select>
              {errors.state && <div className="text-red-500 text-sm mt-2">{errors.state}</div>}
            </div>
          )}
          
          {stepFields.map((key) => {
            if (key === 'state') {
              // State field is handled separately above for step 0, skip it here
              if (step === 0) return null;
              return (
                <div key="state" className="space-y-4">
                  <div className="flex items-center justify-between">
                    <label className="block font-medium text-gray-700">
                      What state is your trust governed by?
                      <span className="ml-1 text-blue-500 cursor-help" title={req.tooltips.state || genericTooltips.state}>ⓘ</span>
                    </label>
                    {form.state && (
                      <StateRequirements 
                        selectedState={form.state}
                        onRequirementsLoaded={() => {}}
                        compact={true}
                      />
                    )}
                  </div>
                  <select
                    name="state"
                    value={form.state && form.state.length > 2 ? 'CA' : form.state || 'CA'}
                    onChange={e => {
                      setForm({ ...form, state: e.target.value });
                      setErrors({ ...errors, state: undefined });
                    }}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {states.map(s => (
                      <option key={s.code} value={s.code}>{s.name}</option>
                    ))}
                  </select>
                  {errors.state && <div className="text-red-500 text-sm mt-2">{errors.state}</div>}
                </div>
              );
            }
            if (key === 'trustee') {
              return (
                <div key="trustee" className="space-y-4">
                  <label className="block font-medium mb-2 text-gray-700">
                    Is there one trustee or more than one?
                    <span className="ml-1 text-blue-500 cursor-help" title={req.tooltips.trustee || genericTooltips.trustee}>ⓘ</span>
                  </label>
                  <div className="flex gap-6 mb-4">
                    <label className="flex items-center">
                      <input type="radio" name="trusteeType" value="one" checked={form.trusteeType === 'one'} onChange={handleTrusteeType} className="mr-2" />
                      <span>One</span>
                    </label>
                    <label className="flex items-center">
                      <input type="radio" name="trusteeType" value="multiple" checked={form.trusteeType === 'multiple'} onChange={handleTrusteeType} className="mr-2" />
                      <span>More than one</span>
                    </label>
                  </div>
                  {(() => {
                    // If "one" is selected, only show the first trustee field
                    // If "multiple" is selected, show all trustee fields
                    const trusteesToShow = form.trusteeType === 'one' 
                      ? [form.trustee[0] || ''] 
                      : form.trustee;
                    
                    return trusteesToShow.map((name, idx) => (
                      <div key={idx} className="flex items-center gap-3">
                        <input
                          type="text"
                          name={`trustee_${idx}`}
                          value={name}
                          onChange={e => {
                            if (form.trusteeType === 'one') {
                              // For single trustee, update only the first entry
                              const updated = [...form.trustee];
                              updated[0] = sanitizeInput(e.target.value, false);
                              setForm({ ...form, trustee: updated });
                            } else {
                              // For multiple trustees, use existing logic
                              handleTrusteeChange(idx, e.target.value);
                            }
                            setErrors({ ...errors, trustee: undefined });
                          }}
                          autoComplete="name"
                          className="flex-1 border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder={`Trustee name${form.trusteeType === 'multiple' && trusteesToShow.length > 1 ? ` #${idx + 1}` : ''}`}
                        />
                        {form.trusteeType === 'multiple' && trusteesToShow.length > 1 && (
                          <button type="button" onClick={() => removeTrustee(idx)} className="text-red-500 hover:text-red-700 px-3 py-2">Remove</button>
                        )}
                      </div>
                    ));
                  })()}
                  {form.trusteeType === 'multiple' && (
                    <button type="button" onClick={addTrustee} className="text-blue-600 hover:text-blue-800 underline">Add another trustee</button>
                  )}
                  {errors.trustee && <div className="text-red-500 text-sm mt-2">{errors.trustee}</div>}
                </div>
              );
            }
            if (key === 'successorTrustee') {
              return (
                <div key="successorTrustee" className="space-y-4">
                  <label className="block font-medium mb-2 text-gray-700">
                    Is there one successor trustee or more than one?
                    <span className="ml-1 text-blue-500 cursor-help" title={req.tooltips.successorTrustee || genericTooltips.successorTrustee}>ⓘ</span>
                  </label>
                  <div className="flex gap-6 mb-4">
                    <label className="flex items-center">
                      <input type="radio" name="successorTrusteeType" value="one" checked={form.successorTrusteeType === 'one'} onChange={handleSuccessorType} className="mr-2" />
                      <span>One</span>
                    </label>
                    <label className="flex items-center">
                      <input type="radio" name="successorTrusteeType" value="multiple" checked={form.successorTrusteeType === 'multiple'} onChange={handleSuccessorType} className="mr-2" />
                      <span>More than one</span>
                    </label>
                  </div>
                  {form.successorTrustee.map((name, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <input
                        type="text"
                        name={`successorTrustee_${idx}`}
                        value={name}
                        onChange={e => handleSuccessorChange(idx, e.target.value)}
                        autoComplete="name"
                        className="flex-1 border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder={`Successor trustee name${form.successorTrustee.length > 1 ? ` #${idx + 1}` : ''}`}
                      />
                      {form.successorTrustee.length > 1 && (
                        <button type="button" onClick={() => removeSuccessor(idx)} className="text-red-500 hover:text-red-700 px-3 py-2">Remove</button>
                      )}
                    </div>
                  ))}
                  {form.successorTrusteeType === 'multiple' && (
                    <button type="button" onClick={addSuccessor} className="text-blue-600 hover:text-blue-800 underline">Add another successor trustee</button>
                  )}
                  {errors.successorTrustee && <div className="text-red-500 text-sm mt-2">{errors.successorTrustee}</div>}
                </div>
              );
            }
            if (key === 'powers') {
              return (
                <div key="powers" className="space-y-4">
                  <label className="block font-medium mb-2 text-gray-700">
                    Trustee powers
                    <span className="ml-1 text-blue-500 cursor-help" title={req.tooltips.powers || genericTooltips.powers}>ⓘ</span>
                  </label>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 p-2 bg-blue-50 rounded border">
                      <input
                        type="checkbox"
                        checked={form.powers.length === trusteePowersList.length}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setForm({ ...form, powers: [...trusteePowersList] });
                          } else {
                            setForm({ ...form, powers: [] });
                          }
                          setErrors({ ...errors, powers: undefined });
                        }}
                        className="mt-0"
                      />
                      <label className="font-semibold text-blue-900 text-sm cursor-pointer">
                        Select All Powers
                      </label>
                    </div>
                    <div className="grid grid-cols-1 gap-3 max-h-96 overflow-y-auto p-4 border border-gray-200 rounded-lg">
                      {trusteePowersList.map((power, idx) => (
                        <label key={power} className="flex items-start gap-3 p-3 hover:bg-gray-50 rounded cursor-pointer">
                          <input
                            type="checkbox"
                            name="powers"
                            value={power}
                            checked={form.powers.includes(power)}
                            onChange={handlePowersChange}
                            className="mt-1"
                          />
                          <span className="text-sm">{power}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  {form.powers.includes('Other') && (
                    <input
                      type="text"
                      name="otherPower"
                      value={form.otherPower}
                      onChange={handleOtherPower}
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 mt-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Describe other power"
                    />
                  )}
                  {errors.powers && <div className="text-red-500 text-sm mt-2">{errors.powers}</div>}
                </div>
              );
            }
            if (key === 'tin' && !showTIN) {
              return null;
            }
            // Default field rendering
            return (
              <div key={key} className="space-y-2">
                <label className="block font-medium text-gray-700">
                  {(() => {
                    switch (key) {
                      case 'trustName': return 'Full legal name of the trust';
                      case 'trustDate': return 'Date trust was executed';
                      case 'revocability': return 'Is the trust revocable or irrevocable?';
                      case 'grantor': return 'Name of grantor (settlor/trustor)';
                      default: return key;
                    }
                  })()}
                  <span className="ml-1 text-blue-500 cursor-help" title={req.tooltips[key] || genericTooltips[key]}>ⓘ</span>
                </label>
                {key === 'trustDate' ? (
                  <input
                    type="date"
                    name="trustDate"
                    value={form.trustDate}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                ) : key === 'revocability' ? (
                  <select
                    name="revocability"
                    value={form.revocability}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select...</option>
                    <option value="revocable">Revocable</option>
                    <option value="irrevocable">Irrevocable</option>
                  </select>
                ) : key === 'tin' ? (
                  <input
                    type="text"
                    name="tin"
                    value={form.tin}
                    onChange={handleChange}
                    placeholder="XX-XXXXXXX"
                    maxLength={10}
                    autoComplete="tax-id"
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                ) : (
                  <input
                    type="text"
                    name={key}
                    value={form[key]}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    autoComplete={key === 'grantor' || key === 'trustName' ? 'name' : key === 'state' ? 'address-level1' : 'off'}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                )}
                {errors[key] && <div className="text-red-500 text-sm mt-2">{errors[key]}</div>}
              </div>
            );
          })}

          {/* State-specific information */}
          {selectedState && stateRequirements[selectedState] && (
            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h4 className="font-medium text-blue-800 mb-2">State Requirements</h4>
              <p className="text-sm text-blue-700">
                <strong>Statute:</strong> {stateRequirements[selectedState].statute}<br />
                <strong>Recording:</strong> {stateRequirements[selectedState].recording}
              </p>
            </div>
          )}

          {/* Review Tip */}
          {step === steps.length - 1 && (
            <div className="mb-6 p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded-lg flex items-center gap-3">
              <span className="text-2xl">💡</span>
              <span className="text-yellow-800 text-sm font-medium">Please review your information carefully before confirming. Trust documents are legal instruments—accuracy matters!</span>
            </div>
          )}

          <div className="flex justify-between mt-8">
            {step > 0 && (
              <button type="button" onClick={() => setStep(step - 1)} className="bg-gray-200 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-300 transition">Back</button>
            )}
            <button
              type="submit"
              className="bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold py-3 px-8 rounded-lg hover:from-blue-700 hover:to-blue-800 transition shadow-lg"
            >
              {step === steps.length - 1 ? 'Generate Document' : 'Next'}
            </button>
          </div>
        </form>
      ) : (
        <div className="mt-6">
          <div className="mb-6 p-6 bg-green-50 border-l-4 border-green-400 rounded-lg">
            <h3 className="font-semibold text-green-800 mb-2 text-lg">Success!</h3>
            <p className="text-green-700 text-sm">Your Certification of Trust has been generated. Review the document below and use the buttons to print, download, or proceed with e-signature.</p>
          </div>
          
          {/* Action buttons for next steps */}
          <div className="mb-6 flex flex-wrap gap-4">
            <button 
              onClick={() => setShowDocument(true)}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
            >
              View Document
            </button>
            <button 
              className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition"
            >
              E-Sign with DocuSign
            </button>
            <button 
              className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition"
            >
              Online Notarization
            </button>
            <button 
              className="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition"
            >
              Print & Sign
            </button>
          </div>

          {showDocument && <DocumentGenerator formData={form} />}
        </div>
      )}
    </div>
  );
} 