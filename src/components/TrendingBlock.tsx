import AudioPlayer from './AudioPlayer';

// Mock audio files - in production, these would be real podcast audio URLs
const MOCK_AUDIO_URL = 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3';
const EPISODE_6_AUDIO_URL = '/podcast/ep6.mp3';

const EPISODE_1_AUDIO_URL = '/podcast/ep1.m4a';

const latestPodcastEpisodes = [
  {
    title: "Introducing Gravitas: Creating The Blueprint For Multi-Sector Innovation",
    category: "PODCAST",
    date: "January 21, 2026",
    image: "/podcast/1.png",
    audioUrl: EPISODE_1_AUDIO_URL,
    episodeNumber: 1
  },
  {
    title: "AI Turbocharges Africa's Creative Economy Boom",
    category: "PODCAST", 
    date: "January 14, 2026",
    image: "/podcast/2.png",
    audioUrl: MOCK_AUDIO_URL,
    episodeNumber: 2
  },
  {
    title: "YUTE: The Mzansi Money Manual [Case Study]",
    category: "PODCAST",
    date: "January 7, 2026",
    image: "/podcast/3.png",
    audioUrl: MOCK_AUDIO_URL,
    episodeNumber: 3
  },
  {
    title: "The Future of AI in Content Creation",
    category: "PODCAST",
    date: "December 26, 2025",
    image: "/podcast/6.png",
    audioUrl: EPISODE_6_AUDIO_URL,
    episodeNumber: 4
  }
];

const TrendingBlock = () => {
  return (
    <section className="container-blog py-16 bg-muted/30">
      <div className="mb-8">
        <h2 id="trending-heading" className="section-title mb-2">Latest Podcast Episodes</h2>
        <p className="text-muted-foreground">Listen to our mini podcast series. Login to track your listening progress and enjoy exclusive content.</p>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {latestPodcastEpisodes.map((episode, index) => (
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
    </section>
  );
};

export default TrendingBlock;