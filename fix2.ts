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
  content = content.replace(/text-gray-700(?! dark:text-)/g, 'text-gray-700 dark:text-gray-300');
  content = content.replace(/text-gray-600(?! dark:text-)/g, 'text-gray-600 dark:text-gray-400');
  content = content.replace(/text-stone-700(?! dark:text-)/g, 'text-stone-700 dark:text-stone-300');
  content = content.replace(/text-stone-600(?! dark:text-)/g, 'text-stone-600 dark:text-stone-400');
  content = content.replace(/text-blue-800(?! dark:text-)/g, 'text-blue-800 dark:text-blue-200');
  content = content.replace(/text-blue-900(?! dark:text-)/g, 'text-blue-900 dark:text-blue-100');
  
  content = content.replace(/border-gray-100(?! dark:border-)/g, 'border-gray-100 dark:border-gray-800');
  content = content.replace(/border-gray-200(?! dark:border-)/g, 'border-gray-200 dark:border-gray-700');
  content = content.replace(/border-gray-300(?! dark:border-)/g, 'border-gray-300 dark:border-gray-700');
  
  content = content.replace(/bg-white(?!\/| dark:bg-)/g, 'bg-white dark:bg-[#1e1d1b]');
  content = content.replace(/bg-gray-50(?! dark:bg-)/g, 'bg-gray-50 dark:bg-[#252422]');
  content = content.replace(/bg-gray-100(?! dark:bg-)/g, 'bg-gray-100 dark:bg-[#2d2a28]');
  
  content = content.replace(/bg-\[\#E6F1FF\](?! dark:bg-)/g, 'bg-[#E6F1FF] dark:bg-[#202E42]');

  fs.writeFileSync(file, content);
}
console.log('Done secondary replacement');
