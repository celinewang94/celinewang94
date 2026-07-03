import fs from 'fs';

let content = fs.readFileSync('src/components/HomeView.tsx', 'utf8');

content = content.replace(/shadow-\[6px_6px_12px_#b8bec7,-6px_-6px_12px_#ffffff\] /g, 'shadow-md ');
content = content.replace(/dark:shadow-\[6px_6px_12px_#12121f,-6px_-6px_12px_#22223d\] /g, 'dark:shadow-md/20 ');
content = content.replace(/hover:shadow-\[10px_10px_20px_#b8bec7,-10px_-10px_20px_#ffffff\] /g, 'hover:shadow-lg ');
content = content.replace(/dark:hover:shadow-\[10px_10px_20px_#12121f,-10px_-10px_20px_#22223d\] /g, 'dark:hover:shadow-lg/20 ');

content = content.replace(/shadow-\[2px_2px_4px_#c3c8cf,-1px_-1px_3px_#ffffff\] /g, '');
content = content.replace(/dark:shadow-\[2px_2px_4px_#10101b,-1px_-1px_3px_#27274b\] /g, '');

content = content.replace(/shadow-\[3px_3px_6px_#b8bec7,-3px_-3px_6px_#ffffff\] /g, 'shadow-sm ');
content = content.replace(/dark:shadow-\[3px_3px_6px_#12121f,-3px_-3px_6px_#22223d\] /g, 'dark:shadow-sm/20 ');

fs.writeFileSync('src/components/HomeView.tsx', content);
