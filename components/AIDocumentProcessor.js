import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import mammoth from 'mammoth';

const AIDocumentProcessor = ({ onDataExtracted }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [extractedData, setExtractedData] = useState(null);
  const [error, setError] = useState(null);
  const [processingStep, setProcessingStep] = useState('');

  const onDrop = useCallback(async (acceptedFiles) => {
    setIsProcessing(true);
    setError(null);
    setProcessingStep('Reading document...');
    try {
      const file = acceptedFiles[0];
      if (!file) {
        throw new Error('No file selected');
      }
      
      console.log('Processing file:', file.name, 'Type:', file.type); // DEBUG LOG
      
      let text = '';
      
      // Handle PDF files
      if (file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf')) {
        try {
          text = await extractTextFromPDF(file);
          console.log('Extracted text from PDF:', text.substring(0, 500) + '...'); // DEBUG LOG
        } catch (pdfError) {
          console.error('PDF extraction error:', pdfError);
          throw new Error(`Failed to read PDF: ${pdfError.message}. Please ensure the PDF is not password-protected or corrupted.`);
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
      } else {
        setExtractedData(structuredData);
        onDataExtracted(structuredData);
      }
    } catch (err) {
      setError(err.message || 'Failed to process document. Please try again or enter information manually.');
      console.error('AI processing error:', err);
    } finally {
      setIsProcessing(false);
      setProcessingStep('');
    }
  }, [onDataExtracted]);

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
      
      // Create FormData to send file to server
      const formData = new FormData();
      formData.append('file', file);
      
      // Send to server-side PDF processing API
      const response = await fetch('/api/extract-pdf', {
        method: 'POST',
        body: formData,
      });
      
      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.error || 'Server-side PDF processing failed');
      }
      
      if (!result.success || !result.text) {
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

    // Extract Trust Name with multiple patterns
    const trustNamePatterns = [
      /(?:the\s+)?([A-Z][A-Za-z\s&,.'()-]+(?:Revocable|Irrevocable|Living|Family)?\s*Trust)\b/g,
      /trust\s+(?:shall\s+be\s+)?(?:known|entitled|named)\s+(?:as\s+)?[:\s]*"?([^"\n]+)"?/gi,
      /(?:name|title)\s*(?:of\s+(?:the\s+)?trust)?[:\s]*"?([^"\n]+)"?/gi,
      /(?:hereby\s+creates?\s+(?:the\s+)?|established\s+(?:the\s+)?)"?([^"\n]+?(?:Trust|TRUST))"?/gi,
      /^([A-Z][A-Za-z\s&,.'()-]+?(?:Trust|TRUST))\s*$/gm
    ];
    
    for (const pattern of trustNamePatterns) {
      let match;
      while ((match = pattern.exec(cleanText)) !== null) {
        if (match[1] && match[1].length > 5 && match[1].length < 100) {
          results.trustName.matches.push(match[1].trim());
        }
      }
    }
    
    // Extract Grantors/Settlors with multiple patterns
    const grantorPatterns = [
      /(?:grantor|settlor|trustor|donor)s?\s*(?:are?|is)?\s*[:\s]*([A-Z][A-Za-z\s,&]+?)(?:\s*(?:and|,)\s*[A-Z][A-Za-z\s,&]+)*?(?=\s*(?:trustee|successor|herein|$|\n))/gi,
      /(?:by\s+)?([A-Z][A-Za-z\s]+(?:\s+and\s+[A-Z][A-Za-z\s]+)?),?\s+(?:as\s+)?(?:grantor|settlor|trustor)/gi,
      /(?:I|We),?\s+([A-Z][A-Za-z\s,&]+(?:\s+and\s+[A-Z][A-Za-z\s,&]+)?),?\s+(?:hereby\s+)?(?:create|establish|declare)/gi,
      /THIS\s+TRUST\s+AGREEMENT.*?by\s+and\s+between\s+([A-Z][A-Za-z\s,&]+?)(?:\s*\(.*?\))?,?\s+as\s+(?:Grantor|Settlor)/gi
    ];
    
    for (const pattern of grantorPatterns) {
      let match;
      while ((match = pattern.exec(cleanText)) !== null) {
        if (match[1]) {
          const names = match[1].split(/\s+and\s+|\s*,\s*/).filter(n => n.length > 2);
          results.grantors.matches.push(...names);
        }
      }
    }
    
    // Extract Trustees with multiple patterns
    const trusteePatterns = [
      /(?:initial\s+)?trustee(?:s)?\s*(?:are?|is|shall\s+be)?\s*[:\s]*([A-Z][A-Za-z\s,&]+?)(?:\s*(?:and|,)\s*[A-Z][A-Za-z\s,&]+)*?(?=\s*(?:successor|shall|$|\n))/gi,
      /([A-Z][A-Za-z\s]+(?:\s+and\s+[A-Z][A-Za-z\s]+)?),?\s+(?:as\s+)?(?:the\s+)?(?:initial\s+)?trustee/gi,
      /appoint\s+([A-Z][A-Za-z\s,&]+?)(?:\s+and\s+[A-Z][A-Za-z\s,&]+)?\s+as\s+(?:the\s+)?(?:initial\s+)?trustee/gi
    ];
    
    for (const pattern of trusteePatterns) {
      let match;
      while ((match = pattern.exec(cleanText)) !== null) {
        if (match[1] && !match[1].toLowerCase().includes('successor')) {
          const names = match[1].split(/\s+and\s+|\s*,\s*/).filter(n => n.length > 2);
          results.trustees.matches.push(...names);
        }
      }
    }
    
    // Extract Successor Trustees
    const successorPatterns = [
      /successor\s+trustee(?:s)?\s*(?:are?|is|shall\s+be)?\s*[:\s]*([A-Z][A-Za-z\s,&]+?)(?:\s*(?:and|,)\s*[A-Z][A-Za-z\s,&]+)*?(?=\s*(?:shall|$|\n))/gi,
      /([A-Z][A-Za-z\s]+(?:\s+and\s+[A-Z][A-Za-z\s]+)?),?\s+(?:as\s+)?(?:the\s+)?successor\s+trustee/gi,
      /appoint\s+([A-Z][A-Za-z\s,&]+?)(?:\s+and\s+[A-Z][A-Za-z\s,&]+)?\s+as\s+(?:the\s+)?successor\s+trustee/gi
    ];
    
    for (const pattern of successorPatterns) {
      let match;
      while ((match = pattern.exec(cleanText)) !== null) {
        if (match[1]) {
          const names = match[1].split(/\s+and\s+|\s*,\s*/).filter(n => n.length > 2);
          results.successorTrustees.matches.push(...names);
        }
      }
    }
    
    // Extract Date with multiple patterns
    const datePatterns = [
      /(?:executed|made|entered|dated|effective)\s+(?:this\s+)?(\d{1,2}(?:st|nd|rd|th)?\s+day\s+of\s+[A-Za-z]+,?\s+\d{4})/gi,
      /(?:executed|made|entered|dated|effective)\s+(?:as\s+of\s+)?([A-Za-z]+\s+\d{1,2},?\s+\d{4})/gi,
      /(?:date|dated)[:\s]+(\d{1,2}[-/]\d{1,2}[-/]\d{2,4})/gi,
      /(?:as\s+of\s+)?(\d{1,2}[-/]\d{1,2}[-/]\d{2,4})/gi,
      /this\s+(\d{1,2}(?:st|nd|rd|th)?\s+day\s+of\s+[A-Za-z]+,?\s+\d{4})/gi
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
    
    // Process and deduplicate results
    const processResults = (field) => {
      if (results[field].matches.length > 0) {
        // Remove duplicates and clean
        const unique = [...new Set(results[field].matches.map(m => m.trim()))];
        results[field].value = Array.isArray(results[field].value) ? unique : unique[0] || '';
        results[field].confidence = Math.min(0.95, 0.6 + (unique.length * 0.15));
      }
    };
    
    ['trustName', 'grantors', 'trustees', 'successorTrustees', 'date', 'state'].forEach(processResults);
    
    // Calculate overall confidence
    const fieldConfidences = Object.values(results).map(r => r.confidence);
    const overallConfidence = fieldConfidences.reduce((a, b) => a + b, 0) / fieldConfidences.length;
    
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
    
    return {
      trustName: analysis.entities.trustName || '',
      trustDate: analysis.entities.date || '',
      revocability: analysis.entities.revocability || '',
      grantor: formatGrantors(analysis.entities.grantors),
      trustee: analysis.entities.trustees || [],
      successorTrustee: analysis.entities.successorTrustees || [],
      powers: analysis.powers || [],
      governingLaw: analysis.entities.state || '',
      state: analysis.entities.state || '',
      confidence: analysis.confidence || 0,
      fieldConfidences: analysis.fieldConfidences || {},
      extractedText: analysis.text
    };
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow mt-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">AI-Powered Document Processing</h2>
        <p className="text-lg text-gray-600 mb-6">
          Upload your trust document and our AI will automatically extract the information needed for your Certification of Trust.
        </p>
      </div>

      {/* Drag and Drop Zone */}
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-12 text-center transition-all duration-200 ${
          isDragActive 
            ? 'border-blue-500 bg-blue-50' 
            : 'border-gray-300 hover:border-gray-400'
        }`}
      >
        <input {...getInputProps()} />
        
        {isProcessing ? (
          <div className="space-y-4">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="text-lg font-medium text-gray-700">{processingStep}</p>
            <p className="text-sm text-gray-500">Our AI is analyzing your trust document</p>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="text-6xl mb-4">📄</div>
            <p className="text-xl font-medium text-gray-700">
              {isDragActive ? 'Drop your trust document here' : 'Drag & drop your trust document here'}
            </p>
            <p className="text-gray-500">or click to browse files</p>
            <p className="text-sm text-gray-400 mt-4">
              Supports: PDF, DOC, DOCX, TXT files
            </p>
          </div>
        )}
      </div>

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
                onClick={() => onDataExtracted(extractedData)}
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
          onClick={() => onDataExtracted(null)}
          className="px-6 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
        >
          Enter Manually
        </button>
      </div>
    </div>
  );
};

export default AIDocumentProcessor; 