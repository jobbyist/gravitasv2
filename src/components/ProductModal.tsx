import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface ProductModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description: string;
  ctaText: string;
  ctaUrl: string;
}

const ProductModal = ({ open, onOpenChange, title, description, ctaText, ctaUrl }: ProductModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription className="pt-4 text-base leading-relaxed">
            {description}
          </DialogDescription>
        </DialogHeader>
        <div className="mt-4">
          <Button asChild className="w-full">
            <a href={ctaUrl} target="_blank" rel="noopener noreferrer">
              {ctaText}
            </a>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProductModal;
