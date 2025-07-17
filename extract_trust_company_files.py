import os
from pathlib import Path
from docx import Document
from pdfminer.high_level import extract_text as extract_pdf_text

BASE_DIR = os.path.expanduser('~/Desktop/Trust Company Files')
OUTPUT_DIR = os.path.join(BASE_DIR, 'extracted_text')
os.makedirs(OUTPUT_DIR, exist_ok=True)


def extract_docx(file_path):
    doc = Document(file_path)
    return '\n'.join([para.text for para in doc.paragraphs])

def extract_pdf(file_path):
    try:
        return extract_pdf_text(file_path)
    except Exception as e:
        return f"[ERROR extracting PDF: {e}]"

def save_text(text, out_path):
    with open(out_path, 'w', encoding='utf-8') as f:
        f.write(text)

def process_file(file_path):
    ext = file_path.suffix.lower()
    rel_path = file_path.relative_to(BASE_DIR)
    out_path = Path(OUTPUT_DIR) / rel_path.with_suffix('.txt')
    out_path.parent.mkdir(parents=True, exist_ok=True)
    if ext == '.docx':
        text = extract_docx(str(file_path))
        save_text(text, out_path)
        print(f"Extracted DOCX: {rel_path}")
    elif ext == '.pdf':
        text = extract_pdf(str(file_path))
        save_text(text, out_path)
        print(f"Extracted PDF: {rel_path}")


def main():
    for root, dirs, files in os.walk(BASE_DIR):
        for file in files:
            if file.lower().endswith(('.docx', '.pdf')) and not file.startswith('~$'):
                file_path = Path(root) / file
                process_file(file_path)

if __name__ == '__main__':
    main()
    print(f"Extraction complete. All text files saved to {OUTPUT_DIR}") 