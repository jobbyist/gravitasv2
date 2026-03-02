import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { CreditCard, Wallet, DollarSign } from 'lucide-react';

interface PaymentProvidersModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  totalAmount: number;
  currency?: string;
}

export function PaymentProvidersModal({ 
  open, 
  onOpenChange, 
  totalAmount,
  currency = 'USD'
}: PaymentProvidersModalProps) {
  
  const handlePayfastPayment = () => {
    // TODO: Implement PayFast API integration
    console.log('PayFast payment initiated for amount:', totalAmount);
    // This will be configured later to redirect to PayFast payment page
  };

  const handleStitchPayment = () => {
    // TODO: Implement Stitch Express API integration
    console.log('Stitch Express payment initiated for amount:', totalAmount);
    // This will be configured later
  };

  const handlePayPalPayment = () => {
    // TODO: Implement PayPal Checkout API integration
    console.log('PayPal payment initiated for amount:', totalAmount);
    // This will be configured later
  };

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
    }).format(amount);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Choose Your Payment Method</DialogTitle>
          <DialogDescription>
            Select a payment provider to complete your order of {formatAmount(totalAmount)}
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-3 py-4">
          {/* PayFast */}
          <Card className="p-4 hover:border-primary transition-colors cursor-pointer" onClick={handlePayfastPayment}>
            <div className="flex items-start gap-4">
              <div className="rounded-lg bg-primary/10 p-3">
                <CreditCard className="h-6 w-6 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold mb-1">PayFast</h3>
                <p className="text-sm text-muted-foreground">
                  VISA, Mastercard, American Express, Instant EFT, Samsung Pay, Capitec Pay
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Popular for users in South Africa
                </p>
              </div>
            </div>
          </Card>

          {/* Stitch Express */}
          <Card className="p-4 hover:border-primary transition-colors cursor-pointer" onClick={handleStitchPayment}>
            <div className="flex items-start gap-4">
              <div className="rounded-lg bg-primary/10 p-3">
                <Wallet className="h-6 w-6 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold mb-1">Stitch Express</h3>
                <p className="text-sm text-muted-foreground">
                  VISA, Mastercard, Apple Pay, Stitch BNPL
                </p>
              </div>
            </div>
          </Card>

          {/* PayPal */}
          <Card className="p-4 hover:border-primary transition-colors cursor-pointer" onClick={handlePayPalPayment}>
            <div className="flex items-start gap-4">
              <div className="rounded-lg bg-primary/10 p-3">
                <DollarSign className="h-6 w-6 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold mb-1">PayPal Checkout</h3>
                <p className="text-sm text-muted-foreground">
                  VISA, Mastercard, PayPal balance
                </p>
              </div>
            </div>
          </Card>
        </div>

        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
