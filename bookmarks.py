import os
import re
import json
import codecs
import pandas as pd
from bs4 import BeautifulSoup
from pathlib import Path

# JSON extraction
def createJson():
    with open('..\\table.html', 'r', encoding='utf-8') as f:
        html = f.read()

        soup = BeautifulSoup(html, 'html.parser')
        table = soup.find('table')
        if table is not None:
            tr = table.find('tr')
            if tr is not None:
                td = tr.find('td')
                if td is not None:
                    a = td.find('a')
                    if a is not None:
                        row = {}
                        row['url'] = a['href']
                        row['title'] = a.text
                        links.append(row)
                        print(links)
    with codecs.open('..\\links.json', 'w', encoding='utf-8') as f:
        json.dump(links, f)

# HTML Parser
home = str(Path.home())
bookmarks = os.path.join(home, 'Documents', 'bookmarks.html')

with open(bookmarks, 'r', encoding='utf-8') as f:
    soup = BeautifulSoup(f, 'html.parser')
    container = soup.find('h3', text='Papers')
    papers = container.find_all_next('a')

papers = sorted(papers, key=lambda x: x.text)

output = input("Enter output format (html or md): ")
if output == 'html':
    with open('..\\table.html', 'r+', encoding='utf-8') as f:
        f.write('<table>\n')
        for paper in papers:
            f.write(f'<tr><td><a href="{paper["href"]}">{paper.text}</a></td></tr>\n')
        f.write('\n</table>')
        f.seek(0)
        content = f.read()
        content = re.sub(r'>(\w+(-\w+)?\s\|\s) ', '>', content)
        content = re.sub(r'\s-\s\w+<|\s\|\s(\w+((-|\s)\w+)?)< ', '<', content)
        f.seek(0)
        f.write(content)
        f.truncate()
        print("Output saved as table.html")
        print("Creating JSON library...")
        createJson()
elif output == 'md':
    with open('..\\table.md', 'w', encoding='utf-8') as f:
        for paper in papers:
            f.write(f'* [{paper.text}]({paper["href"]})\n')
    print("Output saved as table.md")
else:
    print("Invalid output format. Please enter 'html' or 'md'.")
