import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

const Articles = () => {
  const [articles, setArticles] = useState([])
  const [filteredArticles, setFilteredArticles] = useState([])
  const [selectedFilter, setSelectedFilter] = useState('all')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setLoading(true)
        // 模拟数据，展示15篇AI整合的阅读干货
        const mockArticles = [
          {
            id: 1,
            title: '《原子习惯》AI深度拆解：如何用最小行动改变人生轨迹',
            excerpt: 'AI深度拆解《原子习惯》，提炼出5个核心习惯养成法则，让你用最小行动改变人生轨迹。',
            author_id: 1,
            is_premium: 0,
            views: 12580,
            likes: 2345,
            created_at: '2026-03-15T08:00:00.000Z',
            updated_at: '2026-03-15T08:00:00.000Z'
          },
          {
            id: 2,
            title: '《思考，快与慢》AI整合：理性与直觉的博弈',
            excerpt: 'AI整合《思考，快与慢》核心内容，揭示人类决策的两大系统，帮你做出更理性的选择。',
            author_id: 1,
            is_premium: 0,
            views: 9876,
            likes: 1890,
            created_at: '2026-03-14T10:30:00.000Z',
            updated_at: '2026-03-14T10:30:00.000Z'
          },
          {
            id: 3,
            title: '《原则》AI拆解：达利欧的成功密码',
            excerpt: 'AI拆解瑞·达利欧的《原则》，整理出一套可复制的成功方法论，助你应对生活和工作中的各种挑战。',
            author_id: 1,
            is_premium: 0,
            views: 8765,
            likes: 1654,
            created_at: '2026-03-13T14:20:00.000Z',
            updated_at: '2026-03-13T14:20:00.000Z'
          },
          {
            id: 4,
            title: '《高效能人士的七个习惯》AI整合版',
            excerpt: 'AI重新整合七个习惯的核心内容，结合现代职场环境，打造适合当代人的高效能指南。',
            author_id: 1,
            is_premium: 0,
            views: 11234,
            likes: 2012,
            created_at: '2026-03-12T09:15:00.000Z',
            updated_at: '2026-03-12T09:15:00.000Z'
          },
          {
            id: 5,
            title: '《刻意练习》AI深度解析：如何成为领域专家',
            excerpt: 'AI深度解析《刻意练习》，提炼出成为专家的核心方法，让你在任何领域都能快速成长。',
            author_id: 1,
            is_premium: 0,
            views: 7654,
            likes: 1432,
            created_at: '2026-03-11T16:40:00.000Z',
            updated_at: '2026-03-11T16:40:00.000Z'
          },
          {
            id: 6,
            title: '《影响力》AI拆解：如何影响他人的决策',
            excerpt: 'AI拆解罗伯特·西奥迪尼的《影响力》，揭示6大影响他人决策的心理学原理，让你在人际交往中占据主动。',
            author_id: 1,
            is_premium: 1,
            views: 13456,
            likes: 2567,
            created_at: '2026-03-10T14:30:00.000Z',
            updated_at: '2026-03-10T14:30:00.000Z'
          },
          {
            id: 7,
            title: '《学习之道》AI整合：如何高效学习',
            excerpt: 'AI整合芭芭拉·奥克利的《学习之道》，结合认知科学最新研究，打造适合当代人的高效学习方法。',
            author_id: 1,
            is_premium: 0,
            views: 8912,
            likes: 1765,
            created_at: '2026-03-09T10:20:00.000Z',
            updated_at: '2026-03-09T10:20:00.000Z'
          },
          {
            id: 8,
            title: '《乌合之众》AI解析：群体心理的奥秘',
            excerpt: 'AI解析古斯塔夫·勒庞的《乌合之众》，揭示群体心理的奥秘，帮助你更好地理解社会现象。',
            author_id: 1,
            is_premium: 0,
            views: 7654,
            likes: 1432,
            created_at: '2026-03-08T16:10:00.000Z',
            updated_at: '2026-03-08T16:10:00.000Z'
          },
          {
            id: 9,
            title: '《自控力》AI深度拆解：如何掌控自己的人生',
            excerpt: 'AI深度拆解凯利·麦格尼格尔的《自控力》，结合神经科学研究，教你如何提高自控力，掌控自己的人生。',
            author_id: 1,
            is_premium: 1,
            views: 15678,
            likes: 2890,
            created_at: '2026-03-07T09:40:00.000Z',
            updated_at: '2026-03-07T09:40:00.000Z'
          },
          {
            id: 10,
            title: '《终身成长》AI整合：如何培养成长型思维',
            excerpt: 'AI整合卡罗尔·德韦克的《终身成长》，教你如何培养成长型思维，在任何领域都能持续进步。',
            author_id: 1,
            is_premium: 0,
            views: 10234,
            likes: 1987,
            created_at: '2026-03-06T14:50:00.000Z',
            updated_at: '2026-03-06T14:50:00.000Z'
          },
          {
            id: 11,
            title: '《学会提问》AI深度拆解：批判性思维指南',
            excerpt: 'AI深度拆解《学会提问》，教你如何培养批判性思维，识别信息陷阱，做出明智决策。',
            author_id: 1,
            is_premium: 0,
            views: 8543,
            likes: 1678,
            created_at: '2026-03-05T10:15:00.000Z',
            updated_at: '2026-03-05T10:15:00.000Z'
          },
          {
            id: 12,
            title: '《如何阅读一本书》AI整合版：提升阅读效率的实用方法',
            excerpt: 'AI整合《如何阅读一本书》，提炼出四个阅读层次和实用技巧，让你从阅读中获得最大价值。',
            author_id: 1,
            is_premium: 0,
            views: 9345,
            likes: 1890,
            created_at: '2026-03-04T14:30:00.000Z',
            updated_at: '2026-03-04T14:30:00.000Z'
          },
          {
            id: 13,
            title: '《非暴力沟通》AI解读：如何用爱沟通',
            excerpt: 'AI解读《非暴力沟通》，揭示四个沟通要素和实用技巧，帮助你建立和谐的人际关系。',
            author_id: 1,
            is_premium: 0,
            views: 11789,
            likes: 2234,
            created_at: '2026-03-03T09:45:00.000Z',
            updated_at: '2026-03-03T09:45:00.000Z'
          },
          {
            id: 14,
            title: '《专注力》AI深度解析：如何在分心时代保持专注',
            excerpt: 'AI深度解析《专注力》，提供科学的专注力训练方法，帮助你在信息爆炸的时代保持专注。',
            author_id: 1,
            is_premium: 1,
            views: 14567,
            likes: 2678,
            created_at: '2026-03-02T16:20:00.000Z',
            updated_at: '2026-03-02T16:20:00.000Z'
          },
          {
            id: 15,
            title: '《财富自由之路》AI整合：实现财务自由的方法论',
            excerpt: 'AI整合《财富自由之路》，揭示实现财务自由的核心原则和实用方法，助你构建财富管道。',
            author_id: 1,
            is_premium: 0,
            views: 16789,
            likes: 3123,
            created_at: '2026-03-01T11:00:00.000Z',
            updated_at: '2026-03-01T11:00:00.000Z'
          }
        ]
        setArticles(mockArticles)
        setFilteredArticles(mockArticles)
        setError(null)
      } catch (err) {
        setError('加载文章失败，请稍后重试')
        console.error('加载文章失败:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchArticles()
  }, [])

  // Filter articles based on selected filter
  useEffect(() => {
    let filtered = [...articles]
    
    switch(selectedFilter) {
      case 'free':
        filtered = filtered.filter(article => !article.is_premium)
        break
      case 'premium':
        filtered = filtered.filter(article => article.is_premium)
        break
      case 'latest':
        filtered = filtered.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
        break
      case 'popular':
        filtered = filtered.sort((a, b) => b.views - a.views)
        break
      default:
        // 'all' filter - no filtering needed
        break
    }
    
    setFilteredArticles(filtered)
  }, [selectedFilter, articles])

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-xl font-medium">加载中...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
        {error}
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-amber-50 via-rose-50 to-white rounded-2xl p-12 mb-16 text-center overflow-hidden relative">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10">
          <svg className="absolute top-0 left-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path d="M0,0 C30,100 70,0 100,100 L100,0 Z" fill="currentColor" className="text-amber-500"/>
          </svg>
        </div>
        
        <div className="relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-800">AI整合的阅读干货</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            从海量书籍中筛选最有价值的内容，用10%的时间获取90%的核心知识
          </p>
          
          {/* Filter Section */}
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <button 
              onClick={() => setSelectedFilter('all')}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-colors ${selectedFilter === 'all' ? 'bg-amber-100 text-amber-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
            >
              全部文章
            </button>
            <button 
              onClick={() => setSelectedFilter('free')}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-colors ${selectedFilter === 'free' ? 'bg-amber-100 text-amber-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
            >
              免费内容
            </button>
            <button 
              onClick={() => setSelectedFilter('premium')}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-colors ${selectedFilter === 'premium' ? 'bg-amber-100 text-amber-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
            >
              付费专栏
            </button>
            <button 
              onClick={() => setSelectedFilter('latest')}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-colors ${selectedFilter === 'latest' ? 'bg-amber-100 text-amber-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
            >
              最新发布
            </button>
            <button 
              onClick={() => setSelectedFilter('popular')}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-colors ${selectedFilter === 'popular' ? 'bg-amber-100 text-amber-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
            >
              热门推荐
            </button>
          </div>
        </div>
      </div>

      {/* Articles List */}
      <section className="mb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredArticles.map((article) => (
            <div key={article.id} className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              {/* Premium Badge */}
              {article.is_premium && (
                <div className="absolute top-4 right-4 bg-gradient-to-r from-amber-500 to-amber-600 text-white px-4 py-1 rounded-full text-xs font-medium shadow-md">
                  付费内容
                </div>
              )}
              
              {/* Category Tag */}
              <div className="flex flex-wrap gap-2 mb-4">
                <div className="inline-block bg-amber-100 text-amber-700 px-3 py-1 rounded-full text-xs font-medium">
                  {article.id % 3 === 0 ? '个人成长' : article.id % 3 === 1 ? '职场提升' : '心理学'}
                </div>
                <div className="inline-block bg-rose-100 text-rose-700 px-3 py-1 rounded-full text-xs font-medium">
                  AI深度整合
                </div>
              </div>
              
              {/* Article Meta */}
              <div className="flex items-center mb-4 text-sm text-gray-500">
                <div className="flex items-center mr-6">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>{Math.floor(Math.random() * 15) + 5} 分钟阅读</span>
                </div>
                <div className="flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span>{new Date(article.created_at).toLocaleDateString()}</span>
                </div>
              </div>
              
              {/* Article Title */}
              <h3 className="text-2xl font-bold mb-4 leading-tight">
                <Link to={`/article/${article.id}`} className="text-gray-800 hover:text-amber-600 transition-colors">
                  {article.title}
                </Link>
              </h3>
              
              {/* Article Excerpt */}
              <p className="text-gray-600 mb-6 line-clamp-4 leading-relaxed">
                {article.excerpt}
              </p>
              
              {/* Article Stats */}
              <div className="flex justify-between items-center text-sm text-gray-500 pt-6 border-t border-gray-100">
                <div className="flex items-center space-x-4">
                  <button className="flex items-center hover:text-amber-600 transition-colors">
                    <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    <span>{article.views.toLocaleString()}</span>
                  </button>
                  <button onClick={() => alert('点赞功能已触发')} className="flex items-center hover:text-red-500 transition-colors">
                    <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                    <span>{article.likes.toLocaleString()}</span>
                  </button>
                  <button onClick={() => alert('分享功能已触发')} className="flex items-center hover:text-primary transition-colors">
                    <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                    </svg>
                    <span>{Math.floor(article.views / 100).toLocaleString()}</span>
                  </button>
                </div>
                <button onClick={() => alert('收藏功能已触发')} className="flex items-center hover:text-amber-600 transition-colors">
                  <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                  </svg>
                  <span>收藏</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Load More Button */}
      <section className="text-center mb-20">
        <button 
          onClick={() => alert('已加载全部文章')}
          className="btn btn-secondary text-lg px-10 py-3 transform hover:scale-105 transition-transform"
        >
          加载更多文章
        </button>
      </section>

      {/* CTA Section */}
      <section className="text-center bg-gradient-to-br from-amber-50 to-rose-50 rounded-2xl p-12 shadow-sm border border-gray-100">
        <h2 className="text-3xl font-bold mb-6">想要获取更多高质量内容？</h2>
        <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed">
          订阅我们的付费专栏，解锁全部AI深度整合的阅读干货，让学习效率提升10倍。包含200+篇AI拆解文章，每月持续更新
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-6">
          <Link to="/premium" className="btn btn-primary text-lg px-10 py-4 transform hover:scale-105 transition-transform">
            查看付费专栏
          </Link>
          <Link to="/register" className="btn btn-secondary text-lg px-10 py-4 transform hover:scale-105 transition-transform">
            免费注册，获取3篇精选内容
          </Link>
        </div>
        
        {/* Trust Indicators */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-amber-600">200+</div>
            <div className="text-gray-600 text-sm">AI拆解文章</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-amber-600">50,000+</div>
            <div className="text-gray-600 text-sm">活跃用户</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-amber-600">10+</div>
            <div className="text-gray-600 text-sm">热门主题</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-amber-600">98%</div>
            <div className="text-gray-600 text-sm">用户满意度</div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Articles