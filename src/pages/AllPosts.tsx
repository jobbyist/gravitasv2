import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BlogCard from '@/components/BlogCard';
import PageFilter, { Post } from '@/components/PageFilter';
import { useState } from 'react';
import businessPost from '@/assets/business-post.jpg';
import fashionPost from '@/assets/fashion-post.jpg';
import techPost from '@/assets/tech-post.jpg';
import lifestylePost from '@/assets/lifestyle-post.jpg';
import fashionLifestyle from '@/assets/fashion-lifestyle.jpg';
import workLifestyle from '@/assets/work-lifestyle.jpg';

const AllPosts = () => {
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);

  // Articles from Featured Stories section on homepage
  const blogPosts: Post[] = [
    {
      title: "The Future of AI: Transforming Industries",
      category: "AI",
      subcategory: "Artificial Intelligence", 
      date: "Oct 15, 2025",
      excerpt: "Explore how artificial intelligence is revolutionizing business operations and creating new opportunities.",
      image: techPost,
      slug: "future-of-ai",
      tags: ["AI", "Innovation", "Business Transformation"]
    },
    {
      title: "Building Modern Web Applications",
      category: "WEB DEV", 
      subcategory: "Web Development",
      date: "Nov 3, 2025",
      excerpt: "Best practices for developing scalable and performant web applications in 2024.",
      image: businessPost,
      slug: "modern-web-apps",
      tags: ["Web Development", "Best Practices", "Performance"]
    },
    {
      title: "E-commerce Trends to Watch",
      category: "ECOMMERCE",
      subcategory: "Digital Commerce",
      date: "Dec 8, 2025", 
      excerpt: "Discover the latest trends shaping the future of online retail and digital commerce.",
      image: fashionPost,
      slug: "ecommerce-trends",
      tags: ["E-commerce", "Trends", "Retail"]
    },
    {
      title: "Tech Stack Selection Guide",
      category: "TECH",
      subcategory: "Technology",
      date: "Oct 28, 2025",
      excerpt: "How to choose the right technology stack for your next project.",
      image: lifestylePost,
      slug: "tech-stack-guide",
      tags: ["Technology", "Development", "Stack Selection"]
    },
    {
      title: "AI-Powered Customer Experience",
      category: "AI",
      subcategory: "Customer Experience",
      date: "Jan 12, 2026",
      excerpt: "Leveraging machine learning to enhance customer engagement and satisfaction.",
      image: workLifestyle,
      slug: "ai-customer-experience",
      tags: ["AI", "Customer Experience", "Machine Learning"]
    },
    {
      title: "Headless Commerce Architecture",
      category: "ECOMMERCE",
      subcategory: "Commerce Architecture",
      date: "Nov 22, 2025",
      excerpt: "Understanding the benefits of decoupled commerce platforms.",
      image: fashionLifestyle,
      slug: "headless-commerce",
      tags: ["Commerce", "Architecture", "Headless"]
    },
    {
      title: "Web Performance Optimization",
      category: "WEB DEV",
      subcategory: "Performance",
      date: "Jan 5, 2026",
      excerpt: "Proven techniques to improve your website's speed and user experience.",
      image: businessPost,
      slug: "web-performance",
      tags: ["Performance", "Optimization", "Web Development"]
    },
    {
      title: "What's New at Gravitas in February 2026",
      category: "UPDATES",
      subcategory: "Platform Updates",
      date: "Feb 28, 2026",
      excerpt: "Discover the latest platform updates including Gravitas Auctions, White Label Partner Program, Commerce, and upcoming features.",
      image: techPost,
      slug: "gravitas-february-2026-updates",
      tags: ["Updates", "Platform", "New Features"]
    }
  ];

  const postsToShow = filteredPosts.length > 0 ? filteredPosts : blogPosts;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main id="main-content" className="container-blog py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            All Posts
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover our complete collection of articles covering fashion, technology, business, and lifestyle topics.
          </p>
        </div>

        <PageFilter
          posts={blogPosts}
          onFilteredPostsChange={setFilteredPosts}
          availableCategories={["AI", "WEB DEV", "ECOMMERCE", "TECH", "UPDATES"]}
          showCategoryFilter={true}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {postsToShow.map((post, index) => (
            <BlogCard
              key={post.slug}
              title={post.title}
              category={post.category}
              date={post.date}
              excerpt={post.excerpt}
              image={post.image}
              href={`/blog/${post.slug}`}
              isSmall={false}
            />
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AllPosts;