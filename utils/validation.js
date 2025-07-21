// Validation utilities for trust certification forms

// Validate Trust Name
export const validateTrustName = (name) => {
  if (!name || !name.trim()) {
    return 'Trust name is required';
  }
  if (name.trim().length < 3) {
    return 'Trust name must be at least 3 characters long';
  }
  if (name.trim().length > 200) {
    return 'Trust name must be less than 200 characters';
  }
  // Check for basic trust name patterns
  if (!/trust|living trust|revocable|irrevocable/i.test(name)) {
    return 'Trust name should contain the word "Trust"';
  }
  return null;
};

// Validate Trust Date
export const validateTrustDate = (date) => {
  if (!date) {
    return 'Trust date is required';
  }
  
  const trustDate = new Date(date);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  if (isNaN(trustDate.getTime())) {
    return 'Invalid date format';
  }
  
  // Trust date cannot be in the future
  if (trustDate > today) {
    return 'Trust date cannot be in the future';
  }
  
  // Trust date should be within reasonable bounds (last 100 years)
  const minDate = new Date();
  minDate.setFullYear(minDate.getFullYear() - 100);
  if (trustDate < minDate) {
    return 'Trust date seems too old. Please verify the date';
  }
  
  return null;
};

// Validate Revocability
export const validateRevocability = (revocability) => {
  if (!revocability) {
    return 'Please specify if the trust is revocable or irrevocable';
  }
  if (!['revocable', 'irrevocable'].includes(revocability)) {
    return 'Invalid revocability value';
  }
  return null;
};

// Validate State
export const validateState = (state) => {
  if (!state || !state.trim()) {
    return 'State is required';
  }
  
  const validStates = [
    'ALABAMA', 'ALASKA', 'ARIZONA', 'ARKANSAS', 'CALIFORNIA',
    'COLORADO', 'CONNECTICUT', 'DELAWARE', 'FLORIDA', 'GEORGIA',
    'HAWAII', 'IDAHO', 'ILLINOIS', 'INDIANA', 'IOWA',
    'KANSAS', 'KENTUCKY', 'LOUISIANA', 'MAINE', 'MARYLAND',
    'MASSACHUSETTS', 'MICHIGAN', 'MINNESOTA', 'MISSISSIPPI', 'MISSOURI',
    'MONTANA', 'NEBRASKA', 'NEVADA', 'NEW HAMPSHIRE', 'NEW JERSEY',
    'NEW MEXICO', 'NEW YORK', 'NORTH CAROLINA', 'NORTH DAKOTA', 'OHIO',
    'OKLAHOMA', 'OREGON', 'PENNSYLVANIA', 'RHODE ISLAND', 'SOUTH CAROLINA',
    'SOUTH DAKOTA', 'TENNESSEE', 'TEXAS', 'UTAH', 'VERMONT',
    'VIRGINIA', 'WASHINGTON', 'WEST VIRGINIA', 'WISCONSIN', 'WYOMING',
    'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA',
    'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD',
    'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ',
    'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC',
    'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'
  ];
  
  if (!validStates.includes(state.toUpperCase())) {
    return 'Please enter a valid US state';
  }
  
  return null;
};

// Validate Name (for grantors, trustees)
export const validateName = (name, fieldName = 'Name') => {
  if (!name || !name.trim()) {
    return `${fieldName} is required`;
  }
  if (name.trim().length < 2) {
    return `${fieldName} must be at least 2 characters long`;
  }
  if (name.trim().length > 100) {
    return `${fieldName} must be less than 100 characters`;
  }
  // Basic name validation - allow letters, spaces, hyphens, apostrophes
  if (!/^[a-zA-Z\s\-'.]+$/.test(name.trim())) {
    return `${fieldName} contains invalid characters`;
  }
  return null;
};

// Validate Trustees array
export const validateTrustees = (trustees) => {
  if (!trustees || !Array.isArray(trustees)) {
    return 'At least one trustee is required';
  }
  
  const validTrustees = trustees.filter(t => t && t.trim());
  if (validTrustees.length === 0) {
    return 'At least one trustee is required';
  }
  
  // Check for duplicates
  const uniqueTrustees = [...new Set(validTrustees.map(t => t.trim().toLowerCase()))];
  if (uniqueTrustees.length !== validTrustees.length) {
    return 'Duplicate trustee names are not allowed';
  }
  
  // Validate each trustee name
  for (let i = 0; i < validTrustees.length; i++) {
    const error = validateName(validTrustees[i], `Trustee ${i + 1}`);
    if (error) return error;
  }
  
  return null;
};

// Validate Successor Trustees array
export const validateSuccessorTrustees = (successorTrustees, trustees) => {
  if (!successorTrustees || !Array.isArray(successorTrustees)) {
    return null; // Successor trustees are optional
  }
  
  const validSuccessors = successorTrustees.filter(s => s && s.trim());
  if (validSuccessors.length === 0) {
    return null; // Empty is OK for successor trustees
  }
  
  // Check for duplicates within successor trustees
  const uniqueSuccessors = [...new Set(validSuccessors.map(s => s.trim().toLowerCase()))];
  if (uniqueSuccessors.length !== validSuccessors.length) {
    return 'Duplicate successor trustee names are not allowed';
  }
  
  // Check if any successor trustee is also a primary trustee
  const trusteeLowerCase = trustees
    .filter(t => t && t.trim())
    .map(t => t.trim().toLowerCase());
  
  for (const successor of validSuccessors) {
    if (trusteeLowerCase.includes(successor.trim().toLowerCase())) {
      return 'A person cannot be both a trustee and successor trustee';
    }
  }
  
  // Validate each successor trustee name
  for (let i = 0; i < validSuccessors.length; i++) {
    const error = validateName(validSuccessors[i], `Successor Trustee ${i + 1}`);
    if (error) return error;
  }
  
  return null;
};

// Validate Powers
export const validatePowers = (powers) => {
  if (!powers || !Array.isArray(powers) || powers.length === 0) {
    return 'Please select at least one trustee power';
  }
  return null;
};

// Validate TIN (Tax Identification Number)
export const validateTIN = (tin, isRequired = false) => {
  if (!tin || !tin.trim()) {
    return isRequired ? 'Tax Identification Number is required' : null;
  }
  
  // Remove any formatting characters
  const cleanTIN = tin.replace(/[^0-9]/g, '');
  
  // TIN should be 9 digits (format: XX-XXXXXXX)
  if (cleanTIN.length !== 9) {
    return 'TIN must be 9 digits (format: XX-XXXXXXX)';
  }
  
  // Basic validation - first two digits shouldn't be 00
  if (cleanTIN.substring(0, 2) === '00') {
    return 'Invalid TIN format';
  }
  
  return null;
};

// Sanitize input to prevent XSS
export const sanitizeInput = (input, shouldTrim = false) => {
  if (!input) return '';
  
  // Convert to string if not already
  const str = String(input);
  
  // For now, just return the input as-is to test spacebar issue
  // We'll add back sanitization once spacebar works
  return shouldTrim ? str.trim() : str;
};

// Sanitize array of inputs
export const sanitizeArray = (array) => {
  if (!Array.isArray(array)) return [];
  return array.map(item => sanitizeInput(item));
};

// Validate entire form
export const validateForm = (form, step, stepFields) => {
  const errors = {};
  
  stepFields.forEach((field) => {
    switch (field) {
      case 'state':
        const stateError = validateState(form.state);
        if (stateError) errors.state = stateError;
        break;
        
      case 'trustName':
        const nameError = validateTrustName(form.trustName);
        if (nameError) errors.trustName = nameError;
        break;
        
      case 'trustDate':
        const dateError = validateTrustDate(form.trustDate);
        if (dateError) errors.trustDate = dateError;
        break;
        
      case 'revocability':
        const revocabilityError = validateRevocability(form.revocability);
        if (revocabilityError) errors.revocability = revocabilityError;
        break;
        
      case 'grantor':
        const grantorError = validateName(form.grantor, 'Grantor');
        if (grantorError) errors.grantor = grantorError;
        break;
        
      case 'trustee':
        const trusteeError = validateTrustees(form.trustee);
        if (trusteeError) errors.trustee = trusteeError;
        break;
        
      case 'successorTrustee':
        const successorError = validateSuccessorTrustees(form.successorTrustee, form.trustee);
        if (successorError) errors.successorTrustee = successorError;
        break;
        
      case 'powers':
        const powersError = validatePowers(form.powers);
        if (powersError) errors.powers = powersError;
        break;
        
      case 'tin':
        // TIN is optional in most states
        const tinError = validateTIN(form.tin, false);
        if (tinError) errors.tin = tinError;
        break;
    }
  });
  
  return errors;
};

// Format TIN for display
export const formatTIN = (tin) => {
  if (!tin) return '';
  const cleaned = tin.replace(/[^0-9]/g, '');
  if (cleaned.length >= 2) {
    return `${cleaned.slice(0, 2)}-${cleaned.slice(2)}`;
  }
  return cleaned;
};

// Normalize state input
export const normalizeState = (state) => {
  if (!state) return '';
  
  const stateMap = {
    'AL': 'ALABAMA', 'AK': 'ALASKA', 'AZ': 'ARIZONA', 'AR': 'ARKANSAS', 'CA': 'CALIFORNIA',
    'CO': 'COLORADO', 'CT': 'CONNECTICUT', 'DE': 'DELAWARE', 'FL': 'FLORIDA', 'GA': 'GEORGIA',
    'HI': 'HAWAII', 'ID': 'IDAHO', 'IL': 'ILLINOIS', 'IN': 'INDIANA', 'IA': 'IOWA',
    'KS': 'KANSAS', 'KY': 'KENTUCKY', 'LA': 'LOUISIANA', 'ME': 'MAINE', 'MD': 'MARYLAND',
    'MA': 'MASSACHUSETTS', 'MI': 'MICHIGAN', 'MN': 'MINNESOTA', 'MS': 'MISSISSIPPI', 'MO': 'MISSOURI',
    'MT': 'MONTANA', 'NE': 'NEBRASKA', 'NV': 'NEVADA', 'NH': 'NEW HAMPSHIRE', 'NJ': 'NEW JERSEY',
    'NM': 'NEW MEXICO', 'NY': 'NEW YORK', 'NC': 'NORTH CAROLINA', 'ND': 'NORTH DAKOTA', 'OH': 'OHIO',
    'OK': 'OKLAHOMA', 'OR': 'OREGON', 'PA': 'PENNSYLVANIA', 'RI': 'RHODE ISLAND', 'SC': 'SOUTH CAROLINA',
    'SD': 'SOUTH DAKOTA', 'TN': 'TENNESSEE', 'TX': 'TEXAS', 'UT': 'UTAH', 'VT': 'VERMONT',
    'VA': 'VIRGINIA', 'WA': 'WASHINGTON', 'WV': 'WEST VIRGINIA', 'WI': 'WISCONSIN', 'WY': 'WYOMING'
  };
  
  const upperState = state.toUpperCase().trim();
  return stateMap[upperState] || upperState;
};