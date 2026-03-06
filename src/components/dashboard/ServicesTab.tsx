import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Globe, Mail, Shield, ArrowRight, XCircle, PlusCircle } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { useToast } from '@/hooks/use-toast';

interface Service {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'pending' | 'cancelled';
  price: string;
  renewsOn: string;
  icon: React.ElementType;
}

const INITIAL_SERVICES: Service[] = [
  {
    id: 'web-hosting',
    name: 'Standard Web Hosting',
    description: 'Fast and reliable website hosting',
    status: 'active',
    price: '$10/month',
    renewsOn: '2026-04-01',
    icon: Globe,
  },
  {
    id: 'email',
    name: 'Professional Email (5 users)',
    description: 'Business email addresses',
    status: 'active',
    price: '$1.99/month',
    renewsOn: '2026-04-01',
    icon: Mail,
  },
  {
    id: 'ssl',
    name: 'SSL Certificate',
    description: 'Secure HTTPS for your domain',
    status: 'active',
    price: 'Included',
    renewsOn: '2027-01-01',
    icon: Shield,
  },
];

const AVAILABLE_SERVICES = [
  { name: 'SEO Optimisation', price: 'From $99/month', description: 'Improve your search engine rankings' },
  { name: 'Social Media Management', price: 'From $149/month', description: 'Grow your social media presence' },
  { name: 'PWA Functionality', price: '$299 once-off', description: 'Turn your website into an installable app' },
  { name: 'E-Commerce Integration', price: '$499 once-off', description: 'Accept payments online' },
  { name: 'Analytics Dashboard', price: '$9.99/month', description: 'Detailed insights into your website traffic' },
];

export default function ServicesTab() {
  const [services, setServices] = useState<Service[]>(INITIAL_SERVICES);
  const { toast } = useToast();

  const cancelService = (id: string) => {
    setServices((prev) =>
      prev.map((s) => (s.id === id ? { ...s, status: 'cancelled' as const } : s))
    );
    toast({ title: 'Cancellation requested', description: 'Your cancellation request has been submitted.' });
  };

  const statusColor = (status: Service['status']) => {
    if (status === 'active') return 'default';
    if (status === 'pending') return 'secondary';
    return 'destructive';
  };

  return (
    <div className="space-y-8">
      {/* Active Services */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Your Active Services</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <Card key={service.id}>
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      <Icon className="h-5 w-5 text-primary" />
                      <CardTitle className="text-base">{service.name}</CardTitle>
                    </div>
                    <Badge variant={statusColor(service.status)} className="capitalize text-xs">
                      {service.status}
                    </Badge>
                  </div>
                  <CardDescription>{service.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Price</span>
                    <span className="font-medium">{service.price}</span>
                  </div>
                  {service.renewsOn && (
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Renews</span>
                      <span className="font-medium">{service.renewsOn}</span>
                    </div>
                  )}
                  {service.status === 'active' && (
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="outline" size="sm" className="w-full text-destructive hover:text-destructive">
                          <XCircle className="h-4 w-4 mr-1" />
                          Cancel Service
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Cancel {service.name}?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This will cancel your subscription at the end of the current billing period. You will
                            continue to have access until {service.renewsOn}.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Keep Service</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => cancelService(service.id)}
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                          >
                            Yes, Cancel
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Add New Services */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Add New Services</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {AVAILABLE_SERVICES.map((service) => (
            <Card key={service.name} className="border-dashed">
              <CardHeader className="pb-3">
                <CardTitle className="text-base">{service.name}</CardTitle>
                <CardDescription>{service.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm font-medium text-primary">{service.price}</p>
                <Button size="sm" className="w-full" asChild>
                  <a href="/contact">
                    <PlusCircle className="h-4 w-4 mr-1" />
                    Add Service
                    <ArrowRight className="h-4 w-4 ml-1" />
                  </a>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
