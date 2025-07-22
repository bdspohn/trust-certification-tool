# SECURITY NOTICE - DOCUMENT UPLOAD DISABLED

## Effective Immediately

For security and legal compliance reasons, all document upload functionality has been temporarily disabled across the Trusto platform.

### What's Disabled:
- AI Document Processing (file uploads)
- PDF extraction API endpoint (/api/extract-pdf)
- All file upload mechanisms via drag-and-drop or file selection
- Direct API calls to upload endpoints

### Why This Change:
- **Legal Compliance**: Preventing upload of sensitive trust documents to development environment
- **Security Enhancement**: Implementing additional security measures for handling confidential documents
- **Data Protection**: Ensuring proper encryption and access controls before handling trust documents

### Available Alternatives:
1. **Manual Entry Tool** (/tool) - Enter trust information manually without uploading documents
2. **Demo Request** (/ai-tool) - Request access to secure enterprise solutions
3. **Contact Support** (/contact) - Get assistance with trust certifications

### Technical Implementation:
- API middleware blocks all upload endpoints (returns 503 status)
- Frontend components display security notices
- Upload areas are visually disabled with clear messaging
- Demo request forms added as alternative

### For Developers:
- All upload functionality is commented out but preserved in code
- Security incidents are logged when upload attempts are made
- Middleware actively blocks file upload endpoints

### Timeline:
This is a temporary measure while we implement:
- Enhanced encryption for documents at rest and in transit
- Secure document processing environment
- Compliance with financial data regulations
- Audit trail for all document access

For questions or enterprise solutions with secure document handling, please contact our team.