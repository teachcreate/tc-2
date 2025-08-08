import React from 'react';

interface CreationDescriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Review {
  id: number;
  userName: string;
  userAvatar: string;
  rating: number;
  comment: string;
  date: string;
}

interface Creator {
  id: number;
  name: string;
  avatar: string;
  bio: string;
  followers: number;
  isFollowing: boolean;
}

interface Creation {
  id: number;
  title: string;
  description: string;
  price: number;
  previewUrl: string;
  isPurchased: boolean;
  isFavorite: boolean;
  tags: string[];
  reviews: Review[];
  creator: Creator;
  relatedCreations: Creation[];
  creatorCreations: Creation[];
}

const CreationDescriptionModal: React.FC<CreationDescriptionModalProps> = ({ isOpen, onClose }) => {
  // Mock data for the creation
  const mockCreation: Creation = {
    id: 1,
    title: "Interactive Math Game: Algebra Adventures",
    description: "Engage your students with this interactive math game that makes learning algebra fun and accessible. Features 50+ levels, progress tracking, and printable worksheets. Perfect for middle school students.",
    price: 12.99,
    previewUrl: "https://via.placeholder.com/600x400/4F46E5/FFFFFF?text=Math+Game+Preview",
    isPurchased: false,
    isFavorite: false,
    tags: ["Math", "Algebra", "Game", "Middle School"],
    creator: {
      id: 1,
      name: "Jane Smith",
      avatar: "https://via.placeholder.com/100x100/8B5CF6/FFFFFF?text=JS",
      bio: "Middle school math teacher with 10+ years of experience creating engaging educational content.",
      followers: 1242,
      isFollowing: false
    },
    reviews: [
      {
        id: 1,
        userName: "TeacherMike",
        userAvatar: "https://via.placeholder.com/40x40/10B981/FFFFFF?text=TM",
        rating: 5,
        comment: "This game transformed my algebra class! Students are actually excited to practice equations now.",
        date: "2023-10-15"
      },
      {
        id: 2,
        userName: "EducatorLisa",
        userAvatar: "https://via.placeholder.com/40x40/F59E0B/FFFFFF?text=EL",
        rating: 4,
        comment: "Great resource with solid concepts. Had to adapt a few levels for my lower-level students.",
        date: "2023-09-22"
      }
    ],
    relatedCreations: [
      {
        id: 2,
        title: "Geometry Puzzle Pack",
        description: "Fun puzzles to reinforce geometry concepts",
        price: 8.99,
        previewUrl: "https://via.placeholder.com/200x150/EC4899/FFFFFF?text=Geometry",
        isPurchased: true,
        isFavorite: true,
        tags: ["Math", "Geometry", "Puzzle"],
        creator: { id: 2, name: "MathMaster", avatar: "", bio: "", followers: 0, isFollowing: false },
        reviews: [],
        relatedCreations: [],
        creatorCreations: []
      },
      {
        id: 3,
        title: "Fraction Frenzy",
        description: "Master fractions with this interactive game",
        price: 9.99,
        previewUrl: "https://via.placeholder.com/200x150/3B82F6/FFFFFF?text=Fractions",
        isPurchased: false,
        isFavorite: false,
        tags: ["Math", "Fractions", "Game"],
        creator: { id: 3, name: "NumberNinja", avatar: "", bio: "", followers: 0, isFollowing: false },
        reviews: [],
        relatedCreations: [],
        creatorCreations: []
      }
    ],
    creatorCreations: [
      {
        id: 4,
        title: "Science Lab Safety Guide",
        description: "Essential safety rules for science classrooms",
        price: 4.99,
        previewUrl: "https://via.placeholder.com/200x150/10B981/FFFFFF?text=Science",
        isPurchased: false,
        isFavorite: true,
        tags: ["Science", "Safety", "Guide"],
        creator: { id: 1, name: "Jane Smith", avatar: "", bio: "", followers: 0, isFollowing: false },
        reviews: [],
        relatedCreations: [],
        creatorCreations: []
      }
    ]
  };

  if (!isOpen) {
    return null;
  }

  const toggleFavorite = () => {
    // In a real app, this would update the backend
    console.log("Toggled favorite");
  };

  const toggleFollow = () => {
    // In a real app, this would update the backend
    console.log("Toggled follow");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 p-4" onClick={onClose}>
      <div
        className="bg-white w-full max-w-6xl mx-auto rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button for mobile */}
        <button
          className="md:hidden absolute top-4 right-4 z-10 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Main Area (Left) */}
        <div className="w-full md:w-2/3 overflow-y-auto p-6">
          {/* Sticky header for mobile */}
          <div className="md:hidden mb-4 pb-4 border-b">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">{mockCreation.title}</h2>
                <p className="text-sm text-gray-600 mt-1">by {mockCreation.creator.name}</p>
              </div>
              <button
                onClick={toggleFavorite}
                className="text-2xl"
              >
                {mockCreation.isFavorite ? '❤️' : '🤍'}
              </button>
            </div>
            <p className="text-xl font-bold text-blue-600 mt-2">${mockCreation.price.toFixed(2)}</p>
          </div>

          {/* Preview image or short demo */}
          <div className="mb-6 rounded-xl overflow-hidden shadow-lg">
            <img
              src={mockCreation.previewUrl}
              alt={mockCreation.title}
              className="w-full h-64 md:h-80 object-cover"
            />
          </div>

          {/* Desktop header */}
          <div className="hidden md:block mb-6">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-3xl font-bold text-gray-900">{mockCreation.title}</h2>
                <p className="text-gray-600 mt-1">by {mockCreation.creator.name}</p>
              </div>
              <button
                onClick={toggleFavorite}
                className="text-3xl"
              >
                {mockCreation.isFavorite ? '❤️' : '🤍'}
              </button>
            </div>
            <p className="text-2xl font-bold text-blue-600 mt-2">${mockCreation.price.toFixed(2)}</p>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            {mockCreation.tags.map(tag => (
              <span key={tag} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                {tag}
              </span>
            ))}
          </div>

          {/* "Buy Now" and "Add to Cart" buttons */}
          <div className="flex flex-col sm:flex-row gap-3 mb-8">
            <button className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white px-6 py-3 rounded-xl font-bold hover:from-blue-700 hover:to-indigo-800 transition-all shadow-md flex-1">
              Buy Now
            </button>
            <button className="bg-gray-100 text-gray-800 px-6 py-3 rounded-xl font-bold hover:bg-gray-200 transition-all shadow-sm flex-1">
              Add to Cart
            </button>
          </div>

          {/* Full description */}
          <div className="mb-8">
            <h3 className="text-xl font-bold text-gray-900 mb-3">Description</h3>
            <p className="text-gray-700 leading-relaxed">{mockCreation.description}</p>
          </div>

          {/* ⭐ Reviews section (only visible to users who have purchased the tool) */}
          {mockCreation.isPurchased && (
            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Reviews</h3>
              <div className="space-y-4">
                {mockCreation.reviews.map(review => (
                  <div key={review.id} className="border-b border-gray-200 pb-4 last:border-b-0">
                    <div className="flex items-center mb-2">
                      <img
                        src={review.userAvatar}
                        alt={review.userName}
                        className="w-10 h-10 rounded-full mr-3"
                      />
                      <div>
                        <p className="font-semibold text-gray-900">{review.userName}</p>
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <svg
                              key={i}
                              className={`w-4 h-4 ${i < review.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                              fill="currentColor"
                              viewBox="0 0 20 20"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                      </div>
                      <span className="text-sm text-gray-500 ml-auto">{review.date}</span>
                    </div>
                    <p className="text-gray-700">{review.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Public comments and Q&A (if enabled by creator) */}
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Questions & Answers</h3>
            <div className="bg-gray-50 rounded-xl p-4 mb-4">
              <div className="flex items-center mb-3">
                <img
                  src="https://via.placeholder.com/40x40/8B5CF6/FFFFFF?text=TC"
                  alt="User"
                  className="w-10 h-10 rounded-full mr-3"
                />
                <div>
                  <p className="font-semibold">TeacherChris</p>
                  <p className="text-sm text-gray-500">2 days ago</p>
                </div>
              </div>
              <p className="text-gray-700">Does this include printable worksheets for offline use?</p>
              
              <div className="mt-4 pl-4 border-l-2 border-blue-200">
                <div className="flex items-center mb-2">
                  <img
                    src={mockCreation.creator.avatar}
                    alt={mockCreation.creator.name}
                    className="w-8 h-8 rounded-full mr-2"
                  />
                  <p className="font-semibold text-sm">{mockCreation.creator.name} <span className="text-gray-500 font-normal">(Creator)</span></p>
                </div>
                <p className="text-gray-700 text-sm">Yes, all 50 levels come with printable worksheets and answer keys!</p>
              </div>
            </div>
            
            <button className="text-blue-600 font-medium hover:text-blue-800">
              View all 12 questions
            </button>
          </div>
        </div>
        
        {/* Sidebar (Right) */}
        <div className="w-full md:w-1/3 bg-gray-50 p-6 border-l border-gray-200 overflow-y-auto">
          {/* Quick creator profile */}
          <div className="bg-white rounded-xl shadow-sm p-5 mb-6">
            <div className="flex items-center mb-4">
              <img
                src={mockCreation.creator.avatar}
                alt={mockCreation.creator.name}
                className="w-16 h-16 rounded-full mr-4"
              />
              <div>
                <h4 className="font-bold text-gray-900">{mockCreation.creator.name}</h4>
                <p className="text-sm text-gray-600">{mockCreation.creator.followers} followers</p>
              </div>
              <button
                onClick={toggleFollow}
                className={`ml-auto px-4 py-2 rounded-full text-sm font-medium ${
                  mockCreation.creator.isFollowing
                    ? 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                    : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                }`}
              >
                {mockCreation.creator.isFollowing ? 'Following' : 'Follow'}
              </button>
            </div>
            <p className="text-gray-700 text-sm">{mockCreation.creator.bio}</p>
          </div>

          {/* Carousels: "More Like This" + "More from This Creator" */}
          <div className="mb-6">
            <h4 className="font-bold text-gray-900 mb-3">More Like This</h4>
            <div className="grid grid-cols-2 gap-3">
              {mockCreation.relatedCreations.map(creation => (
                <div key={creation.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
                  <img
                    src={creation.previewUrl}
                    alt={creation.title}
                    className="w-full h-24 object-cover"
                  />
                  <div className="p-2">
                    <p className="font-medium text-sm truncate">{creation.title}</p>
                    <p className="text-xs text-gray-600">${creation.price.toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <h4 className="font-bold text-gray-900 mb-3">More from {mockCreation.creator.name}</h4>
            <div className="grid grid-cols-2 gap-3">
              {mockCreation.creatorCreations.map(creation => (
                <div key={creation.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
                  <img
                    src={creation.previewUrl}
                    alt={creation.title}
                    className="w-full h-24 object-cover"
                  />
                  <div className="p-2">
                    <p className="font-medium text-sm truncate">{creation.title}</p>
                    <p className="text-xs text-gray-600">${creation.price.toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* "See Other Themes" panel */}
          <div className="bg-gradient-to-br from-purple-50 to-indigo-100 rounded-xl p-5">
            <h4 className="font-bold text-gray-900 mb-2">Related Themes</h4>
            <p className="text-sm text-gray-700 mb-3">Explore other themes in our collection</p>
            <div className="flex gap-2">
              <span className="px-3 py-1 bg-white bg-opacity-70 rounded-full text-xs">Science</span>
              <span className="px-3 py-1 bg-white bg-opacity-70 rounded-full text-xs">History</span>
              <span className="px-3 py-1 bg-white bg-opacity-70 rounded-full text-xs">Art</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreationDescriptionModal;