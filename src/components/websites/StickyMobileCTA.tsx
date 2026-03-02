import { Button } from '@/components/ui/button';
import { MessageSquare, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function StickyMobileCTA() {
  const navigate = useNavigate();

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-background border-t border-border shadow-lg p-3">
      <div className="flex gap-2">
        <Button 
          onClick={() => navigate('/lead-generation')} 
          variant="outline"
          className="flex-1 gap-2"
          size="sm"
        >
          <Users className="h-4 w-4" />
          Work With Us
        </Button>
        <Button 
          onClick={() => navigate('/contact')}
          className="flex-1 gap-2"
          size="sm"
        >
          <MessageSquare className="h-4 w-4" />
          Contact Support
        </Button>
      </div>
    </div>
  );
}
