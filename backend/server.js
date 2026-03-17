import express from 'express'
import cors from 'cors'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import mysql from 'mysql2/promise'

// 配置环境变量
dotenv.config()

// 创建Express应用
const app = express()
const PORT = process.env.PORT || 5000

// 中间件
app.use(cors())
app.use(express.json())

// 获取当前文件路径
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// 静态文件服务
app.use(express.static(join(__dirname, '../frontend/dist')))

// 创建MySQL连接池
const pool = mysql.createPool({
  host: '121.43.82.62',
  user: 'reading_user',
  password: 'Reading@123456',
  database: 'reading_community',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
})

// 初始化数据库
async function initializeDatabase() {
  try {
    // 创建表结构
    await createTables()
    
    // 检查是否有管理员用户
    const [users] = await pool.execute('SELECT COUNT(*) as count FROM users')
    if (users[0].count === 0) {
      // 添加默认管理员用户
      await pool.execute(
        'INSERT INTO users (username, email, password, is_subscribed, subscription_end, created_at) VALUES (?, ?, ?, ?, ?, ?)',
        ['admin', 'admin@example.com', bcrypt.hashSync('admin123', 10), 1, null, formatDateTime(new Date())]
      )
      console.log('已创建默认管理员用户')
    }
    
    // 检查是否有测试文章
    const [articles] = await pool.execute('SELECT COUNT(*) as count FROM articles')
    if (articles[0].count === 0) {
      // 添加一些测试文章
      const now = new Date()
      const formattedDate = formatDateTime(now)
      await pool.execute(
        'INSERT INTO articles (title, content, excerpt, author_id, is_premium, views, likes, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
        ['如何提高学习效率', '学习效率是指在一定时间内获取知识或技能的能力。提高学习效率可以帮助你更快地达成目标...', '学习效率是指在一定时间内获取知识或技能的能力。提高学习效率可以帮助你更快地达成目标...', 1, 0, 123, 25, formattedDate, formattedDate]
      )
      await pool.execute(
        'INSERT INTO articles (title, content, excerpt, author_id, is_premium, views, likes, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
        ['个人财务管理的7个关键原则', '个人财务管理是一项重要的生活技能，它可以帮助你实现财务自由...', '个人财务管理是一项重要的生活技能，它可以帮助你实现财务自由...', 1, 1, 89, 18, formattedDate, formattedDate]
      )
      console.log('已添加测试文章')
    }
    
    console.log('成功初始化MySQL数据库')
  } catch (error) {
    console.error('初始化数据库失败:', error)
    throw error
  }
}

// 格式化日期时间为 MySQL 支持的格式
function formatDateTime(date) {
  return date.toISOString().replace('T', ' ').slice(0, 19)
}

// 创建数据库表
async function createTables() {
  try {
    // 创建用户表
    await pool.execute(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(50) NOT NULL UNIQUE,
        email VARCHAR(100) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        is_subscribed TINYINT DEFAULT 0,
        subscription_end DATE DEFAULT NULL,
        created_at DATETIME NOT NULL
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `)
    
    // 创建文章表
    await pool.execute(`
      CREATE TABLE IF NOT EXISTS articles (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(200) NOT NULL,
        content TEXT NOT NULL,
        excerpt VARCHAR(500) NOT NULL,
        author_id INT NOT NULL,
        is_premium TINYINT DEFAULT 0,
        views INT DEFAULT 0,
        likes INT DEFAULT 0,
        created_at DATETIME NOT NULL,
        updated_at DATETIME NOT NULL,
        FOREIGN KEY (author_id) REFERENCES users(id) ON DELETE CASCADE
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `)
    
    // 创建评论表
    await pool.execute(`
      CREATE TABLE IF NOT EXISTS comments (
        id INT AUTO_INCREMENT PRIMARY KEY,
        article_id INT NOT NULL,
        user_id INT NOT NULL,
        content TEXT NOT NULL,
        created_at DATETIME NOT NULL,
        FOREIGN KEY (article_id) REFERENCES articles(id) ON DELETE CASCADE,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `)
    
    // 创建标签表
    await pool.execute(`
      CREATE TABLE IF NOT EXISTS tags (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(50) NOT NULL UNIQUE,
        created_at DATETIME NOT NULL
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `)
    
    // 创建文章标签关联表
    await pool.execute(`
      CREATE TABLE IF NOT EXISTS article_tags (
        id INT AUTO_INCREMENT PRIMARY KEY,
        article_id INT NOT NULL,
        tag_id INT NOT NULL,
        FOREIGN KEY (article_id) REFERENCES articles(id) ON DELETE CASCADE,
        FOREIGN KEY (tag_id) REFERENCES tags(id) ON DELETE CASCADE,
        UNIQUE KEY (article_id, tag_id)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `)
    
    console.log('数据库表创建成功')
  } catch (error) {
    console.error('创建数据库表失败:', error)
    throw error
  }
}

// JWT验证中间件
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if (token == null) return res.status(401).json({ error: '未授权' })

  jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key', (err, user) => {
    if (err) return res.status(403).json({ error: '无效的令牌' })
    req.user = user
    next()
  })
}

// 健康检查路由
app.get('/api/health', async (req, res) => {
  try {
    await pool.execute('SELECT 1')
    res.json({ status: 'ok', message: '服务运行正常' })
  } catch (error) {
    res.status(500).json({ status: 'error', message: '数据库连接失败' })
  }
})

// 用户认证路由
app.post('/api/register', async (req, res) => {
  try {
    const { username, email, password } = req.body
    const hashedPassword = bcrypt.hashSync(password, 10)

    // 检查用户名和邮箱是否已存在
    const [existingUsers] = await pool.execute(
      'SELECT * FROM users WHERE username = ? OR email = ?',
      [username, email]
    )
    
    if (existingUsers.length > 0) {
      return res.status(400).json({ error: '用户名或邮箱已存在' })
    }

    // 创建新用户
    await pool.execute(
      'INSERT INTO users (username, email, password, is_subscribed, subscription_end, created_at) VALUES (?, ?, ?, ?, ?, ?)',
      [username, email, hashedPassword, 0, null, formatDateTime(new Date())]
    )

    res.status(201).json({ message: '注册成功' })
  } catch (error) {
    res.status(500).json({ error: '服务器错误' })
  }
})

app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body

    // 查找用户
    const [users] = await pool.execute(
      'SELECT * FROM users WHERE email = ?',
      [email]
    )
    
    const user = users[0]
    if (!user) return res.status(400).json({ error: '用户不存在' })

    const passwordMatch = bcrypt.compareSync(password, user.password)
    if (!passwordMatch) return res.status(400).json({ error: '密码错误' })

    const token = jwt.sign(
      { id: user.id, email: user.email, is_subscribed: user.is_subscribed },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '7d' }
    )

    res.json({ 
      token, 
      user: { 
        id: user.id, 
        username: user.username, 
        email: user.email, 
        is_subscribed: user.is_subscribed 
      } 
    })
  } catch (error) {
    res.status(500).json({ error: '服务器错误' })
  }
})

// 文章路由
app.get('/api/articles', async (req, res) => {
  try {
    const { premium, page = 1, limit = 10 } = req.query
    const offset = (parseInt(page) - 1) * parseInt(limit)
    
    // 构建查询条件
    let whereClause = ''
    let params = []
    if (premium) {
      whereClause = 'WHERE is_premium = ?'
      params.push(premium)
    }
    
    // 查询文章总数
    const [totalResult] = await pool.execute(
      `SELECT COUNT(*) as total FROM articles ${whereClause}`,
      params
    )
    const total = totalResult[0].total
    
    // 查询文章列表
    const [articles] = await pool.execute(
      `SELECT * FROM articles ${whereClause} ORDER BY created_at DESC LIMIT ? OFFSET ?`,
      [...params, parseInt(limit), offset]
    )
    
    res.json({
      articles,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        totalPages: Math.ceil(total / parseInt(limit))
      }
    })
  } catch (error) {
    res.status(500).json({ error: '服务器错误' })
  }
})

app.get('/api/articles/:id', async (req, res) => {
  try {
    const { id } = req.params
    
    // 查找文章
    const [articles] = await pool.execute(
      'SELECT * FROM articles WHERE id = ?',
      [id]
    )
    
    const article = articles[0]
    if (!article) return res.status(404).json({ error: '文章不存在' })
    
    // 更新浏览量
    await pool.execute(
      'UPDATE articles SET views = views + 1 WHERE id = ?',
      [id]
    )
    
    // 返回更新后的文章
    const [updatedArticles] = await pool.execute(
      'SELECT * FROM articles WHERE id = ?',
      [id]
    )
    
    res.json(updatedArticles[0])
  } catch (error) {
    res.status(500).json({ error: '服务器错误' })
  }
})

// 创建文章（需要认证）
app.post('/api/articles', authenticateToken, async (req, res) => {
  try {
    const { title, content, excerpt, is_premium } = req.body
    const author_id = req.user.id
    
    if (!title || !content) {
      return res.status(400).json({ error: '标题和内容不能为空' })
    }
    
    // 创建新文章
    const now = new Date()
    const formattedDate = formatDateTime(now)
    const [result] = await pool.execute(
      'INSERT INTO articles (title, content, excerpt, author_id, is_premium, views, likes, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [
        title,
        content,
        excerpt || content.substring(0, 200) + '...',
        author_id,
        is_premium || 0,
        0,
        0,
        formattedDate,
        formattedDate
      ]
    )
    
    // 获取创建的文章
    const [articles] = await pool.execute(
      'SELECT * FROM articles WHERE id = ?',
      [result.insertId]
    )
    
    res.status(201).json(articles[0])
  } catch (error) {
    res.status(500).json({ error: '服务器错误' })
  }
})

// 更新文章（需要认证）
app.put('/api/articles/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params
    const { title, content, excerpt, is_premium } = req.body
    
    // 检查文章是否存在且属于当前用户
    const [articles] = await pool.execute(
      'SELECT * FROM articles WHERE id = ? AND author_id = ?',
      [id, req.user.id]
    )
    
    if (articles.length === 0) return res.status(404).json({ error: '文章不存在或无权限' })
    
    // 更新文章
    await pool.execute(
      'UPDATE articles SET title = ?, content = ?, excerpt = ?, is_premium = ?, updated_at = ? WHERE id = ? AND author_id = ?',
      [
        title,
        content,
        excerpt || content.substring(0, 200) + '...',
        is_premium,
        formatDateTime(new Date()),
        id,
        req.user.id
      ]
    )
    
    // 获取更新后的文章
    const [updatedArticles] = await pool.execute(
      'SELECT * FROM articles WHERE id = ?',
      [id]
    )
    
    res.json(updatedArticles[0])
  } catch (error) {
    res.status(500).json({ error: '服务器错误' })
  }
})

// 删除文章（需要认证）
app.delete('/api/articles/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params
    
    // 检查文章是否存在且属于当前用户
    const [articles] = await pool.execute(
      'SELECT * FROM articles WHERE id = ? AND author_id = ?',
      [id, req.user.id]
    )
    
    if (articles.length === 0) return res.status(404).json({ error: '文章不存在或无权限' })
    
    // 删除文章
    await pool.execute(
      'DELETE FROM articles WHERE id = ? AND author_id = ?',
      [id, req.user.id]
    )
    
    res.json({ message: '文章删除成功' })
  } catch (error) {
    res.status(500).json({ error: '服务器错误' })
  }
})

// 点赞文章
app.post('/api/articles/:id/like', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params
    
    // 查找文章
    const [articles] = await pool.execute(
      'SELECT * FROM articles WHERE id = ?',
      [id]
    )
    
    if (articles.length === 0) return res.status(404).json({ error: '文章不存在' })
    
    // 更新点赞数
    await pool.execute(
      'UPDATE articles SET likes = likes + 1 WHERE id = ?',
      [id]
    )
    
    // 获取更新后的点赞数
    const [updatedArticles] = await pool.execute(
      'SELECT likes FROM articles WHERE id = ?',
      [id]
    )
    
    res.json({ likes: updatedArticles[0].likes })
  } catch (error) {
    res.status(500).json({ error: '服务器错误' })
  }
})

// 订阅路由
app.post('/api/subscribe', authenticateToken, async (req, res) => {
  try {
    const { plan = 'monthly' } = req.body
    const user_id = req.user.id
    let subscription_end
    
    // 根据订阅计划设置有效期
    if (plan === 'monthly') {
      subscription_end = new Date()
      subscription_end.setMonth(subscription_end.getMonth() + 1)
    } else if (plan === 'yearly') {
      subscription_end = new Date()
      subscription_end.setFullYear(subscription_end.getFullYear() + 1)
    } else {
      // 永久订阅
      subscription_end = null
    }
    
    // 更新用户订阅信息
    await pool.execute(
      'UPDATE users SET is_subscribed = 1, subscription_end = ? WHERE id = ?',
      [subscription_end ? subscription_end.toISOString().split('T')[0] : null, user_id]
    )
    
    // 获取更新后的用户信息
    const [users] = await pool.execute(
      'SELECT id, username, email, is_subscribed, subscription_end FROM users WHERE id = ?',
      [user_id]
    )
    
    res.json({
      success: true,
      user: users[0]
    })
  } catch (error) {
    res.status(500).json({ error: '服务器错误' })
  }
})

// 取消订阅
app.post('/api/unsubscribe', authenticateToken, async (req, res) => {
  try {
    const user_id = req.user.id
    
    // 更新用户订阅信息
    await pool.execute(
      'UPDATE users SET is_subscribed = 0, subscription_end = NULL WHERE id = ?',
      [user_id]
    )
    
    // 获取更新后的用户信息
    const [users] = await pool.execute(
      'SELECT id, username, email, is_subscribed, subscription_end FROM users WHERE id = ?',
      [user_id]
    )
    
    res.json({
      success: true,
      user: users[0]
    })
  } catch (error) {
    res.status(500).json({ error: '服务器错误' })
  }
})

// 获取订阅信息
app.get('/api/subscription', authenticateToken, async (req, res) => {
  try {
    const user_id = req.user.id
    
    // 查找用户
    const [users] = await pool.execute(
      'SELECT is_subscribed, subscription_end FROM users WHERE id = ?',
      [user_id]
    )
    
    if (users.length === 0) return res.status(404).json({ error: '用户不存在' })
    
    res.json(users[0])
  } catch (error) {
    res.status(500).json({ error: '服务器错误' })
  }
})

// 评论路由
app.get('/api/articles/:id/comments', async (req, res) => {
  try {
    const { id } = req.params
    
    // 获取文章评论并关联用户信息
    const [comments] = await pool.execute(
      `SELECT c.*, u.username 
       FROM comments c 
       JOIN users u ON c.user_id = u.id 
       WHERE c.article_id = ? 
       ORDER BY c.created_at DESC`,
      [id]
    )
    
    res.json(comments)
  } catch (error) {
    res.status(500).json({ error: '服务器错误' })
  }
})

app.post('/api/articles/:id/comments', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params
    const { content } = req.body
    const user_id = req.user.id
    
    if (!content || content.trim() === '') {
      return res.status(400).json({ error: '评论内容不能为空' })
    }
    
    // 创建新评论
    const [result] = await pool.execute(
      'INSERT INTO comments (article_id, user_id, content, created_at) VALUES (?, ?, ?, ?)',
      [parseInt(id), user_id, content.trim(), formatDateTime(new Date())]
    )
    
    // 获取创建的评论及用户信息
    const [comments] = await pool.execute(
      `SELECT c.*, u.username 
       FROM comments c 
       JOIN users u ON c.user_id = u.id 
       WHERE c.id = ?`,
      [result.insertId]
    )
    
    res.status(201).json(comments[0])
  } catch (error) {
    res.status(500).json({ error: '服务器错误' })
  }
})

app.delete('/api/comments/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params
    
    // 检查评论是否存在且属于当前用户
    const [comments] = await pool.execute(
      'SELECT * FROM comments WHERE id = ? AND user_id = ?',
      [id, req.user.id]
    )
    
    if (comments.length === 0) return res.status(404).json({ error: '评论不存在或无权限' })
    
    // 删除评论
    await pool.execute(
      'DELETE FROM comments WHERE id = ? AND user_id = ?',
      [id, req.user.id]
    )
    
    res.json({ message: '评论删除成功' })
  } catch (error) {
    res.status(500).json({ error: '服务器错误' })
  }
})

// 分享功能（生成分享链接）
app.post('/api/articles/:id/share', (req, res) => {
  const { id } = req.params
  const shareUrl = `${req.protocol}://${req.get('host')}/article/${id}?share=${Date.now()}`
  
  res.json({ shareUrl })
})

// 推荐文章
app.get('/api/recommended-articles', async (req, res) => {
  try {
    const { exclude_id } = req.query
    
    // 构建查询条件
    let whereClause = 'WHERE is_premium = 0'
    let params = []
    
    if (exclude_id) {
      whereClause += ' AND id != ?'
      params.push(exclude_id)
    }
    
    // 查询推荐文章（按浏览量降序排序，取前5篇）
    const [articles] = await pool.execute(
      `SELECT * FROM articles ${whereClause} ORDER BY views DESC LIMIT 5`,
      params
    )
    
    res.json(articles)
  } catch (error) {
    res.status(500).json({ error: '服务器错误' })
  }
})

// AI辅助功能
// AI内容生成
app.post('/api/ai/generate-content', authenticateToken, (req, res) => {
  const { prompt, type = 'article' } = req.body
  
  // 这里使用模拟的AI内容生成
  // 在实际Trae环境中，可以调用Trae的内置AI模型
  const generatedContent = `这是由AI生成的${type}内容：\n\n基于您的提示 "${prompt}"，AI生成了以下内容：\n\n1. 引言部分：介绍${prompt}的背景和重要性\n\n2. 主体部分：\n   - 点1：详细说明${prompt}的第一个方面\n   - 点2：详细说明${prompt}的第二个方面\n   - 点3：详细说明${prompt}的第三个方面\n\n3. 结论部分：总结${prompt}的主要观点和未来展望\n\n这是一个示例生成，实际应用中会使用更强大的AI模型生成更丰富的内容。`
  
  res.json({ content: generatedContent })
})

// AI内容摘要
app.post('/api/ai/summarize-content', authenticateToken, (req, res) => {
  const { content } = req.body
  
  // 这里使用模拟的AI摘要生成
  // 在实际Trae环境中，可以调用Trae的内置AI模型
  const summary = `这是由AI生成的内容摘要：\n\n${content.substring(0, 100)}...\n\n核心观点：\n1. 观点1：...\n2. 观点2：...\n3. 观点3：...\n\n这是一个示例摘要，实际应用中会使用更强大的AI模型生成更准确的摘要。`
  
  res.json({ summary })
})

// AI智能推荐（基于用户兴趣）
app.get('/api/ai/recommendations', authenticateToken, async (req, res) => {
  try {
    const user_id = req.user.id
    
    // 这里使用模拟的AI推荐
    // 在实际Trae环境中，可以调用Trae的内置AI模型分析用户兴趣
    // 查询免费文章并随机排序，取前5篇
    const [articles] = await pool.execute(
      `SELECT * FROM articles WHERE is_premium = 0 ORDER BY RAND() LIMIT 5`
    )
    
    res.json({
      recommendations: articles,
      message: '基于您的阅读历史和兴趣推荐'
    })
  } catch (error) {
    res.status(500).json({ error: '服务器错误' })
  }
})

// AI内容优化
app.post('/api/ai/optimize-content', authenticateToken, (req, res) => {
  const { content, type = 'article' } = req.body
  
  // 这里使用模拟的AI内容优化
  // 在实际Trae环境中，可以调用Trae的内置AI模型
  const optimizedContent = `这是由AI优化后的${type}内容：\n\n[优化后的内容]\n${content}\n\n[优化说明]\n1. 提升了标题的吸引力\n2. 优化了段落结构和逻辑 flow\n3. 增强了内容的可读性和用户体验\n4. 添加了适当的关键词以提高SEO效果\n\n这是一个示例优化，实际应用中会使用更强大的AI模型进行更全面的优化。`
  
  res.json({ optimizedContent })
})

// 启动服务器
async function startServer() {
  await initializeDatabase()
  app.listen(PORT, () => {
    console.log(`服务器运行在 http://localhost:${PORT}`)
  })
}

startServer()