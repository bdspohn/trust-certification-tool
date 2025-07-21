import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { 
  DocumentTextIcon, 
  CubeIcon, 
  BoltIcon,
  ShieldCheckIcon,
  ClockIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline';

const APIDocumentation = () => {
  const [activeEndpoint, setActiveEndpoint] = useState('trust-status');
  const [selectedLanguage, setSelectedLanguage] = useState('curl');

  const endpoints = [
    {
      id: 'trust-status',
      method: 'GET',
      path: '/api/trust-registry/{trust_id}',
      title: 'Get Trust Status',
      description: 'Retrieve real-time trust verification data for institutions',
      category: 'Core API'
    },
    {
      id: 'request-update',
      method: 'POST', 
      path: '/api/trust-registry/{trust_id}',
      title: 'Request Trust Update',
      description: 'Request trustee notification for trust verification updates',
      category: 'Core API'
    },
    {
      id: 'register-institution',
      method: 'POST',
      path: '/api/trust-registry/institutions/register',
      title: 'Register Institution',
      description: 'Onboard new financial institution to Trust Registry network',
      category: 'Onboarding'
    },
    {
      id: 'webhooks',
      method: 'POST',
      path: '/webhooks/trust-updated',
      title: 'Trust Update Webhooks',
      description: 'Receive real-time notifications when trust data changes',
      category: 'Real-time'
    }
  ];

  const codeExamples = {
    'trust-status': {
      curl: `curl -X GET "https://api.trusto.inc/trust-registry/trust_001" \\
  -H "X-API-Key: bank_wells_fargo_prod" \\
  -H "Content-Type: application/json"`,
      
      javascript: `const response = await fetch('https://api.trusto.inc/trust-registry/trust_001', {
  method: 'GET',
  headers: {
    'X-API-Key': 'bank_wells_fargo_prod',
    'Content-Type': 'application/json'
  }
});

const trustData = await response.json();
console.log(trustData);`,

      python: `import requests

headers = {
    'X-API-Key': 'bank_wells_fargo_prod',
    'Content-Type': 'application/json'
}

response = requests.get(
    'https://api.trusto.inc/trust-registry/trust_001',
    headers=headers
)

trust_data = response.json()
print(trust_data)`
    },
    
    'request-update': {
      curl: `curl -X POST "https://api.trusto.inc/trust-registry/trust_001" \\
  -H "X-API-Key: bank_wells_fargo_prod" \\
  -H "Content-Type: application/json" \\
  -d '{
    "notification_type": "account_opening",
    "context": "New checking account requires trust verification",
    "priority": "normal"
  }'`,
      
      javascript: `const response = await fetch('https://api.trusto.inc/trust-registry/trust_001', {
  method: 'POST',
  headers: {
    'X-API-Key': 'bank_wells_fargo_prod',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    notification_type: 'account_opening',
    context: 'New checking account requires trust verification',
    priority: 'normal'
  })
});

const result = await response.json();`,

      python: `import requests

headers = {
    'X-API-Key': 'bank_wells_fargo_prod',
    'Content-Type': 'application/json'
}

data = {
    'notification_type': 'account_opening',
    'context': 'New checking account requires trust verification',
    'priority': 'normal'
}

response = requests.post(
    'https://api.trusto.inc/trust-registry/trust_001',
    headers=headers,
    json=data
)`
    }
  };

  const responseExamples = {
    'trust-status': `{
  "success": true,
  "data": {
    "trust_id": "trust_001",
    "name": "John and Mary Smith Family Trust",
    "status": "active",
    "verification_level": "platinum",
    "last_updated": "2024-07-20T10:30:00Z",
    "current_trustees": [
      {
        "name": "John Smith",
        "role": "primary_trustee", 
        "status": "active",
        "verified": true
      }
    ],
    "certifications": {
      "latest_issued": "2024-07-15",
      "valid_until": "2025-07-15",
      "certificate_id": "cert_20240715_001"
    },
    "changes_since_last_cert": [],
    "risk_assessment": {
      "score": "low",
      "last_assessed": "2024-07-20T08:00:00Z"
    }
  },
  "metadata": {
    "api_version": "1.0",
    "response_time": "2024-07-20T15:30:00Z",
    "institution": "Wells Fargo",
    "rate_limit_remaining": 999
  }
}`,

    'request-update': `{
  "success": true,
  "data": {
    "notification_id": "notif_1721484600123",
    "status": "notification_sent",
    "expected_response_time": "24 hours"
  },
  "metadata": {
    "api_version": "1.0",
    "response_time": "2024-07-20T15:30:00Z",
    "institution": "Wells Fargo"
  }
}`
  };

  const pricingTiers = [
    {
      name: 'Community',
      description: 'For credit unions and community banks',
      price: 'Contact Sales',
      setup: 'Custom pricing',
      apiCalls: '1,000 calls/month',
      perCall: '$2.00 overage',
      features: [
        'Basic trust verification',
        'Email notifications',
        'Standard support',
        'Rate limiting: 10 calls/minute'
      ]
    },
    {
      name: 'Regional',
      description: 'For regional banks and investment firms',
      price: 'Contact Sales',
      setup: 'Custom pricing',
      apiCalls: '5,000 calls/month',
      perCall: '$1.50 overage',
      features: [
        'Enhanced trust verification',
        'Real-time webhooks',
        'Priority support',
        'Rate limiting: 50 calls/minute',
        'Historical data access'
      ],
      popular: true
    },
    {
      name: 'Enterprise',
      description: 'For national banks and large institutions',
      price: 'Contact Sales',
      setup: 'Custom pricing',
      apiCalls: '25,000 calls/month',
      perCall: '$1.00 overage',
      features: [
        'Premium trust verification',
        'Real-time webhooks',
        'Dedicated support',
        'Rate limiting: 200 calls/minute',
        'Custom integrations',
        'Advanced analytics'
      ]
    }
  ];

  const activeEndpointData = endpoints.find(e => e.id === activeEndpoint);

  return (
    <>
      <Head>
        <title>API Documentation - Trust Registry</title>
        <meta name="description" content="Complete API documentation for Trust Registry - real-time trust verification for financial institutions" />
      </Head>

      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center space-x-4">
                <Link href="/" className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                    <div className="text-white text-sm font-bold">T</div>
                  </div>
                  <span className="text-xl font-bold text-gray-900">Trusto API</span>
                </Link>
              </div>
              <div className="flex items-center space-x-4">
                <Link href="/legal-services" className="text-gray-600 hover:text-gray-900">
                  Legal Services
                </Link>
                <Link href="/" className="text-gray-600 hover:text-gray-900">
                  Home
                </Link>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                  Get API Key
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar Navigation */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg border border-gray-200 p-6 sticky top-8">
                <h3 className="font-semibold text-gray-900 mb-4">API Reference</h3>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Getting Started</h4>
                    <div className="space-y-1">
                      <a href="#authentication" className="block text-sm text-gray-600 hover:text-blue-600">Authentication</a>
                      <a href="#rate-limits" className="block text-sm text-gray-600 hover:text-blue-600">Rate Limits</a>
                      <a href="#errors" className="block text-sm text-gray-600 hover:text-blue-600">Error Handling</a>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Endpoints</h4>
                    <div className="space-y-1">
                      {endpoints.map((endpoint) => (
                        <button
                          key={endpoint.id}
                          onClick={() => setActiveEndpoint(endpoint.id)}
                          className={`block w-full text-left text-sm hover:text-blue-600 ${
                            activeEndpoint === endpoint.id ? 'text-blue-600 font-medium' : 'text-gray-600'
                          }`}
                        >
                          <span className={`inline-block w-12 text-xs px-1 py-0.5 rounded mr-2 ${
                            endpoint.method === 'GET' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                          }`}>
                            {endpoint.method}
                          </span>
                          {endpoint.title}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Pricing</h4>
                    <div className="space-y-1">
                      <a href="#pricing" className="block text-sm text-gray-600 hover:text-blue-600">API Pricing</a>
                      <a href="#billing" className="block text-sm text-gray-600 hover:text-blue-600">Billing</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              {/* Introduction */}
              <div className="bg-white rounded-lg border border-gray-200 p-8 mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-4">Trust Registry API</h1>
                <p className="text-lg text-gray-600 mb-6">
                  The Trust Registry API provides real-time trust verification for financial institutions. 
                  Eliminate trust compliance errors with automated status updates and AI-powered verification.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <BoltIcon className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                    <h3 className="font-semibold text-gray-900 mb-1">Real-time</h3>
                    <p className="text-sm text-gray-600">Instant trust status verification</p>
                  </div>
                  <div className="text-center">
                    <ShieldCheckIcon className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                    <h3 className="font-semibold text-gray-900 mb-1">Secure</h3>
                    <p className="text-sm text-gray-600">Bank-grade security and encryption</p>
                  </div>
                  <div className="text-center">
                    <CubeIcon className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                    <h3 className="font-semibold text-gray-900 mb-1">Scalable</h3>
                    <p className="text-sm text-gray-600">Handle millions of API calls</p>
                  </div>
                </div>
              </div>

              {/* Authentication Section */}
              <div id="authentication" className="bg-white rounded-lg border border-gray-200 p-8 mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Authentication</h2>
                <p className="text-gray-600 mb-4">
                  All API requests require authentication using an API key in the header.
                </p>
                
                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                  <code className="text-sm">
                    X-API-Key: your_institution_api_key
                  </code>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-900 mb-2">Getting Your API Key</h4>
                  <ol className="text-sm text-blue-800 space-y-1 list-decimal list-inside">
                    <li>Register your institution using the registration endpoint</li>
                    <li>Complete identity verification process</li>
                    <li>Receive API credentials within 24-48 hours</li>
                    <li>Test with sandbox environment before going live</li>
                  </ol>
                </div>
              </div>

              {/* Active Endpoint Documentation */}
              {activeEndpointData && (
                <div className="bg-white rounded-lg border border-gray-200 p-8 mb-8">
                  <div className="flex items-center mb-4">
                    <span className={`inline-block px-3 py-1 rounded text-sm font-medium mr-3 ${
                      activeEndpointData.method === 'GET' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                    }`}>
                      {activeEndpointData.method}
                    </span>
                    <h2 className="text-2xl font-bold text-gray-900">{activeEndpointData.title}</h2>
                  </div>

                  <p className="text-gray-600 mb-4">{activeEndpointData.description}</p>

                  <div className="bg-gray-50 rounded-lg p-4 mb-6">
                    <code className="text-sm font-mono">
                      {activeEndpointData.method} https://api.trusto.inc{activeEndpointData.path}
                    </code>
                  </div>

                  {/* Code Examples */}
                  <div className="mb-6">
                    <div className="flex items-center mb-4">
                      <h3 className="text-lg font-semibold text-gray-900 mr-4">Request Example</h3>
                      <div className="flex space-x-2">
                        {['curl', 'javascript', 'python'].map((lang) => (
                          <button
                            key={lang}
                            onClick={() => setSelectedLanguage(lang)}
                            className={`px-3 py-1 rounded text-sm ${
                              selectedLanguage === lang
                                ? 'bg-blue-600 text-white'
                                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                            }`}
                          >
                            {lang.toUpperCase()}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                      <pre className="text-green-400 text-sm">
                        {codeExamples[activeEndpoint]?.[selectedLanguage] || 'Code example not available'}
                      </pre>
                    </div>
                  </div>

                  {/* Response Example */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Response Example</h3>
                    <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                      <pre className="text-green-400 text-sm">
                        {responseExamples[activeEndpoint] || 'Response example not available'}
                      </pre>
                    </div>
                  </div>
                </div>
              )}

              {/* Pricing Section */}
              <div id="pricing" className="bg-white rounded-lg border border-gray-200 p-8 mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">API Pricing</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {pricingTiers.map((tier, i) => (
                    <div
                      key={i}
                      className={`border-2 rounded-lg p-6 relative ${
                        tier.popular ? 'border-blue-500 ring-2 ring-blue-500 ring-offset-2' : 'border-gray-200'
                      }`}
                    >
                      {tier.popular && (
                        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white text-xs px-3 py-1 rounded-full">
                          Most Popular
                        </div>
                      )}
                      
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{tier.name}</h3>
                      <p className="text-sm text-gray-600 mb-4">{tier.description}</p>
                      
                      <div className="mb-4">
                        <div className="text-2xl font-bold text-gray-900">{tier.price}</div>
                        <div className="text-sm text-gray-500">{tier.setup}</div>
                        <div className="text-sm text-gray-500">{tier.apiCalls}</div>
                        <div className="text-sm text-gray-500">{tier.perCall}</div>
                      </div>

                      <div className="space-y-2 mb-6">
                        {tier.features.map((feature, j) => (
                          <div key={j} className="flex items-start text-sm">
                            <CheckCircleIcon className="h-4 w-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-700">{feature}</span>
                          </div>
                        ))}
                      </div>

                      <button className={`w-full py-3 rounded-lg font-semibold ${
                        tier.popular
                          ? 'bg-blue-600 text-white hover:bg-blue-700'
                          : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
                      }`}>
                        Get Started
                      </button>
                    </div>
                  ))}
                </div>

                <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <h4 className="font-semibold text-yellow-800 mb-2">Enterprise Pricing</h4>
                  <p className="text-sm text-yellow-700">
                    Need more than 25,000 API calls per month? Contact us for custom enterprise pricing 
                    with dedicated support, white-label options, and volume discounts.
                  </p>
                </div>
              </div>

              {/* Rate Limits & Errors */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div id="rate-limits" className="bg-white rounded-lg border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Rate Limits</h3>
                  <div className="space-y-4">
                    <div>
                      <span className="text-sm font-medium text-gray-700">Community:</span>
                      <div className="text-sm text-gray-600">10 calls/minute</div>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-700">Regional:</span>
                      <div className="text-sm text-gray-600">50 calls/minute</div>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-700">Enterprise:</span>
                      <div className="text-sm text-gray-600">200 calls/minute</div>
                    </div>
                  </div>
                </div>

                <div id="errors" className="bg-white rounded-lg border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Error Codes</h3>
                  <div className="space-y-2 text-sm">
                    <div><code className="bg-gray-100 px-2 py-1 rounded">401</code> - Invalid API key</div>
                    <div><code className="bg-gray-100 px-2 py-1 rounded">403</code> - Access denied</div>
                    <div><code className="bg-gray-100 px-2 py-1 rounded">404</code> - Trust not found</div>
                    <div><code className="bg-gray-100 px-2 py-1 rounded">429</code> - Rate limit exceeded</div>
                    <div><code className="bg-gray-100 px-2 py-1 rounded">500</code> - Server error</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default APIDocumentation;