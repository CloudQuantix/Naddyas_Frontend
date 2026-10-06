const fs = require('fs');
const path = require('path');

const replacements = [
  { regex: /#8b0000/gi, replacement: 'var(--theme-maroon)' },
  { regex: /#6b0000/gi, replacement: 'var(--theme-maroon-dark)' },
  { regex: /#ff3333/gi, replacement: 'var(--theme-gold)' },
  { regex: /#ff0000/gi, replacement: 'var(--theme-gold)' },
  { regex: /#cc0000/gi, replacement: 'var(--theme-gold-light)' },
  { regex: /rgba\(139,\s*0,\s*0,/gi, replacement: 'rgba(26, 54, 93,' }, // 139,0,0 is dark red. #1A365D is 26,54,93
  { regex: /rgba\(255,\s*51,\s*51,/gi, replacement: 'rgba(96, 165, 250,' } // 255,51,51 is ff3333. #60A5FA is 96,165,250
];

function processDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processDir(fullPath);
    } else if (fullPath.endsWith('.css') || fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      let changed = false;
      for (const { regex, replacement } of replacements) {
        if (regex.test(content)) {
          content = content.replace(regex, replacement);
          changed = true;
        }
      }
      if (changed) {
        fs.writeFileSync(fullPath, content);
        console.log(`Updated ${fullPath}`);
      }
    }
  }
}

processDir(path.join(__dirname, 'app'));
