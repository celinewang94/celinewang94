import fs from 'fs';
let c = fs.readFileSync('src/App.tsx', 'utf8');

c = c.split('${"').join('');
c = c.split('"}`').join('`');

fs.writeFileSync('src/App.tsx', c);
