import fs from 'fs';
let c = fs.readFileSync('src/App.tsx', 'utf8');

c = c.replace(/\$\{"([^"]*?)\$\{(.*?)\}(.*?)"\}/gs, (match, prefix, expr, suffix) => {
  return prefix + "${" + expr + "}" + suffix;
});

fs.writeFileSync('src/App.tsx', c);
