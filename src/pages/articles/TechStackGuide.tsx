import Header from '@/components/Header';
import Footer from '@/components/Footer';
import lifestylePost from '@/assets/lifestyle-post.jpg';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const TechStackGuide = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main id="main-content" className="container-blog py-12">
        <Link to="/" className="inline-flex items-center text-muted-foreground hover:text-foreground mb-8 transition-colors">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Home
        </Link>

        <article className="max-w-4xl mx-auto">
          <header className="mb-8">
            <Badge variant="secondary" className="mb-4">TECH</Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 leading-tight">
              Tech Stack Selection Guide
            </h1>
            <time className="text-muted-foreground">October 28, 2025</time>
          </header>

          <div className="aspect-video rounded-lg overflow-hidden mb-8">
            <img
              src={lifestylePost}
              alt="Tech Stack Selection"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="prose prose-lg dark:prose-invert max-w-none">
            <p className="lead text-xl text-muted-foreground mb-6">
              How to choose the right technology stack for your next project—a comprehensive guide for developers and decision-makers.
            </p>

            <h2>Making the Right Choice</h2>
            <p>
              Selecting a technology stack is one of the most critical decisions in software development. The right choice can accelerate development and ensure long-term maintainability.
            </p>

            <h2>Factors to Consider</h2>
            <p>
              Project requirements, team expertise, scalability needs, and long-term maintenance should all inform your technology decisions.
            </p>

            <h3>Team Expertise</h3>
            <p>
              Working with technologies your team knows well reduces ramp-up time and increases productivity. However, don't be afraid to invest in learning new tools when they offer significant advantages.
            </p>

            <h3>Scalability Requirements</h3>
            <p>
              Consider both horizontal and vertical scaling needs. Cloud-native technologies and containerization with Docker and Kubernetes provide flexibility for growing applications.
            </p>

            <h2>Popular Stacks</h2>
            <p>
              MERN, MEAN, and JAMstack are proven combinations. Next.js with Supabase has emerged as a powerful choice for full-stack applications requiring rapid development.
            </p>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
};

export default TechStackGuide;
