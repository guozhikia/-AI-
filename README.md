# 素人AI深度阅读社区

这是一个使用React+Express构建的信息产品变现平台，包含用户认证、内容管理、变现功能、社区功能和AI辅助工具。

## 项目结构

```
.
├── backend/          # 后端代码
│   ├── server.js     # Express服务器
│   ├── package.json  # 后端依赖
│   └── database.json # 数据库文件
├── frontend/         # 前端代码
│   ├── src/          # React源代码
│   │   ├── components/  # 组件
│   │   ├── context/     # 上下文
│   │   ├── pages/       # 页面
│   │   ├── App.jsx      # 应用入口
│   │   └── main.jsx     # 渲染入口
│   ├── .env          # 环境变量
│   ├── index.html    # HTML模板
│   ├── package.json  # 前端依赖
│   ├── postcss.config.js  # PostCSS配置
│   ├── tailwind.config.js # Tailwind配置
│   └── vite.config.js     # Vite配置
└── README.md         # 项目说明
```

## 技术栈

### 前端
- React 18
- React Router 6
- Tailwind CSS
- Vite
- Axios

### 后端
- Express
- Lowdb (JSON文件数据库)
- JWT (用户认证)
- Bcrypt (密码哈希)
- CORS (跨域支持)

## 运行项目

### 前端

1. 进入前端目录
```bash
cd frontend
```

2. 安装依赖
```bash
npm install
```

3. 启动开发服务器
```bash
npm run dev
```

4. 构建生产版本
```bash
npm run build
```

### 后端

1. 进入后端目录
```bash
cd backend
```

2. 安装依赖
```bash
npm install
```

3. 启动开发服务器
```bash
npm run dev
```

4. 启动生产服务器
```bash
npm start
```

## 主要功能

### 用户管理
- 注册/登录
- 个人资料管理
- 用户认证与授权
- 默认管理员账号：admin@example.com / admin123
- 登录成功后将获取JWT token，并可进入后台管理/发布文章页面

### 内容管理
- 文章列表
- 文章详情
- 文章分类
- 文章搜索

### 变现功能
- 付费专栏
- 订阅系统
- 支付集成

### 社区功能
- 评论系统
- 点赞功能
- 分享功能

### AI辅助工具
- AI内容生成
- AI内容摘要
- AI内容推荐

## 环境变量

前端环境变量（.env）：
```
VITE_API_BASE_URL=http://localhost:5000/api
```

后端环境变量（.env）：
```
PORT=5000
JWT_SECRET=your-secret-key
```

## 部署

1. 构建前端生产版本
```bash
cd frontend
npm run build
```

2. 启动后端服务器
```bash
cd backend
npm start
```

3. 访问 http://localhost:5000

## 开发说明

- 前端使用Vite构建，支持热更新
- 后端使用Express，支持自动重启
- 数据库使用Lowdb，存储在JSON文件中
- 使用JWT进行用户认证
- 使用Tailwind CSS进行样式设计

## 注意事项

- 确保Node.js版本在16.0.0以上
- 确保前端和后端的依赖都已安装
- 确保环境变量已正确配置
- 开发环境下，前端运行在3000端口，后端运行在5000端口
- 生产环境下，前端构建产物会被后端静态文件服务提供
