import React, { useState } from 'react';
import { Heart, ShoppingCart, Play, Star, Eye } from 'lucide-react';

interface Product {
  id: number;
  title: string;
  creator: string;
  price: number;
  isFavorite: boolean;
  previewUrl: string;
  tags: string[];
  rating: number;
  reviewCount: number;
  isInCart: boolean;
}

const Home: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'tools' | 'games' | 'resources'>('tools');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  
  // Enhanced mock data for products
  const mockProducts: Product[] = [
    {
      id: 1,
      title: "Interactive Math Game: Algebra Adventures",
      creator: "Jane Smith",
      price: 4.99,
      isFavorite: true,
      previewUrl: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400&h=300&fit=crop&crop=center",
      tags: ["Math", "Elementary", "Game"],
      rating: 4.8,
      reviewCount: 127,
      isInCart: false
    },
    {
      id: 2,
      title: "Science Lab Templates & Experiments",
      creator: "John Doe",
      price: 2.99,
      isFavorite: false,
      previewUrl: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=400&h=300&fit=crop&crop=center",
      tags: ["Science", "Templates", "Middle School"],
      rating: 4.6,
      reviewCount: 89,
      isInCart: false
    },
    {
      id: 3,
      title: "Classroom Management Toolkit Pro",
      creator: "Teacher Resources Inc",
      price: 7.99,
      isFavorite: true,
      previewUrl: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=400&h=300&fit=crop&crop=center",
      tags: ["Management", "Organization", "All Grades"],
      rating: 4.9,
      reviewCount: 234,
      isInCart: false
    },
    {
      id: 4,
      title: "Creative Writing Prompts Collection",
      creator: "Creative Educators",
      price: 3.49,
      isFavorite: false,
      previewUrl: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=400&h=300&fit=crop&crop=center",
      tags: ["English", "Writing", "Elementary"],
      rating: 4.7,
      reviewCount: 156,
      isInCart: false
    },
    {
      id: 5,
      title: "History Timeline Creator Suite",
      creator: "History Hub",
      price: 5.99,
      isFavorite: true,
      previewUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop&crop=center",
      tags: ["History", "Timeline", "Middle School"],
      rating: 4.5,
      reviewCount: 78,
      isInCart: false
    },
    {
      id: 6,
      title: "Art Project Ideas & Templates",
      creator: "Artistic Minds",
      price: 1.99,
      isFavorite: false,
      previewUrl: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8a?w=400&h=300&fit=crop&crop=center",
      tags: ["Art", "Projects", "All Grades"],
      rating: 4.4,
      reviewCount: 92,
      isInCart: false
    }
  ];

  // Enhanced sidebar content
  const sidebarContent = [
    {
      id: 1,
      title: "🎉 New Free Tool: Grade Tracker",
      description: "Download our latest free tool to track student progress with beautiful analytics",
      imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=300&h=150&fit=crop&crop=center",
      badge: "FREE"
    },
    {
      id: 2,
      title: "🔥 25% Off All Math Resources",
      description: "Limited time offer on all math-related tools and games",
      imageUrl: "https://images.unsplash.com/photo-1509228468518-180dd4864904?w=300&h=150&fit=crop&crop=center",
      badge: "SALE"
    }
  ];

  // Cart functions
  const addToCart = (product: Product) => {
    if (!product.isInCart) {
      setCartItems([...cartItems, { ...product, isInCart: true }]);
      // Update product state
      const updatedProducts = mockProducts.map(p => 
        p.id === product.id ? { ...p, isInCart: true } : p
      );
    }
  };

  const removeFromCart = (productId: number) => {
    setCartItems(cartItems.filter(item => item.id !== productId));
    // Update product state
    const updatedProducts = mockProducts.map(p => 
      p.id === productId ? { ...p, isInCart: false } : p
    );
  };

  const toggleFavorite = (id: number) => {
    console.log(`Toggled favorite for product ${id}`);
  };

  // Filter products based on active tab, search query, and selected tags
  const filteredProducts = mockProducts.filter(product => {
    const matchesTab = activeTab === 'tools' ||
                      (activeTab === 'games' && product.tags.includes('Game')) ||
                      (activeTab === 'resources' && product.tags.includes('Templates'));
    
    const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          product.creator.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          product.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesTags = selectedTags.length === 0 ||
                        selectedTags.some(tag => product.tags.includes(tag));
    
    return matchesTab && matchesSearch && matchesTags;
  });

  // Get all unique tags from products
  const allTags = Array.from(new Set(mockProducts.flatMap(product => product.tags)));

  const cartTotal = cartItems.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="bg-gradient-to-br from-gray-50 to-blue-50 min-h-screen">
      {/* Enhanced Hero Section */}
      <header className="relative bg-gradient-to-r from-blue-600 via-indigo-700 to-purple-800 text-white overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-72 h-72 bg-white rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
          <div className="absolute top-0 right-0 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-4000"></div>
        </div>
        
        <div className="container mx-auto py-16 px-4 relative z-10">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-center">
            TeachCreate
          </h1>
          <p className="text-2xl md:text-3xl mb-12 text-center font-light">
            Built by Teachers, For Teachers
          </p>
          
          {/* Enhanced Tabs */}
          <div className="flex flex-wrap justify-center gap-3">
            {[
              { key: 'tools', label: 'Tools', icon: '🛠️' },
              { key: 'games', label: 'Games', icon: '🎮' },
              { key: 'resources', label: 'Resources', icon: '📚' }
            ].map(({ key, label, icon }) => (
              <button
                key={key}
                className={`px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 ${
                  activeTab === key
                    ? 'bg-white text-indigo-700 shadow-2xl scale-105'
                    : 'bg-white/20 hover:bg-white/30 backdrop-blur-sm'
                }`}
                onClick={() => setActiveTab(key as any)}
              >
                {icon} {label}
              </button>
            ))}
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Main Content */}
          <div className="lg:w-3/4">
            {/* Enhanced Search Bar */}
            <div className="mb-10">
              <div className="relative max-w-2xl mx-auto">
                <input
                  type="text"
                  placeholder="Search for tools, games, and resources..."
                  className="w-full px-8 py-5 rounded-2xl border-0 bg-white shadow-lg focus:outline-none focus:ring-4 focus:ring-blue-500/20 text-lg placeholder-gray-400"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2 w-8 h-8 text-gray-400">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Enhanced Tag Filters */}
            <div className="mb-10">
              <div className="flex flex-wrap gap-3 justify-center">
                <span className="font-semibold text-gray-700 mr-2 self-center">Filter by:</span>
                {allTags.map(tag => (
                  <button
                    key={tag}
                    className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 transform hover:scale-105 ${
                      selectedTags.includes(tag)
                        ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg'
                        : 'bg-white text-gray-700 hover:bg-gray-100 shadow-md hover:shadow-lg'
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

            {/* Enhanced Product Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
              {filteredProducts.map(product => (
                <div
                  key={product.id}
                  className="group bg-white rounded-3xl shadow-lg overflow-hidden transition-all duration-500 hover:shadow-2xl hover:-translate-y-2"
                >
                  {/* Enhanced Product Preview */}
                  <div className="relative overflow-hidden">
                    <img
                      src={product.previewUrl}
                      alt={product.title}
                      className="w-full h-56 object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-4 left-4 right-4 flex gap-2">
                        <button className="bg-white/90 text-gray-800 rounded-full p-3 shadow-lg hover:bg-white transition-colors duration-200 flex-1 flex items-center justify-center gap-2">
                          <Eye className="w-4 h-4" />
                          <span className="text-sm font-medium">Preview</span>
                        </button>
                        <button className="bg-white/90 text-gray-800 rounded-full p-3 shadow-lg hover:bg-white transition-colors duration-200">
                          <Play className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    
                    {/* Favorite Button */}
                    <button
                      onClick={() => toggleFavorite(product.id)}
                      className="absolute top-4 right-4 bg-white/90 rounded-full p-2 shadow-lg hover:bg-white transition-colors duration-200"
                    >
                      <Heart 
                        className={`w-5 h-5 ${product.isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} 
                      />
                    </button>
                  </div>
                  
                  {/* Enhanced Product Info */}
                  <div className="p-6">
                    <div className="mb-3">
                      <h3 className="font-bold text-xl text-gray-900 mb-2 line-clamp-2">{product.title}</h3>
                      <p className="text-gray-600 text-sm">by {product.creator}</p>
                    </div>
                    
                    {/* Rating */}
                    <div className="flex items-center gap-2 mb-4">
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
                          />
                        ))}
                      </div>
                      <span className="text-sm text-gray-600">({product.reviewCount})</span>
                    </div>
                    
                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {product.tags.slice(0, 2).map(tag => (
                        <span key={tag} className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-medium">
                          {tag}
                        </span>
                      ))}
                    </div>
                    
                    {/* Price and Actions */}
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-2xl text-blue-600">${product.price.toFixed(2)}</span>
                      <div className="flex gap-2">
                        <button 
                          onClick={() => addToCart(product)}
                          disabled={product.isInCart}
                          className={`px-4 py-2 rounded-xl font-medium transition-all duration-200 ${
                            product.isInCart
                              ? 'bg-green-100 text-green-700 cursor-not-allowed'
                              : 'bg-blue-600 text-white hover:bg-blue-700 hover:shadow-lg'
                          }`}
                        >
                          {product.isInCart ? '✓ Added' : 'Add to Cart'}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Enhanced Sidebar */}
          <div className="lg:w-1/4">
            <div className="sticky top-8 space-y-8">
              {/* Cart Summary */}
              <div className="bg-white rounded-3xl shadow-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-gray-900">Cart</h2>
                  <button 
                    onClick={() => setIsCartOpen(true)}
                    className="relative p-2 text-gray-600 hover:text-blue-600 transition-colors"
                  >
                    <ShoppingCart className="w-6 h-6" />
                    {cartItems.length > 0 && (
                      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                        {cartItems.length}
                      </span>
                    )}
                  </button>
                </div>
                <div className="space-y-3">
                  {cartItems.slice(0, 3).map(item => (
                    <div key={item.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                      <img src={item.previewUrl} alt={item.title} className="w-12 h-12 rounded-lg object-cover" />
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm text-gray-900 truncate">{item.title}</p>
                        <p className="text-sm text-gray-600">${item.price.toFixed(2)}</p>
                      </div>
                      <button 
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                  {cartItems.length === 0 && (
                    <p className="text-gray-500 text-center py-4">Your cart is empty</p>
                  )}
                  {cartItems.length > 0 && (
                    <div className="pt-3 border-t border-gray-200">
                      <div className="flex justify-between items-center mb-3">
                        <span className="font-semibold">Total:</span>
                        <span className="font-bold text-xl text-blue-600">${cartTotal.toFixed(2)}</span>
                      </div>
                      <button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl">
                        Checkout
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Featured Content */}
              <div className="space-y-6">
                {sidebarContent.map(item => (
                  <div key={item.id} className="bg-white rounded-3xl shadow-lg overflow-hidden transition-transform duration-300 hover:shadow-xl hover:-translate-y-1">
                    <div className="relative">
                      <img
                        src={item.imageUrl}
                        alt={item.title}
                        className="w-full h-40 object-cover"
                      />
                      {item.badge && (
                        <span className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-bold ${
                          item.badge === 'FREE' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
                        }`}>
                          {item.badge}
                        </span>
                      )}
                    </div>
                    <div className="p-5">
                      <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                      <p className="text-gray-600 text-sm leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Creator Spotlight */}
              <div className="bg-gradient-to-br from-purple-500 to-indigo-600 rounded-3xl shadow-lg text-white p-6">
                <h3 className="font-bold text-lg mb-2">🌟 Teacher Creator Spotlight</h3>
                <p className="text-sm mb-4 opacity-90">Meet Sarah Johnson, creator of the award-winning "Math Adventure" series</p>
                <button className="bg-white text-purple-600 font-bold py-2 px-4 rounded-full text-sm hover:bg-gray-100 transition-colors">
                  View Profile
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Cart Drawer */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsCartOpen(false)}
          />
          
          {/* Cart Panel */}
          <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl transform transition-transform duration-300">
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <h2 className="text-2xl font-bold text-gray-900">Shopping Cart</h2>
                <button 
                  onClick={() => setIsCartOpen(false)}
                  className="text-gray-500 hover:text-gray-700 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              {/* Cart Items */}
              <div className="flex-1 overflow-y-auto p-6">
                {cartItems.length === 0 ? (
                  <div className="text-center py-12">
                    <ShoppingCart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500 text-lg">Your cart is empty</p>
                    <p className="text-gray-400 text-sm">Start shopping to add items</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {cartItems.map(item => (
                      <div key={item.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                        <img src={item.previewUrl} alt={item.title} className="w-16 h-16 rounded-lg object-cover" />
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-gray-900 truncate">{item.title}</h3>
                          <p className="text-sm text-gray-600">by {item.creator}</p>
                          <p className="font-bold text-blue-600">${item.price.toFixed(2)}</p>
                        </div>
                        <button 
                          onClick={() => removeFromCart(item.id)}
                          className="text-red-500 hover:text-red-700 p-2 hover:bg-red-50 rounded-full transition-colors"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
              {/* Footer */}
              {cartItems.length > 0 && (
                <div className="border-t border-gray-200 p-6">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-lg font-semibold text-gray-900">Total:</span>
                    <span className="text-2xl font-bold text-blue-600">${cartTotal.toFixed(2)}</span>
                  </div>
                  <button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 rounded-xl font-bold text-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl">
                    Proceed to Checkout
                  </button>
                  <p className="text-xs text-gray-500 text-center mt-3">30-day refund policy</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;