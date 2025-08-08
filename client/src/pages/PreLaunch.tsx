import React from 'react';

interface Review {
  id: number;
  userName: string;
  userAvatar: string;
  rating: number;
  comment: string;
  date: string;
}

interface Comment {
  id: number;
  userName: string;
  userAvatar: string;
  comment: string;
  date: string;
  isCreator: boolean;
}

interface Theme {
  id: number;
  name: string;
  previewUrl: string;
  isUnlocked: boolean;
}

interface RelatedTool {
  id: number;
  title: string;
  creator: string;
  price: number;
  previewUrl: string;
}

const PreLaunch: React.FC = () => {
  // Mock data
  const toolTitle = "Interactive Math Game: Algebra Adventures";
  
  const reviews: Review[] = [
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
  ];

  const comments: Comment[] = [
    {
      id: 1,
      userName: "TeacherChris",
      userAvatar: "https://via.placeholder.com/40x40/8B5CF6/FFFFFF?text=TC",
      comment: "Does this include printable worksheets for offline use?",
      date: "2 days ago",
      isCreator: false
    },
    {
      id: 2,
      userName: "Jane Smith",
      userAvatar: "https://via.placeholder.com/40x40/4F46E5/FFFFFF?text=JS",
      comment: "Yes, all 50 levels come with printable worksheets and answer keys!",
      date: "1 day ago",
      isCreator: true
    }
  ];

  const themes: Theme[] = [
    { id: 1, name: "Space Adventure", previewUrl: "https://via.placeholder.com/100x70/3B82F6/FFFFFF?text=Space", isUnlocked: true },
    { id: 2, name: "Underwater Quest", previewUrl: "https://via.placeholder.com/100x70/10B981/FFFFFF?text=Ocean", isUnlocked: false },
    { id: 3, name: "Medieval Castle", previewUrl: "://via.placeholder.com/100x70/F59E0B/FFFFFF?text=Castle", isUnlocked: true },
    { id: 4, name: "Dinosaur World", previewUrl: "https://via.placeholder.com/100x70/EF4444/FFFFFF?text=Dino", isUnlocked: false }
  ];

  const relatedTools: RelatedTool[] = [
    { id: 1, title: "Geometry Puzzle Pack", creator: "MathMaster", price: 8.99, previewUrl: "https://via.placeholder.com/150x100/EC4899/FFFFFF?text=Geometry" },
    { id: 2, title: "Fraction Frenzy", creator: "NumberNinja", price: 9.99, previewUrl: "https://via.placeholder.com/150x100/3B82F6/FFFFFF?text=Fractions" },
    { id: 3, title: "Science Lab Safety Guide", creator: "ScienceSavvy", price: 4.99, previewUrl: "https://via.placeholder.com/150x100/10B981/FFFFFF?text=Science" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 md:p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{toolTitle}</h1>
              <p className="text-gray-600 mt-1">Ready to launch your interactive learning experience</p>
            </div>
            <button className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white px-6 py-3 rounded-xl font-bold hover:from-blue-700 hover:to-indigo-800 transition-all shadow-md">
              Launch Now
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Launch Interface Preview */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-4">
                <h2 className="text-xl font-bold text-white">Preview Interface</h2>
              </div>
              <div className="p-6">
                <div className="bg-gray-100 rounded-xl h-64 flex items-center justify-center">
                  <div className="text-center">
                    <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16 mx-auto mb-4" />
                    <p className="text-gray-500 font-medium">Interactive Tool Preview</p>
                    <p className="text-gray-400 text-sm mt-1">This is how your tool will appear when launched</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Toggles */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Customization Options</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-blue-50 rounded-xl">
                  <div>
                    <h3 className="font-semibold text-gray-900">Class List Integration</h3>
                    <p className="text-sm text-gray-600">Import your class roster for personalized tracking</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-5 peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
                
                <div className="flex items-center justify-between p-4 bg-blue-50 rounded-xl">
                  <div>
                    <h3 className="font-semibold text-gray-900">Question of the Day (QOTD)</h3>
                    <p className="text-sm text-gray-600">Daily challenges to engage students</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-5 peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
                
                <div className="flex items-center justify-between p-4 bg-blue-50 rounded-xl">
                  <div>
                    <h3 className="font-semibold text-gray-900">Progress Tracking</h3>
                    <p className="text-sm text-gray-600">Monitor student performance and achievements</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-5 peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              </div>
            </div>

            {/* Ratings + Reviews */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Ratings & Reviews</h2>
              <div className="space-y-6">
                {reviews.map(review => (
                  <div key={review.id} className="border-b border-gray-200 pb-6 last:border-b-0 last:pb-0">
                    <div className="flex items-center mb-3">
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
              <button className="mt-4 text-blue-600 font-medium hover:text-blue-800">
                See all 24 reviews
              </button>
            </div>

            {/* Comments/Q&A */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Questions & Answers</h2>
              <div className="space-y-6">
                {comments.map(comment => (
                  <div key={comment.id} className={`p-4 rounded-xl ${comment.isCreator ? 'bg-purple-50 border-l-4 border-purple-500' : 'bg-gray-50'}`}>
                    <div className="flex items-center mb-2">
                      <img
                        src={comment.userAvatar}
                        alt={comment.userName}
                        className="w-10 h-10 rounded-full mr-3"
                      />
                      <div>
                        <p className="font-semibold text-gray-900">{comment.userName} {comment.isCreator && <span className="text-purple-600 text-sm">(Creator)</span>}</p>
                        <p className="text-sm text-gray-500">{comment.date}</p>
                      </div>
                    </div>
                    <p className="text-gray-700">{comment.comment}</p>
                  </div>
                ))}
              </div>
              <div className="mt-6">
                <textarea
                  className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Ask a question or share your thoughts..."
                  rows={3}
                ></textarea>
                <div className="flex justify-end mt-3">
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                    Post Comment
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Unlockable Themes */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Unlockable Themes</h2>
              <div className="grid grid-cols-2 gap-4">
                {themes.map(theme => (
                  <div
                    key={theme.id}
                    className={`rounded-xl overflow-hidden border-2 ${theme.isUnlocked ? 'border-blue-500' : 'border-gray-200 opacity-50'}`}
                  >
                    <img
                      src={theme.previewUrl}
                      alt={theme.name}
                      className="w-full h-24 object-cover"
                    />
                    <div className="p-2">
                      <p className="font-medium text-sm truncate">{theme.name}</p>
                      <p className="text-xs text-gray-500">
                        {theme.isUnlocked ? 'Unlocked' : 'Locked'}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <button className="mt-4 w-full text-center text-blue-600 font-medium hover:text-blue-800 py-2">
                Browse All Themes
              </button>
            </div>

            {/* Related Tools */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Related Tools</h2>
              <div className="space-y-4">
                {relatedTools.map(tool => (
                  <div key={tool.id} className="flex items-center p-3 hover:bg-gray-50 rounded-xl cursor-pointer">
                    <img
                      src={tool.previewUrl}
                      alt={tool.title}
                      className="w-16 h-12 object-cover rounded-lg mr-3"
                    />
                    <div>
                      <p className="font-medium text-gray-900">{tool.title}</p>
                      <p className="text-sm text-gray-600">{tool.creator} • ${tool.price.toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Creator Info */}
            <div className="bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl shadow-lg text-white p-6">
              <div className="flex items-center mb-4">
                <img
                  src="https://via.placeholder.com/60x60/FFFFFF/8B5CF6?text=JS"
                  alt="Jane Smith"
                  className="w-15 h-15 rounded-full mr-4 border-2 border-white"
                />
                <div>
                  <h3 className="font-bold text-lg">Jane Smith</h3>
                  <p className="text-sm opacity-90">Math Specialist</p>
                </div>
              </div>
              <p className="text-sm mb-4">Creator of engaging math resources for middle school students.</p>
              <div className="flex justify-between text-sm">
                <div>
                  <p className="font-bold">124</p>
                  <p>Creations</p>
                </div>
                <div>
                  <p className="font-bold">1.2K</p>
                  <p>Followers</p>
                </div>
                <div>
                  <p className="font-bold">4.9</p>
                  <p>Rating</p>
                </div>
              </div>
              <button className="mt-4 w-full bg-white text-purple-600 font-bold py-2 px-4 rounded-lg hover:bg-gray-100">
                View Profile
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreLaunch;