// Server-side PDF text extraction API
// This avoids all browser compatibility issues with PDF.js

import formidable from 'formidable';
import fs from 'fs';
import path from 'path';

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

  // Original code disabled below
  /*
  if (req.method !== 'POST') {
    console.log('Method not allowed:', req.method);
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Parse the uploaded file
    const form = formidable({
      maxFileSize: 10 * 1024 * 1024, // 10MB limit
      keepExtensions: true,
    });

    const [fields, files] = await form.parse(req);
    const file = files.file?.[0];

    if (!file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    // Validate file type
    if (!file.originalFilename?.toLowerCase().endsWith('.pdf')) {
      return res.status(400).json({ error: 'Only PDF files are supported' });
    }

    console.log('Processing PDF:', file.originalFilename, 'Size:', file.size);

    let extractedText = '';

    try {
      // Method 1: Try pdf-parse library (lightweight)
      const pdfParse = (await import('pdf-parse')).default;
      const dataBuffer = fs.readFileSync(file.filepath);
      const data = await pdfParse(dataBuffer);
      extractedText = data.text;
      console.log('Successfully extracted text using pdf-parse');
    } catch (pdfParseError) {
      console.warn('pdf-parse failed, trying alternative method:', pdfParseError.message);
      
      try {
        // Method 2: Basic text extraction from PDF buffer as fallback
        const dataBuffer = fs.readFileSync(file.filepath);
        extractedText = extractTextFromBuffer(dataBuffer);
        console.log('Used basic buffer extraction');
      } catch (bufferError) {
        console.error('All extraction methods failed:', bufferError);
        throw new Error('Unable to extract text from this PDF. The file may be image-based, corrupted, or password-protected.');
      }
    }

    // Clean up uploaded file
    try {
      fs.unlinkSync(file.filepath);
    } catch (cleanupError) {
      console.warn('Failed to cleanup temp file:', cleanupError);
    }

    // Validate extracted text
    if (!extractedText || extractedText.trim().length < 10) {
      return res.status(400).json({ 
        error: 'No meaningful text could be extracted from this PDF. The file may contain only images or be scan-based. Please try uploading as DOCX or TXT format instead.' 
      });
    }

    console.log('Successfully extracted', extractedText.length, 'characters');

    return res.status(200).json({
      success: true,
      text: extractedText,
      filename: file.originalFilename,
      size: file.size,
      extractedLength: extractedText.length
    });

  } catch (error) {
    console.error('PDF extraction error:', error);
    
    // Provide specific error messages
    let errorMessage = 'Failed to process PDF file.';
    
    if (error.message.includes('password') || error.message.includes('encrypted')) {
      errorMessage = 'This PDF is password-protected. Please remove the password first.';
    } else if (error.message.includes('corrupt') || error.message.includes('invalid')) {
      errorMessage = 'This PDF file appears to be corrupted or invalid.';
    } else if (error.message.includes('image') || error.message.includes('scan')) {
      errorMessage = 'This PDF contains only images/scans. Please provide a text-based PDF or use DOCX/TXT format.';
    } else {
      errorMessage = `PDF processing failed: ${error.message}`;
    }

    return res.status(500).json({ 
      error: errorMessage,
      suggestion: 'Try uploading the document in DOCX or TXT format, or use manual entry.'
    });
  }
}

// Basic text extraction from PDF buffer as last resort
function extractTextFromBuffer(buffer) {
  try {
    // Convert buffer to string and look for readable text patterns
    const str = buffer.toString('binary');
    
    // Simple regex to find text objects in PDF
    const textRegex = /\(([^)]+)\)/g;
    const streamRegex = /stream\s*([\s\S]*?)\s*endstream/g;
    
    let extractedText = '';
    let match;
    
    // Extract text from parentheses (simple text objects)
    while ((match = textRegex.exec(str)) !== null) {
      const text = match[1];
      if (text && text.length > 1 && /[a-zA-Z]/.test(text)) {
        extractedText += text + ' ';
      }
    }
    
    // If that didn't work well, try to find stream content
    if (extractedText.length < 50) {
      while ((match = streamRegex.exec(str)) !== null) {
        const streamContent = match[1];
        // Look for readable text in streams
        const readableText = streamContent.match(/[a-zA-Z][a-zA-Z\s.,!?;:'"()-]{5,}/g);
        if (readableText) {
          extractedText += readableText.join(' ') + ' ';
        }
      }
    }
    
    return extractedText.trim();
  } catch (error) {
    console.error('Buffer extraction failed:', error);
    throw new Error('Unable to extract text from PDF buffer');
  }
}