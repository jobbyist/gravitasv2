import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Info } from 'lucide-react';
import { UpsellOption } from '@/lib/pricingConfig';
import { formatUSD } from '@/lib/pricingCalculator';

interface UpsellCardProps {
  upsell: UpsellOption;
  value: string | boolean | undefined;
  onChange: (value: string | boolean) => void;
}

export function UpsellCard({ upsell, value, onChange }: UpsellCardProps) {
  const isCheckbox = upsell.type === 'checkbox';
  const isChecked = isCheckbox && value === true;
  const selectedValue = !isCheckbox && typeof value === 'string' ? value : 'none';

  // Get the display price for select-type upsells
  const getDisplayPrice = () => {
    if (isCheckbox) {
      return formatUSD(upsell.price);
    }
    
    if (upsell.options) {
      const maxPrice = Math.max(...upsell.options.filter(opt => opt.price > 0).map(opt => opt.price));
      if (maxPrice > 0) {
        return `from ${formatUSD(upsell.options.find(opt => opt.price > 0)?.price || 0)}`;
      }
    }
    return 'Select option';
  };

  return (
    <div className={`border rounded-lg p-4 transition-all ${isChecked || (selectedValue !== 'none' && selectedValue !== '0') ? 'border-primary bg-accent' : 'border-border'}`}>
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 space-y-2">
          <div className="flex items-center gap-2">
            <h4 className="font-semibold text-sm">{upsell.name}</h4>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button className="text-muted-foreground hover:text-foreground transition-colors" type="button" aria-label="More information">
                    <Info className="h-4 w-4" />
                  </button>
                </TooltipTrigger>
                <TooltipContent className="max-w-xs">
                  <p>{upsell.tooltip}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          
          <p className="text-xs text-muted-foreground">{upsell.description}</p>
          
          {isCheckbox ? (
            <div className="flex items-center space-x-2 pt-2">
              <Checkbox 
                id={upsell.id} 
                checked={isChecked}
                onCheckedChange={(checked) => onChange(checked as boolean)}
              />
              <Label 
                htmlFor={upsell.id} 
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
              >
                Add for {getDisplayPrice()}
              </Label>
            </div>
          ) : (
            <div className="pt-2">
              <Select value={selectedValue} onValueChange={onChange}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select an option" />
                </SelectTrigger>
                <SelectContent>
                  {upsell.options?.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label} {option.price > 0 ? `(+${formatUSD(option.price)})` : ''}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
