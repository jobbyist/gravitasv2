import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { RotateCcw } from 'lucide-react';
import { pricingConfig } from '@/lib/pricingConfig';
import { 
  calculateTotal, 
  formatUSD, 
  formatCurrency,
  parsePricingFromURL, 
  pricingToURLParams 
} from '@/lib/pricingCalculator';
import { Currency } from '@/lib/currencyConverter';
import { trackEvent } from '@/lib/tracking';
import { UpsellCard } from './UpsellCard';
import { CurrencySelector } from './CurrencySelector';

export function PricingEstimator() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedUpsells, setSelectedUpsells] = useState<Map<string, string | boolean>>(new Map());
  const [maintenanceEnabled, setMaintenanceEnabled] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState<Currency>('USD');

  // Initialize from URL params
  useEffect(() => {
    const { selectedUpsells: urlUpsells, maintenanceEnabled: urlMaintenance } = 
      parsePricingFromURL(searchParams);
    setSelectedUpsells(urlUpsells);
    setMaintenanceEnabled(urlMaintenance);
  }, [searchParams]);

  // Update URL when selections change
  useEffect(() => {
    const params = pricingToURLParams(selectedUpsells, maintenanceEnabled);
    setSearchParams(params, { replace: true });
  }, [selectedUpsells, maintenanceEnabled, setSearchParams]);

  const breakdown = calculateTotal(selectedUpsells, maintenanceEnabled);

  const handleUpsellChange = (upsellId: string, value: string | boolean) => {
    const newSelections = new Map(selectedUpsells);
    
    if (value === false || value === 'none' || value === '0') {
      newSelections.delete(upsellId);
      trackEvent('upsell_deselected', { upsellId });
    } else {
      newSelections.set(upsellId, value);
      trackEvent('upsell_selected', { upsellId, value });
    }
    
    setSelectedUpsells(newSelections);
  };

  const handleMaintenanceToggle = (enabled: boolean) => {
    setMaintenanceEnabled(enabled);
    trackEvent('maintenance_toggled', { enabled });
  };

  const handleReset = () => {
    setSelectedUpsells(new Map());
    setMaintenanceEnabled(false);
    trackEvent('pricing_reset');
  };

  const handleCurrencyChange = (currency: Currency) => {
    setSelectedCurrency(currency);
    trackEvent('currency_changed', { currency });
  };

  // Helper function to format prices in selected currency
  const formatPrice = (amount: number) => formatCurrency(amount, selectedCurrency);

  return (
    <div className="space-y-8">
      {/* Maintenance Toggle */}
      <Card>
        <CardHeader>
          <CardTitle>Optional Maintenance</CardTitle>
          <CardDescription>Keep your website updated and secure</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label htmlFor="maintenance" className="font-semibold">
                Monthly Maintenance Plan
              </Label>
              <p className="text-sm text-muted-foreground">
                Includes updates, backups, security monitoring, and support
              </p>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-lg font-bold">{formatPrice(pricingConfig.maintenanceMonthly)}/mo</span>
              <Switch 
                id="maintenance"
                checked={maintenanceEnabled}
                onCheckedChange={handleMaintenanceToggle}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Upsells Grid */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold">Value-Added Services</h3>
          <div className="flex items-center gap-4">
            <CurrencySelector value={selectedCurrency} onChange={handleCurrencyChange} />
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleReset}
              className="gap-2"
            >
              <RotateCcw className="h-4 w-4" />
              Reset
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {pricingConfig.upsells.map((upsell) => (
            <UpsellCard
              key={upsell.id}
              upsell={upsell}
              value={selectedUpsells.get(upsell.id)}
              onChange={(value) => handleUpsellChange(upsell.id, value)}
              currency={selectedCurrency}
            />
          ))}
        </div>
      </div>

      {/* Pricing Breakdown */}
      <Card className="border-primary">
        <CardHeader>
          <CardTitle>Estimated Total</CardTitle>
          <CardDescription>Your customized package pricing</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Base Price */}
          <div className="flex justify-between items-center">
            <span className="font-medium">Base Website Build</span>
            <span className="font-semibold">{formatPrice(breakdown.basePrice)}</span>
          </div>

          {/* Upsells */}
          {breakdown.upsells.length > 0 && (
            <>
              <Separator />
              <div className="space-y-2">
                {breakdown.upsells.map((upsell) => (
                  <div key={upsell.id} className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground">{upsell.name}</span>
                    <span>{formatPrice(upsell.price)}</span>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* Total Once-off */}
          <Separator />
          <div className="flex justify-between items-center text-lg">
            <span className="font-bold">Total Once-off</span>
            <span className="font-bold text-primary">{formatPrice(breakdown.totalOnceOff)}</span>
          </div>

          {/* Monthly if maintenance */}
          {breakdown.maintenanceEnabled && (
            <>
              <Separator />
              <div className="flex justify-between items-center text-lg">
                <span className="font-bold">Monthly Maintenance</span>
                <span className="font-bold text-primary">{formatPrice(breakdown.totalMonthly)}/mo</span>
              </div>
            </>
          )}

          {/* Savings Display */}
          <div className="bg-accent p-3 rounded-lg">
            <p className="text-sm text-center">
              <span className="font-semibold text-primary">You're saving {formatPrice(breakdown.savings)}</span>
              <span className="text-muted-foreground"> on the base website build!</span>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
