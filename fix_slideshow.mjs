import fs from 'fs';

let content = fs.readFileSync('src/components/HomeView.tsx', 'utf8');

const targetSlideshow = `      {/* HERO SLIDESHOW */}
      {!searchQuery && featuredSlides.length > 0 && (
        <section className="hero-section">
          <div className="container">
            <div className="slideshow-wrapper">
              <div className="stars-bg">
                {Array.from({ length: 30 }).map((_, i) => (
                  <div key={i} className="star-dot" style={{ left: Math.random()*100+'%', top: Math.random()*100+'%', animationDelay: Math.random()*3+'s', animationDuration: 1.5+Math.random()*2+'s' }} />
                ))}
              </div>
              {featuredSlides.map((novel, index) => (
                <div key={novel.id} className={\`slide \${currentSlide === index ? 'active' : ''}\`}>
                  <div className="slide-cover">
                    <img src={novel.cover} className="absolute inset-0 w-full h-full object-cover opacity-50" referrerPolicy="no-referrer" />
                    <div className="slide-cover-placeholder relative z-10 text-white">
                      <svg className="cover-vinyl-icon drop-shadow-xl" viewBox="0 0 120 120">
                        <circle cx="60" cy="60" r="58" fill="#1a1a2e" stroke="#C9A84C" strokeWidth="1"/>
                        <circle cx="60" cy="60" r="40" fill="none" stroke="rgba(201,168,76,0.3)" strokeWidth="0.8"/>
                        <circle cx="60" cy="60" r="25" fill="none" stroke="rgba(201,168,76,0.2)" strokeWidth="0.8"/>
                        <circle cx="60" cy="60" r="8" fill="#C9A84C"/>
                        <circle cx="60" cy="60" r="3.5" fill="#1a1a2e"/>
                      </svg>
                    </div>
                  </div>
                  <div className="slide-content">
                    <div className="slide-meta">
                      <span className="slide-tag">{novel.genres[0]}</span>
                      <span className="slide-author-badge">• Tác giả: {novel.author}</span>
                    </div>
                    <div className="slide-main">
                      <h1>{novel.title}</h1>
                      <p className="slide-desc">{novel.description.slice(0, 150)}...</p>
                    </div>
                    <div>
                      <div className="slide-stats">
                        <div className="slide-stat"><span>Lượt đọc</span><strong>{(novel.views/1000).toFixed(1)}K</strong></div>
                        <div className="slide-stat"><span>Yêu thích</span><strong>{novel.hearts}</strong></div>
                        <div className="slide-stat"><span>Trạng thái</span><strong className={novel.progressStatus === 'completed' ? "text-[#EDD98A]" : "text-[#8BBBD9]"}>{novel.progressStatus === 'completed' ? 'Hoàn thành' : 'Đang tiến hành'}</strong></div>
                      </div>
                      <div className="slide-actions" style={{ marginTop: '1rem' }}>
                        <button className="btn-read" onClick={() => handleSelectNovel(novel.id)}>Đọc ngay ♫</button>
                      </div>
                    </div>
                    <div className="slide-waveform">
                      {Array.from({length: 40}).map((_, i) => (
                        <div key={i} className="slide-waveform-bar" style={{ height: 4+Math.random()*28+'px', animationDelay: i*0.04+'s', animationDuration: 0.4+Math.random()*0.6+'s' }} />
                      ))}
                    </div>
                  </div>
                </div>
              ))}
              <div className="slideshow-dots">
                {featuredSlides.map((_, idx) => (
                  <div key={idx} className={\`dot \${currentSlide === idx ? 'active' : ''}\`} onClick={() => setCurrentSlide(idx)} />
                ))}
              </div>
            </div>
          </div>
        </section>
      )}`;

const replacementSlideshow = `      {/* HERO SLIDESHOW - TAROT CARD SPREAD */}
      {!searchQuery && featuredSlides.length > 0 && (
        <section className="relative py-12 md:py-16 overflow-hidden flex items-center justify-center min-h-[600px] md:min-h-[700px] rounded-3xl mx-2 mt-4 shadow-2xl bg-[#08080c]">
          <div className="stars-bg absolute inset-0">
            {/* Ambient night sky */}
            <div className="absolute inset-0 opacity-40 mix-blend-screen" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/stardust.png")' }}></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[650px] md:w-[800px] h-[650px] md:h-[800px] bg-[radial-gradient(circle,rgba(201,168,76,0.15)_0%,rgba(0,0,0,0)_60%)] pointer-events-none rounded-full"></div>
            
            {/* Twinkling stars */}
            {Array.from({ length: 30 }).map((_, i) => (
              <div key={i} className="star-dot" style={{ left: Math.random()*100+'%', top: Math.random()*100+'%', animationDelay: Math.random()*3+'s', animationDuration: 1.5+Math.random()*2+'s' }} />
            ))}
          </div>
          
          <div className="container relative z-10 flex flex-col items-center justify-center h-full">
            
            <div className="relative w-full max-w-xs md:max-w-md h-[420px] md:h-[500px] flex items-center justify-center mb-10 mt-6" style={{ perspective: '1200px' }}>
              {featuredSlides.map((novel, index) => {
                const isActive = currentSlide === index;
                const isPrev = currentSlide === (index + 1) % featuredSlides.length || (currentSlide === 0 && index === featuredSlides.length - 1);
                const isNext = currentSlide === (index - 1 + featuredSlides.length) % featuredSlides.length || (currentSlide === featuredSlides.length - 1 && index === 0);
                
                let transformClass = 'opacity-0 scale-75 translate-y-12 pointer-events-none z-0';
                if (isActive) transformClass = 'opacity-100 scale-100 translate-y-0 translate-x-0 rotate-0 z-20 shadow-[0_20px_50px_rgba(0,0,0,0.5),0_0_30px_rgba(201,168,76,0.3)] md:hover:-translate-y-4';
                else if (isPrev) transformClass = 'opacity-[0.65] lg:opacity-75 scale-[0.85] -translate-x-20 md:-translate-x-32 -rotate-6 z-10 cursor-pointer hidden sm:flex hover:-translate-x-24 md:hover:-translate-x-36 hover:-rotate-12 hover:opacity-100';
                else if (isNext) transformClass = 'opacity-[0.65] lg:opacity-75 scale-[0.85] translate-x-20 md:translate-x-32 rotate-6 z-10 cursor-pointer hidden sm:flex hover:translate-x-24 md:hover:translate-x-36 hover:rotate-12 hover:opacity-100';
                
                // Extra check for mobile layout (showing edges of prev/next)
                if ((isPrev || isNext) && typeof window !== 'undefined' && window.innerWidth < 640) {
                     if (isPrev) transformClass = 'opacity-30 scale-[0.8] -translate-x-28 z-10 hidden'; // Hide on mobile to avoid clutter, or adjust to show slightly
                     if (isNext) transformClass = 'opacity-30 scale-[0.8] translate-x-28 z-10 hidden';
                }

                const onClickCard = () => {
                  if (isActive) handleSelectNovel(novel.id);
                  else setCurrentSlide(index);
                };

                return (
                  <div 
                    key={novel.id} 
                    onClick={onClickCard}
                    className={\`absolute inset-0 m-auto flex flex-col w-[280px] md:w-[320px] h-[420px] md:h-[480px] bg-[#1a1a25] rounded-xl overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.25,0.8,0.25,1)] border-2 border-[#c9a84c] \${transformClass}\`}
                    style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/cubes.png")' }}
                  >
                    {/* Tarot Card Inner Border */}
                    <div className="absolute inset-2 border border-[#c9a84c]/50 rounded-lg pointer-events-none z-30 transition-opacity"></div>
                    <div className="absolute inset-3 border border-[#c9a84c]/30 rounded-md pointer-events-none z-30"></div>
                    
                    {/* Decorative corners */}
                    <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-[#c9a84c] z-30"></div>
                    <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-[#c9a84c] z-30"></div>
                    <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-[#c9a84c] z-30"></div>
                    <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-[#c9a84c] z-30"></div>
                    
                    {/* Classical Card Headers */}
                    <div className="h-10 border-b border-[#c9a84c]/50 flex items-center justify-between px-5 z-20 bg-[#1a1a25]/90">
                      <span className="text-[#c9a84c] text-xs font-serif italic font-bold">{String(index + 1).padStart(2, '0')}</span>
                      <span className="text-[#c9a84c] text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase">{novel.genres[0]}</span>
                      <span className="text-[#c9a84c] text-xl leading-none font-serif">✧</span>
                    </div>

                    {/* Image Area */}
                    <div className="relative flex-1 bg-[#0a0a0f] overflow-hidden group">
                      <img src={novel.cover} className="absolute inset-0 w-full h-full object-cover opacity-80 mix-blend-luminosity group-hover:mix-blend-normal transition-all duration-1000 group-hover:scale-110" referrerPolicy="no-referrer" />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a25] via-transparent to-transparent opacity-80"></div>
                      
                      {/* Mystical circle overlay */}
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20 group-hover:opacity-10 transition-opacity duration-700">
                        <div className="w-[180px] h-[180px] md:w-[220px] md:h-[220px] rounded-full border-[0.5px] border-[#c9a84c] flex items-center justify-center">
                          <div className="w-[160px] h-[160px] md:w-[200px] md:h-[200px] rounded-full border-[0.5px] border-[#c9a84c] border-dashed"></div>
                        </div>
                      </div>
                    </div>

                    {/* Card Footer info */}
                    <div className="h-[120px] md:h-[130px] bg-gradient-to-b from-[#1a1a25]/95 to-[#12121a] flex flex-col items-center justify-center p-4 text-center z-20 border-t border-[#c9a84c]/50 relative">
                      <h3 className="font-serif text-[#fdfaf5] text-base md:text-lg font-bold leading-tight mb-1.5 line-clamp-2 px-2">{novel.title}</h3>
                      <p className="text-[#c9a84c] text-[9px] md:text-[10px] uppercase tracking-[0.15em] mb-3">~ Tác giả: {novel.author} ~</p>
                      
                      {/* Decorative separator line */}
                      <div className="w-16 h-px bg-gradient-to-r from-transparent via-[#c9a84c]/50 to-transparent mb-3 absolute bottom-11"></div>
                      
                      <div className="flex gap-5 items-center w-full justify-center mt-1">
                        <div className="flex flex-col items-center">
                          <span className="text-[#9a9aab] text-[7px] uppercase tracking-widest mb-0.5">Lượt đọc</span>
                          <span className="text-[#fdfaf5] text-[11px] font-mono tracking-tight">{(novel.views/1000).toFixed(1)}K</span>
                        </div>
                        <span className="text-[#c9a84c]/40 text-xs">|</span>
                        <div className="flex flex-col items-center">
                          <span className="text-[#9a9aab] text-[7px] uppercase tracking-widest mb-0.5">Yêu thích</span>
                          <span className="text-[#fdfaf5] text-[11px] font-mono tracking-tight">{novel.hearts}</span>
                        </div>
                      </div>
                    </div>
                    
                    {isActive && (
                      <div className="absolute inset-0 pointer-events-none border border-[#c9a84c]/20 rounded-xl z-40 bg-gradient-to-b from-[#c9a84c]/5 to-transparent"></div>
                    )}
                  </div>
                );
              })}
            </div>
            
            {/* Custom Controls */}
            <div className="flex gap-3 md:gap-5 items-center z-20 absolute bottom-6 md:bottom-8">
              <button 
                onClick={(e) => { e.stopPropagation(); setCurrentSlide((currentSlide - 1 + featuredSlides.length) % featuredSlides.length); }}
                className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-[#c9a84c]/40 flex items-center justify-center text-[#c9a84c] hover:bg-[#c9a84c]/10 hover:border-[#c9a84c] transition-all bg-[#0a0a0f]/50 backdrop-blur-sm"
                aria-label="Previous"
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4 md:w-5 md:h-5 fill-none stroke-current" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" /></svg>
              </button>
              
              <div className="flex gap-2.5 mx-2 md:mx-6">
                {featuredSlides.map((_, idx) => (
                  <div 
                    key={idx} 
                    className={\`w-2 h-2 rotate-45 transition-all duration-500 cursor-pointer \${currentSlide === idx ? 'bg-[#c9a84c] shadow-[0_0_10px_#c9a84c] scale-125' : 'bg-white/20 hover:bg-white/40'}\`} 
                    onClick={(e) => { e.stopPropagation(); setCurrentSlide(idx); }} 
                  />
                ))}
              </div>
              
              <button 
                onClick={(e) => { e.stopPropagation(); setCurrentSlide((currentSlide + 1) % featuredSlides.length); }}
                className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-[#c9a84c]/40 flex items-center justify-center text-[#c9a84c] hover:bg-[#c9a84c]/10 hover:border-[#c9a84c] transition-all bg-[#0a0a0f]/50 backdrop-blur-sm"
                aria-label="Next"
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4 md:w-5 md:h-5 fill-none stroke-current" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg>
              </button>
            </div>
            
          </div>
        </section>
      )}`;

content = content.replace(targetSlideshow, replacementSlideshow);

fs.writeFileSync('src/components/HomeView.tsx', content);
