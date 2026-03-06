import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/contexts/AuthContext';
import { Copy, Share2, Gift, Trophy, Users, Twitter, Facebook, Linkedin } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const REWARDS = [
  { tier: 'Bronze', referrals: 1, reward: '10% discount on your next invoice', icon: '🥉' },
  { tier: 'Silver', referrals: 3, reward: '$25 Gravitas Gift Card', icon: '🥈' },
  { tier: 'Gold', referrals: 5, reward: '1 month free hosting', icon: '🥇' },
  { tier: 'Platinum', referrals: 10, reward: 'Sponsored Freebie from the Rewards Hub', icon: '💎' },
];

function generateReferralCode(userId: string): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let code = 'GRV-';
  const seed = parseInt(userId, 10) || 1;
  for (let i = 0; i < 6; i++) {
    code += chars[(seed * (i + 7) * 31) % chars.length];
  }
  return code;
}

export default function ReferralsTab() {
  const { user } = useAuth();
  const { toast } = useToast();
  const BASE_URL = import.meta.env.VITE_BASE_URL || 'https://gravitas.uno';

  const referralCode = generateReferralCode(user?.id || '1');
  const referralLink = `${BASE_URL}/signup?ref=${referralCode}`;

  const [referralCount] = useState(2);

  const currentTier = REWARDS.filter((r) => referralCount >= r.referrals).pop() || null;
  const nextTier = REWARDS.find((r) => r.referrals > referralCount) || null;

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text).then(() => {
      toast({ title: 'Copied!', description: `${label} copied to clipboard.` });
    });
  };

  const shareVia = (platform: 'twitter' | 'facebook' | 'linkedin') => {
    const text = encodeURIComponent(
      `Get professional web & digital services from Gravitas! Use my referral link and we both save. 🚀 ${referralLink}`
    );
    const urls: Record<typeof platform, string> = {
      twitter: `https://twitter.com/intent/tweet?text=${text}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(referralLink)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(referralLink)}`,
    };
    window.open(urls[platform], '_blank', 'noopener,noreferrer');
  };

  const canNativeShare = typeof navigator !== 'undefined' && !!navigator.share;

  const nativeShare = () => {
    navigator.share({
      title: 'Join Gravitas',
      text: 'Get professional web & digital services from Gravitas! Use my referral link and we both save.',
      url: referralLink,
    }).catch(() => {});
  };

  return (
    <div className="space-y-8">
      {/* Hero */}
      <Card className="bg-gradient-to-br from-primary/10 via-background to-purple-500/10 border-primary/30">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Gift className="h-6 w-6 text-primary" />
            <CardTitle>Gravitas Rewards Hub</CardTitle>
          </div>
          <CardDescription>
            Share your unique referral link and earn discounts, gift cards, and exclusive freebies!
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Invite Code */}
          <div className="space-y-2">
            <p className="text-sm font-medium">Your Invite Code</p>
            <div className="flex items-center gap-2">
              <div className="flex-1 bg-muted rounded-lg px-4 py-3 font-mono text-lg font-bold tracking-widest text-center select-all">
                {referralCode}
              </div>
              <Button
                variant="outline"
                size="icon"
                onClick={() => copyToClipboard(referralCode, 'Invite code')}
                title="Copy invite code"
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Referral Link */}
          <div className="space-y-2">
            <p className="text-sm font-medium">Your Referral Link</p>
            <div className="flex items-center gap-2">
              <Input readOnly value={referralLink} className="font-mono text-xs" />
              <Button
                variant="outline"
                size="icon"
                onClick={() => copyToClipboard(referralLink, 'Referral link')}
                title="Copy link"
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Share Buttons */}
          <div className="space-y-2">
            <p className="text-sm font-medium">Share on Social Media</p>
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" size="sm" onClick={() => shareVia('twitter')} className="gap-2">
                <Twitter className="h-4 w-4" /> Twitter / X
              </Button>
              <Button variant="outline" size="sm" onClick={() => shareVia('facebook')} className="gap-2">
                <Facebook className="h-4 w-4" /> Facebook
              </Button>
              <Button variant="outline" size="sm" onClick={() => shareVia('linkedin')} className="gap-2">
                <Linkedin className="h-4 w-4" /> LinkedIn
              </Button>
              {canNativeShare && (
                <Button variant="outline" size="sm" onClick={nativeShare} className="gap-2">
                  <Share2 className="h-4 w-4" /> More…
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Progress */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Your Referral Progress
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Successful referrals</span>
            <span className="text-3xl font-bold">{referralCount}</span>
          </div>
          {currentTier && (
            <div className="flex items-center gap-2 text-sm text-green-700 dark:text-green-400">
              <Trophy className="h-4 w-4" />
              Current reward: <strong>{currentTier.tier} – {currentTier.reward}</strong>
            </div>
          )}
          {nextTier && (
            <p className="text-sm text-muted-foreground">
              {nextTier.referrals - referralCount} more referral{nextTier.referrals - referralCount !== 1 ? 's' : ''} to unlock{' '}
              <strong>{nextTier.tier}</strong>: {nextTier.reward}
            </p>
          )}
        </CardContent>
      </Card>

      {/* Reward Tiers */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Reward Tiers</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {REWARDS.map((tier) => (
            <Card
              key={tier.tier}
              className={referralCount >= tier.referrals ? 'border-primary bg-primary/5' : ''}
            >
              <CardHeader className="pb-2">
                <div className="text-3xl">{tier.icon}</div>
                <CardTitle className="text-base flex items-center gap-2">
                  {tier.tier}
                  {referralCount >= tier.referrals && (
                    <Badge className="text-xs bg-green-500 text-white">Unlocked</Badge>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-1">
                <p className="text-sm text-muted-foreground">
                  {tier.referrals} referral{tier.referrals !== 1 ? 's' : ''}
                </p>
                <p className="text-sm font-medium">{tier.reward}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* How it works */}
      <Card>
        <CardHeader>
          <CardTitle>How It Works</CardTitle>
        </CardHeader>
        <CardContent>
          <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground">
            <li>Share your unique referral link or invite code with friends, family, or colleagues.</li>
            <li>When someone signs up using your link and purchases a service, you both earn rewards.</li>
            <li>Track your referrals and unlock exclusive discounts, gift cards, and sponsored freebies.</li>
            <li>Rewards are applied to your next invoice or delivered via email within 5 business days.</li>
          </ol>
        </CardContent>
      </Card>
    </div>
  );
}
