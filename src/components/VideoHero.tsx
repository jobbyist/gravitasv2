import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useRef, useState } from 'react';
import { Play, Pause } from 'lucide-react';

const VideoHero = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <section className="container-blog py-12">
      <div className="space-y-8">
        {/* Video Player */}
        <div className="relative aspect-video rounded-lg overflow-hidden shadow-lg bg-black">
          <video
            ref={videoRef}
            className="w-full h-full object-cover"
            poster="/gravitasbanner.png"
            controls
            playsInline
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
          >
            <source src="/gravitasexplainer.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          
          {/* Custom Play Button Overlay */}
          {!isPlaying && (
            <button
              onClick={togglePlay}
              className="absolute inset-0 flex items-center justify-center bg-black/30 hover:bg-black/40 transition-colors group"
              aria-label="Play video"
            >
              <div className="w-20 h-20 rounded-full bg-primary flex items-center justify-center group-hover:scale-110 transition-transform">
                <Play className="w-10 h-10 text-primary-foreground ml-1" fill="currentColor" />
              </div>
            </button>
          )}
        </div>

        {/* Description */}
        <div className="text-center max-w-3xl mx-auto space-y-6">
          <p className="text-lg text-muted-foreground leading-relaxed">
            A multidisciplinary venture leveraging AI and technical expertise to develop innovative, 
            sustainable products and services for diverse markets.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4 justify-center pt-2">
            <Button 
              size="lg" 
              className="uppercase tracking-wider"
              asChild
            >
              <a href="#whitepaper" target="_blank" rel="noopener noreferrer">
                Read Our 2026 Whitepaper
                <span className="ml-2" aria-hidden="true">→</span>
              </a>
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="uppercase tracking-wider"
              asChild
            >
              <Link to="/lead-generation">
                Work With Us
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoHero;
