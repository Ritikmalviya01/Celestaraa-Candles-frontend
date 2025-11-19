import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import BASE_URL from '../../../utils/Base_url';
import SEO from '../../../components/SEO.jsx'; // Adjust path based on your structure
import { BreadcrumbSchema, WebsiteSchema } from '../../../components/StructuredData.jsx'; // Adjust path

export default function CandleBlog() {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [hoveredCard, setHoveredCard] = useState(null);
  const blogsPerPage = 6;

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(`${BASE_URL}/blog/blogs`, {
        withCredentials: true
      });

      if (response.data.success) {
        setBlogs(response.data.blogs);
      } else {
        setError('Failed to fetch blogs');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Error loading blogs');
      console.error('Error fetching blogs:', err);
    } finally {
      setLoading(false);
    }
  };

  const stripHtml = (html) => {
    const tmp = document.createElement('DIV');
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || '';
  };

  const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  const handleBlogClick = (blogId) => {
    navigate(`/blog/${blogId}`);
  };

  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = blogs.slice(indexOfFirstBlog, indexOfLastBlog);
  const totalPages = Math.ceil(blogs.length / blogsPerPage);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) {
    return (
      <div className="bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="relative w-24 h-24 mx-auto mb-6">
            <div className="absolute inset-0 border-4 border-blue-200 rounded-full animate-ping opacity-75"></div>
            <div className="relative w-24 h-24 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
          <p className="text-gray-700 font-semibold text-lg animate-pulse">Loading amazing content...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md text-center transform hover:scale-105 transition-transform duration-300">
          <div className="w-20 h-20 bg-gradient-to-br from-red-100 to-red-200 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
            <svg className="w-10 h-10 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-3">Oops! Something went wrong</h3>
          <p className="text-gray-600 mb-8">{error}</p>
          <button
            onClick={fetchBlogs}
            className="px-8 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-full hover:from-blue-600 hover:to-blue-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  const featuredPost = blogs[0];
    const pageUrl = typeof window !== 'undefined' ? window.location.href : 'https://celestaraa.com/blog';


  return (
    <>
    <SEO
        title="Candle Blog - Tips, Care Guides & Scent Stories"
        description="Explore our candle blog for expert tips on candle care, scent pairing guides, DIY tutorials, and inspiring stories about handcrafted candles. Learn how to make your candles last longer and create the perfect ambiance."
        keywords="candle blog, candle care tips, scented candle guide, candle burning tips, handmade candles, soy candles, candle scents, home fragrance, candle making, aromatherapy candles"
        url={pageUrl}
        type="website"
        image={blogs.length > 0 ? `${BASE_URL}${blogs[0].image}` : 'https://celestaraa.com/default-blog-image.jpg'}
      />

      {/* Structured Data - Breadcrumbs */}
      <BreadcrumbSchema 
        items={[
          { name: "Home", url: "https://celestaraa.com" },
          { name: "Blog", url: pageUrl }
        ]}
      />

      {/* Structured Data - Website Search */}
      <WebsiteSchema 
        name="Your Candle Shop Blog"
        url={pageUrl}
        description="Discover candle care tips, DIY guides, and stories about handcrafted candles"
      />

    <div className="bg-gradient-to-br from-gray-50 via-white to-gray-50 min-h-screen">
      {featuredPost && (
        <div className="max-w-7xl mx-auto px-4 py-12">
          {/* Featured Post with Enhanced Styling */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center mb-16">
            <div 
              className="relative overflow-hidden rounded-3xl shadow-2xl group cursor-pointer transform hover:scale-[1.02] transition-all duration-500"
              onClick={() => handleBlogClick(featuredPost.slug)}
            >
              <img
                src={`${BASE_URL}${featuredPost.image}`}
                alt={featuredPost.title}
                className="w-full h-96 object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute top-4 left-4 font-heading bg-primary text-white px-4 py-2 rounded-full text-md font-bold uppercase tracking-wider shadow-lg">
                Featured
              </div>
              <div className="absolute bottom-6 right-6 w-12 h-12 bg-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transform translate-x-4 group-hover:translate-x-0 transition-all duration-500 shadow-xl">
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="h-1 w-12 bg-gradient-to-r from-primary1 to-primary rounded-full"></div>
                <p className="text-xs font-bold text-primary tracking-widest uppercase">
                  Must Read
                </p>
              </div>
              <h1 
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight font-heading cursor-pointer hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-primary/60 hover:to-primary transition-all duration-300"
                onClick={() => handleBlogClick(featuredPost.slug)}
              >
                {featuredPost.title}
              </h1>
              <p className="text-primary leading-relaxed text-base md:text-lg">
                {truncateText(stripHtml(featuredPost.content), 200)}
              </p>
              <button
                onClick={() => handleBlogClick(featuredPost.slug)}
                className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-primary/60 to-primary/90 text-white font-bold tracking-wider uppercase rounded-full hover:from-primary/70 hover:to-primary transform hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl"
              >
                Read Full Story
                <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
            </div>
          </div>

          {/* Animated Divider */}
          <div className="relative h-1 bg-gradient-to-r from-transparent via-primary to-transparent mb-16 rounded-full overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/60 to-primary animate-pulse"></div>
          </div>

          {/* Blog Grid with Enhanced Cards */}
          {currentBlogs.length > 0 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {currentBlogs.slice(1).map((post, index) => (
                  <div 
                    key={post.slug} 
                    className="group cursor-pointer transform hover:-translate-y-2 transition-all duration-500"
                    onClick={() => handleBlogClick(post.slug)}
                    onMouseEnter={() => setHoveredCard(post.slug)}
                    onMouseLeave={() => setHoveredCard(null)}
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500">
                      <div className="relative overflow-hidden">
                        <img
                          src={`${BASE_URL}${post.image}`}
                          alt={post.title}
                          className="w-full aspect-square object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <div className={`absolute top-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg transform transition-all duration-500 ${hoveredCard === post.slug ? 'scale-100 rotate-0' : 'scale-0 rotate-180'}`}>
                          <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                        </div>
                      </div>
                      <div className="p-6 space-y-4">
                        <div className="flex items-center gap-2">
                          <div className="h-0.5 w-8 bg-primary rounded-full"></div>
                          <p className="text-xs font-bold text-primary tracking-wider uppercase">
                            Article
                          </p>
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 leading-tight font-heading group-hover:text-primary transition-colors duration-300 line-clamp-2">
                          {post.title}
                        </h3>
                        <p className="text-sm text-gray-600 leading-relaxed line-clamp-3">
                          {truncateText(stripHtml(post.content), 100)}
                        </p>
                        <div className="pt-2 flex items-center gap-2 text-primary font-semibold group-hover:gap-4 transition-all duration-300">
                          <span className="text-sm">Continue Reading</span>
                          <svg className="w-4 h-4 transform group-hover:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Enhanced Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-3 mt-20">
                  <button
                    onClick={() => paginate(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className="w-12 h-12 rounded-full bg-white border-2 border-gray-200 text-gray-700 flex items-center justify-center hover:border-blue-500 hover:text-blue-500 hover:shadow-lg disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:border-gray-200 disabled:hover:text-gray-700 transition-all duration-300 transform hover:scale-110"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  
                  <div className="flex items-center gap-2">
                    {[...Array(totalPages)].map((_, index) => {
                      const pageNumber = index + 1;
                      if (
                        pageNumber === 1 ||
                        pageNumber === totalPages ||
                        (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1)
                      ) {
                        return (
                          <button
                            key={pageNumber}
                            onClick={() => paginate(pageNumber)}
                            className={`w-12 h-12 rounded-full flex items-center justify-center font-bold transition-all duration-300 transform hover:scale-110 ${
                              currentPage === pageNumber
                                ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-xl scale-110'
                                : 'bg-white border-2 border-gray-200 text-gray-700 hover:border-blue-500 hover:text-blue-500 hover:shadow-lg'
                            }`}
                          >
                            {pageNumber}
                          </button>
                        );
                      } else if (
                        pageNumber === currentPage - 2 ||
                        pageNumber === currentPage + 2
                      ) {
                        return (
                          <span key={pageNumber} className="text-gray-400 font-bold px-2">
                            •••
                          </span>
                        );
                      }
                      return null;
                    })}
                  </div>

                  <button
                    onClick={() => paginate(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                    className="w-12 h-12 rounded-full bg-white border-2 border-gray-200 text-gray-700 flex items-center justify-center hover:border-blue-500 hover:text-blue-500 hover:shadow-lg disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:border-gray-200 disabled:hover:text-gray-700 transition-all duration-300 transform hover:scale-110"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-20">
              <div className="w-32 h-32 bg-gradient-to-br from-blue-50 to-blue-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
                <svg className="w-16 h-16 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">No More Blogs</h3>
              <p className="text-gray-600">You've reached the end of our collection</p>
            </div>
          )}
        </div>
      )}

      {!featuredPost && (
        <div className="max-w-7xl mx-auto px-4 py-32">
          <div className="text-center">
            <div className="w-40 h-40 bg-gradient-to-br from-blue-50 to-blue-100 rounded-full flex items-center justify-center mx-auto mb-8 animate-bounce">
              <svg className="w-20 h-20 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
              </svg>
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-4">No Blogs Available</h3>
            <p className="text-lg text-gray-600">Check back soon for exciting new content!</p>
          </div>
        </div>
      )}
    </div>
    </>
  );
}