// Institution Registration API - Banks and financial institutions register here
// This creates the network effect - more institutions = more valuable data

export default async function handler(req, res) {
  const { method } = req;

  if (method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ error: `Method ${method} not allowed` });
  }

  try {
    const {
      institution_name,
      institution_type,
      contact_email,
      technical_contact,
      webhook_url,
      use_cases,
      expected_volume,
      compliance_requirements
    } = req.body;

    // Validate required fields
    const requiredFields = ['institution_name', 'institution_type', 'contact_email'];
    const missingFields = requiredFields.filter(field => !req.body[field]);
    
    if (missingFields.length > 0) {
      return res.status(400).json({
        error: 'Missing required fields',
        missing_fields: missingFields
      });
    }

    // Generate API credentials
    const institutionId = `inst_${institution_name.toLowerCase().replace(/\s+/g, '_')}_${Date.now()}`;
    const apiKey = `${institution_type.toLowerCase()}_${institution_name.toLowerCase().replace(/\s+/g, '_')}_prod`;
    const webhookSecret = generateWebhookSecret();

    // Calculate pricing tier based on expected volume and institution type
    const pricingTier = calculatePricingTier(institution_type, expected_volume);

    // Create institution registration
    const registration = {
      institution_id: institutionId,
      institution_name: institution_name,
      institution_type: institution_type,
      status: 'pending_verification',
      contact_email: contact_email,
      technical_contact: technical_contact,
      webhook_url: webhook_url,
      use_cases: use_cases || [],
      expected_volume: expected_volume,
      compliance_requirements: compliance_requirements || [],
      pricing_tier: pricingTier,
      api_credentials: {
        api_key: apiKey,
        webhook_secret: webhookSecret,
        rate_limit: pricingTier.api_calls_per_month,
        permissions: determinepermissions(institution_type, use_cases)
      },
      created_at: new Date().toISOString(),
      verified_at: null,
      billing: {
        plan: pricingTier.plan_name,
        monthly_cost: pricingTier.monthly_cost,
        per_call_cost: pricingTier.per_call_cost,
        setup_fee: pricingTier.setup_fee
      }
    };

    // In production, this would:
    // 1. Save to database
    // 2. Trigger KYB (Know Your Business) verification process
    // 3. Send welcome email with API documentation
    // 4. Notify sales team for enterprise accounts
    // 5. Create Stripe customer for billing

    console.log('Institution Registration:', registration);

    // Send verification email (in production)
    await sendVerificationEmail(registration);

    return res.status(201).json({
      success: true,
      message: 'Institution registration received',
      data: {
        institution_id: institutionId,
        status: 'pending_verification',
        next_steps: [
          'Complete identity verification process',
          'Review and sign API Terms of Service',
          'Integrate webhook endpoint for real-time notifications',
          'Complete API testing with sandbox environment'
        ],
        estimated_approval_time: '2-5 business days',
        pricing: {
          plan: pricingTier.plan_name,
          monthly_cost: pricingTier.monthly_cost,
          setup_fee: pricingTier.setup_fee,
          included_api_calls: pricingTier.api_calls_per_month
        },
        sandbox_credentials: {
          api_key: `${apiKey}_sandbox`,
          base_url: 'https://api-sandbox.trusto.inc',
          documentation: 'https://docs.trusto.inc/api-reference'
        }
      }
    });

  } catch (error) {
    console.error('Institution Registration Error:', error);
    return res.status(500).json({
      error: 'Registration failed',
      message: 'An error occurred during institution registration'
    });
  }
}

function calculatePricingTier(institutionType, expectedVolume) {
  const pricingTiers = {
    // Community banks and credit unions
    community: {
      plan_name: 'Community',
      monthly_cost: 500,
      setup_fee: 1000,
      api_calls_per_month: 1000,
      per_call_cost: 2.00,
      features: ['basic_verification', 'email_notifications']
    },
    
    // Regional banks 
    regional: {
      plan_name: 'Regional',
      monthly_cost: 2000,
      setup_fee: 5000,
      api_calls_per_month: 5000,
      per_call_cost: 1.50,
      features: ['basic_verification', 'real_time_webhooks', 'priority_support']
    },
    
    // National banks and major investment firms
    enterprise: {
      plan_name: 'Enterprise',
      monthly_cost: 8000,
      setup_fee: 15000,
      api_calls_per_month: 25000,
      per_call_cost: 1.00,
      features: ['advanced_verification', 'real_time_webhooks', 'dedicated_support', 'custom_integrations']
    },

    // Largest financial institutions
    platform: {
      plan_name: 'Platform',
      monthly_cost: 25000,
      setup_fee: 50000,
      api_calls_per_month: 100000,
      per_call_cost: 0.75,
      features: ['premium_verification', 'real_time_webhooks', 'white_label_options', 'dedicated_account_manager']
    }
  };

  // Determine tier based on institution type and volume
  if (institutionType === 'credit_union' || expectedVolume < 1000) {
    return pricingTiers.community;
  } else if (institutionType === 'regional_bank' || expectedVolume < 5000) {
    return pricingTiers.regional;
  } else if (expectedVolume < 25000) {
    return pricingTiers.enterprise;
  } else {
    return pricingTiers.platform;
  }
}

function determinepermissions(institutionType, useCases) {
  const basePermissions = ['read_trust_status'];
  
  const additionalPermissions = {
    'commercial_bank': ['request_updates', 'receive_webhooks', 'historical_data'],
    'investment_firm': ['read_beneficiaries', 'receive_webhooks'],
    'insurance_company': ['read_beneficiaries', 'historical_data'],
    'title_company': ['request_updates', 'receive_webhooks'],
    'credit_union': ['request_updates']
  };

  return [
    ...basePermissions,
    ...(additionalPermissions[institutionType] || [])
  ];
}

function generateWebhookSecret() {
  // Generate secure webhook secret for signature verification
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let secret = 'whsec_';
  for (let i = 0; i < 32; i++) {
    secret += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return secret;
}

async function sendVerificationEmail(registration) {
  // In production, this would send a professional verification email
  const emailContent = {
    to: registration.contact_email,
    subject: 'Trust Registry API - Verify Your Institution',
    template: 'institution_verification',
    data: {
      institution_name: registration.institution_name,
      institution_id: registration.institution_id,
      verification_link: `https://portal.trusto.inc/verify/${registration.institution_id}`,
      api_documentation: 'https://docs.trusto.inc',
      support_email: 'institutions@trusto.inc'
    }
  };

  console.log('Verification email would be sent:', emailContent);
  
  // Example with SendGrid or similar service:
  // await sendGrid.send(emailContent);
}