import { ReactNode } from 'react';
import { Link, useParams, useLocation } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { 
  LayoutDashboard, 
  User, 
  Briefcase, 
  Headphones, 
  CreditCard, 
  MessageSquare,
  Settings,
  UserCircle,
  LogOut
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';

interface ManageLayoutProps {
  children: ReactNode;
}

const ManageLayout = ({ children }: ManageLayoutProps) => {
  const { username } = useParams<{ username: string }>();
  const location = useLocation();
  const { logout } = useAuth();

  const navItems = [
    { href: `/client-area/${username}/manage/overview`, label: 'Overview', icon: LayoutDashboard },
    { href: `/client-area/${username}/manage/profile`, label: 'Profile', icon: User },
    { href: `/client-area/${username}/manage/services`, label: 'Services', icon: Briefcase },
    { href: `/client-area/${username}/manage/support`, label: 'Support Tickets', icon: Headphones },
    { href: `/client-area/${username}/manage/billing`, label: 'Billing', icon: CreditCard },
    { href: `/client-area/${username}/manage/account-manager`, label: 'Account Manager', icon: MessageSquare },
    { href: `/client-area/${username}/manage/settings`, label: 'Settings', icon: Settings },
    { href: `/client-area/${username}/manage/account`, label: 'Account', icon: UserCircle },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <div className="flex-1 container py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar Navigation */}
          <aside className="w-full md:w-64 shrink-0">
            <div className="sticky top-8 space-y-2">
              <div className="mb-4">
                <h2 className="text-lg font-semibold mb-2">Client Portal</h2>
                <Link to={`/client-area/${username}`}>
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    View Public Portal
                  </Button>
                </Link>
              </div>
              
              <nav className="space-y-1">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = location.pathname === item.href;
                  
                  return (
                    <Link key={item.href} to={item.href}>
                      <Button
                        variant={isActive ? 'secondary' : 'ghost'}
                        className={cn('w-full justify-start', isActive && 'bg-secondary')}
                      >
                        <Icon className="h-4 w-4 mr-2" />
                        {item.label}
                      </Button>
                    </Link>
                  );
                })}
              </nav>
              
              <div className="pt-4">
                <Button 
                  variant="ghost" 
                  className="w-full justify-start text-destructive hover:text-destructive"
                  onClick={logout}
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign Out
                </Button>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 min-w-0">
            {children}
          </main>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ManageLayout;
