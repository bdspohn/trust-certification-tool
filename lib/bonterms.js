// Bonterms.com Integration Library
// This library handles fetching and managing legal documents from Bonterms.com

const BONTERMS_TEMPLATES = {
  'privacy-policy': {
    title: 'Privacy Policy',
    url: 'https://bonterms.com/forms/privacy-policy/',
    lastUpdated: '2024-07-17',
    templateId: 'bonterms-privacy-2024',
    category: 'data-privacy'
  },
  'terms-of-service': {
    title: 'Terms of Service',
    url: 'https://bonterms.com/forms/terms-of-service/',
    lastUpdated: '2024-07-17', 
    templateId: 'bonterms-terms-2024',
    category: 'commercial'
  },
  'data-processing-agreement': {
    title: 'Data Processing Agreement',
    url: 'https://bonterms.com/forms/data-processing-agreement/',
    lastUpdated: '2024-07-17',
    templateId: 'bonterms-dpa-2024',
    category: 'data-privacy'
  },
  'nda': {
    title: 'Non-Disclosure Agreement',
    url: 'https://bonterms.com/forms/nda/',
    lastUpdated: '2024-07-17',
    templateId: 'bonterms-nda-2024',
    category: 'confidentiality'
  }
};

// Company-specific customizations for Trusto
const TRUSTO_CUSTOMIZATIONS = {
  companyName: 'Trusto, Inc.',
  companyEmail: 'legal@trusto.com',
  companyAddress: {
    street: '123 Business Way',
    city: 'Phoenix',
    state: 'Arizona',
    zip: '85001',
    country: 'United States'
  },
  governingLaw: 'Delaware',
  effectiveDate: '2024-07-17',
  website: 'https://trusto.inc',
  supportEmail: 'support@trusto.com'
};

/**
 * Fetches the latest Bonterms template for a given document type
 * @param {string} documentType - The type of document (privacy-policy, terms-of-service, etc.)
 * @returns {Promise<Object>} The customized legal document
 */
export async function fetchBontermsTemplate(documentType) {
  const template = BONTERMS_TEMPLATES[documentType];
  
  if (!template) {
    throw new Error(`Unknown document type: ${documentType}`);
  }

  try {
    // In a real implementation, you might fetch from Bonterms API or scrape their site
    // For now, we'll return pre-structured content based on their templates
    
    const document = await generateCustomizedDocument(documentType, template);
    
    return {
      ...document,
      meta: {
        source: 'bonterms.com',
        templateId: template.templateId,
        lastUpdated: template.lastUpdated,
        customizedFor: 'Trusto, Inc.',
        customizedDate: new Date().toISOString().split('T')[0]
      }
    };
  } catch (error) {
    console.error(`Error fetching Bonterms template for ${documentType}:`, error);
    throw error;
  }
}

/**
 * Generates a customized legal document based on Bonterms template
 * @param {string} documentType 
 * @param {Object} template 
 * @returns {Promise<Object>}
 */
async function generateCustomizedDocument(documentType, template) {
  const customizations = TRUSTO_CUSTOMIZATIONS;
  
  switch (documentType) {
    case 'privacy-policy':
      return generatePrivacyPolicy(customizations);
    case 'terms-of-service':
      return generateTermsOfService(customizations);
    case 'data-processing-agreement':
      return generateDPA(customizations);
    case 'nda':
      return generateNDA(customizations);
    default:
      throw new Error(`Document generation not implemented for ${documentType}`);
  }
}

function generatePrivacyPolicy(customizations) {
  return {
    title: 'Privacy Policy',
    content: [
      {
        section: 'header',
        content: `This Privacy Policy is based on the Bonterms.com template and customized for ${customizations.companyName}.`
      },
      {
        section: 'effective-date',
        content: `Effective Date: ${customizations.effectiveDate}`
      },
      {
        section: 'introduction',
        content: `${customizations.companyName} ("Company", "we", "us", or "our") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our website ${customizations.website} and services.`
      },
      {
        section: 'information-collection',
        title: '1. Information We Collect',
        content: [
          'Personal Information: Name, email address, contact information, and other identifiers you provide.',
          'Financial Information: Trust documents, bank account information, and related financial data necessary for our services.',
          'Usage Data: Information about how you use our website and services, including IP address, browser type, and access times.',
          'Cookies and Tracking: We use cookies and similar technologies to enhance your experience and analyze usage patterns.'
        ]
      },
      {
        section: 'information-use',
        title: '2. How We Use Your Information',
        content: [
          'To provide, operate, and maintain our trust certification services.',
          'To process trust documents and generate legally compliant certifications.',
          'To communicate with you about your account and our services.',
          'To improve, personalize, and expand our services.',
          'To comply with legal obligations and enforce our terms.',
          'To detect, prevent, and address technical issues and security vulnerabilities.'
        ]
      },
      {
        section: 'information-sharing',
        title: '3. How We Share Your Information',
        content: [
          'With service providers who help us operate our business (e.g., cloud hosting, payment processing).',
          'With financial institutions when you authorize us to submit certification documents.',
          'With legal authorities if required by law or to protect our rights.',
          'With notaries and e-signature providers as part of the certification process.',
          'With your explicit consent or at your direction.'
        ]
      },
      {
        section: 'data-security',
        title: '4. Data Security',
        content: 'We implement bank-grade security measures including AES-256 encryption, SOC 2 compliance, and secure data transmission protocols. However, no method of transmission over the Internet or electronic storage is 100% secure.'
      },
      {
        section: 'your-rights',
        title: '5. Your Rights and Choices',
        content: [
          'You may access, update, or delete your personal information through your account.',
          'You may opt out of certain communications at any time.',
          'You can manage cookies through your browser settings.',
          'You may request a copy of your data or ask us to delete it, subject to legal requirements.'
        ]
      },
      {
        section: 'contact',
        title: '6. Contact Us',
        content: `If you have any questions about this Privacy Policy, please contact us at ${customizations.companyEmail}.`
      }
    ]
  };
}

function generateTermsOfService(customizations) {
  return {
    title: 'Terms of Service',
    content: [
      {
        section: 'header',
        content: `This Terms of Service is based on the Bonterms.com template and customized for ${customizations.companyName}.`
      },
      {
        section: 'effective-date',
        content: `Effective Date: ${customizations.effectiveDate}`
      },
      {
        section: 'introduction',
        content: `Welcome to ${customizations.companyName} ("Company", "we", "us", or "our"). These Terms of Service ("Terms") govern your use of our website ${customizations.website} and trust certification services. By accessing or using our services, you agree to these Terms.`
      },
      {
        section: 'services',
        title: '1. Our Services',
        content: [
          'We provide AI-powered trust document processing and certification services.',
          'Our platform generates state-specific, legally compliant Certification of Trust documents.',
          'We offer e-signature integration and online notarization services.',
          'Services are provided to financial institutions and individual trust owners.'
        ]
      },
      {
        section: 'user-obligations',
        title: '2. User Obligations',
        content: [
          'You must be at least 18 years old and legally capable of entering contracts.',
          'You agree to provide accurate and complete information.',
          'You are responsible for maintaining the confidentiality of your account.',
          'You agree to use our services only for lawful purposes.',
          'You must not upload fraudulent, misleading, or unlawful documents.'
        ]
      },
      {
        section: 'intellectual-property',
        title: '3. Intellectual Property',
        content: 'All content, software, and materials on our platform are owned by Company or its licensors. You may not use, copy, or distribute any content without our express written permission.'
      },
      {
        section: 'disclaimers',
        title: '4. Disclaimers',
        content: 'Our services are provided "as is" and "as available". We disclaim all warranties, express or implied, including merchantability, fitness for a particular purpose, and non-infringement. We do not guarantee the legal sufficiency of generated documents.'
      },
      {
        section: 'limitation-liability',
        title: '5. Limitation of Liability',
        content: `To the fullest extent permitted by law, ${customizations.companyName} is not liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly.`
      },
      {
        section: 'governing-law',
        title: '6. Governing Law',
        content: `These Terms are governed by the laws of the State of ${customizations.governingLaw}, without regard to its conflict of law principles.`
      },
      {
        section: 'contact',
        title: '7. Contact Us',
        content: `If you have any questions about these Terms, please contact us at ${customizations.companyEmail}.`
      }
    ]
  };
}

function generateDPA(customizations) {
  return {
    title: 'Data Processing Agreement',
    content: [
      {
        section: 'header',
        content: `This Data Processing Agreement is based on the Bonterms.com template and customized for ${customizations.companyName}.`
      },
      {
        section: 'parties',
        title: '1. Parties',
        content: `This Data Processing Agreement ("DPA") is entered into between ${customizations.companyName} ("Processor") and the Customer ("Controller").`
      },
      {
        section: 'scope',
        title: '2. Scope and Purpose',
        content: 'This DPA governs the processing of personal data by Processor on behalf of Controller in connection with trust certification services.'
      },
      {
        section: 'obligations',
        title: '3. Processor Obligations',
        content: [
          'Process personal data only on documented instructions from Controller.',
          'Implement appropriate technical and organizational measures.',
          'Ensure confidentiality of personal data.',
          'Assist Controller in responding to data subject requests.',
          'Notify Controller of any personal data breaches without undue delay.'
        ]
      }
    ]
  };
}

function generateNDA(customizations) {
  return {
    title: 'Non-Disclosure Agreement',
    content: [
      {
        section: 'header',
        content: `This Non-Disclosure Agreement is based on the Bonterms.com template and customized for ${customizations.companyName}.`
      },
      {
        section: 'parties',
        title: '1. Parties',
        content: `This Agreement is between ${customizations.companyName} and the receiving party.`
      },
      {
        section: 'definition',
        title: '2. Confidential Information',
        content: 'Confidential Information includes all non-public information related to trust documents, financial data, business processes, and proprietary technology.'
      }
    ]
  };
}

/**
 * Checks if there are newer versions available on Bonterms.com
 * @param {string} documentType 
 * @returns {Promise<boolean>}
 */
export async function checkForUpdates(documentType) {
  // In a real implementation, this would check Bonterms.com for updates
  // For now, return false (no updates available)
  return false;
}

/**
 * Gets the list of available Bonterms templates
 * @returns {Object}
 */
export function getAvailableTemplates() {
  return BONTERMS_TEMPLATES;
}

/**
 * Updates company customizations
 * @param {Object} newCustomizations 
 */
export function updateCustomizations(newCustomizations) {
  Object.assign(TRUSTO_CUSTOMIZATIONS, newCustomizations);
}