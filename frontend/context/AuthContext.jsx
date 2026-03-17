import { createContext, useState, useEffect, useContext } from 'react'
import axios from 'axios'

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(localStorage.getItem('token'))
  const [loading, setLoading] = useState(true)

  // 登录
  const login = async (email, password) => {
    try {
      const response = await axios.post('/api/login', { email, password })
      const { token, user } = response.data
      
      localStorage.setItem('token', token)
      setToken(token)
      setUser(user)
      
      return { success: true }
    } catch (error) {
      return { success: false, error: error.response?.data?.error || '登录失败' }
    }
  }

  // 注册
  const register = async (username, email, password) => {
    try {
      await axios.post('/api/register', { username, email, password })
      return { success: true }
    } catch (error) {
      return { success: false, error: error.response?.data?.error || '注册失败' }
    }
  }

  // 登出
  const logout = () => {
    localStorage.removeItem('token')
    setToken(null)
    setUser(null)
  }

  // 检查认证状态
  useEffect(() => {
    const checkAuth = async () => {
      if (!token) {
        setLoading(false)
        return
      }

      try {
        // 这里可以添加获取用户信息的API调用
        setLoading(false)
      } catch (error) {
        localStorage.removeItem('token')
        setToken(null)
        setUser(null)
        setLoading(false)
      }
    }

    checkAuth()
  }, [token])

  const value = {
    user,
    token,
    loading,
    login,
    register,
    logout,
    isAuthenticated: !!token
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth必须在AuthProvider内部使用')
  }
  return context
}