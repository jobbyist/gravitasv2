/**
 * Analytics and tracking abstraction
 * This provides a simple interface that can be wired to actual analytics providers later
 */

export type TrackingEvent = 
  | 'cta_click'
  | 'modal_open'
  | 'modal_close'
  | 'form_step_complete'
  | 'form_submit_success'
  | 'form_submit_error'
  | 'upsell_selected'
  | 'upsell_deselected'
  | 'maintenance_toggled'
  | 'pricing_reset'
  | 'page_view';

export interface TrackingEventData {
  event: TrackingEvent;
  properties?: Record<string, any>;
  timestamp?: number;
}

/**
 * Track an event
 * Currently logs to console and localStorage for development
 * Can be extended to send to GA4, Meta Pixel, or other analytics services
 */
export function trackEvent(event: TrackingEvent, properties?: Record<string, any>): void {
  const eventData: TrackingEventData = {
    event,
    properties,
    timestamp: Date.now(),
  };

  // Console log in development
  if (import.meta.env.DEV) {
    console.log('[Analytics]', eventData);
  }

  // Store in localStorage for now
  try {
    const events = JSON.parse(localStorage.getItem('website_analytics') || '[]');
    events.push(eventData);
    // Keep only last 100 events
    if (events.length > 100) {
      events.shift();
    }
    localStorage.setItem('website_analytics', JSON.stringify(events));
  } catch (error) {
    console.error('Failed to store analytics event:', error);
  }

  // TODO: Send to actual analytics service
  // Example integrations:
  // - Google Analytics 4: gtag('event', event, properties)
  // - Meta Pixel: fbq('track', event, properties)
  // - Custom backend: fetch('/api/analytics', { method: 'POST', body: JSON.stringify(eventData) })
}

/**
 * Track page view
 */
export function trackPageView(pageName: string, path: string): void {
  trackEvent('page_view', { pageName, path });
}

/**
 * Hook for tracking events in React components
 */
export function useTracking() {
  return {
    trackEvent,
    trackPageView,
  };
}

/**
 * Get all tracked events (for debugging)
 */
export function getTrackedEvents(): TrackingEventData[] {
  try {
    return JSON.parse(localStorage.getItem('website_analytics') || '[]');
  } catch {
    return [];
  }
}

/**
 * Clear all tracked events
 */
export function clearTrackedEvents(): void {
  localStorage.removeItem('website_analytics');
}
