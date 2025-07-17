import React, { useState } from "react";
import { Button } from "@/components/ui/button";

export default function AITool() {
  const [isDragOver, setIsDragOver] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      setUploadedFile(files[0]);
    }
  };

  const handleFileSelect = (e) => {
    const files = e.target.files;
    if (files.length > 0) {
      setUploadedFile(files[0]);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6 md:p-10">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            AI-Powered Trust Certification
          </h1>
          <p className="text-lg text-gray-600">
            Upload your trust document and let AI extract the information automatically
          </p>
        </div>

        {/* Main Container */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* Coming Soon Notice */}
          <div className="text-center mb-8 p-6 bg-yellow-50 border border-yellow-200 rounded-lg">
            <h2 className="text-2xl font-semibold text-yellow-800 mb-2">
              🚀 Coming Soon
            </h2>
            <p className="text-yellow-700">
              Our AI-powered trust certification tool is currently in development. 
              This feature will allow you to upload your trust document and automatically 
              generate a certification form for review and editing.
            </p>
          </div>

          {/* Upload Area */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Upload Your Trust Document
            </h3>
            <div
              className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                isDragOver
                  ? "border-blue-400 bg-blue-50"
                  : "border-gray-300 hover:border-gray-400"
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <div className="mb-4">
                <svg
                  className="mx-auto h-12 w-12 text-gray-400"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 48 48"
                >
                  <path
                    d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <p className="text-lg text-gray-600 mb-2">
                Drag and drop your trust document here, or
              </p>
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleFileSelect}
                className="hidden"
                id="file-upload"
              />
              <label htmlFor="file-upload">
                <Button variant="outline" className="cursor-pointer">
                  Browse Files
                </Button>
              </label>
              <p className="text-sm text-gray-500 mt-2">
                Supports PDF, DOC, and DOCX files
              </p>
            </div>
          </div>

          {/* Features Preview */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-2">AI Extraction</h4>
              <p className="text-gray-600 text-sm">
                Our AI will automatically extract trust name, date, trustees, powers, 
                and other key information from your document.
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-2">Review & Edit</h4>
              <p className="text-gray-600 text-sm">
                Review the extracted information and make any necessary edits 
                before generating your certification.
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-2">Universal Format</h4>
              <p className="text-gray-600 text-sm">
                Generate certifications compatible with all major financial 
                institutions and legal requirements.
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-2">E-Signature Ready</h4>
              <p className="text-gray-600 text-sm">
                Export your certification for manual signature, e-signature, 
                or remote notarization.
              </p>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center">
            <p className="text-gray-600 mb-4">
              Want to be notified when this feature launches?
            </p>
            <Button className="bg-blue-600 hover:bg-blue-700">
              Get Early Access
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
} 