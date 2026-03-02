import { memo } from 'react';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Currency, CURRENCY_INFO, getAvailableCurrencies } from '@/lib/currencyConverter';

interface CurrencySelectorProps {
  value: Currency;
  onChange: (currency: Currency) => void;
}

export const CurrencySelector = memo(function CurrencySelector({ value, onChange }: CurrencySelectorProps) {
  const currencies = getAvailableCurrencies();

  return (
    <div className="flex items-center gap-3">
      <Label htmlFor="currency-select" className="text-sm font-medium whitespace-nowrap">
        Currency:
      </Label>
      <Select value={value} onValueChange={(val) => onChange(val as Currency)}>
        <SelectTrigger id="currency-select" className="w-[140px]">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {currencies.map((currency) => (
            <SelectItem key={currency.code} value={currency.code}>
              {currency.symbol} {currency.code}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
});
