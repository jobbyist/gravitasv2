import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { MessageSquare, PlusCircle, Clock, CheckCircle2, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Ticket {
  id: string;
  subject: string;
  category: string;
  status: 'open' | 'in-progress' | 'resolved';
  createdAt: string;
  lastUpdate: string;
}

const INITIAL_TICKETS: Ticket[] = [
  {
    id: 'TKT-001',
    subject: 'Email not receiving messages',
    category: 'Email',
    status: 'in-progress',
    createdAt: '2026-02-28',
    lastUpdate: '2026-03-01',
  },
];

function statusIcon(status: Ticket['status']) {
  if (status === 'resolved') return <CheckCircle2 className="h-4 w-4 text-green-600" />;
  if (status === 'in-progress') return <Clock className="h-4 w-4 text-yellow-600" />;
  return <AlertCircle className="h-4 w-4 text-blue-600" />;
}

function statusLabel(status: Ticket['status']) {
  if (status === 'in-progress') return 'In Progress';
  return status.charAt(0).toUpperCase() + status.slice(1);
}

export default function SupportTab() {
  const { toast } = useToast();
  const [tickets, setTickets] = useState<Ticket[]>(INITIAL_TICKETS);
  const [showForm, setShowForm] = useState(false);
  const [subject, setSubject] = useState('');
  const [category, setCategory] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject.trim() || !category || !message.trim()) return;
    setIsSubmitting(true);

    await new Promise((r) => setTimeout(r, 800));

    const newTicket: Ticket = {
      id: `TKT-${String(tickets.length + 2).padStart(3, '0')}`,
      subject,
      category,
      status: 'open',
      createdAt: new Date().toISOString().split('T')[0],
      lastUpdate: new Date().toISOString().split('T')[0],
    };

    setTickets((prev) => [newTicket, ...prev]);
    setSubject('');
    setCategory('');
    setMessage('');
    setShowForm(false);
    setIsSubmitting(false);

    toast({ title: 'Ticket submitted!', description: `Your ticket ${newTicket.id} has been created. We'll respond within 24 hours.` });
  };

  return (
    <div className="space-y-8">
      {/* New Ticket */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Support Tickets</h2>
        <Button onClick={() => setShowForm((v) => !v)}>
          <PlusCircle className="h-4 w-4 mr-2" />
          New Ticket
        </Button>
      </div>

      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              Create Support Request
            </CardTitle>
            <CardDescription>We'll get back to you within 24 hours on business days.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="ticket-subject">Subject</Label>
                  <Input
                    id="ticket-subject"
                    placeholder="Brief description of your issue"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    required
                    disabled={isSubmitting}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="ticket-category">Category</Label>
                  <Select value={category} onValueChange={setCategory} required>
                    <SelectTrigger id="ticket-category">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Billing">Billing</SelectItem>
                      <SelectItem value="Email">Email</SelectItem>
                      <SelectItem value="Hosting">Hosting</SelectItem>
                      <SelectItem value="Website">Website</SelectItem>
                      <SelectItem value="Domain">Domain</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="ticket-message">Message</Label>
                <Textarea
                  id="ticket-message"
                  placeholder="Describe your issue in detail…"
                  rows={5}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                  disabled={isSubmitting}
                />
              </div>
              <div className="flex gap-3">
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? 'Submitting…' : 'Submit Ticket'}
                </Button>
                <Button type="button" variant="outline" onClick={() => setShowForm(false)}>
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Ticket List */}
      {tickets.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center text-muted-foreground">
            <MessageSquare className="h-10 w-10 mx-auto mb-3 opacity-40" />
            <p>No support tickets yet. Click "New Ticket" to get help.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {tickets.map((ticket) => (
            <Card key={ticket.id}>
              <CardContent className="py-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3 min-w-0">
                    {statusIcon(ticket.status)}
                    <div className="min-w-0">
                      <p className="font-medium truncate">{ticket.subject}</p>
                      <p className="text-sm text-muted-foreground">
                        {ticket.id} · {ticket.category} · Opened {ticket.createdAt}
                      </p>
                    </div>
                  </div>
                  <Badge variant="outline" className="shrink-0">{statusLabel(ticket.status)}</Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
