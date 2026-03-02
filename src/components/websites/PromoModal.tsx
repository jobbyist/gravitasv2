import { useNavigate } from 'react-router-dom';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Gift, Sparkles } from "lucide-react";
import { trackEvent } from '@/lib/tracking';

interface PromoModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const PromoModal = ({ open, onOpenChange }: PromoModalProps) => {
  const navigate = useNavigate();

  const handleCTAClick = () => {
    trackEvent('promo_modal_cta_click', { promo_code: '25WMNS2026' });
    navigate('/website-payment');
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] bg-gradient-to-br from-pink-50 to-purple-50 dark:from-pink-950/20 dark:to-purple-950/20 border-2 border-pink-200 dark:border-pink-800">
        <DialogHeader>
          <div className="flex items-center justify-center mb-4">
            <div className="relative">
              <Gift className="h-16 w-16 text-pink-600 dark:text-pink-400" />
              <Sparkles className="h-6 w-6 text-purple-600 dark:text-purple-400 absolute -top-1 -right-1 animate-pulse" />
            </div>
          </div>
          <DialogTitle className="text-center text-2xl md:text-3xl font-bold text-pink-900 dark:text-pink-100">
            Women's Month Special Offer! 🎉
          </DialogTitle>
          <DialogDescription className="pt-4 text-base md:text-lg leading-relaxed text-center space-y-4">
            <div className="space-y-3">
              <p className="text-foreground font-semibold text-lg md:text-xl">
                Do you need a website?
              </p>
              <div className="bg-white dark:bg-gray-900 rounded-lg p-4 border-2 border-pink-300 dark:border-pink-700 shadow-sm">
                <p className="text-foreground">
                  Get <span className="font-bold text-pink-600 dark:text-pink-400 text-xl">25% OFF</span> this Women's Month
                </p>
                <p className="text-foreground font-medium mt-2">
                  + an additional <span className="font-bold text-purple-600 dark:text-purple-400 text-xl">$300 OFF</span> our base website build price
                </p>
              </div>
              <div className="pt-2">
                <Badge variant="secondary" className="text-sm px-4 py-2 bg-pink-100 dark:bg-pink-900 text-pink-900 dark:text-pink-100 border border-pink-300 dark:border-pink-700">
                  Use promo code: <span className="font-mono font-bold ml-1">25WMNS2026</span>
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground pt-2">
                when you Build Your Custom Website Package or get $300 off our Basic Website Starter Kit
              </p>
            </div>
          </DialogDescription>
        </DialogHeader>
        
        <div className="mt-6 flex flex-col gap-3">
          <Button 
            onClick={handleCTAClick}
            size="lg"
            className="w-full text-lg font-semibold bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white border-0"
          >
            <Gift className="mr-2 h-5 w-5" />
            Claim Your Special Offer Now
          </Button>
          <Button 
            onClick={() => onOpenChange(false)}
            variant="ghost"
            className="w-full"
          >
            Maybe Later
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
