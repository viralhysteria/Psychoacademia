const cat = [
  {
    r: /mdma|keta.+/i,
    // \d{1,4}-([\w+\-,]+)?|
    i: ["fa-pills"],
  },
  {
    r: /sugar|exercise/i,
    i: ["fa-dumbbell"],
  },
  {
    r: /psychedelic(s)?/i,
    i: ["fa-rainbow"],
  },
  {
    r: /alcohol|ethanol/i,
    i: ["fa-wine-glass"],
  },
  {
    r: /psiloc(yb)?in|salvi(a|norin)/i,
    i: ["fa-leaf"],
  },
  {
    r: /lys.+\sacid\sdieth.+|(1p-)?lsd/i,
    i: ["fa-eye"],
  },
  {
    r: /(n,n-)?d(i)?m(ethyl)?t(tryp.+)?|harmal(a|ine)/i,
    i: ["fa-hat-wizard"],
  },
  {
    r: /consc.+|nerv.+\ssys.+|dna|brain|gr(a|e)y(-|\s)ma.+|bdnf|5(-)?ht/i,
    i: ["fa-brain"],
  },
  {
    r: /t(etra)?h(ydro)?c(annabinol)?|(?!synthetic\s)cannabi(noid|s)?(s)?|marij.+/i,
    i: ["fa-cannabis"],
  },
];