import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ManageLayout from './ManageLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { useToast } from '@/hooks/use-toast';
import { 
  loadAccountData, 
  loadBillingData,
  saveLocalData,
  ClientAccount,
  BillingData
} from '@/lib/clientData';
import { AlertTriangle, CheckCircle2, Pause, Play, Trash2, XCircle } from 'lucide-react';

const Account = () => {
  const { username } = useParams<{ username: string }>();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [account, setAccount] = useState<ClientAccount | null>(null);
  const [billingData, setBillingData] = useState<BillingData | null>(null);

  useEffect(() => {
    const loadData = async () => {
      if (!username) return;
      
      try {
        const accountData = await loadAccountData(username);
        const billing = await loadBillingData(username);
        setAccount(accountData);
        setBillingData(billing);
      } catch (error) {
        console.error('Error loading account data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadData();
  }, [username]);

  const handlePauseAccount = async () => {
    if (!username || !account) return;
    
    try {
      const updatedAccount: ClientAccount = {
        ...account,
        account_status: 'paused',
      };
      
      saveLocalData(username, 'account', updatedAccount);
      setAccount(updatedAccount);
      
      toast({
        title: 'Account paused',
        description: 'Your account has been paused successfully.',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to pause account. Please try again.',
        variant: 'destructive',
      });
    }
  };

  const handleActivateAccount = async () => {
    if (!username || !account) return;
    
    try {
      const updatedAccount: ClientAccount = {
        ...account,
        account_status: 'active',
      };
      
      saveLocalData(username, 'account', updatedAccount);
      setAccount(updatedAccount);
      
      toast({
        title: 'Account activated',
        description: 'Your account has been activated successfully.',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to activate account. Please try again.',
        variant: 'destructive',
      });
    }
  };

  const handleDeleteAccount = async () => {
    if (!username || !account) return;
    
    try {
      const updatedAccount: ClientAccount = {
        ...account,
        account_status: 'deleted',
      };
      
      saveLocalData(username, 'account', updatedAccount);
      setAccount(updatedAccount);
      
      toast({
        title: 'Account deleted',
        description: 'Your account has been marked for deletion.',
        variant: 'destructive',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to delete account. Please try again.',
        variant: 'destructive',
      });
    }
  };

  const handleCancelAllSubscriptions = async () => {
    if (!username || !billingData) return;
    
    try {
      const updatedSubscriptions = billingData.subscriptions.map(sub => ({
        ...sub,
        status: 'cancelled',
        auto_renew: false,
      }));
      
      const updatedBillingData: BillingData = {
        ...billingData,
        subscriptions: updatedSubscriptions,
      };
      
      saveLocalData(username, 'billing', updatedBillingData);
      setBillingData(updatedBillingData);
      
      toast({
        title: 'Subscriptions cancelled',
        description: 'All active subscriptions have been cancelled.',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to cancel subscriptions. Please try again.',
        variant: 'destructive',
      });
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return (
          <Badge variant="default" className="text-base">
            <CheckCircle2 className="h-4 w-4 mr-1" />
            Active
          </Badge>
        );
      case 'paused':
        return (
          <Badge variant="secondary" className="text-base">
            <Pause className="h-4 w-4 mr-1" />
            Paused
          </Badge>
        );
      case 'deleted':
        return (
          <Badge variant="destructive" className="text-base">
            <XCircle className="h-4 w-4 mr-1" />
            Deleted
          </Badge>
        );
      default:
        return <Badge variant="outline" className="text-base">{status}</Badge>;
    }
  };

  if (loading) {
    return (
      <ManageLayout>
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading account information...</p>
        </div>
      </ManageLayout>
    );
  }

  const activeSubscriptions = billingData?.subscriptions.filter(
    sub => sub.status === 'active'
  ) || [];

  return (
    <ManageLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Account Management</h1>
          <p className="text-muted-foreground">
            Manage your account status and settings
          </p>
        </div>

        {/* Account Status */}
        <Card>
          <CardHeader>
            <CardTitle>Account Status</CardTitle>
            <CardDescription>Current status of your account</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-2">Status</p>
                {account && getStatusBadge(account.account_status)}
              </div>
              <div className="flex gap-2">
                {account?.account_status === 'active' && (
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="outline">
                        <Pause className="h-4 w-4 mr-2" />
                        Pause Account
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Pause Account</AlertDialogTitle>
                        <AlertDialogDescription>
                          Are you sure you want to pause your account? You can reactivate it at any time.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handlePauseAccount}>
                          Pause Account
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                )}
                
                {account?.account_status === 'paused' && (
                  <Button onClick={handleActivateAccount}>
                    <Play className="h-4 w-4 mr-2" />
                    Activate Account
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Active Subscriptions */}
        {activeSubscriptions.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Active Subscriptions</CardTitle>
              <CardDescription>
                {activeSubscriptions.length} active subscription{activeSubscriptions.length !== 1 ? 's' : ''}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                {activeSubscriptions.map((subscription) => (
                  <div key={subscription.id} className="flex items-center justify-between border rounded-lg p-3">
                    <div>
                      <p className="font-medium">{subscription.service}</p>
                      <p className="text-sm text-muted-foreground">
                        {subscription.amount} / {subscription.frequency}
                      </p>
                    </div>
                    <Badge variant="default">Active</Badge>
                  </div>
                ))}
              </div>
              
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="outline" className="w-full mt-4">
                    <XCircle className="h-4 w-4 mr-2" />
                    Cancel All Subscriptions
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Cancel All Subscriptions</AlertDialogTitle>
                    <AlertDialogDescription>
                      Are you sure you want to cancel all active subscriptions? This action cannot be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction 
                      onClick={handleCancelAllSubscriptions}
                      className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                    >
                      Cancel All
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </CardContent>
          </Card>
        )}

        {/* Danger Zone */}
        <Card className="border-destructive">
          <CardHeader>
            <CardTitle className="text-destructive flex items-center">
              <AlertTriangle className="h-5 w-5 mr-2" />
              Danger Zone
            </CardTitle>
            <CardDescription>
              Irreversible and destructive actions
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="border border-destructive/50 rounded-lg p-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="font-semibold text-destructive mb-1">Delete Account</h3>
                  <p className="text-sm text-muted-foreground">
                    Permanently delete your account and all associated data. This action cannot be undone.
                  </p>
                  {activeSubscriptions.length > 0 && (
                    <p className="text-sm text-destructive mt-2">
                      Warning: You have {activeSubscriptions.length} active subscription{activeSubscriptions.length !== 1 ? 's' : ''}. 
                      Please cancel them before deleting your account.
                    </p>
                  )}
                </div>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button 
                      variant="destructive" 
                      className="ml-4"
                      disabled={activeSubscriptions.length > 0}
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete Account
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete your account
                        and remove all your data from our servers.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction 
                        onClick={handleDeleteAccount}
                        className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                      >
                        Delete Account
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </ManageLayout>
  );
};

export default Account;
