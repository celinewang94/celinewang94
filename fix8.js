const fs = require('fs');
let text = fs.readFileSync('src/App.tsx', 'utf8');

while (text.includes('${"')) {
  text = text.replace('${"', '');
}

while (text.includes('}"}`')) {
  text = text.replace('}"}`', '} `');
}

fs.writeFileSync('src/App.tsx', text);
