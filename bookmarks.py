import os
import re
import json
import codecs
import pandas as pd
from bs4 import BeautifulSoup
from pathlib import Path

# JSON extraction


import json
import codecs
from bs4 import BeautifulSoup
import os
from pathlib import Path

def createJson(links):
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
                        row['title'] = a.text
                        row['url'] = a['href']
                        links.append(row)
                        print(links)
    with codecs.open('..\\links.json', 'w', encoding='utf-8') as f:
        json.dump(links, f)
    pass


# HTML Parser
home = str(Path.home())
bookmarks = os.path.join(home, 'Documents', 'bookmarks.html')

with open(bookmarks, 'r', encoding='utf-8') as f:
    links = []
    html = f.read()
    soup = BeautifulSoup(html, 'html.parser')
    p_h3 = soup.find('h3', text='Papers')
    if p_h3 is not None:
        p_dl = p_h3.find_next_sibling('dl')
        if p_dl is not None:
            anchor_tags = p_dl.find_all('a')
            for a in anchor_tags:
                row = {}
                row['url'] = a['href']
                row['title'] = a.text
                links.append(row)
            print(links)

    with codecs.open('..\\links.json', 'w', encoding='utf-8') as f:
        json.dump(links, f)

    papers = sorted(links, key=lambda x: x['title'])  # Sort the links based on title

output = input("Enter output format (html or md): ")
if output == 'html':
    with open('..\\table.html', 'r+', encoding='utf-8') as f:
        f.write('<table>\n')
        for paper in papers:
            f.write(
                f'<tr><td><a href="{paper["url"]}">{paper["title"]}</a></td></tr>\n')
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
        createJson(links)
elif output == 'md':
    with open('..\\table.md', 'w', encoding='utf-8') as f:
        for paper in papers:
            f.write(f'* [{paper["title"]}]({paper["url"]})\n')
    print("Output saved as table.md")
else:
    print("Invalid output format. Please enter 'html' or 'md'.")