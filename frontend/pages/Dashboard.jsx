import { useState, useEffect } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const Dashboard = () => {
  const { user } = useAuth()
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showAIModal, setShowAIModal] = useState(false)
  const [aiTool, setAiTool] = useState('generate') // generate, summarize, optimize
  const [aiPrompt, setAiPrompt] = useState('')
  const [aiContent, setAiContent] = useState('')
  const [aiLoading, setAiLoading] = useState(false)
  const [newArticle, setNewArticle] = useState({
    title: '',
    content: '',
    excerpt: '',
    is_premium: false
  })
  const navigate = useNavigate()

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setLoading(true)
        const response = await axios.get('/api/articles')
        // 过滤出当前用户的文章
        const userArticles = response.data.articles.filter(article => article.author_id === user?.id)
        setArticles(userArticles)
        setError(null)
      } catch (err) {
        setError('加载文章失败，请稍后重试')
        console.error('加载文章失败:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchArticles()
  }, [user?.id])

  const handleDelete = async (id) => {
    if (window.confirm('确定要删除这篇文章吗？')) {
      try {
        await axios.delete(`/api/articles/${id}`)
        setArticles(prev => prev.filter(article => article.id !== id))
      } catch (err) {
        console.error('删除文章失败:', err)
        alert('删除文章失败，请稍后重试')
      }
    }
  }

  const handleCreate = async (e) => {
    e.preventDefault()
    
    try {
      await axios.post('/api/articles', newArticle)
      setShowCreateModal(false)
      // 重新加载文章列表
      const response = await axios.get('/api/articles')
      const userArticles = response.data.articles.filter(article => article.author_id === user?.id)
      setArticles(userArticles)
      // 重置表单
      setNewArticle({
        title: '',
        content: '',
        excerpt: '',
        is_premium: false
      })
    } catch (err) {
      console.error('创建文章失败:', err)
      alert('创建文章失败，请稍后重试')
    }
  }

  // AI工具处理函数
  const handleAIAction = async () => {
    setAiLoading(true)
    try {
      let response
      
      switch (aiTool) {
        case 'generate':
          response = await axios.post('/api/ai/generate-content', { prompt: aiPrompt })
          setAiContent(response.data.content)
          break
        case 'summarize':
          response = await axios.post('/api/ai/summarize-content', { content: aiPrompt })
          setAiContent(response.data.summary)
          break
        case 'optimize':
          response = await axios.post('/api/ai/optimize-content', { content: aiPrompt })
          setAiContent(response.data.optimizedContent)
          break
        default:
          break
      }
    } catch (err) {
      console.error('AI操作失败:', err)
      alert('AI操作失败，请稍后重试')
    } finally {
      setAiLoading(false)
    }
  }

  const handleUseAIContent = () => {
    if (aiContent) {
      setNewArticle(prev => ({
        ...prev,
        content: aiContent,
        excerpt: aiContent.substring(0, 200) + '...'
      }))
      setShowAIModal(false)
      setShowCreateModal(true)
      setAiContent('')
      setAiPrompt('')
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-xl font-medium">加载中...</div>
      </div>
    )
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">我的仪表盘</h1>
        <div className="flex space-x-4">
          <button
            onClick={() => {
              setAiTool('generate')
              setShowAIModal(true)
            }}
            className="btn btn-primary bg-purple-600 hover:bg-purple-700"
          >
            <svg className="w-4 h-4 inline-block mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
            AI辅助创作
          </button>
          <button
            onClick={() => setShowCreateModal(true)}
            className="btn btn-primary"
          >
            创建新文章
          </button>
        </div>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <div className="card">
        <h2 className="text-2xl font-bold mb-6">我的文章</h2>
        
        {articles.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <p className="text-lg mb-4">您还没有创建任何文章</p>
            <button
              onClick={() => setShowCreateModal(true)}
              className="btn btn-primary"
            >
              创建第一篇文章
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    标题
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    类型
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    浏览量
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    点赞数
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    创建时间
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    操作
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {articles.map((article) => (
                  <tr key={article.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{article.title}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${article.is_premium ? 'bg-primary text-white' : 'bg-gray-100 text-gray-800'}`}>
                        {article.is_premium ? '付费' : '免费'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{article.views}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{article.likes}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{new Date(article.created_at).toLocaleDateString()}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <Link to={`/article/${article.id}`} className="text-primary hover:text-primary/80 mr-4">
                        查看
                      </Link>
                      <Link to={`/edit-article/${article.id}`} className="text-secondary hover:text-secondary/80 mr-4">
                        编辑
                      </Link>
                      <button
                        onClick={() => handleDelete(article.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        删除
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* 创建文章模态框 */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
          <div className="relative top-20 mx-auto p-5 border w-11/12 max-w-4xl shadow-lg rounded-md bg-white">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">创建新文章</h2>
              <button
                onClick={() => setShowCreateModal(false)}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ×
              </button>
            </div>
            
            <form onSubmit={handleCreate}>
              <div className="mb-4">
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                  标题
                </label>
                <input
                  type="text"
                  id="title"
                  className="input"
                  value={newArticle.title}
                  onChange={(e) => setNewArticle(prev => ({ ...prev, title: e.target.value }))}
                  required
                />
              </div>
              
              <div className="mb-4">
                <label htmlFor="excerpt" className="block text-sm font-medium text-gray-700 mb-1">
                  摘要
                </label>
                <textarea
                  id="excerpt"
                  className="input h-20"
                  value={newArticle.excerpt}
                  onChange={(e) => setNewArticle(prev => ({ ...prev, excerpt: e.target.value }))}
                  placeholder="文章摘要（可选）"
                />
              </div>
              
              <div className="mb-4">
                <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
                  内容
                </label>
                <textarea
                  id="content"
                  className="input h-40"
                  value={newArticle.content}
                  onChange={(e) => setNewArticle(prev => ({ ...prev, content: e.target.value }))}
                  required
                  placeholder="文章内容"
                />
              </div>
              
              <div className="mb-6">
                <label className="inline-flex items-center">
                  <input
                    type="checkbox"
                    className="form-checkbox h-5 w-5 text-primary"
                    checked={newArticle.is_premium}
                    onChange={(e) => setNewArticle(prev => ({ ...prev, is_premium: e.target.checked }))}
                  />
                  <span className="ml-2 text-sm text-gray-700">设为付费文章</span>
                </label>
              </div>
              
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="btn btn-secondary"
                >
                  取消
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                >
                  创建
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* AI工具模态框 */}
      {showAIModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
          <div className="relative top-20 mx-auto p-5 border w-11/12 max-w-4xl shadow-lg rounded-md bg-white">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">
                AI辅助创作工具
              </h2>
              <button
                onClick={() => setShowAIModal(false)}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ×
              </button>
            </div>
            
            {/* AI工具选项卡 */}
            <div className="border-b border-gray-200 mb-6">
              <div className="flex space-x-8">
                <button
                  onClick={() => setAiTool('generate')}
                  className={`py-2 px-1 border-b-2 font-medium ${aiTool === 'generate' ? 'border-purple-600 text-purple-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
                >
                  内容生成
                </button>
                <button
                  onClick={() => setAiTool('summarize')}
                  className={`py-2 px-1 border-b-2 font-medium ${aiTool === 'summarize' ? 'border-purple-600 text-purple-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
                >
                  内容摘要
                </button>
                <button
                  onClick={() => setAiTool('optimize')}
                  className={`py-2 px-1 border-b-2 font-medium ${aiTool === 'optimize' ? 'border-purple-600 text-purple-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
                >
                  内容优化
                </button>
              </div>
            </div>
            
            {/* AI工具输入 */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {aiTool === 'generate' ? '输入生成提示' : aiTool === 'summarize' ? '输入需要摘要的内容' : '输入需要优化的内容'}
                </label>
                <textarea
                  className="input h-40"
                  value={aiPrompt}
                  onChange={(e) => setAiPrompt(e.target.value)}
                  placeholder={aiTool === 'generate' ? '例如：如何提高学习效率' : aiTool === 'summarize' ? '输入需要摘要的长文本内容' : '输入需要优化的文章内容'}
                  required
                />
              </div>
              
              <div className="flex justify-end">
                <button
                  onClick={handleAIAction}
                  className="btn btn-primary bg-purple-600 hover:bg-purple-700"
                  disabled={aiLoading || !aiPrompt.trim()}
                >
                  {aiLoading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      AI处理中...
                    </>
                  ) : aiTool === 'generate' ? (
                    'AI生成内容'
                  ) : aiTool === 'summarize' ? (
                    'AI生成摘要'
                  ) : (
                    'AI优化内容'
                  )}
                </button>
              </div>
              
              {/* AI生成结果 */}
              {aiContent && (
                <div className="mt-6">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-lg font-medium">AI生成结果</h3>
                    <button
                      onClick={handleUseAIContent}
                      className="btn btn-primary"
                    >
                      使用此内容
                    </button>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 max-h-96 overflow-y-auto">
                    <pre className="whitespace-pre-wrap text-gray-700">{aiContent}</pre>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Dashboard