import fs from 'fs';

let content = fs.readFileSync('src/components/HomeView.tsx', 'utf8');

// novel-player-card wrapping tag
content = content.replace(/shadow-md /g, '');
content = content.replace(/dark:shadow-md\/20 /g, '');
content = content.replace(/hover:shadow-lg /g, '');
content = content.replace(/dark:hover:shadow-lg\/20"/g, '"');

// children
content = content.replace(/shadow-inner /g, '');
content = content.replace(/shadow-sm /g, '');
content = content.replace(/shadow-none /g, '');
content = content.replace(/shadow-none"/g, '"');

fs.writeFileSync('src/components/HomeView.tsx', content);
