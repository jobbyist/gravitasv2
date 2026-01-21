import Header from '@/components/Header';
import Footer from '@/components/Footer';
import techPost from '@/assets/tech-post.jpg';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const FutureOfAI = () => {
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
            <Badge variant="secondary" className="mb-4">AI</Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 leading-tight">
              The Future of AI: Transforming Industries
            </h1>
            <time className="text-muted-foreground">October 15, 2025</time>
          </header>

          <div className="aspect-video rounded-lg overflow-hidden mb-8">
            <img
              src={techPost}
              alt="The Future of AI"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="prose prose-lg dark:prose-invert max-w-none">
            <p className="lead text-xl text-muted-foreground mb-6">
              Explore how artificial intelligence is revolutionizing business operations and creating new opportunities across every sector of the global economy.
            </p>

            <h2>The AI Revolution</h2>
            <p>
              Artificial intelligence has moved from the realm of science fiction into the core of modern business strategy. From automating routine tasks to providing deep insights from vast datasets, AI is fundamentally changing how organizations operate and compete.
            </p>

            <h2>Industries Being Transformed</h2>
            <p>
              Healthcare is seeing AI-powered diagnostics that can detect diseases earlier than traditional methods. Finance leverages machine learning for fraud detection and algorithmic trading. Manufacturing uses predictive maintenance to reduce downtime and optimize production lines.
            </p>

            <h3>Healthcare Innovation</h3>
            <p>
              AI algorithms are now capable of analyzing medical images with accuracy that rivals—and sometimes exceeds—human experts. This technology is enabling earlier detection of conditions like cancer, leading to better patient outcomes.
            </p>

            <h3>Financial Services</h3>
            <p>
              Banks and financial institutions use AI to process transactions, detect fraudulent activity in real-time, and provide personalized financial advice to customers through robo-advisors.
            </p>

            <h2>Looking Ahead</h2>
            <p>
              As AI technology continues to advance, we can expect even more profound changes in how we work, live, and interact. The organizations that embrace these technologies today will be the leaders of tomorrow.
            </p>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
};

export default FutureOfAI;
