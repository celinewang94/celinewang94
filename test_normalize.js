function normalizeToParagraphs(html) {
  if (!html) return '';
  let text = html
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<\/p>/gi, '\n')
    .replace(/<\/div>/gi, '\n')
    .replace(/<\/h[1-6]>/gi, '\n')
    .replace(/<\/li>/gi, '\n')
    .replace(/<[^>]+>/g, '');
    
  return text.split(/\n+/)
    .map(p => p.trim())
    .filter(p => p.length > 0)
    .map(p => `<p>${p}</p>`)
    .join('\n');
}

console.log(normalizeToParagraphs("<p>Hello</p><p>World</p>"));
console.log(normalizeToParagraphs("<div>Hello<br>World</div>"));
console.log(normalizeToParagraphs("Hello\n\nWorld\n  \nTest"));
