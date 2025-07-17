#!/usr/bin/env python3
"""
Enhanced Certification of Trust Scraper

This script scrapes comprehensive data about Certification of Trust forms,
requirements, and best practices from multiple sources to optimize the user flow.
"""

import requests
import json
import time
from bs4 import BeautifulSoup
from urllib.parse import urljoin, urlparse
import re

class EnhancedTrustScraper:
    def __init__(self):
        self.session = requests.Session()
        self.session.headers.update({
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        })
        self.data = {
            'state_requirements': {},
            'financial_institutions': {},
            'best_practices': [],
            'common_errors': [],
            'form_templates': {},
            'legal_requirements': {}
        }

    def scrape_financial_institution_forms(self):
        """Scrape forms from major financial institutions"""
        institutions = [
            {
                'name': 'Capital One',
                'url': 'https://www.capitalone.com/help/checking-savings/trust-accounts/',
                'form_pattern': r'certification.*trust|trust.*certification'
            },
            {
                'name': 'Merrill Lynch',
                'url': 'https://olui2.fs.ml.com/publish/content/application/pdf/gwmol/trustee_certification_form.pdf',
                'form_pattern': r'certification.*trust|trust.*certification'
            },
            {
                'name': 'Fidelity',
                'url': 'https://www.fidelity.com/bin-public/060_www_fidelity_com/documents/customer-service/CERT_OF_TRUST.pdf',
                'form_pattern': r'certification.*trust|trust.*certification'
            },
            {
                'name': 'Vanguard',
                'url': 'https://investor.vanguard.com/investor-resources-education/online-tools/forms',
                'form_pattern': r'certification.*trust|trust.*certification'
            },
            {
                'name': 'Charles Schwab',
                'url': 'https://www.schwab.com/resource/legal/trust-account-forms',
                'form_pattern': r'certification.*trust|trust.*certification'
            }
        ]

        for institution in institutions:
            try:
                print(f"Scraping {institution['name']}...")
                response = self.session.get(institution['url'], timeout=10)
                if response.status_code == 200:
                    soup = BeautifulSoup(response.content, 'html.parser')
                    text = soup.get_text()
                    
                    # Extract form requirements
                    requirements = self.extract_form_requirements(text)
                    self.data['financial_institutions'][institution['name']] = {
                        'url': institution['url'],
                        'requirements': requirements,
                        'form_fields': self.extract_form_fields(text)
                    }
                    
                    time.sleep(2)  # Be respectful
                    
            except Exception as e:
                print(f"Error scraping {institution['name']}: {e}")

    def scrape_state_requirements(self):
        """Scrape state-specific requirements"""
        state_urls = [
            {
                'state': 'California',
                'url': 'https://law.justia.com/codes/california/2011/prob/18100-18100.5.html',
                'code': 'CA'
            },
            {
                'state': 'Texas',
                'url': 'https://codes.findlaw.com/tx/property-code/prop-sect-114-086.html',
                'code': 'TX'
            },
            {
                'state': 'New York',
                'url': 'https://law.justia.com/codes/new-york/2010/est-pow-trust/7-2-4/7-2-4-1.html',
                'code': 'NY'
            },
            {
                'state': 'Florida',
                'url': 'https://law.justia.com/codes/florida/2011/title-42/chapter-736/part-x/section-736-1017/',
                'code': 'FL'
            },
            {
                'state': 'Illinois',
                'url': 'https://www.ilga.gov/legislation/ilcs/documents/076000030K1013.htm',
                'code': 'IL'
            }
        ]

        for state_info in state_urls:
            try:
                print(f"Scraping {state_info['state']} requirements...")
                response = self.session.get(state_info['url'], timeout=10)
                if response.status_code == 200:
                    soup = BeautifulSoup(response.content, 'html.parser')
                    text = soup.get_text()
                    
                    requirements = self.extract_legal_requirements(text)
                    self.data['state_requirements'][state_info['code']] = {
                        'state': state_info['state'],
                        'requirements': requirements,
                        'statute_url': state_info['url']
                    }
                    
                    time.sleep(2)
                    
            except Exception as e:
                print(f"Error scraping {state_info['state']}: {e}")

    def scrape_best_practices(self):
        """Scrape best practices and common errors"""
        practice_urls = [
            'https://trustandwill.com/learn/certificate-of-trust',
            'https://www.legalzoom.com/articles/certificate-of-trust-what-you-need-to-know',
            'https://www.nolo.com/legal-encyclopedia/certificate-trust.html',
            'https://www.rocketlawyer.com/legal-guide/certificate-of-trust',
            'https://www.lawdepot.com/contracts/certificate-of-trust/'
        ]

        for url in practice_urls:
            try:
                print(f"Scraping best practices from {url}")
                response = self.session.get(url, timeout=10)
                if response.status_code == 200:
                    soup = BeautifulSoup(response.content, 'html.parser')
                    text = soup.get_text()
                    
                    practices = self.extract_best_practices(text)
                    errors = self.extract_common_errors(text)
                    
                    self.data['best_practices'].extend(practices)
                    self.data['common_errors'].extend(errors)
                    
                    time.sleep(2)
                    
            except Exception as e:
                print(f"Error scraping {url}: {e}")

    def extract_form_requirements(self, text):
        """Extract form requirements from text"""
        requirements = []
        
        # Look for common requirement patterns
        patterns = [
            r'required.*field[s]?',
            r'must.*include',
            r'necessary.*information',
            r'essential.*details',
            r'required.*information'
        ]
        
        for pattern in patterns:
            matches = re.findall(pattern, text, re.IGNORECASE)
            requirements.extend(matches)
            
        return list(set(requirements))

    def extract_form_fields(self, text):
        """Extract form field requirements"""
        fields = []
        
        # Common field patterns
        field_patterns = [
            r'trust.*name',
            r'grantor.*name',
            r'trustee.*name',
            r'date.*trust',
            r'tax.*identification',
            r'powers.*trustee',
            r'revocability',
            r'governing.*law'
        ]
        
        for pattern in field_patterns:
            matches = re.findall(pattern, text, re.IGNORECASE)
            fields.extend(matches)
            
        return list(set(fields))

    def extract_legal_requirements(self, text):
        """Extract legal requirements from statute text"""
        requirements = []
        
        # Look for legal requirement patterns
        patterns = [
            r'shall.*include',
            r'must.*contain',
            r'required.*to.*include',
            r'certification.*shall',
            r'statute.*requires'
        ]
        
        for pattern in patterns:
            matches = re.findall(pattern, text, re.IGNORECASE)
            requirements.extend(matches)
            
        return list(set(requirements))

    def extract_best_practices(self, text):
        """Extract best practices from text"""
        practices = []
        
        # Look for best practice patterns
        patterns = [
            r'best.*practice[s]?',
            r'recommended.*to',
            r'important.*to',
            r'should.*include',
            r'advised.*to',
            r'ensure.*that'
        ]
        
        for pattern in patterns:
            matches = re.findall(pattern, text, re.IGNORECASE)
            practices.extend(matches)
            
        return list(set(practices))

    def extract_common_errors(self, text):
        """Extract common errors from text"""
        errors = []
        
        # Look for error patterns
        patterns = [
            r'common.*error[s]?',
            r'avoid.*mistake[s]?',
            r'frequent.*error[s]?',
            r'typical.*problem[s]?',
            r'incorrect.*information'
        ]
        
        for pattern in patterns:
            matches = re.findall(pattern, text, re.IGNORECASE)
            errors.extend(matches)
            
        return list(set(errors))

    def scrape_ai_flow_requirements(self):
        """Scrape requirements for AI-powered document processing"""
        ai_urls = [
            'https://www.docparser.com/blog/document-processing/',
            'https://www.affinda.com/blog/document-ai/',
            'https://www.rossum.ai/blog/document-processing/',
            'https://www.instabase.com/solutions/document-processing'
        ]

        for url in ai_urls:
            try:
                print(f"Scraping AI flow requirements from {url}")
                response = self.session.get(url, timeout=10)
                if response.status_code == 200:
                    soup = BeautifulSoup(response.content, 'html.parser')
                    text = soup.get_text()
                    
                    # Extract AI processing requirements
                    ai_requirements = self.extract_ai_requirements(text)
                    self.data['ai_requirements'] = ai_requirements
                    
                    time.sleep(2)
                    
            except Exception as e:
                print(f"Error scraping {url}: {e}")

    def extract_ai_requirements(self, text):
        """Extract AI processing requirements"""
        requirements = []
        
        # Look for AI processing patterns
        patterns = [
            r'document.*processing',
            r'extract.*information',
            r'parse.*document',
            r'ocr.*requirements',
            r'data.*extraction',
            r'field.*mapping'
        ]
        
        for pattern in patterns:
            matches = re.findall(pattern, text, re.IGNORECASE)
            requirements.extend(matches)
            
        return list(set(requirements))

    def scrape_esignature_requirements(self):
        """Scrape e-signature and notarization requirements"""
        esign_urls = [
            'https://www.docusign.com/blog/electronic-signatures-legal-requirements',
            'https://www.notarize.com/learn/online-notarization-requirements',
            'https://www.hellosign.com/blog/electronic-signature-laws',
            'https://www.adobesign.com/en/signature-requirements'
        ]

        for url in esign_urls:
            try:
                print(f"Scraping e-signature requirements from {url}")
                response = self.session.get(url, timeout=10)
                if response.status_code == 200:
                    soup = BeautifulSoup(response.content, 'html.parser')
                    text = soup.get_text()
                    
                    # Extract e-signature requirements
                    esign_requirements = self.extract_esignature_requirements(text)
                    self.data['esignature_requirements'] = esign_requirements
                    
                    time.sleep(2)
                    
            except Exception as e:
                print(f"Error scraping {url}: {e}")

    def extract_esignature_requirements(self, text):
        """Extract e-signature requirements"""
        requirements = []
        
        # Look for e-signature patterns
        patterns = [
            r'electronic.*signature',
            r'e.*signature',
            r'digital.*signature',
            r'online.*notarization',
            r'remote.*notarization',
            r'legal.*requirements'
        ]
        
        for pattern in patterns:
            matches = re.findall(pattern, text, re.IGNORECASE)
            requirements.extend(matches)
            
        return list(set(requirements))

    def run_comprehensive_scrape(self):
        """Run all scraping functions"""
        print("Starting comprehensive Certification of Trust scraping...")
        
        self.scrape_financial_institution_forms()
        self.scrape_state_requirements()
        self.scrape_best_practices()
        self.scrape_ai_flow_requirements()
        self.scrape_esignature_requirements()
        
        # Save the comprehensive data
        with open('comprehensive_trust_data.json', 'w') as f:
            json.dump(self.data, f, indent=2)
            
        print("Comprehensive scraping completed. Data saved to comprehensive_trust_data.json")
        
        return self.data

if __name__ == "__main__":
    scraper = EnhancedTrustScraper()
    data = scraper.run_comprehensive_scrape()
    print(f"Scraped data for {len(data['state_requirements'])} states")
    print(f"Found {len(data['financial_institutions'])} financial institutions")
    print(f"Collected {len(data['best_practices'])} best practices")
    print(f"Identified {len(data['common_errors'])} common errors") 