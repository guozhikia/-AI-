import React from 'react'
import { Link } from 'react-router-dom'

const About = () => {
  return (
    <div className="max-w-6xl mx-auto">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-amber-50 to-rose-50 rounded-2xl p-12 mb-16 text-center">
        <h1 className="text-4xl font-bold mb-4 text-gray-800">素人AI深度阅读社区</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          不用读书，AI帮你筛选整合干货
        </p>
      </div>

      {/* Mission Section */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-6 text-center">项目定位</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
            <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mb-4 mx-auto">
              <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-3">AI赋能阅读</h3>
            <p className="text-gray-600">
              利用先进的AI技术，为你筛选、整合、提炼书籍中的核心干货，让你用最少的时间获取最多的知识。
            </p>
          </div>
          <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
            <div className="w-12 h-12 bg-rose-100 rounded-full flex items-center justify-center mb-4 mx-auto">
              <svg className="w-6 h-6 text-rose-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-3">深度内容拆解</h3>
            <p className="text-gray-600">
              我们不仅提供摘要，更提供深度的内容拆解，帮助你理解书籍的核心思想和实用方法。
            </p>
          </div>
          <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
            <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center mb-4 mx-auto">
              <svg className="w-6 h-6 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-3">高效知识获取</h3>
            <p className="text-gray-600">
              我们的目标是让知识获取变得更加高效，让你在忙碌的生活中也能持续学习和成长。
            </p>
          </div>
        </div>
      </section>

      {/* AI Advantage Section */}
      <section className="mb-16 bg-gradient-to-r from-gray-50 to-amber-50 rounded-2xl p-12">
        <h2 className="text-2xl font-bold mb-8 text-center">AI赋能优势</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <div className="flex items-start mb-6">
              <div className="w-10 h-10 bg-amber-200 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                <span className="text-amber-700 font-bold">1</span>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">智能筛选</h3>
                <p className="text-gray-600">
                  AI从海量书籍和文章中筛选出最有价值的内容，帮你避开低质量信息。
                </p>
              </div>
            </div>
            <div className="flex items-start mb-6">
              <div className="w-10 h-10 bg-amber-200 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                <span className="text-amber-700 font-bold">2</span>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">深度整合</h3>
                <p className="text-gray-600">
                  AI对筛选出的内容进行深度整合，形成结构化的知识体系，便于理解和应用。
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="w-10 h-10 bg-amber-200 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                <span className="text-amber-700 font-bold">3</span>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">个性化推荐</h3>
                <p className="text-gray-600">
                  根据你的阅读偏好和学习目标，AI为你推荐最适合的内容。
                </p>
              </div>
            </div>
          </div>
          <div>
            <div className="flex items-start mb-6">
              <div className="w-10 h-10 bg-amber-200 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                <span className="text-amber-700 font-bold">4</span>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">实用方法提炼</h3>
                <p className="text-gray-600">
                  AI从内容中提炼出实用的方法和技巧，让你能够立即应用到实际生活中。
                </p>
              </div>
            </div>
            <div className="flex items-start mb-6">
              <div className="w-10 h-10 bg-amber-200 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                <span className="text-amber-700 font-bold">5</span>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">持续更新</h3>
                <p className="text-gray-600">
                  我们的AI系统持续更新，为你提供最新、最前沿的知识内容。
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="w-10 h-10 bg-amber-200 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                <span className="text-amber-700 font-bold">6</span>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">节省时间</h3>
                <p className="text-gray-600">
                  让你用10%的时间获取90%的核心知识，极大地提高学习效率。
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Target Audience Section */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-8 text-center">服务人群</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 text-center">
            <div className="w-16 h-16 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-rose-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-2">职场人士</h3>
            <p className="text-gray-600 text-sm">
              想要提升专业技能，但时间有限的职场人士
            </p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 text-center">
            <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-2">学生群体</h3>
            <p className="text-gray-600 text-sm">
              需要广泛阅读，但学业繁忙的学生群体
            </p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 text-center">
            <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-2">创业者</h3>
            <p className="text-gray-600 text-sm">
              需要快速获取商业知识和创业经验的创业者
            </p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-2">终身学习者</h3>
            <p className="text-gray-600 text-sm">
              热爱学习，想要不断提升自己的终身学习者
            </p>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="mb-16 bg-white rounded-2xl p-12 shadow-sm border border-gray-100">
        <h2 className="text-2xl font-bold mb-8 text-center">我们的价值观</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-amber-200 to-rose-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-10 h-10 text-amber-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-2">品质第一</h3>
            <p className="text-gray-600">
              我们始终将内容品质放在首位，确保每一篇AI拆解的内容都具有高价值。
            </p>
          </div>
          <div className="text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-rose-200 to-purple-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-10 h-10 text-rose-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-2">用户至上</h3>
            <p className="text-gray-600">
              我们始终以用户需求为中心，不断优化产品和服务，提升用户体验。
            </p>
          </div>
          <div className="text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-purple-200 to-amber-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-10 h-10 text-purple-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-2">创新驱动</h3>
            <p className="text-gray-600">
              我们不断探索AI技术在知识获取领域的应用，推动产品和服务的创新。
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="text-center bg-gradient-to-r from-rose-50 to-amber-50 rounded-2xl p-12">
        <h2 className="text-2xl font-bold mb-4">开始你的AI阅读之旅</h2>
        <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
          不用读书，AI帮你筛选整合干货，让知识获取变得更加高效
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link to="/" className="btn btn-primary text-lg px-8 py-3">
            查看免费内容
          </Link>
          <Link to="/premium" className="btn btn-secondary text-lg px-8 py-3">
            订阅付费专栏
          </Link>
        </div>
      </section>
    </div>
  )
}

export default About