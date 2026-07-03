import fs from 'fs';

let lines = fs.readFileSync('src/theme.css', 'utf8').split('\n');

const startIdx = lines.findIndex(l => l.includes('/* HERO SLIDESHOW */'));
const endIdx = lines.findIndex((l, i) => i > startIdx && l.startsWith('.two-col {'));

if (startIdx !== -1 && endIdx !== -1) {
    lines.splice(startIdx, endIdx - startIdx);
    fs.writeFileSync('src/theme.css', lines.join('\n'));
}

