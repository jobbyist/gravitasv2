import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ManageLayout from './ManageLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useToast } from '@/hooks/use-toast';
import { 
  loadMessagingData, 
  saveLocalData,
  ACCOUNT_MANAGER,
  ConversationMessage,
  Conversation,
  MessagingData
} from '@/lib/clientData';
import { Mail, Phone, Globe, Send, Star } from 'lucide-react';

const AccountManager = () => {
  const { username } = useParams<{ username: string }>();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [conversation, setConversation] = useState<Conversation | null>(null);
  const [newMessage, setNewMessage] = useState('');
  const [sending, setSending] = useState(false);
  const [rating, setRating] = useState(0);

  useEffect(() => {
    const loadData = async () => {
      if (!username) return;
      
      try {
        const messagingData = await loadMessagingData(username);
        
        // Find or create conversation with account manager
        const existingConversation = messagingData.conversations.find(
          conv => conv.with === ACCOUNT_MANAGER.name
        );
        
        if (existingConversation) {
          setConversation(existingConversation);
        } else {
          // Create empty conversation
          const newConversation: Conversation = {
            id: `conv_${Date.now()}`,
            with: ACCOUNT_MANAGER.name,
            messages: [],
          };
          setConversation(newConversation);
        }
        
        // Load rating from localStorage
        const savedRating = localStorage.getItem(`gravitas_client_${username}_manager_rating`);
        if (savedRating) {
          setRating(parseInt(savedRating, 10));
        }
      } catch (error) {
        console.error('Error loading messaging data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadData();
  }, [username]);

  const handleSendMessage = async () => {
    if (!username || !newMessage.trim() || !conversation) {
      toast({
        title: 'Missing information',
        description: 'Please enter a message.',
        variant: 'destructive',
      });
      return;
    }
    
    setSending(true);
    try {
      const message: ConversationMessage = {
        id: `msg_${Date.now()}`,
        from: 'You',
        message: newMessage,
        timestamp: new Date().toISOString(),
      };
      
      const updatedConversation: Conversation = {
        ...conversation,
        messages: [...conversation.messages, message],
      };
      
      // Load existing conversations and update or add
      const messagingData = await loadMessagingData(username);
      const otherConversations = messagingData.conversations.filter(
        conv => conv.id !== conversation.id
      );
      
      const updatedData: MessagingData = {
        conversations: [...otherConversations, updatedConversation],
      };
      
      saveLocalData(username, 'messaging', updatedData);
      setConversation(updatedConversation);
      
      toast({
        title: 'Message sent',
        description: 'Your message has been sent to your account manager.',
      });
      
      setNewMessage('');
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to send message. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setSending(false);
    }
  };

  const handleSetRating = (value: number) => {
    if (!username) return;
    
    setRating(value);
    localStorage.setItem(`gravitas_client_${username}_manager_rating`, value.toString());
    
    toast({
      title: 'Rating saved',
      description: `You rated your account manager ${value} star${value !== 1 ? 's' : ''}.`,
    });
  };

  if (loading) {
    return (
      <ManageLayout>
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading account manager...</p>
        </div>
      </ManageLayout>
    );
  }

  return (
    <ManageLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Account Manager</h1>
          <p className="text-muted-foreground">
            Your dedicated account manager is here to help
          </p>
        </div>

        {/* Account Manager Info */}
        <Card>
          <CardHeader>
            <CardTitle>Your Account Manager</CardTitle>
            <CardDescription>Contact information and details</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-start gap-4">
              <Avatar className="h-16 w-16">
                <AvatarFallback className="text-xl">
                  {ACCOUNT_MANAGER.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h3 className="text-xl font-semibold mb-3">{ACCOUNT_MANAGER.name}</h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <a href={`mailto:${ACCOUNT_MANAGER.email}`} className="hover:underline">
                      {ACCOUNT_MANAGER.email}
                    </a>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <a href={`tel:${ACCOUNT_MANAGER.phone}`} className="hover:underline">
                      {ACCOUNT_MANAGER.phone}
                    </a>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Globe className="h-4 w-4 text-muted-foreground" />
                    <a 
                      href={ACCOUNT_MANAGER.website} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="hover:underline"
                    >
                      {ACCOUNT_MANAGER.website}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Rating */}
        <Card>
          <CardHeader>
            <CardTitle>Rate Your Account Manager</CardTitle>
            <CardDescription>Let us know how we're doing</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5].map((value) => (
                <button
                  key={value}
                  onClick={() => handleSetRating(value)}
                  className="transition-colors hover:scale-110 transform duration-200"
                >
                  <Star
                    className={`h-8 w-8 ${
                      value <= rating
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-gray-300'
                    }`}
                  />
                </button>
              ))}
              {rating > 0 && (
                <span className="ml-2 text-sm text-muted-foreground">
                  {rating} out of 5 stars
                </span>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Messaging Interface */}
        <Card>
          <CardHeader>
            <CardTitle>Messages</CardTitle>
            <CardDescription>Send a message to your account manager</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Conversation History */}
            {conversation && conversation.messages.length > 0 && (
              <div className="space-y-3 mb-4 max-h-96 overflow-y-auto">
                {conversation.messages.map((msg) => (
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
            )}

            {conversation && conversation.messages.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                <p className="text-sm">No messages yet. Start a conversation!</p>
              </div>
            )}

            {/* New Message */}
            <div className="space-y-2 pt-4 border-t">
              <Textarea
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type your message..."
                rows={4}
              />
              <div className="flex justify-end">
                <Button onClick={handleSendMessage} disabled={sending || !newMessage.trim()}>
                  <Send className="h-4 w-4 mr-2" />
                  {sending ? 'Sending...' : 'Send Message'}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </ManageLayout>
  );
};

export default AccountManager;
