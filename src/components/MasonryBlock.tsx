import { useState } from 'react';
import businessPost from '@/assets/business-post.jpg';
import techPost from '@/assets/tech-post.jpg';
import fashionPost from '@/assets/fashion-post.jpg';
import lifestylePost from '@/assets/lifestyle-post.jpg';
import workLifestyle from '@/assets/work-lifestyle.jpg';
import fashionLifestyle from '@/assets/fashion-lifestyle.jpg';

const masonryPosts = [
  {
    title: "The Future of AI: Transforming Industries",
    category: "AI",
    date: "Jan 2024",
    excerpt: "Explore how artificial intelligence is revolutionizing business operations and creating new opportunities.",
    image: techPost,
    height: "tall",
    url: "https://stories.gravitas.uno"
  },
  {
    title: "Building Modern Web Applications",
    category: "WEB DEV",
    date: "Jan 2024",
    excerpt: "Best practices for developing scalable and performant web applications in 2024.",
    image: businessPost,
    height: "medium",
    url: "https://stories.gravitas.uno"
  },
  {
    title: "E-commerce Trends to Watch",
    category: "ECOMMERCE",
    date: "Jan 2024",
    excerpt: "Discover the latest trends shaping the future of online retail and digital commerce.",
    image: fashionPost,
    height: "short",
    url: "https://stories.gravitas.uno"
  },
  {
    title: "Tech Stack Selection Guide",
    category: "TECH",
    date: "Jan 2024",
    excerpt: "How to choose the right technology stack for your next project.",
    image: lifestylePost,
    height: "medium",
    url: "https://stories.gravitas.uno"
  },
  {
    title: "AI-Powered Customer Experience",
    category: "AI",
    date: "Jan 2024",
    excerpt: "Leveraging machine learning to enhance customer engagement and satisfaction.",
    image: workLifestyle,
    height: "medium",
    url: "https://stories.gravitas.uno"
  },
  {
    title: "Headless Commerce Architecture",
    category: "ECOMMERCE",
    date: "Jan 2024",
    excerpt: "Understanding the benefits of decoupled commerce platforms.",
    image: fashionLifestyle,
    height: "short",
    url: "https://stories.gravitas.uno"
  },
  {
    title: "Web Performance Optimization",
    category: "WEB DEV",
    date: "Jan 2024",
    excerpt: "Proven techniques to improve your website's speed and user experience.",
    image: businessPost,
    height: "medium",
    url: "https://stories.gravitas.uno"
  }
];

const MasonryBlock = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const getHeightClass = (height: string) => {
    switch (height) {
      case 'tall':
        return 'row-span-3';
      case 'medium':
        return 'row-span-2';
      case 'short':
        return 'row-span-1';
      default:
        return 'row-span-2';
    }
  };

  // Ensure even number of items
  const displayPosts = masonryPosts.length % 2 === 0 
    ? masonryPosts 
    : masonryPosts.slice(0, -1);

  return (
    <section className="container-blog py-16">
      <h2 id="masonry-heading" className="section-title mb-8">Featured Stories</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 auto-rows-[180px]" style={{ gridAutoFlow: 'row dense' }}>
        {displayPosts.map((post, index) => (
          <article
            key={index}
            className={`group cursor-pointer ${getHeightClass(post.height)} transition-all duration-300 hover:scale-[1.02] hover:shadow-lg`}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            onClick={() => window.open(post.url, '_blank', 'noopener,noreferrer')}
          >
            <div className="relative w-full h-full rounded-lg overflow-hidden bg-card border border-border">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
                loading="lazy"
                decoding="async"
                width="294"
                height={post.height === 'tall' ? '540' : post.height === 'medium' ? '360' : '180'}
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 294px"
                style={{ minHeight: '100%', maxHeight: '100%' }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-medium bg-primary/80 px-2 py-1 rounded-full">
                    {post.category}
                  </span>
                  <span className="text-xs opacity-80">{post.date}</span>
                </div>
                <h3 className="font-bold text-sm md:text-base mb-2 line-clamp-2">
                  {post.title}
                </h3>
                {hoveredIndex === index && post.excerpt && (
                  <p className="text-xs opacity-90 line-clamp-2 transition-opacity duration-300">
                    {post.excerpt}
                  </p>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default MasonryBlock;