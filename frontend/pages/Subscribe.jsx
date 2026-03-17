import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useAuth } from '../context/AuthContext'

const Subscribe = () => {
  const { user, isAuthenticated } = useAuth()
  const [selectedPlan, setSelectedPlan] = useState('monthly')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  // 订阅计划配置
  const plans = [
    {
      id: 'monthly',
      name: '月度订阅',
      price: '¥19.99',
      period: '每月',
      features: [
        '访问所有付费文章',
        '获取专属学习资源',
        '参与会员专属社群',
        '每月更新内容提醒',
        '随时取消订阅'
      ],
      popular: false
    },
    {
      id: 'yearly',
      name: '年度订阅',
      price: '¥199.99',
      period: '每年',
      features: [
        '访问所有付费文章',
        '获取专属学习资源',
        '参与会员专属社群',
        '每月更新内容提醒',
        '随时取消订阅',
        '额外赠送2个月会员',
        '年度学习报告'
      ],
      popular: true
    },
    {
      id: 'lifetime',
      name: '永久会员',
      price: '¥999.99',
      period: '终身',
      features: [
        '永久访问所有付费文章',
        '获取所有专属学习资源',
        '终身参与会员专属社群',
        '永久更新内容提醒',
        '一次性付费，终身受益',
        '专属客服支持',
        '优先体验新功能'
      ],
      popular: false
    }
  ]

  const handleSubscribe = async () => {
    if (!isAuthenticated) {
      navigate('/login')
      return
    }

    setLoading(true)
    setError(null)

    try {
      const response = await axios.post('/api/subscribe', { plan: selectedPlan })
      
      // 更新本地用户状态
      // 这里可以添加全局状态更新逻辑
      
      navigate('/profile', { state: { message: '订阅成功！' } })
    } catch (err) {
      setError('订阅失败，请稍后重试')
      console.error('订阅失败:', err)
    } finally {
      setLoading(false)
    }
  }

  if (!isAuthenticated) {
    return (
      <div className="max-w-4xl mx-auto text-center py-16">
        <h1 className="text-3xl font-bold mb-4">请先登录</h1>
        <p className="text-gray-600 mb-8">
          您需要先登录才能订阅会员服务
        </p>
        <button
          onClick={() => navigate('/login')}
          className="btn btn-primary text-lg px-8 py-3"
        >
          立即登录
        </button>
      </div>
    )
  }

  if (user?.is_subscribed) {
    return (
      <div className="max-w-4xl mx-auto text-center py-16">
        <div className="w-24 h-24 bg-green-100 rounded-full mx-auto mb-6 flex items-center justify-center">
          <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="text-3xl font-bold mb-4">您已订阅</h1>
        <p className="text-gray-600 mb-8">
          您已经是我们的会员，无需重复订阅
        </p>
        <button
          onClick={() => navigate('/profile')}
          className="btn btn-primary text-lg px-8 py-3"
        >
          查看会员信息
        </button>
      </div>
    )
  }

  return (
    <div>
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">选择您的会员计划</h1>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          订阅我们的会员服务，解锁所有高质量的付费内容，帮助您实现个人和职业成长。
        </p>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-8 max-w-4xl mx-auto">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className={`card relative transition-all duration-300 hover:shadow-xl ${selectedPlan === plan.id ? 'border-primary shadow-lg' : ''} ${plan.popular ? 'transform scale-105' : ''}`}
          >
            {plan.popular && (
              <div className="absolute top-0 right-0 bg-primary text-white px-4 py-1 rounded-bl-lg">
                最受欢迎
              </div>
            )}

            <div className="text-center mb-6">
              <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
              <div className="mb-2">
                <span className="text-3xl font-bold">{plan.price}</span>
                <span className="text-gray-500">/{plan.period}</span>
              </div>
            </div>

            <ul className="space-y-3 mb-8">
              {plan.features.map((feature, index) => (
                <li key={index} className="flex items-start">
                  <svg className="w-5 h-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-600">{feature}</span>
                </li>
              ))}
            </ul>

            <button
              onClick={() => setSelectedPlan(plan.id)}
              className={`btn w-full ${selectedPlan === plan.id ? 'btn-primary' : 'btn-secondary'}`}
            >
              {selectedPlan === plan.id ? '已选择' : '选择计划'}
            </button>
          </div>
        ))}
      </div>

      <div className="mt-12 max-w-4xl mx-auto">
        <div className="card">
          <h2 className="text-2xl font-bold mb-6">订阅信息确认</h2>
          
          <div className="space-y-4 mb-8">
            <div className="flex justify-between">
              <span className="text-gray-600">订阅计划</span>
              <span className="font-medium">
                {plans.find(p => p.id === selectedPlan)?.name}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">价格</span>
              <span className="font-medium">
                {plans.find(p => p.id === selectedPlan)?.price}
                <span className="text-gray-500 ml-1">
                  /{plans.find(p => p.id === selectedPlan)?.period}
                </span>
              </span>
            </div>
            <div className="flex justify-between border-t border-gray-200 pt-4 font-bold text-xl">
              <span>总计</span>
              <span className="text-primary">
                {plans.find(p => p.id === selectedPlan)?.price}
              </span>
            </div>
          </div>

          <button
            onClick={handleSubscribe}
            className="btn btn-primary w-full text-lg py-3"
            disabled={loading}
          >
            {loading ? '处理中...' : '确认订阅'}
          </button>

          <div className="mt-6 text-center text-sm text-gray-500">
            <p>点击"确认订阅"即表示您同意我们的</p>
            <p className="mt-1">
              <a href="#" className="text-primary hover:underline">服务条款</a> 和
              <a href="#" className="text-primary hover:underline ml-1">隐私政策</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Subscribe