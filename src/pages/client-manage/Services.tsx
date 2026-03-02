import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ManageLayout from './ManageLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { 
  loadServicesData, 
  saveLocalData,
  Service,
  ServiceRequest,
  ServicesData
} from '@/lib/clientData';
import { Plus, CheckCircle2, Clock } from 'lucide-react';

const Services = () => {
  const { username } = useParams<{ username: string }>();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [services, setServices] = useState<Service[]>([]);
  const [serviceRequests, setServiceRequests] = useState<ServiceRequest[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  
  // Form state for new service request
  const [serviceName, setServiceName] = useState('');
  const [description, setDescription] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      if (!username) return;
      
      try {
        const servicesData = await loadServicesData(username);
        setServices(servicesData.services);
        setServiceRequests(servicesData.service_requests);
      } catch (error) {
        console.error('Error loading services data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadData();
  }, [username]);

  const handleSubmitRequest = async () => {
    if (!username || !serviceName || !description) {
      toast({
        title: 'Missing information',
        description: 'Please fill in all fields.',
        variant: 'destructive',
      });
      return;
    }
    
    setSubmitting(true);
    try {
      const newRequest: ServiceRequest = {
        id: `req_${Date.now()}`,
        service_name: serviceName,
        description,
        status: 'pending',
        created_at: new Date().toISOString(),
      };
      
      const updatedRequests = [...serviceRequests, newRequest];
      const updatedData: ServicesData = {
        services,
        service_requests: updatedRequests,
      };
      
      saveLocalData(username, 'services', updatedData);
      setServiceRequests(updatedRequests);
      
      toast({
        title: 'Request submitted',
        description: 'Your service request has been submitted successfully.',
      });
      
      // Reset form
      setServiceName('');
      setDescription('');
      setDialogOpen(false);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to submit request. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <ManageLayout>
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading services...</p>
        </div>
      </ManageLayout>
    );
  }

  return (
    <ManageLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Services</h1>
            <p className="text-muted-foreground">
              View your active services and request new ones
            </p>
          </div>
          
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Request Service
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Request New Service</DialogTitle>
                <DialogDescription>
                  Fill out the form below to request a new service
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="serviceName">Service Name</Label>
                  <Input
                    id="serviceName"
                    value={serviceName}
                    onChange={(e) => setServiceName(e.target.value)}
                    placeholder="e.g., Email Marketing"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Describe your service requirements..."
                    rows={4}
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleSubmitRequest} disabled={submitting}>
                  {submitting ? 'Submitting...' : 'Submit Request'}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Active Services */}
        <Card>
          <CardHeader>
            <CardTitle>Active Services</CardTitle>
            <CardDescription>Your currently active services</CardDescription>
          </CardHeader>
          <CardContent>
            {services.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <p>No active services</p>
                <p className="text-sm mt-2">Request a service to get started</p>
              </div>
            ) : (
              <div className="space-y-4">
                {services.map((service) => (
                  <div key={service.id} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-semibold text-lg">{service.name}</h3>
                        <p className="text-sm text-muted-foreground">{service.description}</p>
                      </div>
                      <Badge variant={service.status === 'active' ? 'default' : 'secondary'}>
                        {service.status}
                      </Badge>
                    </div>
                    
                    {service.plan && (
                      <div className="mt-2">
                        <Badge variant="outline">{service.plan}</Badge>
                      </div>
                    )}
                    
                    {service.features && service.features.length > 0 && (
                      <ul className="mt-3 space-y-1">
                        {service.features.map((feature, index) => (
                          <li key={index} className="text-sm flex items-center gap-2">
                            <CheckCircle2 className="h-3 w-3 text-green-500" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    )}
                    
                    <div className="flex items-center justify-between mt-4 pt-4 border-t">
                      {service.price && (
                        <span className="font-semibold">{service.price}</span>
                      )}
                      {service.next_billing_date && (
                        <span className="text-sm text-muted-foreground">
                          Next billing: {new Date(service.next_billing_date).toLocaleDateString()}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Service Requests */}
        {serviceRequests.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Service Requests</CardTitle>
              <CardDescription>Your pending and completed service requests</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {serviceRequests.map((request) => (
                  <div key={request.id} className="flex items-start justify-between border-b pb-3 last:border-0 last:pb-0">
                    <div className="flex items-start gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground mt-1" />
                      <div>
                        <h4 className="font-medium">{request.service_name}</h4>
                        <p className="text-sm text-muted-foreground">{request.description}</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          Requested: {new Date(request.created_at).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <Badge variant={request.status === 'pending' ? 'secondary' : 'default'}>
                      {request.status}
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

export default Services;
