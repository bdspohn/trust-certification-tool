// Server-side PDF text extraction API
// This avoids all browser compatibility issues with PDF.js

// Disable default body parsing to handle file uploads
export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  console.log('PDF extraction API called:', req.method);
  
  // SECURITY: Disable all document uploads for legal compliance
  return res.status(503).json({ 
    error: 'Service Temporarily Unavailable',
    message: 'Document upload functionality is currently disabled for security and legal compliance. Please use the manual entry tool or contact us for enterprise solutions.',
    alternatives: [
      { name: 'Manual Entry Tool', url: '/tool' },
      { name: 'Request Demo', url: '/ai-tool' },
      { name: 'Contact Us', url: '/contact' }
    ]
  });
}