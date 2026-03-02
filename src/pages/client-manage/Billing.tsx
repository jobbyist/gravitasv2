import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ManageLayout from './ManageLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useToast } from '@/hooks/use-toast';
import { 
  loadBillingData, 
  saveLocalData,
  Subscription,
  Transaction,
  Invoice,
  PaymentMethod,
  BillingData
} from '@/lib/clientData';
import { CreditCard, DollarSign, FileText, Download, Trash2, Star } from 'lucide-react';

const Billing = () => {
  const { username } = useParams<{ username: string }>();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false);
  const [selectedSubscription, setSelectedSubscription] = useState<Subscription | null>(null);

  useEffect(() => {
    const loadData = async () => {
      if (!username) return;
      
      try {
        const billingData = await loadBillingData(username);
        setSubscriptions(billingData.subscriptions);
        setTransactions(billingData.transactions);
        setInvoices(billingData.invoices);
        setPaymentMethods(billingData.payment_methods);
      } catch (error) {
        console.error('Error loading billing data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadData();
  }, [username]);

  const handleCancelSubscription = async () => {
    if (!username || !selectedSubscription) return;
    
    try {
      const updatedSubscriptions = subscriptions.map(sub =>
        sub.id === selectedSubscription.id
          ? { ...sub, status: 'cancelled', auto_renew: false }
          : sub
      );
      
      const updatedData: BillingData = {
        subscriptions: updatedSubscriptions,
        transactions,
        invoices,
        payment_methods: paymentMethods,
      };
      
      saveLocalData(username, 'billing', updatedData);
      setSubscriptions(updatedSubscriptions);
      setCancelDialogOpen(false);
      setSelectedSubscription(null);
      
      toast({
        title: 'Subscription cancelled',
        description: 'Your subscription has been cancelled successfully.',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to cancel subscription. Please try again.',
        variant: 'destructive',
      });
    }
  };

  const handleDownloadInvoice = (invoice: Invoice) => {
    toast({
      title: 'Download started',
      description: `Downloading invoice ${invoice.id}`,
    });
  };

  const handleSetDefaultPayment = (method: PaymentMethod) => {
    if (!username) return;
    
    try {
      const updatedMethods = paymentMethods.map(m =>
        ({ ...m, is_default: m.id === method.id })
      );
      
      const updatedData: BillingData = {
        subscriptions,
        transactions,
        invoices,
        payment_methods: updatedMethods,
      };
      
      saveLocalData(username, 'billing', updatedData);
      setPaymentMethods(updatedMethods);
      
      toast({
        title: 'Default payment updated',
        description: 'Your default payment method has been updated.',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update payment method. Please try again.',
        variant: 'destructive',
      });
    }
  };

  const handleRemovePayment = (method: PaymentMethod) => {
    if (!username) return;
    
    if (method.is_default) {
      toast({
        title: 'Cannot remove',
        description: 'Cannot remove the default payment method. Set another as default first.',
        variant: 'destructive',
      });
      return;
    }
    
    try {
      const updatedMethods = paymentMethods.filter(m => m.id !== method.id);
      
      const updatedData: BillingData = {
        subscriptions,
        transactions,
        invoices,
        payment_methods: updatedMethods,
      };
      
      saveLocalData(username, 'billing', updatedData);
      setPaymentMethods(updatedMethods);
      
      toast({
        title: 'Payment method removed',
        description: 'Your payment method has been removed.',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to remove payment method. Please try again.',
        variant: 'destructive',
      });
    }
  };

  const handleRequestInvoice = () => {
    if (!username) return;
    
    try {
      const newInvoice: Invoice = {
        id: `INV-${Date.now()}`,
        date: new Date().toISOString(),
        due_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
        amount: '$0.00',
        status: 'pending',
        items: [
          {
            description: 'Service request',
            amount: '$0.00',
          }
        ],
      };
      
      const updatedInvoices = [newInvoice, ...invoices];
      
      const updatedData: BillingData = {
        subscriptions,
        transactions,
        invoices: updatedInvoices,
        payment_methods: paymentMethods,
      };
      
      saveLocalData(username, 'billing', updatedData);
      setInvoices(updatedInvoices);
      
      toast({
        title: 'Invoice requested',
        description: 'Your invoice request has been created.',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to create invoice. Please try again.',
        variant: 'destructive',
      });
    }
  };

  const handlePayBill = () => {
    if (!username) return;
    
    try {
      const newTransaction: Transaction = {
        id: `TXN-${Date.now()}`,
        date: new Date().toISOString(),
        description: 'Manual payment',
        amount: '$100.00',
        status: 'completed',
        payment_method: paymentMethods.find(m => m.is_default)?.type || 'Card',
      };
      
      const updatedTransactions = [newTransaction, ...transactions];
      
      const updatedData: BillingData = {
        subscriptions,
        transactions: updatedTransactions,
        invoices,
        payment_methods: paymentMethods,
      };
      
      saveLocalData(username, 'billing', updatedData);
      setTransactions(updatedTransactions);
      
      toast({
        title: 'Payment processed',
        description: 'Your payment has been processed successfully.',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to process payment. Please try again.',
        variant: 'destructive',
      });
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge variant="default">Active</Badge>;
      case 'cancelled':
        return <Badge variant="destructive">Cancelled</Badge>;
      case 'pending':
        return <Badge variant="secondary">Pending</Badge>;
      case 'completed':
        return <Badge variant="outline" className="border-green-500 text-green-700">Completed</Badge>;
      case 'paid':
        return <Badge variant="outline" className="border-green-500 text-green-700">Paid</Badge>;
      case 'overdue':
        return <Badge variant="destructive">Overdue</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  if (loading) {
    return (
      <ManageLayout>
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading billing information...</p>
        </div>
      </ManageLayout>
    );
  }

  return (
    <ManageLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Billing</h1>
            <p className="text-muted-foreground">
              Manage your subscriptions, invoices, and payment methods
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleRequestInvoice}>
              <FileText className="h-4 w-4 mr-2" />
              Request Invoice
            </Button>
            <Button onClick={handlePayBill}>
              <DollarSign className="h-4 w-4 mr-2" />
              Pay Bill
            </Button>
          </div>
        </div>

        {/* Active Subscriptions */}
        <Card>
          <CardHeader>
            <CardTitle>Active Subscriptions</CardTitle>
            <CardDescription>Manage your recurring subscriptions</CardDescription>
          </CardHeader>
          <CardContent>
            {subscriptions.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <p>No active subscriptions</p>
              </div>
            ) : (
              <div className="space-y-4">
                {subscriptions.map((subscription) => (
                  <div key={subscription.id} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg">{subscription.service}</h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          {subscription.amount} / {subscription.frequency}
                        </p>
                        <p className="text-sm text-muted-foreground mt-1">
                          Next billing: {new Date(subscription.next_billing_date).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        {getStatusBadge(subscription.status)}
                        {subscription.status === 'active' && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              setSelectedSubscription(subscription);
                              setCancelDialogOpen(true);
                            }}
                          >
                            Cancel
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Transaction History */}
        <Card>
          <CardHeader>
            <CardTitle>Transaction History</CardTitle>
            <CardDescription>View your recent transactions</CardDescription>
          </CardHeader>
          <CardContent>
            {transactions.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <p>No transactions</p>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Payment Method</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {transactions.map((transaction) => (
                    <TableRow key={transaction.id}>
                      <TableCell>{new Date(transaction.date).toLocaleDateString()}</TableCell>
                      <TableCell>{transaction.description}</TableCell>
                      <TableCell>{transaction.payment_method}</TableCell>
                      <TableCell className="font-semibold">{transaction.amount}</TableCell>
                      <TableCell>{getStatusBadge(transaction.status)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>

        {/* Invoices */}
        <Card>
          <CardHeader>
            <CardTitle>Invoices</CardTitle>
            <CardDescription>View and download your invoices</CardDescription>
          </CardHeader>
          <CardContent>
            {invoices.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <p>No invoices</p>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Invoice ID</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Due Date</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {invoices.map((invoice) => (
                    <TableRow key={invoice.id}>
                      <TableCell className="font-mono text-sm">{invoice.id}</TableCell>
                      <TableCell>{new Date(invoice.date).toLocaleDateString()}</TableCell>
                      <TableCell>{new Date(invoice.due_date).toLocaleDateString()}</TableCell>
                      <TableCell className="font-semibold">{invoice.amount}</TableCell>
                      <TableCell>{getStatusBadge(invoice.status)}</TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDownloadInvoice(invoice)}
                        >
                          <Download className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>

        {/* Payment Methods */}
        <Card>
          <CardHeader>
            <CardTitle>Payment Methods</CardTitle>
            <CardDescription>Manage your payment methods</CardDescription>
          </CardHeader>
          <CardContent>
            {paymentMethods.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <p>No payment methods</p>
              </div>
            ) : (
              <div className="space-y-3">
                {paymentMethods.map((method) => (
                  <div key={method.id} className="flex items-center justify-between border rounded-lg p-4">
                    <div className="flex items-center gap-3">
                      <CreditCard className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="font-medium">
                          {method.brand} •••• {method.last4}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Expires {method.exp_month}/{method.exp_year}
                        </p>
                      </div>
                      {method.is_default && (
                        <Badge variant="outline" className="ml-2">
                          <Star className="h-3 w-3 mr-1 fill-current" />
                          Default
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      {!method.is_default && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleSetDefaultPayment(method)}
                        >
                          Set as Default
                        </Button>
                      )}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRemovePayment(method)}
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Cancel Subscription Dialog */}
        <Dialog open={cancelDialogOpen} onOpenChange={setCancelDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Cancel Subscription</DialogTitle>
              <DialogDescription>
                Are you sure you want to cancel this subscription? This action cannot be undone.
              </DialogDescription>
            </DialogHeader>
            {selectedSubscription && (
              <div className="py-4">
                <p className="text-sm">
                  <strong>Service:</strong> {selectedSubscription.service}
                </p>
                <p className="text-sm mt-2">
                  <strong>Amount:</strong> {selectedSubscription.amount} / {selectedSubscription.frequency}
                </p>
              </div>
            )}
            <DialogFooter>
              <Button variant="outline" onClick={() => setCancelDialogOpen(false)}>
                Keep Subscription
              </Button>
              <Button variant="destructive" onClick={handleCancelSubscription}>
                Cancel Subscription
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </ManageLayout>
  );
};

export default Billing;
