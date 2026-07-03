const fs = require('fs');
let code = fs.readFileSync('src/utils/fileParser.ts', 'utf8');

// Update normalizeToParagraphs to accept chapterTitle and filter it out
code = code.replace(
  /export const normalizeToParagraphs = \(html: string\): string => \{/,
  "export const normalizeToParagraphs = (html: string, chapterTitle?: string): string => {"
);

const normFind = `  return text.split(/\\n+/)
    .map(p => p.trim())
    .filter(p => p.length > 0)
    .map(p => \`<p>\${p}</p>\`)
    .join('');
};`;

const normReplace = `  let paragraphs = text.split(/\\n+/)
    .map(p => p.trim())
    .filter(p => p.length > 0);
    
  if (chapterTitle && paragraphs.length > 0) {
    const cleanTitle = chapterTitle.toLowerCase().replace(/[\\s\\W_]+/g, '');
    let cleanFirstPara = paragraphs[0].toLowerCase().replace(/[\\s\\W_]+/g, '');
    if (cleanTitle && cleanFirstPara && cleanFirstPara === cleanTitle) {
      paragraphs.shift();
    }
  }

  return paragraphs.map(p => \`<p>\${p}</p>\`).join('');
};`;

code = code.replace(normFind, normReplace);

// Update calls to normalizeToParagraphs
code = code.replace(/normalizeToParagraphs\(currentContent\.join\(''\)\)/g, "normalizeToParagraphs(currentContent.join(''), currentTitle)");
code = code.replace(/normalizeToParagraphs\(html\)/g, "normalizeToParagraphs(html, 'Chương 1')");
code = code.replace(/normalizeToParagraphs\(contentHtml\)/g, "normalizeToParagraphs(contentHtml, title)");


// Also update parseEpub to remove the heading element from the DOM
const epubFind = `        let foundHeading = false;
        for (const h of Array.from(headings)) {
          const text = (h.textContent || '').trim();
          if (text) {
            title = text;
            foundHeading = true;
            break;
          }
        }
        if (!foundHeading) {
          const p = Array.from(doc.querySelectorAll('p, div, span, b, strong')).find(el => {
            const text = (el.textContent || '').trim();
            return chapterRegex.test(text) && text.length < 150;
          });
          if (p && p.textContent) {
             title = p.textContent.trim();
          }
        }`;

const epubReplace = `        let foundHeading = false;
        let headingToRemove = null;
        for (const h of Array.from(headings)) {
          const text = (h.textContent || '').trim();
          if (text) {
            title = text;
            foundHeading = true;
            if (h.tagName.toLowerCase() !== 'title') {
                headingToRemove = h;
            }
            break;
          }
        }
        
        if (headingToRemove) {
            headingToRemove.remove();
        }
        
        if (!foundHeading) {
          const p = Array.from(doc.querySelectorAll('p, div, span, b, strong')).find(el => {
            const text = (el.textContent || '').trim();
            return chapterRegex.test(text) && text.length < 150;
          });
          if (p && p.textContent) {
             title = p.textContent.trim();
             p.remove();
          }
        }`;

code = code.replace(epubFind, epubReplace);

fs.writeFileSync('src/utils/fileParser.ts', code);
console.log("Patched parser logic");
