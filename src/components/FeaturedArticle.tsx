import skinlabsBanner from '@/assets/skinlabs-banner.jpg';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface FeaturedArticleProps {
  title: string;
  subtitle?: string;
  category: string;
  date: string;
  excerpt: string;
  image: string;
  isAnnouncement?: boolean;
}

const FeaturedArticle = ({
  title,
  subtitle,
  category,
  date,
  excerpt,
  image,
  isAnnouncement = false
}: FeaturedArticleProps) => {
  return (
    <article className="relative w-full">
      {/* Full-width hero image */}
      <div className="relative w-full h-[70vh] min-h-[500px] overflow-hidden">
        <img
          src={image}
          alt={`${title} - ${category}`}
          className="object-cover w-full h-full"
          loading="eager"
          decoding="async"
          fetchPriority="high"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        
        {/* Content overlay */}
        <div className="absolute inset-0 flex items-end">
          <div className="container-blog pb-16 space-y-6">
            {isAnnouncement && (
              <Badge variant="secondary" className="bg-primary text-primary-foreground uppercase tracking-wider px-4 py-1.5 text-xs font-semibold">
                Official Announcement
              </Badge>
            )}
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight max-w-4xl">
              {title}
            </h1>
            
            {subtitle && (
              <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl">
                {subtitle}
              </p>
            )}
            
            <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">
              {excerpt}
            </p>
            
            <div className="flex items-center gap-4 text-sm text-muted-foreground pt-2">
              <span className="uppercase tracking-wider">{category}</span>
              <span aria-hidden="true">•</span>
              <time dateTime={date}>{date}</time>
            </div>

            <div className="pt-4 flex gap-4">
              <Button size="lg" className="uppercase tracking-wider">
                Get Notified
                <span className="ml-2" aria-hidden="true">→</span>
              </Button>
              <Button variant="outline" size="lg" className="uppercase tracking-wider">
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

// Default Featured Article - SkinLabs Relaunch Announcement
export const DefaultFeaturedArticle = () => (
  <FeaturedArticle
    title="The Official SkinLabs® Product Relaunch Is Finally Here"
    subtitle="Next Generation Skincare Science"
    category="Product Launch"
    date="2025-01-15"
    excerpt="After months of anticipation, we're thrilled to announce that SkinLabs® is officially relaunching with an entirely reimagined product line. Stay tuned for exclusive details coming soon."
    image={skinlabsBanner}
    isAnnouncement={true}
  />
);

export default FeaturedArticle;