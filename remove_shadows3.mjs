import fs from 'fs';

let content = fs.readFileSync('src/components/HomeView.tsx', 'utf8');

content = content.replace(/dark:shadow-\[2px_2px_4px_#10101b,-1px_-1px_3px_#27274b\]/g, 'shadow-none');
content = content.replace(/dark:shadow-\[3px_3px_6px_#12121f,-3px_-3px_6px_#22223d\]/g, 'shadow-none');

fs.writeFileSync('src/components/HomeView.tsx', content);
