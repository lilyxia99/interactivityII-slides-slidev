import { build } from 'slidev'
import fs from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))

const presentations = [
  { name: 'main', file: 'slides-main.md', title: '主演示' },
  { name: 'html', file: 'slides-html.md', title: 'HTML教程' },
  { name: 'css', file: 'slides-css.md', title: 'CSS教程' },
  { name: 'js', file: 'slides-js.md', title: 'JavaScript教程' }
]

// 清理dist目录
const distDir = join(__dirname, 'dist')
if (fs.existsSync(distDir)) {
  fs.rmSync(distDir, { recursive: true })
}
fs.mkdirSync(distDir)

// 构建每个演示文稿
for (const pres of presentations) {
  console.log(`构建 ${pres.title}...`)
  
  await build(join(__dirname, pres.file), {
    out: join(distDir, pres.name),
    base: `/${pres.name}/`
  })
  
  // 在每个演示中添加导航链接
  const indexPath = join(distDir, pres.name, 'index.html')
  let html = fs.readFileSync(indexPath, 'utf8')
  
  const navHtml = presentations.map(p => 
    p.name === pres.name 
      ? `<li><strong>${p.title}</strong></li>`
      : `<li><a href="/${p.name}">${p.title}</a></li>`
  ).join('')
  
  const navBar = `
    <div style="
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      background: rgba(255,255,255,0.95);
      padding: 1rem;
      border-bottom: 1px solid #eee;
      z-index: 1000;
      backdrop-filter: blur(10px);
    ">
      <div style="max-width: 1200px; margin: 0 auto; display: flex; justify-content: space-between; align-items: center;">
        <div style="font-weight: bold; color: #3ab9d5;">📊 Slidev 演示集</div>
        <ul style="display: flex; gap: 1rem; list-style: none; margin: 0; padding: 0;">
          ${navHtml}
        </ul>
      </div>
    </div>
    <div style="height: 70px;"></div>
  `
  
  // 插入导航栏
  html = html.replace('</head>', `
    <style>
      body { padding-top: 70px; }
      ul { list-style: none; }
      a { text-decoration: none; color: #3ab9d5; }
      a:hover { text-decoration: underline; }
    </style>
  </head>`)
  
  html = html.replace('<body>', `<body>${navBar}`)
  
  fs.writeFileSync(indexPath, html)
}

// 复制导航页到dist根目录
fs.copyFileSync(
  join(__dirname, 'public', 'index.html'),
  join(distDir, 'index.html')
)

console.log('✅ 所有演示文稿构建完成！')
console.log('\n访问地址：')
presentations.forEach(p => {
  console.log(`  • ${p.title}: /${p.name}`)
})
console.log('\n部署到 Vercel 后，可以通过不同路径访问各个演示。')