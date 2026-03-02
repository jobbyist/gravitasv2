import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Cookie, Settings } from 'lucide-react';

interface CookiePreferences {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
  lastUpdated: string;
}

const defaultPreferences: CookiePreferences = {
  necessary: true, // Always true, can't be disabled
  analytics: false,
  marketing: false,
  lastUpdated: new Date().toISOString()
};

const CookieConsent = () => {
  const [showBanner, setShowBanner] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>(defaultPreferences);

  useEffect(() => {
    const savedPreferences = localStorage.getItem('cookie-preferences');
    
    if (savedPreferences) {
      try {
        const parsed = JSON.parse(savedPreferences) as CookiePreferences;
        const lastUpdated = new Date(parsed.lastUpdated);
        const daysSinceUpdate = (Date.now() - lastUpdated.getTime()) / (1000 * 60 * 60 * 24);
        
        // Show banner again after 90 days
        if (daysSinceUpdate >= 90) {
          setShowBanner(true);
        } else {
          setPreferences(parsed);
        }
      } catch (error) {
        console.error('Error parsing cookie preferences:', error);
        setShowBanner(true);
      }
    } else {
      // First visit - show banner
      setShowBanner(true);
    }
  }, []);

  const savePreferences = (prefs: CookiePreferences) => {
    const updatedPrefs = {
      ...prefs,
      necessary: true, // Always true
      lastUpdated: new Date().toISOString()
    };
    
    localStorage.setItem('cookie-preferences', JSON.stringify(updatedPrefs));
    setPreferences(updatedPrefs);
    setShowBanner(false);
    setShowSettings(false);

    // Apply preferences
    applyPreferences(updatedPrefs);
  };

  const applyPreferences = (prefs: CookiePreferences) => {
    // Here you would typically enable/disable analytics and marketing scripts
    // For example:
    
    if (prefs.analytics) {
      // Enable Google Analytics or other analytics
      console.log('Analytics enabled');
      // window.gtag?.('consent', 'update', { analytics_storage: 'granted' });
    } else {
      console.log('Analytics disabled');
      // window.gtag?.('consent', 'update', { analytics_storage: 'denied' });
    }

    if (prefs.marketing) {
      // Enable marketing cookies
      console.log('Marketing cookies enabled');
      // window.gtag?.('consent', 'update', { ad_storage: 'granted' });
    } else {
      console.log('Marketing cookies disabled');
      // window.gtag?.('consent', 'update', { ad_storage: 'denied' });
    }
  };

  const handleAcceptAll = () => {
    savePreferences({
      necessary: true,
      analytics: true,
      marketing: true,
      lastUpdated: new Date().toISOString()
    });
  };

  const handleRejectAll = () => {
    savePreferences({
      necessary: true,
      analytics: false,
      marketing: false,
      lastUpdated: new Date().toISOString()
    });
  };

  const handleSavePreferences = () => {
    savePreferences(preferences);
  };

  if (!showBanner) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 animate-in slide-in-from-bottom-5">
      <Card className="max-w-4xl mx-auto border-primary shadow-2xl">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
            <div className="flex-shrink-0">
              <Cookie className="h-8 w-8 text-primary" />
            </div>
            
            <div className="flex-1">
              <h3 className="font-semibold text-lg mb-2">We Value Your Privacy</h3>
              <p className="text-sm text-muted-foreground mb-4">
                We use cookies to enhance your browsing experience, serve personalized content, and analyze our traffic. 
                By clicking "Accept All", you consent to our use of cookies. You can customize your preferences at any time.
              </p>
              
              <div className="flex flex-wrap gap-3">
                <Button onClick={handleAcceptAll} size="sm">
                  Accept All
                </Button>
                
                <Button onClick={handleRejectAll} variant="outline" size="sm">
                  Reject All
                </Button>
                
                <Dialog open={showSettings} onOpenChange={setShowSettings}>
                  <DialogTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <Settings className="h-4 w-4 mr-2" />
                      Customize
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-md">
                    <DialogHeader>
                      <DialogTitle>Cookie Preferences</DialogTitle>
                      <DialogDescription>
                        Manage your cookie preferences. Necessary cookies are always enabled.
                      </DialogDescription>
                    </DialogHeader>
                    
                    <div className="space-y-6 py-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5 flex-1">
                          <Label htmlFor="necessary" className="font-medium">
                            Necessary Cookies
                          </Label>
                          <p className="text-sm text-muted-foreground">
                            Required for the website to function properly
                          </p>
                        </div>
                        <Switch
                          id="necessary"
                          checked={true}
                          disabled={true}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5 flex-1">
                          <Label htmlFor="analytics" className="font-medium">
                            Analytics Cookies
                          </Label>
                          <p className="text-sm text-muted-foreground">
                            Help us improve by collecting anonymous usage data
                          </p>
                        </div>
                        <Switch
                          id="analytics"
                          checked={preferences.analytics}
                          onCheckedChange={(checked) =>
                            setPreferences({ ...preferences, analytics: checked })
                          }
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5 flex-1">
                          <Label htmlFor="marketing" className="font-medium">
                            Marketing Cookies
                          </Label>
                          <p className="text-sm text-muted-foreground">
                            Used to deliver personalized advertisements
                          </p>
                        </div>
                        <Switch
                          id="marketing"
                          checked={preferences.marketing}
                          onCheckedChange={(checked) =>
                            setPreferences({ ...preferences, marketing: checked })
                          }
                        />
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button onClick={handleSavePreferences} className="flex-1">
                        Save Preferences
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CookieConsent;
