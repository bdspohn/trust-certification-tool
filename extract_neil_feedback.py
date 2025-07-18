import os
import pdfplumber

REFERENCE_DIR = 'reference_files'
OUTPUT_DIR = 'reference_files/extracted_texts'

os.makedirs(OUTPUT_DIR, exist_ok=True)

for filename in os.listdir(REFERENCE_DIR):
    if filename.lower().endswith('.pdf'):
        pdf_path = os.path.join(REFERENCE_DIR, filename)
        txt_path = os.path.join(OUTPUT_DIR, filename.replace('.pdf', '.txt'))
        print(f'Extracting {pdf_path}...')
        with pdfplumber.open(pdf_path) as pdf:
            all_text = ''
            for page in pdf.pages:
                all_text += page.extract_text() or ''
                all_text += '\n\n'
        with open(txt_path, 'w', encoding='utf-8') as f:
            f.write(all_text)
        print(f'Saved extracted text to {txt_path}') 