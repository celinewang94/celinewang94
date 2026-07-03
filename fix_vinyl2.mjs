import fs from 'fs';

let content = fs.readFileSync('src/components/HomeView.tsx', 'utf8');

const targetStr = `{/* Vinyl Center Label */}
                           <div className="w-1/3 h-1/3 rounded-full relative z-10 overflow-hidden border border-[#121212] flex items-center justify-center bg-[var(--beige-mid)]">
                             <img src={n.cover} className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-multiply" referrerPolicy="no-referrer" />
                             <span className="text-[6px] font-bold tracking-tight text-[#1a1a2e] z-10 text-center px-1 leading-tight line-clamp-3">{n.title}</span>
                             <div className="absolute w-2 h-2 bg-[var(--beige)] shadow-inner rounded-full z-20"></div>
                           </div>`;

const replaceStr = `{/* Vinyl Center Label */}
                           <div className="w-[50%] h-[50%] rounded-full relative z-10 overflow-hidden border-2 border-[#121212] flex flex-col items-center justify-center bg-[#fdfaf5]">
                             <img src={n.cover} className="absolute inset-0 w-full h-full object-cover opacity-[0.16] mix-blend-multiply" referrerPolicy="no-referrer" />
                             <div className="absolute w-3 h-3 bg-[#fdfaf5] shadow-inner rounded-full z-30 border-2 border-gray-300"></div>
                             <div className="flex flex-col items-center justify-between z-20 w-full h-full p-[3px] relative pt-1 pb-1.5">
                               <span className="text-[7px] sm:text-[9px] font-bold tracking-tight text-[#1a1a2e] text-center leading-tight line-clamp-2 px-1 mx-1 mt-0.5" style={{ fontSize: 'min(9px, 8vw)' }}>{n.title}</span>
                               <span className="text-[5px] sm:text-[6px] text-gray-700 mb-0.5 font-bold text-center truncate w-full px-2 uppercase tracking-widest line-clamp-1" style={{ fontSize: 'min(6px, 6vw)' }}>{n.author}</span>
                             </div>
                           </div>`;

content = content.replace(targetStr, replaceStr);
content = content.replace(targetStr, replaceStr);

fs.writeFileSync('src/components/HomeView.tsx', content);
