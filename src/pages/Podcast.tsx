import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AudioPlayer from '@/components/AudioPlayer';
import PageFilter, { Post } from '@/components/PageFilter';
import { useState } from 'react';

const Podcast = () => {
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);

  const podcastEpisodes: Post[] = [
    {
      title: "The $250 Full-Service Agency Business-in-a-Box",
      category: "PODCAST",
      subcategory: "Business",
      date: "February 21, 2026",
      excerpt: "Discover how to start your own full-service agency with minimal investment.",
      image: "/podcast/6.png",
      slug: "agency-business-in-a-box",
      tags: ["Business", "Agency", "Entrepreneurship"],
      audioUrl: "/podcast/episode6.mp3",
      episodeNumber: 6
    },
    {
      title: "Introducing Gravitas Commerce: High-Tech to $500",
      category: "PODCAST",
      subcategory: "Commerce",
      date: "February 14, 2026",
      excerpt: "Learn how to launch a high-tech e-commerce solution for just $500.",
      image: "/podcast/5.png",
      slug: "gravitas-commerce-hightech",
      tags: ["Commerce", "Business", "Technology"],
      audioUrl: "/podcast/ep5.mp3",
      episodeNumber: 5
    },
    {
      title: "Introducing Gravitas: Creating The Blueprint For Multi-Sector Innovation",
      category: "PODCAST",
      subcategory: "Tech Industry",
      date: "January 21, 2026",
      excerpt: "Inspiring conversations with female leaders who are transforming the technology landscape.",
      image: "/podcast/1.png",
      slug: "women-in-tech",
      tags: ["Women in Tech", "Leadership", "Tech Industry"],
      audioUrl: "/podcast/ep1.m4a",
      episodeNumber: 4
    },
    {
      title: "YUTE: The Mzansi Money Manual [Case Study]",
      category: "PODCAST",
      subcategory: "Marketing Psychology",
      date: "January 7, 2026",
      excerpt: "Diving deep into the psychological principles that drive successful marketing campaigns.",
      image: "/podcast/3.png",
      slug: "psychology-influence-marketing",
      tags: ["Psychology", "Marketing", "Influence"],
      audioUrl: "/podcast/ep3.m4a",
      episodeNumber: 3
    },
    {
      title: "AI Turbocharges Africa's Creative Economy Boom",
      category: "PODCAST",
      subcategory: "Brand Strategy",
      date: "January 14, 2026",
      excerpt: "Industry experts discuss strategies for creating genuine connections with audiences online.",
      image: "/podcast/2.png",
      slug: "authentic-brands-social-media",
      tags: ["Brand Strategy", "Social Media", "Authenticity"],
      audioUrl: "/podcast/ep2.m4a",
      episodeNumber: 2
    },
    {
      title: "The Future of AI in Content Creation",
      category: "PODCAST",
      subcategory: "Digital Media",
      date: "December 26, 2025",
      excerpt: "Exploring how AI is revolutionizing content creation across industries.",
      image: "/podcast/4.png",
      slug: "future-ai-content-creation",
      tags: ["AI", "Content Creation", "Digital Media"],
      audioUrl: "/podcast/ep6.mp3",
      episodeNumber: 1
    }
  ];

  const postsToShow = filteredPosts.length > 0 ? filteredPosts : podcastEpisodes;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main id="main-content" className="container-blog py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Podcast
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Engaging conversations with thought leaders, innovators, and creators shaping our world today.
          </p>
        </div>

        <PageFilter
          posts={podcastEpisodes}
          onFilteredPostsChange={setFilteredPosts}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {postsToShow.map((episode) => (
            <AudioPlayer
              key={episode.slug}
              title={episode.title}
              category={episode.category}
              date={episode.date}
              image={episode.image}
              audioUrl={episode.audioUrl || ''}
              episodeNumber={episode.episodeNumber || 1}
            />
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Podcast;