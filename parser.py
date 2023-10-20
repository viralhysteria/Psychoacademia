import os
import re
import json
import codecs
import shutil
import pandas as pd
from bs4 import BeautifulSoup
from pathlib import Path

os_home = str(Path.home())
bookmarks = os.path.join(os_home, 'Documents', 'bookmarks.html')
os_cwd = os.getcwd()
source = os.path.join(os_cwd, 'unparsed.html')
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

    with codecs.open('..\\links.json', 'w', encoding='utf-8') as f:
        json.dump(links, f)

    papers = sorted(links, key=lambda x: x['title'])

output = input("Enter output format (html/json/md): ")
if output == 'html':
    with open('table.html', 'r+', encoding='utf-8') as f:
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
elif output == 'md':
    with open('table.md', 'w', encoding='utf-8') as f:
        for paper in papers:
            f.write(f'* [{paper["title"]}]({paper["url"]})\n')
    print("Output saved as table.md")
elif output == 'json':
    json_data = []
    json_path = os.path.join("public", "links.json")
    for index, paper in enumerate(papers):
        json_data.append({"id": index + 1, "title": paper["title"], "url": paper["url"]})
    with open(json_path, 'w', encoding='utf-8') as f:
        json.dump(json_data, f, indent=4)
    print("Output saved as links.json")
else:
    print("Invalid output format selected. Please try again.")
os.remove(source)
