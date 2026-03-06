import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Star, Bug, MessageSquare, CheckCircle2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

type FeedbackType = 'feedback' | 'bug';

export default function FeedbackTab() {
  const { toast } = useToast();
  const [type, setType] = useState<FeedbackType>('feedback');
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [category, setCategory] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    setIsSubmitting(true);

    await new Promise((r) => setTimeout(r, 800));

    setIsSubmitting(false);
    setSubmitted(true);
    toast({
      title: type === 'feedback' ? 'Feedback received!' : 'Bug report submitted!',
      description: 'Thank you for helping us improve Gravitas.',
    });
  };

  const resetForm = () => {
    setType('feedback');
    setRating(0);
    setCategory('');
    setMessage('');
    setSubmitted(false);
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center py-16 space-y-4 text-center">
        <CheckCircle2 className="h-16 w-16 text-green-500" />
        <h2 className="text-2xl font-bold">Thank you!</h2>
        <p className="text-muted-foreground max-w-sm">
          Your {type === 'feedback' ? 'feedback' : 'bug report'} has been received. We review every submission and use it to make Gravitas better.
        </p>
        <Button variant="outline" onClick={resetForm}>Submit Another</Button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl space-y-6">
      {/* Toggle */}
      <div className="flex gap-3">
        <Button
          variant={type === 'feedback' ? 'default' : 'outline'}
          onClick={() => setType('feedback')}
          className="flex-1"
        >
          <MessageSquare className="h-4 w-4 mr-2" />
          Share Feedback
        </Button>
        <Button
          variant={type === 'bug' ? 'default' : 'outline'}
          onClick={() => setType('bug')}
          className="flex-1"
        >
          <Bug className="h-4 w-4 mr-2" />
          Report a Bug
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>
            {type === 'feedback' ? 'Share Your Feedback' : 'Report a Bug'}
          </CardTitle>
          <CardDescription>
            {type === 'feedback'
              ? 'Help us understand what you love and what we can improve.'
              : 'Describe what happened so we can fix it as quickly as possible.'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Star Rating (feedback only) */}
            {type === 'feedback' && (
              <div className="space-y-2">
                <Label>Overall Rating</Label>
                <div className="flex gap-1" onMouseLeave={() => setHoverRating(0)}>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHoverRating(star)}
                      className="focus:outline-none"
                    >
                      <Star
                        className={cn(
                          'h-8 w-8 transition-colors',
                          star <= (hoverRating || rating)
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'text-muted-foreground'
                        )}
                      />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Category */}
            <div className="space-y-2">
              <Label htmlFor="feedback-category">
                {type === 'feedback' ? 'Category' : 'Affected Area'}
              </Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger id="feedback-category">
                  <SelectValue placeholder="Select one" />
                </SelectTrigger>
                <SelectContent>
                  {type === 'feedback' ? (
                    <>
                      <SelectItem value="general">General</SelectItem>
                      <SelectItem value="dashboard">Dashboard</SelectItem>
                      <SelectItem value="billing">Billing</SelectItem>
                      <SelectItem value="support">Support</SelectItem>
                      <SelectItem value="services">Services</SelectItem>
                    </>
                  ) : (
                    <>
                      <SelectItem value="dashboard">Dashboard</SelectItem>
                      <SelectItem value="login">Login / Signup</SelectItem>
                      <SelectItem value="billing">Billing / Payment</SelectItem>
                      <SelectItem value="services">Services</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </>
                  )}
                </SelectContent>
              </Select>
            </div>

            {/* Message */}
            <div className="space-y-2">
              <Label htmlFor="feedback-message">
                {type === 'feedback' ? 'Your Feedback' : 'Bug Description'}
              </Label>
              <Textarea
                id="feedback-message"
                placeholder={
                  type === 'feedback'
                    ? 'Tell us what you think…'
                    : 'Describe what happened, what you expected, and steps to reproduce…'
                }
                rows={6}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                disabled={isSubmitting}
              />
            </div>

            <Button type="submit" disabled={isSubmitting || !message.trim()}>
              {isSubmitting ? 'Submitting…' : type === 'feedback' ? 'Submit Feedback' : 'Submit Bug Report'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
