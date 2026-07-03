import fs from 'fs';

let content = fs.readFileSync('src/components/HomeView.tsx', 'utf8');

const targetStr = `{/* Vinyl Center Label */}
                           <div className="w-[50%] h-[50%] rounded-full relative z-10 overflow-hidden border-2 border-[#121212] flex flex-col items-center justify-center bg-[#fdfaf5]">
                             <img src={n.cover} className="absolute inset-0 w-full h-full object-cover opacity-[0.16] mix-blend-multiply" referrerPolicy="no-referrer" />
                             <div className="absolute w-3 h-3 bg-[#fdfaf5] shadow-inner rounded-full z-30 border-2 border-gray-300"></div>
                             <div className="flex flex-col items-center justify-between z-20 w-full h-full p-[3px] relative pt-1 pb-1.5">
                               <span className="text-[7px] sm:text-[9px] font-bold tracking-tight text-[#1a1a2e] text-center leading-tight line-clamp-2 px-1 mx-1 mt-0.5" style={{ fontSize: 'min(9px, 8vw)' }}>{n.title}</span>
                               <span className="text-[5px] sm:text-[6px] text-gray-700 mb-0.5 font-bold text-center truncate w-full px-2 uppercase tracking-widest line-clamp-1" style={{ fontSize: 'min(6px, 6vw)' }}>{n.author}</span>
                             </div>
                           </div>`;

const replaceStr = `{/* Vinyl Center Label */}
                           <div className="w-[60%] h-[60%] rounded-full relative z-10 overflow-hidden border-2 border-[#121212] flex flex-col items-center justify-center bg-[#fdfaf5]">
                             <img src={n.cover} className="absolute inset-0 w-full h-full object-cover opacity-[0.16] mix-blend-multiply" referrerPolicy="no-referrer" />
                             <div className="absolute w-2.5 h-2.5 bg-[#fdfaf5] shadow-inner rounded-full z-30 border border-gray-300"></div>
                             <div className="flex flex-col items-center justify-between z-20 w-full h-full px-1 py-1.5 relative">
                               <span className="text-[8px] sm:text-[10px] font-bold tracking-tight text-[#1a1a2e] text-center leading-[1.1] line-clamp-2 px-1 pt-1 break-words">{n.title}</span>
                               <span className="text-[5.5px] sm:text-[7px] text-gray-800 font-bold text-center truncate w-full px-1.5 uppercase tracking-wide pb-0.5">{n.author}</span>
                             </div>
                           </div>`;

content = content.replace(targetStr, replaceStr);
content = content.replace(targetStr, replaceStr);

fs.writeFileSync('src/components/HomeView.tsx', content);
