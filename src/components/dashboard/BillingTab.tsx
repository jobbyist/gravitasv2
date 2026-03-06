import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CreditCard, Download, CheckCircle2, Clock, AlertCircle } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { initiatePayfastOnceOff, initiatePayfastSubscription } from '@/lib/payfast';
import { useToast } from '@/hooks/use-toast';

interface Invoice {
  id: string;
  date: string;
  description: string;
  amount: string;
  status: 'paid' | 'pending' | 'overdue';
}

interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: string;
  type: 'payment' | 'refund';
}

const MOCK_INVOICES: Invoice[] = [
  { id: 'INV-001', date: '2026-03-01', description: 'Web Hosting – March 2026', amount: '$10.00', status: 'pending' },
  { id: 'INV-002', date: '2026-02-01', description: 'Web Hosting – February 2026', amount: '$10.00', status: 'paid' },
  { id: 'INV-003', date: '2026-01-01', description: 'Web Hosting – January 2026', amount: '$10.00', status: 'paid' },
];

const MOCK_TRANSACTIONS: Transaction[] = [
  { id: 'TXN-101', date: '2026-02-01', description: 'Web Hosting – Feb 2026', amount: '$10.00', type: 'payment' },
  { id: 'TXN-100', date: '2026-01-01', description: 'Web Hosting – Jan 2026', amount: '$10.00', type: 'payment' },
  { id: 'TXN-099', date: '2025-12-15', description: 'Website Setup – Starter Pack', amount: '$199.00', type: 'payment' },
];

function statusBadge(status: Invoice['status']) {
  if (status === 'paid') return <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"><CheckCircle2 className="h-3 w-3 mr-1" />Paid</Badge>;
  if (status === 'pending') return <Badge variant="secondary"><Clock className="h-3 w-3 mr-1" />Due</Badge>;
  return <Badge variant="destructive"><AlertCircle className="h-3 w-3 mr-1" />Overdue</Badge>;
}

export default function BillingTab() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [invoices] = useState<Invoice[]>(MOCK_INVOICES);
  const [transactions] = useState<Transaction[]>(MOCK_TRANSACTIONS);

  const nameParts = (user?.name || '').split(' ');
  const nameFirst = nameParts[0] || '';
  const nameLast = nameParts.slice(1).join(' ') || '';

  const handlePayInvoice = (invoice: Invoice) => {
    if (invoice.status !== 'pending' && invoice.status !== 'overdue') return;
    const amount = parseFloat(invoice.amount.replace('$', ''));
    initiatePayfastOnceOff({
      amount,
      itemName: invoice.description,
      emailAddress: user?.email,
      nameFirst,
      nameLast,
      customStr1: invoice.id,
    });
  };

  const handlePayMonthly = () => {
    const today = new Date();
    const billingDate = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
    initiatePayfastSubscription({
      amount: 11.99,
      recurringAmount: 11.99,
      itemName: 'Gravitas Monthly Hosting & Email',
      itemDescription: 'Standard Hosting + Professional Email (5 users)',
      emailAddress: user?.email,
      nameFirst,
      nameLast,
      billingDate,
      frequency: 3,
      cycles: 0,
    });
  };

  const handleDownloadInvoice = (invoice: Invoice) => {
    // In production this would fetch a PDF from the server
    toast({ title: 'Invoice download', description: `Downloading ${invoice.id}…` });
    const content = `INVOICE ${invoice.id}\nDate: ${invoice.date}\nDescription: ${invoice.description}\nAmount: ${invoice.amount}\nStatus: ${invoice.status}`;
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${invoice.id}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-8">
      {/* Quick Pay */}
      <Card className="border-primary">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            Monthly Subscription
          </CardTitle>
          <CardDescription>Set up automatic monthly billing via PayFast</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <p className="font-medium">Hosting + Email Bundle</p>
              <p className="text-sm text-muted-foreground">Standard Hosting & Professional Email (5 users)</p>
            </div>
            <span className="text-xl font-bold">$11.99/mo</span>
          </div>
          <Button className="w-full sm:w-auto" onClick={handlePayMonthly}>
            <CreditCard className="h-4 w-4 mr-2" />
            Subscribe with PayFast
          </Button>
        </CardContent>
      </Card>

      {/* Invoices */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Invoices</h2>
        <div className="rounded-lg border overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-muted">
              <tr>
                <th className="text-left px-4 py-3 font-medium">Invoice</th>
                <th className="text-left px-4 py-3 font-medium hidden sm:table-cell">Date</th>
                <th className="text-left px-4 py-3 font-medium hidden md:table-cell">Description</th>
                <th className="text-right px-4 py-3 font-medium">Amount</th>
                <th className="text-center px-4 py-3 font-medium">Status</th>
                <th className="text-center px-4 py-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {invoices.map((inv) => (
                <tr key={inv.id} className="hover:bg-muted/50 transition-colors">
                  <td className="px-4 py-3 font-mono text-xs">{inv.id}</td>
                  <td className="px-4 py-3 hidden sm:table-cell text-muted-foreground">{inv.date}</td>
                  <td className="px-4 py-3 hidden md:table-cell">{inv.description}</td>
                  <td className="px-4 py-3 text-right font-medium">{inv.amount}</td>
                  <td className="px-4 py-3 text-center">{statusBadge(inv.status)}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-center gap-2">
                      {(inv.status === 'pending' || inv.status === 'overdue') && (
                        <Button size="sm" variant="default" onClick={() => handlePayInvoice(inv)}>
                          Pay
                        </Button>
                      )}
                      <Button size="sm" variant="ghost" onClick={() => handleDownloadInvoice(inv)}>
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Transaction History */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Transaction History</h2>
        <div className="rounded-lg border overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-muted">
              <tr>
                <th className="text-left px-4 py-3 font-medium">ID</th>
                <th className="text-left px-4 py-3 font-medium hidden sm:table-cell">Date</th>
                <th className="text-left px-4 py-3 font-medium">Description</th>
                <th className="text-right px-4 py-3 font-medium">Amount</th>
                <th className="text-center px-4 py-3 font-medium">Type</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {transactions.map((txn) => (
                <tr key={txn.id} className="hover:bg-muted/50 transition-colors">
                  <td className="px-4 py-3 font-mono text-xs">{txn.id}</td>
                  <td className="px-4 py-3 hidden sm:table-cell text-muted-foreground">{txn.date}</td>
                  <td className="px-4 py-3">{txn.description}</td>
                  <td className={`px-4 py-3 text-right font-medium ${txn.type === 'refund' ? 'text-green-600' : ''}`}>
                    {txn.type === 'refund' ? '+' : ''}{txn.amount}
                  </td>
                  <td className="px-4 py-3 text-center">
                    <Badge variant={txn.type === 'payment' ? 'secondary' : 'outline'} className="capitalize">
                      {txn.type}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
