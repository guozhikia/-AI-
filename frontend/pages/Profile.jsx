import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const Profile = () => {
  const { user, logout } = useAuth()
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  const handleSubscribe = () => {
    navigate('/subscribe')
  }

  const handleUpdateProfile = () => {
    // 这里可以添加更新个人信息的逻辑
    alert('更新个人信息功能即将上线')
  }

  if (!user) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-xl font-medium">加载中...</div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">个人中心</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* 左侧信息 */}
        <div className="md:col-span-1">
          <div className="card">
            <div className="text-center mb-6">
              <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-3xl font-bold text-gray-500">
                  {user.username?.charAt(0).toUpperCase()}
                </span>
              </div>
              <h2 className="text-xl font-bold">{user.username}</h2>
              <p className="text-gray-500">{user.email}</p>
            </div>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-1">账号状态</h3>
                <div className="flex items-center">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${user.is_subscribed ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                    {user.is_subscribed ? '已订阅' : '未订阅'}
                  </span>
                  {user.is_subscribed && (
                    <span className="ml-2 text-xs text-gray-500">
                      订阅有效期至: {user.subscription_end || '永久'}
                    </span>
                  )}
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-1">注册时间</h3>
                <p className="text-sm">{new Date().toLocaleDateString()}</p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-1">角色</h3>
                <p className="text-sm">普通用户</p>
              </div>
            </div>
            
            <div className="mt-6 space-y-3">
              <button
                onClick={handleUpdateProfile}
                className="btn btn-secondary w-full"
              >
                编辑个人信息
              </button>
              
              {!user.is_subscribed && (
                <button
                  onClick={handleSubscribe}
                  className="btn btn-primary w-full"
                >
                  立即订阅
                </button>
              )}
              
              <button
                onClick={handleLogout}
                className="w-full px-4 py-2 border border-red-500 text-red-500 rounded-md font-medium hover:bg-red-50 transition-colors"
              >
                退出登录
              </button>
            </div>
          </div>
        </div>
        
        {/* 右侧详细信息 */}
        <div className="md:col-span-2">
          <div className="card mb-8">
            <h2 className="text-xl font-bold mb-6">账户信息</h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  用户名
                </label>
                <input
                  type="text"
                  className="input"
                  value={user.username}
                  disabled
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  邮箱
                </label>
                <input
                  type="email"
                  className="input"
                  value={user.email}
                  disabled
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  密码
                </label>
                <input
                  type="password"
                  className="input"
                  placeholder="••••••••"
                  disabled
                />
                <p className="text-sm text-gray-500 mt-1">
                  <a href="#" className="text-primary hover:underline">
                    更改密码
                  </a>
                </p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  订阅状态
                </label>
                <div className="flex items-center">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${user.is_subscribed ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                    {user.is_subscribed ? '已订阅' : '未订阅'}
                  </span>
                  {!user.is_subscribed && (
                    <button
                      onClick={handleSubscribe}
                      className="ml-4 text-sm text-primary hover:underline"
                    >
                      立即订阅解锁全部内容
                    </button>
                  )}
                </div>
              </div>
            </div>
            
            <div className="mt-8">
              <button
                onClick={handleUpdateProfile}
                className="btn btn-primary"
              >
                更新信息
              </button>
            </div>
          </div>
          
          <div className="card">
            <h2 className="text-xl font-bold mb-6">订阅信息</h2>
            
            {user.is_subscribed ? (
              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-green-800">已订阅</h3>
                    <p className="text-green-600">您已解锁所有付费内容</p>
                  </div>
                </div>
                
                <div className="space-y-2 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600">订阅类型</span>
                    <span className="font-medium">高级会员</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">订阅状态</span>
                    <span className="text-green-600 font-medium">活跃</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">有效期至</span>
                    <span className="font-medium">{user.subscription_end || '永久'}</span>
                  </div>
                </div>
                
                <button className="btn btn-secondary w-full">
                  管理订阅
                </button>
              </div>
            ) : (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-blue-800">未订阅</h3>
                    <p className="text-blue-600">订阅会员解锁全部内容</p>
                  </div>
                </div>
                
                <div className="space-y-4 mb-6">
                  <div className="flex items-center space-x-2">
                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>访问所有付费文章</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>获取专属学习资源</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>参与会员专属社群</span>
                  </div>
                </div>
                
                <button
                  onClick={handleSubscribe}
                  className="btn btn-primary w-full"
                >
                  立即订阅
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile