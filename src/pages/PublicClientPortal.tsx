import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  loadAccountData, 
  loadServicesData, 
  loadBillingData, 
  loadSupportData,
  loadMessagingData,
  ACCOUNT_MANAGER,
  ClientAccount 
} from '@/lib/clientData';
import { 
  Building2, 
  Globe, 
  Mail, 
  Phone, 
  MapPin, 
  CreditCard, 
  MessageSquare, 
  Headphones,
  Settings,
  User
} from 'lucide-react';

const PublicClientPortal = () => {
  const { username } = useParams<{ username: string }>();
  const { user, isAuthenticated } = useAuth();
  const [account, setAccount] = useState<ClientAccount | null>(null);
  const [loading, setLoading] = useState(true);
  const [servicesCount, setServicesCount] = useState(0);
  const [ticketsCount, setTicketsCount] = useState(0);

  useEffect(() => {
    const loadData = async () => {
      if (!username) return;
      
      setLoading(true);
      try {
        const accountData = await loadAccountData(username);
        setAccount(accountData);
        
        const servicesData = await loadServicesData(username);
        setServicesCount(servicesData.services.length);
        
        const supportData = await loadSupportData(username);
        setTicketsCount(supportData.tickets.length);
      } catch (error) {
        console.error('Error loading client data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadData();
  }, [username]);

  const isOwner = isAuthenticated && user?.username === username;

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container py-16">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading client portal...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!account) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container py-16">
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle>Client Not Found</CardTitle>
              <CardDescription>The client portal you're looking for doesn't exist.</CardDescription>
            </CardHeader>
            <CardContent>
              <Link to="/client-dashboard">
                <Button>Go to Client Dashboard</Button>
              </Link>
            </CardContent>
          </Card>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container py-8 md:py-16">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <h1 className="text-3xl md:text-4xl font-bold mb-2">{account.client_name}</h1>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Building2 className="h-4 w-4" />
                <span>Client Portal</span>
                <Badge variant={account.account_status === 'active' ? 'default' : 'secondary'}>
                  {account.account_status}
                </Badge>
              </div>
            </div>
            
            {isOwner && (
              <Link to={`/client-area/${username}/manage/overview`}>
                <Button>
                  <Settings className="h-4 w-4 mr-2" />
                  Manage Account
                </Button>
              </Link>
            )}
          </div>
          
          {account.profile?.bio && (
            <p className="text-muted-foreground mt-4">{account.profile.bio}</p>
          )}
        </div>

        <Separator className="my-8" />

        {/* Contact Information */}
        <div className="grid gap-6 md:grid-cols-2 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {account.website && (
                <div className="flex items-center gap-3">
                  <Globe className="h-4 w-4 text-muted-foreground" />
                  <a href={account.website} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                    {account.website}
                  </a>
                </div>
              )}
              {account.contact_info?.email && (
                <div className="flex items-center gap-3">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <a href={`mailto:${account.contact_info.email}`} className="text-primary hover:underline">
                    {account.contact_info.email}
                  </a>
                </div>
              )}
              {account.contact_info?.phone && (
                <div className="flex items-center gap-3">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <a href={`tel:${account.contact_info.phone}`} className="text-primary hover:underline">
                    {account.contact_info.phone}
                  </a>
                </div>
              )}
              {account.contact_info?.address && (
                <div className="flex items-center gap-3">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span>{account.contact_info.address}</span>
                </div>
              )}
              {!account.website && !account.contact_info?.email && !account.contact_info?.phone && (
                <p className="text-sm text-muted-foreground">No public contact information available.</p>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Account Manager</CardTitle>
              <CardDescription>Your dedicated point of contact</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-3">
                <User className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">{ACCOUNT_MANAGER.name}</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <a href={`mailto:${ACCOUNT_MANAGER.email}`} className="text-primary hover:underline">
                  {ACCOUNT_MANAGER.email}
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <a href={`tel:${ACCOUNT_MANAGER.phone}`} className="text-primary hover:underline">
                  {ACCOUNT_MANAGER.phone}
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Globe className="h-4 w-4 text-muted-foreground" />
                <a href={ACCOUNT_MANAGER.website} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                  Portfolio
                </a>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Services Summary */}
        <div className="grid gap-6 md:grid-cols-3 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Services</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold mb-2">{servicesCount}</div>
              <p className="text-sm text-muted-foreground">
                {servicesCount === 0 ? 'No active services' : 'Active services'}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Billing</CardTitle>
            </CardHeader>
            <CardContent>
              <CreditCard className="h-8 w-8 text-muted-foreground mb-2" />
              <p className="text-sm text-muted-foreground">
                Billing information available in management area
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Support</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold mb-2">{ticketsCount}</div>
              <p className="text-sm text-muted-foreground">
                {ticketsCount === 0 ? 'No support tickets' : 'Total tickets'}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Call to Action */}
        {!isOwner && (
          <Card className="bg-muted/50">
            <CardContent className="pt-6">
              <div className="text-center">
                <h3 className="text-xl font-semibold mb-2">Access Your Client Portal</h3>
                <p className="text-muted-foreground mb-4">
                  Sign in to manage your services, billing, and support tickets.
                </p>
                <Link to="/client-dashboard">
                  <Button size="lg">Sign In</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default PublicClientPortal;
