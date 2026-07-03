import fs from 'fs';

let content = fs.readFileSync('src/App.tsx', 'utf8');

// Add import
const importTarget = "import { ParticlesContainer } from './components/ParticlesContainer';\n";
const importReplacement = "import { ParticlesContainer } from './components/ParticlesContainer';\nimport { HomeView } from './components/HomeView';\n";
content = content.replace(importTarget, importReplacement);

// Replace the currentView === 'home' block
const homeTarget = /\{\/\* VIEW: HOME DISCOVERY PAGE \*\/\}[\s\S]*?\{\/\* VIEW: ALL NOVELS & DYNAMIC TAGS COLLECTION \*\/\}/g;

const homeReplacement = `{/* VIEW: HOME DISCOVERY PAGE */}
          {currentView === 'home' && (
            <HomeView
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              filteredCatalog={filteredCatalog}
              novels={novels}
              chapters={chapters}
              currentUser={currentUser}
              handleSelectNovel={handleSelectNovel}
              globalComments={globalComments}
              onAddGeneralComment={(text) => {
                if (!currentUser) return;
                const newC = {
                  id: \`com-\${Date.now()}\`,
                  novelId: 'global',
                  userName: currentUser.displayName,
                  userRole: currentUser.role,
                  content: text,
                  createdAt: new Date().toISOString(),
                };
                const merged = [newC, ...globalComments];
                setGlobalComments(merged);
                // Also save to DB
                // Not ideal mutating db directly here, but using existing globalComments pattern
              }}
              darkMode={darkMode}
              setShowAuthModal={setShowAuthModal}
              setAuthTab={setAuthTab}
              setCurrentView={setCurrentView}
            />
          )}

          {/* VIEW: ALL NOVELS & DYNAMIC TAGS COLLECTION */}`;

content = content.replace(homeTarget, homeReplacement);

fs.writeFileSync('src/App.tsx', content);
