const fs = require('fs');
let c = fs.readFileSync('app/components/Courses.module.css', 'utf8');
c = c.replace(/#dc2626/g, 'var(--theme-gold)');
c = c.replace(/rgba\(220,\s*38,\s*38,/g, 'rgba(96, 165, 250,');
c = c.replace(/#ef4444/g, 'var(--theme-gold-light)');
c = c.replace(/#2c2c2c/g, '#ffffff');
fs.writeFileSync('app/components/Courses.module.css', c);
