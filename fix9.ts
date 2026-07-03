import fs from 'fs';
let c = fs.readFileSync('src/App.tsx', 'utf8');
c = c.replace(/<div className="min-h-screen(.*?)">/, '<div className={`min-h-screen ${darkMode ? "dark" : ""} $1`}>');
fs.writeFileSync('src/App.tsx', c);
console.log("Fixed dark mode class");
