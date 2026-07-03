const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

const targetStr = `onClick={() => { 
                            if (currentUser.role === 'Editor') {
                               setSelectedEditorName(currentUser.displayName);
                               setCurrentView('editor-profile');
                            } else {
                               setCurrentView('profile'); 
                            }`;

const replacementStr = `onClick={() => { 
                            if (currentUser.role !== 'Reader') {
                               setSelectedEditorName(currentUser.displayName);
                               setCurrentView('editor-profile');
                            } else {
                               setCurrentView('profile'); 
                            }`;

if (code.includes(targetStr)) {
    code = code.replace(targetStr, replacementStr);
    fs.writeFileSync('src/App.tsx', code);
    console.log("Patched mobile menu Admin fix successfully.");
} else {
    console.error("Could not find the target block for mobile menu Admin fix.");
}
