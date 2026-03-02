import { memo } from 'react';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock } from 'lucide-react';

const processSteps = [
  {
    step: 1,
    title: 'Discovery Call',
    description: 'We discuss your goals, requirements, and vision for your website.',
    duration: '30-60 minutes',
  },
  {
    step: 2,
    title: 'Proposal & Agreement',
    description: 'Receive a detailed proposal with timeline and pricing. Sign and pay deposit.',
    duration: '1-2 days',
  },
  {
    step: 3,
    title: 'Design & Development',
    description: 'We create your custom website with regular progress updates.',
    duration: '1-3 weeks',
  },
  {
    step: 4,
    title: 'Review & Revisions',
    description: 'You review the website and request any changes (1 revision round included).',
    duration: '3-5 days',
  },
  {
    step: 5,
    title: 'Launch & Support',
    description: 'We launch your site and provide 30 days of post-launch support.',
    duration: '1 day + 30 days support',
  },
];

export const ProcessSection = memo(function ProcessSection() {
  return (
    <section className="py-16 md:py-24">
      <div className="container-blog">
        <div className="max-w-4xl mx-auto">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl md:text-4xl font-bold">Our Simple 5-Step Process</h2>
            <p className="text-xl text-muted-foreground">
              From concept to launch in weeks, not months
            </p>
          </div>

          <div className="space-y-6">
            {processSteps.map((item) => (
              <Card key={item.step} className="border-l-4 border-l-primary">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center justify-center h-10 w-10 rounded-full bg-primary text-primary-foreground font-bold">
                        {item.step}
                      </div>
                      <div>
                        <CardTitle>{item.title}</CardTitle>
                        <CardDescription className="mt-1">{item.description}</CardDescription>
                      </div>
                    </div>
                    <Badge variant="outline" className="hidden sm:flex">
                      <Clock className="h-3 w-3 mr-1" />
                      {item.duration}
                    </Badge>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
});
