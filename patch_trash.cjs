const fs = require('fs');
let code = fs.readFileSync('src/components/DashboardEditor.tsx', 'utf8');

const emptyTrashFn = `  const handleEmptyTrash = () => {
    if (!selectedNovel) return;
    toast('Cảnh báo: Bạn có chắc chắn muốn xóa vĩnh viễn toàn bộ thùng rác?', {
      description: 'Hành động này không thể hoàn tác.',
      action: {
        label: 'Xác nhận xóa',
        onClick: () => {
          const allChaps = PureLoveDatabase.getChapters();
          const updated = allChaps.filter(c => !(c.novelId === selectedNovel.id && c.deletedAt));
          PureLoveDatabase.saveChapters(updated);
          handleShowMessage('Đã xóa vĩnh viễn toàn bộ thùng rác!', 'success');
          refreshData();
        }
      }
    });
  };

  const handlePermanentDeleteChapter = (chapterId: string) => {`;

code = code.replace("  const handlePermanentDeleteChapter = (chapterId: string) => {", emptyTrashFn);

const emptyTrashButton = `          <div className="flex flex-col gap-3">
          
          {showTrash && chapters.filter(c => c.novelId === selectedNovel.id && c.deletedAt).length > 0 && (
            <div className="flex flex-col sm:flex-row sm:items-center justify-between bg-stone-50 dark:bg-[#1a1918] p-3 rounded-lg border border-stone-200 dark:border-stone-800 mb-2 gap-3 shadow-xs">
              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={handleEmptyTrash}
                  className="text-xs font-semibold px-3 py-1.5 rounded-md bg-rose-100 hover:bg-rose-200 dark:bg-rose-900/30 dark:hover:bg-rose-900/50 text-rose-700 dark:text-rose-400 transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Làm trống thùng rác
                </button>
              </div>
            </div>
          )}

          {!showTrash && (`;

code = code.replace(`          <div className="flex flex-col gap-3">
          
          {!showTrash && (`, emptyTrashButton);

fs.writeFileSync('src/components/DashboardEditor.tsx', code);
console.log("Patched trash");
