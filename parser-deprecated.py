import os
import re
import json
import codecs
import shutil
import pandas as pd
from bs4 import BeautifulSoup
from pathlib import Path

dir_home = str(Path.home())
bookmarks = os.path.join(dir_home, 'Documents', 'bookmarks.html')
dir_cwd = os.getcwd()
source = os.path.join(dir_cwd, 'unparsed.html')
shutil.copy(bookmarks, source)

with open(source, 'r', encoding='utf-8') as f:
    print('Pulling papers from bookmarks...')
    links = []
    html = f.read()
    soup = BeautifulSoup(html, 'html.parser')
    p_h3 = soup.find('h3', string='HTML_PARSE_HERE')
    if p_h3 is not None:
        p_dl = p_h3.find_next_sibling('dl')
        if p_dl is not None:
            anchor_tags = p_dl.find_all('a')
            for a in anchor_tags:
                row = {}
                row['url'] = a['href']
                row['title'] = a.text
                links.append(row)
    papers = sorted(links, key=lambda x: x['title'])

def stripTitle(infile):
    with open(infile, 'r+', encoding='utf-8') as f:
        content = f.read()
        content = re.sub(r'^[\w\s]+\s?\|\s?', '', content, flags=re.MULTILINE)
        content = re.sub(r'\s?[|-]\s?[\w\d\s,]+$', '', content, flags=re.MULTILINE)
        f.seek(0)
        f.write(content)
        f.truncate()

outputFormat = input("Enter output format (html/json/md): ")
if outputFormat == 'html':
    with open('parsed.html', 'w', encoding='utf-8') as f:
        f.write('<table>\n')
        for paper in papers:
            f.write(
                f'<tr><td><a href="{paper["url"]}">{paper["title"]}</a></td></tr>\n')
        f.write('\n</table>')
    with open('parsed.html', 'r', encoding='utf-8') as f:
        content = f.read()
        console.log(f.read)
        content = re.sub(r'>(\w+(-\w+)?\s\|\s) ', '>', content)
        content = re.sub(r'\s-\s\w+<|\s\|\s(\+w((-|\s)\w+)?)< ', '<', content)
    with open('parsed.html', 'w', encoding='utf-8') as f:
        f.write(content)
    stripTitle('parsed.html')
    print('Output saved to parsed.html')
elif outputFormat == 'md':
    with open('table.md', 'w', encoding='utf-8') as f:
        for paper in papers:
            f.write(f'* [{paper["title"]}]({paper["url"]})\n')
    print("Output saved as table.md")
elif outputFormat == 'json':
    json_data = [{"id": index + 1, "title": paper["title"],
                  "url": paper["url"]} for index, paper in enumerate(papers)]
    json_path = os.path.join("public", "links.json")
    with open(json_path, 'w', encoding='utf-8') as f:
        json.dump(json_data, f, indent=4)

    stripTitle(json_path)
    print('Output saved as links.json')
else:
    print('Invalid output format selected. Please try again.')
os.remove(source)
