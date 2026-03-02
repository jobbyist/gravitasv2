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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { 
  loadSupportData, 
  saveLocalData,
  SupportTicket,
  TicketMessage,
  SupportData
} from '@/lib/clientData';
import { Plus, MessageCircle, AlertCircle, CheckCircle2, Clock } from 'lucide-react';

const SupportTickets = () => {
  const { username } = useParams<{ username: string }>();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [tickets, setTickets] = useState<SupportTicket[]>([]);
  const [selectedTicket, setSelectedTicket] = useState<SupportTicket | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  
  // Form state for new ticket
  const [subject, setSubject] = useState('');
  const [priority, setPriority] = useState('medium');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  
  // Form state for new message
  const [newMessage, setNewMessage] = useState('');
  const [sendingMessage, setSendingMessage] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      if (!username) return;
      
      try {
        const supportData = await loadSupportData(username);
        setTickets(supportData.tickets);
      } catch (error) {
        console.error('Error loading support data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadData();
  }, [username]);

  const handleCreateTicket = async () => {
    if (!username || !subject || !message) {
      toast({
        title: 'Missing information',
        description: 'Please fill in all fields.',
        variant: 'destructive',
      });
      return;
    }
    
    setSubmitting(true);
    try {
      const initialMessage: TicketMessage = {
        id: `msg_${Date.now()}`,
        from: 'You',
        message,
        timestamp: new Date().toISOString(),
      };
      
      const newTicket: SupportTicket = {
        id: `ticket_${Date.now()}`,
        subject,
        status: 'open',
        priority,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        messages: [initialMessage],
      };
      
      const updatedTickets = [newTicket, ...tickets];
      const updatedData: SupportData = {
        tickets: updatedTickets,
      };
      
      saveLocalData(username, 'support', updatedData);
      setTickets(updatedTickets);
      
      toast({
        title: 'Ticket created',
        description: 'Your support ticket has been created successfully.',
      });
      
      // Reset form
      setSubject('');
      setPriority('medium');
      setMessage('');
      setDialogOpen(false);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to create ticket. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleSendMessage = async () => {
    if (!username || !selectedTicket || !newMessage) {
      toast({
        title: 'Missing information',
        description: 'Please enter a message.',
        variant: 'destructive',
      });
      return;
    }
    
    setSendingMessage(true);
    try {
      const ticketMessage: TicketMessage = {
        id: `msg_${Date.now()}`,
        from: 'You',
        message: newMessage,
        timestamp: new Date().toISOString(),
      };
      
      const updatedTicket: SupportTicket = {
        ...selectedTicket,
        messages: [...selectedTicket.messages, ticketMessage],
        updated_at: new Date().toISOString(),
      };
      
      const updatedTickets = tickets.map(t => 
        t.id === selectedTicket.id ? updatedTicket : t
      );
      
      const updatedData: SupportData = {
        tickets: updatedTickets,
      };
      
      saveLocalData(username, 'support', updatedData);
      setTickets(updatedTickets);
      setSelectedTicket(updatedTicket);
      
      toast({
        title: 'Message sent',
        description: 'Your message has been added to the ticket.',
      });
      
      setNewMessage('');
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to send message. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setSendingMessage(false);
    }
  };

  const handleViewTicket = (ticket: SupportTicket) => {
    setSelectedTicket(ticket);
    setViewDialogOpen(true);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'open':
        return <Badge variant="default"><AlertCircle className="h-3 w-3 mr-1" />Open</Badge>;
      case 'in_progress':
        return <Badge variant="secondary"><Clock className="h-3 w-3 mr-1" />In Progress</Badge>;
      case 'resolved':
        return <Badge variant="outline" className="border-green-500 text-green-700"><CheckCircle2 className="h-3 w-3 mr-1" />Resolved</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'high':
        return <Badge variant="destructive">High</Badge>;
      case 'medium':
        return <Badge variant="default">Medium</Badge>;
      case 'low':
        return <Badge variant="secondary">Low</Badge>;
      default:
        return <Badge variant="secondary">{priority}</Badge>;
    }
  };

  if (loading) {
    return (
      <ManageLayout>
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading support tickets...</p>
        </div>
      </ManageLayout>
    );
  }

  return (
    <ManageLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Support Tickets</h1>
            <p className="text-muted-foreground">
              Manage your support requests and get help
            </p>
          </div>
          
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                New Ticket
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create Support Ticket</DialogTitle>
                <DialogDescription>
                  Submit a new support request
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input
                    id="subject"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="Brief description of the issue"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="priority">Priority</Label>
                  <Select value={priority} onValueChange={setPriority}>
                    <SelectTrigger id="priority">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Describe your issue in detail..."
                    rows={6}
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleCreateTicket} disabled={submitting}>
                  {submitting ? 'Creating...' : 'Create Ticket'}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Tickets List */}
        <Card>
          <CardHeader>
            <CardTitle>Your Tickets</CardTitle>
            <CardDescription>View and manage your support tickets</CardDescription>
          </CardHeader>
          <CardContent>
            {tickets.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                <MessageCircle className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p className="text-lg font-medium">No support tickets</p>
                <p className="text-sm mt-2">Create a ticket to get help from our support team</p>
              </div>
            ) : (
              <div className="space-y-4">
                {tickets.map((ticket) => (
                  <div 
                    key={ticket.id} 
                    className="border rounded-lg p-4 hover:bg-accent/50 cursor-pointer transition-colors"
                    onClick={() => handleViewTicket(ticket)}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg mb-1">{ticket.subject}</h3>
                        <div className="flex items-center gap-2 flex-wrap">
                          {getStatusBadge(ticket.status)}
                          {getPriorityBadge(ticket.priority)}
                        </div>
                      </div>
                      <MessageCircle className="h-5 w-5 text-muted-foreground" />
                    </div>
                    
                    <div className="flex items-center justify-between mt-3 pt-3 border-t text-sm text-muted-foreground">
                      <span>Created: {new Date(ticket.created_at).toLocaleDateString()}</span>
                      <span>{ticket.messages.length} message{ticket.messages.length !== 1 ? 's' : ''}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* View Ticket Dialog */}
        <Dialog open={viewDialogOpen} onOpenChange={setViewDialogOpen}>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{selectedTicket?.subject}</DialogTitle>
              <DialogDescription>
                <div className="flex items-center gap-2 mt-2">
                  {selectedTicket && getStatusBadge(selectedTicket.status)}
                  {selectedTicket && getPriorityBadge(selectedTicket.priority)}
                </div>
              </DialogDescription>
            </DialogHeader>
            
            {selectedTicket && (
              <div className="space-y-4 py-4">
                {/* Messages Thread */}
                <div className="space-y-4">
                  {selectedTicket.messages.map((msg) => (
                    <div 
                      key={msg.id} 
                      className={`rounded-lg p-4 ${
                        msg.from === 'You' ? 'bg-primary/10 ml-8' : 'bg-muted mr-8'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-semibold text-sm">{msg.from}</span>
                        <span className="text-xs text-muted-foreground">
                          {new Date(msg.timestamp).toLocaleString()}
                        </span>
                      </div>
                      <p className="text-sm whitespace-pre-wrap">{msg.message}</p>
                    </div>
                  ))}
                </div>
                
                {/* Add Message */}
                {selectedTicket.status !== 'resolved' && (
                  <div className="space-y-2 pt-4 border-t">
                    <Label htmlFor="newMessage">Add a message</Label>
                    <Textarea
                      id="newMessage"
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      placeholder="Type your message..."
                      rows={4}
                    />
                    <div className="flex justify-end">
                      <Button onClick={handleSendMessage} disabled={sendingMessage || !newMessage}>
                        {sendingMessage ? 'Sending...' : 'Send Message'}
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </ManageLayout>
  );
};

export default SupportTickets;
