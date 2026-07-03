import fs from 'fs';

let c = fs.readFileSync('src/App.tsx', 'utf8');

c = c.replace(/<span\s+className=\{`([^`]*progressStatus[^`]*)`\}\s*>\s*\{([^}]*progressStatus[^}]*)\}\s*<\/span>/g, (match, p1, p2) => {
  // Determine which variable represents the novel here
  let varName = 'novel';
  if (p2.includes('currentNovel')) varName = 'currentNovel';
  else if (p2.includes('top3[0]')) varName = 'top3[0]';
  else if (p2.includes('top3[1]')) varName = 'top3[1]';
  else if (p2.includes('top3[2]')) varName = 'top3[2]';

  return `<button onClick={(e) => { e.stopPropagation(); setSelectedStatusFilter(${varName}.progressStatus === 'completed' ? 'completed' : 'ongoing'); setCurrentView('tags-list'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className={\`cursor-pointer hover:opacity-80 \${"${p1}"}\`}>{${p2}}</button>`;
});

fs.writeFileSync('src/App.tsx', c);
console.log('Replaced successfully.');
