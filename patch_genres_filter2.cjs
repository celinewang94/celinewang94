const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

const targetStr = `              {/* DYNAMIC GENRE BUTTONS - Responsive Filter Style */}
              <div className="space-y-3 bg-[#FAF7F5] dark:bg-[#1E1917] border border-stone-200/50 dark:border-stone-800 p-5 md:p-6 rounded-xl w-full text-left">
                <div className="flex items-center justify-between">
                  <label className="text-xs text-stone-600 dark:text-stone-300 font-sans font-bold uppercase tracking-wider flex items-center gap-1.5">
                    <Tag className="w-3.5 h-3.5" /> Thể Loại ({selectedGenres.length > 0 ? selectedGenres.length : 'Tất cả'})
                  </label>
                  {selectedGenres.length > 0 && (
                    <button 
                      onClick={() => setSelectedGenres([])}
                      className="text-[10px] font-bold uppercase tracking-widest text-pink-600 dark:text-pink-400 hover:opacity-80 transition-opacity flex items-center gap-1 cursor-pointer"
                    >
                      <X className="w-3 h-3" /> Bỏ chọn
                    </button>
                  )}
                </div>
              
                <div className="flex flex-wrap gap-2 pt-1 max-h-[300px] overflow-y-auto custom-scrollbar pr-2">
                  {['Tất Cả', ...activeGenres].map((genre) => {
                    const isSelected = genre === 'Tất Cả' ? selectedGenres.length === 0 : selectedGenres.includes(genre);
                    return (
                      <button
                        key={genre}
                        onClick={() => {
                          if (genre === 'Tất Cả') {
                            setSelectedGenres([]);
                          } else {
                            setSelectedGenres(prev => 
                              prev.includes(genre) 
                                ? prev.filter(g => g !== genre)
                                : [...prev, genre]
                            );
                          }
                        }}
                        className={\`py-1.5 px-3 rounded-lg text-[11px] font-sans font-bold uppercase tracking-wider border transition-all cursor-pointer \${
                          isSelected
                            ? 'bg-[#5C4E48] text-[#FAF6F2] dark:bg-[#EAE1D8] dark:text-[#251D1B] border-[#5C4E48] dark:border-transparent shadow-xs'
                            : 'bg-white/80 dark:bg-[#2A211E]/30 text-stone-650 dark:text-stone-300 border-stone-200/50 dark:border-stone-800 hover:bg-[#EAE1D8]/20 hover:text-stone-850 dark:hover:text-white'
                        }\`}
                        id={\`genre-btn-\${genre}\`}
                      >
                        {genre}
                      </button>
                    );
                  })}
                </div>
              </div>`;

const replacementStr = `              {/* DYNAMIC GENRE BUTTONS - Compact Expandable Filter Style */}
              <div className="space-y-3 bg-[#FAF7F5] dark:bg-[#1E1917] border border-stone-200/50 dark:border-stone-800 p-5 md:p-6 rounded-xl w-full text-left">
                <div className="flex items-center justify-between">
                  <label className="text-xs text-stone-600 dark:text-stone-300 font-sans font-bold uppercase tracking-wider flex items-center gap-1.5">
                    <Tag className="w-3.5 h-3.5" /> Thể Loại ({selectedGenres.length > 0 ? selectedGenres.length : 'Tất cả'})
                  </label>
                  {selectedGenres.length > 0 && (
                    <button 
                      onClick={() => setSelectedGenres([])}
                      className="text-[10px] font-bold uppercase tracking-widest text-pink-600 dark:text-pink-400 hover:opacity-80 transition-opacity flex items-center gap-1 cursor-pointer"
                    >
                      <X className="w-3 h-3" /> Bỏ chọn
                    </button>
                  )}
                </div>
              
                <div className={\`flex flex-wrap gap-2 pt-1 overflow-hidden transition-all duration-300 \${isGenresExpanded ? 'max-h-[500px] overflow-y-auto custom-scrollbar pr-2' : 'max-h-[84px]'}\`}>
                  {['Tất Cả', ...activeGenres].map((genre) => {
                    const isSelected = genre === 'Tất Cả' ? selectedGenres.length === 0 : selectedGenres.includes(genre);
                    return (
                      <button
                        key={genre}
                        onClick={() => {
                          if (genre === 'Tất Cả') {
                            setSelectedGenres([]);
                          } else {
                            setSelectedGenres(prev => 
                              prev.includes(genre) 
                                ? prev.filter(g => g !== genre)
                                : [...prev, genre]
                            );
                          }
                        }}
                        className={\`py-1.5 px-3 rounded-lg text-[11px] font-sans font-bold uppercase tracking-wider border transition-all cursor-pointer \${
                          isSelected
                            ? 'bg-[#5C4E48] text-[#FAF6F2] dark:bg-[#EAE1D8] dark:text-[#251D1B] border-[#5C4E48] dark:border-transparent shadow-xs'
                            : 'bg-white/80 dark:bg-[#2A211E]/30 text-stone-650 dark:text-stone-300 border-stone-200/50 dark:border-stone-800 hover:bg-[#EAE1D8]/20 hover:text-stone-850 dark:hover:text-white'
                        }\`}
                        id={\`genre-btn-\${genre}\`}
                      >
                        {genre}
                      </button>
                    );
                  })}
                </div>
                
                {activeGenres.length > 8 && (
                  <button 
                    onClick={() => setIsGenresExpanded(!isGenresExpanded)}
                    className="text-[10px] text-pink-600 dark:text-pink-400 font-bold uppercase tracking-wider flex items-center gap-1 mt-2 w-full justify-center py-2 bg-pink-50/50 hover:bg-pink-100/50 dark:bg-pink-950/20 dark:hover:bg-pink-900/30 rounded-lg transition-colors cursor-pointer border border-pink-200/20 dark:border-pink-900/20"
                  >
                    {isGenresExpanded ? (
                      <><ChevronUp className="w-3 h-3"/> Thu gọn</>
                    ) : (
                      <><ChevronDown className="w-3 h-3"/> Xem thêm các thể loại khác</>
                    )}
                  </button>
                )}
              </div>`;

if (code.includes(targetStr)) {
    code = code.replace(targetStr, replacementStr);
    fs.writeFileSync('src/App.tsx', code);
    console.log("Patched genres filter with expand/collapse successfully.");
} else {
    console.error("Could not find the target block for genres filter expand/collapse.");
}
