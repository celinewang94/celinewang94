import fs from 'fs';

let content = fs.readFileSync('src/components/HomeView.tsx', 'utf8');

content = content.replace(/dark:hover:shadow-\[10px_10px_20px_#12121f,-10px_-10px_20px_#22223d\]"/g, 'dark:hover:shadow-lg/20"');

fs.writeFileSync('src/components/HomeView.tsx', content);
