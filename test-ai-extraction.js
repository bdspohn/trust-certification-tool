// AI Extraction Testing Framework
// Run with: node test-ai-extraction.js

const fs = require('fs');
const path = require('path');

// Test cases with expected results
const testCases = [
  {
    file: 'sample-trust-1.txt',
    expected: {
      trustName: 'Tommy Trustmaker and Tammy Trustmaker Revocable Living Trust',
      trustees: ['Tommy Trustmaker', 'Tammy Trustmaker'],
      successorTrustees: ['Willamina Chang', 'Rachel Walton'],
      grantors: ['Tommy Trustmaker', 'Tammy Trustmaker'],
      date: 'March 15, 2020',
      state: 'California',
      revocability: 'revocable'
    }
  },
  {
    file: 'sample-trust-2.txt',
    expected: {
      trustName: 'The Smith Family Revocable Trust',
      trustees: ['John Michael Smith', 'Mary Elizabeth Smith'],
      successorTrustees: ['Jennifer Lynn Smith-Johnson', 'Robert Charles Smith', 'First National Bank of California'],
      grantors: ['John Michael Smith', 'Mary Elizabeth Smith'],
      date: 'November 5, 2019',
      state: 'California',
      revocability: 'revocable'
    }
  },
  {
    file: 'sample-trust-3.txt',
    expected: {
      trustName: 'Margaret Ann Johnson Irrevocable Life Insurance Trust',
      trustees: ['Wells Fargo Bank, National Association'],
      successorTrustees: ['First Republic Bank'],
      grantors: ['Margaret Ann Johnson'],
      date: 'September 18, 2021',
      state: 'Texas',
      revocability: 'irrevocable'
    }
  },
  {
    file: 'sample-trust-4.txt',
    expected: {
      trustName: 'The Williams Charitable Remainder Trust',
      trustees: ['Northern Trust Company'],
      successorTrustees: ['Bank of America Private Bank', 'JPMorgan Chase Bank, N.A.'],
      grantors: ['Robert F. Williams', 'Janet Lynn Williams'],
      date: 'January 10, 2018',
      state: 'Arizona',
      revocability: 'irrevocable'
    }
  }
];

// Load our AI extraction function (we'll need to adapt this)
function simulateAIExtraction(text) {
  // This would use our actual AI extraction logic
  // For now, return mock results to test the framework
  return {
    trustName: 'Extracted Trust Name',
    trustees: ['Extracted Trustee'],
    grantors: ['Extracted Grantor'],
    date: 'Extracted Date',
    state: 'Extracted State',
    revocability: 'extracted',
    confidence: 0.85,
    fieldConfidences: {
      trustName: 0.9,
      trustees: 0.8,
      grantors: 0.85,
      date: 0.7,
      state: 0.95,
      revocability: 0.9
    }
  };
}

// Test accuracy scoring
function calculateAccuracy(expected, actual) {
  const results = {
    total: 0,
    correct: 0,
    fieldResults: {}
  };

  for (const [field, expectedValue] of Object.entries(expected)) {
    results.total++;
    
    const actualValue = actual[field];
    let isCorrect = false;

    if (Array.isArray(expectedValue)) {
      // For arrays (trustees, etc.), check if all expected values are present
      isCorrect = Array.isArray(actualValue) && 
                 expectedValue.every(val => 
                   actualValue.some(actVal => 
                     actVal.toLowerCase().includes(val.toLowerCase())
                   )
                 );
    } else {
      // For strings, check if actual contains expected (case insensitive)
      isCorrect = actualValue && 
                 actualValue.toLowerCase().includes(expectedValue.toLowerCase());
    }

    if (isCorrect) results.correct++;
    
    results.fieldResults[field] = {
      expected: expectedValue,
      actual: actualValue,
      correct: isCorrect
    };
  }

  results.accuracy = results.correct / results.total;
  return results;
}

// Run tests
async function runTests() {
  console.log('🧪 AI EXTRACTION TESTING FRAMEWORK');
  console.log('==================================\n');

  const overallResults = {
    totalTests: 0,
    totalFields: 0,
    correctFields: 0,
    testResults: []
  };

  for (const testCase of testCases) {
    console.log(`Testing: ${testCase.file}`);
    console.log('-'.repeat(40));

    try {
      // Read test document
      const filePath = path.join(__dirname, 'test-documents', testCase.file);
      const documentText = fs.readFileSync(filePath, 'utf8');
      
      // Run AI extraction
      const extracted = simulateAIExtraction(documentText);
      
      // Calculate accuracy
      const accuracy = calculateAccuracy(testCase.expected, extracted);
      
      // Display results
      console.log(`Overall Accuracy: ${(accuracy.accuracy * 100).toFixed(1)}%`);
      console.log(`AI Confidence: ${(extracted.confidence * 100).toFixed(1)}%\n`);
      
      // Field-by-field results
      for (const [field, result] of Object.entries(accuracy.fieldResults)) {
        const status = result.correct ? '✅' : '❌';
        console.log(`${status} ${field}:`);
        console.log(`   Expected: ${JSON.stringify(result.expected)}`);
        console.log(`   Actual:   ${JSON.stringify(result.actual)}`);
        if (!result.correct) {
          console.log(`   ⚠️  MISMATCH DETECTED`);
        }
        console.log();
      }

      // Update overall results
      overallResults.totalTests++;
      overallResults.totalFields += accuracy.total;
      overallResults.correctFields += accuracy.correct;
      overallResults.testResults.push({
        file: testCase.file,
        accuracy: accuracy.accuracy,
        confidence: extracted.confidence
      });

    } catch (error) {
      console.log(`❌ Error testing ${testCase.file}: ${error.message}\n`);
    }

    console.log('='.repeat(50) + '\n');
  }

  // Overall summary
  const overallAccuracy = overallResults.correctFields / overallResults.totalFields;
  console.log('📊 OVERALL RESULTS');
  console.log('==================');
  console.log(`Total Tests: ${overallResults.totalTests}`);
  console.log(`Total Fields: ${overallResults.totalFields}`);
  console.log(`Correct Fields: ${overallResults.correctFields}`);
  console.log(`Overall Accuracy: ${(overallAccuracy * 100).toFixed(1)}%`);
  
  console.log('\n📈 TEST SUMMARY:');
  overallResults.testResults.forEach(result => {
    console.log(`${result.file}: ${(result.accuracy * 100).toFixed(1)}% accuracy, ${(result.confidence * 100).toFixed(1)}% confidence`);
  });

  // Performance goals
  console.log('\n🎯 PERFORMANCE GOALS:');
  console.log(`Target Accuracy: 95%`);
  console.log(`Current Accuracy: ${(overallAccuracy * 100).toFixed(1)}%`);
  
  if (overallAccuracy >= 0.95) {
    console.log('🎉 TARGET ACHIEVED! AI is ready for production.');
  } else {
    console.log('🔧 Need improvement. Focus on failed extractions.');
  }
}

// Export for use
module.exports = {
  runTests,
  calculateAccuracy,
  testCases
};

// Run tests if called directly
if (require.main === module) {
  runTests().catch(console.error);
}