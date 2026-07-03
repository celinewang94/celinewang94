import fs from 'fs';

let content = fs.readFileSync('src/components/HomeView.tsx', 'utf8');

// There are two places with Vinyl Center Label in HomeView.tsx.
const targetRegex = /\{\/\* Vinyl Center Label \*\/\}\s*<div className="w-1\/3 h-1\/3 rounded-full relative z-10 overflow-hidden border border-\[\#121212\] flex items-center justify-center bg-\[var\(--beige-mid\)\]">\s*<img src=\{n\.cover\} className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-multiply" referrerPolicy="no-referrer" \/>\s*<span className="text-\[6px\] font-bold tracking-tight text-\\[#1a1a2e\\] z-10 text-center px-1 leading-tight line-clamp-3">\{n\.title\}<\/span>\s*<div className="absolute w-2 h-2 bg-\[var\(--beige\)\] shadow-inner rounded-full z-20"><\/div>\s*<\/div>/g;

const replacement = `{/* Vinyl Center Label */}
                           <div className="w-[48%] h-[48%] rounded-full relative z-10 overflow-hidden border-2 border-[#121212] flex flex-col items-center justify-center bg-[#fdfaf5]">
                             <img src={n.cover} className="absolute inset-0 w-full h-full object-cover opacity-[0.15] mix-blend-multiply" referrerPolicy="no-referrer" />
                             <div className="absolute w-2.5 h-2.5 bg-[#fdfaf5] shadow-inner rounded-full z-30 border border-gray-300"></div>
                             <div className="flex flex-col items-center justify-between z-20 w-full h-full py-2 relative">
                               <span className="text-[7px] sm:text-[8px] font-bold tracking-tight text-[#1a1a2e] text-center leading-tight line-clamp-2 px-1 mx-1 mt-0.5">{n.title}</span>
                               <span className="text-[5px] sm:text-[6px] text-gray-600 mb-0.5 font-medium text-center truncate w-full px-2 uppercase tracking-widest">{n.author}</span>
                             </div>
                           </div>`;

content = content.replace(targetRegex, replacement);

fs.writeFileSync('src/components/HomeView.tsx', content);
