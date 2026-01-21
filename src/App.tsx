import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "next-themes";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SkipLink from "@/components/SkipLink";
import { Suspense, lazy } from "react";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";

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
const NotFound = lazy(() => import("./pages/NotFound"));

// Article pages
const FutureOfAI = lazy(() => import("./pages/articles/FutureOfAI"));
const ModernWebApps = lazy(() => import("./pages/articles/ModernWebApps"));
const EcommerceTrends = lazy(() => import("./pages/articles/EcommerceTrends"));
const TechStackGuide = lazy(() => import("./pages/articles/TechStackGuide"));
const AIPoweredCustomerExperience = lazy(() => import("./pages/articles/AIPoweredCustomerExperience"));
const HeadlessCommerce = lazy(() => import("./pages/articles/HeadlessCommerce"));
const WebPerformance = lazy(() => import("./pages/articles/WebPerformance"));

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <AuthProvider>
        <TooltipProvider>
          <SkipLink />
          <Toaster />
          <Sonner />
          <BrowserRouter>
              <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
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
                  <Route path="/blog/:slug" element={<BlogDetail />} />
                  {/* Article pages */}
                  <Route path="/articles/future-of-ai" element={<FutureOfAI />} />
                  <Route path="/articles/modern-web-apps" element={<ModernWebApps />} />
                  <Route path="/articles/ecommerce-trends" element={<EcommerceTrends />} />
                  <Route path="/articles/tech-stack-guide" element={<TechStackGuide />} />
                  <Route path="/articles/ai-customer-experience" element={<AIPoweredCustomerExperience />} />
                  <Route path="/articles/headless-commerce" element={<HeadlessCommerce />} />
                  <Route path="/articles/web-performance" element={<WebPerformance />} />
                  {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                  {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Suspense>
            </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
