const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

const findBlock = `                    .map((chap, idx) => {
                      const isEven = idx % 2 === 0;
                      return (
                        <div
                          key={chap.id}
                          onClick={() => handleSelectChapter(currentNovel.id, chap.id)}
                          className={\`py-3 flex items-center justify-between px-4 cursor-pointer transition-all duration-300 rounded-xl border \${
                            isEven
                              ? 'bg-[#FFF0F5]/50 border-pink-100/30 text-stone-800 dark:text-stone-200 hover:bg-[#FFF0F5]/80 dark:bg-pink-950/10 dark:border-pink-900/10 hover:shadow-2xs shadow-3xs'
                              : 'bg-[#F0F8FF]/50 border-sky-100/30 text-stone-800 dark:text-stone-200 hover:bg-[#F0F8FF]/80 dark:bg-sky-950/10 dark:border-sky-900/10 hover:shadow-2xs shadow-3xs'
                          }\`}
                        >
                          <span className="text-sm font-semibold tracking-wide flex items-center gap-2">
                            {chap.password && (
                              <span title="Chương có mật khẩu" className="text-red-500 bg-red-100 dark:bg-red-900/30 p-1 rounded-md">
                                <Lock className="w-3.5 h-3.5" />
                              </span>
                            )}
                            {chap.title}
                          </span>
                          
                          <div className="flex items-center gap-4 text-xs font-sans">
                            <span className="flex items-center gap-1.5 font-semibold" title="Lượt tim chương">
                              <Heart className={\`h-3.5 w-3.5 \${isEven ? 'text-[#E3BFC6]' : 'text-[#9BB5C9]'}\`} /> {chap.hearts}
                            </span>
                            <span className="flex items-center gap-1.5 opacity-80" title="Lượt xem chương">
                              <Eye className="h-3.5 w-3.5" /> {(chap.views || Math.round(chap.hearts * 5.4 + 112)).toLocaleString()}
                            </span>
                            <ChevronRight className="h-4 w-4" />
                          </div>
                        </div>
                      );
                    })}`;

const replaceBlock = `                    .map((chap, idx) => {
                      const isEven = idx % 2 === 0;
                      const chapterCommentsCount = globalComments
                        .filter(c => c.chapterId === chap.id)
                        .reduce((sum, c) => sum + 1 + (c.replies?.length || 0), 0);
                      
                      return (
                        <div
                          key={chap.id}
                          onClick={() => handleSelectChapter(currentNovel.id, chap.id)}
                          className={\`py-3 flex items-center justify-between px-4 cursor-pointer transition-all duration-300 rounded-xl border \${
                            isEven
                              ? 'bg-[#FFF0F5]/50 border-pink-100/30 text-stone-800 dark:text-stone-200 hover:bg-[#FFF0F5]/80 dark:bg-pink-950/10 dark:border-pink-900/10 hover:shadow-2xs shadow-3xs'
                              : 'bg-[#F0F8FF]/50 border-sky-100/30 text-stone-800 dark:text-stone-200 hover:bg-[#F0F8FF]/80 dark:bg-sky-950/10 dark:border-sky-900/10 hover:shadow-2xs shadow-3xs'
                          }\`}
                        >
                          <span className="text-sm font-semibold tracking-wide flex items-center gap-2">
                            {chap.password && (
                              <span title="Chương có mật khẩu" className="text-red-500 bg-red-100 dark:bg-red-900/30 p-1 rounded-md">
                                <Lock className="w-3.5 h-3.5" />
                              </span>
                            )}
                            {chap.title}
                          </span>
                          
                          <div className="flex items-center gap-4 text-xs font-sans">
                            <span className="flex items-center gap-1.5 font-semibold" title="Lượt tim chương">
                              <Heart className={\`h-3.5 w-3.5 \${isEven ? 'text-[#E3BFC6]' : 'text-[#9BB5C9]'}\`} /> {chap.hearts}
                            </span>
                            <span className="flex items-center gap-1.5 opacity-80" title="Bình luận">
                              <MessageSquare className="h-3.5 w-3.5" /> {chapterCommentsCount.toLocaleString()}
                            </span>
                            <span className="flex items-center gap-1.5 opacity-80" title="Lượt xem chương">
                              <Eye className="h-3.5 w-3.5" /> {(chap.views || Math.round(chap.hearts * 5.4 + 112)).toLocaleString()}
                            </span>
                            <ChevronRight className="h-4 w-4" />
                          </div>
                        </div>
                      );
                    })}`;

if (code.includes(findBlock)) {
  code = code.replace(findBlock, replaceBlock);
  fs.writeFileSync('src/App.tsx', code);
  console.log("Patched views and comments successfully.");
} else {
  console.error("Could not find the target block in App.tsx");
}
