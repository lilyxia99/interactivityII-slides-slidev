const { execSync } = require('child_process')
const fs = require('fs')

// 构建当前slides.md（主演示）
console.log('构建主演示...')
execSync('npx slidev build slides.md --out dist', { stdio: 'inherit' })

// 如果有其他演示文件
const otherSlides = [
  'slides-html.md',
  'slides-css.md', 
  'slides-js.md'
]

otherSlides.forEach(file => {
  if (fs.existsSync(file)) {
    const name = file.replace('slides-', '').replace('.md', '')
    console.log(`构建 ${name} 演示...`)
    execSync(`npx slidev build ${file} --out dist/${name} --base /${name}/`, {
      stdio: 'inherit'
    })
  }
})

// 创建导航页面
const navItems = otherSlides
  .filter(f => fs.existsSync(f))
  .map(f => {
    const name = f.replace('slides-', '').replace('.md', '')
    return `<li><a href="/${name}">${name.toUpperCase()} 演示</a></li>`
  })
  .join('')

const navHtml = `
<!DOCTYPE html>
<html>
<head>
  <title>我的演示集</title>
  <style>
    body { font-family: sans-serif; padding: 2rem; }
    ul { list-style: none; padding: 0; }
    li { margin: 0.5rem 0; }
    a { color: #3ab9d5; text-decoration: none; }
    a:hover { text-decoration: underline; }
  </style>
</head>
<body>
  <h1>选择演示文稿</h1>
  <ul>
    <li><a href="/">主演示</a></li>
    ${navItems}
  </ul>
</body>
</html>
`

fs.writeFileSync('dist/index.html', navHtml)