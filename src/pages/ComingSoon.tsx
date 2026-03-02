import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Clock, Bell } from 'lucide-react';
import { Link } from 'react-router-dom';

const ComingSoon = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main id="main-content" className="container-blog py-16 md:py-24">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <div className="flex justify-center">
            <Clock className="h-24 w-24 text-primary animate-pulse" />
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
            Coming Soon
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground">
            This feature is currently under development. We're working hard to bring you something amazing!
          </p>
          
          <div className="pt-8 space-y-4">
            <p className="text-muted-foreground flex items-center justify-center gap-2">
              <Bell className="h-5 w-5" />
              Want to be notified when this feature launches?
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link to="/contact">
                  Contact Us
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/">
                  Back to Home
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ComingSoon;
