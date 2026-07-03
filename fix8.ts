import fs from 'fs';
const files = [
  'src/App.tsx',
  'src/components/NovelRankings.tsx',
  'src/components/NotificationBell.tsx',
  'src/components/DashboardAdmin.tsx',
  'src/components/ReportsPanel.tsx',
  'src/components/DashboardEditor.tsx',
  'src/components/CommentsBox.tsx',
  'src/components/BookCarousel.tsx',
  'src/components/GeneralChat.tsx'
];
for (const file of files) {
  if (!fs.existsSync(file)) continue;
  let content = fs.readFileSync(file, 'utf8');
  content = content.replace(/dark:text-\[#e4e7ea\]/g, 'dark:text-[#e3e8f0]');
  fs.writeFileSync(file, content);
}
console.log('Done 8th replacement');
