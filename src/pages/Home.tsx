import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, BarChart3, Globe, Users, Zap } from "lucide-react";
import { motion } from "framer-motion";

interface HomeProps {
  language: string;
}

function useIsDarkMode() {
  const [isDark, setIsDark] = useState(false);
  useEffect(() => {
    const check = () => setIsDark(document.documentElement.classList.contains('dark'));
    check();
    window.addEventListener('classChange', check);
    const observer = new MutationObserver(check);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => {
      window.removeEventListener('classChange', check);
      observer.disconnect();
    };
  }, []);
  return isDark;
}

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);
  return isMobile;
}

const Home = ({ language }: HomeProps) => {
  const [userLocation, setUserLocation] = useState<string>("");
  const isHindi = language === "hi";
  const isDark = useIsDarkMode();
  const isMobile = useIsMobile();

  useEffect(() => {
    // Detect user location (simplified)
    const detectLocation = async () => {
      try {
        const response = await fetch('https://ipapi.co/json/');
        const data = await response.json();
        setUserLocation(data.country_name || "");
      } catch (error) {
        console.log("Location detection failed");
      }
    };
    detectLocation();
  }, []);

  const metrics = [
    {
      number: "40+",
      label: isHindi ? "व्यवसाय लॉन्च किए गए" : "Businesses Launched",
      icon: Zap
    },
    {
      number: "5.2×",
      label: isHindi ? "औसत ROAS" : "Average ROAS",
      icon: BarChart3
    },
    {
      number: "97%+",
      label: isHindi ? "क्लाइंट संतुष्टि" : "Client Satisfaction",
      icon: Users
    },
    {
      number: "15+",
      label: isHindi ? "देश सेवित" : "Countries Served",
      icon: Globe
    }
  ];

  const services = [
    {
      title: isHindi ? "वेब डेवलपमेंट" : "Web Development",
      description: isHindi ? "आधुनिक, तेज़ और उत्तरदायी वेबसाइटें" : "Modern, fast, and responsive websites"
    },
    {
      title: isHindi ? "डिजिटल मार्केटिंग" : "Digital Marketing", 
      description: isHindi ? "Meta Ads और Google Ads में विशेषज्ञता" : "Expert Meta Ads and Google Ads management"
    },
    {
      title: isHindi ? "ड्रॉपशिपिंग" : "Dropshipping",
      description: isHindi ? "संपूर्ण ई-कॉमर्स समाधान" : "Complete e-commerce solutions"
    },
    {
      title: isHindi ? "व्यापार निष्पादन" : "Business Execution",
      description: isHindi ? "विचार से लॉन्च तक" : "From idea to launch"
    }
  ];

  // Enhanced animated SVG background for hero
  const HeroAnimatedBG = () => (
    <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0, pointerEvents: 'none' }}>
      {/* Background Image */}
      <div style={{ 
        position: 'absolute', 
        top: 0, 
        left: 0, 
        width: '100%', 
        height: '100%', 
        backgroundImage: 'url("/lovable-uploads/bghero.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        opacity: isDark ? 0.3 : 0.5,
        filter: 'grayscale(100%)'
      }} />
      {/* Only show SVG and dots if not mobile */}
      {!isMobile && <>
        <div style={{ opacity: isDark ? 0.25 : 0.25 }}>
          <svg viewBox="0 0 2000 500" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '200vw', height: '100%', display: 'block', animation: 'waveMove 18s linear infinite' }}>
            <path d="M0 250 Q 500 100 1000 250 T 2000 250" stroke={isDark ? '#fff' : '#000'} strokeWidth="2" fill="none" opacity={isDark ? 0.18 : 0.18}/>
            <path d="M0 350 Q 500 200 1000 350 T 2000 350" stroke={isDark ? '#eee' : '#111'} strokeWidth="1.5" fill="none" opacity={isDark ? 0.18 : 0.18}/>
            <path d="M0 450 Q 500 300 1000 450 T 2000 450" stroke={isDark ? '#ccc' : '#222'} strokeWidth="1" fill="none" opacity={isDark ? 0.18 : 0.18}/>
            <path d="M0 150 Q 500 300 1000 150 T 2000 150" stroke={isDark ? '#bbb' : '#333'} strokeWidth="1.5" fill="none" opacity={isDark ? 0.18 : 0.18}/>
          </svg>
        </div>
        <div style={{ opacity: isDark ? 0.15 : 0.15, position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
          <svg viewBox="0 0 1200 600" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%', display: 'block' }}>
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke={isDark ? '#fff' : '#000'} strokeWidth="0.5" opacity={isDark ? 0.18 : 0.18}/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
            <line x1="0" y1="0" x2="1200" y2="600" stroke={isDark ? '#fff' : '#000'} strokeWidth="0.5" opacity={isDark ? 0.18 : 0.18}/>
            <line x1="1200" y1="0" x2="0" y2="600" stroke={isDark ? '#fff' : '#000'} strokeWidth="0.5" opacity={isDark ? 0.18 : 0.18}/>
          </svg>
        </div>
        <div style={{ opacity: isDark ? 0.18 : 0.18, position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
          {[
            { left: '10%', top: '20%', size: 3, delay: 0, duration: 3 },
            { left: '85%', top: '15%', size: 4, delay: 0.5, duration: 4 },
            { left: '20%', top: '80%', size: 2, delay: 1, duration: 2.5 },
            { left: '75%', top: '70%', size: 3, delay: 1.5, duration: 3.5 },
            { left: '50%', top: '30%', size: 4, delay: 0.2, duration: 3.2 },
            { left: '30%', top: '60%', size: 2, delay: 0.8, duration: 2.8 },
            { left: '90%', top: '50%', size: 3, delay: 1.2, duration: 3.8 },
            { left: '15%', top: '40%', size: 4, delay: 0.3, duration: 4.2 },
            { left: '60%', top: '85%', size: 2, delay: 0.7, duration: 2.3 },
            { left: '40%', top: '10%', size: 3, delay: 1.1, duration: 3.1 },
            { left: '80%', top: '25%', size: 4, delay: 0.4, duration: 3.6 },
            { left: '25%', top: '90%', size: 2, delay: 0.9, duration: 2.7 },
            { left: '70%', top: '35%', size: 3, delay: 1.3, duration: 3.3 },
            { left: '5%', top: '65%', size: 4, delay: 0.1, duration: 4.1 },
            { left: '95%', top: '80%', size: 2, delay: 0.6, duration: 2.4 },
            { left: '45%', top: '75%', size: 3, delay: 1.4, duration: 3.4 },
            { left: '55%', top: '20%', size: 4, delay: 0.8, duration: 3.9 },
            { left: '35%', top: '50%', size: 2, delay: 1.0, duration: 2.6 },
            { left: '65%', top: '10%', size: 3, delay: 0.5, duration: 3.7 },
            { left: '10%', top: '70%', size: 4, delay: 1.1, duration: 4.0 }
          ].map((dot, i) => (
            <div
              key={i}
              style={{
                position: 'absolute',
                left: dot.left,
                top: dot.top,
                width: `${dot.size}px`,
                height: `${dot.size}px`,
                backgroundColor: isDark ? '#fff' : '#000',
                borderRadius: '50%',
                opacity: 1,
                animation: `float ${dot.duration}s ease-in-out infinite`,
                animationDelay: `${dot.delay}s`
              }}
            />
          ))}
        </div>
      </>}
    </div>
  );

  // Animated dots section divider
  const SectionDivider = () => (
    <motion.div
      className="flex justify-between items-center py-6 w-full max-w-7xl mx-auto"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      aria-hidden="true"
      style={{ gap: 0 }}
    >
      {[...Array(32)].map((_, i) => (
        <motion.span
          key={i}
          className="inline-block rounded-full bg-black"
          style={{ width: 7, height: 7, opacity: i % 2 === 0 ? 0.7 : 0.3 }}
          animate={{
            scale: [1, 1.25, 1],
            y: [0, -5, 0],
          }}
          transition={{
            repeat: Infinity,
            duration: 0.9,
            delay: i * 0.04,
            ease: "easeInOut"
          }}
        />
      ))}
    </motion.div>
  );

  return (
    <motion.div className="min-h-screen" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      {/* Hero Section */}
      <motion.section className="asn-hero bg-gradient-to-br from-background to-surface"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <HeroAnimatedBG />
        <motion.div className="asn-container text-center space-y-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.7 }}
        >
          {/* Personalized Greeting */}
          {userLocation && (
            <p className="asn-body text-foreground text-lg font-semibold" style={{ 
              textShadow: 'var(--tw-shadow-color, 0 0 0) 0px 1px 2px, rgba(255,255,255,0.8) 0px 1px 2px'
            }}>
              {isHindi 
                ? `${userLocation} से नमस्कार! आपका स्वागत है।`
                : `Welcome from ${userLocation}! We're ready to serve you globally.`
              }
            </p>
          )}

          {/* Main Headline */}
          <h1 className="text-responsive-header leading-tight break-words max-w-full text-foreground" style={{ 
            textShadow: 'var(--tw-shadow-color, 0 0 0) 0px 2px 4px, rgba(255,255,255,0.9) 0px 2px 4px'
          }}>
            {isHindi ? (
              <>
                आपका डिजिटल<br />
                <span className="text-muted-foreground" style={{ 
                  textShadow: 'var(--tw-shadow-color, 0 0 0) 0px 2px 4px, rgba(255,255,255,0.9) 0px 2px 4px'
                }}>साम्राज्य</span><br />
                यहाँ शुरू होता है
              </>
            ) : (
              <>
                Your Digital<br />
                <span className="text-muted-foreground" style={{ 
                  textShadow: 'var(--tw-shadow-color, 0 0 0) 0px 2px 4px, rgba(255,255,255,0.9) 0px 2px 4px'
                }}>Empire</span><br />
                Starts Here
              </>
            )}
          </h1>

          {/* Subheadline */}
          <p className="text-responsive-large text-muted-foreground max-w-4xl mx-auto leading-relaxed break-words font-medium" style={{ 
            textShadow: 'var(--tw-shadow-color, 0 0 0) 0px 1px 3px, rgba(255,255,255,0.8) 0px 1px 3px'
          }}>
            {isHindi 
              ? "संपूर्ण व्यापारिक निष्पादन और अंतर्राष्ट्रीय पहुंच के साथ आपके सपनों को साकार करते हैं। प्रीमियम डिजिटल समाधान जो परिणाम देते हैं।"
              : "Complete business execution and international reach. We transform ideas into thriving digital empires with premium solutions that deliver results."
            }
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8 w-full max-w-lg mx-auto">
            <Link to="/contact" className="w-full sm:w-auto">
              <Button className="asn-button-primary group w-full sm:w-auto">
                {isHindi ? "शुरू करें" : "Get Started"}
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link to="/services" className="w-full sm:w-auto">
              <Button className="asn-button-secondary group w-full sm:w-auto">
                {isHindi ? "सेवाएं देखें" : "Explore Services"}
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </motion.div>
      </motion.section>
      <SectionDivider />

      {/* Metrics Section */}
      <motion.section className="asn-section bg-foreground text-background"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <div className="asn-container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {metrics.map((metric, index) => (
              <motion.div
                key={index}
                className="text-center space-y-4 group"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5, ease: "easeOut" }}
                whileHover={{ scale: 1.07 }}
              >
                <motion.span
                  whileHover={{ scale: 1.18, rotate: [0, 8, -8, 0] }}
                  transition={{ type: "spring", stiffness: 300, damping: 12 }}
                  className="inline-block"
                >
                  <metric.icon className="h-12 w-12 mx-auto text-background/80" />
                </motion.span>
                <div className="asn-headline text-3xl md:text-4xl text-background">
                  {metric.number}
                </div>
                <p className="asn-body text-background/80 text-sm font-bold tracking-wide uppercase">
                  {metric.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>
      <SectionDivider />

      {/* Services Preview */}
      <motion.section className="asn-section bg-background"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <div className="asn-container">
          <div className="text-center space-y-6 mb-16">
            <h2 className="asn-headline text-3xl md:text-5xl">
              {isHindi ? "हमारी विशेषज्ञता" : "Our Expertise"}
            </h2>
            <p className="asn-body text-xl text-muted-foreground max-w-3xl mx-auto">
              {isHindi 
                ? "वैश्विक मानकों के साथ स्थानीय समझ। हर समाधान आपकी सफलता के लिए तैयार किया गया।"
                : "Global standards with local understanding. Every solution crafted for your success."
              }
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                className="group border border-border hover:border-foreground transition-all duration-300 p-8 bg-surface hover:bg-foreground hover:text-background"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15, duration: 0.5, ease: "easeOut" }}
              >
                <h3 className="asn-headline text-xl mb-4 group-hover:text-background">
                  {service.title}
                </h3>
                <p className="asn-body text-muted-foreground group-hover:text-background/80">
                  {service.description}
                </p>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/services">
              <Button className="asn-button-primary">
                {isHindi ? "सभी सेवाएं देखें" : "View All Services"}
              </Button>
            </Link>
          </div>
        </div>
      </motion.section>
      <SectionDivider />
      

      {/* CTA Section */}
      <motion.section className="asn-section bg-foreground text-background"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <div className="asn-container text-center space-y-8">
          <h2 className="asn-headline text-3xl md:text-5xl text-background">
            {isHindi ? "अपना साम्राज्य बनाने के लिए तैयार हैं?" : "Ready to Build Your Empire?"}
          </h2>
          <p className="asn-body text-xl text-background/80 max-w-2xl mx-auto">
            {isHindi 
              ? "आज ही हमसे जुड़ें और अपने व्यापार को नई ऊंचाइयों पर ले जाएं।"
              : "Join us today and take your business to unprecedented heights."
            }
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-lg mx-auto">
            <Link to="/contact">
              <Button className="bg-background text-foreground hover:bg-background/90 px-6 py-3 font-bold tracking-wide uppercase w-full sm:w-auto">
                {isHindi ? "निःशुल्क परामर्श बुक करें" : "Book Free Consultation"}
              </Button>
            </Link>
            <a 
              href="https://www.instagram.com/advanced_solutions_network/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-background/80 hover:text-background transition-colors underline text-sm"
            >
              {isHindi ? "Instagram फॉलो करें" : "Follow on Instagram"}
            </a>
          </div>
        </div>
      </motion.section>
    </motion.div>
  );
};

export default Home;