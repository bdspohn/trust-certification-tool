#!/usr/bin/env python3
"""
google_trust_scraper.py

Automated Google Custom Search and Scraper for Certification of Trust Bank forms and content.

Instructions:
1. Install dependencies:
   pip install requests beautifulsoup4 google-api-python-client tqdm
2. Get a Google Custom Search API key and CSE ID (see README or ask AI for help).
3. Run: python google_trust_scraper.py --api-key YOUR_API_KEY --cse-id YOUR_CSE_ID --query "Certification of Trust Bank" --max-results 200

This script will:
- Search Google for the query (up to 200 results)
- Download PDFs/forms
- Scrape text from web pages
- Save results in 'scraped_results.json' and downloaded files in 'downloads/'
"""
import os
import re
import argparse
import requests
from urllib.parse import urlparse
from bs4 import BeautifulSoup
from googleapiclient.discovery import build
from tqdm import tqdm
import json

DOWNLOAD_DIR = 'downloads'
RESULTS_FILE = 'scraped_results.json'


def is_pdf(url):
    return url.lower().endswith('.pdf')

def download_file(url, dest_folder):
    local_filename = os.path.join(dest_folder, url.split('/')[-1].split('?')[0])
    try:
        with requests.get(url, stream=True, timeout=20) as r:
            r.raise_for_status()
            with open(local_filename, 'wb') as f:
                for chunk in r.iter_content(chunk_size=8192):
                    f.write(chunk)
        return local_filename
    except Exception as e:
        print(f"Failed to download {url}: {e}")
        return None

def scrape_text(url):
    try:
        headers = {'User-Agent': 'Mozilla/5.0'}
        resp = requests.get(url, headers=headers, timeout=20)
        resp.raise_for_status()
        soup = BeautifulSoup(resp.text, 'html.parser')
        # Remove scripts/styles
        for tag in soup(['script', 'style', 'noscript']):
            tag.decompose()
        # Get visible text
        text = ' '.join(soup.stripped_strings)
        return text[:100000]  # Limit to 100k chars
    except Exception as e:
        print(f"Failed to scrape {url}: {e}")
        return None

def google_search(query, api_key, cse_id, max_results=200):
    service = build("customsearch", "v1", developerKey=api_key)
    results = []
    for start in range(1, max_results+1, 10):
        try:
            res = service.cse().list(q=query, cx=cse_id, start=start).execute()
            items = res.get('items', [])
            results.extend(items)
            if len(items) < 10:
                break  # No more results
        except Exception as e:
            print(f"Google API error at start={start}: {e}")
            break
    return results[:max_results]

def main():
    parser = argparse.ArgumentParser(description="Google Custom Search Scraper for Trust Certifications")
    parser.add_argument('--api-key', required=True, help='Google Custom Search API key')
    parser.add_argument('--cse-id', required=True, help='Google Custom Search Engine ID (cx)')
    parser.add_argument('--query', default='Certification of Trust Bank', help='Search query')
    parser.add_argument('--max-results', type=int, default=200, help='Max results to fetch (up to 200)')
    args = parser.parse_args()

    os.makedirs(DOWNLOAD_DIR, exist_ok=True)
    print(f"Searching Google for: {args.query}")
    search_results = google_search(args.query, args.api_key, args.cse_id, args.max_results)
    print(f"Found {len(search_results)} results.")

    all_data = []
    for item in tqdm(search_results, desc="Processing results"):
        url = item.get('link')
        title = item.get('title')
        snippet = item.get('snippet')
        data = {'url': url, 'title': title, 'snippet': snippet}
        if is_pdf(url):
            filepath = download_file(url, DOWNLOAD_DIR)
            data['pdf_path'] = filepath
        else:
            text = scrape_text(url)
            data['scraped_text'] = text
        all_data.append(data)

    with open(RESULTS_FILE, 'w', encoding='utf-8') as f:
        json.dump(all_data, f, ensure_ascii=False, indent=2)
    print(f"Results saved to {RESULTS_FILE}")

if __name__ == '__main__':
    main() 