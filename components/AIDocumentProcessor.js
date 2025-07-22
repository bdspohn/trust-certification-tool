import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import mammoth from 'mammoth';
import { trackEvents } from '../lib/analytics';

const AIDocumentProcessor = ({ onDataExtracted }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [extractedData, setExtractedData] = useState(null);
  const [error, setError] = useState(null);
  const [processingStep, setProcessingStep] = useState('');
  const [showDemoForm, setShowDemoForm] = useState(false);
  const [demoFormData, setDemoFormData] = useState({
    name: '',
    email: '',
    company: ''
  });
  const [demoSubmitted, setDemoSubmitted] = useState(false);

  const onDrop = useCallback(async (acceptedFiles) => {
    // SECURITY: Prevent all document uploads
    setError('Document upload is currently disabled for security and legal compliance reasons. Please use the manual entry option or request a demo.');
    return;
    
    // Original code disabled below
    /*
    const startTime = Date.now();
    setIsProcessing(true);
    setError(null);
    setProcessingStep('Reading document...');
    try {
      const file = acceptedFiles[0];
      if (!file) {
        throw new Error('No file selected');
      }
      
      console.log('Processing file:', file.name, 'Type:', file.type); // DEBUG LOG
      
      // Track document upload
      trackEvents.documentUploaded(file.type || 'unknown', file.size);
      
      let text = '';
      
      // Handle PDF files
      if (file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf')) {
        try {
          text = await extractTextFromPDF(file);
          console.log('Extracted text from PDF:', text.substring(0, 500) + '...'); // DEBUG LOG
        } catch (pdfError) {
          console.error('PDF extraction error:', pdfError);
          // Pass through the specific error message from server-side processing
          throw new Error(pdfError.message);
        }
      } 
      // Handle DOCX files
      else if (
        file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
        file.name.toLowerCase().endsWith('.docx')
      ) {
        try {
          text = await extractTextFromDOCX(file);
          console.log('Extracted text from DOCX:', text.substring(0, 500) + '...'); // DEBUG LOG
        } catch (docxError) {
          console.error('DOCX extraction error:', docxError);
          throw new Error(`Failed to read DOCX: ${docxError.message}. Please ensure the file is a valid Word document.`);
        }
      } 
      // Handle DOC files (legacy Word)
      else if (
        file.type === 'application/msword' ||
        file.name.toLowerCase().endsWith('.doc')
      ) {
        // For legacy .doc files, we'll show a more helpful error
        throw new Error('Legacy .doc files are not fully supported. Please save your document as .docx, .pdf, or .txt format.');
      }
      // Handle text files
      else if (file.type === 'text/plain' || file.name.toLowerCase().endsWith('.txt')) {
        try {
          text = await file.text();
          console.log('Extracted text from TXT:', text.substring(0, 500) + '...'); // DEBUG LOG
        } catch (txtError) {
          console.error('TXT extraction error:', txtError);
          throw new Error(`Failed to read text file: ${txtError.message}`);
        }
      } 
      // Unsupported file type
      else {
        throw new Error(`Unsupported file type: ${file.type || 'unknown'}. Please upload a PDF, DOCX, or TXT file.`);
      }
      
      // Check if we got any text
      if (!text || text.trim().length === 0) {
        throw new Error('No text content found in the document. The file may be empty or contain only images.');
      }
      
      setProcessingStep('Analyzing document content...');
      const analysis = await analyzeTrustDocument(text);
      console.log('AI analysis confidence:', analysis.confidence);
      console.log('Field confidences:', analysis.fieldConfidences);
      
      setProcessingStep('Extracting structured information...');
      const structuredData = await extractStructuredData(analysis);
      console.log('Structured data for autofill:', {
        ...structuredData,
        extractedText: '(truncated for logging)'
      });
      
      // Check if we extracted anything useful
      const hasUsefulData = structuredData.trustName || 
                          structuredData.grantor || 
                          (structuredData.trustee && structuredData.trustee.length > 0);
      
      console.log('hasUsefulData check:', {
        trustName: structuredData.trustName,
        grantor: structuredData.grantor,
        trustee: structuredData.trustee,
        hasUsefulData
      });
      
      if (!hasUsefulData) {
        setError('Could not extract trust information from this document. Please ensure it contains trust-related content or enter information manually.');
        setExtractedData(null);
        
        // Track extraction failure
        trackEvents.extractionFailed('no_useful_data');
      } else {
        setExtractedData(structuredData);
        
        // Calculate accuracy based on how many fields were extracted
        const totalFields = ['trustName', 'trustDate', 'grantor', 'trustee', 'state', 'revocability'];
        const extractedFields = totalFields.filter(field => structuredData[field] && structuredData[field] !== '');
        const accuracy = Math.round((extractedFields.length / totalFields.length) * 100);
        
        // Track successful extraction
        trackEvents.extractionCompleted(accuracy, Date.now() - startTime);
        
        onDataExtracted(structuredData);
      }
    } catch (err) {
      setError(err.message || 'Failed to process document. Please try again or enter information manually.');
      console.error('AI processing error:', err);
      
      // Track extraction failure with error type
      const errorType = err.message.includes('PDF') ? 'pdf_error' :
                       err.message.includes('DOCX') ? 'docx_error' :
                       err.message.includes('network') ? 'network_error' :
                       'processing_error';
      trackEvents.extractionFailed(errorType);
    } finally {
      setIsProcessing(false);
      setProcessingStep('');
    }
    */
  }, [onDataExtracted]);

  const handleDemoSubmit = (e) => {
    e.preventDefault();
    const requests = JSON.parse(localStorage.getItem('demoRequests') || '[]');
    requests.push({
      ...demoFormData,
      timestamp: new Date().toISOString(),
      source: 'ai-document-processor'
    });
    localStorage.setItem('demoRequests', JSON.stringify(requests));
    setDemoSubmitted(true);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
      'text/plain': ['.txt']
    },
    multiple: false
  });

  // Server-side PDF extraction for maximum reliability
  const extractTextFromPDF = async (file) => {
    try {
      console.log('Starting server-side PDF extraction...');
      console.log('File details:', {
        name: file.name,
        type: file.type,
        size: file.size
      });
      
      // Create FormData to send file to server
      const formData = new FormData();
      formData.append('file', file);
      
      console.log('Sending request to /api/extract-pdf...');
      
      // Send to server-side PDF processing API
      const response = await fetch('/api/extract-pdf', {
        method: 'POST',
        body: formData,
      });
      
      console.log('Response status:', response.status);
      console.log('Response headers:', Object.fromEntries(response.headers.entries()));
      
      const result = await response.json();
      console.log('API response:', result);
      
      if (!response.ok) {
        console.error('API error response:', result);
        throw new Error(result.error || 'Server-side PDF processing failed');
      }
      
      if (!result.success || !result.text) {
        console.error('No text extracted:', result);
        throw new Error('No text could be extracted from the PDF');
      }
      
      console.log(`Successfully extracted ${result.extractedLength} characters from PDF`);
      return result.text;
      
    } catch (error) {
      console.error('Server-side PDF processing error:', error);
      
      // Provide helpful error messages based on error type
      if (error.message.includes('password') || error.message.includes('encrypted')) {
        throw new Error('This PDF is password-protected. Please remove the password protection first.');
      } else if (error.message.includes('corrupted') || error.message.includes('invalid')) {
        throw new Error('This PDF file appears to be corrupted. Please try a different file.');
      } else if (error.message.includes('image') || error.message.includes('scan')) {
        throw new Error('This PDF contains only images/scans. Please provide a text-based PDF or use DOCX/TXT format.');
      } else if (error.message.includes('network') || error.message.includes('fetch')) {
        throw new Error('Network error during PDF processing. Please check your connection and try again.');
      } else {
        throw new Error(`PDF processing failed: ${error.message}. Please try DOCX or TXT format instead.`);
      }
    }
  };

  // DOCX extraction
  const extractTextFromDOCX = async (file) => {
    const arrayBuffer = await file.arrayBuffer();
    const { value } = await mammoth.extractRawText({ arrayBuffer });
    return value;
  };

  // Enhanced AI-powered parser with multiple extraction strategies
  const analyzeTrustDocument = async (text) => {
    // Preprocess text: normalize whitespace and clean up
    const cleanText = text
      .replace(/\s+/g, ' ')
      .replace(/[\r\n]+/g, '\n')
      .replace(/[""]/g, '"')
      .replace(/['']/g, "'");
    
    // Initialize extraction results with confidence scores
    const results = {
      trustName: { value: '', confidence: 0, matches: [] },
      grantors: { value: [], confidence: 0, matches: [] },
      trustees: { value: [], confidence: 0, matches: [] },
      successorTrustees: { value: [], confidence: 0, matches: [] },
      date: { value: '', confidence: 0, matches: [] },
      state: { value: '', confidence: 0, matches: [] },
      revocability: { value: '', confidence: 0, matches: [] },
      powers: { value: [], confidence: 0, matches: [] }
    };

    // Extract Trust Name with enhanced patterns
    const trustNamePatterns = [
      // "The John Doe Family Trust dated January 1, 2020"
      /(?:the\s+)?([A-Z][A-Za-z\s&,.'()-]+(?:Revocable|Irrevocable|Living|Family|Charitable|Testamentary)?\s*Trust)(?:\s+(?:dated|executed|established|created)\s+[^\n.;]+)?\b/gi,
      // "This trust shall be known as the 'Smith Family Trust'"
      /trust\s+(?:shall\s+be\s+)?(?:known|entitled|named|called)\s+(?:as\s+)?[:\s]*["']?([^"'\n]+?)["']?(?:\s*[,;.]|$)/gi,
      // "Name of trust: The Johnson Revocable Trust"
      /(?:name|title)\s*(?:of\s+(?:the\s+)?trust)?[:\s]*["']?([^"'\n]+?)(?:["']?\s*[,;.]|$)/gi,
      // "I, John Doe, hereby create the Doe Family Trust"
      /(?:hereby\s+(?:create|establish)s?\s+(?:the\s+)?|established\s+(?:the\s+)?)["']?([^"'\n]+?(?:Trust|TRUST))["']?/gi,
      // Trust name at start of line (common in headers)
      /^([A-Z][A-Za-z\s&,.'()-]+?(?:Trust|TRUST))(?:\s*$|\s+(?:dated|executed|established|created))/gm,
      // "THE SMITH FAMILY TRUST" (all caps)
      /^([A-Z][A-Z\s&,.'()-]+?TRUST)\s*$/gm
    ];
    
    for (const pattern of trustNamePatterns) {
      let match;
      while ((match = pattern.exec(cleanText)) !== null) {
        if (match[1] && match[1].length > 5 && match[1].length < 100) {
          results.trustName.matches.push(match[1].trim());
        }
      }
    }
    
    // Helper function to validate if a string looks like a proper name
    const isValidName = (name) => {
      // Clean up the name
      name = name.trim();
      
      // Reject if too short or too long
      if (name.length < 3 || name.length > 50) return false;
      
      // Reject if it contains certain keywords that indicate it's not a name
      const invalidKeywords = [
        'trust', 'instrument', 'vacant', 'become', 'terms', 'each', 
        'under', 'created', 'exoneration', 'removed', 'able', 'will not',
        'shall', 'may', 'must', 'hereby', 'whereas', 'therefore', 'between',
        'agreement', 'document', 'provisions', 'article', 'section', 'replace',
        'independent', 'special', 'benefit', 'expenses', 'taxes', 'tangible',
        'personal', 'property', 'income', 'principal', 'distribution', 'guidelines',
        'authority', 'powers', 'any', 'our', 'their', 'this', 'that', 'these',
        'those', 'which', 'what', 'when', 'where', 'how', 'why', 'who', 'whom'
      ];
      const lowerName = name.toLowerCase();
      if (invalidKeywords.some(keyword => lowerName.includes(keyword))) return false;
      
      // Reject phrases that look like document structure (e.g., "Article Three", "Section Two")
      if (/^(article|section|chapter|part|clause)\s+(one|two|three|four|five|six|seven|eight|nine|ten|\d+)/i.test(name)) return false;
      
      // Reject ordinal numbers like "First", "Second", "Third" when standalone
      if (/^(first|second|third|fourth|fifth|sixth|seventh|eighth|ninth|tenth)$/i.test(name)) return false;
      
      // Check if it looks like a proper name pattern (First Last or First M. Last)
      // Require at least a first and last name for trustees
      const namePattern = /^[A-Z][a-z]+(\s+[A-Z]\.)?(\s+[A-Z][a-z]+)+$/;
      if (!namePattern.test(name)) return false;
      
      // Ensure it has at least two parts (first and last name)
      const parts = name.split(/\s+/);
      if (parts.length < 2) return false;
      
      // Reject if any part is a common non-name word
      const nonNameWords = ['and', 'or', 'the', 'of', 'in', 'on', 'at', 'by', 'for', 'with', 'as'];
      if (parts.some(part => nonNameWords.includes(part.toLowerCase()))) return false;
      
      return true;
    };

    // Extract Grantors/Settlors with multiple patterns
    const grantorPatterns = [
      /(?:grantor|settlor|trustor|donor)s?\s*(?:are?|is)?\s*[:\s]*([A-Z][A-Za-z]+(?:\s+[A-Z]\.\s*)?(?:\s+[A-Z][A-Za-z]+){1,3})(?:\s*(?:and|,)\s*[A-Z][A-Za-z]+(?:\s+[A-Z]\.\s*)?(?:\s+[A-Z][A-Za-z]+){1,3})*?(?=\s*(?:trustee|successor|herein|$|\n|,))/gi,
      /(?:by\s+)?([A-Z][A-Za-z]+(?:\s+[A-Z]\.\s*)?(?:\s+[A-Z][A-Za-z]+){1,3}),?\s+(?:as\s+)?(?:grantor|settlor|trustor)/gi,
      /(?:I|We),?\s+([A-Z][A-Za-z]+(?:\s+[A-Z]\.\s*)?(?:\s+[A-Z][A-Za-z]+){1,3}),?\s+(?:hereby\s+)?(?:create|establish|declare)/gi,
      /THIS\s+TRUST\s+AGREEMENT.*?by\s+and\s+between\s+([A-Z][A-Za-z]+(?:\s+[A-Z]\.\s*)?(?:\s+[A-Z][A-Za-z]+){1,3})(?:\s*\(.*?\))?,?\s+as\s+(?:Grantor|Settlor)/gi
    ];
    
    for (const pattern of grantorPatterns) {
      let match;
      while ((match = pattern.exec(cleanText)) !== null) {
        if (match[1]) {
          const names = match[1].split(/\s+and\s+|\s*,\s*/)
            .map(n => n.trim())
            .filter(n => isValidName(n));
          results.grantors.matches.push(...names);
        }
      }
    }
    
    // Extract Trustees with enhanced patterns
    const trusteePatterns = [
      // "The trustee is John Doe" / "Trustees are John Doe and Jane Smith"
      /(?:the\s+)?(?:initial\s+)?trustee(?:s)?\s*(?:are?|is|shall\s+be)\s*[:\s]*([A-Z][A-Za-z]+(?:\s+[A-Z]\.)?(?:\s+[A-Z][a-z]+){1,4})(?:\s*(?:and|,|&)\s*(?:and\s+)?([A-Z][A-Za-z]+(?:\s+[A-Z]\.)?(?:\s+[A-Z][a-z]+){1,4}))*?(?=\s*(?:[.,;]|successor|shall|hereby|$|\n))/gi,
      // "John Doe, as Trustee" / "John Doe as the initial trustee"
      /([A-Z][A-Za-z]+(?:\s+[A-Z]\.)?(?:\s+[A-Z][a-z]+){1,4}),?\s+as\s+(?:the\s+)?(?:initial\s+)?(?:sole\s+)?trustee/gi,
      // "I appoint John Doe as trustee"
      /(?:I\s+)?(?:hereby\s+)?appoint\s+([A-Z][A-Za-z]+(?:\s+[A-Z]\.)?(?:\s+[A-Z][a-z]+){1,4})(?:\s+and\s+([A-Z][A-Za-z]+(?:\s+[A-Z]\.)?(?:\s+[A-Z][a-z]+){1,4}))?\s+as\s+(?:the\s+)?(?:initial\s+)?trustee/gi,
      // "Trustee: John Doe"
      /trustee[:\s]+([A-Z][A-Za-z]+(?:\s+[A-Z]\.)?(?:\s+[A-Z][a-z]+){1,4})/gi,
      // "John Doe shall serve as trustee"
      /([A-Z][A-Za-z]+(?:\s+[A-Z]\.)?(?:\s+[A-Z][a-z]+){1,4})\s+shall\s+(?:serve|act)\s+as\s+(?:the\s+)?(?:initial\s+)?trustee/gi
    ];
    for (const pattern of trusteePatterns) {
      let match;
      while ((match = pattern.exec(cleanText)) !== null) {
        if (match[1] && !match[1].toLowerCase().includes('successor')) {
          const names = match[1].split(/\s+and\s+|\s*,\s*/)
            .map(n => n.trim())
            .filter(n => isValidName(n));
          results.trustees.matches.push(...names);
        }
      }
    }
    
    // Extract Successor Trustees
    const successorPatterns = [
      /successor\s+trustee(?:s)?\s*(?:are?|is|shall\s+be)?\s*[:\s]*([A-Z][A-Za-z]+(?:\s+[A-Z]\.\s*)?(?:\s+[A-Z][A-Za-z]+){1,3})(?:\s*(?:and|,)\s*[A-Z][A-Za-z]+(?:\s+[A-Z]\.\s*)?(?:\s+[A-Z][A-Za-z]+){1,3})*?(?=\s*(?:shall|$|\n|,))/gi,
      /([A-Z][A-Za-z]+(?:\s+[A-Z]\.\s*)?(?:\s+[A-Z][A-Za-z]+){1,3}),?\s+(?:as\s+)?(?:the\s+)?successor\s+trustee/gi,
      /appoint\s+([A-Z][A-Za-z]+(?:\s+[A-Z]\.\s*)?(?:\s+[A-Z][A-Za-z]+){1,3})(?:\s+and\s+[A-Z][A-Za-z]+(?:\s+[A-Z]\.\s*)?(?:\s+[A-Z][A-Za-z]+){1,3})?\s+as\s+(?:the\s+)?successor\s+trustee/gi,
      /(?:Upon.*?death.*?)?([A-Z][A-Za-z]+(?:\s+[A-Z]\.\s*)?(?:\s+[A-Z][A-Za-z]+){1,3})\s+shall\s+(?:serve|act)\s+as\s+successor\s+trustee/gi
    ];
    
    for (const pattern of successorPatterns) {
      let match;
      while ((match = pattern.exec(cleanText)) !== null) {
        if (match[1]) {
          const names = match[1].split(/\s+and\s+|\s*,\s*/)
            .map(n => n.trim())
            .filter(n => isValidName(n));
          results.successorTrustees.matches.push(...names);
        }
      }
    }
    
    // Extract Date with enhanced patterns
    const datePatterns = [
      // "executed this 15th day of March, 2020"
      /(?:executed|made|entered|dated|effective|created|established)\s+(?:this\s+)?(\d{1,2}(?:st|nd|rd|th)?\s+day\s+of\s+(?:January|February|March|April|May|June|July|August|September|October|November|December),?\s+\d{4})/gi,
      // "dated March 15, 2020" or "executed as of January 1, 2021"
      /(?:executed|made|entered|dated|effective|created|established)\s+(?:as\s+of\s+)?(?:on\s+)?((?:January|February|March|April|May|June|July|August|September|October|November|December)\s+\d{1,2},?\s+\d{4})/gi,
      // "Date: 03/15/2020" or "Dated: 3-15-20"
      /(?:date|dated)[:\s]+(\d{1,2}[-/]\d{1,2}[-/]\d{2,4})/gi,
      // "Trust dated January 1, 2020" (in trust name)
      /trust\s+dated\s+((?:January|February|March|April|May|June|July|August|September|October|November|December)\s+\d{1,2},?\s+\d{4})/gi,
      // "as of March 15, 2020" (standalone)
      /\bas\s+of\s+((?:January|February|March|April|May|June|July|August|September|October|November|December)\s+\d{1,2},?\s+\d{4})/gi,
      // "this 15th day of March, 2020" (standalone)
      /\bthis\s+(\d{1,2}(?:st|nd|rd|th)?\s+day\s+of\s+(?:January|February|March|April|May|June|July|August|September|October|November|December),?\s+\d{4})/gi,
      // ISO format and variations
      /\b(\d{4}[-/]\d{1,2}[-/]\d{1,2})\b/gi,
      // MM/DD/YYYY format (be more selective)
      /\b(\d{1,2}[-/]\d{1,2}[-/]\d{4})\b/gi
    ];
    
    for (const pattern of datePatterns) {
      let match;
      while ((match = pattern.exec(cleanText)) !== null) {
        if (match[1]) {
          results.date.matches.push(match[1].trim());
        }
      }
    }
    
    // Extract State/Governing Law
    const statePatterns = [
      /(?:governed\s+by|laws?\s+of)(?:\s+the\s+state\s+of)?\s+([A-Za-z\s]+?)(?:\s+(?:shall|and|,|$))/gi,
      /state\s+of\s+([A-Za-z]+?)(?:\s+(?:law|shall|and|,|$))/gi,
      /([A-Za-z]+?)\s+law\s+(?:shall\s+)?(?:govern|apply)/gi,
      /jurisdiction.*?([A-Za-z]+?)(?:\s+(?:shall|and|,|$))/gi
    ];
    
    const stateAbbreviations = {
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
    
    for (const pattern of statePatterns) {
      let match;
      while ((match = pattern.exec(cleanText)) !== null) {
        if (match[1]) {
          const state = match[1].trim().toUpperCase();
          if (stateAbbreviations[state]) {
            results.state.matches.push(stateAbbreviations[state]);
          } else if (Object.values(stateAbbreviations).includes(state)) {
            results.state.matches.push(state);
          }
        }
      }
    }
    
    // Extract Revocability
    if (/\b(?:irrevocable|non-revocable)\b/i.test(cleanText)) {
      results.revocability.value = 'irrevocable';
      results.revocability.confidence = 0.95;
    } else if (/\brevocable\b/i.test(cleanText)) {
      results.revocability.value = 'revocable';
      results.revocability.confidence = 0.95;
    }
    
    // Extract Powers with improved patterns
    const powerPatterns = [
      /(?:trustee.*?powers?|powers?\s+of\s+(?:the\s+)?trustee)[:\s]+([\s\S]+?)(?=\n\s*(?:ARTICLE|Section|\d+\.|$))/gi,
      /(?:trustee\s+(?:shall|may)\s+have\s+(?:the\s+)?(?:following\s+)?powers?)[:\s]+([\s\S]+?)(?=\n\s*(?:ARTICLE|Section|\d+\.|$))/gi,
      /(?:powers?\s+and\s+authorit(?:y|ies))[:\s]+([\s\S]+?)(?=\n\s*(?:ARTICLE|Section|\d+\.|$))/gi
    ];
    
    let powersText = '';
    for (const pattern of powerPatterns) {
      let match;
      while ((match = pattern.exec(cleanText)) !== null) {
        if (match[1]) {
          powersText += match[1] + '\n';
        }
      }
    }
    
    if (powersText) {
      // Extract individual powers from the powers section
      const powerItems = powersText.match(/(?:[a-z]\)|[A-Z]\)|[0-9]+\.|\((?:i|ii|iii|iv|v|vi|vii|viii|ix|x)+\)|\d+\))\s*([^;.]+[;.])/g) || [];
      const powersList = powerItems.map(item => {
        return item.replace(/^(?:[a-z]\)|[A-Z]\)|[0-9]+\.|\((?:i|ii|iii|iv|v|vi|vii|viii|ix|x)+\)|\d+\))\s*/, '').trim();
      }).filter(p => p.length > 10 && p.length < 200);
      
      results.powers.value = powersList;
      results.powers.confidence = powersList.length > 0 ? 0.8 : 0.2;
    }
    
    // Process and deduplicate results with smart confidence scoring
    const processResults = (field) => {
      if (results[field].matches.length > 0) {
        // Remove duplicates and clean
        const unique = [...new Set(results[field].matches.map(m => m.trim()))]
          .filter(m => m.length > 0);
        
        if (unique.length === 0) {
          results[field].confidence = 0;
          return;
        }
        
        results[field].value = Array.isArray(results[field].value) ? unique : unique[0] || '';
        
        // Smart confidence based on field type and match quality
        let confidence = 0.4; // Base confidence
        
        if (field === 'trustName') {
          // Higher confidence for trust names with clear patterns
          if (unique[0].toLowerCase().includes('trust')) confidence += 0.4;
          if (unique.length === 1) confidence += 0.2; // Single clear match
          if (unique[0].length > 10 && unique[0].length < 80) confidence += 0.1;
        } else if (field === 'trustees' || field === 'grantors') {
          // Higher confidence for names that pass validation
          const validNames = unique.filter(name => isValidName(name));
          confidence += (validNames.length / unique.length) * 0.4;
          if (unique.length <= 3) confidence += 0.2; // Reasonable number of matches
        } else if (field === 'state') {
          // Very high confidence for state matches
          confidence = 0.95;
        } else if (field === 'date') {
          // Check if date looks valid
          if (/\d{4}/.test(unique[0])) confidence += 0.4; // Has year
          if (/\b(?:January|February|March|April|May|June|July|August|September|October|November|December)\b/i.test(unique[0])) confidence += 0.2;
        }
        
        // Penalize too many matches (likely false positives)
        if (unique.length > 5) confidence -= 0.2;
        
        results[field].confidence = Math.min(0.98, Math.max(0.1, confidence));
      }
    };
    
    ['trustName', 'grantors', 'trustees', 'successorTrustees', 'date', 'state'].forEach(processResults);
    
    // Calculate overall confidence with weighted scoring
    const weights = {
      trustName: 0.25,    // Most important
      trustees: 0.25,     // Most important  
      grantors: 0.15,
      date: 0.15,
      state: 0.1,
      revocability: 0.05,
      successorTrustees: 0.05
    };
    
    let weightedConfidence = 0;
    let totalWeight = 0;
    
    Object.entries(results).forEach(([field, data]) => {
      if (weights[field] && data.confidence > 0) {
        weightedConfidence += data.confidence * weights[field];
        totalWeight += weights[field];
      }
    });
    
    const overallConfidence = totalWeight > 0 ? weightedConfidence / totalWeight : 0;
    
    return {
      text: cleanText,
      entities: {
        trustName: results.trustName.value,
        grantors: results.grantors.value,
        trustees: results.trustees.value,
        successorTrustees: results.successorTrustees.value,
        date: results.date.value,
        state: results.state.value,
        revocability: results.revocability.value
      },
      powers: results.powers.value,
      confidence: overallConfidence,
      fieldConfidences: Object.fromEntries(
        Object.entries(results).map(([k, v]) => [k, v.confidence])
      )
    };
  };

  const extractStructuredData = async (analysis) => {
    // Convert AI analysis to structured form data
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Format grantors properly (join with "and" if multiple)
    const formatGrantors = (grantors) => {
      if (!grantors || grantors.length === 0) return '';
      if (grantors.length === 1) return grantors[0];
      if (grantors.length === 2) return grantors.join(' and ');
      return grantors.slice(0, -1).join(', ') + ' and ' + grantors[grantors.length - 1];
    };
    
    // State name to code mapping
    const stateNameToCode = {
      'ALABAMA': 'AL', 'ALASKA': 'AK', 'ARIZONA': 'AZ', 'ARKANSAS': 'AR', 'CALIFORNIA': 'CA',
      'COLORADO': 'CO', 'CONNECTICUT': 'CT', 'DELAWARE': 'DE', 'FLORIDA': 'FL', 'GEORGIA': 'GA',
      'HAWAII': 'HI', 'IDAHO': 'ID', 'ILLINOIS': 'IL', 'INDIANA': 'IN', 'IOWA': 'IA',
      'KANSAS': 'KS', 'KENTUCKY': 'KY', 'LOUISIANA': 'LA', 'MAINE': 'ME', 'MARYLAND': 'MD',
      'MASSACHUSETTS': 'MA', 'MICHIGAN': 'MI', 'MINNESOTA': 'MN', 'MISSISSIPPI': 'MS', 'MISSOURI': 'MO',
      'MONTANA': 'MT', 'NEBRASKA': 'NE', 'NEVADA': 'NV', 'NEW HAMPSHIRE': 'NH', 'NEW JERSEY': 'NJ',
      'NEW MEXICO': 'NM', 'NEW YORK': 'NY', 'NORTH CAROLINA': 'NC', 'NORTH DAKOTA': 'ND', 'OHIO': 'OH',
      'OKLAHOMA': 'OK', 'OREGON': 'OR', 'PENNSYLVANIA': 'PA', 'RHODE ISLAND': 'RI', 'SOUTH CAROLINA': 'SC',
      'SOUTH DAKOTA': 'SD', 'TENNESSEE': 'TN', 'TEXAS': 'TX', 'UTAH': 'UT', 'VERMONT': 'VT',
      'VIRGINIA': 'VA', 'WASHINGTON': 'WA', 'WEST VIRGINIA': 'WV', 'WISCONSIN': 'WI', 'WYOMING': 'WY'
    };
    
    // Convert state name to code if needed
    let stateCode = analysis.entities.state || '';
    if (stateCode && stateCode.length > 2) {
      stateCode = stateNameToCode[stateCode.toUpperCase()] || stateCode;
    }
    
    // Smart validation to catch obvious errors
    const validateExtractions = (data) => {
      const validationWarnings = [];
      
      // Validate trust name
      if (data.entities.trustName) {
        if (data.entities.trustName.length < 5) {
          validationWarnings.push('Trust name seems too short');
          data.fieldConfidences.trustName *= 0.5;
        }
        if (!data.entities.trustName.toLowerCase().includes('trust')) {
          validationWarnings.push('Trust name may be incorrect - missing "Trust"');
          data.fieldConfidences.trustName *= 0.7;
        }
      }
      
      // Validate date
      if (data.entities.date) {
        const currentYear = new Date().getFullYear();
        const yearMatch = data.entities.date.match(/\d{4}/);
        if (yearMatch) {
          const year = parseInt(yearMatch[0]);
          if (year < 1900 || year > currentYear + 1) {
            validationWarnings.push('Trust date seems unrealistic');
            data.fieldConfidences.date *= 0.3;
          }
        }
      }
      
      // Validate trustees/grantors aren't document fragments
      const validateNames = (names, type) => {
        if (Array.isArray(names)) {
          const badNames = names.filter(name => {
            const lower = name.toLowerCase();
            return lower.includes('article') || lower.includes('section') || 
                   lower.includes('hereby') || lower.includes('whereas') ||
                   name.length < 3 || name.split(' ').length > 5;
          });
          if (badNames.length > 0) {
            validationWarnings.push(`${type} may contain document fragments`);
            data.fieldConfidences[type === 'Trustees' ? 'trustees' : 'grantors'] *= 0.4;
          }
        }
      };
      
      validateNames(data.entities.trustees, 'Trustees');
      validateNames(data.entities.grantors, 'Grantors');
      
      return { ...data, validationWarnings };
    };
    
    const validatedAnalysis = validateExtractions(analysis);

    return {
      trustName: validatedAnalysis.entities.trustName || '',
      trustDate: validatedAnalysis.entities.date || '',
      revocability: validatedAnalysis.entities.revocability || '',
      grantor: formatGrantors(validatedAnalysis.entities.grantors),
      trustee: validatedAnalysis.entities.trustees || [],
      successorTrustee: validatedAnalysis.entities.successorTrustees || [],
      powers: validatedAnalysis.powers || [],
      governingLaw: validatedAnalysis.entities.state || '',
      state: stateCode,  // Use the converted state code
      confidence: validatedAnalysis.confidence || 0,
      fieldConfidences: validatedAnalysis.fieldConfidences || {},
      validationWarnings: validatedAnalysis.validationWarnings || [],
      extractedText: validatedAnalysis.text
    };
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow mt-8">
      {/* Security Warning */}
      <div className="mb-8 p-6 bg-red-50 border-2 border-red-300 rounded-lg">
        <div className="flex items-start">
          <div className="text-red-500 mr-3 flex-shrink-0">
            <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold text-red-800 mb-2">
              Document Upload Disabled for Security
            </h3>
            <p className="text-red-700 mb-4">
              To protect your sensitive trust documents and ensure legal compliance, we have temporarily disabled the document upload feature. 
              We are implementing enhanced security measures to safeguard your confidential information.
            </p>
            <div className="space-y-2">
              <p className="text-red-700 font-medium">Available Options:</p>
              <ul className="list-disc list-inside text-red-700 space-y-1">
                <li>Use the manual entry form below to input trust information</li>
                <li>Request a demo for secure enterprise solutions</li>
                <li>Contact our team for assistance with trust certifications</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">AI-Powered Document Processing</h2>
        <p className="text-lg text-gray-600 mb-6">
          Coming soon: Upload your trust document and our AI will automatically extract the information needed for your Certification of Trust.
        </p>
      </div>

      {/* Disabled Upload Zone */}
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center bg-gray-50 relative">
        <div className="absolute inset-0 bg-gray-100 bg-opacity-80 rounded-lg flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md">
            <div className="text-5xl mb-4">🔒</div>
            <h4 className="text-lg font-semibold text-gray-800 mb-2">Upload Temporarily Disabled</h4>
            <p className="text-gray-600 mb-4">
              For your security, document uploads are currently disabled.
            </p>
            {!showDemoForm && !demoSubmitted && (
              <button
                onClick={() => setShowDemoForm(true)}
                className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Request Demo Access
              </button>
            )}
          </div>
        </div>
        <div className="opacity-30 pointer-events-none">
          <div className="text-6xl mb-4">📄</div>
          <p className="text-xl font-medium text-gray-700">
            Drag & drop your trust document here
          </p>
          <p className="text-gray-500">or click to browse files</p>
          <p className="text-sm text-gray-400 mt-4">
            Supports: PDF, DOC, DOCX, TXT files
          </p>
        </div>
      </div>

      {/* Demo Request Form */}
      {showDemoForm && !demoSubmitted && (
        <div className="mt-8 p-6 bg-blue-50 border border-blue-200 rounded-lg">
          <h3 className="text-lg font-semibold text-blue-900 mb-4">Request Demo Access</h3>
          <form onSubmit={handleDemoSubmit} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name *
                </label>
                <input
                  type="text"
                  required
                  value={demoFormData.name}
                  onChange={(e) => setDemoFormData({...demoFormData, name: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email *
                </label>
                <input
                  type="email"
                  required
                  value={demoFormData.email}
                  onChange={(e) => setDemoFormData({...demoFormData, email: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Company
              </label>
              <input
                type="text"
                value={demoFormData.company}
                onChange={(e) => setDemoFormData({...demoFormData, company: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <button
              type="submit"
              className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Submit Demo Request
            </button>
          </form>
        </div>
      )}

      {/* Demo Success Message */}
      {demoSubmitted && (
        <div className="mt-8 p-6 bg-green-50 border border-green-200 rounded-lg text-center">
          <div className="text-green-600 mb-3">
            <svg className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h4 className="text-lg font-semibold text-green-800 mb-2">
            Demo Request Submitted!
          </h4>
          <p className="text-green-700">
            We&apos;ll contact you within 24 hours to schedule your demo.
          </p>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <div className="flex items-start">
            <div className="text-red-500 mr-3 mt-1">⚠️</div>
            <div>
              <h4 className="font-semibold text-red-800 mb-2">Document Processing Failed</h4>
              <p className="text-red-700 mb-3">{error}</p>
              <div className="text-sm text-red-600">
                <p className="font-medium mb-2">Alternative options:</p>
                <ul className="list-disc ml-4 space-y-1">
                  <li>Try uploading the document in DOCX or TXT format</li>
                  <li>If using PDF, ensure it&apos;s not password-protected</li>
                  <li>Refresh the page and try again</li>
                  <li>Use the &quot;Enter Manually&quot; option below to input information directly</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Extracted Data Preview */}
      {extractedData && (
        <div className="mt-8 p-6 bg-green-50 border border-green-200 rounded-lg">
          <h3 className="text-lg font-semibold text-green-800 mb-4">
            ✓ Information Extracted Successfully
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Trust Name
                {extractedData.fieldConfidences?.trustName > 0 && (
                  <span className={`ml-2 text-xs ${
                    extractedData.fieldConfidences.trustName > 0.7 ? 'text-green-600' : 
                    extractedData.fieldConfidences.trustName > 0.4 ? 'text-yellow-600' : 'text-red-600'
                  }`}>
                    ({Math.round(extractedData.fieldConfidences.trustName * 100)}% confident)
                  </span>
                )}
              </label>
              <p className="text-gray-900">{extractedData.trustName || '(Not found)'}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Trust Date
                {extractedData.fieldConfidences?.date > 0 && (
                  <span className={`ml-2 text-xs ${
                    extractedData.fieldConfidences.date > 0.7 ? 'text-green-600' : 
                    extractedData.fieldConfidences.date > 0.4 ? 'text-yellow-600' : 'text-red-600'
                  }`}>
                    ({Math.round(extractedData.fieldConfidences.date * 100)}% confident)
                  </span>
                )}
              </label>
              <p className="text-gray-900">{extractedData.trustDate || '(Not found)'}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Grantor(s)
                {extractedData.fieldConfidences?.grantors > 0 && (
                  <span className={`ml-2 text-xs ${
                    extractedData.fieldConfidences.grantors > 0.7 ? 'text-green-600' : 
                    extractedData.fieldConfidences.grantors > 0.4 ? 'text-yellow-600' : 'text-red-600'
                  }`}>
                    ({Math.round(extractedData.fieldConfidences.grantors * 100)}% confident)
                  </span>
                )}
              </label>
              <p className="text-gray-900">{extractedData.grantor || '(Not found)'}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Trustee(s)
                {extractedData.fieldConfidences?.trustees > 0 && (
                  <span className={`ml-2 text-xs ${
                    extractedData.fieldConfidences.trustees > 0.7 ? 'text-green-600' : 
                    extractedData.fieldConfidences.trustees > 0.4 ? 'text-yellow-600' : 'text-red-600'
                  }`}>
                    ({Math.round(extractedData.fieldConfidences.trustees * 100)}% confident)
                  </span>
                )}
              </label>
              <p className="text-gray-900">
                {extractedData.trustee && extractedData.trustee.length > 0 
                  ? extractedData.trustee.join(', ') 
                  : '(Not found)'}
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Successor Trustee(s)
                {extractedData.fieldConfidences?.successorTrustees > 0 && (
                  <span className={`ml-2 text-xs ${
                    extractedData.fieldConfidences.successorTrustees > 0.7 ? 'text-green-600' : 
                    extractedData.fieldConfidences.successorTrustees > 0.4 ? 'text-yellow-600' : 'text-red-600'
                  }`}>
                    ({Math.round(extractedData.fieldConfidences.successorTrustees * 100)}% confident)
                  </span>
                )}
              </label>
              <p className="text-gray-900">
                {extractedData.successorTrustee && extractedData.successorTrustee.length > 0 
                  ? extractedData.successorTrustee.join(', ') 
                  : '(Not found)'}
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Governing Law
                {extractedData.fieldConfidences?.state > 0 && (
                  <span className={`ml-2 text-xs ${
                    extractedData.fieldConfidences.state > 0.7 ? 'text-green-600' : 
                    extractedData.fieldConfidences.state > 0.4 ? 'text-yellow-600' : 'text-red-600'
                  }`}>
                    ({Math.round(extractedData.fieldConfidences.state * 100)}% confident)
                  </span>
                )}
              </label>
              <p className="text-gray-900">{extractedData.governingLaw || '(Not found)'}</p>
            </div>
          </div>

          {extractedData.powers && extractedData.powers.length > 0 && (
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Extracted Trustee Powers
                {extractedData.fieldConfidences?.powers > 0 && (
                  <span className={`ml-2 text-xs ${
                    extractedData.fieldConfidences.powers > 0.7 ? 'text-green-600' : 
                    extractedData.fieldConfidences.powers > 0.4 ? 'text-yellow-600' : 'text-red-600'
                  }`}>
                    ({Math.round(extractedData.fieldConfidences.powers * 100)}% confident)
                  </span>
                )}
              </label>
              <div className="max-h-32 overflow-y-auto bg-white p-3 rounded border">
                {extractedData.powers.map((power, index) => (
                  <div key={index} className="text-sm text-gray-700 mb-1">• {power}</div>
                ))}
              </div>
            </div>
          )}

          {extractedData.validationWarnings && extractedData.validationWarnings.length > 0 && (
            <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <div className="flex items-start">
                <div className="text-yellow-500 mr-2 mt-0.5">⚠️</div>
                <div>
                  <h4 className="text-sm font-medium text-yellow-800 mb-1">Please Review</h4>
                  <ul className="text-sm text-yellow-700 space-y-1">
                    {extractedData.validationWarnings.map((warning, index) => (
                      <li key={index}>• {warning}</li>
                    ))}
                  </ul>
                  <p className="text-xs text-yellow-600 mt-2">
                    You can edit these fields in the next step if needed.
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className="flex items-center justify-between">
            <div className="flex items-center text-sm text-gray-600">
              <span className="mr-2">Overall Confidence:</span>
              <div className="w-20 bg-gray-200 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full ${
                    extractedData.confidence > 0.7 ? 'bg-green-500' : 
                    extractedData.confidence > 0.4 ? 'bg-yellow-500' : 'bg-red-500'
                  }`}
                  style={{ width: `${extractedData.confidence * 100}%` }}
                ></div>
              </div>
              <span className="ml-2">{Math.round(extractedData.confidence * 100)}%</span>
            </div>
            
            <div className="space-x-3">
              <button 
                onClick={() => setExtractedData(null)}
                className="px-4 py-2 text-gray-600 border border-gray-300 rounded hover:bg-gray-50"
              >
                Re-upload
              </button>
              <button 
                onClick={() => {
                  trackEvents.formCompleted('ai_extraction', 'use_extracted_data');
                  onDataExtracted(extractedData);
                }}
                className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Use This Data
              </button>
            </div>
          </div>

          {extractedData.confidence < 0.7 && (
            <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded">
              <p className="text-sm text-yellow-800">
                <strong>Note:</strong> Some fields couldn&apos;t be extracted with high confidence. 
                Please review and correct any missing or incorrect information in the form.
              </p>
            </div>
          )}
        </div>
      )}

      {/* Features List */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="text-center p-4">
          <div className="text-3xl mb-2">🤖</div>
          <h4 className="font-semibold text-gray-800 mb-2">AI-Powered</h4>
          <p className="text-sm text-gray-600">Advanced machine learning extracts information with high accuracy</p>
        </div>
        <div className="text-center p-4">
          <div className="text-3xl mb-2">⚡</div>
          <h4 className="font-semibold text-gray-800 mb-2">Instant Processing</h4>
          <p className="text-sm text-gray-600">Get results in seconds, not hours or days</p>
        </div>
        <div className="text-center p-4">
          <div className="text-3xl mb-2">🔒</div>
          <h4 className="font-semibold text-gray-800 mb-2">Secure & Private</h4>
          <p className="text-sm text-gray-600">Your documents are processed securely and never stored</p>
        </div>
      </div>

      {/* Manual Entry Option */}
      <div className="mt-8 p-4 bg-gray-50 rounded-lg text-center">
        <p className="text-gray-600 mb-3">Prefer to enter information manually?</p>
        <button 
          onClick={() => {
            trackEvents.formCompleted('ai_extraction', 'manual_entry');
            onDataExtracted(null);
          }}
          className="px-6 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
        >
          Enter Manually
        </button>
      </div>
    </div>
  );
};

export default AIDocumentProcessor; 