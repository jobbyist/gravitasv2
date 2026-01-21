import Header from '@/components/Header';
import Footer from '@/components/Footer';
import businessPost from '@/assets/business-post.jpg';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const ModernWebApps = () => {
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
            <Badge variant="secondary" className="mb-4">WEB DEV</Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 leading-tight">
              Building Modern Web Applications
            </h1>
            <time className="text-muted-foreground">November 3, 2025</time>
          </header>

          <div className="aspect-video rounded-lg overflow-hidden mb-8">
            <img
              src={businessPost}
              alt="Building Modern Web Applications"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="prose prose-lg dark:prose-invert max-w-none">
            <p className="lead text-xl text-muted-foreground mb-6">
              Best practices for developing scalable and performant web applications using the latest frameworks and technologies.
            </p>

            <h2>The Modern Web Stack</h2>
            <p>
              Today's web applications require a thoughtful approach to architecture. The choice of frameworks, tools, and deployment strategies can make or break a project's success.
            </p>

            <h2>Key Considerations</h2>
            <p>
              Performance, scalability, and developer experience are the pillars of modern web development. React, Vue, and Svelte have emerged as leading frontend frameworks, each with their own strengths.
            </p>

            <h3>Frontend Frameworks</h3>
            <p>
              React continues to dominate the landscape with its component-based architecture and vast ecosystem. TypeScript adoption has become almost universal, providing type safety and improved developer tooling.
            </p>

            <h3>Backend Architecture</h3>
            <p>
              Serverless functions, edge computing, and managed databases have simplified backend development. Services like Supabase, Vercel, and Cloudflare provide the infrastructure modern applications need.
            </p>

            <h2>Best Practices</h2>
            <p>
              Code splitting, lazy loading, and optimized asset delivery ensure fast initial load times. Progressive enhancement and responsive design guarantee accessibility across all devices.
            </p>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
};

export default ModernWebApps;
