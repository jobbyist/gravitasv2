import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

interface AuthFormProps {
  onClose?: () => void;
}

export const LoginForm = ({ onClose }: AuthFormProps) => {
  const [emailOrUsername, setEmailOrUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Get returnTo from URL params
      const params = new URLSearchParams(window.location.search);
      const returnTo = params.get('returnTo') || undefined;
      
      const success = await login(emailOrUsername, password, returnTo);
      if (success) {
        toast({
          title: 'Welcome back!',
          description: 'You have successfully logged in.',
        });
        if (onClose) onClose();
        // Navigation handled in AuthContext
      } else {
        toast({
          title: 'Login failed',
          description: 'Invalid email/username or password. Please try again.',
          variant: 'destructive',
        });
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'An error occurred during login. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>Enter your credentials to access your account</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="emailOrUsername">Email or Username</Label>
            <Input
              id="emailOrUsername"
              type="text"
              placeholder="your@email.com or username"
              value={emailOrUsername}
              onChange={(e) => setEmailOrUsername(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? 'Logging in...' : 'Login'}
          </Button>
          <div className="text-center text-sm text-muted-foreground pt-2">
            Don't have an account?{' '}
            <a href="/signup" className="text-primary hover:underline">
              Click here to sign up for free
            </a>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export const SignupForm = ({ onClose }: AuthFormProps) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { signup } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast({
        title: 'Password mismatch',
        description: 'Passwords do not match. Please try again.',
        variant: 'destructive',
      });
      return;
    }

    if (password.length < 6) {
      toast({
        title: 'Weak password',
        description: 'Password must be at least 6 characters long.',
        variant: 'destructive',
      });
      return;
    }

    // Validate username format
    const usernameRegex = /^[a-z0-9]{3,24}$/;
    if (!usernameRegex.test(username)) {
      toast({
        title: 'Invalid username',
        description: 'Username must be 3-24 characters, lowercase letters and numbers only.',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);

    try {
      // Get returnTo from URL params
      const params = new URLSearchParams(window.location.search);
      const returnTo = params.get('returnTo') || undefined;
      
      const success = await signup(email, password, name, username, returnTo);
      if (success) {
        toast({
          title: 'Account created!',
          description: 'Your account has been successfully created.',
        });
        if (onClose) onClose();
        // Navigation handled in AuthContext
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An error occurred during signup. Please try again.';
      toast({
        title: 'Signup failed',
        description: errorMessage,
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Sign Up</CardTitle>
        <CardDescription>Create a new account to get started</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              type="text"
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="signup-email">Email</Label>
            <Input
              id="signup-email"
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="signup-username">Username</Label>
            <Input
              id="signup-username"
              type="text"
              placeholder="username123"
              value={username}
              onChange={(e) => setUsername(e.target.value.toLowerCase())}
              required
              disabled={isLoading}
              pattern="[a-z0-9]{3,24}"
              minLength={3}
              maxLength={24}
            />
            <p className="text-xs text-muted-foreground">3-24 characters, lowercase letters and numbers only</p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="signup-password">Password</Label>
            <Input
              id="signup-password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={isLoading}
              minLength={6}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirm-password">Confirm Password</Label>
            <Input
              id="confirm-password"
              type="password"
              placeholder="••••••••"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              disabled={isLoading}
              minLength={6}
            />
          </div>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? 'Creating account...' : 'Sign Up'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
