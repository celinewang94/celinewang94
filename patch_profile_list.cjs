const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

const targetStr = `                  <div className="space-y-4">
                    {userState.privateBookLists.map(list => (
                      <div key={list.id} className="bg-white/80 dark:bg-stone-900/40 border border-pink-200/25 dark:border-pink-900/25 p-4 rounded-2xl space-y-3.5 shadow-2xs text-left">
                        <div className="flex justify-between items-start border-b border-pink-100/10 dark:border-pink-900/10 pb-2">
                          <div>
                            <h4 className="font-serif font-bold text-stone-800 dark:text-stone-200 text-sm md:text-base">{list.name}</h4>
                            {list.description && <p className="text-xs text-stone-500 dark:text-stone-400 font-sans mt-0.5">{list.description}</p>}
                          </div>
                        </div>`;

const replacementStr = `                  <div className="space-y-4">
                    {userState.privateBookLists.map(list => (
                      <div key={list.id} className="bg-white/80 dark:bg-stone-900/40 border border-pink-200/25 dark:border-pink-900/25 p-4 rounded-2xl space-y-3.5 shadow-2xs text-left">
                        <div className="flex justify-between items-start border-b border-pink-100/10 dark:border-pink-900/10 pb-2">
                          <div>
                            <div className="flex items-center gap-2">
                               <h4 className="font-serif font-bold text-stone-800 dark:text-stone-200 text-sm md:text-base">{list.name}</h4>
                               {list.isPublic && <span className="text-[9px] bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 px-1.5 py-0.5 rounded font-bold uppercase tracking-wider">Công khai</span>}
                            </div>
                            {list.description && <p className="text-xs text-stone-500 dark:text-stone-400 font-sans mt-0.5">{list.description}</p>}
                          </div>
                          
                          <button
                            onClick={() => {
                               const updatedLists = userState.privateBookLists.map(l => l.id === list.id ? { ...l, isPublic: !l.isPublic } : l);
                               const newState = { ...userState, privateBookLists: updatedLists };
                               setUserState(newState);
                               localStorage.setItem(\`pure_love_user_state_\${currentUser.id}\`, JSON.stringify(newState));
                               toast(list.isPublic ? 'Đã chuyển danh sách thành riêng tư' : 'Đã chuyển danh sách thành công khai');
                            }}
                            className={\`text-[10px] font-bold px-2 py-1 rounded transition-colors cursor-pointer \${list.isPublic ? 'bg-stone-200 text-stone-600 dark:bg-stone-800 dark:text-stone-400 hover:bg-stone-300' : 'bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-400 hover:bg-pink-200'}\`}
                          >
                            {list.isPublic ? 'Riêng tư' : 'Công khai'}
                          </button>
                        </div>`;

if (code.includes(targetStr)) {
    code = code.replace(targetStr, replacementStr);
    fs.writeFileSync('src/App.tsx', code);
    console.log("Patched profile reading list successfully.");
} else {
    console.error("Could not find the target block for profile reading list.");
}
