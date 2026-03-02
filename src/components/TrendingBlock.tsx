import AudioPlayer from './AudioPlayer';

// Mock audio files - in production, these would be real podcast audio URLs
const MOCK_AUDIO_URL = 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3';
const EPISODE_4_AUDIO_URL = '/podcast/ep1.m4a'; // Previously Episode 1
const EPISODE_3_AUDIO_URL = '/podcast/ep2.m4a'; // Previously Episode 2
const EPISODE_2_AUDIO_URL = '/podcast/ep3.m4a'; // Previously Episode 3
const EPISODE_1_AUDIO_URL = '/podcast/ep6.mp3'; // Previously Episode 4
const EPISODE_5_AUDIO_URL = '/podcast/ep5.mp3';
const EPISODE_6_AUDIO_URL = '/podcast/episode6.mp3';

const latestPodcastEpisodes = [
  {
    title: "YUTE: The Mzansi Money Manual [Case Study]",
    category: "PODCAST",
    date: "January 7, 2026",
    image: "/podcast/3.png",
    audioUrl: EPISODE_3_AUDIO_URL,
    episodeNumber: 3,
    visible: true
  },
  {
    title: "The Future of AI in Content Creation",
    category: "PODCAST",
    date: "December 26, 2025",
    image: "/podcast/4.png",
    audioUrl: EPISODE_1_AUDIO_URL,
    episodeNumber: 1,
    visible: true
  },
  {
    title: "Introducing Gravitas Commerce: High-Tech to $500",
    category: "PODCAST",
    date: "February 14, 2026",
    image: "/podcast/5.png",
    audioUrl: EPISODE_5_AUDIO_URL,
    episodeNumber: 5,
    visible: true
  },
  {
    title: "The $250 Full-Service Agency Business-in-a-Box",
    category: "PODCAST",
    date: "February 21, 2026",
    image: "/podcast/6.png",
    audioUrl: EPISODE_6_AUDIO_URL,
    episodeNumber: 6,
    visible: true
  },
  // Hidden episodes
  {
    title: "Introducing Gravitas: Creating The Blueprint For Multi-Sector Innovation",
    category: "PODCAST",
    date: "January 21, 2026",
    image: "/podcast/1.png",
    audioUrl: EPISODE_4_AUDIO_URL,
    episodeNumber: 4,
    visible: false
  },
  {
    title: "AI Turbocharges Africa's Creative Economy Boom",
    category: "PODCAST", 
    date: "January 14, 2026",
    image: "/podcast/2.png",
    audioUrl: EPISODE_2_AUDIO_URL,
    episodeNumber: 2,
    visible: false
  }
];

const TrendingBlock = () => {
  const visibleEpisodes = latestPodcastEpisodes.filter(ep => ep.visible);
  
  return (
    <section className="container-blog py-16 bg-muted/30">
      <div className="mb-8">
        <h2 id="trending-heading" className="section-title mb-2">Latest Podcast Episodes</h2>
        <p className="text-muted-foreground">Listen to our mini podcast series. Login to track your listening progress and enjoy exclusive content.</p>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {visibleEpisodes.map((episode, index) => (
          <AudioPlayer
            key={index}
            title={episode.title}
            category={episode.category}
            date={episode.date}
            image={episode.image}
            audioUrl={episode.audioUrl}
            episodeNumber={episode.episodeNumber}
          />
        ))}
      </div>
      <div className="mt-8 text-center">
        <a 
          href="/podcast" 
          className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
        >
          View More Episodes
        </a>
      </div>
    </section>
  );
};

export default TrendingBlock;