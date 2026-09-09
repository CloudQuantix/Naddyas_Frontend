const fs = require('fs');
const path = require('path');

const replacements = [
  // Primary Red -> Maroon
  { regex: /#c12727/gi, replacement: 'var(--theme-maroon)' },
  
  // Dark Reds -> Maroon Dark
  { regex: /#a02020/gi, replacement: 'var(--theme-maroon-dark)' },
  { regex: /#9a1f1f/gi, replacement: 'var(--theme-maroon-dark)' },
  { regex: /#8b1a1a/gi, replacement: 'var(--theme-maroon-dark)' },
  
  // Oranges/Light Reds -> Gold
  { regex: /#ff6b6b/gi, replacement: 'var(--theme-gold)' },
  { regex: /#ffa500/gi, replacement: 'var(--theme-gold)' },
  { regex: /#ff8a65/gi, replacement: 'var(--theme-gold)' },
  { regex: /#ff5722/gi, replacement: 'var(--theme-gold)' },
  { regex: /#ff7043/gi, replacement: 'var(--theme-gold-light)' },
  { regex: /#e64a19/gi, replacement: 'var(--theme-gold)' },
  
  // Background Whites -> Cream
  { regex: /#fff8f5/gi, replacement: 'var(--theme-cream)' },
  { regex: /#f4f7fb/gi, replacement: 'var(--theme-cream-dark)' },
];

function processDirectory(dirPath) {
  const files = fs.readdirSync(dirPath);

  for (const file of files) {
    const fullPath = path.join(dirPath, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      if (file !== 'node_modules' && file !== '.next' && file !== '.git') {
        processDirectory(fullPath);
      }
    } else if (file.endsWith('.css') || file.endsWith('.tsx') || file.endsWith('.ts')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      let changed = false;

      for (const { regex, replacement } of replacements) {
        if (regex.test(content)) {
          content = content.replace(regex, replacement);
          changed = true;
        }
      }

      if (changed) {
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log(`Updated: ${fullPath}`);
      }
    }
  }
}

console.log('Starting color replacement...');
processDirectory(path.join(__dirname, 'app'));
console.log('Done!');
