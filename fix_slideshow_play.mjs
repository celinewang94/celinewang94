import fs from 'fs';

let content = fs.readFileSync('src/components/HomeView.tsx', 'utf8');

const targetStr = `                      {/* Mystical circle overlay */}
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20 group-hover:opacity-10 transition-opacity duration-700">
                        <div className="w-[180px] h-[180px] md:w-[220px] md:h-[220px] rounded-full border-[0.5px] border-[#c9a84c] flex items-center justify-center">
                          <div className="w-[160px] h-[160px] md:w-[200px] md:h-[200px] rounded-full border-[0.5px] border-[#c9a84c] border-dashed"></div>
                        </div>
                      </div>
                    </div>`;

const replaceStr = `                      {/* Mystical circle overlay */}
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20 group-hover:opacity-0 transition-opacity duration-700">
                        <div className="w-[180px] h-[180px] md:w-[220px] md:h-[220px] rounded-full border-[0.5px] border-[#c9a84c] flex items-center justify-center">
                          <div className="w-[160px] h-[160px] md:w-[200px] md:h-[200px] rounded-full border-[0.5px] border-[#c9a84c] border-dashed"></div>
                        </div>
                      </div>
                      
                      {/* Play overlay on active card */}
                      {isActive && (
                        <div className="absolute inset-0 flex flex-col gap-2 items-center justify-center pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-black/40 backdrop-blur-[2px]">
                          <div className="w-14 h-14 rounded-full border border-[#c9a84c] flex items-center justify-center bg-[#1a1a25]/80 shadow-[0_0_20px_rgba(201,168,76,0.3)]">
                             <svg viewBox="0 0 24 24" className="w-6 h-6 fill-[#c9a84c] ml-1"><path d="M8 5v14l11-7z"/></svg>
                          </div>
                          <span className="text-[#c9a84c] text-[10px] uppercase tracking-widest font-bold drop-shadow-md">Đọc Truyện</span>
                        </div>
                      )}
                    </div>`;

content = content.replace(targetStr, replaceStr);

fs.writeFileSync('src/components/HomeView.tsx', content);
