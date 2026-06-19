from pathlib import Path
from zipfile import ZipFile
import xml.etree.ElementTree as ET

path = Path(r'C:\Users\Najma\OneDrive\Desktop\Z  TASK\Ziyan_Patel_Resume_Professional.docx')

with ZipFile(path) as zf:
    root = ET.fromstring(zf.read('word/document.xml'))

ns = {'w': 'http://schemas.openxmlformats.org/wordprocessingml/2006/main'}
paragraphs = []
for p in root.findall('.//w:p', ns):
    texts = [t.text for t in p.findall('.//w:t', ns) if t.text]
    para = ''.join(texts)
    if para.strip():
        paragraphs.append(para)

out_path = Path(r'C:\Users\Najma\OneDrive\Desktop\Z  TASK\resume_text.txt')
out_path.write_text('\n'.join(paragraphs), encoding='utf-8')
print(f'Wrote {len(paragraphs)} lines to {out_path}')
for i, line in enumerate(paragraphs, 1):
    print(f'{i}: {line}')
