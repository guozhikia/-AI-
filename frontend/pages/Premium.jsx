import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const Premium = () => {
  const { user, isAuthenticated } = useAuth()
  const [selectedPlan, setSelectedPlan] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [showAllTestimonials, setShowAllTestimonials] = useState({})
  const navigate = useNavigate()

  // 付费专栏配置
  const columns = [
    {
      id: 'cognitive_upgrade',
      name: '认知升级专栏',
      price: '¥99',
      originalPrice: '¥199',
      description: '提升思维高度，打破认知边界，用科学的思维模型武装自己',
      features: [
        '20+篇AI深度拆解的认知心理学文章',
        '思维模型工具包，可直接应用到工作和生活',
        '每月更新2篇高质量内容，持续成长',
        '加入认知升级专属社群，与优秀者同行',
        '1年有效期，随时回看学习',
        'AI智能学习助手，实时解答疑问',
        'PDF版思维模型卡片，方便随时查阅'
      ],
      image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=chinese%20style%20illustration%20of%20knowledge%20growth%20and%20cognitive%20upgrade%2C%20gentle%20colors%2C%20minimalist%20design%2C%20brain%20and%20books&image_size=portrait_4_3',
      popular: false,
      highlights: [
        '基于认知心理学最新研究成果',
        '实用思维模型，可直接应用到工作和生活',
        '每月持续更新，保持知识的时效性',
        '社群交流，思维碰撞，共同成长'
      ],
      curriculum: [
        {
          module: '模块一：认知基础',
          lessons: [
            '认知偏差：认识我们思维的局限性',
            '元认知：如何观察和改进自己的思考',
            '心智模式：我们如何理解世界'
          ]
        },
        {
          module: '模块二：思维模型',
          lessons: [
            '第一性原理：从根本出发思考问题',
            '逆向思维：反过来想，问题会更简单',
            '系统思维：理解复杂世界的钥匙',
            '概率思维：用数学视角看问题'
          ]
        },
        {
          module: '模块三：决策与判断',
          lessons: [
            '理性决策：如何做出更好的选择',
            '风险认知：正确评估和应对风险',
            '机会成本：权衡选择的艺术'
          ]
        },
        {
          module: '模块四：学习与成长',
          lessons: [
            '成长型思维：终身学习的基础',
            '刻意练习：成为专家的路径',
            '知识管理：如何构建个人知识体系'
          ]
        }
      ],
      testimonials: [
        {
          name: '张经理',
          role: '企业管理者',
          content: '这个专栏让我重新审视了自己的思维方式，很多模型直接应用到了管理工作中，团队的决策效率明显提升！',
          rating: 5
        },
        {
          name: '刘同学',
          role: '研究生',
          content: 'AI拆解的文章非常通俗易懂，帮助我快速掌握了很多认知心理学的核心概念，对我的研究很有启发。',
          rating: 5
        },
        {
          name: '王老师',
          role: '高校教师',
          content: '作为一名心理学教师，我认为这个专栏的内容非常专业，知识点讲解清晰，适合想要提升认知的所有人。',
          rating: 4
        },
        {
          name: '陈医生',
          role: '医疗工作者',
          content: '学习了这些思维模型后，我在临床决策中更加理性，也更能理解患者的认知偏差，提升了医患沟通效果。',
          rating: 5
        }
      ]
    },
    {
      id: 'reading_camp',
      name: '高效阅读训练营',
      price: '¥199',
      originalPrice: '¥399',
      description: 'AI辅助的高效阅读方法，让你1小时读完一本书，阅读效率提升3-5倍',
      features: [
        '10节AI驱动的高效阅读视频课程',
        'AI阅读助手，实时解答阅读疑问',
        '30天练习计划，养成阅读习惯',
        '专属训练营社群，导师答疑',
        '永久访问权限，持续更新',
        '阅读效率提升3-5倍',
        'PDF版阅读工具包，方便随时使用',
        '个性化阅读计划，根据你的目标定制'
      ],
      image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=chinese%20style%20illustration%20of%20efficient%20reading%20with%20AI%20assistance%2C%20gentle%20colors%2C%20minimalist%20design%2C%20person%20reading%20with%20digital%20assistant&image_size=portrait_4_3',
      popular: true,
      highlights: [
        '专为时间紧张的职场人士设计',
        '科学验证的高效阅读方法',
        'AI实时反馈，个性化学习路径',
        '社群互助，坚持阅读更容易',
        '适合各种类型的书籍（商业、科技、人文等）',
        '终身学习的核心技能'
      ],
      curriculum: [
        {
          module: '模块一：基础篇',
          lessons: [
            '阅读的本质：重新认识阅读',
            '高效阅读的心理准备',
            '快速定位关键信息的技巧'
          ]
        },
        {
          module: '模块二：技能篇',
          lessons: [
            '扫描式阅读：快速获取大意',
            '略读：识别重要内容',
            '精读：深入理解核心观点',
            '记笔记的艺术：如何高效记录'
          ]
        },
        {
          module: '模块三：实践篇',
          lessons: [
            '不同类型书籍的阅读策略',
            '阅读速度的提升训练',
            '长期记忆的技巧'
          ]
        },
        {
          module: '模块四：应用篇',
          lessons: [
            '如何将阅读转化为行动',
            '构建个人知识体系',
            '持续阅读的习惯养成'
          ]
        }
      ],
      testimonials: [
        {
          name: '李同学',
          role: '职场新人',
          content: '通过这个训练营，我的阅读效率提升了4倍，现在每周能读完3本书，工作能力也明显提高了！',
          rating: 5
        },
        {
          name: '王老师',
          role: '高校教师',
          content: 'AI辅助的阅读方法非常实用，我的学生们都很喜欢这个课程，推荐给所有想要提升阅读效率的人。',
          rating: 5
        },
        {
          name: '张经理',
          role: '企业管理者',
          content: '作为一名管理者，我需要阅读大量的商业书籍和报告，这个课程让我节省了大量时间，非常值得推荐！',
          rating: 5
        },
        {
          name: '刘医生',
          role: '医疗工作者',
          content: '医生需要不断学习最新的医学知识，这个高效阅读方法让我能快速掌握专业文献的核心内容，提升了学习效率。',
          rating: 4
        }
      ]
    }
  ]

  const handlePurchase = async () => {
    if (!isAuthenticated) {
      navigate('/login')
      return
    }

    if (!selectedPlan) {
      setError('请先选择一个付费专栏')
      return
    }

    setLoading(true)
    setError(null)

    try {
      // 这里可以添加实际的支付逻辑
      console.log('购买专栏:', selectedPlan)
      
      // 模拟支付成功
      setTimeout(() => {
        navigate('/profile', { state: { message: '购买成功！' } })
      }, 1500)
    } catch (err) {
      setError('购买失败，请稍后重试')
      console.error('购买失败:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-6xl mx-auto">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-amber-50 to-rose-50 rounded-2xl p-12 mb-16 text-center">
        <h1 className="text-4xl font-bold mb-4 text-gray-800">AI赋能的付费专栏</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          用10%的时间获取90%的核心知识，实现快速成长
        </p>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-8 max-w-4xl mx-auto">
          {error}
        </div>
      )}

      {/* Premium Columns */}
      <section className="mb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {columns.map((column) => (
            <div
              key={column.id}
              className={`bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 ${selectedPlan === column.id ? 'border-amber-500 shadow-lg' : ''} ${column.popular ? 'transform scale-105' : ''}`}
            >
              {/* 特色标签 */}
              {column.popular && (
                <div className="absolute top-0 right-0 bg-gradient-to-l from-amber-500 to-amber-600 text-white px-4 py-2 rounded-bl-lg shadow-md">
                  <span className="font-medium">强烈推荐</span>
                </div>
              )}
              
              {/* 专栏封面图 */}
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={column.image} 
                  alt={column.name} 
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
              </div>

              <div className="p-8">
                {/* 专栏标题与描述 */}
                <h3 className="text-2xl font-bold mb-3 text-gray-800">{column.name}</h3>
                <p className="text-gray-600 mb-6 leading-relaxed line-clamp-3">{column.description}</p>
                
                {/* 价格信息 */}
                <div className="mb-8 bg-gradient-to-r from-amber-50 to-white p-6 rounded-lg border border-amber-100">
                  <div className="flex items-baseline justify-between">
                    <div>
                      <span className="text-4xl font-bold text-amber-600">{column.price}</span>
                      {column.originalPrice && (
                        <span className="text-gray-400 line-through ml-4 text-2xl">{column.originalPrice}</span>
                      )}
                    </div>
                    {column.originalPrice && (
                      <div className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                        省{column.originalPrice.replace('¥', '') - column.price.replace('¥', '')}元
                      </div>
                    )}
                  </div>
                  <span className="text-sm text-green-600 mt-2 block">
                    {column.originalPrice && '限时优惠，仅剩7天'}
                  </span>
                </div>

                {/* 课程亮点 */}
                {column.highlights && (
                  <div className="mb-6 bg-gradient-to-r from-amber-50 to-rose-50 p-5 rounded-lg">
                    <h4 className="text-sm font-semibold text-amber-700 mb-4 flex items-center">
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                      课程亮点
                    </h4>
                    <div className="flex flex-wrap gap-3">
                      {column.highlights.map((highlight, index) => (
                        <span key={index} className="bg-white text-amber-800 px-4 py-2 rounded-full text-xs font-medium shadow-sm border border-amber-100 hover:bg-amber-100 transition-colors">
                          {highlight}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* 核心功能 */}
                <div className="mb-8">
                  <h4 className="text-lg font-semibold mb-4 text-gray-800 flex items-center">
                    <svg className="w-5 h-5 mr-2 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    核心功能
                  </h4>
                  <ul className="space-y-3">
                    {column.features.map((feature, index) => (
                      <li key={index} className="flex items-start bg-gray-50 p-3 rounded-lg">
                        <svg className="w-5 h-5 text-green-500 mt-1 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-gray-600 leading-relaxed">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* 课程大纲 */}
                {column.curriculum && (
                  <div className="mb-8">
                    <h4 className="text-lg font-semibold mb-4 text-gray-800 flex items-center">
                      <svg className="w-5 h-5 mr-2 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                      课程大纲
                    </h4>
                    <div className="space-y-4">
                      {column.curriculum.map((module, moduleIndex) => (
                        <div key={moduleIndex} className="border-l-4 border-amber-200 pl-4 bg-white rounded-r-lg p-3">
                          <div className="font-medium text-gray-800 mb-2 flex items-center">
                            <span className="bg-amber-100 text-amber-700 w-6 h-6 rounded-full flex items-center justify-center text-sm mr-2">
                              {moduleIndex + 1}
                            </span>
                            {module.module}
                          </div>
                          <ul className="space-y-2">
                            {module.lessons.map((lesson, lessonIndex) => (
                              <li key={lessonIndex} className="text-sm text-gray-600 flex items-center">
                                <svg className="w-3 h-3 text-amber-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                {lesson}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 用户评价 */}
                {column.testimonials && (
                  <div className="mb-8 bg-gradient-to-r from-rose-50 to-white p-6 rounded-lg border border-rose-100">
                    <h4 className="text-lg font-semibold mb-4 text-gray-800 flex items-center">
                      <svg className="w-5 h-5 mr-2 text-rose-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                      学员反馈
                    </h4>
                    <div className="space-y-6">
                      {column.testimonials.slice(0, showAllTestimonials[column.id] ? column.testimonials.length : 2).map((testimonial, index) => (
                        <div key={index} className="bg-white p-4 rounded-lg shadow-sm">
                          {/* 星级评分 */}
                          <div className="flex items-center mb-3">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <svg key={i} className={`w-5 h-5 ${i < testimonial.rating ? 'text-amber-500' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                            ))}
                          </div>
                          
                          <p className="text-gray-600 italic mb-4">"{testimonial.content}"</p>
                          
                          <div className="flex items-center">
                            <div className="w-12 h-12 bg-rose-100 rounded-full flex items-center justify-center mr-4">
                              <span className="text-lg font-medium text-rose-700">{testimonial.name.charAt(0)}</span>
                            </div>
                            <div>
                              <div className="text-sm font-medium text-gray-800">{testimonial.name}</div>
                              <div className="text-xs text-gray-500">{testimonial.role}</div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    {column.testimonials.length > 2 && (
                      <div className="text-center mt-6">
                        <button 
                          onClick={() => setShowAllTestimonials(prev => ({ ...prev, [column.id]: !prev[column.id] }))}
                          className="text-rose-600 hover:text-rose-700 text-sm font-medium transition-colors flex items-center mx-auto"
                        >
                          <span>{showAllTestimonials[column.id] ? '收起学员反馈' : '查看更多学员反馈'}</span>
                          <svg 
                            className={`w-4 h-4 ml-1 transition-transform duration-300 ${showAllTestimonials[column.id] ? 'transform rotate-180' : ''}`} 
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                          </svg>
                        </button>
                      </div>
                    )}
                  </div>
                )}

                {/* 行动按钮 */}
                <button
                  onClick={() => setSelectedPlan(column.id)}
                  className={`w-full mb-4 py-4 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 ${selectedPlan === column.id ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-md' : 'bg-gradient-to-r from-gray-800 to-gray-900 text-white hover:from-gray-900 hover:to-black'}`}
                >
                  <div className="flex items-center justify-center">
                    {selectedPlan === column.id ? (
                      <>
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>已选择</span>
                      </>
                    ) : (
                      <>
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        <span>立即报名</span>
                      </>
                    )}
                  </div>
                </button>
                
                {/* 额外信息 */}
                <div className="text-center text-xs text-gray-500 space-y-1">
                  <p>点击"立即报名"即表示您同意我们的服务条款和隐私政策</p>
                  {column.id === 'reading_camp' && <p className="text-amber-600">训练营将在报名后24小时内开始</p>}
                  {column.id === 'cognitive_upgrade' && <p className="text-amber-600">专栏内容将立即解锁，有效期1年</p>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Purchase Confirmation */}
      {selectedPlan && (
        <section className="max-w-4xl mx-auto bg-white rounded-2xl p-12 shadow-sm border border-gray-100">
          <h2 className="text-2xl font-bold mb-6">购买确认</h2>
          
          <div className="space-y-4 mb-8">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">专栏名称</span>
              <span className="font-medium">
                {columns.find(c => c.id === selectedPlan)?.name}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">价格</span>
              <span className="font-medium text-xl">
                {columns.find(c => c.id === selectedPlan)?.price}
              </span>
            </div>
            <div className="flex justify-between items-center border-t border-gray-200 pt-4 font-bold text-xl">
              <span>总计</span>
              <span className="text-amber-600">
                {columns.find(c => c.id === selectedPlan)?.price}
              </span>
            </div>
          </div>

          <button
            onClick={handlePurchase}
            className="btn btn-primary w-full text-lg py-3"
            disabled={loading}
          >
            {loading ? '处理中...' : '立即购买'}
          </button>

          <div className="mt-6 text-center text-sm text-gray-500">
            <p>点击"立即购买"即表示您同意我们的</p>
            <p className="mt-1">
              <a href="#" className="text-amber-600 hover:underline">服务条款</a> 和
              <a href="#" className="text-amber-600 hover:underline ml-1">隐私政策</a>
            </p>
          </div>
        </section>
      )}
    </div>
  )
}

export default Premium