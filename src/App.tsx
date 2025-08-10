import { Suspense, lazy, useState, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Session, User } from "@supabase/supabase-js";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import WhatsAppButton from "./components/WhatsAppButton";
import ErrorBoundary from "./components/ErrorBoundary";
import { AnimatePresence, motion } from "framer-motion";

const queryClient = new QueryClient();

// Scroll to top component
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const Home = lazy(() => import("./pages/Home"));
const Services = lazy(() => import("./pages/Services"));
const Portfolio = lazy(() => import("./pages/Portfolio"));
const Contact = lazy(() => import("./pages/Contact"));
const Sitemap = lazy(() => import("./pages/Sitemap"));
const NotFound = lazy(() => import("./pages/NotFound"));

const App = () => {
  const [language, setLanguage] = useState("en");
  const [isDark, setIsDark] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    // Initialize theme
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop />
          <div id="animated-bg">
            <svg viewBox="0 0 2000 500" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 250 Q 500 100 1000 250 T 2000 250" stroke="#000" stroke-width="2" fill="none"/>
              <path d="M0 350 Q 500 200 1000 350 T 2000 350" stroke="#111" stroke-width="1.5" fill="none"/>
              <path d="M0 450 Q 500 300 1000 450 T 2000 450" stroke="#222" stroke-width="1" fill="none"/>
              <path d="M0 150 Q 500 300 1000 150 T 2000 150" stroke="#333" stroke-width="1.5" fill="none"/>
            </svg>
          </div>
          {/** Get current location for AnimatePresence */}
          <ErrorBoundary>
            <PageTransitions language={language} isDark={isDark} setLanguage={setLanguage} setIsDark={setIsDark} user={user} session={session} />
          </ErrorBoundary>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

// PageTransitions component for animated route transitions
function PageTransitions({ language, isDark, setLanguage, setIsDark, user, session }) {
  const location = useLocation();
  return (
    <div className="min-h-screen bg-background text-foreground">
      <ErrorBoundary>
        <Navigation 
          language={language} 
          setLanguage={setLanguage}
          isDark={isDark}
          setIsDark={setIsDark}
          user={user}
          session={session}
        />
      </ErrorBoundary>
      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -30 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          <Suspense fallback={<div className="flex justify-center items-center min-h-[40vh] text-lg">Loading...</div>}>
            <Routes location={location}>
              <Route path="/" element={<Home language={language} />} />
              <Route path="/services" element={<Services language={language} />} />
              <Route path="/portfolio" element={<Portfolio language={language} />} />
              <Route path="/contact" element={<Contact language={language} />} />
              <Route path="/sitemap" element={<Sitemap language={language} />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </motion.div>
      </AnimatePresence>
      <Footer language={language} />
      <WhatsAppButton />
    </div>
  );
}

export default App;
