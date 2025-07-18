# API Integration Guide

This guide covers implementing the backend APIs for DocuSign and Notarize.com integrations.

## Overview

The frontend signature components are already built and ready to integrate with backend APIs. The components prepare the necessary data and expect specific response formats.

## DocuSign Integration

### Setup Requirements

1. **DocuSign Developer Account**: Register at [DocuSign Developer Center](https://developers.docusign.com/)
2. **Integration Key**: Obtain from DocuSign Admin panel
3. **Secret Key**: For JWT authentication
4. **Redirect URI**: For OAuth flow
5. **RSA Key Pair**: For JWT authentication

### Backend API Endpoint: `/api/docusign/create-envelope`

**Request Format:**
```json
{
  "emailSubject": "Certification of Trust - John Doe Trust",
  "documents": [{
    "documentBase64": "base64_encoded_pdf_content",
    "name": "Certification_of_Trust_John_Doe.pdf",
    "fileExtension": "pdf",
    "documentId": "1"
  }],
  "recipients": {
    "signers": [{
      "email": "trustee@example.com",
      "name": "John Doe",
      "recipientId": "1",
      "tabs": {
        "signHereTabs": [{
          "documentId": "1",
          "pageNumber": "1",
          "xPosition": "100",
          "yPosition": "200"
        }],
        "dateSignedTabs": [{
          "documentId": "1",
          "pageNumber": "1",
          "xPosition": "300",
          "yPosition": "200"
        }]
      }
    }]
  },
  "status": "sent"
}
```

**Response Format:**
```json
{
  "envelopeId": "envelope-uuid-12345",
  "signingUrl": "https://app.docusign.com/signing/envelope-uuid-12345",
  "status": "sent"
}
```

**Sample Implementation (Node.js/Express):**
```javascript
const docusign = require('docusign-esign');

app.post('/api/docusign/create-envelope', async (req, res) => {
  try {
    const apiClient = new docusign.ApiClient();
    apiClient.setBasePath('https://demo.docusign.net/restapi'); // Use production URL for live
    
    // Set authentication (JWT token)
    apiClient.addDefaultHeader('Authorization', `Bearer ${await getAccessToken()}`);
    
    const envelopesApi = new docusign.EnvelopesApi(apiClient);
    const envelopeDefinition = new docusign.EnvelopeDefinition();
    
    // Map request data to DocuSign format
    envelopeDefinition.emailSubject = req.body.emailSubject;
    envelopeDefinition.documents = req.body.documents;
    envelopeDefinition.recipients = req.body.recipients;
    envelopeDefinition.status = req.body.status;
    
    const result = await envelopesApi.createEnvelope(ACCOUNT_ID, {
      envelopeDefinition: envelopeDefinition
    });
    
    // Get signing URL
    const signingUrl = await envelopesApi.createRecipientView(ACCOUNT_ID, result.envelopeId, {
      recipientViewRequest: {
        authenticationMethod: 'email',
        email: req.body.recipients.signers[0].email,
        userName: req.body.recipients.signers[0].name,
        returnUrl: 'https://trusto.inc/signature-complete'
      }
    });
    
    res.json({
      envelopeId: result.envelopeId,
      signingUrl: signingUrl.url,
      status: result.status
    });
    
  } catch (error) {
    console.error('DocuSign error:', error);
    res.status(500).json({ error: 'Failed to create envelope' });
  }
});
```

## Notarize.com Integration

### Setup Requirements

1. **Notarize Business Account**: Contact Notarize.com for API access
2. **API Key**: Provided by Notarize.com
3. **Webhook URL**: For session status updates

### Backend API Endpoint: `/api/notarize/create-session`

**Request Format:**
```json
{
  "documentName": "Certification of Trust - John Doe Trust",
  "documentType": "certification_of_trust",
  "signerInfo": {
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "phoneNumber": "555-123-4567"
  },
  "document": {
    "name": "Certification_of_Trust_John_Doe.pdf",
    "content": "base64_encoded_pdf_content",
    "mimeType": "application/pdf"
  },
  "notarizationType": "acknowledgment",
  "jurisdiction": "CALIFORNIA"
}
```

**Response Format:**
```json
{
  "sessionId": "notary-session-uuid-12345",
  "sessionUrl": "https://app.notarize.com/session/uuid-12345",
  "status": "created",
  "estimatedWaitTime": "5-10 minutes"
}
```

**Sample Implementation (Node.js/Express):**
```javascript
const axios = require('axios');

app.post('/api/notarize/create-session', async (req, res) => {
  try {
    const notarizeResponse = await axios.post('https://api.notarize.com/v1/sessions', {
      document: {
        name: req.body.document.name,
        content: req.body.document.content,
        mimeType: req.body.document.mimeType
      },
      signer: req.body.signerInfo,
      notarizationType: req.body.notarizationType,
      jurisdiction: req.body.jurisdiction,
      webhookUrl: 'https://trusto.inc/api/notarize/webhook'
    }, {
      headers: {
        'Authorization': `Bearer ${NOTARIZE_API_KEY}`,
        'Content-Type': 'application/json'
      }
    });
    
    res.json({
      sessionId: notarizeResponse.data.sessionId,
      sessionUrl: notarizeResponse.data.sessionUrl,
      status: notarizeResponse.data.status,
      estimatedWaitTime: notarizeResponse.data.estimatedWaitTime
    });
    
  } catch (error) {
    console.error('Notarize error:', error);
    res.status(500).json({ error: 'Failed to create notarization session' });
  }
});
```

## Environment Variables

Add these to your `.env` file:

```env
# DocuSign Configuration
DOCUSIGN_INTEGRATION_KEY=your_integration_key
DOCUSIGN_SECRET_KEY=your_secret_key
DOCUSIGN_ACCOUNT_ID=your_account_id
DOCUSIGN_USER_ID=your_user_id
DOCUSIGN_BASE_URL=https://demo.docusign.net/restapi
DOCUSIGN_PRIVATE_KEY_PATH=path/to/private.key

# Notarize Configuration
NOTARIZE_API_KEY=your_notarize_api_key
NOTARIZE_BASE_URL=https://api.notarize.com/v1
NOTARIZE_WEBHOOK_SECRET=your_webhook_secret
```

## Webhook Handlers

### DocuSign Status Webhook

```javascript
app.post('/api/docusign/webhook', (req, res) => {
  const event = req.body;
  
  if (event.event === 'envelope-completed') {
    // Handle completed signature
    console.log('Envelope completed:', event.data.envelopeId);
    // Update database, send notifications, etc.
  }
  
  res.status(200).send('OK');
});
```

### Notarize Status Webhook

```javascript
app.post('/api/notarize/webhook', (req, res) => {
  const event = req.body;
  
  if (event.type === 'session.completed') {
    // Handle completed notarization
    console.log('Notarization completed:', event.data.sessionId);
    // Update database, send notifications, etc.
  }
  
  res.status(200).send('OK');
});
```

## Testing

### DocuSign Sandbox
- Use demo.docusign.net for testing
- Create test accounts in DocuSign Admin panel
- Use JWT authentication for server-to-server integration

### Notarize Testing
- Contact Notarize.com for sandbox access
- They provide test credentials and mock notary sessions

## Security Considerations

1. **Never expose API keys in frontend code**
2. **Use HTTPS for all API endpoints**
3. **Validate webhook signatures**
4. **Store sensitive documents securely**
5. **Implement proper user authentication**
6. **Log all API interactions for audit purposes**

## Error Handling

Implement comprehensive error handling for:
- Network timeouts
- API rate limits
- Invalid document formats
- Authentication failures
- Webhook validation failures

## Next Steps

1. Set up DocuSign developer account
2. Implement backend API endpoints
3. Test with sandbox environments
4. Configure production credentials
5. Set up monitoring and logging
6. Implement webhook handlers for status updates