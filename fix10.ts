import fs from 'fs';
let code = fs.readFileSync('src/App.tsx', 'utf8');

const effectCode = `
  // Notify about new chapters when returning to home
  const lastNotifiedHomeRef = React.useRef<boolean>(false);
  useEffect(() => {
    if (currentView === 'home' && userState.library.length > 0 && !lastNotifiedHomeRef.current) {
      lastNotifiedHomeRef.current = true; // prevent spamming on every re-render of home

      let newChaptersCount = 0;
      let newChapterNovelTitle = '';

      userState.library.forEach(novelId => {
        const history = userState.readingHistory.find(h => h.novelId === novelId);
        const highestRead = history ? history.chapterNumber : 0;
        
        const novelChaps = chapters.filter(c => c.novelId === novelId);
        const unreadChaps = novelChaps.filter(c => c.chapterNumber > highestRead);
        
        if (unreadChaps.length > 0) {
          newChaptersCount += unreadChaps.length;
          if (!newChapterNovelTitle) {
            const nv = novels.find(n => n.id === novelId);
            if (nv) newChapterNovelTitle = nv.title;
          }
        }
      });

      if (newChaptersCount > 0) {
        setTimeout(() => {
          if (newChaptersCount === 1 && newChapterNovelTitle) {
            toast.info(\`Có chương mới của "\${newChapterNovelTitle}" trong thư viện!\`, {
              icon: '📚'
            });
          } else {
            toast.info(\`Có \${newChaptersCount} chương mới trong các truyện ở thư viện của bạn!\`, {
              icon: '📚'
            });
          }
        }, 500);
      }
    } else if (currentView !== 'home') {
      lastNotifiedHomeRef.current = false; // Reset when leaving home view
    }
  }, [currentView, userState.library, chapters, novels]);
`;

code = code.replace(
  "  // Track reading progress on scroll",
  effectCode + "\n\n  // Track reading progress on scroll"
);
fs.writeFileSync('src/App.tsx', code);
