const CATEGORIES = [
  { r: /mdma|keta.+/i, i: ["fa-pills"] },
  { r: /sugar|exercise/i, i: ["fa-dumbbell"] },
  { r: /psychedelic(s)?/i, i: ["fa-rainbow"] },
  { r: /alcohol|ethanol/i, i: ["fa-wine-glass"] },
  { r: /psiloc(yb)?in|salvi(a|norin)/i, i: ["fa-leaf"] },
  { r: /lys.+\sacid\sdieth.+|(1p-)?lsd/i, i: ["fa-eye"] },
  { r: /(n,n-)?d(i)?m(ethyl)?t(ryp.+)?|harmal(a|ine)/i, i: ["fa-hat-wizard"] },
  {
    r: /consc.+|nerv.+\ssys.+|dna|brain|gr(a|e)y(-|\s)ma.+|bdnf|5(-)?ht/i,
    i: ["fa-brain"],
  },
  {
    r: /t(etra)?h(ydro)?c(annabinol)?|(?!synthetic\s)cannabi(noid|s)?(s)?|marij.+/i,
    i: ["fa-cannabis"],
  },
];

const DEFAULT_ICON = "fa-newspaper";

function categorizePapers(links, papers) {
  links.forEach((link) => link.setAttribute("target", "_blank"));

  const fragment = document.createDocumentFragment();

  papers.forEach((paper) => {
    const text = paper.textContent;
    const matchedIcons = [];

    for (const { r, i } of CATEGORIES) {
      if (r.test(text)) {
        matchedIcons.push(...i);
      }
    }

    if (matchedIcons.length > 0) {
      const container = document.createElement("div");
      container.className = "fa-container";
      container.style.cssText = "display: inline-flex";

      matchedIcons.forEach((iconClass) => {
        const icon = document.createElement("i");
        icon.className = `fas ${iconClass}`;
        container.appendChild(icon);
      });

      paper.insertAdjacentElement("beforebegin", container);
    } else {
      const icon = document.createElement("i");
      icon.className = `fas ${DEFAULT_ICON}`;
      paper.insertAdjacentElement("beforebegin", icon);
    }
  });
}
