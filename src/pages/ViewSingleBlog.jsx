import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, User, Loader2, AlertCircle, Eye } from 'lucide-react';
import axios from 'axios';
import BASE_URL from '../utils/Base_url'
import SEO from '../components/SEO';

const ViewSingleBlog = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

    const SITE_URL = import.meta.env.VITE_SITE_URL || "http://localhost:5173";

  useEffect(() => {
    fetchBlog();
  }, [slug]);

  const fetchBlog = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(`${BASE_URL}/blog/${slug}`, {
        withCredentials: true
      });

      if (response.data.success) {
        setBlog(response.data.blog);
      } else {
        setError('Failed to fetch blog');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Error loading blog');
      console.error('Error fetching blog:', err);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const processContentImages = (content) => {
    if (!content) return content;
    
    // Replace relative image paths with absolute URLs
    return content.replace(
  /src="(\/[^"]+)"/g,
  `src="${blog.image}"`
);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="text-center">
          <div className="relative">
            <div className="w-20 h-20 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto"></div>
            <Eye className="w-8 h-8 text-blue-600 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
          </div>
          <p className="text-gray-600 mt-4 font-medium">Loading blog...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4">
        <div className="bg-white border-2 border-red-200 rounded-2xl p-8 max-w-md shadow-xl">
          <div className="flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mx-auto mb-4">
            <AlertCircle className="w-8 h-8 text-red-600" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 text-center mb-2">Error Loading Blog</h3>
          <p className="text-gray-600 text-center mb-6">{error}</p>
          <button
            onClick={() => navigate(-1)}
            className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 font-medium shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
          >
            <ArrowLeft className="w-5 h-5" />
            Go Back
          </button>
        </div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md text-center">
          <h3 className="text-xl font-bold text-gray-900 mb-2">Blog Not Found</h3>
          <p className="text-gray-600 mb-6">The blog you're looking for doesn't exist.</p>
          <button
            onClick={() => navigate(-1)}
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 font-medium"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }
  const seoTitle = blog.title ? `${blog.title} | Celestaraa Blogs` : 'Celestaraa Blog';
  const seoDescription = blog.content
    ? blog.content.replace(/<[^>]+>/g, '').slice(0, 160) + '...'
    : 'Read this amazing blog post from Celestaraa.';
  const seoImage = blog.image;
  const seoUrl = `${SITE_URL}/blog/${blog.slug}`;
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8 px-4">
       {/* ✅ SEO Meta Tags */}
         <SEO title={seoTitle} description={seoDescription} image={seoImage} url={seoUrl} />

      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-600 hover:text-primary mb-6 transition-colors duration-200 group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-200" />
          <span className="font-medium">Back to Blogs</span>
        </button>

        {/* Blog Card */}
        <article className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
          {/* Featured Image */}
          <div className="relative h-96 overflow-hidden">
            <img
              src={blog.image}
              alt={blog.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          </div>

          {/* Content */}
          <div className="p-8 md:p-12">
            {/* Title */}
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              {blog.title}
            </h1>

            {/* Meta Information */}
            <div className="flex flex-wrap items-center gap-6 mb-8 pb-8 border-b border-gray-200">
              <div className="flex items-center gap-2 text-gray-600">
                <Calendar className="w-5 h-5 text-primary" />
                <span className="text-sm font-medium">{formatDate(blog.createdAt)}</span>
              </div>
              {/* <div className="flex items-center gap-2 text-gray-600">
                <User className="w-5 h-5 text-purple-600" />
                <span className="text-sm font-medium">Admin</span>
              </div> */}
            </div>

            {/* Blog Content */}
            <div 
              className="prose prose-lg max-w-none
                prose-headings:text-gray-900 prose-headings:font-bold
                prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-4
                prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline
                prose-strong:text-gray-900 prose-strong:font-semibold
                prose-ul:list-disc prose-ul:pl-6 prose-ul:mb-4
                prose-ol:list-decimal prose-ol:pl-6 prose-ol:mb-4
                prose-li:text-gray-700 prose-li:mb-2
                prose-blockquote:border-l-4 prose-blockquote:border-blue-600 
                prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:text-gray-600
                prose-code:bg-gray-100 prose-code:px-2 prose-code:py-1 prose-code:rounded
                prose-code:text-sm prose-code:text-gray-800
                prose-pre:bg-gray-900 prose-pre:text-gray-100 prose-pre:p-4 prose-pre:rounded-lg
                prose-img:rounded-xl prose-img:shadow-lg prose-img:m-8"
              dangerouslySetInnerHTML={{ __html: processContentImages(blog.content) }}
            />
          </div>

          {/* Footer */}
          <div className="px-8 md:px-12 pb-8">
            <div className="bg-gradient-to-r from-primary1/40 to-primary1 rounded-xl p-6 border border-blue-100">
              <p className="text-sm text-gray-600 text-center">
                Published on {formatDate(blog.createdAt)}
              </p>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
};

export default ViewSingleBlog;