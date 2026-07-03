import fs from 'fs';
let content = fs.readFileSync('src/App.tsx', 'utf8');
content = content.replace(/setSelectedGenre\(null\)/g, 'setSelectedGenres([])');
content = content.replace(/setSelectedGenre\(g\)/g, 'setSelectedGenres([g])');
content = content.replace(/setSelectedGenre\(tag\)/g, 'setSelectedGenres([tag])');
fs.writeFileSync('src/App.tsx', content);
console.log('Fixed setSelectedGenre');
