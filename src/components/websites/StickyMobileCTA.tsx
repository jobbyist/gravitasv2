import { Button } from '@/components/ui/button';
import { MessageSquare, FileText } from 'lucide-react';

interface StickyMobileCTAProps {
  onAuditClick: () => void;
  onQuoteClick: () => void;
}

export function StickyMobileCTA({ onAuditClick, onQuoteClick }: StickyMobileCTAProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-background border-t border-border shadow-lg p-3">
      <div className="flex gap-2">
        <Button 
          onClick={onAuditClick} 
          variant="outline"
          className="flex-1 gap-2"
          size="sm"
        >
          <FileText className="h-4 w-4" />
          Free Audit
        </Button>
        <Button 
          onClick={onQuoteClick}
          className="flex-1 gap-2"
          size="sm"
        >
          <MessageSquare className="h-4 w-4" />
          Get Quote
        </Button>
      </div>
    </div>
  );
}
