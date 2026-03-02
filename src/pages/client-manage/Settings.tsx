import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ManageLayout from './ManageLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { saveLocalData } from '@/lib/clientData';
import { Save } from 'lucide-react';

interface Preferences {
  notifications: {
    email_updates: boolean;
    service_updates: boolean;
    billing_alerts: boolean;
    marketing: boolean;
    support_responses: boolean;
  };
  display: {
    theme: string;
    language: string;
  };
}

const DEFAULT_PREFERENCES: Preferences = {
  notifications: {
    email_updates: true,
    service_updates: true,
    billing_alerts: true,
    marketing: false,
    support_responses: true,
  },
  display: {
    theme: 'system',
    language: 'en',
  },
};

const Settings = () => {
  const { username } = useParams<{ username: string }>();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [preferences, setPreferences] = useState<Preferences>(DEFAULT_PREFERENCES);

  useEffect(() => {
    const loadData = () => {
      if (!username) return;
      
      try {
        const storageKey = `gravitas_client_${username}_preferences`;
        const saved = localStorage.getItem(storageKey);
        
        if (saved) {
          const parsed = JSON.parse(saved);
          setPreferences(parsed);
        }
      } catch (error) {
        console.error('Error loading preferences:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadData();
  }, [username]);

  const handleSave = async () => {
    if (!username) return;
    
    setSaving(true);
    try {
      saveLocalData(username, 'preferences', preferences);
      
      toast({
        title: 'Settings saved',
        description: 'Your preferences have been updated successfully.',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to save settings. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setSaving(false);
    }
  };

  const updateNotification = (key: keyof Preferences['notifications'], value: boolean) => {
    setPreferences(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [key]: value,
      },
    }));
  };

  const updateDisplay = (key: keyof Preferences['display'], value: string) => {
    setPreferences(prev => ({
      ...prev,
      display: {
        ...prev.display,
        [key]: value,
      },
    }));
  };

  if (loading) {
    return (
      <ManageLayout>
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading settings...</p>
        </div>
      </ManageLayout>
    );
  }

  return (
    <ManageLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Settings</h1>
          <p className="text-muted-foreground">
            Manage your account preferences and settings
          </p>
        </div>

        {/* Email Notifications */}
        <Card>
          <CardHeader>
            <CardTitle>Email Notifications</CardTitle>
            <CardDescription>Choose what emails you want to receive</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="email_updates"
                checked={preferences.notifications.email_updates}
                onCheckedChange={(checked) => 
                  updateNotification('email_updates', checked as boolean)
                }
              />
              <div className="flex-1">
                <Label htmlFor="email_updates" className="cursor-pointer">
                  Email Updates
                </Label>
                <p className="text-sm text-muted-foreground">
                  Receive general updates and announcements via email
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="service_updates"
                checked={preferences.notifications.service_updates}
                onCheckedChange={(checked) => 
                  updateNotification('service_updates', checked as boolean)
                }
              />
              <div className="flex-1">
                <Label htmlFor="service_updates" className="cursor-pointer">
                  Service Updates
                </Label>
                <p className="text-sm text-muted-foreground">
                  Get notified about changes to your active services
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="billing_alerts"
                checked={preferences.notifications.billing_alerts}
                onCheckedChange={(checked) => 
                  updateNotification('billing_alerts', checked as boolean)
                }
              />
              <div className="flex-1">
                <Label htmlFor="billing_alerts" className="cursor-pointer">
                  Billing Alerts
                </Label>
                <p className="text-sm text-muted-foreground">
                  Receive notifications about billing and payments
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="support_responses"
                checked={preferences.notifications.support_responses}
                onCheckedChange={(checked) => 
                  updateNotification('support_responses', checked as boolean)
                }
              />
              <div className="flex-1">
                <Label htmlFor="support_responses" className="cursor-pointer">
                  Support Responses
                </Label>
                <p className="text-sm text-muted-foreground">
                  Get notified when support responds to your tickets
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="marketing"
                checked={preferences.notifications.marketing}
                onCheckedChange={(checked) => 
                  updateNotification('marketing', checked as boolean)
                }
              />
              <div className="flex-1">
                <Label htmlFor="marketing" className="cursor-pointer">
                  Marketing Communications
                </Label>
                <p className="text-sm text-muted-foreground">
                  Receive promotional emails and special offers
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Display Preferences */}
        <Card>
          <CardHeader>
            <CardTitle>Display Preferences</CardTitle>
            <CardDescription>Customize how you see information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="theme">Theme</Label>
              <Select 
                value={preferences.display.theme} 
                onValueChange={(value) => updateDisplay('theme', value)}
              >
                <SelectTrigger id="theme">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">Light</SelectItem>
                  <SelectItem value="dark">Dark</SelectItem>
                  <SelectItem value="system">System</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-sm text-muted-foreground">
                Choose your preferred color theme
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="language">Language</Label>
              <Select 
                value={preferences.display.language} 
                onValueChange={(value) => updateDisplay('language', value)}
              >
                <SelectTrigger id="language">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="es">Español</SelectItem>
                  <SelectItem value="fr">Français</SelectItem>
                  <SelectItem value="de">Deutsch</SelectItem>
                  <SelectItem value="pt">Português</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-sm text-muted-foreground">
                Select your preferred language
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button onClick={handleSave} disabled={saving}>
            <Save className="h-4 w-4 mr-2" />
            {saving ? 'Saving...' : 'Save Settings'}
          </Button>
        </div>
      </div>
    </ManageLayout>
  );
};

export default Settings;
