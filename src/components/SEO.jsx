import React from "react";
import { Helmet } from "react-helmet-async";
import logo from "../assets/candle-logo.png"

const SEO = ({ 
  title, 
  description, 
  image, 
  url, 
  type = "website",
  keywords = "",
  author = "Celestaraa Candles",
  publishedTime,
  modifiedTime,
  article = false,
  product = false,
  noindex = false
}) => {
  // Site defaults
  const siteName = "Celestaraa Candles"; // CHANGE THIS
  const siteUrl = "https://celestaraa.com"; // Your domain

const defaultImage = `${siteUrl}${logo}`; // CHANGE THIS
  // const twitterHandle = "@yourhandle"; // CHANGE THIS (optional)
  
  const fullTitle = title ? `${title} | ${siteName}` : siteName;
  const ogImage = image || defaultImage;
  const fullUrl = url || window.location.href;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <meta name="author" content={author} />
      
      {/* Robots */}
      {noindex ? (
        <meta name="robots" content="noindex, nofollow" />
      ) : (
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      )}

      {/* Canonical URL */}
      <link rel="canonical" href={fullUrl} />

      {/* Open Graph Meta Tags */}
      <meta property="og:site_name" content={siteName} />
      <meta property="og:title" content={title || siteName} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:secure_url" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:type" content={article ? "article" : product ? "product" : type} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:locale" content="en_US" />

      {/* Article specific */}
      {article && publishedTime && (
        <meta property="article:published_time" content={publishedTime} />
      )}
      {article && modifiedTime && (
        <meta property="article:modified_time" content={modifiedTime} />
      )}

      {/* Twitter Card Meta Tags
      <meta name="twitter:card" content={image ? "summary_large_image" : "summary"} />
      <meta name="twitter:title" content={title || siteName} />
      <meta name="twitter:description" content={description} />
      {image && <meta name="twitter:image" content={ogImage} />}
      {twitterHandle && <meta name="twitter:site" content={twitterHandle} />}
      {twitterHandle && <meta name="twitter:creator" content={twitterHandle} />} */}

      {/* Additional SEO */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
      <meta name="language" content="English" />
      
      {/* Favicon (add to your public folder) */}
      <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
    </Helmet>
  );
};

export default SEO;