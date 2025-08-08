import React, { useState } from 'react';

interface Tool {
  id: number;
  title: string;
  creator: string;
  price: number;
  previewUrl: string;
  tags: string[];
  isFavorite: boolean;
  isPurchased: boolean;
  lastUsed?: string;
}

const MyToolkit: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [activeFilter, setActiveFilter] = useState<'all' | 'purchased' | 'favorited' | 'saved'>('all');

  // Mock data for tools
  const mockTools: Tool[] = [
    {
      id: 1,
      title: "Interactive Math Game: Algebra Adventures",
      creator: "Jane Smith",
      price: 12.99,
      previewUrl: "https://via.placeholder.com/300x200/4F46E5/FFFFFF?text=Math+Game",
      tags: ["Math", "Algebra", "Game", "Middle School"],
      isFavorite: true,
      isPurchased: true,
      lastUsed: "2023-10-15"
    },
    {
      id: 2,
      title: "Science Lab Templates",
      creator: "John Doe",
      price: 7.99,
      previewUrl: "https://via.placeholder.com/300x200/10B981/FFFFFF?text=Science+Lab",
      tags: ["Science", "Templates", "Middle School"],
      isFavorite: false,
      isPurchased: true,
      lastUsed: "2023-10-10"
    },
    {
      id: 3,
      title: "Classroom Management Toolkit",
      creator: "Teacher Resources Inc",
      price: 0, // Free tool
      previewUrl: "https://via.placeholder.com/300x200/8B5CF6/FFFFFF?text=Classroom+Mgmt",
      tags: ["Management", "Organization", "All Grades"],
      isFavorite: true,
      isPurchased: false,
      lastUsed: "2023-10-05"
    },
    {
      id: 4,
      title: "Creative Writing Prompts",
      creator: "Creative Educators",
      price: 4.99,
      previewUrl: "https://via.placeholder.com/300x200/EC4899/FFFFFF?text=Writing+Prompts",
      tags: ["English", "Writing", "Elementary"],
      isFavorite: false,
      isPurchased: true,
      lastUsed: "2023-10-01"
    },
    {
      id: 5,
      title: "History Timeline Creator",
      creator: "History Hub",
      price: 0, // Free tool
      previewUrl: "https://via.placeholder.com/300x200/F59E0B/FFFFFF?text=History+Timeline",
      tags: ["History", "Timeline", "Middle School"],
      isFavorite: true,
      isPurchased: false,
      lastUsed: "2023-09-28"
    },
    {
      id: 6,
      title: "Art Project Ideas",
      creator: "Artistic Minds",
      price: 2.99,
      previewUrl: "https://via.placeholder.com/300x200/EF4444/FFFFFF?text=Art+Projects",
      tags: ["Art", "Projects", "All Grades"],
      isFavorite: false,
      isPurchased: true,
      lastUsed: "2023-09-25"
    }
  ];

  // Get all unique tags from tools
  const allTags = Array.from(new Set(mockTools.flatMap(tool => tool.tags)));

  // Filter tools based on search query, selected tags, and active filter
  const filteredTools = mockTools.filter(tool => {
    const matchesSearch = tool.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          tool.creator.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          tool.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesTags = selectedTags.length === 0 || 
                        selectedTags.some(tag => tool.tags.includes(tag));
    
    const matchesFilter = activeFilter === 'all' ||
                         (activeFilter === 'purchased' && tool.isPurchased) ||
                         (activeFilter === 'favorited' && tool.isFavorite) ||
                         (activeFilter === 'saved' && !tool.isPurchased && !tool.isFavorite);
    
    return matchesSearch && matchesTags && matchesFilter;
  });

  // Get recently used tools (sorted by lastUsed date)
  const recentlyUsedTools = [...mockTools]
    .filter(tool => tool.lastUsed)
    .sort((a, b) => new Date(b.lastUsed!).getTime() - new Date(a.lastUsed!).getTime())
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Toolkit</h1>
          <p className="text-gray-600">Access and manage all your saved and purchased tools</p>
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="mb-6">
            <div className="relative">
              <input
                type="text"
                placeholder="Search by title, creator, or tag..."
                className="w-full px-6 py-4 rounded-2xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <svg 
                className="absolute right-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-400" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>

          {/* Filter Chips */}
          <div className="flex flex-wrap gap-3 mb-4">
            <button
              className={`px-5 py-2 rounded-full font-medium transition-all ${
                activeFilter === 'all'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
              onClick={() => setActiveFilter('all')}
            >
              All Tools
            </button>
            <button
              className={`px-5 py-2 rounded-full font-medium transition-all ${
                activeFilter === 'purchased'
                  ? 'bg-green-600 text-white shadow-md'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
              onClick={() => setActiveFilter('purchased')}
            >
              Purchased
            </button>
            <button
              className={`px-5 py-2 rounded-full font-medium transition-all ${
                activeFilter === 'favorited'
                  ? 'bg-red-500 text-white shadow-md'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
              onClick={() => setActiveFilter('favorited')}
            >
              Favorited
            </button>
            <button
              className={`px-5 py-2 rounded-full font-medium transition-all ${
                activeFilter === 'saved'
                  ? 'bg-purple-600 text-white shadow-md'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
              onClick={() => setActiveFilter('saved')}
            >
              Saved
            </button>
          </div>

          {/* Tag Filters */}
          <div className="flex flex-wrap gap-2">
            <span className="font-medium text-gray-700 mr-2">Filter by:</span>
            {allTags.map(tag => (
              <button
                key={tag}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedTags.includes(tag)
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
                onClick={() => {
                  if (selectedTags.includes(tag)) {
                    setSelectedTags(selectedTags.filter(t => t !== tag));
                  } else {
                    setSelectedTags([...selectedTags, tag]);
                  }
                }}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Recently Used */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-gray-900">Recently Used</h2>
            <button className="text-blue-600 hover:text-blue-800 font-medium">
              View All
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentlyUsedTools.map(tool => (
              <div 
                key={tool.id} 
                className="bg-white rounded-2xl shadow-lg overflow-hidden transition-transform duration-300 hover:shadow-xl hover:-translate-y-1"
              >
                <img 
                  src={tool.previewUrl} 
                  alt={tool.title} 
                  className="w-full h-40 object-cover"
                />
                <div className="p-5">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-lg text-gray-900">{tool.title}</h3>
                    <button className="text-2xl">
                      {tool.isFavorite ? '❤️' : '🤍'}
                    </button>
                  </div>
                  <p className="text-gray-600 text-sm mb-3">by {tool.creator}</p>
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-blue-600">
                      {tool.price === 0 ? 'FREE' : `$${tool.price.toFixed(2)}`}
                    </span>
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700">
                      Launch
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Saved, Favorited, Purchased */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">All Tools</h2>
          {filteredTools.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
              <svg 
                className="w-16 h-16 text-gray-300 mx-auto mb-4" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No tools found</h3>
              <p className="text-gray-600 mb-4">Try adjusting your search or filter criteria</p>
              <button 
                className="text-blue-600 hover:text-blue-800 font-medium"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedTags([]);
                  setActiveFilter('all');
                }}
              >
                Clear all filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTools.map(tool => (
                <div 
                  key={tool.id} 
                  className="bg-white rounded-2xl shadow-lg overflow-hidden transition-transform duration-300 hover:shadow-xl hover:-translate-y-1"
                >
                  <div className="relative">
                    <img 
                      src={tool.previewUrl} 
                      alt={tool.title} 
                      className="w-full h-48 object-cover"
                    />
                    {tool.isPurchased && (
                      <span className="absolute top-3 right-3 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                        Purchased
                      </span>
                    )}
                    {tool.price === 0 && !tool.isPurchased && (
                      <span className="absolute top-3 right-3 bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                        Free
                      </span>
                    )}
                  </div>
                  <div className="p-5">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-bold text-lg text-gray-900">{tool.title}</h3>
                      <button className="text-2xl">
                        {tool.isFavorite ? '❤️' : '🤍'}
                      </button>
                    </div>
                    <p className="text-gray-600 text-sm mb-3">by {tool.creator}</p>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {tool.tags.slice(0, 3).map(tag => (
                        <span key={tag} className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-blue-600">
                        {tool.price === 0 ? 'FREE' : `$${tool.price.toFixed(2)}`}
                      </span>
                      <div className="flex gap-2">
                        {tool.isPurchased ? (
                          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700">
                            Launch
                          </button>
                        ) : (
                          <>
                            <button className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg text-sm hover:bg-gray-300">
                              Preview
                            </button>
                            <button className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-green-700">
                              Buy
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyToolkit;