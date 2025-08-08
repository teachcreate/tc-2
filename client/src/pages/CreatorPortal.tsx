import React, { useState } from 'react';

interface Creation {
  id: number;
  title: string;
  price: number;
  status: 'Published' | 'Processing' | 'Archived';
  sales: number;
  likes: number;
  launches: number;
  favorites: number;
  thumbnail: string;
  category: string;
  tags: string[];
}

interface AnalyticsData {
  totalSales: number;
  totalEarnings: number;
  totalTools: number;
  classroomUses: number;
  recentSales: { date: string; amount: number }[];
}

const CreatorPortal: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'uploads' | 'profile' | 'payouts'>('dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'Published' | 'Processing' | 'Archived'>('all');

  // Mock data
  const analyticsData: AnalyticsData = {
    totalSales: 142,
    totalEarnings: 2847.50,
    totalTools: 24,
    classroomUses: 8412,
    recentSales: [
      { date: '2023-10-15', amount: 12.99 },
      { date: '2023-10-14', amount: 8.99 },
      { date: '2023-10-14', amount: 4.99 },
      { date: '2023-10-13', amount: 12.99 },
      { date: '2023-10-12', amount: 7.99 }
    ]
  };

  const creations: Creation[] = [
    {
      id: 1,
      title: "Interactive Math Game: Algebra Adventures",
      price: 12.99,
      status: 'Published',
      sales: 86,
      likes: 142,
      launches: 324,
      favorites: 98,
      thumbnail: "https://via.placeholder.com/300x200/4F46E5/FFFFFF?text=Math+Game",
      category: "Tool",
      tags: ["Math", "Algebra", "Game"]
    },
    {
      id: 2,
      title: "Science Lab Templates",
      price: 7.99,
      status: 'Published',
      sales: 56,
      likes: 89,
      launches: 187,
      favorites: 64,
      thumbnail: "https://via.placeholder.com/300x200/10B981/FFFFFF?text=Science+Lab",
      category: "Resource",
      tags: ["Science", "Templates", "Lab"]
    },
    {
      id: 3,
      title: "Classroom Management Toolkit",
      price: 0,
      status: 'Published',
      sales: 0,
      likes: 215,
      launches: 487,
      favorites: 176,
      thumbnail: "https://via.placeholder.com/300x200/8B5CF6/FFFFFF?text=Classroom+Mgmt",
      category: "Tool",
      tags: ["Management", "Organization", "Classroom"]
    },
    {
      id: 4,
      title: "History Timeline Creator",
      price: 9.99,
      status: 'Processing',
      sales: 0,
      likes: 0,
      launches: 0,
      favorites: 0,
      thumbnail: "https://via.placeholder.com/300x200/F59E0B/FFFFFF?text=History+Timeline",
      category: "Tool",
      tags: ["History", "Timeline", "Creator"]
    },
    {
      id: 5,
      title: "Creative Writing Prompts",
      price: 4.99,
      status: 'Published',
      sales: 32,
      likes: 76,
      launches: 142,
      favorites: 58,
      thumbnail: "https://via.placeholder.com/300x200/EC4899/FFFFFF?text=Writing+Prompts",
      category: "Resource",
      tags: ["English", "Writing", "Prompts"]
    },
    {
      id: 6,
      title: "Art Project Ideas",
      price: 0,
      status: 'Archived',
      sales: 0,
      likes: 0,
      launches: 0,
      favorites: 0,
      thumbnail: "https://via.placeholder.com/300x200/EF4444/FFFFFF?text=Art+Projects",
      category: "Resource",
      tags: ["Art", "Projects", "Ideas"]
    }
  ];

  // Filter creations based on search and status
  const filteredCreations = creations.filter(creation => {
    const matchesSearch = creation.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          creation.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesStatus = statusFilter === 'all' || creation.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Creator Portal</h1>
              <p className="text-gray-600">Manage your creations and track your performance</p>
            </div>
            <button className="bg-gradient-to-r from-purple-600 to-indigo-700 text-white px-6 py-3 rounded-xl font-bold hover:from-purple-700 hover:to-indigo-800 transition-all shadow-md">
              + New Creation
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-2xl shadow-lg p-2 mb-6">
          <div className="flex flex-wrap gap-1">
            <button
              className={`px-5 py-3 rounded-xl font-medium transition-all ${
                activeTab === 'dashboard'
                  ? 'bg-purple-600 text-white shadow-md'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
              onClick={() => setActiveTab('dashboard')}
            >
              Dashboard
            </button>
            <button
              className={`px-5 py-3 rounded-xl font-medium transition-all ${
                activeTab === 'uploads'
                  ? 'bg-purple-600 text-white shadow-md'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
              onClick={() => setActiveTab('uploads')}
            >
              My Creations
            </button>
            <button
              className={`px-5 py-3 rounded-xl font-medium transition-all ${
                activeTab === 'profile'
                  ? 'bg-purple-600 text-white shadow-md'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
              onClick={() => setActiveTab('profile')}
            >
              Profile
            </button>
            <button
              className={`px-5 py-3 rounded-xl font-medium transition-all ${
                activeTab === 'payouts'
                  ? 'bg-purple-600 text-white shadow-md'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
              onClick={() => setActiveTab('payouts')}
            >
              Payouts
            </button>
          </div>
        </div>

        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <div className="flex items-center">
                  <div className="p-3 bg-green-100 rounded-lg mr-4">
                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Sales</p>
                    <p className="text-2xl font-bold text-gray-900">{analyticsData.totalSales}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-6">
                <div className="flex items-center">
                  <div className="p-3 bg-blue-100 rounded-lg mr-4">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Earnings</p>
                    <p className="text-2xl font-bold text-gray-900">${analyticsData.totalEarnings.toFixed(2)}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-6">
                <div className="flex items-center">
                  <div className="p-3 bg-purple-100 rounded-lg mr-4">
                    <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/>
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Tools</p>
                    <p className="text-2xl font-bold text-gray-900">{analyticsData.totalTools}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-6">
                <div className="flex items-center">
                  <div className="p-3 bg-orange-100 rounded-lg mr-4">
                    <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">Classroom Uses</p>
                    <p className="text-2xl font-bold text-gray-900">{analyticsData.classroomUses.toLocaleString()}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Sales Chart */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Sales</h3>
              <div className="space-y-3">
                {analyticsData.recentSales.map((sale, index) => (
                  <div key={index} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
                    <span className="text-gray-600">{sale.date}</span>
                    <span className="font-semibold text-green-600">${sale.amount.toFixed(2)}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Uploads Tab */}
        {activeTab === 'uploads' && (
          <div className="space-y-6">
            {/* Search and Filters */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <input
                    type="text"
                    placeholder="Search your creations..."
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <select
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value as any)}
                >
                  <option value="all">All Status</option>
                  <option value="Published">Published</option>
                  <option value="Processing">Processing</option>
                  <option value="Archived">Archived</option>
                </select>
              </div>
            </div>

            {/* Creations Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCreations.map(creation => (
                <div key={creation.id} className="bg-white rounded-2xl shadow-lg overflow-hidden">
                  <img src={creation.thumbnail} alt={creation.title} className="w-full h-48 object-cover" />
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        creation.status === 'Published' ? 'bg-green-100 text-green-800' :
                        creation.status === 'Processing' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {creation.status}
                      </span>
                      <span className="text-lg font-bold text-gray-900">
                        {creation.price === 0 ? 'FREE' : `$${creation.price.toFixed(2)}`}
                      </span>
                    </div>
                    <h3 className="font-bold text-lg text-gray-900 mb-2">{creation.title}</h3>
                    <p className="text-sm text-gray-600 mb-4">{creation.category}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {creation.tags.slice(0, 3).map(tag => (
                        <span key={tag} className="px-2 py-1 bg-purple-50 text-purple-700 rounded-full text-xs">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-gray-600">Sales</p>
                        <p className="font-semibold">{creation.sales}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Likes</p>
                        <p className="font-semibold">{creation.likes}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Launches</p>
                        <p className="font-semibold">{creation.launches}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Favorites</p>
                        <p className="font-semibold">{creation.favorites}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Profile Tab */}
        {activeTab === 'profile' && (
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Profile Settings</h3>
            <p className="text-gray-600">Profile management features coming soon...</p>
          </div>
        )}

        {/* Payouts Tab */}
        {activeTab === 'payouts' && (
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Payouts</h3>
            <p className="text-gray-600">Payout management features coming soon...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreatorPortal;
