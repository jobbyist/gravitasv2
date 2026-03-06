import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  LayoutDashboard,
  Server,
  CreditCard,
  MessageSquare,
  Star,
  Users,
  LogOut,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';
import ServicesTab from '@/components/dashboard/ServicesTab';
import BillingTab from '@/components/dashboard/BillingTab';
import SupportTab from '@/components/dashboard/SupportTab';
import FeedbackTab from '@/components/dashboard/FeedbackTab';
import ReferralsTab from '@/components/dashboard/ReferralsTab';
import { useToast } from '@/hooks/use-toast';

const QUICK_STATS = [
  { label: 'Active Services', value: '3', icon: Server, color: 'text-blue-600' },
  { label: 'Pending Invoices', value: '1', icon: CreditCard, color: 'text-yellow-600' },
  { label: 'Open Tickets', value: '1', icon: MessageSquare, color: 'text-purple-600' },
  { label: 'Referrals', value: '2', icon: Users, color: 'text-green-600' },
];

export default function Dashboard() {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { toast } = useToast();

  // Redirect unauthenticated users to login
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  // Handle PayFast return notifications
  useEffect(() => {
    const paymentStatus = searchParams.get('payment');
    if (paymentStatus === 'success') {
      toast({
        title: 'Payment successful!',
        description: 'Your payment has been processed. Thank you!',
      });
    } else if (paymentStatus === 'cancelled') {
      toast({
        title: 'Payment cancelled',
        description: 'Your payment was cancelled. No charges were made.',
        variant: 'destructive',
      });
    }
  }, [searchParams, toast]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (!isAuthenticated || !user) return null;

  const initials = user.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main id="main-content" className="flex-1 py-8">
        <div className="container mx-auto px-4 max-w-6xl space-y-8">
          {/* User Header */}
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-4">
              <Avatar className="h-14 w-14">
                <AvatarFallback className="text-lg font-semibold bg-primary/10 text-primary">
                  {initials}
                </AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-2xl font-bold">Welcome back, {user.name.split(' ')[0]}!</h1>
                <p className="text-muted-foreground text-sm">{user.email}</p>
              </div>
            </div>
            <Button variant="outline" onClick={handleLogout} className="gap-2">
              <LogOut className="h-4 w-4" />
              Log Out
            </Button>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {QUICK_STATS.map((stat) => {
              const Icon = stat.icon;
              return (
                <Card key={stat.label}>
                  <CardContent className="py-4 flex flex-col items-center text-center">
                    <Icon className={`h-6 w-6 mb-2 ${stat.color}`} />
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <p className="text-xs text-muted-foreground">{stat.label}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Dashboard Tabs */}
          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="flex flex-wrap h-auto gap-1 bg-muted p-1 rounded-lg">
              <TabsTrigger value="overview" className="gap-1.5">
                <LayoutDashboard className="h-4 w-4" />
                <span className="hidden sm:inline">Overview</span>
              </TabsTrigger>
              <TabsTrigger value="services" className="gap-1.5">
                <Server className="h-4 w-4" />
                <span className="hidden sm:inline">Services</span>
              </TabsTrigger>
              <TabsTrigger value="billing" className="gap-1.5">
                <CreditCard className="h-4 w-4" />
                <span className="hidden sm:inline">Billing</span>
              </TabsTrigger>
              <TabsTrigger value="support" className="gap-1.5">
                <MessageSquare className="h-4 w-4" />
                <span className="hidden sm:inline">Support</span>
              </TabsTrigger>
              <TabsTrigger value="feedback" className="gap-1.5">
                <Star className="h-4 w-4" />
                <span className="hidden sm:inline">Feedback</span>
              </TabsTrigger>
              <TabsTrigger value="referrals" className="gap-1.5">
                <Users className="h-4 w-4" />
                <span className="hidden sm:inline">Referrals</span>
              </TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-600" />
                      Account Status
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Plan</span>
                      <Badge>Starter</Badge>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Status</span>
                      <span className="font-medium text-green-600">Active</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Member since</span>
                      <span className="font-medium">March 2026</span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <AlertCircle className="h-5 w-5 text-yellow-600" />
                      Action Required
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-start gap-3 rounded-lg bg-yellow-50 dark:bg-yellow-950/20 p-3">
                      <CreditCard className="h-4 w-4 text-yellow-600 shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium">Invoice INV-001 is due</p>
                        <p className="text-xs text-muted-foreground">Web Hosting – March 2026 ($10.00)</p>
                        <Button
                          size="sm"
                          variant="outline"
                          className="mt-2 h-7 text-xs"
                          onClick={() => {
                            const tab = document.querySelector('[data-value="billing"]') as HTMLElement;
                            tab?.click();
                          }}
                        >
                          Go to Billing
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="md:col-span-2">
                  <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                    <CardDescription>Your latest account events</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {[
                        { date: '2026-03-01', text: 'Invoice INV-001 generated for March hosting', type: 'billing' },
                        { date: '2026-02-28', text: 'Support ticket TKT-001 opened', type: 'support' },
                        { date: '2026-02-01', text: 'Invoice INV-002 paid – $10.00', type: 'paid' },
                        { date: '2025-12-15', text: 'Website setup completed', type: 'service' },
                      ].map((event, i) => (
                        <li key={i} className="flex items-start gap-3 text-sm">
                          <span className="text-muted-foreground w-24 shrink-0">{event.date}</span>
                          <span>{event.text}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="services">
              <ServicesTab />
            </TabsContent>

            <TabsContent value="billing">
              <BillingTab />
            </TabsContent>

            <TabsContent value="support">
              <SupportTab />
            </TabsContent>

            <TabsContent value="feedback">
              <FeedbackTab />
            </TabsContent>

            <TabsContent value="referrals">
              <ReferralsTab />
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
}
