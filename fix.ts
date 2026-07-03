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
  content = content.replace(/text-gray-800(?! dark:text-)/g, 'text-gray-800 dark:text-gray-200');
  content = content.replace(/text-gray-900(?! dark:text-)/g, 'text-gray-900 dark:text-gray-100');
  content = content.replace(/text-stone-800(?! dark:text-)/g, 'text-stone-800 dark:text-stone-200');
  content = content.replace(/text-stone-900(?! dark:text-)/g, 'text-stone-900 dark:text-stone-100');
  fs.writeFileSync(file, content);
}
console.log('Done replacement');
