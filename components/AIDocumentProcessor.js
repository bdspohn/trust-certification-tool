import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

const AIDocumentProcessor = ({ onDataExtracted }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [extractedData, setExtractedData] = useState(null);
  const [error, setError] = useState(null);

  const onDrop = useCallback(async (acceptedFiles) => {
    setIsProcessing(true);
    setError(null);
    
    try {
      // Simulate AI processing - in real implementation, this would call an AI service
      const file = acceptedFiles[0];
      
      // Mock AI extraction based on file content
      const mockExtractedData = await simulateAIExtraction(file);
      
      setExtractedData(mockExtractedData);
      onDataExtracted(mockExtractedData);
      
    } catch (err) {
      setError('Failed to process document. Please try again or enter information manually.');
    } finally {
      setIsProcessing(false);
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

  const simulateAIExtraction = async (file) => {
    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Mock extracted data based on common trust document patterns
    return {
      trustName: 'John and Jane Smith Family Trust',
      trustDate: '2023-06-15',
      revocability: 'revocable',
      grantor: 'John Smith and Jane Smith',
      trustee: ['John Smith', 'Jane Smith'],
      successorTrustee: ['Michael Smith'],
      powers: [
        'Sell, convey, pledge, mortgage, lease, or transfer title to any interest in real or personal property',
        'Open and close bank accounts, including checking, savings, and investment accounts',
        'Make investments and manage investment accounts, including stocks, bonds, and mutual funds',
        'Distribute trust assets to beneficiaries according to the trust terms',
        'Sign documents, contracts, and legal instruments on behalf of the trust',
        'File tax returns and handle all tax matters for the trust'
      ],
      governingLaw: 'CA',
      confidence: 0.85
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
            <p className="text-lg font-medium text-gray-700">Processing your document...</p>
            <p className="text-sm text-gray-500">Our AI is extracting information from your trust document</p>
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
          <p className="text-red-700">{error}</p>
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
              <label className="block text-sm font-medium text-gray-700 mb-1">Trust Name</label>
              <p className="text-gray-900">{extractedData.trustName}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Trust Date</label>
              <p className="text-gray-900">{extractedData.trustDate}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Grantor(s)</label>
              <p className="text-gray-900">{extractedData.grantor}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Trustee(s)</label>
              <p className="text-gray-900">{extractedData.trustee.join(', ')}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Successor Trustee(s)</label>
              <p className="text-gray-900">{extractedData.successorTrustee.join(', ')}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Governing Law</label>
              <p className="text-gray-900">{extractedData.governingLaw}</p>
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Extracted Trustee Powers</label>
            <div className="max-h-32 overflow-y-auto bg-white p-3 rounded border">
              {extractedData.powers.map((power, index) => (
                <div key={index} className="text-sm text-gray-700 mb-1">• {power}</div>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center text-sm text-gray-600">
              <span className="mr-2">Confidence Score:</span>
              <div className="w-20 bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-green-500 h-2 rounded-full" 
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