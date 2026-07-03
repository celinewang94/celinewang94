import fs from 'fs';

let content = fs.readFileSync('src/App.tsx', 'utf8');

const importTarget = "import AudioReader from './components/AudioReader';\n";
const importReplacement = "import AudioReader from './components/AudioReader';\nimport { ParticlesContainer } from './components/ParticlesContainer';\n";

content = content.replace(importTarget, importReplacement);

const particlesTarget = "{/* Reading Progress Bar (Fixed Top) */}\n";
const particlesReplacement = "<ParticlesContainer />\n\n      {/* Reading Progress Bar (Fixed Top) */}\n";

content = content.replace(particlesTarget, particlesReplacement);

const newHeaderStart = `<nav className="vintage-nav">
  <div className="nav-inner">
    <button 
      onClick={() => { setCurrentView('home'); setSelectedGenres([]); setSearchQuery(''); }}
      className="logo bg-transparent border-none cursor-pointer flex items-center text-left"
    >
      <svg className="logo-vinyl mr-2" viewBox="0 0 36 36" fill="none">
        <circle cx="18" cy="18" r="17" fill="#1a1a2e" stroke="#C9A84C" strokeWidth="0.8"/>
        <circle cx="18" cy="18" r="12" fill="none" stroke="rgba(201,168,76,0.3)" strokeWidth="0.5"/>
        <circle cx="18" cy="18" r="7" fill="none" stroke="rgba(201,168,76,0.2)" strokeWidth="0.5"/>
        <circle cx="18" cy="18" r="3" fill="#C9A84C"/>
        <circle cx="18" cy="18" r="1.2" fill="#1a1a2e"/>
      </svg>
      <div>
        <span className="logo-text !text-[var(--text-main)] dark:!text-gray-100 flex">Tình Yêu Thuần Khiết</span>
        <span className="logo-sub !text-[var(--text-soft)] dark:!text-gray-400 flex">Novel Station ♪</span>
      </div>
    </button>

    <ul className="nav-links hidden lg:flex">
      <li><button onClick={() => { setCurrentView('home'); setSelectedGenres([]); setSearchQuery(''); }} className={currentView === 'home' ? 'active bg-[var(--pink-light)] !text-[var(--text-main)]' : 'bg-transparent border-none cursor-pointer'}>Trang Chủ</button></li>
      <li><button onClick={() => { setCurrentView('tags-list'); setSelectedGenres([]); }} className={currentView === 'tags-list' ? 'active bg-[var(--pink-light)] !text-[var(--text-main)]' : 'bg-transparent border-none cursor-pointer'}>Thư Viện</button></li>
      <li><button onClick={() => setCurrentView('rankings-page')} className={currentView === 'rankings-page' ? 'active bg-[var(--pink-light)] !text-[var(--text-main)]' : 'bg-transparent border-none cursor-pointer'}>Bảng Xếp Hạng</button></li>
      <li><button onClick={() => setCurrentView('profile')} className={currentView === 'profile' ? 'active bg-[var(--pink-light)] !text-[var(--text-main)]' : 'bg-transparent border-none cursor-pointer'}>Hồ Sơ</button></li>
      {currentUser && currentUser.role === 'Admin' && currentView !== 'editor' && currentView !== 'editor-profile' && (
        <li><button onClick={() => setCurrentView('admin')} className="bg-transparent border-none cursor-pointer hover:text-red-600 transition-colors">Admin</button></li>
      )}
      {currentUser && (currentUser.role === 'Editor' || currentUser.role === 'Admin') && (
        <li><button onClick={() => setCurrentView('editor')} className="bg-transparent border-none cursor-pointer hover:text-blue-600 transition-colors">Editor</button></li>
      )}
    </ul>

    <div className="nav-right gap-2 sm:gap-3 flex">
      {/* Search container inside Header */}
      <div className="relative hidden md:block w-48">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[var(--text-soft)] dark:text-gray-400" />
        <input
          type="text"
          placeholder="Tìm truyện..."
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            if (currentView !== 'home' && currentView !== 'tags-list') {
              setCurrentView('home');
            }
          }}
          className="w-full pl-8 pr-8 py-1.5 bg-[var(--beige)] dark:bg-[var(--vinyl-mid)] border border-[var(--border-strong)] rounded-full focus:outline-none focus:border-[var(--pink-deep)] text-xs font-medium placeholder-[var(--text-soft)] !text-[var(--text-main)] dark:!text-white"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-sm font-bold text-[var(--pink-text)] hover:text-red-500 transition-colors focus:outline-none cursor-pointer bg-transparent border-none"
            title="Xóa tìm kiếm"
          >
            ×
          </button>
        )}
      </div>

      <div className="mini-player hidden sm:flex">
        <button className="mini-player-btn !bg-[var(--text-main)]" onClick={() => setDarkMode(!darkMode)} title="Đổi giao diện">
          {darkMode ? <Sun className="h-2.5 w-2.5 text-white" /> : <Moon className="h-2.5 w-2.5 text-white" />}
        </button>
        <span className="player-text">{darkMode ? 'Giao diện Tối' : 'Giao diện Sáng'}</span>
      </div>

      {currentUser && (
         <div className="text-[var(--text-main)] dark:text-gray-300 flex items-center">
         <NotificationBell 
            currentUser={currentUser} 
            onNavigateNovel={(novelId, chapterId) => {
              if (chapterId) {
                handleSelectChapter(novelId, chapterId);
              } else {
                handleSelectNovel(novelId);
              }
            }}
          />
          </div>
      )}

      {currentUser ? (
        <div className="flex items-center gap-2">
            <div 
              onClick={() => setCurrentView('profile')}
              className="flex items-center gap-1.5 cursor-pointer bg-[var(--pink-light)] dark:bg-[var(--pink-deep)] border border-[var(--pink)] px-3 py-1.5 rounded-full transition-colors"
            >
              <div className="h-5 w-5 bg-[var(--pink)] text-white rounded-full flex items-center justify-center font-bold text-[9px] uppercase">
                {currentUser.displayName.substring(0, 2)}
              </div>
              <span className="text-xs font-bold text-[var(--pink-text)] dark:text-white hidden sm:inline-block max-w-[80px] truncate">
                {currentUser.role}
              </span>
            </div>

            <button
              onClick={handleLogout}
              className="btn-login py-1 px-3 text-xs flex gap-1 items-center"
              title="Đăng xuất tài khoản"
            >
              Đăng Xuất
            </button>
          </div>
      ) : (
        <>
          <button className="btn-login hidden sm:block" onClick={() => { setAuthTab('login'); setShowAuthModal(true); }}>Đăng Nhập</button>
          <button className="btn-signup" onClick={() => { setAuthTab('register'); setShowAuthModal(true); }}>Đăng Ký</button>
        </>
      )}
    </div>
  </div>
</nav>

<div className="decor-strip border-y border-[var(--border)] bg-[var(--beige-mid)] dark:bg-[var(--vinyl-dark)]">
  <div className="decor-strip-inner text-[var(--text-soft)] dark:text-gray-400">
    <span>♪ TÌNH YÊU THUẦN KHIẾT</span>
    <span>✦ NOVEL STATION</span>
    <span>♫ ROMANCE · FANTASY · DRAMA</span>
    <span>♬ ĐỌC TRUYỆN · NGHE NHẠC</span>
    <span>✦ ${(new Date()).getFullYear()}</span>
  </div>
</div>`;

const headerRegex = /\{\/\* HEADER SECTION \*\/\}[\s\S]*?<\/header>/g;
content = content.replace(headerRegex, newHeaderStart);

fs.writeFileSync('src/App.tsx', content);
