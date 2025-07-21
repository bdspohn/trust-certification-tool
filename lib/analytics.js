// Analytics and tracking utilities
export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID;

// Log page views
export const pageview = (url) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', GA_TRACKING_ID, {
      page_location: url,
    });
  }
};

// Log specific events
export const event = ({ action, category, label, value }) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

// Business-critical events to track
export const trackEvents = {
  // AI Processing
  documentUploaded: (fileType, fileSize) => {
    event({
      action: 'document_uploaded',
      category: 'AI Processing',
      label: `${fileType}_${Math.round(fileSize/1024)}KB`
    });
  },

  extractionCompleted: (accuracy, processingTime) => {
    event({
      action: 'extraction_completed', 
      category: 'AI Processing',
      label: `${accuracy}%_accuracy`,
      value: processingTime
    });
  },

  extractionFailed: (errorType) => {
    event({
      action: 'extraction_failed',
      category: 'AI Processing', 
      label: errorType
    });
  },

  // User Flow
  trialStarted: () => {
    event({
      action: 'trial_started',
      category: 'Conversion',
      label: 'free_trial'
    });
  },

  formCompleted: (step, formType) => {
    event({
      action: 'form_completed',
      category: 'User Journey',
      label: `${formType}_step_${step}`
    });
  },

  certificationGenerated: (state, method) => {
    event({
      action: 'certification_generated',
      category: 'Product Usage',
      label: `${state}_${method}`
    });
  },

  signatureCompleted: (method) => {
    event({
      action: 'signature_completed',
      category: 'Product Usage',
      label: method
    });
  },

  // Business Development
  onboardingStarted: (institutionType) => {
    event({
      action: 'onboarding_started',
      category: 'Enterprise',
      label: institutionType
    });
  },

  demoRequested: (source) => {
    event({
      action: 'demo_requested',
      category: 'Lead Generation',
      label: source
    });
  },

  apiDocsViewed: (section) => {
    event({
      action: 'api_docs_viewed',
      category: 'Developer Interest',
      label: section
    });
  },

  // Errors and Issues
  errorOccurred: (errorType, component) => {
    event({
      action: 'error_occurred',
      category: 'Technical Issues',
      label: `${component}_${errorType}`
    });
  },

  // Performance
  loadTime: (component, time) => {
    event({
      action: 'load_time',
      category: 'Performance',
      label: component,
      value: time
    });
  }
};

// User identification for better analytics
export const identifyUser = (userProperties) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', GA_TRACKING_ID, {
      custom_map: userProperties
    });
  }
};

// Track form abandonment
export const trackFormAbandonment = (formType, step, fieldsCompleted) => {
  event({
    action: 'form_abandoned',
    category: 'User Journey',
    label: `${formType}_step_${step}_${fieldsCompleted}_fields`
  });
};

// Track feature usage
export const trackFeatureUsage = (feature, action, context) => {
  event({
    action: `${feature}_${action}`,
    category: 'Feature Usage',
    label: context
  });
};