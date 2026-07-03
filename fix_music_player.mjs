import fs from 'fs';

let content = fs.readFileSync('src/components/HomeView.tsx', 'utf8');

const target1 = /<div key=\{n\.id\} className="novel-card" onClick=\{[^>]*\}>[\s\S]*?<div className="novel-info">[\s\S]*?<\/div>\s*<\/div>/g;

const newCard = `<div key={n.id} className="novel-player-card group flex flex-col bg-[#e6e9ef] dark:bg-[#1a1a2e] rounded-[1.5rem] p-3 border-2 border-white/40 dark:border-white/5 shadow-[6px_6px_12px_#b8bec7,-6px_-6px_12px_#ffffff] dark:shadow-[6px_6px_12px_#12121f,-6px_-6px_12px_#22223d] cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-[10px_10px_20px_#b8bec7,-10px_-10px_20px_#ffffff] dark:hover:shadow-[10px_10px_20px_#12121f,-10px_-10px_20px_#22223d]" onClick={() => handleSelectNovel(n.id)}>
                      {/* Screen */}
                      <div className="bg-[#f4f6f9] dark:bg-[#151525] rounded-xl p-2.5 pb-3 shadow-inner flex flex-col relative border border-gray-200 dark:border-gray-800">
                        <div className="absolute top-4 left-4 px-1.5 py-0.5 bg-black/60 backdrop-blur-sm text-white text-[8px] font-bold tracking-wider rounded border border-white/10 uppercase z-10">
                          {n.progressStatus === 'completed' ? 'Hoàn thành' : 'Tiến hành'}
                        </div>
                        <div className="w-full aspect-square rounded-lg overflow-hidden relative shadow-sm border border-black/5 dark:border-white/5">
                          <img src={n.cover} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" referrerPolicy="no-referrer" />
                        </div>
                        
                        <div className="mt-3 px-1 flex-1 flex flex-col">
                          <div className="text-[13px] font-bold text-gray-900 dark:text-gray-100 line-clamp-1 leading-tight">{n.title}</div>
                          <div className="text-[10px] text-gray-500 dark:text-gray-400 line-clamp-1 mt-1 font-medium">{n.author}</div>
                          
                          <div className="mt-4">
                            {/* Progress track */}
                            <div className="w-full h-1.5 bg-gray-200 dark:bg-[#252540] rounded-full overflow-hidden relative border border-gray-300 dark:border-gray-700 shadow-inner">
                              <div className="absolute top-0 left-0 h-full bg-[var(--pink)] dark:bg-[#c26b80] rounded-full" style={{ width: n.progressStatus === 'completed' ? '100%' : Math.random() * 80 + 10 + '%' }} />
                            </div>
                            <div className="flex justify-between items-center text-[8px] text-gray-500 dark:text-gray-400 mt-1.5 font-mono">
                              <span>{Math.floor(Math.random() * 3) + 1}:{Math.floor(Math.random() * 50) + 10}</span>
                              <span className="flex items-center gap-1">
                                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                                {n.views}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Controls */}
                      <div className="flex justify-center items-center gap-4 mt-4 mb-2">
                        <button className="w-7 h-7 rounded-full flex justify-center items-center text-gray-500 dark:text-gray-400 hover:text-[var(--pink)] dark:hover:text-[#c26b80] active:scale-95 transition-all bg-[#f0f3f8] dark:bg-[#1f1f33] shadow-[2px_2px_4px_#c3c8cf,-1px_-1px_3px_#ffffff] dark:shadow-[2px_2px_4px_#10101b,-1px_-1px_3px_#27274b]">
                          <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current"><path d="M6 6h2v12H6zm3.5 6l8.5 6V6z"/></svg>
                        </button>
                        <button className="w-10 h-10 rounded-full flex justify-center items-center text-[var(--brown-dark)] dark:text-[#fdfaf5] active:scale-95 transition-all bg-[var(--pink)] dark:bg-[#c26b80] shadow-[3px_3px_6px_#b8bec7,-3px_-3px_6px_#ffffff] dark:shadow-[3px_3px_6px_#12121f,-3px_-3px_6px_#22223d]">
                          <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current ml-1"><path d="M8 5v14l11-7z"/></svg>
                        </button>
                        <button className="w-7 h-7 rounded-full flex justify-center items-center text-gray-500 dark:text-gray-400 hover:text-[var(--pink)] dark:hover:text-[#c26b80] active:scale-95 transition-all bg-[#f0f3f8] dark:bg-[#1f1f33] shadow-[2px_2px_4px_#c3c8cf,-1px_-1px_3px_#ffffff] dark:shadow-[2px_2px_4px_#10101b,-1px_-1px_3px_#27274b]">
                          <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current"><path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z"/></svg>
                        </button>
                      </div>
                    </div>`;

content = content.replace(target1, newCard);

fs.writeFileSync('src/components/HomeView.tsx', content);
