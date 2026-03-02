import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Linkedin, Mail, Menu, X, User, LogOut, Newspaper, Info, Users, Mic, Folder, Calendar, Hammer, Package, ShoppingCart, Globe, Smartphone, MessageCircle, Monitor } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ThemeToggle from './ThemeToggle';
import { useAuth } from '@/contexts/AuthContext';
import ProductModal from './ProductModal';
import AppDownloadModal from './AppDownloadModal';
import { productData } from '@/lib/productData';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [auctionsModalOpen, setAuctionsModalOpen] = useState(false);
  const [commerceModalOpen, setCommerceModalOpen] = useState(false);
  const [domainsModalOpen, setDomainsModalOpen] = useState(false);
  const [appDownloadModalOpen, setAppDownloadModalOpen] = useState(false);
  const navigate = useNavigate();
  const { user, logout, isAuthenticated } = useAuth();

  const exploreItems = [
    { name: 'Bookings', href: '/lead-generation', icon: Calendar },
    { name: 'Portfolio', href: '/portfolio', icon: Folder },
    { name: 'Articles', href: '/posts', icon: Newspaper },
    { name: 'Podcast', href: '/podcast', icon: Mic },
  ];

  const productItems = [
    { name: 'Auctions', action: () => setAuctionsModalOpen(true), icon: Hammer },
    { name: 'Brand Kits', href: '/brand-kits', icon: Package },
    { name: 'Commerce', action: () => setCommerceModalOpen(true), icon: ShoppingCart },
    { name: 'Domains', action: () => setDomainsModalOpen(true), icon: Globe },
    { name: 'Websites', href: '/websites', icon: Monitor },
  ];

  const socialLinks = [
    { icon: Linkedin, href: 'https://linkedin.gravitas.uno', label: 'LinkedIn' },  
    { icon: Mail, href: 'mailto:hello@gravitas.uno', label: 'Email' },
  ];

  return (
    <header className="bg-background border-b border-border sticky top-0 z-50">
      <div className="container-blog">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="block">
              <h1 className="text-2xl font-bold text-foreground tracking-tight uppercase">gravitas</h1>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8" role="navigation" aria-label="Main navigation">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <Link to="/about" className="nav-link flex items-center gap-2">
                    <Info className="h-4 w-4" />
                    ABOUT
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link to="/partner-program" className="nav-link flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    PARTNERS
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="nav-link">EXPLORE</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[200px] gap-3 p-4">
                      {exploreItems.map((item) => (
                        <li key={item.name}>
                          <NavigationMenuLink asChild>
                            <Link
                              to={item.href}
                              className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                            >
                              <div className="flex items-center gap-2 text-sm font-medium leading-none">
                                <item.icon className="h-4 w-4" />
                                {item.name}
                              </div>
                            </Link>
                          </NavigationMenuLink>
                        </li>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="nav-link">PRODUCTS</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[200px] gap-3 p-4">
                      {productItems.map((item) => (
                        <li key={item.name}>
                          <NavigationMenuLink asChild={!!item.href}>
                            {item.href ? (
                              <Link
                                to={item.href}
                                className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                              >
                                <div className="flex items-center gap-2 text-sm font-medium leading-none">
                                  <item.icon className="h-4 w-4" />
                                  {item.name}
                                </div>
                              </Link>
                            ) : (
                              <button
                                onClick={item.action}
                                className="w-full text-left block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                              >
                                <div className="flex items-center gap-2 text-sm font-medium leading-none">
                                  <item.icon className="h-4 w-4" />
                                  {item.name}
                                </div>
                              </button>
                            )}
                          </NavigationMenuLink>
                        </li>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </nav>

          {/* Social Links & Search */}
          <div className="hidden lg:flex items-center space-x-4">
            {socialLinks.map(({ icon: Icon, href, label }) => (
              <Button key={label} variant="outline" size="sm" asChild>
                <a href={href} aria-label={label}>
                  <Icon className="h-4 w-4" />
                </a>
              </Button>
            ))}
            
            <Button 
              variant="outline" 
              size="sm" 
              aria-label="What are you looking for?"
              onClick={() => navigate('/search')}
            >
              <Search className="h-4 w-4" />
            </Button>
            <ThemeToggle />
            
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    <User className="h-4 w-4 mr-2" />
                    {user?.name}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout}>
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Button variant="outline" size="sm" onClick={() => navigate('/contact')}>
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Contact Support
                </Button>
                <Button size="sm" onClick={() => setAppDownloadModalOpen(true)}>
                  <Smartphone className="h-4 w-4 mr-2" />
                  Download The App
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="lg:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-border py-4">
            <nav className="flex flex-col space-y-4" role="navigation" aria-label="Mobile navigation">
              <Link to="/about" className="nav-link flex items-center gap-2" onClick={() => setIsMenuOpen(false)}>
                <Info className="h-4 w-4" />
                ABOUT
              </Link>
              <Link to="/partner-program" className="nav-link flex items-center gap-2" onClick={() => setIsMenuOpen(false)}>
                <Users className="h-4 w-4" />
                PARTNERS
              </Link>
              
              <div className="space-y-2">
                <div className="text-sm font-medium text-foreground">EXPLORE</div>
                <div className="pl-4 space-y-2">
                  {exploreItems.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      className="nav-link flex items-center gap-2 text-sm"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <item.icon className="h-4 w-4" />
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="text-sm font-medium text-foreground">PRODUCTS</div>
                <div className="pl-4 space-y-2">
                  {productItems.map((item) => (
                    item.href ? (
                      <Link
                        key={item.name}
                        to={item.href}
                        className="nav-link flex items-center gap-2 text-sm"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <item.icon className="h-4 w-4" />
                        {item.name}
                      </Link>
                    ) : (
                      <button
                        key={item.name}
                        onClick={() => {
                          item.action?.();
                          setIsMenuOpen(false);
                        }}
                        className="nav-link flex items-center gap-2 text-sm w-full text-left"
                      >
                        <item.icon className="h-4 w-4" />
                        {item.name}
                      </button>
                    )
                  ))}
                </div>
              </div>
            </nav>
            
            <div className="mt-6 space-y-4">
              <div className="flex space-x-2 items-center">
                {socialLinks.map(({ icon: Icon, href, label }) => (
                  <Button key={label} variant="outline" size="sm" asChild>
                    <a href={href} aria-label={label}>
                      <Icon className="h-4 w-4" />
                    </a>
                  </Button>
                ))}
                
                <ThemeToggle />
              </div>
              
              <Button 
                variant="outline" 
                size="sm" 
                aria-label="What are you looking for?"
                onClick={() => navigate('/search')}
                className="w-full"
              >
                <Search className="h-4 w-4 mr-2" />
                Search
              </Button>
              
              {isAuthenticated ? (
                <>
                  <div className="text-sm text-muted-foreground px-2">
                    Logged in as: {user?.name}
                  </div>
                  <Button variant="outline" size="sm" onClick={logout} className="w-full">
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Button variant="outline" size="sm" onClick={() => navigate('/contact')} className="w-full">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Contact Support
                  </Button>
                  <Button size="sm" onClick={() => setAppDownloadModalOpen(true)} className="w-full">
                    <Smartphone className="h-4 w-4 mr-2" />
                    Download The App
                  </Button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
      
      <ProductModal
        open={auctionsModalOpen}
        onOpenChange={setAuctionsModalOpen}
        title={productData.auctions.title}
        description={productData.auctions.description}
        ctaText={productData.auctions.ctaText}
        ctaUrl={productData.auctions.ctaUrl}
      />
      
      <ProductModal
        open={commerceModalOpen}
        onOpenChange={setCommerceModalOpen}
        title={productData.commerce.title}
        description={productData.commerce.description}
        ctaText={productData.commerce.ctaText}
        ctaUrl={productData.commerce.ctaUrl}
      />
      
      <ProductModal
        open={domainsModalOpen}
        onOpenChange={setDomainsModalOpen}
        title={productData.domains.title}
        description={productData.domains.description}
        ctaText={productData.domains.ctaText}
        ctaUrl={productData.domains.ctaUrl}
      />
      
      <AppDownloadModal
        open={appDownloadModalOpen}
        onOpenChange={setAppDownloadModalOpen}
      />
    </header>
  );
};

export default Header;