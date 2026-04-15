from bs4 import BeautifulSoup
from pathlib import Path

html_path = Path('/home/ubuntu/browser_html/edwardsamps_com_index.html_1776284769771.html')
html = html_path.read_text(encoding='utf-8')
soup = BeautifulSoup(html, 'html.parser')

for img in soup.find_all('img'):
    src = img.get('src')
    alt = img.get('alt')
    title = img.get('title')
    if src:
        print(f'SRC: {src}')
        if alt:
            print(f'ALT: {alt}')
        if title:
            print(f'TITLE: {title}')
        print('---')
