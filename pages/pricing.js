import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { 
  CheckCircleIcon, 
  XMarkIcon,
  CalculatorIcon,
  ChartBarIcon,
  CurrencyDollarIcon,
  BuildingOffice2Icon
} from '@heroicons/react/24/outline';

const PricingPage = () => {
  const [billingPeriod, setBillingPeriod] = useState('monthly');
  const [calculatorInputs, setCalculatorInputs] = useState({
    institutionType: 'regional_bank',
    monthlyApiCalls: 5000,
    trustVolume: 100,
    averageTrustValue: 1000000
  });

  const pricingPlans = [
    {
      name: 'Community',
      description: 'Perfect for credit unions and community banks',
      monthlyPrice: 500,
      annualPrice: 5000,
      setupFee: 1000,
      apiCalls: 1000,
      overageRate: 2.00,
      features: [
        'Basic trust verification API',
        'Email notifications',
        'Standard support (48h response)',
        'Rate limiting: 10 calls/minute',
        'Basic documentation access',
        'Email support only'
      ],
      limitations: [
        'No real-time webhooks',
        'No historical data access',
        'Limited support hours'
      ],
      idealFor: 'Credit unions, community banks under $1B assets'
    },
    {
      name: 'Regional',
      description: 'Designed for regional banks and investment firms',
      monthlyPrice: 2000,
      annualPrice: 20000,
      setupFee: 5000,
      apiCalls: 5000,
      overageRate: 1.50,
      features: [
        'Enhanced trust verification API',
        'Real-time webhook notifications',
        'Priority support (24h response)',
        'Rate limiting: 50 calls/minute',
        'Historical data access (12 months)',
        'Phone and email support',
        'Trust insurance partnership access',
        'Custom integration support'
      ],
      limitations: [
        'No white-label options',
        'Standard SLA (99.5% uptime)'
      ],
      idealFor: 'Regional banks, investment firms, trust companies',
      popular: true
    },
    {
      name: 'Enterprise',
      description: 'Built for national banks and large institutions',
      monthlyPrice: 8000,
      annualPrice: 80000,
      setupFee: 15000,
      apiCalls: 25000,
      overageRate: 1.00,
      features: [
        'Premium trust verification API',
        'Real-time webhook notifications',
        'Dedicated support (4h response)',
        'Rate limiting: 200 calls/minute',
        'Historical data access (unlimited)',
        'Dedicated account manager',
        'Custom integrations included',
        'Trust insurance bundling',
        'Advanced analytics dashboard',
        'Multi-environment support',
        'Premium SLA (99.9% uptime)'
      ],
      limitations: [],
      idealFor: 'National banks, major investment firms, insurance companies'
    },
    {
      name: 'Platform',
      description: 'Enterprise-grade for the largest institutions',
      monthlyPrice: 25000,
      annualPrice: 250000,
      setupFee: 50000,
      apiCalls: 100000,
      overageRate: 0.75,
      features: [
        'All Enterprise features',
        'White-label API options',
        'Custom rate limiting',
        'Dedicated infrastructure',
        'Premium SLA (99.95% uptime)',
        'Legal compliance consulting',
        'Trust insurance underwriting',
        'Custom reporting and analytics',
        'Multi-region deployment',
        '24/7 dedicated support team'
      ],
      limitations: [],
      idealFor: 'Top-tier banks, government agencies, enterprise software providers',
      enterprise: true
    }
  ];

  const institutionTypes = [
    { value: 'credit_union', label: 'Credit Union', avgCalls: 500 },
    { value: 'community_bank', label: 'Community Bank', avgCalls: 1000 },
    { value: 'regional_bank', label: 'Regional Bank', avgCalls: 5000 },
    { value: 'national_bank', label: 'National Bank', avgCalls: 25000 },
    { value: 'investment_firm', label: 'Investment Firm', avgCalls: 8000 },
    { value: 'insurance_company', label: 'Insurance Company', avgCalls: 3000 }
  ];

  const calculateROI = () => {
    const currentCosts = {
      manualProcessing: calculatorInputs.trustVolume * 25, // $25 per manual verification
      errorCosts: calculatorInputs.trustVolume * 0.05 * 2500, // 5% error rate, $2500 per error
      delayedTransactions: calculatorInputs.trustVolume * 0.1 * 500, // 10% delayed, $500 cost each
      legalFees: calculatorInputs.trustVolume * 0.02 * 5000 // 2% require legal intervention, $5000 each
    };

    const totalCurrentCosts = Object.values(currentCosts).reduce((sum, cost) => sum + cost, 0);

    // Calculate Trusto costs
    const selectedPlan = pricingPlans.find(plan => {
      if (calculatorInputs.monthlyApiCalls <= 1000) return plan.name === 'Community';
      if (calculatorInputs.monthlyApiCalls <= 5000) return plan.name === 'Regional';
      if (calculatorInputs.monthlyApiCalls <= 25000) return plan.name === 'Enterprise';
      return plan.name === 'Platform';
    });

    const overage = Math.max(0, calculatorInputs.monthlyApiCalls - selectedPlan.apiCalls);
    const trustoCosts = selectedPlan.monthlyPrice + (overage * selectedPlan.overageRate);

    const monthlySavings = totalCurrentCosts - trustoCosts;
    const roiPercentage = ((monthlySavings * 12) / (trustoCosts * 12)) * 100;

    return {
      currentCosts: totalCurrentCosts,
      trustoCosts,
      monthlySavings,
      annualSavings: monthlySavings * 12,
      roiPercentage,
      selectedPlan
    };
  };

  const roi = calculateROI();

  return (
    <>
      <Head>
        <title>Pricing - Trust Registry API</title>
        <meta name="description" content="Transparent pricing for Trust Registry API. Plans for credit unions, regional banks, and enterprise institutions." />
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
              <div className="flex items-center space-x-4">
                <Link href="/api-docs" className="text-gray-600 hover:text-gray-900">
                  API Docs
                </Link>
                <Link href="/legal-services" className="text-gray-600 hover:text-gray-900">
                  Legal Services
                </Link>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                  Get Started
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Header Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Simple, Transparent Pricing
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Choose the plan that fits your institution's size and API usage. 
              All plans include real-time trust verification and state compliance.
            </p>

            {/* Billing Toggle */}
            <div className="flex items-center justify-center mb-8">
              <span className="text-sm text-gray-600 mr-3">Monthly</span>
              <button
                onClick={() => setBillingPeriod(billingPeriod === 'monthly' ? 'annual' : 'monthly')}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  billingPeriod === 'annual' ? 'bg-blue-600' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    billingPeriod === 'annual' ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
              <span className="text-sm text-gray-600 ml-3">
                Annual 
                <span className="text-green-600 font-medium ml-1">(Save 17%)</span>
              </span>
            </div>
          </div>

          {/* Pricing Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-16">
            {pricingPlans.map((plan, index) => (
              <div
                key={index}
                className={`relative bg-white rounded-2xl border-2 p-8 ${
                  plan.popular 
                    ? 'border-blue-500 ring-4 ring-blue-500 ring-opacity-10' 
                    : plan.enterprise
                    ? 'border-purple-500 ring-4 ring-purple-500 ring-opacity-10'
                    : 'border-gray-200'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-medium">
                      Most Popular
                    </span>
                  </div>
                )}

                {plan.enterprise && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-purple-600 text-white px-4 py-2 rounded-full text-sm font-medium">
                      Enterprise
                    </span>
                  </div>
                )}

                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                  <p className="text-gray-600 text-sm mb-6">{plan.description}</p>
                  
                  <div className="mb-4">
                    <span className="text-4xl font-bold text-gray-900">
                      ${billingPeriod === 'monthly' 
                        ? plan.monthlyPrice.toLocaleString() 
                        : Math.round(plan.annualPrice / 12).toLocaleString()
                      }
                    </span>
                    <span className="text-gray-500 text-lg">/month</span>
                  </div>

                  <div className="text-sm text-gray-500 space-y-1">
                    <div>${plan.setupFee.toLocaleString()} setup fee</div>
                    <div>{plan.apiCalls.toLocaleString()} API calls included</div>
                    <div>${plan.overageRate} per additional call</div>
                  </div>
                </div>

                <div className="space-y-4 mb-8">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Features Included:</h4>
                    {plan.features.map((feature, i) => (
                      <div key={i} className="flex items-start text-sm mb-2">
                        <CheckCircleIcon className="h-4 w-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {plan.limitations.length > 0 && (
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Limitations:</h4>
                      {plan.limitations.map((limitation, i) => (
                        <div key={i} className="flex items-start text-sm mb-2">
                          <XMarkIcon className="h-4 w-4 text-gray-400 mr-2 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-500">{limitation}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 mb-2">Ideal For:</h4>
                  <p className="text-sm text-gray-600">{plan.idealFor}</p>
                </div>

                <button
                  className={`w-full py-3 px-4 rounded-lg font-semibold transition-colors ${
                    plan.popular || plan.enterprise
                      ? 'bg-blue-600 text-white hover:bg-blue-700'
                      : 'border-2 border-gray-300 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {plan.enterprise ? 'Contact Sales' : 'Get Started'}
                </button>
              </div>
            ))}
          </div>

          {/* ROI Calculator */}
          <div className="bg-white rounded-2xl border border-gray-200 p-8 mb-16">
            <div className="text-center mb-8">
              <CalculatorIcon className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-gray-900 mb-2">ROI Calculator</h2>
              <p className="text-lg text-gray-600">
                See how much you can save by switching to Trust Registry API
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Calculator Inputs */}
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-gray-900">Your Institution</h3>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Institution Type
                  </label>
                  <select
                    value={calculatorInputs.institutionType}
                    onChange={(e) => setCalculatorInputs({
                      ...calculatorInputs,
                      institutionType: e.target.value,
                      monthlyApiCalls: institutionTypes.find(t => t.value === e.target.value)?.avgCalls || 5000
                    })}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3"
                  >
                    {institutionTypes.map(type => (
                      <option key={type.value} value={type.value}>{type.label}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Monthly API Calls
                  </label>
                  <input
                    type="number"
                    value={calculatorInputs.monthlyApiCalls}
                    onChange={(e) => setCalculatorInputs({
                      ...calculatorInputs,
                      monthlyApiCalls: parseInt(e.target.value) || 0
                    })}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Monthly Trust Verifications
                  </label>
                  <input
                    type="number"
                    value={calculatorInputs.trustVolume}
                    onChange={(e) => setCalculatorInputs({
                      ...calculatorInputs,
                      trustVolume: parseInt(e.target.value) || 0
                    })}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Average Trust Value
                  </label>
                  <input
                    type="number"
                    value={calculatorInputs.averageTrustValue}
                    onChange={(e) => setCalculatorInputs({
                      ...calculatorInputs,
                      averageTrustValue: parseInt(e.target.value) || 0
                    })}
                    placeholder="1000000"
                    className="w-full border border-gray-300 rounded-lg px-4 py-3"
                  />
                </div>
              </div>

              {/* Results */}
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-6">Your Savings</h3>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-3 border-b border-blue-200">
                    <span className="text-gray-700">Current Monthly Costs:</span>
                    <span className="text-xl font-bold text-red-600">
                      ${roi.currentCosts.toLocaleString()}
                    </span>
                  </div>

                  <div className="flex justify-between items-center py-3 border-b border-blue-200">
                    <span className="text-gray-700">Trusto Monthly Cost:</span>
                    <span className="text-xl font-bold text-gray-900">
                      ${roi.trustoCosts.toLocaleString()}
                    </span>
                  </div>

                  <div className="flex justify-between items-center py-3 border-b border-blue-200">
                    <span className="text-gray-700">Monthly Savings:</span>
                    <span className="text-xl font-bold text-green-600">
                      ${roi.monthlySavings.toLocaleString()}
                    </span>
                  </div>

                  <div className="flex justify-between items-center py-3">
                    <span className="text-gray-700">Annual Savings:</span>
                    <span className="text-2xl font-bold text-green-600">
                      ${roi.annualSavings.toLocaleString()}
                    </span>
                  </div>

                  <div className="bg-green-100 rounded-lg p-4 text-center">
                    <div className="text-3xl font-bold text-green-800 mb-1">
                      {roi.roiPercentage.toFixed(0)}% ROI
                    </div>
                    <div className="text-sm text-green-700">
                      Recommended Plan: {roi.selectedPlan.name}
                    </div>
                  </div>
                </div>

                <button className="w-full mt-6 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 font-semibold">
                  Start Free Trial
                </button>
              </div>
            </div>
          </div>

          {/* Comparison Table */}
          <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden mb-16">
            <div className="px-8 py-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900">Feature Comparison</h2>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-4 px-6 font-semibold text-gray-900">Feature</th>
                    {pricingPlans.map(plan => (
                      <th key={plan.name} className="text-center py-4 px-4 font-semibold text-gray-900">
                        {plan.name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    { feature: 'API Calls/Month', values: ['1,000', '5,000', '25,000', '100,000'] },
                    { feature: 'Real-time Webhooks', values: ['❌', '✅', '✅', '✅'] },
                    { feature: 'Historical Data', values: ['❌', '12 months', 'Unlimited', 'Unlimited'] },
                    { feature: 'Support Response', values: ['48h', '24h', '4h', '1h'] },
                    { feature: 'Trust Insurance', values: ['❌', 'Partnership', 'Bundled', 'Underwriting'] },
                    { feature: 'Custom Integrations', values: ['❌', 'Basic', 'Included', 'White-label'] },
                    { feature: 'SLA Uptime', values: ['99%', '99.5%', '99.9%', '99.95%'] }
                  ].map((row, i) => (
                    <tr key={i} className="border-b border-gray-100">
                      <td className="py-4 px-6 font-medium text-gray-900">{row.feature}</td>
                      {row.values.map((value, j) => (
                        <td key={j} className="py-4 px-4 text-center text-gray-700">
                          {value}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="bg-white rounded-2xl border border-gray-200 p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
              Frequently Asked Questions
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                {
                  question: "What's included in the setup fee?",
                  answer: "Setup includes KYB verification, API credential generation, integration support, sandbox environment access, and initial training for your technical team."
                },
                {
                  question: "How do overage charges work?",
                  answer: "If you exceed your plan's included API calls, you're charged per additional call at the rates shown. We'll notify you when approaching limits."
                },
                {
                  question: "Can I change plans anytime?",
                  answer: "Yes, you can upgrade or downgrade your plan with 30 days notice. Downgrades take effect at your next billing cycle."
                },
                {
                  question: "Is there a free trial?",
                  answer: "Yes, we offer a 30-day free trial with access to our sandbox environment and limited production API calls to test integration."
                },
                {
                  question: "What about compliance and security?",
                  answer: "We're SOC 2 Type II certified, use bank-grade encryption, and maintain compliance with GLBA, FFIEC guidelines, and state privacy laws."
                },
                {
                  question: "Do you offer volume discounts?",
                  answer: "Yes, institutions with >100K monthly API calls qualify for custom enterprise pricing with significant volume discounts."
                }
              ].map((faq, i) => (
                <div key={i} className="space-y-2">
                  <h3 className="font-semibold text-gray-900">{faq.question}</h3>
                  <p className="text-gray-600 text-sm">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PricingPage;