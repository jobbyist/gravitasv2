import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Star, MessageCircle } from 'lucide-react';

interface FeedbackModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const FeedbackModal = ({ open, onOpenChange }: FeedbackModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Share Your Feedback</DialogTitle>
          <DialogDescription>
            Help us improve by sharing your experience or submitting feedback
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <Button
            variant="outline"
            className="w-full justify-start gap-2"
            asChild
          >
            <a
              href="https://www.trustpilot.com/review/gravitas.uno"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Star className="h-5 w-5" />
              Review us on Trustpilot
            </a>
          </Button>
          
          <Button
            variant="outline"
            className="w-full justify-start gap-2"
            asChild
          >
            <a
              href="https://g.page/r/YOUR_GOOGLE_BUSINESS_ID/review"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Star className="h-5 w-5" />
              Review us on Google
            </a>
          </Button>
          
          <Button
            variant="outline"
            className="w-full justify-start gap-2"
            asChild
          >
            <a href="/contact">
              <MessageCircle className="h-5 w-5" />
              Share feedback, report bugs, or request features
            </a>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FeedbackModal;
