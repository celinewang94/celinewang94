const fs = require('fs');
let text = fs.readFileSync('src/App.tsx', 'utf8');

text = text.split('\\${"').join('');
text = text.split('${"').join('');

text = text.split('}"}`').join('}`');

fs.writeFileSync('src/App.tsx', text);
