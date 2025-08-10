import { useState, useEffect, useRef, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Sun, Moon, Globe, LogOut, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Session, User as SupabaseUser } from "@supabase/supabase-js";

interface NavigationProps {
  language: string;
  setLanguage: (lang: string) => void;
  isDark: boolean;
  setIsDark: (dark: boolean) => void;
  user: SupabaseUser | null;
  session: Session | null;
}

const Navigation = ({ language, setLanguage, isDark, setIsDark, user, session }: NavigationProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const { toast } = useToast();
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  const navLinks = [
    { name: "HOME", path: "/" },
    { name: "SERVICES", path: "/services" },
    { name: "PORTFOLIO", path: "/portfolio" },
    { name: "CONTACT", path: "/contact" },
  ];

  // Close menu when location changes
  useEffect(() => {
    try {
      setIsMenuOpen(false);
    } catch (error) {
      console.error('Error closing menu on location change:', error);
    }
  }, [location.pathname]);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle body scroll lock when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
      document.body.classList.add('menu-open');
    } else {
      document.body.style.overflow = 'unset';
      document.body.classList.remove('menu-open');
    }

    return () => {
      document.body.style.overflow = 'unset';
      document.body.classList.remove('menu-open');
    };
  }, [isMenuOpen]);

  // Focus management and keyboard navigation
  useEffect(() => {
    if (!isMenuOpen || !mobileMenuRef.current) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        setIsMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(e.target as Node) && 
          menuButtonRef.current && !menuButtonRef.current.contains(e.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handleClickOutside);
    
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen]);

  // Safe menu toggle function
  const toggleMenu = useCallback(() => {
    try {
      setIsMenuOpen(prev => !prev);
    } catch (error) {
      console.error('Error toggling menu:', error);
      setIsMenuOpen(false);
    }
  }, []);

  // Safe menu close function
  const closeMenu = useCallback(() => {
    try {
      setIsMenuOpen(false);
    } catch (error) {
      console.error('Error closing menu:', error);
    }
  }, []);

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle("dark");
  };

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        toast({
          variant: "destructive",
          title: language === "hi" ? "लॉगआउट त्रुटि" : "Logout Error",
          description: error.message,
        });
      } else {
        toast({
          title: language === "hi" ? "सफलतापूर्वक लॉगआउट" : "Logged Out Successfully",
          description: language === "hi" ? "आपका फिर से स्वागत है!" : "See you again soon!",
        });
      }
    } catch (error) {
      console.error("Logout error:", error);
      toast({
        variant: "destructive",
        title: language === "hi" ? "लॉगआउट त्रुटि" : "Logout Error",
        description: "An unexpected error occurred",
      });
    }
  };

  return (
    <nav
      className={`sticky top-0 left-0 right-0 z-50 transition-all duration-300 bg-background/95 backdrop-blur-sm border-b border-border`}
      role="navigation"
      aria-label="Main Navigation"
    >
      <div className="asn-container">
        <div className="flex items-center justify-between h-16 md:h-20 px-2 sm:px-0">
          {/* Logo */}
          <Link to="/" className="asn-headline text-2xl">
            ASN
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`asn-link text-sm font-bold tracking-wider transition-all duration-300 ${
                  location.pathname === link.path
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
                tabIndex={0}
                aria-current={location.pathname === link.path ? "page" : undefined}
              >
                {link.name}
              </Link>
            ))}
            {/* CTA Button */}
            <Link to="/contact">
              <Button className="bg-black text-white hover:bg-white hover:text-black border border-black font-bold px-6 py-2 rounded-full text-sm tracking-wider transition-all duration-300 whitespace-nowrap">
                <span className="hidden md:inline">{language === "hi" ? "अपने प्रोजेक्ट के बारे में बात करें!" : "Discover How We Can Elevate Your Business!"}</span>
                <span className="md:hidden">{language === "hi" ? "बात करें" : "Contact Us"}</span>
              </Button>
            </Link>
          </div>

          {/* Controls */}
          <div className="flex items-center space-x-4">
            {/* Language Toggle - always visible */}
            <Button
              variant="outline"
              size="sm"
              onClick={() => setLanguage(language === "en" ? "hi" : "en")}
              className="flex items-center space-x-1 border-2 border-accent font-bold px-3 py-1 rounded-full text-xs tracking-wider hover:bg-accent hover:text-accent-foreground transition-all duration-200"
              aria-label="Toggle language"
            >
              <Globe className="h-4 w-4 mr-1" />
              <span>{language === "en" ? "EN" : "हिंदी"}</span>
            </Button>

            {/* Theme Toggle - always visible */}
            <Button
              variant="outline"
              size="sm"
              onClick={toggleTheme}
              className="flex items-center space-x-1 border-2 border-accent font-bold px-3 py-1 rounded-full text-xs tracking-wider hover:bg-accent hover:text-accent-foreground transition-all duration-200"
              aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
              title={isDark ? "Switch to light mode" : "Switch to dark mode"}
            >
              {isDark ? <Sun className="h-4 w-4 mr-1" /> : <Moon className="h-4 w-4 mr-1" />}
              <span className="hidden sm:inline">{isDark ? "Light" : "Dark"}</span>
            </Button>

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleMenu}
              className="lg:hidden"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
              ref={menuButtonRef}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div
            id="mobile-menu"
            className="lg:hidden absolute top-full left-0 right-0 bg-background border-b border-border animate-slide-up"
            role="menu"
            aria-label="Mobile Navigation"
            ref={mobileMenuRef}
          >
            <div className="flex flex-col space-y-4 p-6">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={closeMenu}
                  className={`asn-headline text-lg transition-all duration-300 ${
                    location.pathname === link.path
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                  tabIndex={0}
                  aria-current={location.pathname === link.path ? "page" : undefined}
                  role="menuitem"
                >
                  {link.name}
                </Link>
              ))}
              <div className="flex items-center space-x-4 pt-4 border-t border-border">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setLanguage(language === "en" ? "hi" : "en")}
                  className="flex items-center space-x-1 border-2 border-accent font-bold px-3 py-1 rounded-full text-xs tracking-wider hover:bg-accent hover:text-accent-foreground transition-all duration-200"
                  aria-label="Toggle language"
                >
                  <Globe className="h-4 w-4 mr-1" />
                  <span>{language === "en" ? "EN" : "हिंदी"}</span>
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={toggleTheme} 
                  className="flex items-center space-x-1 border-2 border-accent font-bold px-3 py-1 rounded-full text-xs tracking-wider hover:bg-accent hover:text-accent-foreground transition-all duration-200"
                  aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
                  title={isDark ? "Switch to light mode" : "Switch to dark mode"}
                >
                  {isDark ? <Sun className="h-4 w-4 mr-1" /> : <Moon className="h-4 w-4 mr-1" />}
                  <span>{isDark ? "Light" : "Dark"}</span>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;