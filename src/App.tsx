import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "next-themes";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SkipLink from "@/components/SkipLink";
import PWAInstallPrompt from "@/components/PWAInstallPrompt";
import CookieConsent from "@/components/CookieConsent";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { Suspense, lazy, useEffect } from "react";
import { AuthProvider } from "@/contexts/AuthContext";
import { usePerformanceMonitoring } from "@/hooks/usePerformanceMonitoring";
import Index from "./pages/Index";

// Loading component
const LoadingFallback = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="text-center space-y-4">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
      <p className="text-muted-foreground">Loading...</p>
    </div>
  </div>
);

// Lazy load non-critical pages
const BlogDetail = lazy(() => import("./pages/BlogDetail"));
const AllPosts = lazy(() => import("./pages/AllPosts"));
const Business = lazy(() => import("./pages/Business"));
const Technology = lazy(() => import("./pages/Technology"));
const Podcast = lazy(() => import("./pages/Podcast"));
const Terms = lazy(() => import("./pages/Terms"));
const Privacy = lazy(() => import("./pages/Privacy"));
const Sitemap = lazy(() => import("./pages/Sitemap"));
const SearchResults = lazy(() => import("./pages/SearchResults"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const Login = lazy(() => import("./pages/Login"));
const Signup = lazy(() => import("./pages/Signup"));
const QuoteRequest = lazy(() => import("./pages/QuoteRequest"));
const LeadGeneration = lazy(() => import("./pages/LeadGeneration"));
const Portfolio = lazy(() => import("./pages/Portfolio"));
const Websites = lazy(() => import("./pages/Websites"));
const WebsitePayment = lazy(() => import("./pages/WebsitePayment"));
const BrandKits = lazy(() => import("./pages/BrandKits"));
const PartnerProgram = lazy(() => import("./pages/PartnerProgram"));
const ComingSoon = lazy(() => import("./pages/ComingSoon"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Onboarding = lazy(() => import("./pages/Onboarding"));

// Article pages
const FutureOfAI = lazy(() => import("./pages/articles/FutureOfAI"));
const ModernWebApps = lazy(() => import("./pages/articles/ModernWebApps"));
const EcommerceTrends = lazy(() => import("./pages/articles/EcommerceTrends"));
const TechStackGuide = lazy(() => import("./pages/articles/TechStackGuide"));
const AIPoweredCustomerExperience = lazy(() => import("./pages/articles/AIPoweredCustomerExperience"));
const HeadlessCommerce = lazy(() => import("./pages/articles/HeadlessCommerce"));
const WebPerformance = lazy(() => import("./pages/articles/WebPerformance"));
const GravitasFebruary2026Updates = lazy(() => import("./pages/articles/GravitasFebruary2026Updates"));

const queryClient = new QueryClient();

const App = () => {
  // Monitor performance metrics in development
  usePerformanceMonitoring(import.meta.env.DEV);
  
  useEffect(() => {
    // PWA functionality temporarily disabled
    // if ('serviceWorker' in navigator) {
    //   window.addEventListener('load', () => {
    //     navigator.serviceWorker
    //       .register('/service-worker.js')
    //       .then((registration) => {
    //         console.log('Service Worker registered:', registration);
    //       })
    //       .catch((error) => {
    //         console.error('Service Worker registration failed:', error);
    //       });
    //   });
    // }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <AuthProvider>
          <TooltipProvider>
            <ErrorBoundary>
              <SkipLink />
              <Toaster />
              <Sonner />
              {/* PWA Install Prompt temporarily disabled */}
              {/* <PWAInstallPrompt /> */}
              <CookieConsent />
              <BrowserRouter>
                <Suspense fallback={<LoadingFallback />}>
                  <Routes>
                    <Route path="/" element={<Index />} />
                    <Route path="/posts" element={<AllPosts />} />
                    <Route path="/business" element={<Business />} />
                    <Route path="/technology" element={<Technology />} />
                    <Route path="/podcast" element={<Podcast />} />
                    <Route path="/terms" element={<Terms />} />
                    <Route path="/privacy" element={<Privacy />} />
                    <Route path="/sitemap" element={<Sitemap />} />
                    <Route path="/search" element={<SearchResults />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/quote-request" element={<QuoteRequest />} />
                    <Route path="/lead-generation" element={<LeadGeneration />} />
                    <Route path="/portfolio" element={<Portfolio />} />
                    <Route path="/websites" element={<Websites />} />
                    <Route path="/website-payment" element={<WebsitePayment />} />
                    <Route path="/brand-kits" element={<BrandKits />} />
                    <Route path="/partner-program" element={<PartnerProgram />} />
                    <Route path="/coming-soon" element={<ComingSoon />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/onboarding" element={<Onboarding />} />
                    <Route path="/blog/:slug" element={<BlogDetail />} />
                    {/* Article pages */}
                    <Route path="/articles/future-of-ai" element={<FutureOfAI />} />
                    <Route path="/articles/modern-web-apps" element={<ModernWebApps />} />
                    <Route path="/articles/ecommerce-trends" element={<EcommerceTrends />} />
                    <Route path="/articles/tech-stack-guide" element={<TechStackGuide />} />
                    <Route path="/articles/ai-customer-experience" element={<AIPoweredCustomerExperience />} />
                    <Route path="/articles/headless-commerce" element={<HeadlessCommerce />} />
                    <Route path="/articles/web-performance" element={<WebPerformance />} />
                    <Route path="/articles/gravitas-february-2026-updates" element={<GravitasFebruary2026Updates />} />
                    {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                    {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </Suspense>
              </BrowserRouter>
            </ErrorBoundary>
          </TooltipProvider>
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
