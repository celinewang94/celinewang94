const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

const targetStr = `                  ) : (
                    <div className="bg-[#FAF7F5] dark:bg-[#1E1917] border border-stone-200/50 dark:border-stone-800 p-4 rounded-xl flex items-center justify-between gap-3 mb-4">
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="h-9 w-9 rounded-full bg-gradient-to-tr from-pink-100 to-sky-100 dark:from-pink-950/40 dark:to-sky-950/40 p-0.5 flex items-center justify-center border border-pink-200/20 text-pink-700 dark:text-pink-300 font-bold uppercase shrink-0">
                          <div className="w-full h-full rounded-full bg-white dark:bg-stone-900 flex items-center justify-center text-xs font-bold text-pink-600 dark:text-pink-350">
                            {(currentUser.displayName || 'U').substring(0, 2).toUpperCase()}
                          </div>
                        </div>
                        <div className="min-w-0">
                          <h4 className="font-serif font-bold text-stone-800 dark:text-pink-100 text-xs truncate">
                            {currentUser.displayName}
                          </h4>
                          {currentUser.role === 'Admin' ? (
                            <span className="inline-block text-[8px] font-sans font-bold uppercase tracking-wider bg-gradient-to-r from-pink-100 to-sky-100 dark:from-pink-950/40 dark:to-sky-950/40 text-pink-700 dark:text-pink-300 border border-pink-200/30 dark:border-pink-900/40 px-1.5 py-0.5 rounded mt-0.5">
                              Quản trị viên
                            </span>
                          ) : currentUser.role === 'Editor' ? (
                            <span className="inline-block text-[8px] font-sans font-bold uppercase tracking-wider bg-[#FAF6F2] dark:bg-[#1C1513] text-[#8C7355] dark:text-[#C7B6A9] border border-[#E5D5C8]/30 px-1.5 py-0.5 rounded mt-0.5">
                              Biên tập viên
                            </span>
                          ) : (
                            <span className="inline-block text-[8px] font-sans font-bold uppercase tracking-wider bg-sky-100/55 dark:bg-sky-950/25 text-sky-700 dark:text-sky-350 border border-sky-200/20 dark:border-sky-900/20 px-1.5 py-0.5 rounded mt-0.5">
                              Độc giả
                            </span>
                          )}
                        </div>
                      </div>
                      <button 
                        onClick={() => { handleLogout(); setIsNavMenuOpen(false); }}
                        className="px-2.5 py-1.5 bg-[#FAF5F0] hover:bg-[#F0E6DC] dark:bg-[#201816] dark:hover:bg-[#2D221F] border border-pink-250/20 dark:border-pink-900/30 text-pink-700 dark:text-pink-300 rounded-md text-[9px] font-bold uppercase tracking-wider transition-all cursor-pointer shrink-0"
                      >
                        Đăng Xuất
                      </button>
                    </div>
                  )}`;

const replacementStr = `                  ) : (
                    <div className="bg-[#FAF7F5] dark:bg-[#1E1917] border border-stone-200/50 dark:border-stone-800 p-4 rounded-xl flex flex-col gap-3 mb-4">
                      <div className="flex items-center justify-between gap-3">
                        <div className="flex items-center gap-3 min-w-0">
                          <div className="h-9 w-9 rounded-full bg-gradient-to-tr from-pink-100 to-sky-100 dark:from-pink-950/40 dark:to-sky-950/40 p-0.5 flex items-center justify-center border border-pink-200/20 text-pink-700 dark:text-pink-300 font-bold uppercase shrink-0">
                            <div className="w-full h-full rounded-full bg-white dark:bg-stone-900 flex items-center justify-center text-xs font-bold text-pink-600 dark:text-pink-350">
                              {(currentUser.displayName || 'U').substring(0, 2).toUpperCase()}
                            </div>
                          </div>
                          <div className="min-w-0">
                            <h4 className="font-serif font-bold text-stone-800 dark:text-pink-100 text-xs truncate">
                              {currentUser.displayName}
                            </h4>
                            {currentUser.role === 'Admin' ? (
                              <span className="inline-block text-[8px] font-sans font-bold uppercase tracking-wider bg-gradient-to-r from-pink-100 to-sky-100 dark:from-pink-950/40 dark:to-sky-950/40 text-pink-700 dark:text-pink-300 border border-pink-200/30 dark:border-pink-900/40 px-1.5 py-0.5 rounded mt-0.5">
                                Quản trị viên
                              </span>
                            ) : currentUser.role === 'Editor' ? (
                              <span className="inline-block text-[8px] font-sans font-bold uppercase tracking-wider bg-[#FAF6F2] dark:bg-[#1C1513] text-[#8C7355] dark:text-[#C7B6A9] border border-[#E5D5C8]/30 px-1.5 py-0.5 rounded mt-0.5">
                                Biên tập viên
                              </span>
                            ) : (
                              <span className="inline-block text-[8px] font-sans font-bold uppercase tracking-wider bg-sky-100/55 dark:bg-sky-950/25 text-sky-700 dark:text-sky-350 border border-sky-200/20 dark:border-sky-900/20 px-1.5 py-0.5 rounded mt-0.5">
                                Độc giả
                              </span>
                            )}
                          </div>
                        </div>
                        <button 
                          onClick={() => { handleLogout(); setIsNavMenuOpen(false); }}
                          className="px-2.5 py-1.5 bg-[#FAF5F0] hover:bg-[#F0E6DC] dark:bg-[#201816] dark:hover:bg-[#2D221F] border border-pink-250/20 dark:border-pink-900/30 text-pink-700 dark:text-pink-300 rounded-md text-[9px] font-bold uppercase tracking-wider transition-all cursor-pointer shrink-0"
                        >
                          Đăng Xuất
                        </button>
                      </div>
                      
                      <div className="flex gap-2 w-full pt-2 border-t border-stone-200/50 dark:border-stone-800">
                        {currentUser.role !== 'Reader' && (
                          <button 
                            onClick={() => { setCurrentView('editor'); setIsNavMenuOpen(false); }}
                            className="flex-1 py-2 bg-gradient-to-r from-pink-100 to-sky-100 dark:from-pink-950/40 dark:to-sky-950/40 text-pink-700 dark:text-pink-300 border border-pink-200/30 dark:border-pink-900/30 hover:opacity-95 text-[10px] font-bold uppercase tracking-wider rounded-lg transition-all cursor-pointer text-center"
                          >
                            Đăng Truyện
                          </button>
                        )}
                        <button 
                          onClick={() => { 
                            if (currentUser.role === 'Editor') {
                               setSelectedEditorName(currentUser.displayName);
                               setCurrentView('editor-profile');
                            } else {
                               setCurrentView('profile'); 
                            }
                            setIsNavMenuOpen(false); 
                          }}
                          className="flex-1 py-2 bg-white dark:bg-[#1C1513] text-stone-700 dark:text-stone-300 border border-stone-200/50 dark:border-stone-800 hover:bg-stone-50 dark:hover:bg-stone-900 text-[10px] font-bold uppercase tracking-wider rounded-lg transition-all cursor-pointer text-center"
                        >
                          Trang Cá Nhân
                        </button>
                      </div>
                    </div>
                  )}`;

if (code.includes(targetStr)) {
    code = code.replace(targetStr, replacementStr);
    fs.writeFileSync('src/App.tsx', code);
    console.log("Patched mobile menu successfully.");
} else {
    console.error("Could not find the target block for mobile menu.");
}
