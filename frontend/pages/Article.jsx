import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useAuth } from '../context/AuthContext'

const Article = () => {
  const { id } = useParams()
  const { user, isAuthenticated } = useAuth()
  const [article, setArticle] = useState(null)
  const [comments, setComments] = useState([])
  const [recommendedArticles, setRecommendedArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [commentsLoading, setCommentsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [liked, setLiked] = useState(false)
  const [commentContent, setCommentContent] = useState('')
  const [shareUrl, setShareUrl] = useState('')
  const [showShareModal, setShowShareModal] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        setLoading(true)
        // 模拟数据，展示文章详情
        const mockArticles = {
          1: {
            id: 1,
            title: '《原子习惯》AI深度拆解：如何用最小行动改变人生轨迹',
            content: `<div class="ai-insight-box bg-amber-50 border-l-4 border-amber-500 p-4 mb-8">
              <h3 class="text-lg font-semibold text-amber-800 mb-2">AI核心洞察</h3>
              <p class="text-gray-700">原子习惯的本质是通过微小的、持续的改变，利用复利效应实现显著的成果。本书提供了一套科学的习惯养成方法，帮助读者建立长期有效的习惯系统。</p>
            </div>
            
            <h2 class="text-2xl font-bold text-gray-800 mb-4">核心观点</h2>
            <p class="text-gray-700 leading-relaxed mb-6">原子习惯是一种微小但强大的行为改变方法，通过微小的、持续的改变，最终带来显著的成果。这种方法的核心在于理解习惯形成的机制，并利用这些机制来塑造我们的行为。</p>
            
            <h3 class="text-xl font-semibold text-gray-800 mb-3">习惯形成的四大法则</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div class="bg-white p-4 rounded-lg border border-gray-100 shadow-sm">
                <h4 class="font-medium text-gray-800 mb-2">1. 让它显而易见</h4>
                <p class="text-gray-600">通过环境设计，让习惯提示清晰可见。例如，将健身装备放在显眼的位置，提醒自己按时锻炼。</p>
              </div>
              <div class="bg-white p-4 rounded-lg border border-gray-100 shadow-sm">
                <h4 class="font-medium text-gray-800 mb-2">2. 让它有吸引力</h4>
                <p class="text-gray-600">将习惯与愉悦的体验联系起来，增加习惯的吸引力。例如，在阅读时享用喜欢的饮品。</p>
              </div>
              <div class="bg-white p-4 rounded-lg border border-gray-100 shadow-sm">
                <h4 class="font-medium text-gray-800 mb-2">3. 让它简便易行</h4>
                <p class="text-gray-600">简化习惯的执行步骤，降低行动的阻力。例如，准备好第二天的衣服，减少早晨的决策时间。</p>
              </div>
              <div class="bg-white p-4 rounded-lg border border-gray-100 shadow-sm">
                <h4 class="font-medium text-gray-800 mb-2">4. 让它令人愉悦</h4>
                <p class="text-gray-600">在习惯完成后给予奖励，强化习惯行为。例如，完成工作后看一集喜欢的电视剧。</p>
              </div>
            </div>
            
            <h3 class="text-xl font-semibold text-gray-800 mb-3">如何运用原子习惯</h3>
            <ol class="list-decimal pl-5 space-y-3 mb-6">
              <li class="text-gray-700 leading-relaxed"><strong>从小处着手，每次只改变1%</strong>：不要试图一次性改变太多习惯，专注于每天1%的微小进步，长期积累会带来巨大的变化。</li>
              <li class="text-gray-700 leading-relaxed"><strong>关注系统而非目标</strong>：目标是关于你想要达到的结果，而系统是关于如何达到这些结果的过程。建立良好的系统比设定远大的目标更重要。</li>
              <li class="text-gray-700 leading-relaxed"><strong>建立习惯叠加</strong>：利用现有的习惯作为新习惯的提示，例如，"当我吃完早餐后，我会阅读10页书"。</li>
              <li class="text-gray-700 leading-relaxed"><strong>利用环境设计</strong>：设计你的环境，让好的习惯更容易发生，坏的习惯更难发生。</li>
            </ol>
            
            <h3 class="text-xl font-semibold text-gray-800 mb-3">常见误区</h3>
            <div class="space-y-3 mb-6">
              <div class="flex items-start">
                <svg class="w-5 h-5 text-red-500 mt-1 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                <div>
                  <strong class="text-gray-800">试图一次性改变太多习惯</strong>
                  <p class="text-gray-600">这会导致意志力耗尽，最终放弃所有的改变尝试。</p>
                </div>
              </div>
              <div class="flex items-start">
                <svg class="w-5 h-5 text-red-500 mt-1 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                <div>
                  <strong class="text-gray-800">设定过于宏大的目标</strong>
                  <p class="text-gray-600">远大的目标可能会让人望而却步，而微小的目标更容易实现并建立信心。</p>
                </div>
              </div>
              <div class="flex items-start">
                <svg class="w-5 h-5 text-red-500 mt-1 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                <div>
                  <strong class="text-gray-800">缺乏持续的跟踪和反馈</strong>
                  <p class="text-gray-600">跟踪习惯的执行情况可以帮助你了解自己的进度，并及时调整策略。</p>
                </div>
              </div>
              <div class="flex items-start">
                <svg class="w-5 h-5 text-red-500 mt-1 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                <div>
                  <strong class="text-gray-800">忽视环境的影响</strong>
                  <p class="text-gray-600">环境对习惯的形成有着巨大的影响，优化环境可以让习惯养成变得更容易。</p>
                </div>
              </div>
            </div>
            
            <div class="ai-tools-box bg-blue-50 border-l-4 border-blue-500 p-6 mb-8">
              <h3 class="text-lg font-semibold text-blue-800 mb-3">AI实用工具</h3>
              <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div class="bg-white p-4 rounded-lg shadow-sm">
                  <h4 class="font-medium text-gray-800 mb-2">习惯跟踪表</h4>
                  <p class="text-gray-600 text-sm">下载我们的AI生成习惯跟踪表，记录你的习惯养成进度。</p>
                  <button class="text-blue-600 hover:text-blue-700 text-sm font-medium mt-2">下载 →</button>
                </div>
                <div class="bg-white p-4 rounded-lg shadow-sm">
                  <h4 class="font-medium text-gray-800 mb-2">习惯叠加生成器</h4>
                  <p class="text-gray-600 text-sm">使用AI工具生成适合你的习惯叠加组合。</p>
                  <button class="text-blue-600 hover:text-blue-700 text-sm font-medium mt-2">使用 →</button>
                </div>
                <div class="bg-white p-4 rounded-lg shadow-sm">
                  <h4 class="font-medium text-gray-800 mb-2">环境设计指南</h4>
                  <p class="text-gray-600 text-sm">获取个性化的环境设计建议，优化你的习惯养成环境。</p>
                  <button class="text-blue-600 hover:text-blue-700 text-sm font-medium mt-2">查看 →</button>
                </div>
              </div>
            </div>
            
            <h3 class="text-xl font-semibold text-gray-800 mb-3">行动步骤</h3>
            <div class="bg-gradient-to-r from-amber-50 to-white p-6 rounded-lg border border-amber-100 mb-6">
              <ol class="list-decimal pl-5 space-y-2">
                <li class="text-gray-700"><strong>选择一个习惯</strong>：从你最想养成的习惯开始，确保它足够小。</li>
                <li class="text-gray-700"><strong>应用四大法则</strong>：使用习惯形成的四大法则来设计你的习惯。</li>
                <li class="text-gray-700"><strong>跟踪进度</strong>：使用习惯跟踪表记录你的执行情况。</li>
                <li class="text-gray-700"><strong>调整优化</strong>：根据你的执行情况，调整你的习惯设计。</li>
                <li class="text-gray-700"><strong>坚持30天</strong>：持续执行30天，让习惯成为你生活的一部分。</li>
              </ol>
            </div>
            
            <div class="related-books bg-gray-50 p-6 rounded-lg mb-6">
              <h3 class="text-lg font-semibold text-gray-800 mb-4">相关书籍推荐</h3>
              <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div class="bg-white p-4 rounded-lg shadow-sm flex items-center">
                  <div class="w-16 h-24 bg-gray-200 rounded mr-4 flex-shrink-0"></div>
                  <div>
                    <h4 class="font-medium text-gray-800">《微习惯》</h4>
                    <p class="text-gray-600 text-sm">BJ·福格</p>
                  </div>
                </div>
                <div class="bg-white p-4 rounded-lg shadow-sm flex items-center">
                  <div class="w-16 h-24 bg-gray-200 rounded mr-4 flex-shrink-0"></div>
                  <div>
                    <h4 class="font-medium text-gray-800">《习惯的力量》</h4>
                    <p class="text-gray-600 text-sm">查尔斯·杜希格</p>
                  </div>
                </div>
                <div class="bg-white p-4 rounded-lg shadow-sm flex items-center">
                  <div class="w-16 h-24 bg-gray-200 rounded mr-4 flex-shrink-0"></div>
                  <div>
                    <h4 class="font-medium text-gray-800">《掌控习惯》</h4>
                    <p class="text-gray-600 text-sm">詹姆斯·克利尔</p>
                  </div>
                </div>
              </div>
            </div>`,
            excerpt: 'AI深度拆解《原子习惯》，提炼出5个核心习惯养成法则，让你用最小行动改变人生轨迹。',
            author_id: 1,
            is_premium: 0,
            views: 12580,
            likes: 2345,
            created_at: '2026-03-15T08:00:00.000Z',
            updated_at: '2026-03-15T08:00:00.000Z',
            keywords: ['原子习惯', '习惯养成', '行为改变', '自我提升'],
            ai_summary: '本文深度拆解了《原子习惯》一书的核心观点，介绍了习惯形成的四大法则和运用原子习惯的方法，帮助读者用最小的行动改变人生轨迹。',
            reading_time: '12分钟',
            difficulty: '易',
            book_info: {
              title: '原子习惯',
              author: '詹姆斯·克利尔',
              publisher: '北京联合出版公司',
              publication_date: '2018-10',
              page_count: '320'
            }
          },
          2: {
            id: 2,
            title: '《思考，快与慢》AI整合：理性与直觉的博弈',
            content: `<div class="ai-insight-box bg-amber-50 border-l-4 border-amber-500 p-4 mb-8">
              <h3 class="text-lg font-semibold text-amber-800 mb-2">AI核心洞察</h3>
              <p class="text-gray-700">本书揭示了人类思考的两大系统：快速、直觉的系统1和慢速、理性的系统2。理解这两个系统的工作原理可以帮助我们做出更理性的决策。</p>
            </div>
            
            <h2 class="text-2xl font-bold text-gray-800 mb-4">系统1与系统2</h2>
            <p class="text-gray-700 leading-relaxed mb-6">卡尼曼提出的双系统理论认为，人类的思考过程可以分为两个系统：系统1是快速、直觉、情绪化的，系统2是慢速、理性、逻辑化的。在大多数情况下，我们依赖系统1进行决策，但系统1容易受到各种认知偏差的影响。</p>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <h3 class="text-xl font-semibold text-gray-800 mb-3">系统1：快速思考</h3>
                <ul class="space-y-2">
                  <li class="flex items-start">
                    <svg class="w-5 h-5 text-blue-500 mt-1 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span class="text-gray-700">快速、自动、无意识</span>
                  </li>
                  <li class="flex items-start">
                    <svg class="w-5 h-5 text-blue-500 mt-1 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span class="text-gray-700">依赖直觉和经验</span>
                  </li>
                  <li class="flex items-start">
                    <svg class="w-5 h-5 text-blue-500 mt-1 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span class="text-gray-700">消耗能量少</span>
                  </li>
                  <li class="flex items-start">
                    <svg class="w-5 h-5 text-blue-500 mt-1 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span class="text-gray-700">容易受到认知偏差影响</span>
                  </li>
                </ul>
              </div>
              
              <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <h3 class="text-xl font-semibold text-gray-800 mb-3">系统2：慢速思考</h3>
                <ul class="space-y-2">
                  <li class="flex items-start">
                    <svg class="w-5 h-5 text-green-500 mt-1 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span class="text-gray-700">慢速、刻意、有意识</span>
                  </li>
                  <li class="flex items-start">
                    <svg class="w-5 h-5 text-green-500 mt-1 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span class="text-gray-700">依赖逻辑和分析</span>
                  </li>
                  <li class="flex items-start">
                    <svg class="w-5 h-5 text-green-500 mt-1 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span class="text-gray-700">消耗能量多</span>
                  </li>
                  <li class="flex items-start">
                    <svg class="w-5 h-5 text-green-500 mt-1 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span class="text-gray-700">更准确、更理性</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <h3 class="text-xl font-semibold text-gray-800 mb-3">常见的认知偏差</h3>
            <div class="space-y-4 mb-6">
              <div class="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                <h4 class="font-medium text-gray-800 mb-2">1. 锚定效应</h4>
                <p class="text-gray-700">人们在做决策时，往往会受到最初获得的信息的影响。例如，商品的原始价格会影响我们对折扣的感知。</p>
              </div>
              <div class="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                <h4 class="font-medium text-gray-800 mb-2">2. 可得性启发法</h4>
                <p class="text-gray-700">人们倾向于根据记忆中容易获取的信息来判断事件的概率。例如，最近发生的事件会被认为更可能发生。</p>
              </div>
              <div class="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                <h4 class="font-medium text-gray-800 mb-2">3. 确认偏误</h4>
                <p class="text-gray-700">人们倾向于寻找和接受支持自己已有观点的信息，而忽视或拒绝与自己观点相矛盾的信息。</p>
              </div>
              <div class="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                <h4 class="font-medium text-gray-800 mb-2">4. 损失厌恶</h4>
                <p class="text-gray-700">人们对损失的感受比同等金额的收益更强烈。例如，失去100元的痛苦比获得100元的快乐更强烈。</p>
              </div>
              <div class="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                <h4 class="font-medium text-gray-800 mb-2">5. 过度自信</h4>
                <p class="text-gray-700">人们往往高估自己的能力和判断的准确性。例如，大多数人认为自己的驾驶技术高于平均水平。</p>
              </div>
            </div>
            
            <h3 class="text-xl font-semibold text-gray-800 mb-3">如何做出更理性的决策</h3>
            <ol class="list-decimal pl-5 space-y-3 mb-6">
              <li class="text-gray-700 leading-relaxed"><strong>意识到系统1的局限性</strong>：了解系统1容易受到认知偏差的影响，是做出更理性决策的第一步。</li>
              <li class="text-gray-700 leading-relaxed"><strong>主动调用系统2进行思考</strong>：对于重要的决策，有意识地使用系统2进行分析和思考。</li>
              <li class="text-gray-700 leading-relaxed"><strong>建立决策框架和流程</strong>：使用结构化的决策框架和流程，减少系统1的影响。</li>
              <li class="text-gray-700 leading-relaxed"><strong>寻求外部反馈</strong>：征求他人的意见和反馈，帮助我们发现自己的认知偏差。</li>
              <li class="text-gray-700 leading-relaxed"><strong>考虑概率和不确定性</strong>：在决策时，考虑各种结果的概率和不确定性，避免过度自信。</li>
            </ol>
            
            <div class="ai-tools-box bg-blue-50 border-l-4 border-blue-500 p-6 mb-8">
              <h3 class="text-lg font-semibold text-blue-800 mb-3">AI实用工具</h3>
              <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div class="bg-white p-4 rounded-lg shadow-sm">
                  <h4 class="font-medium text-gray-800 mb-2">认知偏差测试</h4>
                  <p class="text-gray-600 text-sm">测试你容易受到哪些认知偏差的影响。</p>
                  <button class="text-blue-600 hover:text-blue-700 text-sm font-medium mt-2">开始测试 →</button>
                </div>
                <div class="bg-white p-4 rounded-lg shadow-sm">
                  <h4 class="font-medium text-gray-800 mb-2">决策框架生成器</h4>
                  <p class="text-gray-600 text-sm">使用AI工具生成适合你的决策框架。</p>
                  <button class="text-blue-600 hover:text-blue-700 text-sm font-medium mt-2">使用 →</button>
                </div>
                <div class="bg-white p-4 rounded-lg shadow-sm">
                  <h4 class="font-medium text-gray-800 mb-2">理性决策指南</h4>
                  <p class="text-gray-600 text-sm">获取AI生成的理性决策指南。</p>
                  <button class="text-blue-600 hover:text-blue-700 text-sm font-medium mt-2">查看 →</button>
                </div>
              </div>
            </div>`,
            excerpt: 'AI整合《思考，快与慢》核心内容，揭示人类决策的两大系统，帮你做出更理性的选择。',
            author_id: 1,
            is_premium: 0,
            views: 9876,
            likes: 1890,
            created_at: '2026-03-14T10:30:00.000Z',
            updated_at: '2026-03-14T10:30:00.000Z',
            keywords: ['思考快与慢', '双系统理论', '认知偏差', '理性决策'],
            ai_summary: '本文整合了《思考，快与慢》的核心内容，介绍了人类思考的两大系统和常见的认知偏差，帮助读者做出更理性的决策。',
            reading_time: '15分钟',
            difficulty: '中',
            book_info: {
              title: '思考，快与慢',
              author: '丹尼尔·卡尼曼',
              publisher: '中信出版社',
              publication_date: '2012-7',
              page_count: '418'
            }
          },
          3: {
            id: 3,
            title: '《原则》AI拆解：达利欧的成功密码',
            content: `<div class="ai-insight-box bg-amber-50 border-l-4 border-amber-500 p-4 mb-8">
              <h3 class="text-lg font-semibold text-amber-800 mb-2">AI核心洞察</h3>
              <p class="text-gray-700">本文拆解了瑞·达利欧的《原则》，整理出一套可复制的成功方法论，包括生活原则和工作原则，帮助读者应对各种挑战。</p>
            </div>
            
            <h2 class="text-2xl font-bold text-gray-800 mb-4">生活原则</h2>
            <p class="text-gray-700 leading-relaxed mb-6">生活原则是关于如何与现实打交道，如何做出正确的决策，以及如何实现自己的目标。这些原则帮助我们建立正确的世界观和价值观。</p>
            
            <div class="space-y-4 mb-8">
              <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <h3 class="text-xl font-semibold text-gray-800 mb-3">1. 拥抱现实，应对现实</h3>
                <p class="text-gray-700 leading-relaxed">理解现实是如何运作的，并接受现实的本来面目。不要试图逃避或否认现实，而是要面对现实并采取相应的行动。</p>
                <div class="mt-4 p-4 bg-gray-50 rounded-lg">
                  <h4 class="font-medium text-gray-800 mb-2">AI解读</h4>
                  <p class="text-gray-700 text-sm">接受现实并不意味着放弃梦想，而是意味着我们需要基于现实来制定实现梦想的计划。</p>
                </div>
              </div>
              
              <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <h3 class="text-xl font-semibold text-gray-800 mb-3">2. 用五步流程实现你的人生愿望</h3>
                <ol class="list-decimal pl-5 space-y-1 mb-4">
                  <li class="text-gray-700">设定明确的目标</li>
                  <li class="text-gray-700">识别并解决问题</li>
                  <li class="text-gray-700">诊断问题的根源</li>
                  <li class="text-gray-700">设计解决方案</li>
                  <li class="text-gray-700">执行解决方案</li>
                </ol>
                <div class="mt-4 p-4 bg-gray-50 rounded-lg">
                  <h4 class="font-medium text-gray-800 mb-2">AI解读</h4>
                  <p class="text-gray-700 text-sm">这五步流程是一个循环过程，我们需要不断地重复这个过程，以实现持续的成长和进步。</p>
                </div>
              </div>
              
              <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <h3 class="text-xl font-semibold text-gray-800 mb-3">3. 做到极度开放的大脑</h3>
                <p class="text-gray-700 leading-relaxed">保持开放的心态，愿意接受不同的观点和意见，特别是那些与自己相反的观点。</p>
                <div class="mt-4 p-4 bg-gray-50 rounded-lg">
                  <h4 class="font-medium text-gray-800 mb-2">AI解读</h4>
                  <p class="text-gray-700 text-sm">极度开放的大脑需要我们克服自己的 ego，愿意承认自己的错误和不足。</p>
                </div>
              </div>
              
              <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <h3 class="text-xl font-semibold text-gray-800 mb-3">4. 理解人与人大不相同</h3>
                <p class="text-gray-700 leading-relaxed">每个人都有不同的思维方式、价值观和能力。理解这些差异并利用这些差异，可以帮助我们更好地与人合作。</p>
                <div class="mt-4 p-4 bg-gray-50 rounded-lg">
                  <h4 class="font-medium text-gray-800 mb-2">AI解读</h4>
                  <p class="text-gray-700 text-sm">团队的多样性是一种优势，它可以带来不同的视角和想法，帮助我们做出更好的决策。</p>
                </div>
              </div>
              
              <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <h3 class="text-xl font-semibold text-gray-800 mb-3">5. 学习如何有效决策</h3>
                <p class="text-gray-700 leading-relaxed">决策是生活中最重要的技能之一。有效的决策需要我们考虑各种因素，包括事实、数据、直觉和价值观。</p>
                <div class="mt-4 p-4 bg-gray-50 rounded-lg">
                  <h4 class="font-medium text-gray-800 mb-2">AI解读</h4>
                  <p class="text-gray-700 text-sm">有效的决策不是关于做出完美的决策，而是关于做出尽可能好的决策，并从决策的结果中学习。</p>
                </div>
              </div>
            </div>
            
            <h2 class="text-2xl font-bold text-gray-800 mb-4">工作原则</h2>
            <p class="text-gray-700 leading-relaxed mb-6">工作原则是关于如何在组织中有效地工作和管理，如何与他人合作，以及如何建立和维护成功的组织文化。</p>
            
            <div class="space-y-4 mb-6">
              <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <h3 class="text-xl font-semibold text-gray-800 mb-3">1. 打造良好的文化</h3>
                <p class="text-gray-700 leading-relaxed">文化是组织的灵魂，它决定了组织的价值观、行为准则和工作方式。打造良好的文化需要明确的价值观和行为准则，并确保这些价值观和行为准则得到贯彻执行。</p>
              </div>
              
              <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <h3 class="text-xl font-semibold text-gray-800 mb-3">2. 用对人</h3>
                <p class="text-gray-700 leading-relaxed">选择合适的人是组织成功的关键。我们需要选择那些与组织价值观一致、具备所需能力和潜力的人。</p>
              </div>
              
              <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <h3 class="text-xl font-semibold text-gray-800 mb-3">3. 建造并进化你的机器</h3>
                <p class="text-gray-700 leading-relaxed">组织就像一台机器，它由人、流程和系统组成。我们需要不断地建造和进化这台机器，以适应不断变化的环境。</p>
              </div>
              
              <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <h3 class="text-xl font-semibold text-gray-800 mb-3">4. 像操作一部机器那样进行管理以实现目标</h3>
                <p class="text-gray-700 leading-relaxed">管理组织就像操作一部机器，我们需要设定明确的目标，监控机器的运行情况，识别并解决问题，以确保机器能够有效地实现目标。</p>
              </div>
              
              <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <h3 class="text-xl font-semibold text-gray-800 mb-3">5. 发现问题，不容忍问题</h3>
                <p class="text-gray-700 leading-relaxed">问题是进步的机会，我们需要积极地发现问题，不容忍问题，并采取相应的措施来解决问题。</p>
              </div>
            </div>
            
            <div class="ai-tools-box bg-blue-50 border-l-4 border-blue-500 p-6 mb-8">
              <h3 class="text-lg font-semibold text-blue-800 mb-3">AI实用工具</h3>
              <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div class="bg-white p-4 rounded-lg shadow-sm">
                  <h4 class="font-medium text-gray-800 mb-2">原则生成器</h4>
                  <p class="text-gray-600 text-sm">使用AI工具生成适合你的个人原则和组织原则。</p>
                  <button class="text-blue-600 hover:text-blue-700 text-sm font-medium mt-2">使用 →</button>
                </div>
                <div class="bg-white p-4 rounded-lg shadow-sm">
                  <h4 class="font-medium text-gray-800 mb-2">五步流程模板</h4>
                  <p class="text-gray-600 text-sm">下载我们的AI生成五步流程模板，应用于你的目标实现过程。</p>
                  <button class="text-blue-600 hover:text-blue-700 text-sm font-medium mt-2">下载 →</button>
                </div>
                <div class="bg-white p-4 rounded-lg shadow-sm">
                  <h4 class="font-medium text-gray-800 mb-2">文化评估工具</h4>
                  <p class="text-gray-600 text-sm">评估你的组织文化，并获取改进建议。</p>
                  <button class="text-blue-600 hover:text-blue-700 text-sm font-medium mt-2">开始评估 →</button>
                </div>
              </div>
            </div>`,
            excerpt: 'AI拆解瑞·达利欧的《原则》，整理出一套可复制的成功方法论，助你应对生活和工作中的各种挑战。',
            author_id: 1,
            is_premium: 0,
            views: 8765,
            likes: 1654,
            created_at: '2026-03-13T14:20:00.000Z',
            updated_at: '2026-03-13T14:20:00.000Z',
            keywords: ['原则', '达利欧', '成功方法论', '生活原则', '工作原则'],
            ai_summary: '本文深度拆解了瑞·达利欧的《原则》一书，整理出一套可复制的成功方法论，包括生活原则和工作原则，帮助读者应对生活和工作中的各种挑战。',
            reading_time: '18分钟',
            difficulty: '中',
            book_info: {
              title: '原则',
              author: '瑞·达利欧',
              publisher: '中信出版社',
              publication_date: '2018-1',
              page_count: '576'
            }
          },
          4: {
            id: 4,
            title: '《高效能人士的七个习惯》AI整合版',
            content: `<div class="ai-insight-box bg-amber-50 border-l-4 border-amber-500 p-4 mb-8">
              <h3 class="text-lg font-semibold text-amber-800 mb-2">AI核心洞察</h3>
              <p class="text-gray-700">《高效能人士的七个习惯》提出了一套以原则为中心的成功哲学，强调从依赖到独立再到互赖的成长路径，帮助人们在个人和职业生活中实现高效能。</p>
            </div>
            
            <h2 class="text-2xl font-bold text-gray-800 mb-4">习惯的本质与分类</h2>
            <p class="text-gray-700 leading-relaxed mb-6">习惯是知识、技巧和意愿的结合体。知识是做什么和为什么做，技巧是怎么做，意愿是想要做。史蒂芬·柯维将七个习惯分为三个阶段：个人领域的成功（从依赖到独立）、公众领域的成功（从独立到互赖），以及自我更新。</p>
            
            <div class="space-y-6 mb-8">
              <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <h3 class="text-xl font-semibold text-gray-800 mb-3">第一阶段：个人领域的成功（从依赖到独立）</h3>
                <p class="text-gray-700 leading-relaxed mb-4">这一阶段的习惯帮助我们建立自我领导能力，实现个人的独立和成长。</p>
                
                <div class="space-y-4">
                  <div class="bg-gray-50 p-4 rounded-lg">
                    <h4 class="font-medium text-gray-800 mb-2">1. 积极主动（Be Proactive）</h4>
                    <p class="text-gray-700">积极主动是人类的天性，我们可以主动选择自己的回应。积极主动的人不会把自己的行为归咎于环境、条件或他人的影响，而是承认自己的责任。</p>
                    <div class="mt-2 text-sm text-blue-700 bg-blue-50 p-2 rounded">
                      <strong>AI应用：</strong>使用AI工具分析你的日常语言，识别消极被动的表述，替换为积极主动的语言模式。
                    </div>
                  </div>
                  
                  <div class="bg-gray-50 p-4 rounded-lg">
                    <h4 class="font-medium text-gray-800 mb-2">2. 以终为始（Begin with the End in Mind）</h4>
                    <p class="text-gray-700">以终为始意味着在做任何事情之前，先明确目标和方向。它要求我们先在脑海中构想出理想的结果，然后再采取行动。</p>
                    <div class="mt-2 text-sm text-blue-700 bg-blue-50 p-2 rounded">
                      <strong>AI应用：</strong>使用AI目标规划工具，基于你的长期愿景生成阶段性目标和行动步骤。
                    </div>
                  </div>
                  
                  <div class="bg-gray-50 p-4 rounded-lg">
                    <h4 class="font-medium text-gray-800 mb-2">3. 要事第一（Put First Things First）</h4>
                    <p class="text-gray-700">要事第一是指根据事情的重要性和紧急性来安排优先级。我们应该把时间和精力集中在重要但不紧急的事情上，而不是被紧急但不重要的事情所淹没。</p>
                    <div class="mt-2 text-sm text-blue-700 bg-blue-50 p-2 rounded">
                      <strong>AI应用：</strong>使用AI时间管理工具，自动分析你的日程安排，识别并提醒重要但不紧急的任务。
                    </div>
                  </div>
                </div>
              </div>
              
              <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <h3 class="text-xl font-semibold text-gray-800 mb-3">第二阶段：公众领域的成功（从独立到互赖）</h3>
                <p class="text-gray-700 leading-relaxed mb-4">这一阶段的习惯帮助我们建立有效的人际关系，实现团队和社会的成功。</p>
                
                <div class="space-y-4">
                  <div class="bg-gray-50 p-4 rounded-lg">
                    <h4 class="font-medium text-gray-800 mb-2">4. 双赢思维（Think Win-Win）</h4>
                    <p class="text-gray-700">双赢思维是一种基于互敬、寻求互惠的思考框架和心态。它强调在人际交往中，要寻求双方都能受益的解决方案，而不是非此即彼的竞争关系。</p>
                    <div class="mt-2 text-sm text-blue-700 bg-blue-50 p-2 rounded">
                      <strong>AI应用：</strong>使用AI谈判助手，分析谈判场景，生成双赢的解决方案建议。
                    </div>
                  </div>
                  
                  <div class="bg-gray-50 p-4 rounded-lg">
                    <h4 class="font-medium text-gray-800 mb-2">5. 知彼解己（Seek First to Understand, Then to Be Understood）</h4>
                    <p class="text-gray-700">知彼解己强调先理解别人，再寻求被理解。它要求我们真正地倾听和理解他人的观点，而不是急于表达自己的意见。</p>
                    <div class="mt-2 text-sm text-blue-700 bg-blue-50 p-2 rounded">
                      <strong>AI应用：</strong>使用AI沟通分析工具，评估你的沟通模式，提供改进倾听技巧的建议。
                    </div>
                  </div>
                  
                  <div class="bg-gray-50 p-4 rounded-lg">
                    <h4 class="font-medium text-gray-800 mb-2">6. 统合综效（Synergize）</h4>
                    <p class="text-gray-700">统合综效是指通过创造性合作，实现1+1>2的效果。它强调尊重差异，鼓励团队成员贡献各自的观点和想法，从而找到更好的解决方案。</p>
                    <div class="mt-2 text-sm text-blue-700 bg-blue-50 p-2 rounded">
                      <strong>AI应用：</strong>使用AI团队协作工具，促进团队成员之间的创意碰撞和协作。
                    </div>
                  </div>
                </div>
              </div>
              
              <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <h3 class="text-xl font-semibold text-gray-800 mb-3">第三阶段：自我更新（不断提升）</h3>
                <p class="text-gray-700 leading-relaxed mb-4">这一阶段的习惯帮助我们保持持续的成长和进步。</p>
                
                <div class="bg-gray-50 p-4 rounded-lg">
                  <h4 class="font-medium text-gray-800 mb-2">7. 不断更新（Sharpen the Saw）</h4>
                  <p class="text-gray-700">不断更新是指在身体、精神、智力和社会/情感四个方面进行持续的自我提升和更新。它强调保持平衡的生活方式，避免过度消耗和倦怠。</p>
                  <div class="mt-2 text-sm text-blue-700 bg-blue-50 p-2 rounded">
                    <strong>AI应用：</strong>使用AI自我提升规划工具，制定全面的自我更新计划，平衡四个方面的发展。
                  </div>
                </div>
              </div>
            </div>
            
            <h3 class="text-xl font-semibold text-gray-800 mb-3">如何应用七个习惯</h3>
            <ol class="list-decimal pl-5 space-y-3 mb-6">
              <li class="text-gray-700 leading-relaxed"><strong>从内到外改变</strong>：七个习惯强调先改变自己的思维模式和行为方式，然后才能改变外部世界。</li>
              <li class="text-gray-700 leading-relaxed"><strong>循序渐进</strong>：不要试图一次性掌握所有习惯，从第一个习惯开始，逐步培养。</li>
              <li class="text-gray-700 leading-relaxed"><strong>保持一致性</strong>：习惯的养成需要持续的努力和坚持，保持一致性比强度更重要。</li>
              <li class="text-gray-700 leading-relaxed"><strong>反思和调整</strong>：定期反思自己的行为和习惯，根据实际情况进行调整和改进。</li>
            </ol>
            
            <div class="ai-tools-box bg-blue-50 border-l-4 border-blue-500 p-6 mb-8">
              <h3 class="text-lg font-semibold text-blue-800 mb-3">AI实用工具</h3>
              <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div class="bg-white p-4 rounded-lg shadow-sm">
                  <h4 class="font-medium text-gray-800 mb-2">习惯养成跟踪器</h4>
                  <p class="text-gray-600 text-sm">使用AI工具跟踪你的七个习惯养成进度。</p>
                  <button class="text-blue-600 hover:text-blue-700 text-sm font-medium mt-2">开始使用 →</button>
                </div>
                <div class="bg-white p-4 rounded-lg shadow-sm">
                  <h4 class="font-medium text-gray-800 mb-2">双赢思维训练</h4>
                  <p class="text-gray-600 text-sm">通过AI模拟场景，练习双赢思维的应用。</p>
                  <button class="text-blue-600 hover:text-blue-700 text-sm font-medium mt-2">开始训练 →</button>
                </div>
                <div class="bg-white p-4 rounded-lg shadow-sm">
                  <h4 class="font-medium text-gray-800 mb-2">时间管理优化</h4>
                  <p class="text-gray-600 text-sm">AI分析你的时间使用情况，提供要事第一的优化建议。</p>
                  <button class="text-blue-600 hover:text-blue-700 text-sm font-medium mt-2">立即分析 →</button>
                </div>
              </div>
            </div>
            
            <h3 class="text-xl font-semibold text-gray-800 mb-3">常见误区</h3>
            <div class="space-y-3 mb-6">
              <div class="flex items-start">
                <svg class="w-5 h-5 text-red-500 mt-1 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                <div>
                  <strong class="text-gray-800">认为七个习惯是快速解决方案</strong>
                  <p class="text-gray-600">七个习惯是一种生活哲学，需要长期的实践和坚持，不是快速解决问题的方法。</p>
                </div>
              </div>
              <div class="flex items-start">
                <svg class="w-5 h-5 text-red-500 mt-1 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                <div>
                  <strong class="text-gray-800">跳过前面的习惯，直接学习后面的习惯</strong>
                  <p class="text-gray-600">七个习惯是有顺序的，前面的习惯是后面习惯的基础，跳过前面的习惯会导致后面的习惯无法有效应用。</p>
                </div>
              </div>
              <div class="flex items-start">
                <svg class="w-5 h-5 text-red-500 mt-1 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                <div>
                  <strong class="text-gray-800">忽视自我更新</strong>
                  <p class="text-gray-600">自我更新是保持其他六个习惯有效性的关键，忽视自我更新会导致精力耗尽和倦怠。</p>
                </div>
              </div>
            </div>
            
            <div class="related-books bg-gray-50 p-6 rounded-lg mb-6">
              <h3 class="text-lg font-semibold text-gray-800 mb-4">相关书籍推荐</h3>
              <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div class="bg-white p-4 rounded-lg shadow-sm flex items-center">
                  <div class="w-16 h-24 bg-gray-200 rounded mr-4 flex-shrink-0"></div>
                  <div>
                    <h4 class="font-medium text-gray-800">《高效能人士的执行4原则》</h4>
                    <p class="text-gray-600 text-sm">克里斯·麦克切斯尼</p>
                  </div>
                </div>
                <div class="bg-white p-4 rounded-lg shadow-sm flex items-center">
                  <div class="w-16 h-24 bg-gray-200 rounded mr-4 flex-shrink-0"></div>
                  <div>
                    <h4 class="font-medium text-gray-800">《要事第一》</h4>
                    <p class="text-gray-600 text-sm">史蒂芬·柯维</p>
                  </div>
                </div>
                <div class="bg-white p-4 rounded-lg shadow-sm flex items-center">
                  <div class="w-16 h-24 bg-gray-200 rounded mr-4 flex-shrink-0"></div>
                  <div>
                    <h4 class="font-medium text-gray-800">《第三选择》</h4>
                    <p class="text-gray-600 text-sm">史蒂芬·柯维</p>
                  </div>
                </div>
              </div>
            </div>`,
            excerpt: 'AI重新整合七个习惯的核心内容，结合现代职场环境，打造适合当代人的高效能指南。',
            author_id: 1,
            is_premium: 0,
            views: 11234,
            likes: 2012,
            created_at: '2026-03-12T09:15:00.000Z',
            updated_at: '2026-03-12T09:15:00.000Z',
            keywords: ['高效能人士的七个习惯', '习惯养成', '自我提升', '人际关系', '时间管理'],
            ai_summary: '本文重新整合了《高效能人士的七个习惯》的核心内容，结合现代职场环境，打造适合当代人的高效能指南，帮助读者在个人和职业生活中实现高效能。',
            reading_time: '15分钟',
            difficulty: '中',
            book_info: {
              title: '高效能人士的七个习惯',
              author: '史蒂芬·柯维',
              publisher: '中国青年出版社',
              publication_date: '2018-11',
              page_count: '388'
            }
          },

          5: {
            id: 5,
            title: '《刻意练习》AI深度解析：如何成为领域专家',
            content: `<div class="ai-insight-box bg-amber-50 border-l-4 border-amber-500 p-4 mb-8">
              <h3 class="text-lg font-semibold text-amber-800 mb-2">AI核心洞察</h3>
              <p class="text-gray-700">《刻意练习》揭示了成为领域专家的科学方法，强调通过有目的的练习、专注和反馈，任何人都可以在自己选择的领域取得卓越成就。</p>
            </div>
            
            <h2 class="text-2xl font-bold text-gray-800 mb-4">刻意练习的本质</h2>
            <p class="text-gray-700 leading-relaxed mb-6">刻意练习不是简单的重复，而是一种有目的、有结构、有反馈的练习方法。它的核心在于不断突破自己的舒适区，挑战更高难度的任务，并通过反馈不断改进。</p>
            
            <div class="space-y-6 mb-8">
              <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <h3 class="text-xl font-semibold text-gray-800 mb-3">刻意练习的四大特征</h3>
                
                <div class="space-y-4">
                  <div class="bg-gray-50 p-4 rounded-lg">
                    <h4 class="font-medium text-gray-800 mb-2">1. 有明确的目标</h4>
                    <p class="text-gray-700">刻意练习需要有具体、可衡量的目标，而不是模糊的“变得更好”。这些目标应该是挑战性的，但又是可实现的。</p>
                    <div class="mt-2 text-sm text-blue-700 bg-blue-50 p-2 rounded">
                      <strong>AI应用：</strong>使用AI目标分解工具，将大目标分解为小的、可管理的刻意练习目标。
                    </div>
                  </div>
                  
                  <div class="bg-gray-50 p-4 rounded-lg">
                    <h4 class="font-medium text-gray-800 mb-2">2. 专注和投入</h4>
                    <p class="text-gray-700">刻意练习需要高度的专注和投入，不能分心。研究表明，持续专注的练习比长时间但分散注意力的练习更有效。</p>
                    <div class="mt-2 text-sm text-blue-700 bg-blue-50 p-2 rounded">
                      <strong>AI应用：</strong>使用AI专注助手，帮助你保持长时间的专注状态，减少分心。
                    </div>
                  </div>
                  
                  <div class="bg-gray-50 p-4 rounded-lg">
                    <h4 class="font-medium text-gray-800 mb-2">3. 包含反馈和调整</h4>
                    <p class="text-gray-700">刻意练习需要及时的反馈，了解自己的表现并进行调整。反馈可以来自老师、教练、同行，也可以通过自我评估获得。</p>
                    <div class="mt-2 text-sm text-blue-700 bg-blue-50 p-2 rounded">
                      <strong>AI应用：</strong>使用AI反馈工具，分析你的表现并提供具体的改进建议。
                    </div>
                  </div>
                  
                  <div class="bg-gray-50 p-4 rounded-lg">
                    <h4 class="font-medium text-gray-800 mb-2">4. 突破舒适区</h4>
                    <p class="text-gray-700">刻意练习需要不断挑战自己的舒适区，尝试超出当前能力范围的任务。只有这样，才能不断提高。</p>
                    <div class="mt-2 text-sm text-blue-700 bg-blue-50 p-2 rounded">
                      <strong>AI应用：</strong>使用AI难度调整工具，根据你的当前水平自动调整练习难度，确保你始终在舒适区边缘练习。
                    </div>
                  </div>
                </div>
              </div>
              
              <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <h3 class="text-xl font-semibold text-gray-800 mb-3">如何进行刻意练习</h3>
                
                <ol class="list-decimal pl-5 space-y-3 mb-6">
                  <li class="text-gray-700 leading-relaxed"><strong>确定你的目标领域</strong>：选择一个你真正感兴趣并愿意投入大量时间的领域。</li>
                  <li class="text-gray-700 leading-relaxed"><strong>找到一位优秀的导师或教练</strong>：导师可以提供专业的指导、反馈和支持，帮助你更快地进步。</li>
                  <li class="text-gray-700 leading-relaxed"><strong>分解技能</strong>：将复杂的技能分解为小的、可管理的部分，逐一练习。</li>
                  <li class="text-gray-700 leading-relaxed"><strong>制定练习计划</strong>：根据你的目标和当前水平，制定详细的练习计划，包括练习内容、时间和方法。</li>
                  <li class="text-gray-700 leading-relaxed"><strong>保持专注</strong>：在练习过程中保持高度的专注，避免分心。</li>
                  <li class="text-gray-700 leading-relaxed"><strong>寻求反馈</strong>：定期寻求反馈，了解自己的表现并进行调整。</li>
                  <li class="text-gray-700 leading-relaxed"><strong>持续挑战自己</strong>：不断突破自己的舒适区，尝试更困难的任务。</li>
                </ol>
              </div>
              
              <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <h3 class="text-xl font-semibold text-gray-800 mb-3">刻意练习与天赋的关系</h3>
                <p class="text-gray-700 leading-relaxed mb-4">《刻意练习》挑战了天赋决定论，认为天赋并不是成为领域专家的必要条件。研究表明，大多数所谓的“天赋”实际上是早期练习和经验的结果。</p>
                
                <div class="bg-gray-50 p-4 rounded-lg">
                  <h4 class="font-medium text-gray-800 mb-2">天赋的神话</h4>
                  <p class="text-gray-700">许多被认为具有天赋的人，实际上是因为他们在早期就开始了刻意练习，并获得了良好的指导。例如，莫扎特被认为是音乐天才，但他从4岁就开始接受父亲的严格训练，到10岁时已经进行了超过10,000小时的练习。</p>
                </div>
                
                <div class="mt-4 bg-gray-50 p-4 rounded-lg">
                  <h4 class="font-medium text-gray-800 mb-2">刻意练习创造天赋</h4>
                  <p class="text-gray-700">通过刻意练习，我们可以改变大脑的结构和功能，提高特定领域的能力。这种能力的提高可能会被误认为是天赋，但实际上是练习的结果。</p>
                </div>
              </div>
              
              <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <h3 class="text-xl font-semibold text-gray-800 mb-3">刻意练习的实际应用</h3>
                
                <div class="space-y-4">
                  <div class="bg-gray-50 p-4 rounded-lg">
                    <h4 class="font-medium text-gray-800 mb-2">在学习中的应用</h4>
                    <p class="text-gray-700">使用刻意练习的方法学习新技能，如语言、编程或音乐。分解技能，设定明确的目标，专注练习，并寻求反馈。</p>
                  </div>
                  
                  <div class="bg-gray-50 p-4 rounded-lg">
                    <h4 class="font-medium text-gray-800 mb-2">在工作中的应用</h4>
                    <p class="text-gray-700">在工作中应用刻意练习，提高专业技能和工作效率。例如，程序员可以通过刻意练习提高编程能力，销售人员可以通过刻意练习提高销售技巧。</p>
                  </div>
                  
                  <div class="bg-gray-50 p-4 rounded-lg">
                    <h4 class="font-medium text-gray-800 mb-2">在体育中的应用</h4>
                    <p class="text-gray-700">运动员使用刻意练习的方法提高运动技能，如投篮、击球或跑步。他们分解动作，反复练习，并通过教练的反馈不断改进。</p>
                  </div>
                </div>
              </div>
            </div>
            
            <h3 class="text-xl font-semibold text-gray-800 mb-3">常见误区</h3>
            <div class="space-y-3 mb-6">
              <div class="flex items-start">
                <svg class="w-5 h-5 text-red-500 mt-1 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                <div>
                  <strong class="text-gray-800">认为重复就是刻意练习</strong>
                  <p class="text-gray-600">简单的重复并不会带来进步，刻意练习需要有明确的目标、专注和反馈。</p>
                </div>
              </div>
              <div class="flex items-start">
                <svg class="w-5 h-5 text-red-500 mt-1 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                <div>
                  <strong class="text-gray-800">忽视反馈的重要性</strong>
                  <p class="text-gray-600">反馈是刻意练习的关键组成部分，没有反馈，我们无法知道自己的表现如何，也无法进行有效的调整。</p>
                </div>
              </div>
              <div class="flex items-start">
                <svg class="w-5 h-5 text-red-500 mt-1 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                <div>
                  <strong class="text-gray-800">在舒适区内练习</strong>
                  <p class="text-gray-600">只有突破舒适区，挑战自己的极限，才能取得真正的进步。</p>
                </div>
              </div>
              <div class="flex items-start">
                <svg class="w-5 h-5 text-red-500 mt-1 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                <div>
                  <strong class="text-gray-800">认为天赋比练习更重要</strong>
                  <p class="text-gray-600">研究表明，刻意练习是成为领域专家的关键因素，天赋的影响被大大高估了。</p>
                </div>
              </div>
            </div>
            
            <div class="ai-tools-box bg-blue-50 border-l-4 border-blue-500 p-6 mb-8">
              <h3 class="text-lg font-semibold text-blue-800 mb-3">AI实用工具</h3>
              <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div class="bg-white p-4 rounded-lg shadow-sm">
                  <h4 class="font-medium text-gray-800 mb-2">刻意练习计划生成器</h4>
                  <p class="text-gray-600 text-sm">使用AI工具生成个性化的刻意练习计划，帮助你在目标领域取得进步。</p>
                  <button class="text-blue-600 hover:text-blue-700 text-sm font-medium mt-2">开始使用 →</button>
                </div>
                <div class="bg-white p-4 rounded-lg shadow-sm">
                  <h4 class="font-medium text-gray-800 mb-2">专注助手</h4>
                  <p class="text-gray-600 text-sm">使用AI工具帮助你保持专注，提高练习效率。</p>
                  <button class="text-blue-600 hover:text-blue-700 text-sm font-medium mt-2">开始使用 →</button>
                </div>
                <div class="bg-white p-4 rounded-lg shadow-sm">
                  <h4 class="font-medium text-gray-800 mb-2">技能分解工具</h4>
                  <p class="text-gray-600 text-sm">使用AI工具将复杂的技能分解为小的、可管理的部分，便于逐一练习。</p>
                  <button class="text-blue-600 hover:text-blue-700 text-sm font-medium mt-2">开始使用 →</button>
                </div>
              </div>
            </div>
            
            <div class="related-books bg-gray-50 p-6 rounded-lg mb-6">
              <h3 class="text-lg font-semibold text-gray-800 mb-4">相关书籍推荐</h3>
              <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div class="bg-white p-4 rounded-lg shadow-sm flex items-center">
                  <div class="w-16 h-24 bg-gray-200 rounded mr-4 flex-shrink-0"></div>
                  <div>
                    <h4 class="font-medium text-gray-800">《一万小时天才理论》</h4>
                    <p class="text-gray-600 text-sm">丹尼尔·科伊尔</p>
                  </div>
                </div>
                <div class="bg-white p-4 rounded-lg shadow-sm flex items-center">
                  <div class="w-16 h-24 bg-gray-200 rounded mr-4 flex-shrink-0"></div>
                  <div>
                    <h4 class="font-medium text-gray-800">《学习之道》</h4>
                    <p class="text-gray-600 text-sm">芭芭拉·奥克利</p>
                  </div>
                </div>
                <div class="bg-white p-4 rounded-lg shadow-sm flex items-center">
                  <div class="w-16 h-24 bg-gray-200 rounded mr-4 flex-shrink-0"></div>
                  <div>
                    <h4 class="font-medium text-gray-800">《天才密码》</h4>
                    <p class="text-gray-600 text-sm">罗伯特·格林</p>
                  </div>
                </div>
              </div>
            </div>`,
            excerpt: 'AI深度解析《刻意练习》，提炼出成为专家的核心方法，让你在任何领域都能快速成长。',
            author_id: 1,
            is_premium: 0,
            views: 7654,
            likes: 1432,
            created_at: '2026-03-11T16:40:00.000Z',
            updated_at: '2026-03-11T16:40:00.000Z',
            keywords: ['刻意练习', '成为专家', '学习方法', '技能提升', '天赋与练习'],
            ai_summary: '本文深度解析了《刻意练习》一书的核心观点，介绍了刻意练习的四大特征和应用方法，帮助读者在任何领域都能快速成长为专家。',
            reading_time: '14分钟',
            difficulty: '中',
            book_info: {
              title: '刻意练习',
              author: '安德斯·艾利克森',
              publisher: '机械工业出版社',
              publication_date: '2016-11',
              page_count: '360'
            }
          },

          6: {
            id: 6,
            title: '《影响力》AI拆解：如何影响他人的决策',
            content: `<div class="ai-insight-box bg-amber-50 border-l-4 border-amber-500 p-4 mb-8">
              <h3 class="text-lg font-semibold text-amber-800 mb-2">AI核心洞察</h3>
              <p class="text-gray-700">《影响力》揭示了6大影响他人决策的心理学原理，这些原理被广泛应用于营销、销售、谈判和人际关系中，帮助我们理解人类行为背后的驱动力。</p>
            </div>
            
            <h2 class="text-2xl font-bold text-gray-800 mb-4">影响力的6大原理</h2>
            <p class="text-gray-700 leading-relaxed mb-6">罗伯特·西奥迪尼在《影响力》一书中提出了6大影响他人决策的心理学原理，这些原理基于人类的认知偏见和行为习惯，能够有效地影响他人的决策和行为。</p>
            
            <div class="space-y-6 mb-8">
              <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <h3 class="text-xl font-semibold text-gray-800 mb-3">1. 互惠原理</h3>
                <p class="text-gray-700 leading-relaxed mb-4">互惠原理是指当别人给我们好处时，我们会感到有义务回报对方。这种义务感是人类社会的基本准则之一，它能够有效地影响我们的决策和行为。</p>
                
                <div class="bg-gray-50 p-4 rounded-lg">
                  <h4 class="font-medium text-gray-800 mb-2">实际应用</h4>
                  <p class="text-gray-700">在营销中，商家常常先给消费者提供一些小礼品或免费试用，然后再向他们推销产品，消费者由于感到有义务回报，更容易购买产品。</p>
                  <div class="mt-2 text-sm text-blue-700 bg-blue-50 p-2 rounded">
                    <strong>AI应用：</strong>使用AI工具分析消费者行为，识别最佳的互惠时机和方式，提高营销效果。
                  </div>
                </div>
              </div>
              
              <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <h3 class="text-xl font-semibold text-gray-800 mb-3">2. 承诺与一致原理</h3>
                <p class="text-gray-700 leading-relaxed mb-4">承诺与一致原理是指当我们做出承诺后，我们会倾向于保持一致，即使这个承诺是无意识的或不合理的。这种一致性的需求是人类的基本心理需求之一。</p>
                
                <div class="bg-gray-50 p-4 rounded-lg">
                  <h4 class="font-medium text-gray-800 mb-2">实际应用</h4>
                  <p class="text-gray-700">在销售中，销售人员常常先让消费者做出一些小的承诺，如填写调查问卷或试用产品，然后再向他们推销更高价值的产品，消费者由于保持一致的需求，更容易购买。</p>
                  <div class="mt-2 text-sm text-blue-700 bg-blue-50 p-2 rounded">
                    <strong>AI应用：</strong>使用AI工具设计承诺阶梯，引导消费者逐步做出更大的承诺，提高转化率。
                  </div>
                </div>
              </div>
              
              <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <h3 class="text-xl font-semibold text-gray-800 mb-3">3. 社会认同原理</h3>
                <p class="text-gray-700 leading-relaxed mb-4">社会认同原理是指当我们不确定如何行为时，我们会参考他人的行为，尤其是与我们相似的人的行为。这种社会认同的需求是人类的基本心理需求之一。</p>
                
                <div class="bg-gray-50 p-4 rounded-lg">
                  <h4 class="font-medium text-gray-800 mb-2">实际应用</h4>
                  <p class="text-gray-700">在营销中，商家常常使用客户 testimonials、用户评价或社交媒体上的点赞和分享来影响潜在客户的决策，潜在客户由于社会认同的需求，更容易购买。</p>
                  <div class="mt-2 text-sm text-blue-700 bg-blue-50 p-2 rounded">
                    <strong>AI应用：</strong>使用AI工具分析用户评价和社交媒体数据，识别最有影响力的社会认同信号，提高营销效果。
                  </div>
                </div>
              </div>
              
              <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <h3 class="text-xl font-semibold text-gray-800 mb-3">4. 喜好原理</h3>
                <p class="text-gray-700 leading-relaxed mb-4">喜好原理是指我们更容易被我们喜欢的人影响。我们喜欢的人通常具有吸引力、相似性、赞美我们或与我们有共同利益的人。</p>
                
                <div class="bg-gray-50 p-4 rounded-lg">
                  <h4 class="font-medium text-gray-800 mb-2">实际应用</h4>
                  <p class="text-gray-700">在销售中，销售人员常常通过赞美客户、寻找共同利益或建立个人关系来增加客户的喜好，从而更容易达成销售。</p>
                  <div class="mt-2 text-sm text-blue-700 bg-blue-50 p-2 rounded">
                    <strong>AI应用：</strong>使用AI工具分析客户偏好和行为，识别客户喜欢的沟通方式和内容，提高销售效果。
                  </div>
                </div>
              </div>
              
              <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <h3 class="text-xl font-semibold text-gray-800 mb-3">5. 权威原理</h3>
                <p class="text-gray-700 leading-relaxed mb-4">权威原理是指我们更容易被权威人士影响。权威人士通常具有专业知识、地位或头衔，我们倾向于服从他们的指示和建议。</p>
                
                <div class="bg-gray-50 p-4 rounded-lg">
                  <h4 class="font-medium text-gray-800 mb-2">实际应用</h4>
                  <p class="text-gray-700">在营销中，商家常常使用专家推荐、权威认证或名人代言来影响潜在客户的决策，潜在客户由于权威原理的影响，更容易购买。</p>
                  <div class="mt-2 text-sm text-blue-700 bg-blue-50 p-2 rounded">
                    <strong>AI应用：</strong>使用AI工具识别行业权威和意见领袖，制定有效的权威营销策略，提高营销效果。
                  </div>
                </div>
              </div>
              
              <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <h3 class="text-xl font-semibold text-gray-800 mb-3">6. 稀缺原理</h3>
                <p class="text-gray-700 leading-relaxed mb-4">稀缺原理是指当我们认为某种东西稀缺时，我们会更想要它。稀缺性会增加东西的价值和吸引力，使我们更愿意采取行动。</p>
                
                <div class="bg-gray-50 p-4 rounded-lg">
                  <h4 class="font-medium text-gray-800 mb-2">实际应用</h4>
                  <p class="text-gray-700">在营销中，商家常常使用限时折扣、限量供应或稀缺性提示来影响潜在客户的决策，潜在客户由于稀缺原理的影响，更容易立即购买。</p>
                  <div class="mt-2 text-sm text-blue-700 bg-blue-50 p-2 rounded">
                    <strong>AI应用：</strong>使用AI工具分析市场需求和竞争情况，制定有效的稀缺性营销策略，提高营销效果。
                  </div>
                </div>
              </div>
            </div>
            
            <h3 class="text-xl font-semibold text-gray-800 mb-3">如何运用影响力原理</h3>
            <ol class="list-decimal pl-5 space-y-3 mb-6">
              <li class="text-gray-700 leading-relaxed"><strong>了解你的目标受众</strong>：不同的人对不同的影响力原理反应不同，了解你的目标受众可以帮助你选择最有效的原理。</li>
              <li class="text-gray-700 leading-relaxed"><strong>选择合适的原理</strong>：根据你的目标和情境，选择最适合的影响力原理。例如，在营销中，你可以使用互惠原理、社会认同原理和稀缺原理。</li>
              <li class="text-gray-700 leading-relaxed"><strong>真诚和道德</strong>：影响力原理应该用于善意的目的，而不是操纵或欺骗他人。真诚和道德的使用可以建立长期的信任和关系。</li>
              <li class="text-gray-700 leading-relaxed"><strong>组合使用</strong>：通常，组合使用多种影响力原理可以产生更强的效果。例如，你可以同时使用互惠原理、喜好原理和权威原理。</li>
              <li class="text-gray-700 leading-relaxed"><strong>实践和反馈</strong>：影响力原理的应用需要实践和反馈，通过不断调整和改进，你可以提高影响力的效果。</li>
            </ol>
            
            <h3 class="text-xl font-semibold text-gray-800 mb-3">如何防范影响力的操纵</h3>
            <p class="text-gray-700 leading-relaxed mb-4">了解影响力原理不仅可以帮助我们影响他人，还可以帮助我们防范他人的操纵。以下是一些防范影响力操纵的方法：</p>
            
            <div class="space-y-3 mb-6">
              <div class="flex items-start">
                <svg class="w-5 h-5 text-green-500 mt-1 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <div>
                  <strong class="text-gray-800">保持警惕</strong>
                  <p class="text-gray-700">当你感到有压力要立即做出决策时，保持警惕，这可能是他人使用影响力原理的信号。</p>
                </div>
              </div>
              <div class="flex items-start">
                <svg class="w-5 h-5 text-green-500 mt-1 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <div>
                  <strong class="text-gray-800">暂停和反思</strong>
                  <p class="text-gray-700">当你面临重要决策时，暂停一下，反思自己的决策是否受到了影响力原理的影响。</p>
                </div>
              </div>
              <div class="flex items-start">
                <svg class="w-5 h-5 text-green-500 mt-1 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <div>
                  <strong class="text-gray-800">寻求第二意见</strong>
                  <p class="text-gray-700">当你不确定时，寻求他人的意见和建议，这可以帮助你从不同的角度看待问题。</p>
                </div>
              </div>
              <div class="flex items-start">
                <svg class="w-5 h-5 text-green-500 mt-1 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <div>
                  <strong class="text-gray-800">了解你的价值观</strong>
                  <p class="text-gray-700">清楚自己的价值观和目标，这可以帮助你抵制不符合自己价值观的影响。</p>
                </div>
              </div>
            </div>
            
            <div class="ai-tools-box bg-blue-50 border-l-4 border-blue-500 p-6 mb-8">
              <h3 class="text-lg font-semibold text-blue-800 mb-3">AI实用工具</h3>
              <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div class="bg-white p-4 rounded-lg shadow-sm">
                  <h4 class="font-medium text-gray-800 mb-2">影响力策略生成器</h4>
                  <p class="text-gray-600 text-sm">使用AI工具生成个性化的影响力策略，帮助你在不同情境中有效地影响他人。</p>
                  <button class="text-blue-600 hover:text-blue-700 text-sm font-medium mt-2">开始使用 →</button>
                </div>
                <div class="bg-white p-4 rounded-lg shadow-sm">
                  <h4 class="font-medium text-gray-800 mb-2">操纵检测工具</h4>
                  <p class="text-gray-600 text-sm">使用AI工具检测潜在的影响力操纵，保护自己免受不必要的影响。</p>
                  <button class="text-blue-600 hover:text-blue-700 text-sm font-medium mt-2">开始使用 →</button>
                </div>
                <div class="bg-white p-4 rounded-lg shadow-sm">
                  <h4 class="font-medium text-gray-800 mb-2">沟通效果分析</h4>
                  <p class="text-gray-600 text-sm">使用AI工具分析你的沟通内容，识别最有效的影响力原理和策略。</p>
                  <button class="text-blue-600 hover:text-blue-700 text-sm font-medium mt-2">开始使用 →</button>
                </div>
              </div>
            </div>
            
            <div class="related-books bg-gray-50 p-6 rounded-lg mb-6">
              <h3 class="text-lg font-semibold text-gray-800 mb-4">相关书籍推荐</h3>
              <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div class="bg-white p-4 rounded-lg shadow-sm flex items-center">
                  <div class="w-16 h-24 bg-gray-200 rounded mr-4 flex-shrink-0"></div>
                  <div>
                    <h4 class="font-medium text-gray-800">《先发影响力》</h4>
                    <p class="text-gray-600 text-sm">罗伯特·西奥迪尼</p>
                  </div>
                </div>
                <div class="bg-white p-4 rounded-lg shadow-sm flex items-center">
                  <div class="w-16 h-24 bg-gray-200 rounded mr-4 flex-shrink-0"></div>
                  <div>
                    <h4 class="font-medium text-gray-800">《说服力》</h4>
                    <p class="text-gray-600 text-sm">罗伯特·西奥迪尼</p>
                  </div>
                </div>
                <div class="bg-white p-4 rounded-lg shadow-sm flex items-center">
                  <div class="w-16 h-24 bg-gray-200 rounded mr-4 flex-shrink-0"></div>
                  <div>
                    <h4 class="font-medium text-gray-800">《谈判力》</h4>
                    <p class="text-gray-600 text-sm">罗杰·费希尔</p>
                  </div>
                </div>
              </div>
            </div>`,
            excerpt: 'AI拆解罗伯特·西奥迪尼的《影响力》，揭示6大影响他人决策的心理学原理，让你在人际交往中占据主动。',
            author_id: 1,
            is_premium: 1,
            views: 13456,
            likes: 2567,
            created_at: '2026-03-10T14:30:00.000Z',
            updated_at: '2026-03-10T14:30:00.000Z',
            keywords: ['影响力', '心理学原理', '决策影响', '营销', '销售', '谈判'],
            ai_summary: '本文拆解了罗伯特·西奥迪尼的《影响力》一书，揭示了6大影响他人决策的心理学原理，包括互惠原理、承诺与一致原理、社会认同原理、喜好原理、权威原理和稀缺原理，帮助读者在人际交往中占据主动。',
            reading_time: '16分钟',
            difficulty: '中',
            book_info: {
              title: '影响力',
              author: '罗伯特·西奥迪尼',
              publisher: '中国人民大学出版社',
              publication_date: '2016-5',
              page_count: '352'
            }
          }
        }

        // 如果找不到对应ID的文章，使用默认文章
        const article = mockArticles[id] || mockArticles[1]
        setArticle(article)
        setError(null)
      } catch (err) {
        setError('加载文章失败，请稍后重试')
        console.error('加载文章失败:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchArticle()
  }, [id])

  useEffect(() => {
    const fetchComments = async () => {
      try {
        setCommentsLoading(true)
        // 模拟数据，展示评论
        const mockComments = [
          {
            id: 1,
            article_id: id,
            user_id: 1,
            username: '张同学',
            content: '这篇文章写得非常好，我已经开始尝试运用原子习惯的方法来改变自己的行为了！',
            created_at: '2026-03-15T10:30:00.000Z'
          },
          {
            id: 2,
            article_id: id,
            user_id: 2,
            username: '李老师',
            content: '作为一名心理学教师，我认为这篇文章对《原子习惯》的拆解非常准确，值得推荐给学生阅读。',
            created_at: '2026-03-15T11:45:00.000Z'
          },
          {
            id: 3,
            article_id: id,
            user_id: 3,
            username: '王经理',
            content: '我已经将这些方法应用到了团队管理中，效果显著，团队成员的工作效率和积极性都有所提高。',
            created_at: '2026-03-15T14:20:00.000Z'
          }
        ]
        setComments(mockComments)
      } catch (err) {
        console.error('加载评论失败:', err)
      } finally {
        setCommentsLoading(false)
      }
    }

    fetchComments()
  }, [id])

  useEffect(() => {
    const fetchRecommendedArticles = async () => {
      try {
        // 模拟数据，展示推荐文章
        const mockRecommendedArticles = [
          {
            id: 2,
            title: '《思考，快与慢》AI整合：理性与直觉的博弈',
            excerpt: 'AI整合《思考，快与慢》核心内容，揭示人类决策的两大系统，帮你做出更理性的选择。',
            is_premium: 0,
            views: 9876,
            likes: 1890,
            created_at: '2026-03-14T10:30:00.000Z'
          },
          {
            id: 4,
            title: '《高效能人士的七个习惯》AI整合版',
            excerpt: 'AI重新整合七个习惯的核心内容，结合现代职场环境，打造适合当代人的高效能指南。',
            is_premium: 0,
            views: 11234,
            likes: 2012,
            created_at: '2026-03-12T09:15:00.000Z'
          },
          {
            id: 5,
            title: '《刻意练习》AI深度解析：如何成为领域专家',
            excerpt: 'AI深度解析《刻意练习》，提炼出成为专家的核心方法，让你在任何领域都能快速成长。',
            is_premium: 0,
            views: 7654,
            likes: 1432,
            created_at: '2026-03-11T16:40:00.000Z'
          }
        ]
        setRecommendedArticles(mockRecommendedArticles)
      } catch (err) {
        console.error('加载推荐文章失败:', err)
      }
    }

    fetchRecommendedArticles()
  }, [id])

  const handleLike = async () => {
    if (!isAuthenticated) {
      navigate('/login')
      return
    }

    try {
      await axios.post(`/api/articles/${id}/like`)
      setArticle(prev => ({ ...prev, likes: prev.likes + 1 }))
      setLiked(true)
    } catch (err) {
      console.error('点赞失败:', err)
    }
  }

  const handleComment = async (e) => {
    e.preventDefault()
    
    if (!isAuthenticated) {
      navigate('/login')
      return
    }

    if (!commentContent.trim()) {
      return
    }

    try {
      const response = await axios.post(`/api/articles/${id}/comments`, { content: commentContent })
      setComments([response.data, ...comments])
      setCommentContent('')
    } catch (err) {
      console.error('评论失败:', err)
      alert('评论失败，请稍后重试')
    }
  }

  const handleDeleteComment = async (commentId) => {
    try {
      await axios.delete(`/api/comments/${commentId}`)
      setComments(prev => prev.filter(comment => comment.id !== commentId))
    } catch (err) {
      console.error('删除评论失败:', err)
      alert('删除评论失败，请稍后重试')
    }
  }

  const handleShare = async () => {
    try {
      const response = await axios.post(`/api/articles/${id}/share`)
      setShareUrl(response.data.shareUrl)
      setShowShareModal(true)
    } catch (err) {
      console.error('生成分享链接失败:', err)
      alert('生成分享链接失败，请稍后重试')
    }
  }

  const handleCopyShareUrl = () => {
    navigator.clipboard.writeText(shareUrl)
      .then(() => {
        alert('分享链接已复制到剪贴板')
        setShowShareModal(false)
      })
      .catch(err => {
        console.error('复制失败:', err)
        alert('复制失败，请手动复制链接')
      })
  }

  const handleSubscribe = () => {
    navigate('/subscribe')
  }

  // 为文章内容中的动态按钮添加事件监听器
  useEffect(() => {
    const handleToolButtonClick = (e) => {
      const button = e.target.closest('button')
      if (!button) return
      
      const buttonText = button.textContent.trim()
      
      if (buttonText.includes('下载')) {
        alert('下载功能已触发，文件将开始下载')
      } else if (buttonText.includes('使用') || buttonText.includes('开始使用')) {
        alert('工具已启动，您可以开始使用AI功能了')
      } else if (buttonText.includes('查看')) {
        alert('正在打开相关内容，请稍候...')
      } else if (buttonText.includes('开始测试')) {
        alert('测试已开始，AI将分析您的认知偏差')
      } else if (buttonText.includes('开始评估')) {
        alert('评估已开始，AI将分析您的组织文化')
      } else if (buttonText.includes('立即分析')) {
        alert('分析已开始，AI将为您提供个性化建议')
      } else if (buttonText.includes('开始训练')) {
        alert('训练已开始，AI将根据您的情况制定训练计划')
      }
    }

    // 为所有动态渲染的按钮添加点击事件监听器
    const articleContent = document.querySelector('.prose > div')
    if (articleContent) {
      articleContent.addEventListener('click', handleToolButtonClick)
    }

    // 清理事件监听器
    return () => {
      if (articleContent) {
        articleContent.removeEventListener('click', handleToolButtonClick)
      }
    }
  }, [article])

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-xl font-medium">加载中...</div>
      </div>
    )
  }

  if (error || !article) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
        {error || '文章不存在'}
      </div>
    )
  }

  // 检查是否需要显示付费墙
  const showPaywall = article.is_premium && (!isAuthenticated || !user?.is_subscribed)

  return (
    <div className="max-w-4xl mx-auto">
      <div className="card">
        {article.is_premium && (
          <div className="inline-block bg-primary text-white px-4 py-1 rounded-full text-sm font-medium mb-4">
            付费文章
          </div>
        )}
        
        <h1 className="text-3xl font-bold mb-4">{article.title}</h1>
        
        <div className="flex justify-between items-center text-gray-500 text-sm mb-6">
          <div>
            <span>作者: 匿名作者</span>
            <span className="mx-2">•</span>
            <span>{new Date(article.created_at).toLocaleDateString()}</span>
          </div>
          <div className="flex space-x-4">
            <span>👁️ {article.views}</span>
            <button
              onClick={handleLike}
              className={`flex items-center space-x-1 ${liked ? 'text-red-500' : 'text-gray-500'} hover:text-red-500 transition-colors`}
            >
              <span>❤️</span>
              <span>{article.likes}</span>
            </button>
            <button
              onClick={handleShare}
              className="text-gray-500 hover:text-primary transition-colors"
              title="分享文章"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
              </svg>
            </button>
          </div>
        </div>
        
        <div className="mb-8">
          <div className="h-64 bg-gray-200 rounded-md mb-6 flex items-center justify-center">
            <span className="text-gray-500">文章封面图</span>
          </div>
          
          <div className="prose max-w-none">
            {showPaywall ? (
              <div className="bg-gray-50 p-8 rounded-lg border border-gray-200 text-center">
                <h3 className="text-xl font-bold mb-4">这是付费内容</h3>
                <p className="text-gray-600 mb-6">
                  订阅我们的会员服务，即可访问所有高质量的付费内容，包括本文的完整内容。
                </p>
                <button
                  onClick={handleSubscribe}
                  className="btn btn-primary text-lg px-8 py-3"
                >
                  立即订阅，解锁全部内容
                </button>
              </div>
            ) : (
              <div dangerouslySetInnerHTML={{ __html: article.content }} />
            )}
          </div>
        </div>
        
        {/* 评论区 */}
        <div className="border-t border-gray-200 pt-8">
          <h2 className="text-2xl font-bold mb-6">评论 ({comments.length})</h2>
          
          {/* 评论表单 */}
          <div className="mb-8">
            <h3 className="text-lg font-medium mb-4">发表评论</h3>
            {isAuthenticated ? (
              <form onSubmit={handleComment} className="space-y-4">
                <div>
                  <textarea
                    className="input h-24"
                    placeholder="写下您的评论..."
                    value={commentContent}
                    onChange={(e) => setCommentContent(e.target.value)}
                    required
                  />
                </div>
                <div className="flex justify-end">
                  <button type="submit" className="btn btn-primary">
                    发表评论
                  </button>
                </div>
              </form>
            ) : (
              <div className="bg-gray-50 p-6 rounded-lg">
                <p className="text-gray-600 mb-4">
                  请先登录后再发表评论
                </p>
                <div className="flex space-x-4">
                  <button
                    onClick={() => navigate('/login')}
                    className="btn btn-primary"
                  >
                    登录
                  </button>
                  <button
                    onClick={() => navigate('/register')}
                    className="btn btn-secondary"
                  >
                    注册
                  </button>
                </div>
              </div>
            )}
          </div>
          
          {/* 评论列表 */}
          {commentsLoading ? (
            <div className="flex justify-center items-center h-24">
              <div className="text-lg font-medium">加载评论中...</div>
            </div>
          ) : (
            <div className="space-y-6">
              {comments.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                  <p>暂无评论，快来发表第一条评论吧！</p>
                </div>
              ) : (
                comments.map((comment) => (
                  <div key={comment.id} className="bg-gray-50 p-6 rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-gray-200 rounded-full mr-3 flex items-center justify-center">
                          <span className="text-sm font-medium">
                            {comment.username?.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <div>
                          <div className="font-medium">{comment.username}</div>
                          <div className="text-xs text-gray-500">
                            {new Date(comment.created_at).toLocaleString()}
                          </div>
                        </div>
                      </div>
                      {isAuthenticated && user?.id === comment.user_id && (
                        <button
                          onClick={() => handleDeleteComment(comment.id)}
                          className="text-red-500 hover:text-red-700 text-sm"
                        >
                          删除
                        </button>
                      )}
                    </div>
                    <div className="pl-11">
                      <p className="text-gray-700">{comment.content}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>
      
      {/* 推荐文章 */}
      {recommendedArticles.length > 0 && (
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">推荐文章</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {recommendedArticles.map((recArticle) => (
              <div key={recArticle.id} className="card hover:shadow-lg transition-shadow duration-300">
                <h3 className="text-lg font-bold mb-2">
                  <a href={`/article/${recArticle.id}`} className="text-gray-800 hover:text-primary">
                    {recArticle.title}
                  </a>
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-2">
                  {recArticle.excerpt || recArticle.content.substring(0, 150) + '...'}
                </p>
                <div className="flex justify-between items-center text-sm text-gray-500">
                  <span>{new Date(recArticle.created_at).toLocaleDateString()}</span>
                  <div className="flex space-x-4">
                    <span>👁️ {recArticle.views}</span>
                    <span>❤️ {recArticle.likes}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* 分享模态框 */}
      {showShareModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
          <div className="relative top-20 mx-auto p-5 border w-11/12 max-w-md shadow-lg rounded-md bg-white">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">分享文章</h2>
              <button
                onClick={() => setShowShareModal(false)}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ×
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  分享链接
                </label>
                <div className="flex">
                  <input
                    type="text"
                    className="input flex-grow mr-2"
                    value={shareUrl}
                    readOnly
                  />
                  <button
                    onClick={handleCopyShareUrl}
                    className="btn btn-primary"
                  >
                    复制
                  </button>
                </div>
              </div>
              
              <div className="text-center">
                <p className="text-gray-600 mb-4">
                  复制链接分享给您的朋友，他们可以直接访问这篇文章
                </p>
                <div className="flex justify-center space-x-4">
                  <button
                    onClick={() => {
                      window.open(`https://weibo.com/share?url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(article.title)}`, '_blank')
                    }}
                    className="btn bg-red-500 text-white hover:bg-red-600"
                  >
                    分享到微博
                  </button>
                  <button
                    onClick={() => {
                      window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(article.title)}`, '_blank')
                    }}
                    className="btn bg-blue-400 text-white hover:bg-blue-500"
                  >
                    分享到Twitter
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Article