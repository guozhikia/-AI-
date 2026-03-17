import { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

const Home = () => {
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setLoading(true)
        // 模拟数据，突出AI拆解文章
        const mockArticles = [
          {
            id: 1,
            title: '《原子习惯》AI深度拆解：如何用最小行动改变人生轨迹',
            content: '<h2>核心观点</h2><p>原子习惯是一种微小但强大的行为改变方法...</p>',
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
            content: '<h2>系统1与系统2</h2><p>卡尼曼提出的双系统理论...</p>',
            excerpt: 'AI整合《思考，快与慢》核心内容，揭示人类决策的两大系统，帮你做出更理性的选择。',
            author_id: 1,
            is_premium: 0,
            views: 9876,
            likes: 1890,
            created_at: '2026-03-14T10:30:00.000Z',
            updated_at: '2026-03-14T10:30:00.000Z'
          }
        ]
        setArticles(mockArticles)
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
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-800 leading-tight">
            不用读书，<span className="text-amber-600">AI帮你筛选整合干货</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-10 leading-relaxed">
            素人AI深度阅读社区，用先进的AI技术为你拆解书籍精华，让你用10%的时间获取90%的核心知识，实现高效学习和快速成长
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <Link to="/premium" className="btn btn-primary text-lg px-10 py-4 transform hover:scale-105 transition-transform">
              查看付费专栏
            </Link>
            <Link to="/articles" className="btn btn-secondary text-lg px-10 py-4 transform hover:scale-105 transition-transform">
              领取免费干货
            </Link>
          </div>
          
          {/* User stats */}
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-amber-600">50,000+</div>
              <div className="text-gray-600">活跃用户</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-amber-600">200+</div>
              <div className="text-gray-600">AI拆解文章</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-amber-600">98%</div>
              <div className="text-gray-600">用户满意度</div>
            </div>
          </div>
        </div>
      </div>

      {/* Hot AI Articles Section */}
      <section className="mb-20">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800">爆款AI拆解文章</h2>
          <Link to="/articles" className="text-amber-600 hover:text-amber-700 font-medium transition-colors">
            查看全部 →
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {articles.map((article, index) => (
            <div key={article.id} className={`bg-white rounded-xl p-8 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 ${index % 2 === 0 ? 'transform hover:-translate-y-2' : 'transform hover:-translate-y-1'}`}>
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <span className="text-sm text-amber-600 font-medium">AI深度拆解</span>
              </div>
              <h3 className="text-2xl font-bold mb-4">
                <Link to={`/article/${article.id}`} className="text-gray-800 hover:text-amber-600 transition-colors">
                  {article.title}
                </Link>
              </h3>
              <p className="text-gray-600 mb-6 line-clamp-3">
                {article.excerpt}
              </p>
              <div className="flex justify-between items-center text-sm text-gray-500">
                <span>发布于 {new Date(article.created_at).toLocaleDateString()}</span>
                <div className="flex space-x-6">
                  <span className="flex items-center">👁️ {article.views.toLocaleString()}</span>
                  <span className="flex items-center">❤️ {article.likes.toLocaleString()}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="mb-20 bg-gradient-to-r from-gray-50 via-amber-50 to-white rounded-2xl p-12">
        <h2 className="text-3xl font-bold mb-12 text-center">为什么选择我们？</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="text-center group">
            <div className="w-20 h-20 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-rose-200 transition-colors duration-300">
              <svg className="w-10 h-10 text-rose-600 group-hover:text-rose-700 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-4 text-gray-800">AI智能筛选</h3>
            <p className="text-gray-600 leading-relaxed">
              我们的AI系统会从海量书籍中筛选最有价值的内容，帮你避开低质量信息，只提供真正有用的知识
            </p>
          </div>
          <div className="text-center group">
            <div className="w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-amber-200 transition-colors duration-300">
              <svg className="w-10 h-10 text-amber-600 group-hover:text-amber-700 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-4 text-gray-800">深度内容整合</h3>
            <p className="text-gray-600 leading-relaxed">
              AI深度整合书籍精华，形成结构化的知识体系，便于理解和应用。我们不仅提供内容，更提供思考框架
            </p>
          </div>
          <div className="text-center group">
            <div className="w-20 h-20 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-teal-200 transition-colors duration-300">
              <svg className="w-10 h-10 text-teal-600 group-hover:text-teal-700 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-4 text-gray-800">高效知识获取</h3>
            <p className="text-gray-600 leading-relaxed">
              用10%的时间获取90%的核心知识，极大提高学习效率。让你在忙碌的生活中也能持续学习和成长
            </p>
          </div>
        </div>
      </section>

      {/* Hot Topics Section */}
      <section className="mb-20">
        <h2 className="text-3xl font-bold mb-8 text-center">热门阅读主题</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {['个人成长', '职场提升', '心理学', '投资理财', '时间管理', '沟通技巧', '领导力', '创造力'].map((topic, index) => (
            <div key={index} className="bg-gradient-to-br from-amber-50 to-rose-50 rounded-xl p-6 text-center hover:shadow-md transition-shadow duration-300 transform hover:scale-105">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-amber-600 font-medium">{topic.charAt(0)}</span>
              </div>
              <h3 className="font-semibold text-gray-800">{topic}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* Premium Promotion Section */}
      <section className="mb-20 bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="p-12">
            <div className="inline-block bg-amber-100 text-amber-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
              限时优惠 · 仅剩3天
            </div>
            <h2 className="text-3xl font-bold mb-4 text-gray-800">高效阅读训练营</h2>
            <p className="text-gray-600 mb-8 leading-relaxed">
              AI辅助的高效阅读方法，让你1小时读完一本书，阅读效率提升3-5倍。适合想要提升阅读效率、快速获取知识的职场人士和学生
            </p>
            
            <ul className="space-y-4 mb-10">
              <li className="flex items-start">
                <svg className="w-6 h-6 text-green-500 mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-600">10节AI驱动的高效阅读视频课程</span>
              </li>
              <li className="flex items-start">
                <svg className="w-6 h-6 text-green-500 mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-600">AI阅读助手，实时解答阅读疑问</span>
              </li>
              <li className="flex items-start">
                <svg className="w-6 h-6 text-green-500 mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-600">30天练习计划，养成阅读习惯</span>
              </li>
              <li className="flex items-start">
                <svg className="w-6 h-6 text-green-500 mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-600">专属训练营社群，导师答疑</span>
              </li>
              <li className="flex items-start">
                <svg className="w-6 h-6 text-green-500 mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-600">永久访问权限，持续更新</span>
              </li>
            </ul>
            
            <div className="flex items-center mb-8">
              <span className="text-5xl font-bold text-amber-600">¥199</span>
              <span className="text-gray-400 line-through ml-4 text-2xl">¥299</span>
            </div>
            
            <Link to="/premium" className="btn btn-primary text-lg px-10 py-4 transform hover:scale-105 transition-transform">
              立即报名，提升阅读效率
            </Link>
          </div>
          <div className="relative h-full">
            <img 
              src="https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=chinese%20style%20illustration%20of%20efficient%20reading%20with%20AI%20assistance%2C%20gentle%20colors%2C%20minimalist%20design%2C%20book%20and%20brain&image_size=portrait_4_3" 
              alt="高效阅读训练营" 
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
            />
          </div>
        </div>
      </section>

      {/* User Testimonials Section */}
      <section className="mb-20 bg-gradient-to-r from-gray-50 via-amber-50 to-white rounded-2xl p-12">
        <h2 className="text-3xl font-bold mb-12 text-center">用户好评</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              name: '张同学',
              role: '职场新人',
              content: '通过素人AI深度阅读社区，我在一个月内就掌握了10本职场必备书籍的核心内容，工作效率提升了3倍！',
              avatar: 'Z'
            },
            {
              name: '李老师',
              role: '高校教师',
              content: '作为一名教师，我经常需要阅读大量文献。这个平台的AI拆解功能帮我节省了大量时间，非常实用！',
              avatar: 'L'
            },
            {
              name: '王经理',
              role: '企业管理者',
              content: '高效阅读训练营让我的团队阅读效率提升了5倍，现在我们每周都能分享一本管理书籍的核心内容。',
              avatar: 'W'
            }
          ].map((testimonial, index) => (
            <div key={index} className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 transform hover:-translate-y-2 transition-transform duration-300">
              <div className="flex items-center mb-6">
                <div className="w-14 h-14 bg-gradient-to-br from-amber-100 to-rose-100 rounded-full flex items-center justify-center mr-4">
                  <span className="text-2xl font-bold text-amber-600">{testimonial.avatar}</span>
                </div>
                <div>
                  <h3 className="font-bold text-gray-800">{testimonial.name}</h3>
                  <p className="text-gray-500 text-sm">{testimonial.role}</p>
                </div>
              </div>
              <p className="text-gray-600 italic">"{testimonial.content}"</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="text-center bg-gradient-to-br from-amber-50 to-rose-50 rounded-2xl p-12 shadow-sm border border-gray-100">
        <h2 className="text-3xl font-bold mb-6">准备好开始你的AI阅读之旅了吗？</h2>
        <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
          加入素人AI深度阅读社区，让AI帮你筛选整合干货，实现高效学习和快速成长。现在注册，即可获得3篇免费AI拆解文章！
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-6">
          <Link to="/register" className="btn btn-primary text-lg px-10 py-4 transform hover:scale-105 transition-transform">
            立即注册，获取免费干货
          </Link>
          <Link to="/about" className="btn btn-secondary text-lg px-10 py-4 transform hover:scale-105 transition-transform">
            了解更多关于我们
          </Link>
        </div>
      </section>
    </div>
  )
}

export default Home