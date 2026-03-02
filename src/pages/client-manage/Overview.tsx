import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ManageLayout from './ManageLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  loadAccountData, 
  loadServicesData, 
  loadBillingData, 
  loadSupportData,
  ClientAccount,
  Service,
  SupportTicket
} from '@/lib/clientData';
import { Briefcase, CreditCard, Headphones, CheckCircle2, Clock } from 'lucide-react';

const Overview = () => {
  const { username } = useParams<{ username: string }>();
  const [account, setAccount] = useState<ClientAccount | null>(null);
  const [services, setServices] = useState<Service[]>([]);
  const [activeTickets, setActiveTickets] = useState<SupportTicket[]>([]);
  const [upcomingBilling, setUpcomingBilling] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      if (!username) return;
      
      try {
        const [accountData, servicesData, billingData, supportData] = await Promise.all([
          loadAccountData(username),
          loadServicesData(username),
          loadBillingData(username),
          loadSupportData(username),
        ]);
        
        setAccount(accountData);
        setServices(servicesData.services);
        setActiveTickets(supportData.tickets.filter(t => t.status !== 'resolved'));
        
        // Find next billing date
        const dates = billingData.subscriptions
          .filter(s => s.status === 'active' && s.next_billing_date)
          .map(s => s.next_billing_date)
          .sort();
        
        if (dates.length > 0) {
          setUpcomingBilling(dates[0]);
        }
      } catch (error) {
        console.error('Error loading overview data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadData();
  }, [username]);

  if (loading) {
    return (
      <ManageLayout>
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading overview...</p>
        </div>
      </ManageLayout>
    );
  }

  const activeServices = services.filter(s => s.status === 'active');

  return (
    <ManageLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Overview</h1>
          <p className="text-muted-foreground">
            Welcome back! Here's a summary of your account.
          </p>
        </div>

        {/* Account Status */}
        <Card>
          <CardHeader>
            <CardTitle>Account Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Badge variant={account?.account_status === 'active' ? 'default' : 'secondary'} className="text-sm">
                {account?.account_status || 'Unknown'}
              </Badge>
              {account?.account_status === 'active' && (
                <span className="text-sm text-muted-foreground flex items-center gap-1">
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                  All systems operational
                </span>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Services</CardTitle>
              <Briefcase className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{activeServices.length}</div>
              <p className="text-xs text-muted-foreground">
                {activeServices.length === 0 ? 'No active services' : `${activeServices.length} service${activeServices.length !== 1 ? 's' : ''} running`}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Open Tickets</CardTitle>
              <Headphones className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{activeTickets.length}</div>
              <p className="text-xs text-muted-foreground">
                {activeTickets.length === 0 ? 'No open tickets' : `${activeTickets.length} ticket${activeTickets.length !== 1 ? 's' : ''} pending`}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Next Billing</CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {upcomingBilling ? new Date(upcomingBilling).toLocaleDateString() : 'N/A'}
              </div>
              <p className="text-xs text-muted-foreground">
                {upcomingBilling ? 'Automatic payment scheduled' : 'No upcoming payments'}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Recent Services */}
        {activeServices.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Active Services</CardTitle>
              <CardDescription>Your currently active services</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {activeServices.map((service) => (
                  <div key={service.id} className="flex items-start justify-between border-b pb-4 last:border-0 last:pb-0">
                    <div>
                      <h4 className="font-medium">{service.name}</h4>
                      <p className="text-sm text-muted-foreground">{service.description}</p>
                      {service.plan && (
                        <Badge variant="outline" className="mt-1">
                          {service.plan}
                        </Badge>
                      )}
                    </div>
                    <div className="text-right">
                      <Badge variant="default" className="mb-1">
                        {service.status}
                      </Badge>
                      {service.price && (
                        <p className="text-sm font-medium">{service.price}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Active Support Tickets */}
        {activeTickets.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Open Support Tickets</CardTitle>
              <CardDescription>Tickets that need attention</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {activeTickets.map((ticket) => (
                  <div key={ticket.id} className="flex items-start justify-between border-b pb-3 last:border-0 last:pb-0">
                    <div className="flex items-start gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground mt-1" />
                      <div>
                        <h4 className="font-medium">{ticket.subject}</h4>
                        <p className="text-sm text-muted-foreground">
                          Created: {new Date(ticket.created_at).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <Badge variant={ticket.priority === 'high' ? 'destructive' : 'secondary'}>
                      {ticket.priority}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </ManageLayout>
  );
};

export default Overview;
