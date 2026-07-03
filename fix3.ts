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
  content = content.replace(/className="w-full p-2.5 border rounded-xl"/g, 'className="w-full p-2.5 border rounded-xl dark:bg-[#252422] dark:border-gray-700 focus:outline-none focus:border-[#fcc0e7]"');
  content = content.replace(/className="w-full p-2 border rounded-xl"/g, 'className="w-full p-2 border rounded-xl dark:bg-[#252422] dark:border-gray-700 focus:outline-none focus:border-[#fcc0e7]"');
  content = content.replace(/bg-gray-55/g, 'bg-gray-50');
  fs.writeFileSync(file, content);
}
console.log('Done 3rd replacement');
