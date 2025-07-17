#!/usr/bin/env python3
"""
scrape_state_forms.py

This script uses Google Custom Search API to search for 'Certification of Trust form [STATE]' for all 50 states and DC.
It downloads the top 10 results per state, saves the URLs and any PDF/form links found, and outputs a JSON file for later analysis.

Instructions:
1. Install dependencies:
   pip install requests google-api-python-client tqdm
2. Run: python scrape_state_forms.py
"""
import argparse
import json
import os
from googleapiclient.discovery import build
from tqdm import tqdm
import requests

STATES = [
    'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'District of Columbia', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'
]

DEFAULT_API_KEY = 'AIzaSyDNmmWVtHeAiMdLCykn_yX4xChDVOI5nm8'
DEFAULT_CSE_ID = 'b7c8a55dee0a94748'

parser = argparse.ArgumentParser()
parser.add_argument('--api-key', default=DEFAULT_API_KEY)
parser.add_argument('--cse-id', default=DEFAULT_CSE_ID)
parser.add_argument('--results-per-state', type=int, default=10)
args = parser.parse_args()

service = build("customsearch", "v1", developerKey=args.api_key)
all_results = {}

for state in tqdm(STATES, desc="States"):
    query = f"Certification of Trust form {state}"
    state_results = []
    for start in range(1, args.results_per_state + 1, 10):
        res = service.cse().list(q=query, cx=args.cse_id, start=start).execute()
        for item in res.get('items', []):
            url = item['link']
            pdf_link = None
            if url.lower().endswith('.pdf'):
                pdf_link = url
            else:
                # Try to find a PDF link in the snippet or page (basic)
                snippet = item.get('snippet', '')
                if '.pdf' in snippet:
                    pdf_link = snippet
            state_results.append({
                'title': item.get('title'),
                'url': url,
                'pdf_link': pdf_link
            })
    all_results[state] = state_results

with open('state_certification_form_links.json', 'w', encoding='utf-8') as f:
    json.dump(all_results, f, indent=2, ensure_ascii=False)

print("Results saved to state_certification_form_links.json") 