// build-simple.js - 支持数字前缀
import { execSync } from 'child_process'
import fs from 'fs'
import path from 'path'

console.log('🚀 构建 Slidev 演示文稿...\n')

// 查找所有幻灯片文件
const slideFiles = []
const files = fs.readdirSync('.')

files.forEach(file => {
  // 匹配 patterns:
  // slides.md, 01-slides.md, slides-xxx.md, 01-slides-xxx.md
  const isSlideFile = 
    file === 'slides.md' || 
    /^\d{2}-slides\.md$/.test(file) ||
    file.startsWith('slides-') && file.endsWith('.md') ||
    /^\d{2}-slides-.*\.md$/.test(file)
  
  if (isSlideFile) {
    // 提取信息
    const match = file.match(/^(\d{2}-)?(slides)(?:-(.*))?\.md$/)
    if (match) {
      const [, prefix, , topic] = match
      const order = prefix ? parseInt(prefix) : 999 // 没有前缀的排最后
      const name = topic || 'main'
      
      slideFiles.push({
        file,
        name,
        title,
        order,
        prefix: prefix || ''
      })
    }
  }
})

// 按数字顺序排序
slideFiles.sort((a, b) => a.order - b.order)

console.log(`📄 找到 ${slideFiles.length} 个幻灯片文件:`)
slideFiles.forEach((s, i) => {
  console.log(`  ${i + 1}. ${s.file} (顺序: ${s.order})`)
})

// 清理 dist 目录
const distDir = 'dist'
if (fs.existsSync(distDir)) {
  fs.rmSync(distDir, { recursive: true, force: true })
}
fs.mkdirSync(distDir, { recursive: true })

const builtPresentations = []

// 构建每个演示文稿
for (const slide of slideFiles) {
  console.log(`\n📦 构建: ${slide.title}...`)
  
  try {
    const outputDir = slide.name === 'main' ? distDir : path.join(distDir, slide.name)
    const basePath = slide.name === 'main' ? '/' : `/${slide.name}/`
    
    execSync(`npx slidev build ${slide.file} --out ${outputDir} --base ${basePath}`, {
      stdio: 'inherit',
      shell: true
    })
    
    builtPresentations.push(slide)
    console.log(`✅ ${slide.title} 构建完成`)
    
  } catch (error) {
    console.error(`❌ ${slide.title} 构建失败:`, error.message)
  }
}

// 创建简洁导航页面
console.log('\n🔗 创建导航页面...')
const navHtml = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Slidev 演示集</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, sans-serif;
      max-width: 1000px;
      margin: 0 auto;
      padding: 40px 20px;
      line-height: 1.6;
      color: #333;
    }
    
    .header {
      text-align: center;
      margin-bottom: 50px;
    }
    
    .header h1 {
      font-size: 2.5rem;
      margin-bottom: 10px;
      color: #2c3e50;
    }
    
    .header p {
      color: #666;
      font-size: 1.1rem;
    }
    
    .cards {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: 25px;
    }
    
    .card {
      background: #fff;
      border-radius: 10px;
      padding: 25px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.08);
      border: 1px solid #eee;
      text-decoration: none;
      color: inherit;
      transition: all 0.2s ease;
    }
    
    .card:hover {
      transform: translateY(-3px);
      box-shadow: 0 6px 16px rgba(0,0,0,0.12);
      border-color: #3ab9d5;
    }
    
    .card-title {
      font-size: 1.3rem;
      margin: 0 0 10px 0;
      color: #2c3e50;
    }
    
    .card-description {
      color: #666;
      margin: 0 0 15px 0;
      font-size: 0.95rem;
    }
    
    .card-path {
      font-size: 0.85rem;
      color: #3ab9d5;
      font-family: 'Fira Code', monospace;
      background: #f5f9ff;
      padding: 4px 8px;
      border-radius: 4px;
      display: inline-block;
    }
    
    .footer {
      text-align: center;
      margin-top: 50px;
      padding-top: 20px;
      border-top: 1px solid #eee;
      color: #888;
      font-size: 0.9rem;
    }
    
    .footer a {
      color: #3ab9d5;
      text-decoration: none;
    }
    
    @media (max-width: 768px) {
      .cards {
        grid-template-columns: 1fr;
      }
      
      .header h1 {
        font-size: 2rem;
      }
    }
  </style>
</head>
<body>
  <div class="header">
    <h1>Interactivity II Slides</h1>
    <p>total of ${builtPresentations.length} slies to check out</p>
  </div>
  
  <div class="cards">
    ${builtPresentations.map(pres => `
      <a href="/${pres.name === 'main' ? '' : pres.name}" class="card">
        <h3 class="card-title">${pres.title}</h3>
        <p class="card-description">lcick to see complete ${pres.title} slides</p>
        <span class="card-path">/${pres.name === 'main' ? '' : pres.name}</span>
      </a>
    `).join('')}
  </div>
  
  <div class="footer">
    <p>using <a href="https://sli.dev" target="_blank">Slidev</a> built • and deployed at Vercel</p>
    <p style="margin-top: 5px;">built at: ${new Date().toLocaleString('zh-CN')}</p>
  </div>
</body>
</html>`

fs.writeFileSync(path.join(distDir, 'index.html'), navHtml)
console.log('✅ 导航页面创建完成')

// 显示构建信息
console.log('\n🎉 构建完成！')
console.log('\n📂 输出目录: dist/')
console.log(`   ├── index.html        # 导航页`)
builtPresentations.forEach(pres => {
  const path = pres.name === 'main' ? 'dist/' : `dist/${pres.name}/`
  console.log(`   ├── ${pres.name === 'main' ? '(主文件)' : `${pres.name}/`}      # ${pres.title}`)
})

console.log('\n🌐 访问路径:')
console.log(`   导航页: /`)
builtPresentations.forEach(pres => {
  console.log(`   ${pres.title}: /${pres.name === 'main' ? '' : pres.name}`)
})

console.log('\n🚀 本地预览:')
console.log(`   cd dist && npx serve`)
console.log(`   浏览器打开: http://localhost:3000`)

// 辅助函数
function getTitleFromFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8')
    const match = content.match(/title:\s*(.+)/)
    return match ? match[1].trim() : null
  } catch {
    return null
  }
}

function formatTitle(name) {
  if (name === 'main') return '主演示文稿'
  // 将 kebab-case 转换为标题
  return name
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ') + ' 教程'
}