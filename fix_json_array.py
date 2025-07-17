#!/usr/bin/env python3
"""
fix_json_array.py

This script fixes a malformed JSON file (like 'scraped_results.json') that contains multiple JSON objects not wrapped in an array.
It outputs a valid JSON array to 'scraped_results_fixed.json'.

How to use:
1. Make sure 'scraped_results.json' is in the same folder as this script.
2. Run: python fix_json_array.py
3. The fixed file will be saved as 'scraped_results_fixed.json'.
"""
import json

input_file = 'scraped_results.json'
output_file = 'scraped_results_fixed.json'

objects = []
with open(input_file, 'r', encoding='utf-8') as f:
    buffer = ''
    for line in f:
        line = line.strip()
        if not line:
            continue
        buffer += line
        # Try to parse a JSON object from the buffer
        try:
            obj = json.loads(buffer)
            objects.append(obj)
            buffer = ''
        except json.JSONDecodeError:
            # Not a complete object yet, keep reading
            buffer += ' '

# Write as a valid JSON array
with open(output_file, 'w', encoding='utf-8') as f:
    json.dump(objects, f, indent=2, ensure_ascii=False)

print(f"Fixed JSON written to {output_file}") 