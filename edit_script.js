const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');
const target = fs.readFileSync('tmp_target.txt', 'utf8');

const replacement = `                        <div 
                           className={index === 0 ? "first-letter:float-left first-letter:text-6xl first-letter:font-serif first-letter:font-bold first-letter:mr-3.5 first-letter:leading-[0.8] first-letter:mt-1 first-letter:text-[var(--pink-text)] dark:first-letter:text-pink-200" : ""}
                        >
                          <span
                            dangerouslySetInnerHTML={{ __html: renderParagraphWithHighlights(para, index, currentChapter.id) }} 
                            onClick={(e) => {
                              const target = e.target as HTMLElement;
                              const noteElement = target.closest('.novel-note');
                              if (noteElement) {
                                const title = noteElement.getAttribute('title');
                                if (title) {
                                  toast.info(\`Chú thích: \${title}\`);
                                }
                              }
                            }}
                          />
                          
                          <span className="inline-flex ml-2 align-middle relative top-[-1px]">
                            {/* Paragraph comments trigger button */}
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setActiveParagraphIndex(index);
                              }}
                              className={\`flex items-center justify-center w-6 h-6 rounded-full border shadow-3xs transition-all duration-250 cursor-pointer z-20 \${
                                paragraphCommentsCount > 0 
                                  ? 'opacity-100 bg-[#8A7870] text-white border-[#8A7870] hover:scale-110' 
                                  : 'opacity-40 sm:opacity-0 sm:group-hover:opacity-100 bg-white dark:bg-[#1e1d1b] hover:bg-[#FAF5F0] border-[#E5D5C8]/55 text-[#8A7870] scale-95 hover:scale-105'
                              }\`}
                              title="Bình luận đoạn này"
                            >
                              <MessageSquare className="h-3 w-3" /> 
                              {paragraphCommentsCount > 0 && (
                                <span className="absolute -top-1.5 -right-1.5 bg-[#8E6969] text-white text-[8px] font-sans font-extrabold leading-none px-0.5 rounded-full min-w-[13px] h-[13px] flex items-center justify-center border border-white dark:border-[#1e1d1b] z-30">
                                  {paragraphCommentsCount}
                                </span>
                              )}
                            </button>
                          </span>
                        </div>`;

if (code.includes(target)) {
  code = code.replace(target, replacement + '\n');
  fs.writeFileSync('src/App.tsx', code);
  console.log("Success");
} else {
  console.log("Target not found");
}
