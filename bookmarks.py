import pandas as pd
from bs4 import BeautifulSoup

# Script used for *partial* parsing of Chrome bookmarks .html export (i'm lazy)

# Read input file and extract contents of the paper div
with open('..\\..\\bookmarks.html', 'r', encoding='utf-8') as f:
    soup = BeautifulSoup(f, 'html.parser')
    paper_div = soup.find('div', {'id': 'papers'})
    paper_links = paper_div.find_all('a')

# Sort the links alphabetically by title
paper_links = sorted(paper_links, key=lambda x: x.text)

# Ask user for output format and write the links to the output file
output_format = input("Enter output format (html or md): ")
if output_format == 'html':
    with open('table.html', 'w', encoding='utf-8') as f:
        f.write('<table>')
        for link in paper_links:
            f.write(f'<tr><td><a href="{link["href"]}">{link.text}</a></td></tr>')
        f.write('</table>')
    print("Output saved as table.html")
elif output_format == 'md':
    with open('readme.md', 'w', encoding='utf-8') as f:
        f.write('# paper Links\n\n')
        for link in paper_links:
            f.write(f'* [{link.text}]({link["href"]})\n')
    print("Output saved as readme.md")
else:
    print("Invalid output format. Please enter 'html' or 'md'.")

