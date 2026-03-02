import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Smartphone } from "lucide-react";

interface AppDownloadModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const AppDownloadModal = ({ open, onOpenChange }: AppDownloadModalProps) => {
  const [email, setEmail] = useState('');
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast({
        title: "Email required",
        description: "Please enter your email address.",
        variant: "destructive",
      });
      return;
    }

    // Show success toast
    toast({
      title: "Thanks for your interest!",
      description: "We'll notify you when the app launches.",
    });

    // Reset form and close modal
    setEmail('');
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <div className="flex items-center justify-center mb-4">
            <Smartphone className="h-12 w-12 text-primary" />
          </div>
          <DialogTitle className="text-center text-2xl">Download The App</DialogTitle>
          <DialogDescription className="pt-4 text-base leading-relaxed text-center">
            Mobile App for Android and iOS Coming Soon
          </DialogDescription>
        </DialogHeader>
        
        <div className="mt-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Get notified when we launch</Label>
              <Input
                id="email"
                type="email"
                placeholder="your.email@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            
            <Button type="submit" className="w-full">
              Notify Me
            </Button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AppDownloadModal;
