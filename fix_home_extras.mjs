import fs from 'fs';

let content = fs.readFileSync('src/components/HomeView.tsx', 'utf8');

const highlightCommentsSection = `
              {/* HIGHLIGHT COMMENTS */}
              <div>
                <div className="section-header">
                  <div className="section-title">
                    <h2>Bình Luận Nổi Bật</h2>
                    <span className="section-badge text-[var(--pink-text)] text-lg">♪</span>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-4">
                  {globalComments.filter(c => c.chapterId).slice(0, 4).map(c => {
                     const nv = novels.find(n => n.id === c.novelId);
                     return (
                      <div key={c.id} className="bg-[var(--cream)] border border-[var(--border)] rounded-[14px] p-4 relative overflow-hidden">
                        <div className="absolute right-3 bottom-2 text-3xl opacity-[0.06] text-[var(--text-main)] pointer-events-none">♩</div>
                        <div className="text-3xl leading-none text-[var(--pink-light)] font-serif mb-1">"</div>
                        <p className="text-[13px] text-[var(--text-mid)] leading-relaxed mb-3 italic">{c.content}</p>
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full bg-[var(--blue-light)] flex items-center justify-center text-[10px] object-cover font-bold text-[var(--blue-text)] shrink-0 uppercase">
                           {c.userName.substring(0, 2)}
                          </div>
                          <span className="text-[11px] text-[var(--text-mid)] font-semibold">{c.userName}</span>
                          <span className="inline-block px-1.5 rounded-md text-[9px] font-semibold bg-[var(--pink-light)] text-[var(--pink-text)]">{c.userRole}</span>
                          <span className="text-[10px] text-[var(--pink-text)] font-semibold truncate max-w-[100px] ml-auto" onClick={() => nv && handleSelectNovel(nv.id)}>• {nv ? nv.title : 'Truyện'}</span>
                        </div>
                      </div>
                     );
                  })}
                </div>
              </div>

              {/* COMMENTS */}
`;

content = content.replace("              {/* COMMENTS */}\n", highlightCommentsSection);

const radioSection = `              {/* RADIO MUSIC PLAYER */}
              <div className="bg-[var(--vinyl-dark)] rounded-2xl overflow-hidden border border-white/5">
                <div className="py-4 px-5 border-b border-white/5">
                  <div className="flex items-center gap-2">
                    <svg width="20" height="14" viewBox="0 0 20 14" fill="none" className="opacity-60">
                      <rect x="1" y="3" width="18" height="10" rx="2" stroke="rgba(255,255,255,0.5)" strokeWidth="1"/>
                      <circle cx="14" cy="8" r="2.5" stroke="rgba(255,255,255,0.5)" strokeWidth="1"/>
                      <line x1="4" y1="6" x2="4" y2="10" stroke="rgba(255,255,255,0.5)" strokeWidth="0.8"/>
                      <line x1="6" y1="5" x2="6" y2="11" stroke="rgba(255,255,255,0.5)" strokeWidth="0.8"/>
                      <line x1="8" y1="7" x2="8" y2="9" stroke="rgba(255,255,255,0.5)" strokeWidth="0.8"/>
                      <path d="M5 1L15 1" stroke="rgba(255,255,255,0.3)" strokeWidth="1" strokeLinecap="round"/>
                    </svg>
                    <span className="text-[11px] font-semibold tracking-widest uppercase text-white/45">Novel Radio</span>
                    <div className="ml-auto flex gap-1 items-center">
                      <div className="w-[6px] h-[6px] rounded-full bg-red-500 animate-pulse" />
                      <span className="text-[10px] text-white/30">LIVE</span>
                    </div>
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-2xl">🎙️</div>
                    <div>
                      <div className="text-[13px] font-semibold text-white/85">Nhạc Nền Lãng Mạn</div>
                      <div className="text-[11px] text-white/40">Kênh: Tình Yêu Thuần Khiết</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-0.5 h-8 mb-4 opacity-70">
                    {Array.from({length: 40}).map((_, i) => (
                      <div key={i} className="flex-1 rounded-sm bg-[rgba(242,196,206,0.5)]" style={{ height: (3 + Math.random() * 24) + 'px', animation: \`wave \${0.4+Math.random()*0.6}s ease-in-out \${i*0.03}s infinite alternate\` }} />
                    ))}
                  </div>
                  <div className="flex items-center justify-center gap-3">
                    <button className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                      <svg viewBox="0 0 10 10" className="w-[11px] h-[11px] fill-white/60"><polygon points="8,1 1,5 8,9"/></svg>
                    </button>
                    <button className="w-9 h-9 rounded-full bg-[var(--pink)] flex items-center justify-center hover:bg-[#f5d0d8] transition-colors shadow-lg">
                       <svg viewBox="0 0 10 10" className="w-[13px] h-[13px] fill-[var(--brown-dark)] ml-[2px]"><polygon points="2,1 9,5 2,9"/></svg>
                    </button>
                    <button className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                      <svg viewBox="0 0 10 10" className="w-[11px] h-[11px] fill-white/60"><polygon points="2,1 9,5 2,9"/></svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      )}
`;

content = content.replace("            </div>\n          </div>\n        </div>\n      </section>\n      )}", radioSection);

fs.writeFileSync('src/components/HomeView.tsx', content);
