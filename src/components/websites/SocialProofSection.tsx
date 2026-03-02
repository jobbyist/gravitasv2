import { memo } from 'react';
import { Star, Users, Award, Clock } from 'lucide-react';

export const SocialProofSection = memo(function SocialProofSection() {
  return (
    <section className="py-12 border-b bg-muted/30">
      <div className="container-blog">
        <div className="text-center space-y-6">
          <h2 className="text-2xl font-bold">Trusted By South African Businesses</h2>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
            <div className="flex flex-col items-center space-y-2">
              <div className="flex items-center gap-1 text-yellow-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-current" />
                ))}
              </div>
              <p className="text-sm text-muted-foreground">5.0 Rating</p>
            </div>
            <div className="flex flex-col items-center space-y-2">
              <Users className="h-8 w-8 text-primary" />
              <p className="text-2xl font-bold">50+</p>
              <p className="text-sm text-muted-foreground">Happy Clients</p>
            </div>
            <div className="flex flex-col items-center space-y-2">
              <Award className="h-8 w-8 text-primary" />
              <p className="text-2xl font-bold">100%</p>
              <p className="text-sm text-muted-foreground">Satisfaction Rate</p>
            </div>
            <div className="flex flex-col items-center space-y-2">
              <Clock className="h-8 w-8 text-primary" />
              <p className="text-2xl font-bold">24hrs</p>
              <p className="text-sm text-muted-foreground">Response Time</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});
